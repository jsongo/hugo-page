---
updated_at: 2024-10-27T11:31:09.698+08:00
edited_seconds: 220
tags:
  - IT/折腾/azure
created_at: Sun, Jan 5, 2025 - 20:51:24
date: 2025-01-05T20:51:24.063+08:00
banner_icon: 🐠
banner: https://cdn.jsongo.top/banners/5d75a43553c8d4b677794dc7b70c2f7e.jpg
slug: azure-functions-hostings
title: Azure Functions 的5种托管方式
description: Azure Functions 的五种托管方式，包括 Flex Consumption、Premium、Dedicated、Container Apps 和 Consumption 计划，比较了它们在缩放方式、资源限制、适用场景和计费方式上的差异。
draft: false
---
Azure 的 Functions 是一种 Serverless 基建，不过它提供了多种用法，计费方式和适用的场景也不太一样。  
下文对 Flex Consumption plan、Premium plan、Dedicated plan、Container Apps 和 Consumption plan 这 5 种方式进行下对比。
# 直观表格对比
| 托管方式                  | 缩放方式                        | 容器支持  | 执行超时             | 实例数量限制                                          | 适用场景                                                                       | 计费方式                                       |
| --------------------- | --------------------------- | ----- | ---------------- | ----------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------ |
| Flex Consumption plan | 基于每函数事件驱动缩放，部分触发器类型分组共享实例缩放 | 无     | 默认 30 分钟，最大无限制   | 受区域总内存使用限制，每函数应用实例数受内存限制                        | 需快速水平缩放、有虚拟网络需求、按使用量付费且希望减少冷启动                                             | 基于函数执行次数、执行时实例内存及预配置实例成本                   |
| Premium plan          | 基于事件驱动自动缩放，有预热工作进程          | Linux | 默认 30 分钟，最大无限制   | Windows 最多 100 个，Linux 部分地区可达 20 - 100 个        | 函数应用持续或近乎持续运行、需更多实例控制、有事件驱动缩放需求、执行次数多但消费计划费用高、代码执行时间长、需虚拟网络连接或自定义 Linux 镜像 | 基于所需和预热实例的核心秒数及内存使用                        |
| Dedicated plan        | 支持手动或自动缩放                   | Linux | 默认 30 分钟，最大无限制   | 一般 10 - 30 个，ASE 中可达 100 个                      | 有现有未充分利用虚拟机、需要完全可预测计费、在同一计划运行多个 Web 和函数应用、需要大计算规模或 ASE 提供的安全网络访问的长运行场景     | 按 App Service 计划常规费率计费，ASE 有固定月费和按 vCPU 计费 |
| Container Apps        | 根据应用负载自动调整资源分配              | Linux | 依具体配置和底层资源决定     | 根据自动缩放机制调整                                      | 适合快速部署和运行容器化应用，特别是微服务架构应用，适合容器应用迁移到云端                                      | 基于容器实例数量、运行时间、所占用资源（如 CPU、内存等）             |
| Consumption plan      | 基于事件驱动自动缩放，依传入触发事件数量增减主机实例  | 无     | 默认 5 分钟，最大 10 分钟 | Windows 最多 200 个，Linux 最多 100 个，每小时 500 个实例缩放限制 | 适合函数运行时付费、希望自动缩放且无复杂配置需求                                                   | 函数运行时按执行次数、执行时间和内存使用计费                     |

