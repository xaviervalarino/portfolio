---
title: Programming an interactive furniture builder
subtitle: Working within constraints
position: 1
project: Mixi Configurator
template: case-study.html
masthead:
    work: true
---

<section class="grid indenter:3/5 flip-top:kid border-top:3px border-accent:cyan">

## Background
Fringe studio offers a kit of modular furniture for interior designers to design custom furniture builds. The studio needed to define a process for handling custom orders.

---

### Goal 
Improve how Fringe studio's clientele submit orders for custom furniture builds.

---

### My Role 
 
End-to-end design and development, which entailed:

* Understanding the problem
* Examining project constraints
* Designing a solution, and
* Programming a working application.

<div class="subgrid" data-tab="0">
![](../assets/img/mixi-modular-sample-furniture.jpg)
</div>
</section>

<section class="grid indenter:3/2/4 split-lists flip-top:kid border-top:3px border-accent:magenta">
## Process
 
1. Interviewed the studio to understand order fulfillment
1. Made recommendations on how we could work around project constraints
1. Designed mockups exploring how clients would create furniture orders.
1. Interviewed interior designers to understand:
    - How they thought about putting together a furniture configuration
    - What the average configuration might look like
    - What their expectations were around ordering

<div class="bkg:grey  pano" data-tab='0'>
![Diagram of colors, finishes and kit parts](../assets/img/mixi-modular-kit-of-parts.png)
</div>

---

### Constraints 
 
Order fulfillment was complicated, to say the least. Standardizing shipping for the custom builds was near impossible, since each order usually needed to be palletized. To add insult to injury, the studio's CMS gave little in the way of configurability and database access.

We considering spinning up a separate virtual private server. After running into [_Cross-Origin Resource Sharing_](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) Issues, we were forced to reassess our timeline and budget. We decided the best way forward was to build a client-side only application.

The workflow would allow clients to visualize their custom build, generate a PDF, and then submit it to the studio for pricing. 

--- 

### Development 
 
Due to the limitations, deploying the application required manually updating the page. To make this easier, all the assets were bundled into a blob and dropped into a custom HTML element on one of the studio's webpages.

 

#### Project Scaffolding
[Gulp](https://gulpjs.com/) was used for preprocessing and bundling, including preparing image assets.

SVG format was used for the images, which could be easily inlined as text into the distribution code. Another benefit of SVG was that the application could programmatically change the colors and background patterns through CSS styles.

 
<div class='left-third'>
![Before and after SVGs were processed](../assets/img/mixi-modular-color-interpolation-grey.png)
</div>

<div class='left-third align-self:end'>
The Gulp pipeline was built to prepare the images. It would stream the SVGs as raw text through a helper function (`addClass`) which would locate target colors and replace them with a CSS class. These classes were then targeted by the application JS to change the furniture color in synchrony with the dropdown menus.

Assigning multiple colors was done through two separate properties: one through the CSS `color` property and the other through the SVG `currentColor` property.
</div>

<div class="cinch-up">
![The Gulp `addClass` function used to process the SVGs](../assets/img/mixi-modular-interpolation-workflow.png)
</div>
 
#### Recording data 
Each piece of furniture and its relative position were stored in a JSON object. When a client would go to print the cut sheet, the data object would be iterated through, generating a list of parts that the studio could itemize for the fabricator.

<div class="bkg:grey pano" data-tab='0'>
<video autoplay playsinline loop>
  <source src="/assets/video/mixi-modular-configurator-demo.mp4" type="video/mp4">
</video>
</div>

</section>

<section class="grid indenter:3/5 flip-top:kid border-top:3px border-accent:yellow">
## Outcome 
 
Whereas before clients would scan or fax hand drawn sketches of their custom builds, the tool created a standard document that was easy for the studio to understand visually. After review, the studio would submit the list of parts to the fabricator without worrying that something might have been lost in translation.

<div>
<p class="h4 font:regular border padding:size3 margin-top:size3 display:inline-block text-align:center">
  <a href="https://xavier.valarino.com/fringe-studio/" >
    <span class="border-bottom:white"
	  aria-hidden="true">
	  →
    </span>
    Try the Application
  </a>
</p>
</div>

<div class="padding-stack">
![](../assets/img/mixi-modular-sample-furniture-skewed.jpg)
</div>

<div class="border:img half margin-top:size3 cinch-up" data-tab="0" >
![Printable build sheet generated by the application](../assets/img/mixi-modular-build-sheet.png)
</div>


</section>
