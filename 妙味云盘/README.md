## 妙味云盘简介：
### 此项目模仿云盘的布局与功能，从布局到功能都用原生js实现，基本实现了云盘中的单选、全选、框选、移动到、删除、添加等操作，但还有许多不完善的地方，后期继续进行修改。
### 1、制作流程：
1： 静态页面完成后，要进行js代码的区分，将代码通过类型不同，分为tools，datas，weiyun，微云Html几个js文件夹，使得代码的分工更加细致，让他们分别作为方法，数据，交互，结构的功能，使代码的可读性和可操作性大大提升，因此，函数的封装和分类在完成微云的过程中起着举足轻重的作用。

2： 码的复用，生成采取递归的方式执行代码，从而使数据无论多么复杂，只要调用函数，都可以自行生成结构。生成结构后就是一些交互效果的展示，可以把每个功能单独分成一个小区域，让大项目变成好多个小功能，这样的思想可以把一个复杂的案例简单化，但是需要注意功能和功能之间的关系，相同的部分可以封装成一个函数进行重复调用，而功能之间的相互干扰，矛盾的功能则需要给该功能的按钮添加状态来控制代码的走向。
### 2、思想：
1： 通过做微云改变最大的还是思想，首先是整体的规划，越大的项目越需要对整个项目过程中流程的掌控，否则做到后面的功能再去修改前面的代码会很麻烦和痛苦，因此在做得过程中需要考虑前面的代码是否会影响后面的，或者前面的代码是否会再后面再次用到，这样可以使项目简单化。
