# Portfolio Website
A portfolio website built with Pandoc and NPM scripts.

## Dependencies
* `cat`
* `nodeJS`
* `pandoc`

## Directory structure
* `src`:  "Source" folder contains all the working files.
* `dist`: "Distribution"—where all the source files are outputted after compilation

## Commands
NPM scripts are used build the site. 

```
npm run build:html    Convert Markdown files into HTML
npm run build:img     Optimize images
npm run build         Run all build scripts
npm run clean:html    Delete HTML files in distribution dir
npm run clean:img     Delete all image files in distribution dir
npm run clean         Run all clean scripts
npm run watch:html    Watch Markdown files, build when there are changes
npm run watch:img     Watch image files, build when there are changes
npm run watch:css     Watch CSS files, concatenate when there are changes
npm run watch         Run all watch scripts
npm run serve         Serve distribution dir from localhost
npm run dev           Start server and watch files
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
