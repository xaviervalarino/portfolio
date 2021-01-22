/*
 * Collector.js
 * Collect all markdown files in given directory (target_dir)
 * Output/update a YAML file (data_file) with specified data (target_keys)
 * Parameter object given to the module contain:
 *   name:         String  The key used to compare against an existing data file 
 *   target_keys:  Array   Keys to grab from front-matter of each content file
 *   data_file:    String  Path to the data file 
 *   target_dir:   String  Path to the directory containing the content files
 */
const fs = require('fs');
const { Transform, PassThrough, pipeline } = require('stream');
const path = require('path');
const yaml = require('js-yaml');

// Run from project root
process.chdir(path.resolve( path.dirname(__filename), '../../'));

// Make sure provided parameters obj have all the right keys
function checkForInputErrors (obj) {
  const checklist = {
    name: 'Collection object doesn\'t have "name"',
    target_keys: 'Collection object doesn\'t have "target_keys"',
    data_file:  'Collection object doesn\'t have "data_file"',
    target_dir: 'Collection object doesn\'t have "target_dir"'
  };
  Object.keys(checklist).forEach( item => {
    if ( !obj[item] ) {
      console.error(`ERROR: ${checklist[item]}`);
      process.exit(1);
    }
  });
}

// merge input streams
// emit 'end' once last stream has been merged
function merge (streamArr) {
  return streamArr.reduce( (merged, stream, i) => {
    merged = stream.pipe(merged, { end: false });
    stream.once('end', () => {
       if (streamArr.length === i + 1) {
         merged.end();
       }
    });
    return merged;
  }, new PassThrough({ objectMode: true }) );
}

// Partially read a file until the delimiter function returns true/data,
// Get back an array of Promised PassThrough streams
// Each one streaming the delimited data and filename
function partialReadStreams (filenames, delimiterFn) {
  return new Promise(resolve => {
    // returns partial stream as a promise
    function streamAsPromise (filename) {
      return new Promise(resolve => {
        const pass = new PassThrough({ objectMode: true });
        const data = {
          filename: filename,
          rawdata: ''
        };
        let marker;

        function testDelimiter (chunk) {
          const readStream = this;
          const delimitedData = delimiterFn(data.rawdata);
          if (delimitedData) {
            data.rawdata = delimitedData;
            marker = true; 
            readStream.destroy();
          } else {
            data.rawdata += chunk;
          }
        }
        function writeOutData () { 
          if (marker) {
            pass.write(data);
            pass.end();
            resolve(pass);
          }
        }
        fs.createReadStream(filename, { highWaterMark: 300 })
          .on('error', (err) => { console.error(err); })
          .on('data', testDelimiter)
          .on('close', writeOutData)
        ;
      });
    }
    const partialStreams = filenames.map(file => streamAsPromise(file));
    Promise.all(partialStreams).then(resolve);
  });
}

async function getInputFilenames (dirname, ext) {
  const files = await fs.promises.readdir(dirname, { withFileTypes: true });
  return files
    .filter( file => file.isFile() && path.extname(file.name) === ext )
    .map( file => path.join(dirname, file.name))
  ;
}

// find YAML directive markers used to delimit front-matter 
async function fmStreams (fileArr) {
  return await partialReadStreams(fileArr, (data) => {
    const regex = /^---(?:.|\n)+(?:---|\.\.\.)$/gm;
    const frontMatter = data.match(regex);
    // remove the last directive b/c js-yaml complains 
    return frontMatter ? frontMatter[0].slice(0,-3) : false;
  });
}

module.exports = (params) => {
  checkForInputErrors(params);

  // Read in the `data_file` synchronously so we don't have to worry
  // about losing data when we open a write stream to the same path
  // if it doesn't exist, log the error and write a new data_file
  const reference = (() => {
    try { return yaml.load(fs.readFileSync(params.data_file, 'utf8')); }
    catch (e) { console.error(`${e}\n...Creating new data file`); }
  })();

  const parseYAML = new Transform({
    objectMode: true,
    transform(chunk,_,cb){
      if (chunk.rawdata) {
        chunk.metadata = yaml.load(chunk.rawdata);
      }
      cb(null, chunk);
    }
  });

  // buffer up all input streams and then pass them bundled up as an array
  // Similar to `_writev()` for Duplex streams, but were controlling
  // the release of the data through the `end` event
  const bufferUp = new Transform({
    objectMode: true,
    construct (cb) {
      this.data = [];
      cb();
    },
    transform (chunk, _, cb) {
      this.data.push(chunk);
      cb();
    },
    flush (cb) {
      cb(null, this.data);
    }
  });

  // create a new collection list based on the `target_keys`
  const createList = new Transform({
    objectMode: true,
    transform (chunks, _, cb) {
      const list = {};
      const destPath = (fpath) => {
        const subdir = path.relative('src', path.dirname(fpath));
        const filename = path.basename(fpath, path.extname(fpath)) + '.html';
        return path.join('/',subdir, filename);
      };
      const listItem = (chunk) => {
        const item = {};
        params.target_keys.forEach( key => {
          item[key] = key === 'href' ? destPath(chunk.filename) : chunk.metadata[key] ;
        });
        return item;
      };
      list[params.name] = chunks.map( chunk => listItem(chunk) );
      cb(null, list);
    }
  });

  // sort the list against the reference data_file (if it exists)
  const sortList = new Transform({
    objectMode: true,
    transform (list, _, cb) {
      if (reference && reference[params.name]) {
        list[params.name].sort( (a,b) => {
          let refA = reference[params.name].findIndex(el => {
            return el.href === a.href;
          });
          let refB = reference[params.name].findIndex(el => {
            return el.href === b.href;
          });
          // doesn't exist, so append it to the list
          // (B is probably before A, alphabetically)
          if ( refA === -1) refA = list[params.name].length;
          if ( refB === -1 ) refB = list[params.name].length + 1;
          return refA - refB;
        })
      }
      cb(null, list);
    }
  });

  // convert YAML to string so we can write it to file,
  // adding doc directives, and making it more human-readable
  const dumpYAML = new Transform({
    objectMode: true,
    transform (chunk, _, cb) {
      chunk = yaml.dump(chunk).replace(/(?<!:\n)( {2}-)/g, '\n$1');
      chunk = '---\n' + chunk + '...';
      cb(null, chunk);
    }
  })

  const pipeItUp = (inputStreams) => {
    pipeline(
      merge(inputStreams),
      parseYAML,
      bufferUp,
      createList,
      sortList,
      dumpYAML,
      fs.createWriteStream(params.data_file),
      (err) => { if (err) console.error(err) }
    );
  }
  getInputFilenames(params.target_dir, '.md')
    .then(fmStreams)
    .then(pipeItUp)
    .catch(console.error)
  ;
}
