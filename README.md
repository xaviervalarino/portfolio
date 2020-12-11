# Portfolio Website
A _homebrewed_ static site generator using Pandoc and NPM scripts.

## Dependencies
Tools used for building the site:

| tools            | version | used for                                                                       |
| ---              | ---     | --                                                                             |
| **`core-utils`** |  -      | for commands like **`cp`**, **`cat`**, **`mkdir`**, and **`rm`**               |
| **`nodeJS`**     | 12.11   | running build scripts through NPM, watching for changes, and optimizing images |
| **`pandoc`**     | 2.11    | converting Markdown to HTML                                                    |
| **`ffmpeg`**     | 4.3.1   | converting and compressing videos                                              |
| **`git-lfs`**    | 2.13    | storing binary files ( source files for mockups )                              |

## Directory structure
- **`src`:**  "Source" folder contains all the working files.
- **`dist`:** "Distribution"—where all the source files are outputted after compilation

## Commands
NPM scripts are used build the site. 

```
npm run build            Run all build scripts
npm run build:css        Concatenate all stylesheet files
npm run build:fonts      Copy fonts directory to distribution dir
npm run build:favicon    Copy /assets/favicon/ to distribution dir
npm run build:html       Run Pandoc on all content files
npm run build:img        Optimize all images in /assets/img
npm run build:html       Convert Markdown files into HTML npm run build:img
npm run build:js         Copy JS files to distribution dir
npm run build:video      Convert and compress videos in '/assets' directory 
npm run clean            Run all clean scripts
npm run clean:favicon    Delete favicon dir
npm run clean:html       Delete HTML files in distribution dir
npm run clean:img        Delete all image files in distribution dir
npm run dev              Start server and watch files
npm run serve            Serve distribution dir from localhost
npm run watch            Run all watch scripts
npm run watch:css        Watch CSS files, lint and build when there are changes
npm run watch:html       Watch Markdown files, build changed file when there are changes
npm run watch:img        Watch image files, build when there are changes
npm run watch:js         Watch JS files, run build:js when changed
npm run watch:template   Watch template, rebuild all markdown files when changed
npm run watch:video      Watch for changes in /assets,run build ffmpeg script
```
