---
updated_at: 2024-10-27T11:31:09.698+08:00
edited_seconds: 220
tags:
  - study/工具/IT
created_at: Thu, Nov 21st, 2024 - 18:21:19
banner_icon: 🦖
banner: "assets/banners/mmexport1731055048406.jpg"
description: 介绍了 ag 工具的安装和使用方法，包括搜索文件名、常用参数等
title: 强大的 search 工具 - ag
slug: search-tool-ag-the-silver-searcher
draft: false
---
# 安装
```bash
brew install the_silver_searcher
```
# 使用
## 只搜文件名
直接使用时，ag 会检索内容。需要添加 `-g` 参考
```bash
ag -g .mp4 .
```
## 正常使用
```bash
ag -i foo ./bar/
```
## 常用参数
### -- Ignore
如 `--ignore *pack*`
### 打印前后
如 `-A 3` 可以打印搜索结果的 after 3 行。  
`-B 3` 可以打印 before 的 3 行
### 只打文件名
`-l` 表示 files-with-matches，即匹配的文件列表
### 全词匹配
`-w`
