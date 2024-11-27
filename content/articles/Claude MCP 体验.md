---
tags:
  - AI/原理
title: Claude MCP 体验
description: MCP 即 Model Context Protocol，模型上下文协议，它能通过借助外部或历史信息，来更高效地构建信息更全面的上下文信息。
slug: claude-mcp-101
banner: https://cdn.jsongo.top/banners/b87a43aef0ebf4a4d13f45ad57e9b5d2.jpeg
draft: false
---
# 概念
MCP 即 Model Context Protocol，模型上下文协议，它能通过借助外部或历史信息，来更高效地构建信息更全面的上下文信息。  
这是一个非常重要的协议，刚发布的时候，x 上大家都乐开了花，一个比较典型的说法是“[村里通网了 - Claude MCP 开启数据连接和操作的新宇宙](https://x.com/eviljer/status/1861333739730804848)”。我一直认为，LLM 要能跟外界真正的能交互起来才能有更大的想像空间。之前见过一些有趣的如操作电脑的辅助 LLM 的工作，还有一些辅助浏览器操作的插件，这次是从协议上就定出一个标准，大家只要按照标准来，都可以相互打通。

# 功能
## 介绍
![图片来自 x]({MD5}-1.webp)
>  参考：[Claude秒变Cursor！MCP让AI直接编辑本地文件 | Anthropic MCP实测](https://x.com/nicekate8888/status/1861323082969030978)
- 官方文档：[Introducing the Model Context Protocol - Anthropic](https://www.anthropic.com/news/model-context-protocol)
## 使用
- 安装（以 Mac 来讲）
	```bash
	brew install uv git sqlite3
	```
	- 然后下载 Claude [桌面端](https://claude.ai/download)，
- 开启
	- 如何启用具体可以参考：[Quickstart - Model Context Protocol](https://modelcontextprotocol.io/quickstart#installing-prerequisites-macos)
	- 简单说，这个功能桌面端才有，Mac 上可以打开 `~/Library/Application Support/Claude/claude_desktop_config.json` 编辑下这个 JSON 文件，然后重启下 Claude 客户端就自动启用了。往 JSON 文件里写内容：
```json
{
  "mcpServers": {
    "sqlite": {
      "command": "uvx",
      "args": ["mcp-server-sqlite", "--db-path", "/Users/<my-user-name>/claude.db"]
    }
  }
}
```
## 示例
官方给的例子：
```bash
# Create a new SQLite database
sqlite3 ~/claude.db <<EOF
CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name TEXT,
  price REAL
);

INSERT INTO products (name, price) VALUES
  ('Widget', 19.99),
  ('Gadget', 29.99),
  ('Gizmo', 39.99),
  ('Smart Watch', 199.99),
  ('Wireless Earbuds', 89.99),
  ('Portable Charger', 24.99),
  ('Bluetooth Speaker', 79.99),
  ('Phone Stand', 15.99),
  ('Laptop Sleeve', 34.99),
  ('Mini Drone', 299.99),
  ('LED Desk Lamp', 45.99),
  ('Keyboard', 129.99),
  ('Mouse Pad', 12.99),
  ('USB Hub', 49.99),
  ('Webcam', 69.99),
  ('Screen Protector', 9.99),
  ('Travel Adapter', 27.99),
  ('Gaming Headset', 159.99),
  ('Fitness Tracker', 119.99),
  ('Portable SSD', 179.99);
EOF
```
创建一个表，然后往里面写一些数据。
## 运行
```bash
uvx mcp-server-sqlite
```
它会用 [uvx](https://docs.astral.sh/uv/guides/tools/) 来运行 mcp 服务。  
Prompt Demo:  
`Can you connect to my SQLite database and tell me what products are available, and their prices?`

# 原理
其实就是加了一个 MCP server 作为本地代理，架构如下：  
![]({MD5}-2.webp)  
MCP 是一个开放协议：
- 首先会建立与外部数据源的连接。它使用预定义的接口和数据格式来识别和访问这些外部源。例如，当需要从一个关系型数据库获取信息来为语言模型（LLM）提供上下文时，MCP 会通过数据库驱动程序按照数据库的协议（如 SQL）进行通信，检索数据。
- 另一方面 MCP 也类似 Prompt 模板一样，提供了**动态上下文构建**的能力：
	- MCP 能够留空的方式，动态地构建上下文。
	- 例如，在聊天界面应用中，当用户询问一个关于特定产品的问题时，MCP 可以快速从产品数据库中获取产品的规格、用户评价等相关信息，并将这些信息组合成一个有意义的上下文提供给 LLM。
	- 还可以根据用户的交互历史来调整上下文。  
它本身会不断更新和优化提供给 LLM 的上下文，确保 LLM 能够跟上用户的思路，通过这些方式，MCP 能提高 LLM 的工作效率和回答质量。
