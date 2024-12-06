---
updated_at: 2024-10-27T11:31:09.698+08:00
edited_seconds: 220
tags:
  - IT/office
created_at: Fri, Dec 6th, 2024 - 13:08:16
banner_icon: 🍷
banner: https://cdn.jsongo.top/banners/8c1ce5c3e62a16997b7cf83e5164726c.jpg
title: 开发 Office Add-ins 应用（一）：在 word 里使用大模型
slug: office-add-ins-1
draft: false
description: Office Add-ins 可以理解为是一种可以扩展 Microsoft Office 应用程序（如 Word、Excel、PowerPoint 等）功能的小程序，能增强 Office 应用程序的能力，能与 Office 文档中的内容进行交互。从技术栈来说，它是基于 Web 技术
---
# 介绍
![](https://cdn.jsongo.top/2024/12/d306f3c989ebb5b3882644abfbd5a49d.webp)
>  Office Add-ins，中文 “加载项”。  
>  下文中，讲到 Add-ins 主要是指这个技术，提到具体应用时，会用“加载项”概念，主要是指 Office 应用中、下图所示的功能。
## 概念
Office **Add-ins** 可以理解为是一种可以扩展 Microsoft Office 应用程序（如 Word、Excel、PowerPoint 等）功能的小程序，能增强 Office 应用程序的能力，能与 Office 文档中的内容进行交互。  
从技术栈来说，它是基于 Web 技术（如 HTML、CSS 和 JavaScript）构建的，可以利用熟悉的 Web 技术栈来创建它们。  
LLM 这两年来的火热，结合强大的内容生产工具套件——Office，其实可以给很多专业的内容工作者带来很大的帮助。
## 工作原理
- **加载机制**：用户在 Office 应用程序（如 Excel）中通过特定的界面（如 “插入” 选项卡中的 “我的加载项”）来加载和运行 Office Add-ins。当用户启动时，Office 应用程序会创建一个运行环境，加载相关的 Web 资源（HTML、CSS、JavaScript），并为 Add-ins 提供访问 Office 文档和应用程序功能的接口。
- **交互方式**：Add-ins 使用 JavaScript 调用 Office JavaScript API，来跟 Office 应用程序进行交互。这个 API 提供了许多对象和方法，允许 Add-ins 读取和写入文档内容、操作 UI 元素（如自定义任务窗格、功能区按钮）等。比如，一个 Word Add-ins 可以使用 API 获取当前文档中的段落数量，或者在文档的特定位置插入文本，或者获取内容然后与 LLM 对话。
## 应用场景
- **数据可视化**：可以将复杂的数据以直观的图表或图形形式展示在 Office 文档中。例如，在 Excel 中创建一个加载项，能够根据工作表中的数据自动生成精美的数据可视化图表，而且这些图表可以根据数据的更新而实时变化。
- **协作工具**：增强 Office 应用程序的协作功能。比如在 Word 文档中添加一个加载项，实现多人同时在线编辑文档时的实时评论和沟通功能，类似于在文档旁边开启一个小型的即时通讯窗口，方便团队成员交流想法。
- **内容生成与自动化**：帮助用户自动生成文档内容或进行格式设置。以 PowerPoint 为例，一个加载项可以根据用户输入的主题和要点自动生成一套完整的幻灯片，包括添加合适的图表、图片和布局等
## Why Add-ins
官网给了一张图：  
	![](https://cdn.jsongo.top/2024/12/ff7e6c77ddcf6130227a8ba4b47e6875.webp)
- 可以跨端，不同端上都有 Office，你写的功能在不同平台上都可以跑起来
- 中心化的分发，不用你自己到处去做上线（如 app Store）
- 很容易下载安装
- 开发的技术栈也都比较友好（Web）

# 市场（AppSource）
[业务应用 - Microsoft AppSource](https://appsource.microsoft.com/zh-cn/marketplace/apps?product=office%3Bword&page=1&src=office&corrid=1f1d6156-7354-6d5f-d739-b9841f6e1c48&omexanonuid=&referralurl=&ClientSessionId=e4728826-ce48-4ae1-83a3-f11b7f195f63)  
	![](https://cdn.jsongo.top/2024/12/f4e96ef3446b8a5867243039bbea65ee.webp)  
可以看到已经有很多 AI 应用了，这个截图还只是首页的前几个应用。有不少官方也都上线了 Office Add-ins 应用，比如 Grammarly、Draw.io、Adobe、Wekipedia、Mermaid 等。生态已经比较成熟了。  
![](https://cdn.jsongo.top/2024/12/4bf99f0f5b0dbfe9c178f6a779071743.webp)  
过滤了下 Microsoft 365 相关的（如 Excel/Word/OneNote/Outlook/PPT 等）就有 7000+ 个。

# 交互形态
目前看到的主要交互形态有：  
1、Excel 等里作为一个嵌入内容显示在表格中。  
	![|500](Pasted%20image%2020241206141455.webp)![|500](Pasted%20image%2020241206141826.webp)  
2、Excel/Word/PPT 中作为侧边窗格可以单独进行交互。
- 这种交互其中有两个操作点，一个是顶部，它也可以触发一个事件；另一个是侧边，本质上它是在侧边开一个类似 Webview 的容器，里面跑 Web 页面。  
	![|500](Pasted%20image%2020241206141631.webp)![|500](Pasted%20image%2020241206141748.webp)![|500](Pasted%20image%2020241206142055.webp)![|500](Pasted%20image%2020241206142315.webp)

# 开发
## 工具安装
### 基础开发环境
```bash
pnpm install -g yo generator-office
```
如果没成功可能是依赖 mem-fs，直接安装下就可以：
```bash
pnpm install -g mem-fs
```
## 生成代码
```bash
yo office
```
![|500](https://cdn.jsongo.top/2024/12/308db6a261cf76acf4114a4a78ab2557.webp)  
![|500](https://cdn.jsongo.top/2024/12/41cedbbf9a12160ae1f0e4368a4dc876.webp)  
生成后它默认用 npm 来 install，觉得慢的话直接把进程杀掉，然后重新跑 `pnpm install`。  
后面就是熟悉的 `npm run start` 了，写真正的代码逻辑了。  
## 辅助开发工具
Office Addin 项目创建和基架工具是 Office 加载项的 Yeoman 生成器，简称为 `yo`：[GitHub - yeoman/yo: CLI tool for running Yeoman generators](https://github.com/yeoman/yo)。  
### Vs code/cursor 开发插件
可以安装下这个：[Microsoft Office Add-ins Development Kit](https://marketplace.visualstudio.com/items?itemName=msoffice.microsoft-office-add-in-debugger)  
	![|500](https://cdn.jsongo.top/2024/12/94b2a20f155e46bba502cec36e009b1f.webp)  
当然也可以用 npm start，不过运行前一定要记得先运行 `npm run dev-server`，要不然只是 start 个客户端、背后没服务是跑不起来的。如果一直失败，那直接把所有在 run 的都关掉，word 也退出，运行几次 `npm stop` （因为我也遇到了，当时运行了好几次 start，它起了多个背后的进程）。所以其实用插件还是比较方便些，命令行可能会遇到一些想不通的问题。
>  用命令行如果遇到问题，可以参考这里：[Build your first Word task pane add-in - Office Add-ins | Microsoft Learn](https://learn.microsoft.com/en-us/office/dev/add-ins/quickstarts/word-quickstart-yo)

### Script Lab
Script Lab 是一种用于快速创建调用 Office JavaScript 库 API 的“原型代码”。
>  Script Lab is a tool for quickly prototyping code that calls the Office JavaScript Library APIs.
- 安装时，公司账号可能会用不了，可能跟公司的安全策略有关。最好切换个人账号。  
	![|500](https://cdn.jsongo.top/2024/12/766add3fe8dd77c7b29ce094a1f8b986.webp)  
可以到 [这里](https://learn.microsoft.com/en-us/office/dev/add-ins/overview/explore-with-script-lab) 或 [这里](https://appsource.microsoft.com/en-us/product/office/WA104380862) 来直接下载安装，需要登录，这里如果用公司的账号可能会失败，可以尝试下个人的账号。如果是走的公司内部的采购，有个小技巧：公司内部申请下来之后，用它激活，然后退出登录自己的账号，我这么测试了下，用自己账号依然保持着激活状态，看来它激活的是软件本身，跟账号没关系。  
第一次登录 AppSource 的话，会有一堆流程，一会儿要认证，一会儿要补充信息……  
	![|500](https://cdn.jsongo.top/2024/12/ed446538cfc84f72e0e5b86b639fc8ed.webp)  
	![|500](https://cdn.jsongo.top/2024/12/92fa65ed60838d1e687557ce3418cdc6.webp)  
装完之后，打开 word 就可以看到了：  
	![|500](https://cdn.jsongo.top/2024/12/8889f62079f35926fb5ab63fe45b0d05.webp)

## 运行
运行起来后，如图所示：  
	![|500](https://cdn.jsongo.top/2024/12/5020607f6dca911463819e1884f959f0.webp)  
Word 是自己弹出来的，vscode 插件背后是起了一个 server （默认在 3000 端口），为侧边这个“页面”提供调试服务。

# 限制
从生成的代码中可以看出，微软对 Add-ins 其实做了一些环境限制：  
	![](https://cdn.jsongo.top/2024/12/779ca230a5c6deef84980df0246a0c51.webp)  
只有 IE 和 Edge 浏览器内核才能跑，当然 Office 版本也有限制，这个倒还好。

# 相关资源
- [Word add-in tutorial - Office Add-ins | Microsoft Learn](https://learn.microsoft.com/en-us/office/dev/add-ins/tutorials/word-tutorial)
