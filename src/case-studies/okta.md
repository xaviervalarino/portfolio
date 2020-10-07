---
title: UX Portfolio
---

# Case Studies

1. Creating Branding Guidelines
   Identifying parts of an application

2. Specifications for a flexible Captive Portal
   Defining how those parts behave

3. Designing a customizable Dashboard
   Understanding how parts make up the whole

4. Programming an interactive furniture tool
   Making all the parts work together
   Prototyping and beyond

--------------------------------------------------------------------------------

## Creating branding guidelines
Identifying parts of an application

### As it relates
How do you break down an application into it's smallest pieces?

### Problem
Third party vendors wanted to rebrand our desktop application, SecurityScore. We needed to specify what parts could be changed and provide guidelines on how they could do it.

### How
Worked alongside the lead designer to identify each piece of the application, then documented them.

### Role
### Background


--------------------------------------------------------------------------------

## Specifications for a flexible captive portal
Defining how components should behave

### As it relates
How to you design components that are flexible to different types of content?

### Problem
Specifications for a captive portal on Netgears Cloud Wireless Management SaaS application.

### How
Built functional prototypes in HTML and CSS in order to understand how each part would look in different viewport sizes.

### Role
Design
Prototyping

### Background

Netgear’s Cloud Wireless Management is a cloud application geared towards network administrators working with hundreds of access points at multiple locations.
I was brought on to design many of the interfaces on this system. One of the larger features I worked on were the monitoring dashboards.

--------------------------------------------------------------------------------
## Designing a customizable Dashboard
Understanding how parts make up the whole

### As it relates
How to you align user goals with the database schema to create something that is useful?

### Goal
Design a dashboard that would allow users to set their own data filters and visualizations based on their own network topology and security policies.

### How
Understand how the application recorded information:
- Devices information included:
    - Device type
    - Device location
    - Number of issues
    - The severity of the issues



Visualized this information into a tree chart to understand what representations would make sense for each kind of data.

Then designed the modal used to configure the individual charts based off of the tree diagram.

Lastly, showed how a user would get to this modal. The main goal, for the dashboard , and the one that be used most frequently, was as a way for them to dive down into the devices that needed further investigation. Because of this, it was important that the configuration not get in the way, but was easy enough to get to.

Two types of configuration, moving the dashboard widgets around, and changing the filters used for the data. This made three layers of interaction:
1. Daily Use: using the dashboard for diving into devices that need further investigation
2. Arrangement: moving the widgets around and resizing them
3. Configuration: selecting the data visualization type (bar chart, ring chart, or a number/percentage) and adding filters for what was being represented.

### Role
### Background
GEARS Cloud was a device management tool aimed at assisting IT teams manage company computers. Each device would be installed with a client that would test against a set of company defined compliance policies.
I was assigned the task of designing
a dashboard 2.0 that would build on what was on the (then current) web application. My main objective was to design a way for users to personalize their dashboards to best fit the the topology of their corporate network.
What became the most important consideration of the dashboard’s design was not necessarily how a user would edit the layout and chart parameters, but instead how frequently they would perform those tasks.
My final design broke the configuration into three different states: monitoring, layout, and individual chart configuration.

The dashboard’s main function was to surface issues and open pages with pre-sorted tables by clicking on chart elements. In order to avoid a user accidentally editing the dashboard while performing this action, all configuration functionality was placed in an edit state that a user would have to initiate. A user would only be able to play with the layout by entering into this edit mode.

Once the user entered the edit mode, chart colors would dim to signal state change. Users would then be able to change the layout by either moving existing widgets around or creating new ones.

Chart widgets would reflow based on a grid system, spanning either two or three columns. Their width were predetermined and based on which chart visualization had been chosen.

GEARS Cloud could group data by the device type, the policy being enforced, or the location. I decided to use these as chart dimensions. These dimensions would be measured by the number of devices that did or did not have issues. (An issue was an individual parameter of of a policy.)
Diagrams were created to understand how this would result in an actual data visualization.

Using those diagrams as my point of departure, I designed the modal config windows alongside the chart they would create.
Available options in the ‘Group chart items by’ section would change based on the selections made above it

Once all stakeholders had signed off on the user interaction, I cleaned up the visual style. In order to reduce visual clutter, I switched out the chart borders for a light gray background, and distinguished the left navigation by making it all one color.

--------------------------------------------------------------------------------
## Programming an interactive furniture tool
Prototyping and beyond

### As it relates
Once you have an idea, how do you build it?

### Problem
Client wanted to an interactive tool that would allow their client to put together a spec sheet of all the pieces they wanted to order.

### How
Designed and built an interactive tool that allowed interior decorators to drag and drop custom furniture pieces to create custom configurations for ordering.


#### Approach
- Data-uri for the images since it was on a CMS with limited.
- Pre-processing SVGs to replace a color value with a variable to allow for the colors to change.

#### Object oriented approach
Generated a parts list by iterating through the object that recorded all of the pieces that were on the canvas.

#### Optimizations
Using CSS3 transformations for the rulers to prevent the DOM from reflowing each time the composition changed.

### Role

### Background
	
