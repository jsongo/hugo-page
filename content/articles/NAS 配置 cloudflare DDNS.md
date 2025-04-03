---
updated_at: 2024-10-27T11:31:09.698+08:00
edited_seconds: 220
tags:
  - inbox
created_at: Thu, Apr 3, 2025 - 09:00:46
date: 2025-04-03T09:00:46.149+08:00
banner_icon: 🚑
banner: "https://cdn.jsongo.top/banners/2be650b5bf16dc6d9bb68a9ee7f1277a.jpeg"
title: NAS 配置 cloudflare DDNS
description: 聊聊如何为 NAS 设置 Cloudflare 的 DDNS，以便实现远程访问、方便记忆和提供稳定的访问体验等功能
slug: nas-config-cloudflare-ddns
draft: false
---
# What
给 NAS 设置 DDNS 域名主要有以下作用：
1. **远程访问：** 即使你的公网 IP 地址会变动，你也能通过固定的 DDNS 域名从外部网络访问你的 NAS。
2. **方便记忆：** 无需记住经常变化的 IP 地址，只需记住易于记忆的域名。
3. **建立个人网站/服务：** 可以利用 NAS 搭建个人网站、博客、文件共享等服务，并通过 DDNS 域名对外提供访问。
4. **稳定性：** DDNS 服务会自动追踪并更新你的 IP 地址，保证域名始终指向你的 NAS，提供更稳定的访问体验。
5. **某些应用需要：** 一些 NAS 应用（例如 Synology 的 QuickConnect）依赖 DDNS 来实现远程访问。

# How
 进入 cloudflare  
	![[a0944299ff16236c1b3a62304422cf66_MD5.webp]]  
简单填写即可  
	![[93a269c73086bc52f7b59e47df737b3b_MD5.webp]]  
最后在 NAS 上填写相关的 token 即可。我的是绿联的 NAS，在控制面板里搜索 DDNS 可以找到，在方式二中选新增。  
	![[baa8f3432565de42a82a2b4a66ad3828_MD5.webp]]  
然后配置。Cloudflare 没提供 accessKey ID，它不重要，填写自己的 Cloudflare 账号即可。DDNS 域名可以添加一个自己托管在 Cloudflare 上的域名，可以加一个三级域名，如 `nas.xxx.com` 。  
	![[99509d7becca7bec0aad41815695c700_MD5.webp]]  
看下状态如果是否正常  
	![[0c3856442d38469aa897889d253da33e_MD5.webp]]  
高级设置里显示成功才可以  
	![[c5a086c7aa28e96c5d3ba74fa0c89296_MD5.webp]]  
我试过连接手机热点去访问，发现不太行。
