---
updated_at: 2024-10-27T11:31:09.698+08:00
edited_seconds: 220
tags:
  - IT/折腾/azure
created_at: Mon, Dec 16th, 2024 - 13:39:37
banner_icon: 🦀
banner: https://cdn.jsongo.top/banners/0dba76ff89c558a40825ce7e7a507005.jpg
slug: azure-serverless-mysql
description: 介绍了如何在 Azure Function 上使用 MySQL 数据库，包括申请免费额度、创建实例、连接和操作数据库的步骤。它还提供了在 Mac 上安装 MySQL 客户端的建议
title: Azure Function + Mysql 入门
draft: false
date: 2024-12-16T13:39:37+08:00
---
 > 在 Azure Function 上使用 mysql DB，具体可以参考：[Azure Database for MySQL bindings for Functions \| Microsoft Learn](https://learn.microsoft.com/en-us/azure/azure-functions/functions-bindings-azure-mysql?tabs=isolated-process&pivots=programming-language-python)
# Mysql 申请
## 免费额度
免费用户其实还是有不少额度可以使用：  
	![|650](https://cdn.jsongo.top/2024/12/31a8630222aa9b38aa0c6bedb54fb61e.webp)  
	详细可以阅读：[Try Out With an Azure Free Account - Azure Database for MySQL - Flexible Server \| Microsoft Learn](https://learn.microsoft.com/en-us/azure/mysql/flexible-server/how-to-deploy-on-azure-free-account)
- 简单说，可以支持 B1MS 实例一直在线上跑，有 32G 的存储空间。B1MS 有 1~2 个 CPU 微核
## 添加一个实例
- 打开：[Microsoft Azure DB for MySQL Server](https://portal.azure.com/#browse/Microsoft.DBforMySQL%2Fservers)，点 `Quick Create`。  
	![](https://cdn.jsongo.top/2024/12/a1e23752568d6a93c878dcf2864d5a30.webp)
- 简单填写下信息就行：  
	![](https://cdn.jsongo.top/2024/12/4fee17d9e7f06b0c894723a5a2cc1c18.webp)
- 下一步、创建，等几分钟就创建成功了：  
	![](https://cdn.jsongo.top/2024/12/aab8b78c940e753bc5de50a461d49053.webp)

# 简单使用
## 手动连接
在本地默认是连接不上的， azure 为了安全，对访问做了限制，可以通过 zero trust 网络来接入，当然也可以简单的设置下网络、放行你的 ip：  
	![](https://cdn.jsongo.top/2024/12/da949ffb37dbb360bb9e563577f2adf8.webp)  
不过其实还有更简单的方式，直接在页面上打开连接：  
	![](https://cdn.jsongo.top/2024/12/34cdbaccec72321f854ea1da97fac0b4.webp)  
	连接时，它会弹出一个 terminal，然后自动运行 mysql 命令进行连接。实际上，这个时候还连不上，即使你密码输入正确了也不行，它需要验证证书（也是为了安全）。  
	证书可以从这里下载：[使用 TLS/SSL 加密的连接](https://learn.microsoft.com/zh-cn/azure/mysql/flexible-server/how-to-connect-tls-ssl#download-the-public-ssl-certificate) ，或者直接用我下图中的 wget 命令即可。  
	![](https://cdn.jsongo.top/2024/12/de4826c732a4f7e2e09f0280c58246a3.webp)  
需要注意的是，直接连接 Mysql 进行操作比较危险，可以应急用，不建议当成常规操作。
## 操作
刚创建的 MySQL 服务里面是空的，得自己手动创建一个 database：
```sql
create database xxx;
```
然后就可以切到这个 db 上使用了：`use xxx`。
## Mac 上连接
如果是在 mac 上安装 mysql 客户端的话，用 brew install 会非常慢，直接到这个地址上去下载一个客户端：[Download MySQL Community Server](https://dev.mysql.com/downloads/mysql/)
