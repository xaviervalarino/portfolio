#!/usr/bin/env node
/*
 * Create collections of markdown/content files
 * Generates a YAML data file for each definitiion
 */
const collector = require('./util/collector.js');

/*
 * Collection definitions
 * Each object will create a YAML data_file containing an list of target information 
 *   Each definition should contain:
 *
 *   name:         Top level key ouputed into `data_file`, to be used by an accompanying
 *                 Lua filter so that it can iterate over the  metadata list
 *                 Also used to sort the list when updating 
 *
 *   target_keys:  An array of keys to pull from content file's front-matter and add the the list item
 *                 If `href` is specified, the script will output the content file's output path:
 *                 e.g., ./src/filename.md -> ./dist/filename.html
 *
 *   data_file:    The YAML file that will be created/updated with the generated collection list
 *
 *   target_dir:   directory containing content files to be turned into a collection
 */

const collections = {
  project_roster: {
    name: 'roster',
    target_keys: [ 'title', 'subtitle', 'href'],
    data_file: './src/case-studies/project-roster.yml',
    target_dir: './src/case-studies'
  }
  // only one collection at the moment
}

// Arguments
// create/update the collection by name, or batch them with `all`
const args = process.argv.slice(2)

if ( args.length === 0 ) {
  console.error('ERROR: no arguments supplied')
  process.exit(1)
}

if ( args.includes('all') ) {
  Object.values(collections).forEach( value => { collector(value) })
} else {
  args.forEach( cmd => {
    if (!collections[cmd]) {
      return console.error(`ERROR: "${cmd}" isn't a known collection`)
    }
    collector(collections[cmd])
  });
}
