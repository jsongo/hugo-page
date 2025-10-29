---
updated_at: 2024-10-27T11:31:09.698+08:00
edited_seconds: 220
tags:
  - study/工具/IT
created_at: Thu, Nov 21st, 2024 - 18:21:19
banner_icon: 🦖
banner: "https://cdn.ethanlyn.com/banners/0b3d83738bddc53706e70a9dfd187061.jpg"
description: 介绍了 ag 工具的安装和使用方法，包括搜索文件名、常用参数等
title: 强大的 search 工具 - ag
slug: search-tool-ag-the-silver-searcher
draft: false
date: 2025-02-27T11:31:09.698+08:00
---
# 安装
```bash
brew install the_silver_searcher
```
如果是 ubuntu 的话，这么安装：
```bash
apt install silversearcher-ag
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
-i 用于忽略大小写
```shell
ag 'useEffect' --js
```
只在 JS 文件中查 useEffect。
```shell
ag --multiline '^def .+\n +"""'
```
查 Python 函数定义后面紧跟 docstring 的情况。
```shell
ag -l 'OldName' | xargs sed -i 's/OldName/NewName/g'
```
查到文件中包含 OldName 的所有文件，批量做替换。
```shell
ag -C 2 'class User'
```
显示匹配行的上下两行，方便看上下文

## 常用参数
### Ignore
`--ignore *pack*`
### 打印前后
`-A 3` 可以打印搜索结果的 after 3 行。  
`-B 3` 可以打印 before 的 3 行  
`-c 3` 可以打印上下 3 行
### 只打文件名
`-l` 表示 files-with-matches，即匹配的文件列表
### 全词匹配
`-w`
### 只输出匹配的部分
`-o` 用于只输出匹配部分，而不是整行。

## 应用
把所有的 png 图片找出来，然后按大小排序：
```bash
ag -0 -g .png$ . | xargs -0 du -h | sort -hr
```
![085e9ed0cac92342df818071b090c46f_MD5.webp|940x235](https://cdn.ethanlyn.com/upic/1744522541_8OSi1S.webp)
### `-0` 选项
- 它主要是为了配合 xargs -0 使用，常用于将结果传递给它来支持空分隔符的命令
- **功能**：指定输出的文件名以 **空字符（Null 字符）** 分隔，而不是默认的换行符。
- **用途**：当文件名包含换行符或空格时，使用 `-0` 可以避免解析错误。
>  这里为啥一定要 -0 呢？  
>  如果是在代码里找，一般都默认相关的文件名中没有空格、引号、换行等“麻烦字符”，这些不需要 -0 参数。  
>  但如果要搜的目录很不确定，这时要传给 xargs 就得两边加 -0 来确保准确无误。
