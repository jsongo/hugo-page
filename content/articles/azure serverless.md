---
updated_at: 2024-10-27T11:31:09.698+08:00
edited_seconds: 220
tags:
  - area/life/2022/July-2022
  - area/life/daily
  - import/yinxiang
created_at: Sat, Dec 14th, 2024 - 01:33:06
banner_icon: 🚇
banner: "https://cdn.jsongo.top/banners/9f2713cc4890d8cf0449df9f4877fa26.jpg"
slug: azure-serverless
title: azure serverless 使用
description: azure serverless 支持 python、node 等多种语言，本地 CLI 和 VsCode 插件可以很方便辅助开发者进行开发、调试以及部署。本文主要介绍 azure serverless 的入门操作。
draft: false
---
# 基础工具
Mac 上直接装：
```bash
brew tap azure/functions
brew install azure-cli
brew install azure-functions-core-tools@4
```
>  具体可以参考这里：[Develop Azure Functions locally using Core Tools \| Microsoft Learn](https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=macos,isolated-process,node-v4,python-v2,http-trigger,container-apps&pivots=programming-language-csharp)
>  - 另外，这链接里也有怎么用命令行来创建的方法。下文主要讲 vscode 插件。
# Vscode 插件
参考这个：[Create a Python function using Visual Studio Code - Azure Functions \| Microsoft Learn](https://learn.microsoft.com/en-us/azure/azure-functions/create-first-function-vs-code-python?toc=/azure/developer/python/toc.json&bc=/azure/developer/python/breadcrumb/toc.json)  
## 简介
在 vscode 中安装插件：Azure Functions  
	![|425](https://cdn.jsongo.top/2024/12/fb2e0acc105d63d085c40bdd1920f6a2.webp)  
切到这个插件去点击添加一个函数，一步步往下都有说明，比较简单。  
	![|300](https://cdn.jsongo.top/2024/12/ea7349816d01aa7f064eebb26475e767.webp)  
我选了 HTTP 触发器的模板，最后给我生成了这个文件：  
	![|500](https://cdn.jsongo.top/2024/12/92942fa30fb661c19c1901c6df0f73ee.webp)  
## 调试运行
简单的运行，可以用插件面板上，下半部分中的 Project 展开，里面有个调试相关的操作（它可点击）。  
	![|850](https://cdn.jsongo.top/2024/12/b1f01eb135df433a4a2f8b9e91904dbb.webp)  
	它会先做一些安装，然后启动 function，IDE 进入 debug 模式。这时主要运行的命令是：`func host start`，直接在命令行里运行这个命令也可以启动本地调试运行。但如果你想查询代码中打的日志，一定要记得加上 --verbose 的参数，所以正确的使用姿势是：
```bash
func host start --verbose
```
本地调试时，其实已经默认把 AZURE_FUNCTIONS_ENVIRONMENT 这个变量设置为 `Development` 了，如果你修改代码，它会触发服务的重启，非常方便。  
它同时生成一个链接可以直接点击，它会触发函数执行：  
	![|525](https://cdn.jsongo.top/2024/12/fe3b5f734dbe003a59b09c561687bf88.webp)
# 创建
用 IDE 插件进行 function 创建上面已经介绍过来了，比较简单，不过读者可能会遇到网络问题而没法往下尝试。这里再介绍下 CLI 的方式来创建。  
先初始化目录：
```bash
func init --python
```
它会生成一些基础的配置文件，包括 [_local.settings.json_](https://learn.microsoft.com/en-us/azure/azure-functions/functions-develop-local#local-settings-file) 和 [_host.json_](https://learn.microsoft.com/en-us/azure/azure-functions/functions-host-json)。  
创建一个 api 入口：
```base
func new --name combine_videos --template "HTTP trigger" --authlevel "function"
```
Authlevel 有三个值：
- Anonymous 即任何人都可以访问，不需要带什么认证，相当于公开了。
- Function 函数级别的认证，创建的每个函数都得在 URL 上带一个 token 进行认证，参数是 `?code=<token>`。
- Admin，最高级别的认证，只有具有管理员权限的用户才能访问函数，适用于包含敏感操作或数据的函数，如修改系统关键配置、访问敏感的业务数据等。这种模式依赖于复杂的身份管理系统（如 AAD）。
# 部署
## 平台创建应用
先打开 [Microsoft Azure](https://portal.azure.com/#browse/Microsoft.Web%2Fsites/kind/functionapp) 这个 portal 地址，创建一个 `Function App` （或者中文叫“函数应用”）。  
	![|575](https://cdn.jsongo.top/2024/12/8c7facddd451e9fca9cba01e0b045eac.webp)
## Plugin
正式部署前，肯定是需要先登录的。正常是可以在插件上操作，如下：  
	![|650](https://cdn.jsongo.top/2024/12/91ce1f913a33cb8ab6d9d64480929b25.webp)  
	如果不成功，可以用下文 CLI 的方法来登录。  
选择 Deploy to Function App，直接进行部署。  
	![|700](https://cdn.jsongo.top/2024/12/bda580eaff46be66e6353ae23f839da6.webp)  
我在使用的时候，经常遇到网络问题，因为某些你懂的原因，所以挺难的，得给 vscode 设置 Proxy (具体就不介绍了)  
	![|700](https://cdn.jsongo.top/2024/12/628fc45d846b96aa8dd84a59bc7f7ff7.webp)

## CLI 发布
### 登录
使用前也一样需要先登录 (上面的说明都是在本地开发)：
```bash
az login
```
运行时，它会打开一个网页进行登录授权  
	![|750](https://cdn.jsongo.top/2024/12/e473747eb42ae1af27de1a51d5d59e94.webp)  
命令行也会有一堆打印，有如下关键信息就说明已经登录成功了。  
	![|900](https://cdn.jsongo.top/2024/12/6d649277ba0edb949dfeb3bb2f736a94.webp)
### 发布操作
当然我们也可以选择用 CLI 来做发布：
```bash
func azure functionapp publish <project_name>
```
具体细节可以参考这里：[Create a Python function from the command line - Azure Functions \| Microsoft Learn](https://learn.microsoft.com/en-us/azure/azure-functions/create-first-function-cli-python?toc=/azure/developer/python/toc.json&bc=/azure/developer/python/breadcrumb/toc.json&tabs=macos,bash,azure-cli,browser)  
这里的 `project_name` 跟在平台上创建的应用名要保持一致，要不然会找不到这个 App 而发布失败。  
	![|775](https://cdn.jsongo.top/2024/12/8ae08faed3138aeebf5aab5a595ebe9e.webp)  
另外还有一点要注意的是，本地的 python 环境需要跟平台上的一致，避免本地跑的好好的、部署上去就缺一些模块：  
	![|675](https://cdn.jsongo.top/2024/12/d4c8cfd171f834123918d1a99265533f.webp)  
	部署完会生成一个地址可供访问：  
	![|800](https://cdn.jsongo.top/2024/12/3ac8969d54d4b231a0dad35cec82b39c.webp)  
部署的过程是会比较慢，我们从平台的部署日志中可以看到它部署完后，会等待 1 分钟：  
	![|750](https://cdn.jsongo.top/2024/12/a945e829b9eace8c1a74fb3afdcc9396.webp)  
在线上运行后，可以访问试试。  
线上日志可以在这里看到：  
	![|725](https://cdn.jsongo.top/2024/12/4ca6c0c355611de0c1b3f2c29ca5f0e7.webp)  
不过经常连接不稳定，所以其实可以到另一个一方看  
	![](49412af97e5b5cc967dac50b8c5b558f.webp)

# 其它：三方插件 Azurite
安装另一个三方的 server 运行插件 Azurite  
	![|550](https://cdn.jsongo.top/2024/12/02f0caabaf55d3b7cd7d1ae156e1deb3.webp)  
修改下 `local.settings.json` 的配置，把 `AzureWebJobsStorage` 设置成 `"UseDevelopmentStorage=true"`。  
	![|550](https://cdn.jsongo.top/2024/12/f477dc6f98630c7d9911cd2d28eb7ab5.webp)  
打开命令面板，运行 Azurite start 来启动服务  
	![|475](https://cdn.jsongo.top/2024/12/e96da6632ab1e656b5bcdb2978135a51.webp)  
	这时它们的启动非常快，一闪而过，没关系，它已经在跑了。  
	比较烦的时，运行时，会在当前目录下生成一些文件：  
	 ![|450](https://cdn.jsongo.top/2024/12/d08188a1cf18ec9fc4a3dd1170c2f5e0.webp)
- _blobstorage_ 和 _queuestorage_
	- **作用**：
	    - 这些文件夹通常用于存储本地开发时的 Azure Blob 存储和 Azure Queue 存储的模拟数据。当你在本地运行和测试 Azure Functions 时，这些文件夹可以帮助模拟真实的 Azure 存储环境。
	    - 例如，如果你有一个 Azure Function，它从 Blob 存储中读取数据或者向 Queue 存储中写入数据，在本地开发环境中，这些文件夹会存储相关的数据，以便函数能够正常运行和测试。
	- **使用场景**：
	    - 在没有连接到真实 Azure 存储账户的情况下，本地开发和调试函数时需要用到。如果删除这些文件夹，可能会导致本地运行的函数在涉及到 Blob 或 Queue 操作时出现错误，因为它们找不到模拟的存储数据。
	- 以 _azurite_db_ 开头的.json 文件
		- **作用**：
		    - 这些文件是 Azurite 数据库文件。Azurite 是一个本地的 Azure 存储模拟器，用于在本地模拟 Azure Blob、Queue 和 Table 存储服务。这些.json 文件存储了 Azurite 模拟存储服务的数据结构和数据内容。
		    - 例如，_azurite_db_blob_.json 文件用于存储模拟的 Blob 存储数据结构和数据，_azurite_db_queue_.json 文件用于存储模拟的 Queue 存储数据等。
