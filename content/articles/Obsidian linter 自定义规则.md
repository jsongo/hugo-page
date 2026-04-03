---
updated_at: 2024-10-27 11:31:09.698000+08:00
edited_seconds: 220
tags:
- 互联网/Obsidian
created_at: Sun, Apr 13, 2025 - 01:10:36
date: 2025-04-13 01:10:36.694000+08:00
banner_icon: 📹
banner: https://cdn.lyb.pub/banners/9ce4b7fc6ab166efa82ba9c3b5423dd2.jpg
title: Obsidian linter 自定义规则
description: 如何在Obsidian中使用Linter插件自定义规则来自动化格式修正，例如去除不必要的加粗样式
slug: obsidian-linter-custom-rules
draft: false
---

先看一个例子，我之前有很多复制过来的内容，会在 header 上添加粗体的样式，其实这些我不需要，因为 header 本身就有加粗的样式。问题格式如下：

```text
##  ** Logging 的作用 **
```

要把 `**` 给去掉。  
Linter 其实可以自己设置替换规则，如下图：  
![](https://cdn.lyb.pub/upic/1744478055_4zpryr.webp)  
其中 `^(#{1,6}.*?)\s+\*\*(.*?)\*\*\s*$` 匹配上面这种有问题的标题，然后替换成正常的（两个括号分析指定的 $1 $2）。  
如果不懂怎么配置，可以问 chatgpt，让它给你写正则就可以了。
