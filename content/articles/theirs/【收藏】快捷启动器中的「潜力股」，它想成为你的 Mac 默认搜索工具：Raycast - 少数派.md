---
title: 【收藏】快捷启动器中的「潜力股」，它想成为你的 Mac 默认搜索工具：Raycast - 少数派
source: https://sspai.com/post/63521
author:
  - 奇客派
published: 2020-11-10
date: 2024-11-29T17:22:19+08:00
description: 目前来看，Raycast 有足够的潜力成为下一款效率神器。但对于国内用户而言，尚未中文化的 Raycast 还有不少路要走。
tags:
  - clippings
  - posted
slug: raycast-potential
draft: false
banner: https://img.qikepai.cn/blog/2020/11/ptPrKc.jpg
---
关于如何提升生产力，这是个可以无限探索下去的话题。所有帮助提升生产力或者改善效率的工具，都是在尽可能压缩核心工作之外的时间，包括 macOS 的「聚焦（Spotlight）」、Alfred 以及接下来要提到的 Raycast。
一开始在 Product Hunt 上看到 Raycast 介绍，觉得其不过是又一个「Alfred」而已。老实说，我并不是 Alfred 的忠实用户，曾因为看到很多人推荐而去安装使用，但略显陈旧的 UI 和繁杂的设置菜单让我觉得「聚焦（Spotlight）」好像也能凑合用着。
如果以 macOS 系统版本风格来比喻的话，Alfred 的 UI 风格应该能匹配几年前的 macOS 吧，而 Raycast 却是能够驾驭 macOS Big Sur 全新的视觉风格。
![Raycast UI](https://img.qikepai.cn/blog/2020/11/ptPrKc.jpg)
为了避免造成误解，我这里就不进行两者的比较，开发者针对 Raycast、聚焦（Spotlight）以及 Alfred 的区别也做了简单的[说明](https://sspai.com/link?target=https%3A%2F%2Fraycast.com%2Ffaq)，有兴趣可以跳转查看，当然也欢迎有心得的朋友补充在评论区一起交流。
## **为开发人员定制的生产力工具**
Raycast 是直到 10 月 29 日才放出这第一个公测版本，对外宣布种子轮已筹集 270 万美元。根据开发者介绍，Raycast 正是受命令行的启发，作为软件工程师，他们注意到自己真正写代码的时间越来越少，反而需要更多的时间来管理软件开发，例如跟踪 bug 反馈、管理 sprint、发布新版本等等，这些都需要借助网页端或者其它的不同工具来完成。
于是，Raycast 正是为了解决他们的困扰而创建，尽可能将常用的管理开发、内部会议、任务规划等内容集成在一起，腾出更多地时间放在编写代码上。简单过一下 Raycast 目前所能实现的核心功能：
- 在 macOS 上启动程序或者搜索文件，相当于聚焦（Spotlight）；
- 在 Asana、GitHub、Jira 或 Linear 中创建、搜索和关闭 issues；
- 批准、合并和关闭 GitHub 的拉取请求；
- 调用 Zoom 管理日常会议；
- 支持快捷设置日程、待办事项以及其它诸多系统设置；
- 支持脚本扩展；
- ……
虽然我可能并不是 Raycast 的精准目标用户，但这段时间体验下来确实发现了不少惊喜，让我开始习惯用 Raycast 取代聚焦（Spotlight）。
## 功能体验
### 可完全取代聚焦（Spotlight）
既然 Raycast 包含了聚焦（Spotlight）的功能，意味着你完全可以用 Raycast 替换掉它。单从 UI 上来说，Raycast 比 Alfred 更有 macOS 原生应用的感觉，替代聚焦（Spotlight）完全不会产生违和感。
![Raycast UI](https://img.qikepai.cn/blog/2020/11/nDaOyl.jpg)
Raycast 开启后，菜单栏会有常驻图标，当然也可以通过快捷键呼出 Raycast，默认快捷键为「option + 空格」，设置菜单里还「贴心」地给出了替换聚焦（Spotlight）的方法——其实就是在系统设置中关闭聚焦（Spotlight）的快捷键，然后把 Raycast 快捷键改为「command + 空格」。
![Raycast 设置](https://img.qikepai.cn/blog/2020/11/0GTfBa.jpg)
与聚焦（Spotlight）、Alfred 不一样，呼出 Raycast 之后并非只显示一个搜索框，还包含一些推荐项目（根据使用频率推荐）、手动收藏项目以及快捷操作，下滑则能看到所有的项目。
![Raycast 推荐项目](https://img.qikepai.cn/blog/2020/11/8ar4lz.jpg)
你可以在搜索框中任意输入内容，优先会展示本地已有的应用或者快捷命令，其次可选搜索文件或者直接在搜索引擎中搜素。Raycast 默认只有 Google、DuckDuckGo 两种搜索引擎且无法修改。
软件右下角有快捷菜单，除了打开应用/文件之外，还可以快速定位文件位置或者执行其它操作，而且这些所有的一系列操作都可以使用快捷键完成。
![Raycast 快捷菜单](https://img.qikepai.cn/blog/2020/11/6ZKH45.jpg)
文件搜索功能支持部分图片、文档预览，且能显示文件详细信息，这个比聚焦（Spotlight）实用性更高。
关于应用快捷启动以及文件搜索与聚焦（Spotlight）还是比较类似的，只是在一些功能上做得更加细致，这里就不花费更多篇幅介绍了，毕竟这个并不算核心亮点。
### 支持管理日程、待办事项、剪贴板历史等
Raycast 对接了不少第三方应用的功能服务，也包括 macOS 系统自带的日程查看以及待办事项管理，这些所能实现的操作在设置中都可以直接看到，可手动选择关闭。
![Raycast 日程管理](https://img.qikepai.cn/blog/2020/11/OSae9l.gif)
不过同样是系统应用，通过 Raycast 可以查看、创建待办事项，而日历日程却只能查看，无法通过 Raycast 新建。
![Raycast 待办事项](https://img.qikepai.cn/blog/2020/11/FEMAP6.jpg)
![Raycast 日历日程](https://img.qikepai.cn/blog/2020/11/bZ9nh3.jpg)
待办事项同步 macOS 的提醒事项，可以查看、勾选已完成的目标事项，也可以自由创建。直接可以在 Raycast 中完成，无需单独打开提醒事项，效率明显提升了不少。
剪贴板历史记录算是 Raycast 给我的一个小小惊喜，这是 Raycast 本身自带的小功能。关于剪贴板管理器，我之前也用过一段时间的 Paste，但发现自己其实用到的并不多，没必要单独开一个软件持续后台，另外考虑到云端同步的隐私安全，Paste 我就并没有用很久。而通过 Raycast 搜索「Clipboard History」，能够直接查看近期的剪贴板记录。
![Raycast 剪贴板历史](https://img.qikepai.cn/blog/2020/11/LnaTZD.jpg)
手动数了一下，Raycast 能够保存 50 条最近的历史记录，而且还可以选中部分历史复制内容置顶。至于隐私问题应该不用担心，Raycast 本身所有的数据都加密保存在本地，即便对接一些第三方 API 服务也是直接传送到对应云端，并不存在「中间商」。
### 接入第三方服务高效协作
如之前所言，Raycast 主要面向开发人员。目前 Raycast 已经接入了 GitHub、Jira、G Suite、Linear、Asana、Zoom 等服务，能够快速完成特定操作。
![Raycast 第三方服务](https://img.qikepai.cn/blog/2020/11/3IqgI1.jpg)
用户需要通过 OAuth 协议登录指定服务，已完成自有账号内容的双向同步。
不过很遗憾，我并不是程序员，不在 GitHub 中处理开发任务，所以没办法展示，你可以查看[官方演示视频](https://sspai.com/link?target=https%3A%2F%2Fraycast.com%2Fextensions%2Fgithub) 查看具体用法，功能上还是表现地很直观的，几乎无需打开浏览器网页。
![Raycast GitHub](https://img.qikepai.cn/blog/2020/11/IYbjN4.jpg)
![Raycast Zoom](https://img.qikepai.cn/blog/2020/11/KMO5lv.jpg)
同样，Zoom 也需要完成登录，才能在 Raycast 中创建会议、查看待参加会议等，只是加入会议时需要调用本地 Zoom 客户端接入。
目前看来，Raycast 对目前已有的第三方协作服务的整合还是比较深入的，能够直接在 Raycast 上完成操作，而省去了来回切换网页或者工具软件的繁琐。
### 系统快捷设置，支持脚本命令
日常使用电脑，可能经常会需要调整一些系统设置项，例如音量调节、休眠、锁屏或者深色模式切换等等，有快捷按键的还好，更多的是需要进入设置中去找，这个过程本身就会比较浪费时间。所以不少用户会通过第三方工具来完成，例如 [One Switch](https://sspai.com/item/77) 等。
![Raycast 系统设置](https://img.qikepai.cn/blog/2020/11/NDXGs6.jpg)
Raycast 本身内置了一些系统功能调节，同时支持加载命令脚本，意味着能够将很多较为隐秘的系统设置融入 Raycast 实现快捷操作。
![Raycast 脚本命令](https://img.qikepai.cn/blog/2020/11/Efyxf5.jpg)
![Raycast 深色模式](https://img.qikepai.cn/blog/2020/11/UcqA8T.jpg)
而通过脚本命令还能实现 Raycast 没有内置的一些系统功能，添加其它一些快捷操作。由于我使用时间并不长，所添加的第三方脚本命令并不多，唯一用得最多的就是「深色模式快捷切换」。
![Raycast 深色模式快捷切换](https://img.qikepai.cn/blog/2020/11/Z3vSSt.jpg)
如果你觉得用搜索的方式还不够快，你可以单独设置快捷键，真正实现一键切换。
Raycast [提供](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2Fraycast%2Fscript-commands%2Fblob%2Fmaster%2Fextensions.md) 了大量的脚本命令可供直接安装，大家可以根据需要自行添加，有能力的也可以自己[参考规范](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2Fraycast%2Fscript-commands) 编写。
### 小功能：资讯浏览、计算器、汇率转换、时间查询等
Raycast 还集成了一些小功能，这些在设置中并不能直接看到，所以阅读[手册](https://sspai.com/link?target=https%3A%2F%2Fwww.notion.so%2FRaycast-Manual-d5c85a7694dc4e4088b8b93557ea6d2d) 彻底了解 Raycast 还是很有必要的。
资讯浏览功能算是隐藏的小彩蛋，不过 Raycast 目前只内置有 Hacker News 的资讯源，能够查看最新的三十条资讯标题，如果看到有兴趣的再点击跳转网页查看。
![Raycast 资讯浏览](https://img.qikepai.cn/blog/2020/11/fd3NSI.jpg)
类似的资讯浏览方式，在之前使用的 Here 应用中见到过，类似 RSS 订阅。如果 Raycast 这个功能能够支持自定义，就能够自由添加更多新闻源，对于我这种经常关注资讯的还是挺有用的，毕竟大部分的快资讯看看标题就能知道有没有价值了。
![Raycast 资讯浏览](https://img.qikepai.cn/blog/2020/11/xr894v.jpg)
计算器、汇率转换、时间查询……Raycast 似乎还在继续增加很多小功能，不知道这些有没有能吸引你。
![Raycast 计算器](https://img.qikepai.cn/blog/2020/11/XQrZQN.jpg)
![Raycast 汇率转换](https://img.qikepai.cn/blog/2020/11/6yCEfL.jpg)
![Raycast 时间查询](https://img.qikepai.cn/blog/2020/11/4JthBe.jpg)
使用 Raycast 不到一个星期，显然觉得还有很多东西我并没有能深刻体验到，但现在仅有的一些已经足够让我惊喜。
Raycast 和 Alfred 确实存在很多相似之处，但 Raycast 对第三方服务的整合更加深入，包括操作视图、信息展示更详细，除了本身涵盖的一些系统快捷设置之外，还可以通过命令脚本扩展，可玩性大大增强。想到这里，我觉得聚焦（Spotlight）要在系统设置里长眠了。
关于 Raycast 得收费计划，开发团队也已经声明了，目前公测阶段会保持免费，后期会有针对高级用户和团队的付费模式，核心功能仍然保持免费。在 macOS 版本正式上线之后，Raycast 也会逐渐支持 Windows 和 Linux 端，这对广大开发人员来说算是大好消息。
目前来看，Raycast 有足够的潜力成为下一款效率神器。但对于国内用户而言，如果不加入中文支持便捷性会大打折扣，单纯通过英文搜索（不支持拼音）对于国内用户着实不够友好。被许多人称道的 Notion 至今还没实现中文化，Raycast 目测也还有很长的路要走。
