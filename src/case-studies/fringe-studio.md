---
title: Programming an interactive furniture tool
project: Fringe Studio's Mixi Modular configurator
goal:
type:
    - visual design
    - user experience design
    - web development
role:
    - visual design
    - developer
year: 2016
---
Making all the parts work together

![](../img/mixi-modular-sample-furniture.jpg)
## Background
Fringe Studio offers a kit of modular furniture for interior designers. Since these designers would use the kit of parts for custom furniture builds, the studio needed to define a process for handling complex orders *Something missing*
 
 
## Goal
Improve how Fringe Studio's clientele submit orders for custom furniture builds.

## Role
End-to-end design and development, which entailed: understanding the problem; examining project constraints; designing a solution; and programming a working application.

### Process
- Interviewed the studio to understand how orders were fulfilled 
- Made recommendations on how we could work around project constraints
- Designed mockups exploring how clients would create furniture orders.
- User testing? How did it happen? small scale, budget constraint. 

## Constraints
The studio's CMS was not meant for custom Javascript and our budget didn't allow for a separate dedicated server. This meant that the application would have to be client-side only.

Clients would generate a PDF that they could then submit to the studio for pricing. 

## Development
Since the application was client-side, all the assets were bundled into a blob and dropped into a custom HTML element on one of the website pages.

### Project scaffolding
Gulp was used for preprocessing and bundling, including preparing images assets.

![](../img/mixi-modular-color-interpolation.png)
SVG format was used for the images, which could be easily inlined as text into the final distribution blob. Another benefit of using SVG was that the application could programmatically change the colors and background patterns through CSS styles.

A Gulp pipeline was built to prepare the images. It would stream the SVGs as raw text through a helper function `addClass`, which would locate target colors and replace them with a CSS class. These classes were then targeted by the application JS to change the furniture colors.
![](../img/mixi-modular-interpolation-workflow.png)
Assigning multiple colors was done through two separate properties: one through the CSS `color` property and the other through the SVG `currentColor` property.


### Recording data
Each piece of furniture and it's relative position in a JSON object. When a client would go to print the cut sheet, the data object would be iterated through, gener../img/mixi-modular-configurator-user-interface.png/img/mixi-modular-configurator-user-interface.png)
*Video showing third panel with the data obj being modified.*
![](../img/mixi-modular-data-object.png)
## Outcome
Whereas before clients would scan or fax hand drawn sketches of their custom builds, the tool created a standard document that was easy for the studio to understand visually. After review, the studio would submit the list of parts to the fabricator without worrying that something might have been lost in translation.


![](../img/mixi-modular-build-sheet.png)