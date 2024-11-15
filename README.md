# Portfolio Website
My portfolio website, built with a homebrewed static site generator.
![CLI demo](./cli-demo.gif)

## Dependencies
Tools used for building and deploying the site:

| tool             | version | used for                                                                       |
| ---              | ---     | --                                                                             |
| **`core-utils`** | -       | commands like **`cp`**, **`cat`**, **`mkdir`**, and **`rm`**                   |
| **`Bash`**       | ^4.0    | running the build script                                                       |
| **`nodeJS`**     | 12.11   | running build scripts through NPM, watching for changes, and optimizing images |
| **`pandoc`**     | 2.11    | converting Markdown to HTML                                                    |
| **`ffmpeg`**     | 4.3.1   | converting and compressing videos                                              |
| **`rsync`**      | 2.6.9   | deploying site to production and testing VPS                                   |

## Building
If you have `brew` and `NodeJS`, getting it running on your machine might look something like:

```
brew install bash pandoc ffmpeg
npm install
npm run build
npm run serve
```

Note that the fonts are not included in this repo, so the version you see on localhost will be using a fallback font (Helvetica, probably).

## Directory structure
- **`src`:**  "Source" folder contains all the working files that end up in `dist`.
- **`mockups`:** Folder containing design files. Mainly binary [Affinity Designer](https://affinity.serif.com/en-gb/designer/) files created to mock up how the site would look.
- **`scripts`:** CLI scripts used to build the site. The _meat and potatoes_ is `build.sh`.
- **`dist`:** "Distribute"—where all files are outputted after building. Since this folder is generated, it's not under version control.

## Commands
NPM `run` commands wrap scripts found in the `./scripts` directory.

These scripts might not work on Windows unless run on a Linux subsystem. This is due to the use of `&` for process parallelization.

```
           build  Run all build commands  
                  runs: ./scripts/build.sh all

      build:lean  Run frequently used build commands  
                  runs: ./scripts/build.sh lean

           clean  Delete "./dist/" directory 
                  runs: ./scripts/build.sh --clean

           serve  Run server on localhost:8080 (usually)
                  runs: live-server ./dist

             dev  Start up development environment 
                  runs: npm run serve & npm run watch

          watch   Watch and build files when there are changes
                  runs: (npm run prewatch) npm run build:lean
                        ./scripts/watch.js ./src

          deploy  Deploy to production server
  deploy:testing  Deploy to testing server
```

`./scripts/build.sh` can be used for more granular control. See `./scripts/build.sh --help` for more info:

```
./scripts/build.sh

Project Build Script
  Tell the script to run a specific filetype pipeline,
  or give it a filepath and it will figure it out

usage: 
  ./scripts/build.sh [commands...|files...] [--opts]

commands:
          all  Run all commands
         lean  Only run css, html, js
               (exlude long-running and less frequently used commands)
          css  Concatenate all CSS files to single file in output directory
          img  Optimize image files
         html  Convert markdown and template files into HTML
  collections  Build project "collections" -- ordered lists of project files
               Used as metadata for Pandoc Lua filters
               See `./scripts/collections.js` for implementation
        video  Process video file(s), convert them to MP4,
               ouput them to assets folder in output directory 
      favicon  Copy favicon files to output directory
        fonts  Copy font files to output directory
           js  Contcatenate all javascript files into a single file

options:
 --help, -h  Show this message
    --clean  Delete output dir before building 

examples:
  ./scripts/build.sh all --clean
  ./scripts/build.sh css 
  ./scripts/build.sh src/index.md src/work.md
  ./scripts/build.sh src/index.md css
  ./scripts/build.sh html css
```


## Implementation
### CSS
#### Inspiration
Inspiration for the stylesheet came from [Raster Simple Grid Stystem](https://rsms.me/raster/) and [Every-Layout.dev](https://every-layout.dev/).

I'm using an algorithmic approach and tried to make the styles as composable as possible.

#### Subgrid work-around and accessibility 
[`subgrid`](https://caniuse.com/?search=subgrid) is currently not supported by most browsers and [`display: contents`](https://hiddedevries.nl/en/blog/2018-04-21-more-accessible-markup-with-display-contents) has a major implementation bug where ordered and unordered lists do not properly display their role to the accessibility tree.

In the spirit of keeping things accessible, I've created a work-around `.subgrid` class that uses CSS custom properties and the `calc()` function to create subgrid layout behavior. 

To demonstrate the concept, here is a simplified example:
```css
/*
 * --grid-tc is grid-template-columns
 * --grid-cs is grid-column-start
 * --grid-ce is grid-column-end
 * 
 * Descending specificity is ignored here for the sake of explanation
 */ 

/* Specify a default number of template columns */
:root {
  --grid-tc: 6;
}

/* set the position of grid items with a variable */
.grid > * {
  grid-column-start: var(--grid-cs);
  grid-column-end: var(--grid-ce);
}

/* set the number of columns in a grid / subgrid */
.grid,
.subgrid {
  display: grid;
  grid-template-columns: repeat( var(--grid-tc), 1fr );
}


/* Calculate the number of columns in a subgrid by subtracting where
   it starts from where it ends */
.subgrid {
  --grid-tc: calc( var(--grid-ce) - var(--grid-cs) );
}

/* Set a subgrid item's ending position based on
   the number of columns in a subgrid */
.subgrid > * {
  --subgrid-ce: calc( var(--grid-tc) + 1 );
  grid-column-end: var(--subgrid-ce);
}
```


### Javascript
Each file in the JS directory is concatenated into a single JS file in the distribution directory, so, each file should be a self-contained, self-executing anonymous function. (I suppose it could return a global variable, but, the site is [fundamentally] a series of documents, so the scripts have explicit purposes.)

For example:
```js
(function () {
  document.addEventListener('click', (e) => {
    // do something with button data-attributes
    if( e.target.tagName === 'BUTTON') { console.log(e.target.dataset); }
  });
}());
```

### Templates
Templates are written in [Pandoc's HTML template language](https://pandoc.org/MANUAL.html#templates). It's limited, but gets the job done.

### Content Files
Content files are written in Markdown with YAML front-matter.

##### Front-Matter
Along with template filename, front-matter can include paths to an additional YAML metadata file and Pandoc Lua filter. Filenames must be full paths from project root.

```yaml
title: Page title
subtitle: Page subtitle
template: path/to/template.html
masthead:
  home: true
metadata: path/to/metadata.yml
filter: path/to/filter.lua
```

#### Lua Filter
[Pandoc Lua filter Docs](https://pandoc.org/lua-filters.html)

`Lua` Filters can be found in `scripts/filters/` directory: 

##### `absolute-links.lua`
Convert image and anchor links into absolute paths.  This is done so that images can be viewed locally while editing Markdown, without having to worry about reference issues once they're up on the internet.

This filter is run on all content files.

##### `get-next-project.lua`
Adds the next project `title`,`subtitle`, and `href` to the case-studies template.
Uses `src/case-studies/project-roster.yml` to get the current file's position in relation to the other projects.

Must be specified as a `filter` option in a page's front-matter. 

<!--
### Collections
Running `./scripts/collections.js [collection_name]` will build a collection metadata file. It iterates through the markdown files given directory, scraping their front-matter, and generating a list of keys that are specified in the collections definition.
-->
