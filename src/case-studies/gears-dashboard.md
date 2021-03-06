---
title: Designing a customizable dashboard
subtitle: Understanding how parts make up the whole
project: GEARS Dashboard v2.0
template: src/templates/case-study.html
masthead:
  work: true
hero:
  alt: Chart components from GEARS Cloud dashboard
  src: /assets/img/gears-dashboard/gears-dashboard-hero.png
cover_img:
  alt: Cover image of GEARS Cloud Dashboard
  static_src: /assets/img/gears-dashboard/gears-dashboard-cover.png
  hover_src: /assets/img/gears-dashboard/gears-dashboard-cover-hover.png
metadata: src/case-studies/project-roster.yml
filter: scripts/filters/get-next-project.lua
---

<section class="grid indenter:3/5 flip-top:kid border-top:3px border-accent:cyan">
## Background  
GEARS Cloud was an enterprise web application for monitoring devices on corporate networks.

Administrators would define security policies for networked devices, and the application would report back any issues. We had recently added new metrics for triaging devices and needed to update the dashboard to reflect this change.

---

### Goal 
Make the dashboard more useful for a broader set of administrators, especially those with atypical network topologies. 

---

### Role 
In-house user experience designer

Designed the interaction pattern and user interface for dashboard customization.

---

### Outcome
Administrators were able to personalize their dashboard metrics and layout, making it more actionable for their specific networks.

</section>

<section class="grid indenter:3/2/4 split-lists flip-top:kid border-top:3px border-accent:magenta">

## Process 
 
1. Reviewed known issues with the previous dashboard
2. Mapped application data to meaningful visual representations
3. Designed a modal window for configuring the visualizations
4. Incorporated the configuration feature into the dashboard

---

### Known problems
Interviews had shown us that the dashboard wasn't providing much utility for a large segment of our users. It had only been designed for one use case: a single network in an office building or on a small campus. Making the dashboard configurable would allow users to filter for user-generated compliance policies, groups, and locations.  

<div class="shadow:img margin-stack">
![Screenshot of the previous dashboard](../assets/img/gears-dashboard/gears-old-dashboard.png)
</div>

---

### Visualizing a solution

How could I align user goals with the database schema to create something useful?

**The application recorded device information across three dimensions:**

- Device type
- Device location
- Security policies

**The metrics applied to these dimensions were:**

- Number of issues
- Issue Severity
    
<div class="subgrid side-by-side">
![Tree diagram showing relationship between recorded data and chart types](../assets/img/gears-dashboard/GEARS-dashboard-device-tree-diagram.png)
 
I created tree diagrams to map how application data could be represented visually.
I then used the tree diagrams as a rubric for the controls in the modal editor.
</div>
 
<div class="subgrid side-by-side">
![Modal editor configuring a list of 'lost devices'](../assets/img/gears-dashboard/GEARS-dashboard-edit-chart-lost-devices.png)
 
![Modal editor configuring a bar chart of devices with 'unwanted applications'](../assets/img/gears-dashboard/GEARS-dashboard-edit-chart-potentially-unwanted-applications.png)
</div>
 
#### Frequency of use
An important design consideration was how frequently administrators would configure the charts on their dashboard.

The primary use of the dashboard was to, all at once, give a bird's eye view of the network while giving the administrator a way to effortlessly drill down into problematic devices.


<div class="left-third cinch-up">
![Sketching out how user goals map to features over time](../assets/img/gears-dashboard/GEARS-dashboard-lifecycle.jpeg)
</div>

I wanted to make sure that these actions remained prominent, while giving enough visual affordance to the chart configuration features. 
 
 
#### Modal editing
Configuration options were hidden behind an _Edit Dashboard_ button. Designing this modality would safeguard against users accidentally moving the chart widgets when trying to click on chart elements. The colors would dim to cue users of the state change.
 
<div class='subgrid side-by-side border:img margin-top'>
![Mockup of the default dashboard](../assets/img/gears-dashboard/GEARS-default-dashboard.png)

![Mockup of dashboard in "Edit" state](../assets/img/gears-dashboard/GEARS-dashboard-move-chart-widget.png)
</div>
 
#### Customizing the layout
Chart widgets were designed to reflow based on a grid system, spanning either two, three, or four columns. 

<div class='subgrid side-by-side border:img margin-top'>
![Mockup of chart widget being dragged from 4 column space](../assets/img/gears-dashboard/GEARS-dashboard-chart-reflow-on-grid-2.png)

![Mockup of chart widget being dropped into 3 column space](../assets/img/gears-dashboard/GEARS-dashboard-chart-reflow-on-grid-1.png)
</div>
</section>

<section class="grid split-lists indenter:3/2/4 flip-top:kid border-top:3px border-accent:yellow">
## End result 
 
My final design broke the dashboard into three modes:

1. **Daily Use**---using the dashboard as a springboard into devices that needed further investigation 

2. **Arrangement**---moving the widgets around and resizing them. 
3. **Configuration**---Editing chart widgets inputs through a modal window

The result was a highly configurable dashboard with an interface that was clean and goal-oriented.

![Modal chart editor with a live preview](../assets/img/gears-dashboard/GEARS-dashboard-edit-modal-with-preview.png)

Once all stakeholders had signed off on the user interaction, I cleaned up the visual style. In order to reduce visual clutter, I switched out the chart borders for a light gray background, and distinguished the left navigation by making it all one color.

<div class="bkg:grey pano shadow:img">
![The final design with a blue sidebar](../assets/img/gears-dashboard/GEARS-dashboard-blue-sidebar.png)
</div>

</section>
