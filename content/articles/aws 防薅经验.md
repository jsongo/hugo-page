---
updated_at: 2024-10-27T11:31:09.698+08:00
edited_seconds: 220
tags:
  - IT/折腾/aws
created_at: Fri, Dec 13th, 2024 - 15:59:05
banner_icon: 🚴🏻‍♀️
banner: https://cdn.jsongo.top/banners/1f46848857f50464c097c5ea752ee538.jpg
slug: avoid-aws-charges
title: 踩坑：如何避免被 aws 悄悄地收费
description: 最近被 aws 算计了好多钱，之前一直没在意。后来才知道，是当时在另一个区域开了一个 cloud9。
draft: false
---
最近被 aws 算计了好多钱，之前一直没在意。后来才知道，是当时开了一个 cloud9。
	![|250](https://cdn.jsongo.top/2024/12/8004e7b22145d8b77b7bcca05c34f06b.webp)
	EC2 一个月扣我 10 刀，Virtual Private Cloud 应该是 cloud9 启动后，内部建立的容器集群。Tax 这个就不用说了，10%的税
刚开始进入控制面板首页时，看不到什么异常，点 EC2 也没看到什么不对的地方：
- 这个页面：https://us-east-1.console.aws.amazon.com/console/home?region=us-east-1
	![|625](https://cdn.jsongo.top/2024/12/5f2935beac626250341b78204dba3aaa.webp) 
	看起来很正常，也没有实例在跑
- 后来点了 global view 才知道，原来其它区域还有，aws 它是分区域隔离的，我一直在用 us-east 的，所以一直没发现。
	![](https://cdn.jsongo.top/2024/12/4f04b71f829cf419a34b05797f7e6cd6.webp)
	[这里找 global 使用中的实例](https://us-east-1.console.aws.amazon.com/ec2globalview/home)
