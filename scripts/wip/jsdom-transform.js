// Note: JSDOM is not tracked in package.json
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { readFile } = require('fs');

/*
 * Tranform an HTML file
 * Intended to be run after it has been processed by Pandoc
 * Manipulate HTML nodes in ways Pandoc Lua filter can't (like, ol/ul classes)
 *
 * e.g. $: pandoc --standalone input.md | node % > output.html
 */

/* read process.stdin somehow */
process.stdin.setEncoding('utf8')
process.stdin.on('readable', () => {
  const file = process.stdin.read();
  if (file) {
    const dom = new JSDOM(file);

    // Make modifications to the document
    const h1 = dom.window.document.querySelector('h1');
    h1.textContent = h1.textContent.toUpperCase();

    // Pass along modified HTML  
    process.stdout.write(dom.window.document.documentElement.outerHTML)
  }
});
