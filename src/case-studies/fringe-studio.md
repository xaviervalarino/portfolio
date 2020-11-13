---
title: Programming an interactive furniture tool
subtitle: Making it all work together
project: Mixi Configurator
template: case-study.html
---

::: {.r-cell .span:3..}
![](../img/mixi-modular-sample-furniture.jpg)
:::

## Background {.r-cell .span:1-2 .border-top:4pt}
::: {.r-cell .span:3.. .border-top:4pt}
Fringe studio offers a kit of modular furniture for interior designers. Since these designers would use the kit of parts for custom furniture builds, the studio needed to define a process for handling complex orders.
:::
 
### Goal {.r-cell .span:3-3 .border-top:4pt}
::: {.r-cell .span:4.. .border-top:4pt}
Improve how Fringe studio's clientele submit orders for custom furniture builds.
:::

### My Role {.r-cell .span:3-3 .border-top:2pt}
::: {.r-cell .span:4.. .border-top:2pt}
End-to-end design and development, which entailed:

1. Understanding the problem
2. Examining project constraints
3. Designing a solution, and
4. Programming a working application.
:::

## Process{.r-cell .span:1-2 .border-top:4pt}
::: {.r-cell .span:3.. .border-top:4pt}
1. Interviewed the studio to understand how orders were fulfilled 
1. Made recommendations on how we could work around project constraints
1. Designed mockups exploring how clients would create furniture orders.
1. Interviewed interior designers to understand:
	 1. How they thought putting together a furniture configuration
	 2. What the average configuration might look like
	 3. What their expectations were around ordering
:::

### Constraints {.r-cell .span:3-3 .border-top:2pt}
::: {.r-cell .span:4.. .border-top:2pt}
Order fulfillment was complicated, to say the least—standardizing shipping for the custom builds was near impossible with the custom orders and the studio's CMS gave little in the way of configurability and database access.

After considering spinning up a separate VPS or droplet, we decided the best way forward was to build a client-side only Javascript application.

The workflow would allow clients to visualize their custom build, generate a PDF, and then submit it to the studio for pricing. 
:::

### Development {.r-cell .span:3-3 .border-top:2pt}
::: {.r-cell .span:4.. .border-top:2pt}
Since the application was client-side, all the assets were bundled into a blob and dropped into a custom HTML element on one of the studio's webpages.
:::

::: {.r-cell .span:1-3 .margin-right .align-c}
![Before and after SVGs were processed](../img/mixi-modular-color-interpolation.png)
:::

::: {.r-cell .span:4-6 .justify-v:center}

#### Project Scaffolding
Gulp was used for preprocessing and bundling, including preparing images assets.

SVG format was used for the images, which could be easily inlined as text into the distribution code. Another benefit of SVG was that the application could programmatically change the colors and background patterns through CSS styles.
:::

::: {.r-cell .span:1-2 .justify-v:center .align-r}
The Gulp pipeline was built to prepare the images. It would stream the SVGs as raw text through a helper function (`addClass`) which would locate target colors and replace them with a CSS class. These classes were then targeted by the application JS to change the furniture color in synchrony with the dropdown menus.

Assigning multiple colors was done through two separate properties: one through the CSS `color` property and the other through the SVG `currentColor` property.
:::

::: {.r-cell .span:3.. .padding-left:l}
![The Gulp `addClass` function used to process the SVGs](../img/mixi-modular-interpolation-workflow.png)
:::

::: {.r-cell .span:2-5 .align-c }
#### Recording data 
Each piece of furniture and it's relative position were stored as JSON object. When a client would go to print the cut sheet, the data object would be iterated through, generating a list of parts that the studio could itemize for the fabricator.
:::

<div class="r-cell span:1-6 align-r"><video autoplay loop>
	  <source src="/assets/mixi-modular-configurator-demo.mp4" type="video/mp4">
	</video>
</div>

## Outcome {.r-cell .span:1-2 .border-top:4pt}
::: {.r-cell .span:3.. .border-top:4pt}
Whereas before clients would scan or fax hand drawn sketches of their custom builds, the tool created a standard document that was easy for the studio to understand visually. After review, the studio would submit the list of parts to the fabricator without worrying that something might have been lost in translation.
:::

---

### [&#8594; Try the prototype](https://xavier.valarino.com/fringe-studio/) {.r-cell .span:3.. .align-c }

---

::: {.r-cell .span:3.. .shadow}
![](../img/mixi-modular-build-sheet.png)
:::
