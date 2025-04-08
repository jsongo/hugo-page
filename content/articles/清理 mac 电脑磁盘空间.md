---
updated_at: 2024-10-27T11:31:09.698+08:00
edited_seconds: 220
tags:
  - IT/折腾/mac
created_at: Tue, Dec 10th, 2024 - 16:14:37
banner_icon: 🚲
banner: "https://cdn.jsongo.top/banners/d8418fa48f2cc793c8f63aa13111635f.png"
title: 清理 mac 电脑磁盘空间
description: 如何通过删除不必要的文件和优化存储来释放Mac电脑的磁盘空间
slug: clean-mac-disk-space
draft: false
date: Tue, Dec 10th, 2024 - 16:14:37
---
经常遇到磁盘不够的情况，即使我电脑已经是 512G 的磁盘，还是经常遇到磁盘不足的问题。系统就占了 200G 以上，实在太黑盒了，其它部分一不小心就超出了。所以时不时会研究下怎么清理我的电脑。  
首先，可以先过一遍电脑中的代码，如果用 node 的话，可以把 node_modules 删一删。
# 1 、Vscode 或 Cursor 等
```bash
mv "/Users/bytedance/Library/Application Support/Code/logs" ~/.Trash
```
除了这个 logs 还有另外两个可能空间占用也比较大的目录：
- **CachedData:** 缓存数据，删除后 Cursor 可能需要重新下载/索引某些数据，导致启动或某些功能变慢。
- **CachedExtensionVSIXs:** 缓存的扩展程序安装包，删除后 Cursor 可能需要重新下载扩展，影响扩展功能。  
有需要也可以删，可能会稍微影响 cursor 下次打开时的性能，但问题不大。  
另外 Cursor 和 windsurf 等也一样。

# 2、清理 Git
有的 git 历史太多，可能有上 G 的内容。可以尝试让 git 自动清理下。  
第一步，先用 `git reflog expire` 来过期旧的 reflog 条目。例如，过期超过一周的条目
```bash
git reflog expire --expire=1.week.ago --all
```
然后清理未引用的对象，下面这条命令会删除不需要的对象，并压缩存储库（新 git 版本一般都会做，所以一般这步收益不大，反而因为磁盘不足，压到一半中断，增加了未删除的压缩文件）。
```bash
git gc --prune=1.week.ago
```
进一步的，可以强制垃圾回收（这一步可能会特别慢）。
```bash
git gc --aggressive --prune=1.week.ago
```
我试了以上的命令，回收的有限，可能我本地已经有很好的压缩了。

# 3、处理 Obsidian 中的图片等
如果也使用了 Obsidian 的话，里面可能有些资源会比较大，如你曾经贴过一个较大的视频或几兆的图片，这些都可以做下压缩。  
把所有的 png 图片找出来，比如根目录文件，先进入根目录，然后：
```bash
ag -g .png$ . | xargs ls -lh | awk '{print $5, $9}' | sort -hr | more
```
`ag` 是 the_silver_searcher 工具，mac 上没这个命令的话，可以自己安装一个。  
开始用的好好的，但后来发现有些文件名中带了空格，awk 中用 $9 打印出来的文件名不完整。后来改用 `du -h` 来代替 `ls -lh`：
```bash
ag -0 -g .png$ . | xargs -0 du -h | sort -hr
```
好使！

# Docker
清理未使用的镜像和：
```bash
docker image prune -a -f
```
清理停止的容器（确定都没用了再操作）
```bash
docker container prune
```
当然更绝一点，连 build 的缓存都不要了（谨慎）
```bash
docker builder prune -a
```

# 磁盘
比较通用的方法是，从系统磁盘中查看哪个目录占用较大，一层层往下分析。  
![8ee84296b354d8a922451b7d0e50e8a8_MD5|806x888](https://cdn.jsongo.top/2025/04/e2c574e7ab713206354294e0faac5ae1.webp)  
每一个都可以点进去看有哪些大文件（它按大小排序）。  
当然要更细的话，也可以用命令行，从上往下看某些目录里的占用情况：
```bash
du -hsx ~/* | sort -rh | head -10
```
![c63ab378d1ecb0a972305dfab65f9d0c_MD5|806x202](https://cdn.jsongo.top/2025/04/bba67c4fef0813913b1399566d099fc7.webp)  
然后找到大文件
