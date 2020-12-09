const jsdom = require('jsdom');
const fs = require('fs');
const { JSDOM } = jsdom;
const { Transform } = require('stream');

const file = './dist/index.html'
const stream = fs.createReadStream(file, { encoding: 'utf8' });

let count = 1;
const showData = new Transform({
  transform: (data, enc, cb) => {
    console.dir(count, data);
  },
  flush: (cb) => { cb() }
});
stream
  .pipe(showData)
  .pipe(process.stdout);
// stream.on('end', function () {
//  console.log(data);
// })
