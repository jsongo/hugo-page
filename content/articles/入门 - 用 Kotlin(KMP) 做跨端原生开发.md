---
updated_at: 2024-10-27T11:31:09.698+08:00
edited_seconds: 220
tags:
  - 互联网/app
created_at: Thu, Nov 28th, 2024 - 16:12:07
banner_icon: ⚗️
banner: "https://cdn.lyb.pub/banners/24372eee204cc869cbb56c86a09a6b4c.png"
title: 入门 - 用 Kotlin(KMP) 做跨端原生开发
description: 用 KMP 进行跨端原生开发的优势和基本原理，介绍了它在代码共享和多平台支持方面的优点，并讲解 Android 和 iOS 平台上运行和集成共享模块的具体步骤。
slug: kmp-101
date: 2024-12-27T11:31:09.698+08:00
---

Kotlin 是由 JetBrains 开发的编程语言，Google 将其作为 Android 应用开发的首选语言，并且它通过相关跨平台框架（如 Kotlin Multiplatform Platform - KMP）发展出了跨端开发的能力。

> 示例中用的是 Kotlin (KMP) `2.x` ，Ktor `3.x`

# 概述

## 跨端

用 KMP 来做跨端的好处是，它能静态编译成原生的 Android、iOS 代码，如果单独作为工程使用，性能上原生会更好；如果是作为组件供原生开发的客户端使用，也能共享代码逻辑。

- **代码共享优势**：Kotlin 在跨端开发中，主要优势在于能够共享业务逻辑代码。例如，在开发一个同时有 Android 和 iOS 版本的应用时，应用中关于数据处理（如数据加密、数据验证等）、网络请求（如 API 调用、数据解析）等业务逻辑部分的 Kotlin 代码可以在两个平台间共享，这大大减少了开发工作量。
- **支持多平台类型**：除了 Android 和 iOS，Kotlin 还可以用于后端开发（如使用 Kotlin 与 Spring Boot 结合开发服务器端应用），这样就有可能构建从后端到移动端完整的跨平台应用生态系统。

## 原理

在 KMM 框架里，Kotlin 代码会被编译为不同平台的目标代码。

- 对于 Android，Kotlin 代码可以直接编译为字节码在 Android 设备上运行（就像它在传统 Android 开发中的方式一样）。
- 对于 iOS，Kotlin 代码通过中间表示（Intermediate Representation，IR）与 iOS 原生开发环境进行交互。这个中间表示是一种抽象的代码形式，它可以与 iOS 的 Swift 或 Objective-C 代码进行互操作。  
  除了 Android，本质上，Kolit 是通过编译成能**与其它语言互操作的中间代码来实现的**。它跟 Flutter 类的框架有比较明显的区别，Flutter 最终是通过 Dart 虚拟机来抹平底层的差异，而 KMP 则是顺应各端的语言环境，编译成它们更友好的中间语言来做集成。  
  为了更好的理解，我再进一步讲下：在 iOS 应用中使用 KMP（借助 Kotlin/Native）开发的场景中，Kotlin 代码会被编译为机器码，这个过程是通过 Kotlin/Native 编译器完成的。编译后的代码会生成一个类似 XCFramework 的库文件，它可以被**链接**到 iOS 应用中。这个库文件在 iOS 应用运行时并没有一个像 Flutter 那样的单独的 “runtime” 概念。所以性能上会比 Flutter 类的框架好很多。  
  从性能上看，由于 Kotlin/Native 编译后的代码直接与 iOS 原生代码集成，性能方面基本就是原生代码的性能。没有额外的运行时解释层，使得代码执行效率较高。  
  在资源占用方面，因为不需要加载一个单独的运行时环境，相对来说对设备资源（如内存、CPU 等）的占用会少些。

## 更多资料

