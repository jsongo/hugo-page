---
updated_at: 2024-10-27T11:31:09.698+08:00
edited_seconds: 220
tags:
  - IT/docker
created_at: Sun, Apr 6, 2025 - 21:15:54
date: 2025-04-06T21:15:54.890+08:00
banner_icon: ⌚️
banner: https://cdn.jsongo.top/banners/7b41109174b1be7954e2eaaa41f6050a.jpeg
title: 解决 podman build 提示 no space 问题
description: 使用 Podman 构建镜像时遇到的磁盘空间不足问题，并提供了清理和扩容的解决方案
slug: podman-build-no-space-issue
draft: true
---
E: You don't have enough free space in /var/cache/apt/archives/  
可以先运行 `podman info` 看一下，关注这两个字段 `graphRootAllocated` 和 `graphRootUsed`  
![[assets/local_image_plus/13bd04ff7fd166dcdf65a81967984add_MD5.png]]  
一看就知道还剩下多少。其实

# 空间清理或扩容
1、先尝试清理用不到的数据
```bash
podman system prune -a
podman image prune -a
```
清完之后再看下 info，如果还是没变化，那要出大招了  
2、编辑 `~/.config/containers/storage.conf`，如果没有，直接创建
```config
[storage]
driver = "overlay"

[storage.options]
size = "50G"

[storage.options.overlay]
mountopt = "nodev,metacopy=on"
```
- driver = "overlay"：使用 overlayfs 作为存储驱动（默认）
- additionalimagestores：指定额外的镜像存储目录
- size = "50G"：增加存储空间，默认 overlayfs 可能限制了 /var/lib/containers/storage，这里手动扩展到 50GB
- mountopt = "nodev,metacopy=on"：优化 overlayfs 的挂载参数，提升性能
- imagestore = "/usr/lib/containers/storage"：指定镜像存储路径，确保 Podman 读取正确的目录  
3、重启下：
```bash
podman machine stop
podman machine start
```
再看看 machine 的磁盘对不对：
```bash
podman info | grep graphRoot
```
如果还没生效，那接下去只能用大招了。  
4、重置环境  
先 stop，然后再：
```bash
podman machine rm
podman machine init --disk-size 50
podman machine start
```
Init 的时候直接把空间大小设置为 50G，这样后面至少很长时间不会再遇到问题。但也不要太大，要不然你电脑很快就没有磁盘空间了。另外也记得及时清理。  
使用时，如果遇到用户权限问题，可以用这个命令来处理
```bash
podman machine set --rootful
```
它会切到权限最高的 root 来使用。

# 代理问题
我电脑上装的魔法软件被安全软件给干了，用不了，但并没有把我的代理删掉，造成我一直都用不了命令行的一些带请求的操作，如上面 `machine init` 时就会报错。  
试了很多办法还是没处理成功，最后用了一个临时屏蔽的方案：
```bash
export NO_PROXY=quay.io
```
这样在拉 podman 相关的这个镜像时就可以正常了。
