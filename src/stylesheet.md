---
title: Test classes
template: case-study.html
---

:::{.r-cell .span:row}
## Padding classes {.border-top:L}
| modifier | affects                           | 
| ---      | ---                               |
| :pS      | x 1.4 smaller                     |
| :pL      | x 1.4 larger                      |
| :pXL     | x 1.4^2^ larger                   |
| :pXXL    | x 1.4^3^ larger                   |
| :pXXL    | x 1.4^4^ larger                   |
| -top     | padding-top:                      |
| -right   | padding-right:                    |
| -bottom  | padding-bottom:                   |
| -left    | padding-left:                     |
| -lat     | padding-right:<br/> padding-left  |
| -lon     | padding-top:<br/> padding-bottom  |

<!-- test cases -->
:::{.r-grid .test .border:bXL .padding }
<!-- standard usage -->
<div class="r-cell padding border margin:mS">
  <div class="border">.padding</div>
</div>
<!-- sizes -->
<div class="r-cell padding:pS border margin:mS">
  <div class="border"> .padding:pS </div>
</div>
<div class="r-cell padding:pL border margin:mS">
  <div class="border"> .padding:pL </div>
</div>
<div class="r-cell padding:pXL border margin:mS">
  <div class="border"> .padding:pXL </div>
</div>
<div class="r-cell padding:pXXL border margin:mS">
  <div class="border"> .padding:pXXL </div>
</div>
<div class="r-cell padding:pXXXL border margin:mS">
  <div class="border"> .padding:pXXXL </div>
</div>

<div class="r-cell border margin:mS padding">
  <div class="border"> Test padding last class listed </div>
</div>

<!-- sides -->
<div class="r-cell padding-top border margin:mS">
  <div class="border"> .padding-top </div>
</div>
<div class="r-cell padding-right border margin:mS">
  <div class="border"> .padding-right </div>
</div>
<div class="r-cell padding-bottom border margin:mS">
  <div class="border"> .padding-bottom </div>
</div>
<div class="r-cell padding-left border margin:mS">
  <div class="border"> .padding-left </div>
</div>
<div class="r-cell padding-lat border margin:mS">
  <div class="border"> .padding-lat </div>
</div>
<div class="r-cell padding-lon border margin:mS">
  <div class="border"> .padding-lon </div>
</div>
:::
:::

:::{.r-cell .span:row}
## Margin classes {.border-top:L}
| modifier | affects                         | 
| ---      | ---                             |
| :mS      | x 1.4 smaller                   |
| :mL      | x 1.4 larger                    |
| :mXL     | x 1.4^2^ larger                 |
| :mXXL    | x 1.4^3^ larger                 |
| :mXXL    | x 1.4^4^ larger                 |
| -top     | margin-top:                     |
| -right   | margin-right:                   |
| -bottom  | margin-bottom:                  |
| -left    | margin-left:                    |
| -lat     | margin-right:</br> margin-left: |
| -lon     | margin-top:</br> margin-bottom: |

<!-- test cases -->
:::{.r-grid .test .border:bXL .margin }
<!-- standard usage -->
<div class="r-cell border margin:mS">
  <div class="margin border">.margin</div>
</div>
<!-- sizes -->
<div class="r-cell border margin:mS">
  <div class="margin:mS border"> .margin:mS </div>
</div>
<div class="r-cell border margin:mS">
  <div class="margin:mL border"> .margin:mL </div>
</div>
<div class="r-cell border margin:mS">
  <div class="margin:mXL border"> .margin:mXL </div>
</div>
<div class="r-cell border margin:mS">
  <div class="margin:mXXL border"> .margin:mXXL </div>
</div>
<div class="r-cell border margin:mS">
  <div class="margin:mXXXL border"> .margin:mXXXL </div>
</div>

<div class="r-cell border margin">
  <div class="border margin:mS"> Test margin last class listed </div>
</div>

