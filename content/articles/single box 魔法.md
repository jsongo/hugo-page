---
updated_at: 2024-10-27T11:31:09.698+08:00
edited_seconds: 220
tags:
  - 互联网/折腾/魔法
created_at: Sat, Apr 12, 2025 - 13:12:08
date: 2025-04-12T13:12:08.926+08:00
banner_icon: 👰🏼‍♀️
banner: "https://cdn.lyb.pub/banners/ce4ad62a66d8ac4c4027f3e054d6009e.jpg"
title: single box 魔法
description: 介绍下如何安装和使用 Sing-box 的 GUI 和内核，以及它与 ClashX 的速度对比等，介绍一些好用的插件
slug: single-box-magic
draft: false
---

# 安装

## 安装 GUI

然后从这里安装 UI：
[GUI for SingBox (github.com)](https://github.com/GUI-for-Cores/GUI.for.SingBox) 
```bash
git clone https://github.com/GUI-for-Cores/GUI.for.SingBox.git

cd GUI.for.SingBox/frontend

pnpm install

pnpm build

cd ..

wails build
```

wails 是 go 里用于构建桌面应用的一个框架，上面运行完之后，会在 build/bin 目录里放一个编译好的可运行文件，把它 copy 到 " 应用程序 " 中就可以了。

## 安装内核

到设置里，找到内核，点击更新，它会开始下载。  
 ![](https://cdn.lyb.pub/upic/1744474649_Cy3pd0.webp)

# 使用

打开后，如果要使用 clash 的那个订阅地址，得安装一个插件，要不然报错：  
 ![|774x96](https://cdn.lyb.pub/upic/1744474650_cV8faw.webp)
很简单，在 GUI 上找到插件中心，从列表中安装。先更新列表，然后就可以看到“节点转换”了。  
 ![](https://cdn.lyb.pub/upic/1744474651_GkAXv5.webp)  
后面再重新添加下 clash 的订阅地址就行了。

## 启动内核

直接到首页点击启动内核就可以。  
在顶部菜单上可以先把节点，其它的都跟 clashx 差不多。  
 ![](https://cdn.lyb.pub/upic/1744474652_qh9YSN.webp)

# 速度

## 对比

- **Sing-box 内部**：
  - HTTP/SOCKS5 模式比 TUN 模式快 **1-5ms**（延迟），吞吐量差距很小（2-5%）。
  - 对于大多数用户，这点差异几乎感觉不到。
- **Sing-box vs. ClashX**：
  - Sing-box 比 ClashX 快 **2-5ms**（延迟），吞吐量高 **10-20%**。
  - 如果你之前用 ClashX 感觉速度还可以，切换到 Sing-box 后应该会有明显提升，尤其是在下载大文件或使用高效协议时。
  - 如果你使用的是低延迟服务器（比如 20ms），Sing-box 的优势更明显，下载速度可能从 80Mbps 提升到 90-95Mbps。

## Tun 模型

先到插件中心找下 Tun 模式助手，它可以引导你怎么一步步安装 tun。  
 ![|0x0](https://cdn.lyb.pub/upic/1744474653_IO5quG.webp)  
安装完之后，点击它，会让你运行一条命令，运行完之后再点击 tun 模型就会弹出提示，点允许就行。  
 ![](https://cdn.lyb.pub/upic/1744474654_fQTGG6.webp)

## 插件

Gemini 插件。需要做配置，不好找，后来发现是要右击这个卡片，找到配置才行。  
 ![](https://cdn.lyb.pub/upic/1744474656_KBYY1j.webp)  
通用设置里，把托盘菜单的这个选项打开。  
 ![](https://cdn.lyb.pub/upic/1744474657_7WaCmo.webp)

## 命令行

Single-box 一般不干扰命令行，即使开启了 tun 模型，命令行也很可能没被代理。  
其实是有一个插件可以直接给你方法让命令行走代理：  
 ![|650x286](https://cdn.lyb.pub/upic/1744474658_RLt7Ie.png)  
实际上，点运行时，只是让你复制一个 export https_proxy 和 http_proxy 的命令，很简单。  
你不装这插件，手动去运行下面这两行命令也可以的：

```bash
export http_proxy="http://127.0.0.1:20122"
export https_proxy="http://127.0.0.1:20122"
```

20122 就是 single-box 在本地开的代理
