---
updated_at: 2024-10-27T11:31:09.698+08:00
edited_seconds: 220
tags:
  - inbox
created_at: Tue, Dec 9th, 2025 - 13:09:07
date: 2025-12-09T13:09:07.630+08:00
banner_icon: 🦣
banner: https://cdn.lyb.pub/banners/c147fef836f4a04d02982e06860316f6.jpg
slug: claude-code-using-litellm
draft: false
description: 如何安装和配置claude code 和 Claude Code Router，接入 Litellm 使用 Gemini 最新模型
title: Claude code 接入 Litellm
---
# 安装
先安装 claude code
```shell
npm install -g @anthropic-ai/claude-code
```
安装 Claude Code Router 代理:
```shell
npm install -g @musistudio/claude-code-router
```
启动代理：
```shell
nohup ccr start &
```
# 配置代理
然后访问 http://localhost:3456/ui/ ，添加供应商，填写：
- API 完整地址：https://<你的域名>/v1/chat/completions（如果你自己部署）
- 模型分别添加下：`gemini-2.5-pro` / `gemini-2.5-flash` / `gemini-3-pro-preview`  
保存后，界面右侧的路由都选 gemini-3-pro-preview。搞定好，点击右上角的保存并重启，这样 CCR 代理就准备好了。
# 配置 Claude Code 使用代理
打开 `~/.zshrc` 或 `~/.bashrc`（看你系统有哪个就打开哪个），然后配置下环境变量：
```config
export ANTHROPIC_BASE_URL="http://127.0.0.1:3456"
export ANTHROPIC_AUTH_TOKEN=
export ANTHROPIC_MODEL=""
```
之后应用下这个配置：
```shell
source ~/.zshrc
// 或
source ~/.bashrc
```
现在就可以用了，在命令行里输入 `claude` 就可以用了。