<div class="r-cell border margin:mS">
  <div class="margin-top border"> .margin-top </div>
</div>
<div class="r-cell border margin:mS">
  <div class="margin-right border"> .margin-right </div>
</div>
<div class="r-cell border margin:mS">
  <div class="margin-bottom border"> .margin-bottom </div>
</div>
<div class="r-cell border margin:mS">
  <div class="margin-left border"> .margin-left </div>
</div>
<div class="r-cell border margin:mS">
  <div class="margin-lat border"> .margin-lat </div>
</div>
<div class="r-cell border margin:mS">
  <div class="margin-lon border"> .margin-lon </div>
</div>
:::
:::
:::

---

:::{.r-cell .span:row}
## Border classes
| modifier | affects                         | 
| ---      | ---                             |
| :2pt | 2pt of pica                         |
| :3pt | 3pt of pica                         |
| :4pt | 4pt of pica                         |
| :5pt | 5pt of pica                         |
| -top     | border-top:                     |
| -right   | border-right:                   |
| -bottom  | border-bottom:                  |
| -left    | border-left:                    |
| -lat     | border-right:</br> border-left: |
| -lon     | border-top:</br> border-bottom: |


:::{.test .r-grid .border:bXL .padding }
<!-- test cases -->
<div class="r-cell padding border margin">
 .border
</div>
<div class="r-cell padding border:2pt margin">
 .border:2pt
</div>
<div class="r-cell padding border:3pt margin">
 .border:3pt
</div>
<div class="r-cell padding border:4pt margin">
 .border:4pt
</div>
<div class="r-cell padding border:5pt margin">
 .border:5pt
</div>

<div class="r-cell padding border-top margin">
  .border-top
</div>
<div class="r-cell padding border-right margin">
  .border-right
</div>
<div class="r-cell padding border-bottom margin">
  .border-bottom
</div>
<div class="r-cell padding border-left margin">
  .border-left
</div>
<div class="r-cell padding border-lat margin">
  .border-lat
</div>
<div class="r-cell padding border-lon margin">
  .border-lon
</div>
<div class="r-cell padding margin border">
  .border last class
</div>
<div class="r-cell padding border-top:bL margin">
 .border-top:bL
</div>
<div class="r-cell padding border-left:bXL margin">
 .border-left:bXL
</div>
<div class="r-cell padding border-bottom:bXXL margin">
 .border-bottom:bXXL
</div>
<div class="r-cell padding border:bXXXL margin">
 .border:bXXXL
</div>
:::
:::

---

###  .span:1 {.r-cell .span:1}
###  .span:2 {.r-cell .span:2}
###  .span:3 {.r-cell .span:3}
###  .span:4 {.r-cell .span:4}
###  .span:5 {.r-cell .span:5}
###  .span:6 {.r-cell .span:6}

----

###  .span:1.. {.r-cell .span:1..}
###  .span:2.. {.r-cell .span:2..}
###  .span:3.. {.r-cell .span:3..}
###  .span:4.. {.r-cell .span:4..}
###  .span:5.. {.r-cell .span:5..}
###  .span:6.. {.r-cell .span:6..}
###  .span:.. {.span:.. .r-cell}

---

###  .span:1-5 {.r-cell .span:1-5}
###  .span:2-5 {.r-cell .span:2-5}
###  .span:2-4 {.r-cell .span:2-4}
###  .span:3-5 {.r-cell .span:3-5}
###  .span:5-2 {.r-cell .span:5-2}
###  .span:6-1 {.r-cell .span:6-1}

---

###  .span:2+1 { class="r-cell span:2+1"}
###  .span:2+2 { class="r-cell span:2+2"}
###  .span:2+3 { class="r-cell span:2+3"}
###  .span:4+1 { class="r-cell span:4+1"}
###  .span:4+3 { class="r-cell span:4+3"}
###  .span:5+1 { class="r-cell span:5+1"}