官网提供了比较详细的指引，可以参考这里： [Create your first cross-platform app | Kotlin Multiplatform Development Documentation](https://www.jetbrains.com/help/kotlin-multiplatform-dev/multiplatform-create-first-app.html#examine-the-project-structure)。  
本文简单地介绍它在跨端开发上体验。

> 背景：尝试 KMP 框架，主要是因为在做一个 SDK 的客户端版本时，需要开发 iOS 和 Android 版本，大概看了下当前的趋势和性能、认可度等方面，综合判断选择了这个框架。

# 跑起第一个 KMP 应用

官方指定用 Android Studio，可以从这里 [下载 Android Studio 和应用工具 ](https://developer.android.com/studio)。默认是内置了 Gradle 来做编译，包含跨端的代码编译。

## 生成项目及初始代码介绍

官方给了一个工具用于生成初始化的项目代码：https://kmp.jetbrains.com/，在这上面配置下应用相关的信息即可。一般只需要 Android 和 iOS 两个端即可：  
 ![|500](https://cdn.lyb.pub/2025/01/076751605e49d1210f34130cb80ed50e.webp)  
下载到本地，然后用 Android Studio 导入。  
 ![|700](https://cdn.lyb.pub/2025/01/40711a8957ede4718b786f891b2ffe9d.webp)  
代码主要包含 3 个部分：

- **Shared**，共享的部分。它是跨端的逻辑代码存放的地方，主要有 `androidMain` 、`commonMain` 和  `iosMain`，最终编译成 Android Library 和 iOS framework 供两端集成。  
  ![](https://cdn.lyb.pub/2025/01/90a4b3199a161461a2964e7e36b47089.webp)
- **ComposeApp**，是一个完整的 Kotlin 模块，它可以通过 Gradle 直接编译成 Android 应用，它里面也包含了 Shared module，Android 应用编译时可以引用这部分共用的模块。
- **IosApp**，则是一个 Xcode 项目，用于编译成 iOS 应用。

## 写一个 Shared module（CommonMain）

依赖是写 KMP 应用会遇到的第一个比较麻烦的问题，不过大都能从 [这个文档](https://ktor.io/docs/welcome.html) 中找到，可能需要点耐心。  
写到 CommonMain/ 目录里的代码，如果包含了平台专有的 API，IDE 会给 Warning 提醒，交互比较友好。  
 ![|700](https://cdn.lyb.pub/2025/01/6556d2995f4234f406c6bb50c4131d0b.webp)  
把 import 部分改成 `kotlin.random.Random` 就没报错了（Random 类写法去掉括号）。  
接下去点击图中 Top bar 里的运行按钮就可以跑起来了，它会出现 Android 一虚拟机，在上面运行你的代码。  
 ![|300](https://cdn.lyb.pub/2025/01/345f016c58696f3658be24fd2a43d104.webp)

## 自定义

跑通了基础的流程，我们接下去的工作就简单了，创建一个 kt 文件，写好逻辑即可。  
比如我想写一个通用的 HTTP 请求的模块，需要先安装一些依赖，具体可以参考 [这里](https://ktor.io/docs/client-dependencies.html#repositories)。打开 `composeApp/build.gradle.kts`，添加下几个依赖：  
 ![|500](https://cdn.lyb.pub/2025/01/798b355d1da19bded2025aff5dbafa7e.webp)

### 依赖分析

1、plugins

```kotlin
plugins {
    alias(libs.plugins.kotlinMultiplatform)
    alias(libs.plugins.androidApplication)
    alias(libs.plugins.composeMultiplatform)
    alias(libs.plugins.composeCompiler)
    // my plugins
    kotlin("plugin.serialization") version "2.0.0"
}
```

安装完之后，点击 Sync Now，让它安装依赖。  
 ![|500](https://cdn.lyb.pub/2025/01/8994d10bce0c602a2960336c04975a04.webp)  
怎么处理不同环境的差异，可以参考这里：[# Manage Project Environment in Kotlin Multiplatform Mobile](https://medium.com/@uwaisalqadri/manage-project-environment-in-kotlin-multiplatform-mobile-528847c3bfc5)

## IOS

要跑在 iOS 上还需要一些跨端的配置。

### Kotlin 共用模块编译

我们在 composeApp 里面写了不少跨端用的代码，在 `iosApp/` 这个目录下是没有相关东西的，需要有一个编译的过程，把这些代码编译成 Xcode 能识别并处理的 iOS 代码（swift）。  
有两种方法来配置编译脚本，具体可以参考这里：[Make your Android application work on iOS](https://www.jetbrains.com/help/kotlin-multiplatform-dev/multiplatform-integrate-in-existing-app.html#connect-the-framework-to-your-ios-project) ，下面简单讲解下：  
1、一是手动  
 ![|700](https://cdn.lyb.pub/2025/01/720c1908479bfd532143a11319c339a4.webp)

- 双击项目名，然后进入 `Build Phases` Tab，点加号，添加一个 `Run Script`，添加：

```bash
cd "$SRCROOT/.."
./gradlew :composeApp:embedAndSignAppleFrameworkForXcode
```

- 然后把顺序拖到上面这里：  
  ![|700](https://cdn.lyb.pub/2025/01/ea53970b00a8070dd98d9afc061f4187.webp)
- 不过，JDK 11 从 11.0.3 开始商用收费，如果在内部业务使用也要购买许可证：  
  ![|600](https://cdn.lyb.pub/2025/01/0a8e90a2af180b831f72a183de9c9203.webp)  
  所以还是得用 OpenJDK，我试了下，是兼容的。安装可以看这里：[[JDK 怎么安装]]。
- 另外也要设置下 sandboxing  
   ![|700](https://cdn.lyb.pub/2025/01/df8e47732e837d1448d5c38676d61d8c.webp)  
  2、用插件  
   ![|700](https://cdn.lyb.pub/2025/01/cf83f28ecdf0cd79fa2428b7fe2fe7c5.webp)
- 安装完之后，其它就自动帮你设置了一个 Build Script 在上文提到的 `Build Phases` 里：  
   ![|700](https://cdn.lyb.pub/2025/01/888bf5edebab276ef39aad2b4333d580.webp) - 这里选择的那两行是我加的，因为运行时它找不到 JDK，如果你也遇到这个问题也可以这么解决。  
  配置好后，可以点击 Xcode 右上角的编译按钮触发一次编译，我第一次试，编译了近 2 分钟：  
   ![|700](https://cdn.lyb.pub/2025/01/7c99ac5c4b0ae67a218530c73582ac60.webp)

### 使用公共模块

很简单，把 `ComposeApp` 引入就行，这样里面我们写的方法就都可以用了。  
 ![|700](https://cdn.lyb.pub/2025/01/c4ab964094083a97810d18b06dc0508e.webp)

# 参考

- [Share more logic between iOS and Android | Kotlin Multiplatform Development Documentation](https://www.jetbrains.com/help/kotlin-multiplatform-dev/multiplatform-upgrade-app.html#create-api-requests)
