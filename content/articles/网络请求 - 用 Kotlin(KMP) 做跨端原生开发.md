---
updated_at: 2024-10-27T11:31:09.698+08:00
edited_seconds: 220
tags:
  - IT/app
created_at: Mon, Jan 6, 2025 - 16:24:30
date: 2025-01-05T16:24:30.751+08:00
banner_icon: 🧙🏼‍♀️
banner: "https://cdn.jsongo.top/banners/c1e2de3d85f49231f2290e3ec17b3940.jpg"
title: 网络请求 - 用 Kotlin(KMP) 做跨端原生开发
description: 在 KMP 中使用 Ktor 库进行网络请求，封装一个通用的 HTTP 请求类来处理 JSON 序列化、token 认证等常见需求。同时介绍 Ktor 3.0 的新特性来支持 Server-Sent Events (SSE)，并结合 Kotlin 的协程和 Flow 来处理异步数据流。
slug: kmp-http-sse
draft: false
---
>  示例中用的是 Kotlin (KMP) `2.x` ，Ktor `3.x`
# 网络请求
## 基础的请求方法
用 ktor 提供的 `HttpClient` 来创建一个发请求的 handler，实例化之后，我们包一个通用的 request，定义一个通用的返回类型。  
官方文档中给了不少 [示例](https://ktor.io/docs/client-requests.html)，相对比较简单，如：
```kotlin
import io.ktor.client.request.*
import io.ktor.client.statement.*

val response: HttpResponse = client.request("https://ktor.io/") {
  // Configure request parameters exposed by HttpRequestBuilder
}
```
## 封装序列化等逻辑
不过这只能做一些相对简单场景的请求处理，如果要做 json 解析或 payload 序列化的话，还得引入 ContentNegotiation 、serializer 等，如果还需要 token 认证的话，还得加 header，下面我们一步步封装一个比较通用的请求类。  
代码如下：
```kotlin
import io.ktor.client.*  
import io.ktor.client.plugins.contentnegotiation.ContentNegotiation
import io.ktor.client.plugins.logging.*  
import io.ktor.client.request.*  
import io.ktor.client.request.forms.*  
import io.ktor.client.statement.*  
import io.ktor.http.*  
import io.ktor.serialization.kotlinx.json.*  
import kotlinx.serialization.json.Json  
import kotlinx.serialization.json.JsonObject  
import kotlinx.serialization.serializer  
  
const val BASE_URL = "https://api.xxx.com"

open class MyHttpClient(private val baseURL: String? = BASE_URL, private val token: String? = null) {  
    val jsonUtil = Json {  
        prettyPrint = true  
        isLenient = true  
        ignoreUnknownKeys = true  
        encodeDefaults = true  
        explicitNulls = false  
        coerceInputValues = true  
    }  
  
    private val client = HttpClient {  
        install(ContentNegotiation) {  
            json(jsonUtil)  
        }  
        install(Logging) {  
            logger = Logger.DEFAULT  
            level = LogLevel.INFO  
            sanitizeHeader { header -> header == HttpHeaders.Authorization }  
        } 
    }  
  
    suspend fun request(  
        method: HttpMethod,  
        path: String,  
        token: String? = null,  
        body: Any? = null,  
        options: RequestOptions? = null  
    ): HttpResponse {  
        val queryString = options?.params?.let { params ->  
            if (params.isNotEmpty()) {  
                params.entries.joinToString("&") { "${it.key}=${it.value}" }  
            } else ""  
        } ?: ""  
        val fullPath = if (path.contains("?")) {  
            "$path&$queryString"  
        } else if (queryString.isNotEmpty()) {  
            "$path?$queryString"  
        } else path  
  
        val url = (baseURL ?: BASE_URL) + fullPath  
        println("[HTTP] Request URL: $url")  
  
        return try {  
            val response = client.request(url) {  
                this.method = method  
                headers {  
                    val actualToken = token ?: this@MyHttpClient.token  
                    actualToken?.let { append(HttpHeaders.Authorization, "Bearer ${it}") }  
                    options?.headers?.forEach { (key, value) -> append(key, value) }  
                }                
                if (method != HttpMethod.Get && body != null) {  
                    when (body) {  
                        is MultiPartFormDataContent -> {  
                            contentType(ContentType.MultiPart.FormData)  
                            setBody(body)  
                        }  
                        is String -> {  
                            contentType(ContentType.Text.Plain)  
                            setBody(body)  
                        }  
                        is JsonObject -> {  
                            contentType(ContentType.Application.Json)  
                            setBody(jsonUtil.encodeToString(JsonObject.serializer(), body))  
                        }  
                        else -> {  
                            contentType(ContentType.Application.Json)  
                            setBody(body)  
                        }  
                    }  
                }  
            }  
            if (response.status != HttpStatusCode.OK) {  
                println("[HTTP] Error response: ${response.status} - ${response.bodyAsText()}")  
            }  
  
            response  
        } catch (e: Exception) {  
            println("[HTTP] Request failed: ${e.message}")  
            throw e  
        }  
    }
```
- jsonUtil 用于统一 json 的序列化和反序列化，这是 Kotlin 等语言里比较特殊的地方，不过也挺好用，可以对“序列化”这个操作做统一的设置，ignoreUnknownKeys 设置为 true，来避免 response 里遇到一些不认识的字段时出错。习惯了动态语言的同学可能不觉得这是个问题，但强类型语言，json 的序列化还是挺讲究的。
- token 可以在创建类实例的时候传入，也可以在调用具体请求方法的时候传入，灵活些。
- RequestOptions 用于带入额外的请求头，因为有些接口可能会有特殊的 header 需求。另外为了方便支持 URL 中有多个参数的场景，也可以让用户传入 params，我们把它拼接到 URL 后面。  
上方的代码里还有很多细节，不一一讲了，可以自己查文档。
## 进一步封装简洁的方法
接着我们常用的其实还是 post 或 get 等，request 本身的参数还是比较多的。所以在 request 方法下方，再添加下更具体的请求方法：
```kotlin
    suspend inline fun <reified T> get(
        path: String,
        options: RequestOptions? = null
    ): T {
        val opts = if (options?.params != null) {
            RequestOptions(
                params = options.params + options.params,
                headers = options.headers
            )
        } else options

        val response = request(HttpMethod.Get, path, null, options = opts)
        val responseText = response.bodyAsText()
        // println("[HTTP] Raw Response: $responseText")
        return jsonUtil.decodeFromString(serializer<T>(), responseText)
    }

    suspend inline fun <reified T> post(
        path: String,
        payload: Any? = null,
        options: RequestOptions? = null
    ): T {
        println("[HTTP] Posting to $path with payload $payload")
        val response = request(HttpMethod.Post, path, null, payload, options)
        val responseText = response.bodyAsText()
        // println("[HTTP] Raw Response: $responseText")
        return jsonUtil.decodeFromString(serializer<T>(), responseText)
    }

    suspend inline fun <reified T> put(
        path: String,
        payload: Any? = null,
        options: RequestOptions? = null
    ): T {
        println("[HTTP] Putting to $path with payload $payload")
        val response = request(HttpMethod.Put, path, null, payload, options)
        val responseText = response.bodyAsText()
        return jsonUtil.decodeFromString(serializer<T>(), responseText)
    }

    suspend inline fun <reified T> delete(
        path: String,
        payload: Any? = null,
        options: RequestOptions? = null
    ): T {
        println("[HTTP] Deleting from $path with payload $payload")
        val response = request(HttpMethod.Delete, path, null, payload, options)
        val responseText = response.bodyAsText()
        return jsonUtil.decodeFromString(serializer<T>(), responseText)
    }
```
- 用泛型来让用户定义想返回什么类型的结果。
- 用 jsonUtil.decodeFromString 来对结果做反序列化处理。

# 支持 SSE
在 AI 流行的时代，SSE (Server Sent Event) 成了标配。在前端 JS 等场景中，有 axios 等库做了封装，使用起来很方便，在 Kotlin 里要实现还是得费些工夫。
## 实现
幸运的是，Ktor 3.0 在 2024 年底发布的时候，原生支持 SSE 了。
- Server 端：[Server-Sent Events | Ktor Documentation](https://ktor.io/docs/server-server-sent-events.html)
- Client 端：[Server-Sent Events | Ktor Documentation](https://ktor.io/docs/client-server-sent-events.html)  
KMP Client 端接入现在变得很简单，也不需要什么特殊依赖：  
	![|500](https://cdn.jsongo.top/2025/01/035e39a399cfc90d0f6f9676a208ccaf.webp)  
扩展上文中的代码，添加一个 sse 方法：
```kotlin
    fun sse(
        path: String,
        body: Any? = null,
        options: RequestOptions? = null
    ): Flow<ServerSentEvent> = flow {
        println("[HTTP] SSE posting to $path with payload $body")
        client.sse(baseURL + path, {
            method = HttpMethod.Post
            token?.let { 
                header("Authorization", "Bearer $it")
            }
            header("Accept", "text/event-stream")
            header("Cache-Control", "no-cache")
            header("Connection", "keep-alive")
            options?.headers?.forEach { (key, value) ->
                header(key, value)
            }
            contentType(ContentType.Application.Json)
            body?.let { 
                setBody(it) 
            }
        }) {
            var shouldContinue = true
            var eventCount = 0
            val maxEvents = 500 // 最大事件数限制
            
            while (shouldContinue && eventCount < maxEvents) {
                try {
                    incoming.collect { event ->
                        if (!isActive) {
                            println("[HTTP] SSE connection is no longer active")
                            shouldContinue = false
                            return@collect
                        }
                        
                        eventCount++
                        println("[HTTP] SSE event ($eventCount/$maxEvents): $event")
                        val eventType = event.event?.let { EventType.fromValue(it) }
                        // 如果 event.event 是 EventType.ERROR，则打印 msg 然后结束
                        if (eventType == EventType.ERROR) {
                            shouldContinue = false
                            return@collect
                        }
                        emit(event)
                        if (eventType == EventType.DONE || eventType == EventType.WORKFLOW_DONE) {
                            shouldContinue = false
                            return@collect
                        }
                    }
                } catch (e: Exception) {
                    println("[HTTP] SSE connection error: ${e.message}")
                    shouldContinue = false
                    throw e
                }
            }
            
            if (eventCount >= maxEvents) {
                println("[HTTP] SSE reached maximum event limit ($maxEvents)")
                throw Exception("SSE reached maximum event limit")
            }
        }
    }
```
这里要多引入几个包：
```kotlin
import io.ktor.client.plugins.sse.sse
import io.ktor.sse.ServerSentEvent  
import kotlinx.coroutines.flow.Flow  
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.isActive
```
这个实现看起来有点复杂。几个关键点：
- `client.sse` 是官方提供的、做 SSE 请求的方法，直接就可以使用。
- `header("Accept", "text/event-stream")` 添加一个 Accept header 指定为 `text/event-stream`。
- maxEvents 设置一个最大的事件数，以免 while 在边缘的情况下进入无限的死循环。
- shouldContinue 用于控制 while 是否继续，逻辑里当发现结束标志的时候，把 shouldContinue 设置成 false。
- Flow，下面专门讲解。

## Kotlin Flow
### What's Flow
这是属于语言基础的问题，不过多展开。简单说就是在 Kotlin 中，`Flow` 是一种用于处理异步数据流的类型安全的 API。它可以用于处理像网络请求返回的数据、数据库查询结果等一系列按顺序产生的数据。`Flow` 是 "**冷流**"（Cold Stream），这意味着它只有在被收集（`collect`）的时候才会开始执行。  
SSE 的场景不正好就是“按顺序生成数据”嘛，所以自然就跟 Flow 结合了。在 JS、Python 里可能会自然的联想到 generator（`yield`），写起来很简单，如 JS 里用 for await 来消费就行。
### Incoming
代码中的 incoming 是 `client.sse` 引入的、表示 SSE 事件流数据的一个内置变量，它本身就是一个 Flow，直接拿来用即可。这是源码中的定义：
```kotlin
/**
 * A Server-sent events session.
 */
public interface SSESession : CoroutineScope {
    /**
     * An incoming server-sent events flow.
     */
    public val incoming: Flow<ServerSentEvent>
}
```
>  incoming 怎么来的： `client.sse` 是由 `serverSentEvents` 方法生成的，它返回一个 `ClientSSESession`，而 `ClientSSESession` 继承了 `SSESession`，所以 incoming 一直传到了 `client.sse` 的 scope 里。
- 当调用 `incoming.collect` 时，它会触发这个 `Flow` 开始工作，并且会将 `Flow` 发射出的每个数据项传递给 `collect` 函数内部定义的操作进行处理。Collect 参数是一个 lambda 表达式，参数就是一个 ServerSentEvent，定义如下图，遵守 SSE 的数据流协议，比较标准，没什么好说的。  
	![|500](https://cdn.jsongo.top/2025/01/f7c4b8c6b499c3c7eed20a4751139e6c.webp)
- EventType 是我们自己定义的，根据业务来定制的，开发者可以自己命令（跟服务端接口对齐好就行），大概的定义可以参考这个实现：
```kotlin
/**
 * Event types for all events (chat, workflow, etc.)
 */
@Serializable
enum class EventType(val value: String) {
    // Chat events
    CONVERSATION_CHAT_CREATED("conversation.chat.created"),
    CONVERSATION_CHAT_IN_PROGRESS("conversation.chat.in_progress"),
    CONVERSATION_CHAT_COMPLETED("conversation.chat.completed"),
    CONVERSATION_CHAT_FAILED("conversation.chat.failed"),

    // Common events
    DONE("done"),
    ERROR("error"),

    companion object {
        fun fromValue(value: String): EventType? {
            return entries.find { it.value == value }
        }
    }
}
```
其中 DONE 表示这个流已经结束了，字符串“done”是后端定的，换成其它标识也行，但不管怎么说得有这么一个结束标识，要不然就会一直卡在那等。
### 协程
Flow 的 `collect` 函数本身其实不是用于启动协程的。  
它是一个挂起函数，有点类似其它语言中的 `yield`。挂起就意味着它必须在协程的上下文中被调用（要不然主线程就被阻塞了）。  
协程是一种轻量级的线程，可以暂停和恢复，用于处理异步操作。运行一个协程有几种方式，介绍两种：  
1、runBlocking
- 我们可以在 `runBlocking` 协程构建器的上下文中可以调用 `collect`。`runBlocking` 是一个顶层协程启动器，它会阻塞当前线程，直到其内部的协程（包括调用 `collect` 的操作）完成，所以使用时，我们可以用它来包一下，让 Flow 在里面被消费。  
	- 不过 `runBlocking` 是一个顶层协程启动器，会阻塞当前线程，直到其内部的协程（包括所有子协程）执行完成。这意味着在 `runBlocking` 内部的代码执行完之前，外部的代码（如果有的话）是无法继续执行的。
- 示例：
```kotlin
fun main() {
    println("Before runBlocking")
    runBlocking {
        delay(1000)
        println("Inside runBlocking")
    }
    println("After runBlocking")
}
```
- `Before runBlocking` 会先打印，然后 `runBlocking` 内部的协程开始执行，由于 `delay` 操作暂停了协程 1 秒钟，在这期间当前线程被阻塞。当协程内部的代码执行完后，才会打印 `After runBlocking`

 2、 CoroutineScope
 - `CoroutineScope` 本身并不阻塞线程。它主要是用于定义协程的作用域，确定了协程的生命周期和上下文。协程在 `CoroutineScope` 内启动后，`CoroutineScope` 可以继续执行其他操作，不会等待协程完成。
- 改下上面的例子：
```kotlin
fun main() = runBlocking {
    println("Before CoroutineScope")
    val scope = CoroutineScope(Dispatchers.Default)
    scope.launch {
        delay(1000)
        println("Inside launched coroutine")
    }
    println("After CoroutineScope")
}
```
这次 `Before CoroutineScope` 和 `After CoroutineScope` 会先打印，然后才是 `Inside launched coroutine`。

>  **`collect` 的一些特点和注意事项**
- **顺序处理**：`collect` 会按照 `Flow` 发射数据的顺序来处理数据。如果 `Flow` 发射的数据有先后顺序，`collect` 也会按照这个顺序依次处理每个数据项。
- **挂起函数**：`collect` 是一个挂起函数，这意味着它要在协程（Coroutine）内部被调用，并且可以暂停协程的执行，直到 `Flow` 有新的数据需要处理或者 `Flow` 完成。而 `runBlocking` 是一个用于在主函数中启动协程的函数，它会阻塞当前线程，直到所有协程完成。
- **异常处理**：如果 `Flow` 在发射数据过程中出现异常，`collect` 函数可以通过合适的异常处理机制来捕获和处理这些异常。例如，可以在 `collect` 函数内部使用 `try - catch` 块来处理可能出现的异常。

## 使用 SSE
使用上肯定是直接用 collect 只不过如果要不阻塞当前的主线程，可以用上文介绍的 CoroutineScope。
```kotlin
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.collect

suspend fun startEventFlowProcessing(apiUrl: String, payload: Any, options: RequestOptions? = null) {
    val eventFlow = client.sse(apiUrl, payload, options?: RequestOptions())
    // 使用 launch 开启一个新的协程来执行收集操作
    CoroutineScope(Dispatchers.Default).launch {
        eventFlow.collect { event ->
            val chatData = sseEvent2ChatData(event)
            emit(chatData)
            // If event is "[DONE]", end
            if (chatData.event == EventType.DONE) {
                println("SSE DONE.")
                return@collect
            }
        }
    }
}
```
要阻塞，就换成 runBlocking。这里就不再补充代码示例了。
