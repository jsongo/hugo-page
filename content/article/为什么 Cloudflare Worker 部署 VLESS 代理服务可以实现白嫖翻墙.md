---
title: "为什么 Cloudflare Worker 部署 VLESS 代理服务可以实现白嫖翻墙"
source: "https://depp.wang/2024/03/17/cloudflare-worker-vless/"
author:
published: 2024-03-17
created: 2025-11-26
description: "这两天刷推，看见不少推文实现了用 Cloudflare Worker 白嫖翻墙，我也鼓捣了试了一下，确实可以。"
tags:
  - "clippings"
draft: "true"
slug: "cloudflare-worker-vless-free-proxy"
date: "2025-11-26T14:59:00+08:00"
banner: "https://hexoblog.r2.depp.wang/202406191718786599.jpg"
---
这两天刷推，看见不少推文实现了用 Cloudflare Worker 白嫖翻墙，我也鼓捣了试了一下，确实可以。  
但正如这位推主 [所说](https://twitter.com/huhexian/status/1769318527369097411) ，折腾探索一下就行，还是得用机场。我折腾主要是想了解一下它的实现原理。至于如何折腾， 可以参考 [这个教程](https://github.com/cmliu/edgetunnel) ，文字 + 视频都有，还是比较简单。用其默认的 proxyIP 不能使用 GPT 等，我改了下 proxyIP，改为了 47.254.66.75，改后可以。
# 原理
Cloudflare 的 Worker 可以部署 JavaScrip 函数，实现一些功能，类似 Serverless。相当于 Cloudflare 的 Worker 可以提供运算能力，可以把 Worker 当国外主机（VPS）使用。Cloudflare 注册用户每天有 10 万个请求可以使用。（Page 与 Worker 一样的道理，使用 Page 的优势在于使用自定义域名时可以不将域名注册转到 Cloudflare）  
而国内网络用可以访问 Cloudflare Worker，Worker 可以访问国外的网站，所以可以使用 Worker 做代理转发，转发时加上 VLESS Header 信息，可以逃避防火墙的审查。但因为没有做高级混淆，所以这种方式可能过一段时间这种方式就会失效。  
[![cb69c9d2f36572a60cb137eeae8535f7_MD5.webp](https://cdn.lyb.pub/upic/1764140482_ExiSj1.webp)
# 为什么需要优选 IP
因为国内网络访问 Cloudflare 不是很稳定，国内网络访问优选 IP 更稳定，有优选 IP 时：国内网络 -> 墙 -> 优选 IP -> Worker -> Origin。这样可以提升稳定性与速度。
# 为什么需要 proxyIP
Cloudflare 设计了 Worker 不能访问托管到 Cloudflare 上的网站，如果没有 proxyIP，就不能访问托管到 Cloudflare 上的网站，所以使用 proxyIP 反向代理一下。路径示意：国内网络 -> 墙 -> 优选 IP -> Worker -> proxyIP -> Origin。  
这个 proxyIP 是谁维护的我也不清楚，因为这种翻墙方式只是数据包加了 VLESS Header，所以其安全性我也不知道，建议不要主力使用。
# 为什么 cmliu/edgetunnel 的 \_worker.js 方便易用
1. 其通用订阅地址可以适配各种客户端
2. 维护了订阅生成服务，可自动更新优选 IP 与 proxyIP
3. 维护了订阅规则，如果域名没走配置群组，就走「漏网之鱼」
4. 还针对没有域名的用户提供了临时域名
# Link
- [cloudflare worker搭建vless](https://blog.mareep.net/posts/10934/?utm_source=pocket_saves)
- [真的安全？Cloudflare Worker部署VLESS翻墙代理的原理和proxyIP细节研究](https://upsangel.com/security/vpn/cloudflare-worker-vless%E7%BF%BB%E7%89%86%E4%BB%A3%E7%90%86%E5%8E%9F%E7%90%86-proxyip%E7%B4%B0%E7%AF%80%E7%A0%94%E7%A9%B6/)
