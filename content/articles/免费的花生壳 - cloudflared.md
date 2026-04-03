---
updated_at: 2024-10-27T11:31:09.698+08:00
edited_seconds: 220
tags:
  - 互联网/折腾/cloudflare
created_at: Sun, Dec 15th, 2024 - 16:03:07
banner_icon: 📂
banner: "https://cdn.lyb.pub/banners/f53c5884b5505531f32ad8fa0fc57247.jpg"
description: 通过 cloudflare 提供的免费软件和服务，搭建一条免费的 Tunnel 穿透内网，并指定自定义域名来访问你的内网服务，关键还没有网速限制
title: 免费的花生壳 - cloudflared
slug: build-a-cloudflared-tunnel
draft: false
date: 2024-12-15T16:03:07+08:00
---
> [!note] 花生壳  
> 一般我们习惯用花生壳来实现内网穿透，不过花生壳本身是要收钱的，它的域名也要收钱，流量也收一次钱，而且给了钱之后它的流量带宽也受到限制，正常是 1M 带宽下载速度只有 100 多 k，用起来很难受，加点带宽就要加不少钱。而且每个月还有总流量限制，经常用了半个月就不行了，非常痛苦。

其实 cloudflare 本身就提供了一个免费的 cloudflared 的 tunnel 工具，直接下载运行就行。如果用 Docker 的话可以用这个镜像：[hub.docker.com/r/cloudflare/cloudflared](https://hub.docker.com/r/cloudflare/cloudflared) 里面也有一些简单的指引。

# 简单使用

一条命令就可以搞定：

```bash
cloudflared tunnel --no-autoupdate --hello-world
```

不过这么跑，比较依赖于不需要 Cloudflare 帐户的公共 trycloudflare.com，很不稳定，我之前试用过，经常断，网速也不稳定。要实际上线使用的话，还是得自己注册一个 cloudflare 账号，下面介绍。

# 搭建个人 Tunnel 网络

## 注册一个 Tunnel

到 [Cloudflare One](https://dash.teams.cloudflare.com/⁠) 上注册一个 Cloudflare Zero Trust 域名，选 Free 就可以了  
 ![|675|0x0](https://cdn.lyb.pub/2024/12/420352862a7523747b97d596ff767b81.webp)  
接下去它会让你绑定一个支付卡，即使选的是免费的。这是海外各类服务的常见操作，因为收费计划可能会变，而且你使用时也可能会超额，所以先让你把扣费的方式留好，以备后面需要的时候能扣到钱。  
注册完后，下面我们来一步步创建一个 tunnel，其实过程也很简单。

> 这些是一步步摸索出来的，没有参考其它外部的指引，所以可能会有更好的办法。希望有读者找到更好的方法时，能给我留个评论，感激不尽。

## 创建 Tunnel

在下图中的菜单里找到创建的地方，选 Cloudflared。  
 ![|875](https://cdn.lyb.pub/2024/12/5b690dff91048eeaeb5663f168c837a2.webp)  
自己取一个名字（不跟别人重复就行）  
 ![|900](https://cdn.lyb.pub/2024/12/8652218a31d2d78c56aa4f0a43edcf8d.webp)  
下一步，取得 token：  
 ![|925](https://cdn.lyb.pub/2024/12/29b1a001c14459ba21b349c12cb4288d.webp)  
如上图，划线处就是你的 token，先记下来，下面用。

## 启动、接入

创建完之后，在本地运行 cloudflared 的命令：

```bash
cloudflare tunnel --no-autoupdate run --token xxx
```

如果使用 docker 的话，可以用这个 compose yml

```yml
version: "3.8"

services:
  cloudflared:
    image: cloudflare/cloudflared:latest
    container_name: cloudflared
    command: tunnel --no-autoupdate run --token xxxx
    restart: unless-stopped
    network_mode: host
    dns:
      - 1.1.1.1
```

其中，xxx 换成你自己的 token。  
如果你家里有个服务器或 NAS，其实 docker 是比较合适的，它可以一直在线跑。  
创建完之后，在同一个界面里可以看到已经有一个设备连接上来了：  
 ![|725](https://cdn.lyb.pub/2024/12/3c23fd4e318bb3198e69dd369ed24c29.webp)  
再下一步，public hostnames 里添加一个你转到 cloudflare 来解析的域名，加一个子域名。同时 Service 填写你内网的某个服务的地址，如你的 nginx 网关等。  
 ![|875](https://cdn.lyb.pub/2024/12/0e9d6a0c0afadbd8100b681aab58a962.webp)  
再下一步就回到了列表页，可以看到你的 tunnel 已经在跑了：  
 ![|850](https://cdn.lyb.pub/2024/12/f39e1282f64410a6862142f136b7108b.webp)  
回到你的 cloudflare DNS 配置页面，可以看到它帮你添加了一个 CNAME，说明已经成功了  
 ![|875](https://cdn.lyb.pub/2024/12/292affb6bfeac40389684bb915b7bce0.webp)  
 [DNS records · Cloudflare Zero Trust docs](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/routing-to-tunnel/dns/) 这条 CNAME 的规则是：`<Tunnel ID>.cfargotunnel.com` ，这个 Tunnel ID 可以在上方的截图中找到。所以手动配置也行。
现在你可以用刚配置的域名来访问你的内网服务了。网速很快。  
 ![|750](https://cdn.lyb.pub/2024/12/7063c449ce57a9dfa970e2e9c6916d9e.webp)

## 优化网络连接

如果你的服务需要耗时比较久，比如 git 服务，有时你拉内容的时候都要好几分钟，那就需要设置连接和超时时长了。  
在上面我们配置 publish hostname 时，下方其实还有高级配置，如下图位置：  
 ![|725|725x580](https://cdn.lyb.pub/2024/12/321e5240cb520e8f255d0afad7893609.webp)  
 调整下 timeout 的时长（默认 30s），超过 30 秒就自动关闭链接了，所以这个地方可以适当调大一些。

## Header

![](https://cdn.lyb.pub/upic/1744470864_fTcwVf.png)
