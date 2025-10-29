---
updated_at: 2024-10-27T11:31:09.698+08:00
edited_seconds: 220
tags:
  - AI/AI工具/cursor
created_at: Wed, Dec 25, 2024 - 21:16:20
date: 2024-12-25T21:16:20.480+08:00
banner_icon: ⛓️‍💥
banner: "https://cdn.ethanlyn.com/banners/a7f752e124242dcebca6f80af1173db0.jpeg"
description: 使用 Cursor 工具在开发未知语言代码时的体验和步骤。Cursor 可以帮助开发者将思路和逻辑翻译成代码，即使不熟悉特定语言的语法，也能通过它实现功能。
title: 用 Cursor 开发未知语言代码
slug: coding-with-cursor
draft: false
---
# 概述
## 一句话总结
Cursor 对于研发来说，是一个非常有用的提效工具。一句话来总结 Cursor 就是：
> [!Tip] 提示  
>语言、语法不再重要，Cursor 可以把思路和逻辑很好的翻译成代码，但开发者的还是要设计好整个项目的研发框架和方案，然后指挥工具干活。

开发 KMP 跨端框架的代码，开始时我不懂它的 Kotlin 语法；开发完之后，我依然还不懂怎么写 Kotlin，但不影响我实现相关的功能。
## 感受
cursor 有点像 code review 的交互：  
![001aadc69264ca248e71eeee340a33ff_MD5|0](https://cdn.ethanlyn.com/2025/01/4673799a9001151d68a5ceb7f9de9d51.webp)  
开发时的感受也确实像 Code Review，只不过多了一个“yes or no”的选择操作。认可这个修改点它旁边的 Accept 按钮，觉得不对，就 “Reject”。
## 本文 Case 说明
本文中，我们以 Coze OpenAPI 的 SDK 开发为例，目前（2024.12） 已经有 JS、Python、Java 版的 SDK 了，不过还是有用户提了其它语言的诉求，我们只有前后端，所以这时 Cursor 成了我们开发多种语言版本的 SDK 的有力助手。  
不过不管是什么语言，第一件事，都是先搭环境，把最简单的该语言 Hello World 跑起来。对习惯 JS/Go/Python 的同学来说，可能觉得这不是个问题，但当你遇到 Java、Kotlin、Android、iOS 等这些语言时，准备环境经常是一个很麻烦的事。
> 小建议：  
  如果遇到了一些新框架的话，还得跟着 Quick Start 跑一下，不要着急、上来就想要结果。  
  在 KMP 的项目中，这一点让我感触颇深。开始花了挺多时间踩坑，后来发现其实 Quick Start 里都有，KMP 前些天刚升级 3.0 之后，很多玩法都不一样了，网上的很多代码都跑不起来（Cursor 生成的代码还都基于老的框架写，训练数据就是这样），折腾半天没结果，第二天发现，还不如抽几分钟把 Quick Start 跑一下，问题全解了。

## Cursor Agent (Composer)
Cursor 刚出的 agent 比之前简单的 Chat 强不少。之前的 Chat 它记不住太远的上下文，多问几轮，最开始的问题它会重复地犯错。  
简单的讲：
- Cursor Chat：帮助开发者理解代码片段、提供代码优化建议、协助查找代码错误或者回答关于特定编程语言和框架的一般性问题；
- Cursor Agent：更全面，首先可以让 Agent 读取整个项目文件，快速掌握项目的主要功能和关键文件，也能同时操作多个文件，根据需要增删改，甚至还能对整个项目做分析，帮你优化项目结构等。  
下面例子中 大都基于 Composer 来实现的。下图是一个简单的例子：  
![1145cf430e1f015e5a552747f0f4a7c7_MD5|500](https://cdn.ethanlyn.com/2025/01/4eda348bfcc4a6e8a603326467a6840f.webp)

# Cursor 基于代码生成代码的基本步骤
![](https://cdn.ethanlyn.com/2025/01/c9e05dbfde43c7dbb0f8f24909166b6c.webp)
## **1、先把相应的目录结构建好**
因为不同的语言，代码组织的习惯和方式都不太一样。要做的第二件事，是先把代码结构先想清楚，然后发给 AI 问下比较合理的结构是什么样。  
![011aee5c56b4b53497b5d789c0fbeffb_MD5|500](https://cdn.ethanlyn.com/2025/01/0469fa103c6ebb26a2747e1491292465.webp)  
![4ed11244d635908bdf3aaffee68c1db6_MD5|400](https://cdn.ethanlyn.com/2025/01/0f0fef12795483bddb7e3d4bf5ffa74e.webp) ![56695bc97506c77d525a8b7a30786162_MD5|250](https://cdn.ethanlyn.com/2025/01/71d3277a1c9450424f1175f05714cbd9.webp)  
![3562669265f694cc8e5a37537570e387_MD5|600](https://cdn.ethanlyn.com/2025/01/34125f9d5d186efc995f3f421e8ea716.webp)  
最后我调整了下，改成上文最后那张图。
## **2、实现第一个 Demo**
在我们的例子中，首先要解决的是不同语言里的请求方法不一样，先选一个最简单的请求来跑通流程。  
把 js 里的请求代码找出来，帮 cursor 圈出来（加到上下文里），然后让它实现一个 Kotlin 的请求。
> 当时让 Cursor 改了好几版都不能用，主要问题还是在于 KMP 这东西比较新，3.0 又做了大改，引用的包得去做下排列组合。后来在官方文档里找到了 3.0 的正确姿势发请求，把它丢给 Cursor，这时它才写出了正确的请求。  
然后找到最基础的模块，比如本例中我选了 Chat 相关的接口，跑通非 Stream 模式比较简单，所以作为第一个接入。实现后，再研究了下 Kotlin 里怎么实现 SSE（这个 cursor 死活写不出正确的来），也跑通之后，一个模块算是比较完整了。
## **3、把这套模块复制到其它模块中**
第二个模块选择了 **Auth** **模块**，用它来验证第一个模块用到的通用方法是否可迁移。  
首先是让 Cursor 把**请求模块的代码**抽出来，做成一个通用的请求基类，其它模块继承它就行。把这个思路告诉 Cursor，让它改好后，进入下一步：把 JS 的 auth.ts 代码加入到 Context 中，在相应的目录下新建一个 Auth.kt 的 kotlin 模块，告诉 Cursor <mark style="background: #FFB86CA6;">把 auth 的逻辑从 ts 翻译成 kotlin</mark>。  
写完后，再在 Demo 文件夹里创建一个 Auth 的 **Demo 文件**，让 Cursor 仿照 Chat 的 Demo 把 Auth 里的方法都用起来、去生成一个 Auth Demo。这步也做完后，进入第四步。  
到 App 界面中去添加按钮，绑定 Demo，去触发它的方法，验证刚的代码是否可行。  
这一步是最费时间的，因为第一版基本都不行，到处有问题，需要不断的试、不断的 fix bug。好在这些操作也可以让 Cursor 来做。
## **4、都开发完之后，发包、写文档、开源……**
这个就不展开了，不是重点，不同语言也不一样，讲这个意义不大。

# 完整例子
**让** **Cursor** **帮我写** **Auth** **模块的代码**。  
背景：我把 Coze API SDK 代码从 JS 迁移到 Kotlin，里面有很多个模块。之前已经实现了 Chat 模块的 API，这次实现 Auth 模块。代码也是不少、而且有点分散。
## 初步生成
找到主入口文件，这个例子中，是 `auth.ts` ，我把它加入到 Context 里。另外我自己也创建了一个文件在特定的目录里，把它也加到 Context 里（Kotlin 的代码结构组织跟 JS 还是有比较大的区别，下面再讲），这个文件让 Cursor 创建也行，只不过我还得给他描述路径/位置，还不如直接点“+”就创建了。  
![600b7d39aa5a96c84d23b1409c0e1eac_MD5|0](https://cdn.ethanlyn.com/2025/01/1b108415bafc10678d91c7888802cb53.webp)  
其中 auth.ts 只是一个入口文件，它涉及到很多相关的类和函数等，定义在其它文件，所以我在 prompt 里告诉它要把相关的定义都搬过去。  
![414f29730ce41fba0d1bbc12407f4a87_MD5|0](https://cdn.ethanlyn.com/2025/01/86f176619ca75c5a4777eac559dfdf55.webp)  
一下子写了 361 行，里面涉及到很多个方法都需要一个个验证，这个后面说。截图中可以看到，它还问我们要不要把一些相关的函数搬过来，让它继续。然后又给我搬了几百行过来，之后发现有一些依赖库缺失，所以问我是否要加到 gradle 配置里：  
![571c38e14c2b4c8c21c66b5194d2c0a1_MD5|600](https://cdn.ethanlyn.com/2025/01/83a947616392ee8d6a6dffb361e7b387.webp)

## 解决小问题
在上面这个地方就遇到了问题，它认为我其它文件里的逻辑可能没有用，直接大段大段地删除我原本的代码，如 Http.kt，`auth.ts` 里用到了一个封装过的 HTTP 请求，所以在引入的时候，它找到我原来的 HTTP 请求的封装直接改了它。  
![205dc1e6d24d761c009260ac8cae8bb2_MD5|800](https://cdn.ethanlyn.com/2025/01/09954d7c01331cac66d6c52fd36252b6.webp)  
这种事要能多盯着点、注意下可能的问题，及时补救，引导 Cursor 去修正。  
一些小问题，在采用它的代码时，稍微留意下：  
![b240a1222ec78b5b5382fdbbf75ea0e2_MD5|800](https://cdn.ethanlyn.com/2025/01/3ae3a5bf297f7eda62ed740f33c619f4.webp)  
再比如这种写法一看就感觉有点问题：  
![1116262183daa190d5cb3cc88895d884_MD5|800](https://cdn.ethanlyn.com/2025/01/568a319a389daad0a61def5e22073059.webp)  
追问下，它就会纠正过来了：  
![74847ffb18466f90a2d6c6ee88d114ac_MD5|800](https://cdn.ethanlyn.com/2025/01/58c18e5e8bf2848a5561f5dd99d07c71.webp)  
另一个比较大块的问题是，它生成完可能是有一些包引入问题的，因为它只有局部信息，缺少全局的，会犯像重复定义这样的错。而且可能有一堆 import 问题等着你解决，比如下面这个例子：  
![49ec0378de615efc9371ecab36f0c033_MD5|700](https://cdn.ethanlyn.com/2025/01/1ea57a695273330b3ed5dd5661554b66.webp) ![aa7d0534cf5f6fc17177f5c45d157e25_MD5|700](https://cdn.ethanlyn.com/2025/01/d69d33cc46da8ae71cff9d95535d1e7a.webp)

**重复定义**。  
左边这个截图里的 RequestOptions，其实我已经在其它地方定义过了，但它又重新定义了一次，造成了多个地方冲突。这种情况也可以把问题描述给 Cursor 让它解决，但我看问题不大直接就手动合并了下这两个定义。  
右边的截图中，跨端涉及到 Android 的包安装，开发过 Java 的同学都知道，这个有点麻烦，得找到合适的包添加到 library 里才行。这个也只能手动去做，因为过程有点麻烦：
> 另外，两个截图都是 Android Studio 里的，在 Cursor 上是没有报相关的异常，而前者是专门为开发 KMP 定制的 IDE，它能找到更深层次的异常。所以我开两个 IDE，一个写代码，一个改 Bug。

## 对接
经过一系列操作，终于能正常跑起来了，但只能说**写完了**。接下去是更麻烦的事情，我们调试 JWT Auth，在 Android 里 Cursor 建议用 `com.auth0.jwt` 这个包，代码它也帮写好了，但运行时，接口一直返回签名错误，接下来就要一个字段一个字段的比对。  
这里难免就要去打印过程中的每个数据，比如加密的 Payload、几个 key、algorithm、timestamp 等，用 JS 也跑一个、**打印出来，做下对比**，看哪个字段有问题。  
改完后，还是签名错误。参数对了，但还是不行，那就是算法问题，接下去核对了下 Base64 encode 的地方、RSA 算出的数据跟 JS 的跑出来是否一致。这里发现了问题，但没有头绪。  
这时，死马当活马医，让 cursor 再帮我检查一遍：  
![037c1ba6aa4295b45bc15c1a7a930e5d_MD5|800](https://cdn.ethanlyn.com/2025/01/85a79b192ec91ca09d2fa5c60f3a996e.webp) ![1512af0b52ab204e684d567bc9c2b510_MD5|700](https://cdn.ethanlyn.com/2025/01/307e4e2a0ab807513480c86855068e19.webp)  
看起来似乎是喂给算法的数据格式有问题（虽然数据都是对的），Cursor 实现了一个 toMap 的方法对原来的代码做了个转化，但这次代码跑不起来，重新让它改了一版，这下居然拿到正确的返回了。  
![ca3cf6410c6eafc5a7566ed550156a83_MD5|700](https://cdn.ethanlyn.com/2025/01/4ae11c7b01875dd3c0fab873498c6b90.webp)  
返回解析失败，序列化的问题，不过是小问题，让它改完后，这次真的拿到了：  
![bace8e15ef5ddc1d884a2b7da0919947_MD5|800](https://cdn.ethanlyn.com/2025/01/cd181081d32b5a238a808949013c280e.webp)  
就这个过程，搞了一个多小时。
> 所以其实 Cursor 更像是一个帮程序员写简单代码、改 Bug 的一个辅助工具，在我们这个场景中，不太可能一次性把所有的代码从 TS 转过来，然后一次性成功。都得一个个调试。

# 还能做什么
过程中发现，还有一些事情可以交给 Cursor，能解决的很好。
## 1、整理代码，变得更整洁些
有一招简单的小技巧，可以让 Cursor 帮你整理下代码（至少看起来不像刚入门的人写的水平）：  
![3c5dbaed0244273f9faac47623a5c284_MD5|700](https://cdn.ethanlyn.com/2025/01/ed005e1d1081f932d31c31ae426b6f24.webp)  
以及：  
![64f0e1e71796b58da1d0939017c89c96_MD5|700](https://cdn.ethanlyn.com/2025/01/d72c40dd0185031bddc7b1ca07d1ecdf.webp)  
Prompt:
```text
把代码改得极其整洁，风格保持一致，能简化的处理下，但同一行不要太多字符。注释的话，不合理的注释可以删掉，但也不要随便删，同时把中文的注释翻译成英文
```

## 2、解决拼写问题
比如这个 README，我们研发同学写的比较匆忙，有比较多的拼写或表达上的问题，https://github.com/coze-dev/coze-java/pull/3/files ，用 cursor 一键完成修改，重点是它能发现 README 里的示例代码中，用的字段名不正确的问题：  
![67eef2544216d5bc05746b5e1f26b2b5_MD5|800](https://cdn.ethanlyn.com/2025/01/a2a57432caf6934023aca6188eb999b2.webp) ![09bbb3747c1a278eef3f672f204c3f79_MD5|700](https://cdn.ethanlyn.com/2025/01/90d987a8fead9f2db45c1afd91824e58.webp)  
![41011b38b591252aea92768c14e304c2_MD5|700](https://cdn.ethanlyn.com/2025/01/55496ca31ffb05f169c550e905810115.webp)

## 3、批量修改小问题
遇到问题比较多的时候，直接截图，丢给 cursor，它会一个个帮你改。  
![f77a083c5ee957658f80d19e5582c6f1_MD5|500](https://cdn.ethanlyn.com/2025/01/ae4af222ea296426b04ddd084b1ddfd0.webp) ![4afb655c9393f474cadb8c0f6f4241b5_MD5|500](https://cdn.ethanlyn.com/2025/01/2b61dce38f2bd6f806ffc42af1da764b.webp)  
还有一个技巧是，让它参考其它同类的代码来实现：  
![|500](https://cdn.ethanlyn.com/2025/01/406acbce7072a3e2cadf3a5c6ebe34da.webp)  
以及：  
![|500](https://cdn.ethanlyn.com/2025/01/8e6d7d1522cd199bba69fd23f96b799d.webp)

还有一次给我引入了 java 包，在 common 里：  
![|700](https://cdn.ethanlyn.com/2025/01/3c13e95894243029f6d9878688fa5b47.webp)  
不太合理，这时就要让他修正下，同时我也丢给它一个 KMP 官方给的参考，让它照着改，这总不会再弄错吧。  
![|600](https://cdn.ethanlyn.com/2025/01/a4a4c7a782729d0a708fbd710c1dd048.webp)

> 下面的例子，是我开发另一个 Coze 插件时遇到的，顺便都整合到这个文档里、不单独拆开了。
## 4、强有力的工具：logging
![05b5da00f57db097cdb439b39e55cfdb_MD5|500](https://cdn.ethanlyn.com/2025/01/efb2c1134ac77e7c50e5248f01c62265.webp)  
我连续让它改了很多次（不下 10 次），它也换了好几种实现方法，都不行。后来我提示他是否需要再加一些打印来定位问题，然后他发现确实应该这样。  
![35c347109c19e7421b89c2ff4a705ed0_MD5|500](https://cdn.ethanlyn.com/2025/01/53f82d55f491285c2ee9132dd69636db.webp)  
![accbaf51486af45cdbec970b93dbeb8e_MD5|500](https://cdn.ethanlyn.com/2025/01/f18aa994a02b7255bed74408f76f80fc.webp)
> 语气也变得更客气，本来一直说“我”，这次改了称呼“我们”，仿佛在说这是我们的共同成果
- 用这个技巧可以极大的提升问题修复的速度。当然如果你的代码都是在 cursor 里跑的、输出也在它的 terminal 里，那会更方便一些。我的场景是，代码在 serverless runtime 里运行，本地只是为了让 cursor 来改代码。

## 5、思考并引导
有的时候，Cursor 掉坑里去了，试了一二十次了，都不太行。后来我想到一个重要的信息，给他补充了下，结果不到 5 次就跑起来了，方向对了。  
![9a7218f4b8ab4400b9a059cca2dfbea6_MD5|500](https://cdn.ethanlyn.com/2025/01/be8fdee4ad64d56b435aab0e2ceb9ac4.webp)
> 这从里来看，Cursor 并不能让完全不懂代码的人来写出各种复杂的逻辑，甚至一些看似简单、但潜藏着很多细节的功能，他们也很难很难搞定。**所以广大程序员，暂时还能松一口气**。
## 6、及时给反馈，有时能有些惊喜
![4c72cba33e74267f72c6e802ba14b6ff_MD5|500](https://cdn.ethanlyn.com/2025/01/964e3bd7d40baea9275703a22dba7fb4.webp)  
然后 blabla 跟我说了一堆，它会把之前几次尝试为什么没成功、这次为什么成功了，给你做个总结。很有意思。

# 过程记录
## KMP SSE 遇到的一些坑
1、SSE 以前是用外部库，到了 3.0 之后，官方原生支持了，其它方案试了下没通。  
2、iOS 跑 SSE 会抛错：
```SQL
Uncaught Kotlin exception: io.ktor.client.plugins.sse.SSEClientException: Exception in http request: Error Domain=NSURLErrorDomain Code=-1200 "An SSL error has occurred and a secure connection to the server cannot be made."
```
跟豆包“交流”了几回后，她终于找到问题点了，我改了下配置果然就可以了：  
https://www.doubao.com/thread/w18b43c12a58af46c  
简单说就是打开 Info.plist 添加：
```XML
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoads</key>
    <true/>
    <key>NSExceptionDomains</key>
    <dict>
        <key>api.coze.com</key>
        <dict>
            <key>NSExceptionAllowsInsecureHTTPSLoads</key>
            <true/>
            <key>NSExceptionMinimumTLSVersion</key>
            <string>TLSv1.2</string>
            <key>NSExceptionRequiresForwardSecrecy</key>
            <false/>
        </dict>
    </dict>
</dict>
```
原因主要是：iOS 系统默认信任一系列常见的证书颁发机构（CA）所颁发的证书，但如果服务器使用的是比较小众或者自签名的证书，iOS 设备可能不会自动信任它。上面把 `NSExceptionAllowsInsecureHTTPSLoads` => true，`NSExceptionRequiresForwardSecrecy` => false。
## 语言框架带来的麻烦
开发 KMP 比较麻烦的点是，它动不动就炸💥💥💥：  
![bf7c2bde8023209700897ad92f5412cd_MD5|800](https://cdn.ethanlyn.com/2025/01/75eb7e325f7128c528fbfb128db05263.webp)  
Git diff 看不到任何区别，后来查了下，是环境上的包冲突，一不小心装了版本冲突的包就会出问题。版本的匹配关系还有人专门做了个表：https://github.com/realm/realm-kotlin#version-compatibility-matrix 但还是不全，真遇到了问题还是得多试，没啥技术含量。  
![e3c399703cd2afa57208ac3c424603f2_MD5|500](https://cdn.ethanlyn.com/2025/01/191bc2fd51984c29da43d5c355562e7b.webp)  
上面这个异常，试了很久都没解决（可能是我对 Kotlin 环境不熟悉），后来干脆重建一个目录，把代码原样的 clone 过去，再重新用 Android Studio 加载、编译，居然就好了…… 不知道 Java 类语言的开发者，平时要花多少时间在环境和包依赖上，这些纯属无产出的事情。
