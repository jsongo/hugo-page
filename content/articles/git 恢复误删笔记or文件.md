---
updated_at: 2024-10-27T11:31:09.698+08:00
edited_seconds: 220
tags:
  - IT/git
created_at: Tue, Dec 17, 2024 - 23:34:22
date: 2024-12-17T23:34:22.963+08:00
banner_icon: 🤵🏼‍♂️
banner: "https://cdn.jsongo.top/banners/6424b2c83ab269ea18c2240356db3b9d.jpg"
slug: git-recover-notes
title: git 恢复误删笔记or文件
description: 如何使用 Git 恢复误删的笔记或文件。通过 Git 的版本管理功能，可以轻松找回即使是很久之前删除的文件。文章中提到使用 git log 和 git show 命令来查找和恢复特定文件的历史记录和更改内容。
draft: false
---
自从改用 Obsidian 来做笔记后，再也不怕文件丢失了，特别是我有了 git 来管理文件后，不小心删掉一些文件也都能找回来，即使是 100 天前删除的都行，非常方便。
> [!Tip] 为什么用 git 管理？同步软件不行吗  
> 我试过用 Obsidian 官方的，但我的笔记增长太快了（最近一直在迁移以前的笔记），一个月就增长 1G，所以买官方的服务太贵了，而且还有一个更重要的原因：文件经常会莫名其妙地被覆盖，而我完全没办法，可以看到一些历史，但很麻烦，得一个个点开找，可以说不太可用。  
> 其实 git 是最完美的版本管理工具，非常丰富的命令可以实现各种操作、满足各类诉求。下面讲讲我是怎么找回我的文件
# 主要方法
文件不小心删掉了要找回来是比较常见的，比如我装的 `clear unused images` 插件，经常有些不知名的原因删我的图片。开始我还一个一个 commit 找，效率实在太低了，其实 git 是支持从 log 里找的，命令也不难。比如我今天不小心删掉了某个文件，现在我想恢复，我明确知道是今天删的（因为昨天还没有这个图片贴的那个文档），所以我就从今天开始搜索，很快：
```bash
git log --since=midnight -- 74a006c91c5150f0d9d9dd25d5c5ab34.webp
```
找到有哪些 commit 操作了这个文件，然后再用 git show 命令来看当时做了哪些操作：
```bash
git show 5b12e80a540539b0da2ac75cf4d5e7221f2b7342 -- 74a006c91c5150f0d9d9dd25d5c5ab34.webp
```
结果：  
	![|725](https://cdn.jsongo.top/2024/12/95c7302d5fa881834bb45c88c8115cb2.webp)  
可以看到，当时把这个文件给删掉了。再往上看，可以找到第一条 commit，这就是它创建的那个提交，还能看到是什么时候提交的：  
	![|725](https://cdn.jsongo.top/2024/12/861fa74e3155d6e84b9e6ffba287e05e.webp)  
最后就是恢复文件，直接用 `git checkout` 命令就行：
```bash
git co c171a4c169470455fa8ac62fd8d4164ea677c8ec -- 2c579673c6b2f0793f2e423523cc6fe3.webp
```
# 扩展
## 时间范围
上文讲 git log，它其实有很多指定时间范围的参数，刚刚用了 since midnight (非常语义化、好理解)，也可以指定要几天前。另外还有一个 `--util` 参数，用法跟 since 一样，这两个参数可以办公室一个范围，比如大前天的文件变更情况，可以用：
```bash
git log --since="3 days ago" --until="2 days ago" -- <filename>
```
此外还有两个类似的参数：after（=since）、before（=until），记住一组就行。
## 时间写法
上文涉及到：`midnight`、`3 days ago` 这两种，都是直接用英文表达的。做个汇总：
- 相对日期：`--since="3 days ago"`
- 绝对日期：`--since="2024-10-01"` 或具体到时间，如 `2024-10-01 12:00`
- 时间戳（秒）：`--since=1633046400`
- 自然语言时间，主要有：
	- `yesterday`
	- `today`
	- `midnight`：今天的午夜
	- `noon`：今天的中午
	- `teatime`：今天的下午 4 点
	- `last week`
	- `last month`
	- `last year`
	- `last christmas`
- 组件表达，非常强大，举几个例子：
	- `3 days ago 14:00`
	- `2 weeks ago midnight`
	- `last friday`
	- `last year december 31 23:59`
	- `new year's eve 2022`
