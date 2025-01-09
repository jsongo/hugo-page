---
updated_at: 2024-10-27T11:31:09.698+08:00
edited_seconds: 220
tags:
  - IT/Obsidian
created_at: Fri, Jan 10, 2025 - 00:35:01
date: 2025-01-10T00:35:01.642+08:00
banner_icon: 🧅
banner: https://cdn.jsongo.top/banners/614e6ce3faae3eecaea68591b783ca2e.jpeg
slug: add-google-index
title: 让 google 索引你的网站
description: 在 Google 上验证和提交你的网站，让 Google 索引它，日后可以查看日常搜索数据。另外提交网站的 sitemap，以便 Google 定期更新你网站的内容
draft: false
---
# 验证&提交
打开 [网址检查工具 - Search Console 帮助](https://support.google.com/webmasters/answer/9012289?hl=zh-Hans) 站点，在上面点击验证，如果你的网站放在 cloudflare 等比较有名的服务商那，这个验证过程会非常简单，比如我就只需要跳转到 cloudflare 上再点一个按钮即可。它会给你添加一个 TXT 记录，之后就认证成功了：  
	![|450](https://cdn.jsongo.top/2025/01/356a25a75d88549de43ada1856ef4da8.webp)  
进入 [Google Search Console](https://search.google.com/search-console) 后，可以看到你的网站还没被索引，需要等一天再来看下。  
	![|675](https://cdn.jsongo.top/2025/01/b42233e8f3f1a1a50196872d8a1eae17.webp)  
由于已经验证了这个网站就是你的，之后就可以在这个 Console 上看到每天的搜索数据。

# Sitemap
如果你的站点有 sitemap 也尽量提交下。我的站点是用 hugo 实现的，加了 sitemap 插件，所以可以直接提供给它地址。提交后，Google 就会定期地从你的 sitemap 上更新内容。  
	![|775](https://cdn.jsongo.top/2025/01/e4f46f3ab1b40f3cd68608eceb859b66.webp)
