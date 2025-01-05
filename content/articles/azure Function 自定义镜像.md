---
updated_at: 2024-10-27T11:31:09.698+08:00
edited_seconds: 220
tags:
  - IT/折腾/azure
created_at: Sun, Jan 5, 2025 - 11:25:49
date: 2025-01-05T11:25:49.289+08:00
banner_icon: 👨🏼‍🍳
banner: https://cdn.jsongo.top/banners/772c64fbb07e3cd46573602f922a7829.jpg
slug: azure-function-custom-containers
title: azure Function 自定义镜像
description: 主要介绍了如何在 Azure Functions 中使用自定义 Docker 镜像，包括创建和配置 Dockerfile，以及将镜像推送到 Azure 容器注册表（ACR）。此外，还讨论了在 Azure 平台上使用这些镜像的步骤和相关的计划选择。
draft: false
---
 Azure Function 默认是跑在它官方的 [microsoft/azure-functions-base](https://hub.docker.com/r/microsoft/azure-functions-base) 这个镜像上。当然你可以定义自己的镜像，Azure 开放了这个能力。本文主要介绍如何操作。
# 创建自己的镜像
## 创建 Dockerfile
```bash
func init --docker
```
它会初始化一个 Dockerfile 等文件，如果你只需要 Dockerfile 可以把参数改成 `--docker-only`。  
生成的 Dockerfile 里面有如下基础的配置：
```Dockerfile
# To enable ssh & remote debugging on app service change the base image to the one below
# FROM mcr.microsoft.com/azure-functions/python:4-python3.12-appservice
FROM mcr.microsoft.com/azure-functions/python:4-python3.12

ENV AzureWebJobsScriptRoot=/home/site/wwwroot \
    AzureFunctionsJobHost__Logging__Console__IsEnabled=true

COPY requirements.txt /
RUN pip install -r /requirements.txt

COPY . /home/site/wwwroot
```
这些不要改动。不过可以在上面添加你自己的东西，比如我在做视频相关的处理，所以我需要一个 ffmpeg 库安装上去，所以我添加了如下的代码：
```Dockerfile
# 安装 ffmpeg
RUN apt-get update && \
    apt-get install -y ffmpeg && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
```

## 注册
在 [Azure Container Registry](https://portal.azure.com/#browse/Microsoft.ContainerRegistry%2Fregistries)（容器注册表）这里注册一个你自己的命令空间。  
	![|675](https://cdn.jsongo.top/2025/01/463f2950bea861c9729cb23cdc5a6478.webp)  
创建完你就有一个自己的专属 Azure 镜像的域，如我这里的是 `jsongo.azurecr.io`。  
在 CLI 中登录：
```bash
az acr login --name jsongo
```
如果你的 `az` 命令之前登录过，这里直接就成功了。接下去你就可以构建镜像，并把它推到你的这个域上了。

## 构建
首先你本地得有一个 Docker 软件安装并运行起来，可以到 Docker 官网上去下载，这个比较简单。当然如果你有一个线上的虚拟机，那就直接在上面处理也行，只不过还得在上面安装 azure 的 CLI。上一篇已经介绍过了、不再赘述。  
接下去在本地构建上面创建的镜像。
```bash
docker build --tag jsongo/azure-video:0.1.0 .
```
如下示例。  
	![|750](https://cdn.jsongo.top/2025/01/a28f11024d5a8fe4f5c8ad0337479ee7.webp)  
比如我这个镜像，由于加了 ffmpeg 之后，构建完成时整个镜像很大，一下子撑到了 2G。  
	![|700](https://cdn.jsongo.top/2025/01/4f71b5b5f343bcc4b0db975f24bfce60.webp)  
构建完，试着把它运行起来看看：
```bash
docker run --rm -e WEBSITES_INCLUDE_CLOUD_CERTS=true -p 8080:80 --name test-azure-video -it jsongo.azurecr.io/azure-video
```
当然你的 auth level 要设置成 anonymous authorization 才可以直接访问，如果没问题它能正常跑起来。接下去在本地 curl 一下 8080 端口就可以看到有没有正确返回。

## 推到 Azure 平台上
先打个 tag，刚构建时，默认是用的 dockerhub 的。
```bash
docker tag jsongo/azure-video:0.1.0 jsongo.azurecr.io/azure-video:0.1.0
```
其中 `jsongo.azurecr.io` 就是我们上面创建的域，它标识了一个 Docker Registry 的地址（默认是 `docker.io`）。  
接下去运行 docker push 的时候，就可以找到 azure 的 Registry。
```bash
docker push jsongo.azurecr.io/azure-video:0.1.0
```
然后就是等了。我这个镜像 2G+，着实是要等好一会儿。  
Push 完，打开你的 [容器注册表页面](https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.ContainerRegistry%2Fregistries)，在这里就可以看到你刚推送上去的镜像了。  
	![|750](https://cdn.jsongo.top/2025/01/fb1175d6eaf44464ccf31a4c1a79046b.webp)

# 使用镜像
创建一个 Function，但要选高级计划或应用服务才行。  
	![|825](https://cdn.jsongo.top/2025/01/97e0c4a5f43cd4dcb940b3b125e1fbbf.webp)  
	![|600](https://cdn.jsongo.top/2025/01/61ccd18ce92bbd84fe47a4bdf732ff55.webp)  
	一步步往下直到创建完成。  
	![](https://cdn.jsongo.top/2025/01/db86acc839e4545ce6e255d56a6bc911.webp)  
接下去就可以打开 azure 函数首页，去看刚部署的函数。  
	![|750](https://cdn.jsongo.top/2025/01/6efc5b6d235cc4e37d11ef1a7b0c52de.webp)  
至于哪些计划可以支持自定义容器部署可以参考这里：[Azure Functions scale and hosting \| Microsoft Learn](https://learn.microsoft.com/en-us/azure/azure-functions/functions-scale)。  
	![|750](https://cdn.jsongo.top/2025/01/3ef8be06d615efb0daf5495e872d716e.webp)

## 关于 Premium Plan 和 Dedicated Plan
这些 Plan 其实都涉及到了多种服务和资源，根据不同情况来选择。
### Premium Plan
- **计算资源**：通常指高性能的虚拟机或计算实例等。以虚拟机为例，不同规格的虚拟机收费不同，一般每小时的费用在 0.5 美元到几美元不等，如 DS 系列虚拟机可能比普通系列的虚拟机费用要高，高性能的虚拟机每小时费用可能要 0.834 美元甚至更高。
- **存储资源**：如果是 Premium Storage，收费标准通常按磁盘的最大容量阶梯收费，而不是用多少算多少，且其读写操作也可能会有额外的收费，如每 10 万个存储事务为 3 元，不过每月一般会提供 100 亿次免费的事务 13。
- **网络资源**：对于使用流量较大的公网 IP，每月费用可能在 1.2 美元及以上，负载均衡器每小时也会有一定的费用，如标准负载均衡器每小时的费用是 0.016 美元左右。
### Dedicated Plan
- **计算资源**：如 Dedicated Host，一般会根据主机的配置和租用时长收费，一台配置中等的 Dedicated Host 每月费用可能在 1000 美元到 3000 美元左右。
- **存储资源**：若使用专用的存储设备或特定的存储方案，收费也会因存储容量、性能要求等因素而异，通常专用存储的费用相对较高，每 GB 每月的费用可能在 0.2 美元到 0.5 美元之间，具体取决于存储类型和性能等级。
- **网络资源**：如果需要专用的网络设备或带宽保证，费用也会相应增加，专用网络带宽每 Mbps 每月的费用可能在 10 美元到 50 美元左右。
### 选择
可以根据需求来选择：
- 如果对计算性能要求极高，但对资源的独占性要求不是特别高，Premium plan 可能更合适，因为它可以提供高性能的计算资源，同时成本相对较低。
- 如果对安全性、合规性以及资源的独占性有严格要求，需要完全隔离的计算和存储环境，那么 Dedicated plan 可能是更好的选择，尽管费用相对较高，但能满足特定的业务需求。  
实在不好选择，直接就选 Premium plan，比较经济些，一般也用不到比较太高级的配置。它目前有以下三个配置可以选：  
	![|450](https://cdn.jsongo.top/2025/01/c0f3dcf1e6ca0c79664d2697b121675b.webp)  
不过价格上… 是有点高些，具体可以看这里：[定价 - Functions \| Microsoft Azure](https://azure.microsoft.com/zh-cn/pricing/details/functions/)。  
	小时视角：  
	![|850](https://cdn.jsongo.top/2025/01/bcac629924bd882bed230aa3781131f6.webp)  
	月视角：  
	![|850](https://cdn.jsongo.top/2025/01/cc859d4f93fc2c606083a65c5d005ff7.webp)

# 参考
- [Working with Azure Functions in containers \| Microsoft Learn](https://learn.microsoft.com/en-us/azure/azure-functions/functions-how-to-custom-container?tabs=core-tools,acr,azure-cli2,azure-cli&pivots=container-apps#creating-containerized-function-apps)
- [Create Azure Functions in a local Linux container \| Microsoft Learn](https://learn.microsoft.com/en-us/azure/azure-functions/functions-create-container-registry?tabs=acr,bash&pivots=programming-language-python#build-the-container-image-and-verify-locally)
- [Azure Container Registry roles and permissions - Azure Container Registry \| Microsoft Learn](https://learn.microsoft.com/en-us/azure/container-registry/container-registry-roles?tabs=azure-cli)
