---
title: Designing a customizable dashboard
subtitle: Understanding how parts make up the whole
project: GEARS Dashboard v2.0
template: case-study.html
---


## Background  {.r-cell .span:1-2 .border-top:4pt}
::: {.r-cell .span:3.. .border-top:4pt}
GEARS was a SaaS application for monitoring devices on corporate networks. 

Administrators would define security policies for networked devices, and the application would report back any issues. We had recently added new metrics for triaging devices and needed to update the dashboard to reflect this change. This gave us the opportunity to make the dashboard more useful to customers with atypical network topologies.
:::

### Goal {.r-cell .span:3-3 .border-top:2pt}
::: {.r-cell .span:4.. .border-top:2pt}
Provide administrators with configuration options for personalizing their account dashboard.
:::

### My Role {.r-cell .span:3-3 .border-top:2pt}
::: {.r-cell .span:4.. .border-top:2pt }
Designed the interaction pattern and user interface for dashboard customization.
:::

## Process {.r-cell .span:1-2 .border-top:4pt}
::: {.r-cell .span:3.. .border-top:4pt}
1. Mapped application data to meaningful visual representations
2. Designed a modal window for configuring the visualizations
3, Incorporated the configuration feature into the dashboard
:::

### The Problem  {.r-cell .span:3-3 .border-top:2pt}
:::{.r-cell .span:4.. .border-top:2pt }
How could I align user goals with the database schema to create something useful?

The application recorded device information across three dimensions:

- Device type
- Device location
- Security policies

The metrics applied to these dimensions were:

- Number of issues
- Issue Severity
    
:::

::: {.r-cell .span:row .align-c}
![Tree diagram showing relationship between recorded data and chart types](../img/GEARS-dashboard-device-tree-diagram.png)
:::

::: {.r-cell .span:3-4 .border-top:h4}
I created tree diagrams to map how application data could be represented visually.
I then used the tree diagrams as a rubric for the controls in the modal editor.
:::

::: {.r-cell .span:row .align-c}
![Modal editor configuring a list of 'lost devices'](../img/GEARS-dashboard-edit-chart-lost-devices.png)
:::
::: {.r-cell .span:row .align-c}
![Modal editor configuring a  bar chart of devices with 'unwanted applications'](../img/GEARS-dashboard-edit-chart-potentially-unwanted-applications.png)
:::

::: {.r-cell .span:2-3 .margin-right .align-r}
#### Frequency of use
An important design consideration was how frequently administrators would configure the charts on their dashboard. The dashboard was like a springboard, giving administrators a birds eye view of the network while providing a clear route to devices that needed review. 

The primary use of the dashboard was at to, all at once, give a birds eye view of the network while giving the administrator a way to effortlessly drill down into problematic devices.
I wanted to make sure that these actions remained prominent, while giving enough visual affordance to the chart configuration features. 
:::

::: {.r-cell .span:4-6 }
![Sketching out how user goals would relate to their networks](../img/GEARS-dashboard-lifecycle.jpeg)
:::





::: {.r-cell .span:1-4 .margin-right}
![Mockup of the default dashboard](../img/GEARS-default-dashboard.png){.shadow}
:::

::: {.r-cell .span:2 .justify-v:center .margin-bottom}
#### Modal editing
Configuration options were hidden behind an _Edit Dashboard_ button. This was done as a safeguard against users accidentally moving the chart widgets when trying to click on chart elements. The colors would dim to queue the user of the state change.
:::

::: {.r-cell .span:3..}
![Mockup of dashboard in "Edit" state](../img/GEARS-dashboard-move-chart-widget.png){.shadow}
:::

::: {.r-cell .span:2-6}
![](.../img/GEARS-dashboard-chart-reflow-on-grid-1.png){.shadow}
:::

::: {.r-cell .span:1-4 }
![](../img/GEARS-dashboard-chart-reflow-on-grid-2.png){.shadow}
:::

:::{.r-cell .span:2-4  .align-r .margin-left}
### Customizing the layout
Chart widgets were design to reflow based on a grid system, spanning either two or three columns. Their width were predetermined and based on which chart visualization had been chosen.
:::

## Outcome {.r-cell .span:1-2 .border-top:4pt}
::: {.r-cell .span:3.. .border-top:4pt}
**My final design broke the dashboard into three modes:**

1. *Daily Use:* using the dashboard as a springboard into devices that needed further investigation 

2. *Arrangement:* moving the widgets around and resizing them. 
3. *Configuration:* Editing chart widgets through a modal window

The result was a highly configurable dashboard with an interface that was clean and goal-oriented.
:::


::: {.r-cell .span:2-5 .align-r}
![Modal chart editor with a live preview](../img/GEARS-dashboard-edit-modal-with-preview.png)
:::

::: {.r-cell .span:2-5 .align-r}
![The final design with a blue sidebar](../img/GEARS-dashboard-blue-sidebar.png)
:::

::: {.r-cell .span:3-4 .border-top:2pt .align-c}
Once all stakeholders had signed off on the user interaction, I cleaned up the visual style. In order to reduce visual clutter, I switched out the chart borders for a light gray background, and distinguished the left navigation by making it all one color.
:::