# 展开介绍
更全面的总结对比下。
1. **Flex Consumption plan**
    - [Azure Functions Flex Consumption plan hosting \| Microsoft Learn](https://learn.microsoft.com/en-us/azure/azure-functions/flex-consumption-plan)
    - **缩放方式**：基于每函数的事件驱动缩放，除特定触发器外，不同函数触发器类型可在独立实例上缩放，如 HTTP、Blob 存储（Event Grid）、Durable Functions 分别成组共享实例缩放，提供更确定的缩放方式。
    - **资源与限制**：无容器支持；支持指定预配置实例减少冷启动；支持虚拟网络；函数执行超时默认 30 分钟，最大无限制；每实例内存等资源限制因配置而异，受区域总内存使用限制；每函数应用实例数受内存限制。
    - **适用场景与计费**：适合需要快速水平缩放、有虚拟网络需求、按使用量付费且希望减少冷启动的场景；计费基于函数执行次数、执行时实例内存及预配置实例成本。
2. **Premium plan**
    - [Azure Functions Premium plan \| Microsoft Learn](https://learn.microsoft.com/en-us/azure/azure-functions/functions-premium-plan?tabs=portal)
    - **缩放方式**：基于事件驱动自动缩放，使用预热工作进程，根据函数触发事件数量增加主机实例，在空闲后能无延迟运行应用。
    - **资源与限制**：支持 Linux 容器；运行在更强大实例上；函数执行超时默认 30 分钟，最大无限制；Windows 最多 100 个实例，Linux 部分地区可达 20 - 100 个实例；提供更多 CPU 和内存选项。
    - **适用场景与计费**：适用于函数应用持续或近乎持续运行、需要更多实例控制、在同一计划部署多个应用且有事件驱动缩放需求、执行次数多但消费计划费用高、代码执行时间长、需虚拟网络连接或自定义 Linux 镜像的场景；计费基于所需和预热实例的核心秒数及内存使用。
3. **Dedicated plan**
    - [Azure Functions Dedicated hosting \| Microsoft Learn](https://learn.microsoft.com/en-us/azure/azure-functions/dedicated-plan)
    - **缩放方式**：支持手动或自动缩放。
    - **资源与限制**：支持 Linux 容器；可在 App Service 计划内以常规费率运行函数；提供完全可预测计费和手动缩放；能访问更大计算规模选项；在 App Service Environment（ASE）中提供完全计算隔离和安全网络访问；内存使用和扩展能力高；函数执行超时默认 30 分钟，最大无限制；实例数一般 10 - 30 个，ASE 中可达 100 个。
    - **适用场景与计费**：适合有现有未充分利用虚拟机、需要完全可预测计费、在同一计划运行多个 Web 和函数应用、需要大计算规模或 ASE 提供的安全网络访问的长运行场景；按 App Service 计划常规费率计费，ASE 有固定月费和按 vCPU 计费。
4. **Container Apps**
	- [Azure Container Apps hosting of Azure Functions \| Microsoft Learn](https://learn.microsoft.com/en-us/azure/azure-functions/functions-container-apps-hosting)
	- **缩放方式**：具有自动缩放功能，能够根据应用程序的负载自动调整资源分配，可依据传入请求数量或工作负载增减容器实例数量。
	- **资源与限制**：支持 Linux 容器，运行环境可靠，资源限制依配置和定价层而定。
	- **适用场景与计费**：适合快速部署和运行容器化应用，特别是微服务架构应用，计费基于容器实例数量、运行时间和占用资源等使用情况。
5. **Consumption plan**
    - [Azure Functions Consumption plan hosting \| Microsoft Learn](https://learn.microsoft.com/en-us/azure/azure-functions/consumption-plan)
    - **缩放方式**：基于事件驱动自动缩放，根据传入触发事件数量添加或删除函数主机实例。
    - **资源与限制**：无容器支持；是默认的无服务器托管计划；函数执行超时默认 5 分钟，最大 10 分钟；每实例内存等资源有限；Windows 最多 200 个实例，Linux 最多 100 个实例；有每小时 500 个实例的缩放限制。
    - **适用场景与计费**：适合函数运行时付费、希望自动缩放且无复杂配置需求的场景；仅在函数运行时按执行次数、执行时间和内存使用计费。

# 价格
5 种函数托管方式在价格上的差别不小。
## Flex Consumption Plan
它是基于每函数事件驱动缩放的，有些触发器类型还分组共享实例缩放。  
计费就看函数执行次数、执行时实例内存，还有预配置实例的成本。要是你配置的预配置实例少，低流量的时候费用就低；可要是高流量，需要大量实例了，那随着实例增多，费用自然也跟着涨，具体花多少钱，得看实际用了多少实例、多少内存，还有执行次数这些情况。
## Premium Plan
它是基于事件驱动自动缩放，还有预热工作进程。计费是根据所需和预热实例的核心秒数以及内存使用情况来的。这个计划适合函数应用持续或者近乎持续运行、执行次数又多的情况。虽说基础费用比 Consumption plan 高些，但要是你的应用使用率高，或者有一些特殊需求，用它反而能把总体成本控制得更好，需要自己做好提前的计划。
## Dedicated Plan
它支持手动或自动缩放，计费是按 App Service 计划常规费率来的，要是在 App Service Environment（ASE）里，还有固定月费和按 vCPU 计费。要是你手头有现有没充分利用的虚拟机，或者需要完全可预测的计费，又或者想在同一个计划里运行多个 Web 和函数应用，选它就挺合适。不过要注意，它前期投入成本相对高些。
## Container Apps
它是根据容器实例数量、运行时间，还有占用的资源，像 CPU、内存这些来计费的。比如说，你运行一个小型 Linux 容器实例，配置 1 vCPU 和 2GB 内存，跑 1 个小时，费用可能在几美分到几十美分不等，具体得看你在哪个区域，还有那个区域的资源单价是多少。
## Consumption Plan
这可是个完全无服务器托管的选项，简单来讲，只有函数运行的时候才会产生费用。它是怎么计费的呢？主要看函数的执行数量、执行时间，还有占用的内存。  
举个例子，要是在美国西部区域，有个内存消耗为 512MB 的函数，这个月执行了 3,000,000 次，每次执行就持续 1 秒。咱们来算算账，内存资源消耗费用大概是这样算：  
`{（3百万秒 * 512GB/1,024） - 0.4百万GB - 秒} * 0.000016美元/GB - 秒 = 17.6美元`  
函数执行次数费用如下：  
`（3百万次执行 – 1百万次执行） * 0.20美元 = 0.4美元`  
把这两项一加，总费用就是 17.6 美元 + 0.4 美元 = 18 美元。
