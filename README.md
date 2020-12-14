# Portfolio Website
My portfolio website, built with a homebrewed static site generator.

## Dependencies
Tools used for building the site:

| tools            | version | used for                                                                       |
| ---              | ---     | --                                                                             |
| **`core-utils`** |  -      | for commands like **`cp`**, **`cat`**, **`mkdir`**, and **`rm`**               |
| **`nodeJS`**     | 12.11   | running build scripts through NPM, watching for changes, and optimizing images |
| **`pandoc`**     | 2.11    | converting Markdown to HTML                                                    |
| **`ffmpeg`**     | 4.3.1   | converting and compressing videos                                              |
| **`git-lfs`**    | 2.13    | storing binary files ( source files for mockups )                              |
| **`rsync`**      | 2.6.9   | deploying site to production and testing VPS                                   |

## Directory structure
- **`src`:**  "Source" folder contains all the working files.
- **`dist`:** "Distribution"—where all the source files are outputted after compilation

## Commands
NPM scripts are used build the site. 

_Note_: these scripts might not work on Windows unless run on a Linux subsystem. This is due to the use of `&` for process parrallelization.
```
npm run build            Run all build scripts
npm run build:css        Concatenate all stylesheet files
npm run build:fonts      Copy fonts directory to distribution dir
npm run build:favicon    Copy /assets/favicon/ to distribution dir
npm run build:html       Run Pandoc on all content files
npm run build:img        Optimize all images in /assets/img
npm run build:html       Convert Markdown files into HTML npm run build:img
npm run build:js         Concatenate JS files together into the distribution dir
npm run build:video      Convert and compress videos in '/assets' directory 
npm run clean            Run all clean scripts
npm run clean:favicon    Delete favicon dir
npm run clean:html       Delete HTML files in distribution dir
npm run clean:img        Delete all image files in distribution dir
npm run deploy:prod      Copy distribution dir to production site
npm run deploy:test      Copy distribution dir to testing site
npm run dev              Start server and watch files
npm run serve            Serve distribution dir from localhost
npm run watch            Run all watch scripts
npm run watch:css        Watch CSS files, lint and build when there are changes
npm run watch:html       Watch Markdown files, build HTML file when there are changes
npm run watch:img        Watch image files, optimize when there are changes
npm run watch:js         Watch JS files, run concatenate them together when changed
npm run watch:template   Watch template, rebuild all markdown files when changed
npm run watch:video      Watch for changes in /assets,run build ffmpeg script
```

## Implementation
### CSS
Inspiration for the stylesheet came from [Raster Simple Grid Stystem](https://rsms.me/raster/) and [Every-Layout.dev](https://every-layout.dev/).

### Javascript
Each file in the JS directory is concatenated into a single JS file in the distribution directory, so, each file should be self-contained. (I suppose it could return a global variable, but, the site is [fundamentally] a series of documents, so... the scripts are self-contained and have explicit purposes.)

### Templates
Templates are written in [Pandoc's HTML template language](https://pandoc.org/MANUAL.html#templates). It's limited, but gets the job done.

### Markdown Filters
All asset links are converted into absolute links through a [Pandoc Lua filter](https://pandoc.org/lua-filters.html). This is done so that images can be viewed locally while editing Markdown, while not having to worry about reference issues once they're up on the internet.
