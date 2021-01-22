#!/usr/bin/env node

const path = require('path');
const { spawn } = require('child_process');
const chokidar = require('chokidar');
let verbose;


// Make sure we're running from project root
function moveToProjectRoot () {
  const relativeLocation = path.dirname(__filename);
  // File is being executed from the scripts directory
  if ( relativeLocation ===  process.cwd() ) {
    process.chdir('../');
  }
}
moveToProjectRoot();

if (!process.argv[2]) {
  console.error('ERROR: You need to specify a source folder to watch');
  process.exit(1);
}
if (process.argv[3] === '-v' ||  process.argv[3] === '--verbose') {
  console.log('Verbose turned on');
  verbose = true;
}

console.log(`Watching files in "${process.argv[2]}/"`);

const watcher = chokidar.watch( process.argv[2], {
  persistent: true,
  ignored: '.DS_store',
  ignoreInitial: true
});


watcher
  .on('add', file => {
    if (verbose) { console.log(`\n${file} created`); }
    build(file);
  })
  .on('change', file => {
    if (verbose) { console.log(`\n${file} changed`); }
    build(file);
  })
;

function build (file) {
  const cmd = spawn(`./scripts/build.sh`, [file] );
  cmd.stdout.on('data', (data) => {
    process.stdout.write(data);
  });
  cmd.stderr.on('data', (data) => {
    process.stderr.write(data);
  });
}
