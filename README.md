# Portfolio Website
A portfolio website built with Pandoc and NPM scripts.

## Dependencies
Tools used for building the site:

| tools            | version | use                                                                            |
| ---              | ---     | --                                                                             |
| **`core-utils`** |  -      | for commands like **`cp`**, **`cat`**, **`mkdir`**                             |
| **`nodeJS`**     | 12.11   | running build scripts through NPM, watching for changes, and optimizing images |
| **`pandoc`**     | 2.11    | converting Markdown to HTML                                                    |
| **`ffmpeg`**     | 4.3.1   | converting and compressing videos                                              |
| **`git-lfs`**    | 2.13    | storing binary files ( images, source files for mockups                        |

## Directory structure
- **`src`:**  "Source" folder contains all the working files.
- **`dist`:** "Distribution"—where all the source files are outputted after compilation

## Commands
NPM scripts are used build the site. 

```
npm run build            Run all build scripts
npm run build:css        Concatenate all stylesheet files
npm run build:fonts      Copy fonts directory to distribution dir
npm run build:html       Convert Markdown files into HTML
npm run build:img        Optimize images
npm run build:js         Copy JS files to distribution dir
npm run build:video      Convert and compress videos in '/assets' directory 
npm run clean            Run all clean scripts
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

## Templates
Templates are written in [Pandoc template language](https://pandoc.org/MANUAL.html#templates).

## Styling Content in Markdown
Pandoc allows adding styles, IDs, and other attributes in curly braces. Styling content into blocks requires using actual html tags such as `section`

Example:
```markdown
# Main heading {.className}
Introduction to this section.

<section class="section-name">

## Section Name {.specialClass style="color:red"}
![image caption](ImageName.png){.imgClass #imgID width=100 height=200}

Some more text explaining the section

</section>
```

should output this HTML:
```html
<h1 class="className" id="main-heading">Main heading</h1>
<p>Introduction to this section.</p>

<section class="section-name">
  <h2 class="specialClass" style="color:red" id="section-name">Section Name</h2>
  <figure>
    <img src="ImageName.png" id="imgID" class="imgClass" width="100" height="200" alt="image caption" /><figcaption aria-hidden="true">image caption</figcaption>
  </figure>
  <p>Some more text explaining the section</p>
</section>
```
**Reference**
- https://talk.commonmark.org/t/consistent-attribute-syntax/272
