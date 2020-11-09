---
title: Designing a customizable dashboard
subtitle: Understanding how parts make up the whole
project: GEARS Dashboard v2.0
template: case-study.html
---


## Background  {.r-cell .span:1-2 .border-top:h2}
::: {.r-cell .span:3.. .border-top:h2}
GEARS was a SaaS application for monitoring devices on corporate networks. 

Admin would define rules that the application would report back as out of compliance (as an issue).

It would report issues based on user configured security policies. We had recently added new metrics for triaging devices and needed to update the dashboard to reflect this change. This gave us the opportunity to make the dashboard more useful to customers with atypical network topologies.
:::

### Goal {.r-cell .span:3-3 .border-top:h3}
::: {.r-cell .span:4.. .border-top:h3}
Provide administrators with configuration options for personalizing their account dashboard.
:::

### My Role {.r-cell .span:3-3 .border-top:h3}
::: {.r-cell .span:4.. .border-top:h3 }
Designed the interaction pattern and user interface for dashboard customization.
:::

## Process {.r-cell .span:1-2 .border-top:h2}
::: {.r-cell .span:3.. .border-top:h2}
**What's the goal here???**

- Mapped application data to meaningful visual representations
- Designed a modal window for configuring the visualizations
- Incorporated the configuration feature into the dashboard
:::

### The problem  {.r-cell .span:3-3 .border-top:h3}
:::{.r-cell .span:4.. .border-top:h3 }
How could I align user goals with the database schema to create something useful?

 The application recorded device information across 3 dimensions:
    - Device type
    - Device location
    - Security policies

The metrics applied to these dimensions were: 
    - Number of issues
    - Issue Severity
:::

::: {.r-cell .span:3}
![Tree Diagram showing relationship between recorded data and chart types](../img/GEARS-dashboard-device-tree-diagram.png)
:::

::: {.r-cell .span:4-5 .justify-v:center}
I created tree diagram was used to map how application data could be represented visually.
The tree diagram was then used as a rubric for the controls in the modal editor.
:::

::: {.r-cell .span:3}
![](../img/GEARS-dashboard-edit-chart-lost-devices.png)
:::
::: {.r-cell .span:3}
![](../img/GEARS-dashboard-edit-chart-potentially-unwanted-applications.png)
:::

::: {.r-cell .span:2-3 .margin-right .align-r}
#### Frequency of use
An important design consideration was how frequently administrators would configure the charts on their dashboard. - why? most frequent actions where most prominent, so less frequent actions shouldn't get in the way.

*ACTIVE VOICE* admins used the dashboard to... my design did...
:::

::: {.r-cell .span:4-6 .cross2}
![](../img/GEARS-dashboard-lifecycle.jpeg)
:::

::: {.r-cell .span:1-3 .justify-v:end .border-top .margin-right}
The primary use of the dashboard was to drill down into problematic devices. Configuring the charts was a less frequent interaction, usually occurring when *there was a change in security policy / change in network topology*
when the account was in flux (a change in security policy, added/removed devices). To keep ancillary interactions from interfering, configuration options were hidden behind an _edit_ state.
:::

::: {.r-cell .span:1-4}
![Mockup of the default dashboard](../img/GEARS-default-dashboard.png){.shadow}
:::

::: {.r-cell .span:3..}
![Mockup of dashboard in "Edit" state](../img/GEARS-dashboard-move-chart-widget.png){.shadow}
:::

:::{.r-cell .span:5.. .margin-left}
Note the color change 
:::


## Outcome {.r-cell .span:1-2 .border-top:h2}
::: {.r-cell .span:3.. .border-top:h2}
My final design broke the dashboard into three modes:

1. *Daily Use:* using the dashboard as a springboard into devices that needed further investigation 

2. *Arrangement:* moving the widgets around and resizing them. 
3. *Configuration:* Editing chart widgets through a modal window

The result was a highly configurable dashboard with an interface that was clean and goal-oriented.
:::

::: {.r-cell .span:3 .margin-right .cross2}
![](.../img/GEARS-dashboard-chart-reflow-on-grid-1.png){.shadow}
:::

::: {.r-cell .span:4-5 .border-top:h3 }
### Diving deeper into the design process
Chart widgets would reflow based on a grid system, spanning either two or three columns. Their width were predetermined and based on which chart visualization had been chosen.
:::

::: {.r-cell .span:3 }
![](../img/GEARS-dashboard-chart-reflow-on-grid-2.png){.shadow}
:::

::: {.r-cell .span:2-5 .align-r}
![Modal chart editor with a live preview](../img/GEARS-dashboard-edit-modal-with-preview.png)
:::

::: {.r-cell .span:2-5 .align-r}
![The final design with a blue sidebar](../img/GEARS-dashboard-blue-sidebar.png)
:::

::: {.r-cell .span:3-4}
Once all stakeholders had signed off on the user interaction, I cleaned up the visual style. In order to reduce visual clutter, I switched out the chart borders for a light gray background, and distinguished the left navigation by making it all one color.
:::
