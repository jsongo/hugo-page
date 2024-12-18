---
updated_at: 2024-10-27T11:31:09.698+08:00
edited_seconds: 220
tags:
  - IT/折腾/azure
created_at: Wed, Dec 18, 2024 - 00:42:33
date: 2024-12-18T00:42:33.881+08:00
banner_icon: 👨🏼‍💻
banner: "https://cdn.jsongo.top/banners/54ae9a6d9d56a2e58c20dc50f584fd39.jpg"
title: Azure Function Triggers
slug: azure-function-triggers
description: 介绍 Azure Function 的各种触发器类型，包括定时任务触发和 HTTP 请求触发等。文中详细描述了如何使用 Timer Trigger 来实现定时任务，并提供相关的代码示例和详解。
draft: false
---
# 触发器各类
Azure Function 有多种模板，我们在创建 Function 时，一般会用 `--template` 参数要指定用哪个模板。详细的可以参考官方文档：[Triggers and bindings in Azure Functions \| Microsoft Learn](https://learn.microsoft.com/en-us/azure/azure-functions/functions-triggers-bindings) 或中文版 [Azure Functions 中的触发器和绑定 \| Microsoft Learn](https://learn.microsoft.com/zh-cn/azure/azure-functions/functions-triggers-bindings?tabs=isolated-process,node-v4,python-v2&pivots=programming-language-csharp)。  
以下是一些常见的：
## 基于事件触发的模板
- **Azure Blob Storage Trigger**：当 Azure Blob 存储中的 Blob 被创建、更新或删除时触发函数。例如，可以在有新文件上传到指定 Blob 容器时，自动触发函数进行数据处理或文件转换等操作。
- **Azure Event Hubs Trigger**：用于接收来自 Azure Event Hubs 的事件流消息，可实现对实时数据的处理。例如，在物联网场景中，接收设备发送的大量实时数据进行分析和处理。
- **Azure Service Bus Trigger**：可以响应来自 Azure Service Bus 队列或主题的消息，支持批量接收消息。适用于处理异步消息传递场景，如订单处理、消息通知等。
## 基于数据存储的模板
- **Azure Cosmos DB Trigger**：使用 Azure Cosmos DB 的变更 feed 来监听分区中的插入和更新操作，当有数据发生变化时触发函数，可用于实时数据同步等场景。
- **Azure SQL Database Trigger**：当 Azure SQL 数据库中的表发生数据插入、更新或删除操作时触发函数，方便进行数据的关联操作和业务逻辑处理。
## 基于定时任务的模板
除了 Timer Trigger 外，还有一些定时任务相关的模板或扩展，如支持按照特定时间间隔或 cron 表达式来定期执行函数，可用于定时数据备份、报表生成等任务 。
## 基于 HTTP 请求的模板
除了常见的 HTTP Trigger 外，还有一些针对特定 HTTP 场景的模板或扩展，如支持接收和处理来自 Webhook 的 HTTP 请求，可用于与第三方系统进行集成，接收外部系统推送的数据或事件。
## 其他模板
- **PowerShell Trigger**：允许使用 PowerShell 脚本编写函数逻辑，方便系统管理员或熟悉 PowerShell 的开发人员进行自动化脚本编写和任务调度。
- **Python Trigger**：使用 Python 语言编写函数逻辑，适用于数据科学、机器学习等场景，可方便地调用 Python 库进行数据处理和分析。

# 实践
## Timer Trigger
Http trigger 在 [azure serverless](azure%20serverless.md) 中介绍过了。这里再讲一下 Timer Trigger，在做定时任务时非常有用，而且计费也只是按函数的执行时间来计，比较划算。  
详细使用可以参考官方文档：[Azure Functions 的计时器触发器 \| Microsoft Learn](https://learn.microsoft.com/zh-cn/azure/azure-functions/functions-bindings-timer?tabs=python-v2,isolated-process,nodejs-v4&pivots=programming-language-python) 。  
跟创建普通的 Azure Function 一样，还是用 CLI 的 new 命令：
```bash
func new --name xxx --template "timer trigger"  --authlevel "function"
```
它会在你的 `function_app.py` 里创建一个新的 function：
```python
@app.timer_trigger(
    schedule="0 */10 * * * *",
    arg_name="timer",
    run_on_startup=False,
    use_monitor=False,
)
def my_polling(timer: func.TimerRequest) -> None:
    if timer.past_due:
        logging.info("The timer is past due!")
    logging.info("Python timer trigger function executed.")
```
@app.timer_trigger 里的几个参数：
- schedule：语法跟 cronjob 的配置一样，参考：[Cron 表达式](Cron%20表达式.md)。
- arg_name：表示计时器对象的变量的名称，没啥特别含义，就是随便定个名字能用就行。
- run_on_startup：部署完、或重新启用时，它自动触发一次。
- use_monitor：是否被 monotor 记录，如果间隔大于 1 分钟，建议设置为 true。  
其中， `func.TimerRequest` 这个参数，其实就只有 `past_due` 这个 boolean 类型的属性。  
`past_due` 用于判断当前定时器触发的任务是否已经逾期：
- 当定时任务由于某些原因（例如系统负载高、资源暂时不可用等）未能在预定的时间点执行，后面才被触发时，`mytimer.past_due` 将为 `True`。
- 如果定时任务在预定时间内正常执行，那么 `mytimer.past_due` 将为 `False`  
现在 `my_polling` 函数里，我们可以添加一些对其它 Azure Function 的调用，由此来处理其它任务的定时执行。这样由两个触发器配合来完成特定任务。当然把逻辑全与在 Timer Trigger 里也不是不行，只不过解耦开之后，Http Trigger 还能被单独使用。
