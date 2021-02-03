const path = require('path')
const { readFileSync } = require('fs');

// Run from project root
process.chdir(path.resolve( path.dirname(__filename), '../../'));

module.exports = function getPathData (file) {
  const paths = {};
  readFileSync(file).toString().split('\n')
    .forEach( line => {
      const data = line.split('=');
      if ( data.length > 1 ) {
        paths[data[0]] = data[1].replace(/["]+/g, '');
      }
    })
  ;
  return paths;
}
// Example:
// const paths = require('./util/project-paths.js')
// paths('.paths')
