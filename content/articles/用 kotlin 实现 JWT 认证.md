---
updated_at: 2024-10-27T11:31:09.698+08:00
edited_seconds: 220
tags:
  - 互联网/app
created_at: Mon, Jan 6, 2025 - 22:21:06
date: 2025-01-06T22:21:06.393+08:00
banner_icon: 🧑🏻‍🤝‍🧑🏻
banner: https://cdn.ethanlyn.com/banners/3f4ffe39bbfde173de3bf6ee638fda5b.jpg
slug: kotlin-jwt
title: 用 kotlin 实现 JWT 认证
description: 如何在 Kotlin 中实现 JWT 认证，如在 Android 应用中通过私钥证书与服务端交换 JWT 令牌来获取 OAuth 令牌。另外也分析下在应用中内置私钥的安全风险，并提供了一些安全建议
draft: false
---
# 概述
## 环境
Android 环境上，内置（或拉取）私钥证书后，**向服务端请求交换 JWT token，获取 OAuth token**。
## 场景
- **企业内部应用集成**：在企业级的 Android 应用中，当应用需要与企业内部的多个服务（如企业资源规划系统 ERP、客户关系管理系统 CRM 等）进行深度集成时，可能会内置私钥证书。这些服务通常都有严格的身份验证要求，应用需要通过私钥证书向认证服务器请求交换 JWT（JSON Web Token）令牌，进而获取 OAuth（Open Authorization）令牌来访问受保护的资源。例如，企业内部的移动办公应用，员工需要使用该应用访问企业内部的文档管理系统和工作流系统，应用就会通过这种方式获取访问权限。
- **金融服务应用**：在银行或者金融机构的移动应用中，为了确保用户资金交易等敏感操作的安全性，应用可能会预先安装经过严格安全认证的私钥证书。在用户登录或者进行特定高风险操作（如转账、理财购买等）时，应用通过内置的私钥证书向服务端请求交换 JWT 令牌，然后获取 OAuth 令牌，以此来验证用户身份并且授权后续的操作。这种方式可以确保只有合法的、经过认证的应用才能与服务端进行安全的交互。

# 代码实现
## 实现核心逻辑 getJWTToken
这里拿 [Coze 的 JWT 接口](https://www.coze.com/docs/developer_guides/oauth_jwt) 来写例子，这个意义可能不大（Coze 的 JWT 私钥不太建议放到 App 中），主要是为了演示接口的调用，让代码可以跑通。  
下面是完整代码（可以直接 copy 运行）。
```kotlin
import kotlinx.datetime.Clock
import io.ktor.client.statement.bodyAsText
import io.ktor.http.HttpMethod
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put
import kotlinx.serialization.serializer
import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import java.security.KeyFactory
import java.security.interfaces.RSAPrivateKey
import java.security.spec.PKCS8EncodedKeySpec
import java.util.Base64

object JWTService {
    suspend fun getJWTToken(
        config: JWTTokenConfig,
        options: RequestOptions? = null
    ): JWTToken {
        // Trim private key and validate format
        val trimmedPrivateKey = config.privateKey.trim()
        val keyFormat = when {
            trimmedPrivateKey.contains("BEGIN RSA PRIVATE KEY") -> "RSA"
            trimmedPrivateKey.contains("BEGIN PRIVATE KEY") -> "PKCS8"
            else -> null
        }

        if (keyFormat == null) {
            throw Exception(
                "Invalid private key format. Expected PEM format (RSA or PKCS8)"
            )
        }

        // 准备JWT payload
        val now = Clock.System.now().epochSeconds
        val jwtPayload = buildJsonObject {
            put("iss", config.appId)
            put("aud", config.aud)
            put("iat", now)
            put("exp", now + 3600) // 1小时
            put("jti", now.toString(16))
            if (config.sessionName != null) {
                put("session_name", config.sessionName)
            }
        }

        // 将JsonObject转换为Map
        val jwtPayloadMap = jwtPayload.toMap()

        // 使用JWT provider签名获取token
        val token = sign(
            payload = jwtPayloadMap,
            privateKey = trimmedPrivateKey,
            algorithm = config.algorithm ?: "RS256",
            keyid = config.keyId
        )

        // 交换JWT token获取OAuth token
        val tokenConfig = buildMap<String, Any> {
            put("token", token)
            config.baseURL?.let { put("baseURL", it) }
            put("durationSeconds", config.durationSeconds ?: 900)
            config.scope?.let { put("scope", it) }
        }

        return doGetJWTToken(tokenConfig, options)
    }

    private suspend fun doGetJWTToken(
        config: Map<String, Any>,
        options: RequestOptions? = null
    ): JWTToken {
        val api = APIClient(token = config["token"] as String, baseURL = config["baseURL"] as? String)

        val payload = buildJsonObject {
            put("grant_type", "urn:ietf:params:oauth:grant-type:jwt-bearer")
            put("duration_seconds", (config["durationSeconds"] as? Int ?: 900).toInt())
            if (config["scope"] != null) {
                put("scope", config["scope"].toString())
            }
        }

        val jsonPayload = Json.encodeToString(JsonObject.serializer(), payload)

        val response = api.request(HttpMethod.Post, "/api/permission/oauth2/token", config["token"] as String, payload, options)
        return Json.decodeFromString(serializer<JWTToken>(), response.bodyAsText())
    }

	// 对 json 里的内容做下处理，方便未来扩展
    private fun JsonObject.toMap(): Map<String, Any> {
        return entries.associate { (key, element) ->
            key to when (element) {
                is kotlinx.serialization.json.JsonPrimitive -> {
                    when {
                        element.isString -> element.content
                        element.content.toLongOrNull() != null -> element.content.toLong()
                        element.content.toDoubleOrNull() != null -> element.content.toDouble()
                        element.content == "true" -> true
                        element.content == "false" -> false
                        else -> element.content
                    }
                }
                else -> element.toString()
            }
        }
    }

    private fun sign(
        payload: Map<String, Any>,
        privateKey: String,
        algorithm: String,
        keyid: String
    ): String {
        val cleanKey = privateKey
            .replace("-----BEGIN PRIVATE KEY-----", "")
            .replace("-----END PRIVATE KEY-----", "")
            .replace("-----BEGIN RSA PRIVATE KEY-----", "")
            .replace("-----END RSA PRIVATE KEY-----", "")
            .replace("\n", "")
            .trim()
        println("JWT sign - 私钥清理完成")

        val keyBytes = Base64.getDecoder().decode(cleanKey) // requires API level 26
        println("JWT sign - 私钥解码完成，${keyBytes}")
        val keySpec = PKCS8EncodedKeySpec(keyBytes)
        val keyFactory = KeyFactory.getInstance("RSA")
        val privateKeyObj = keyFactory.generatePrivate(keySpec) as RSAPrivateKey
        
        val alg = Algorithm.RSA256(null, privateKeyObj)
        println("JWT sign - 私钥引用创建完成，${alg}")
        
        return JWT.create()
            .withKeyId(keyid)
            .apply {
                payload.forEach { (key, value) ->
                    when (value) {
                        is String -> withClaim(key, value)
                        is Int -> withClaim(key, value)
                        is Long -> withClaim(key, value)
                        is Double -> withClaim(key, value)
                        is Boolean -> withClaim(key, value)
                    }
                }
            }
            .sign(alg)
    }
}

@Serializable
data class JWTToken(
    @SerialName("access_token")
    val accessToken: String,
    @SerialName("token_type")
    val tokenType: String,
    @SerialName("expires_in")
    val expiresIn: Long
)
@Serializable
data class JWTTokenConfig(
    val appId: String,
    val privateKey: String,
    val aud: String = "api.coze.com", // 这里可以换成自己的 AUD
    val algorithm: String? = "RS256",
    val keyId: String,
    val sessionName: String? = null,
    val baseURL: String? = null,
    val durationSeconds: Int? = 900,
    val scope: String? = null
)
```
## TokenManager 让 Token 能复用
另外还可以再实现一个 TokenManager 来做一个单例，管理最终 Token 的获取。
```kotlin
import kotlinx.datetime.Clock  
  
object TokenManager {  
    private var _token: String? = null  
    private var tokenExpireTime: Long = 0  
  
    suspend fun getTokenAsync(forceRefresh: Boolean = false): String {  
        val now = Clock.System.now().epochSeconds  
  
        // 如果token不存在或已过期（提前30秒认为过期），重新获取  
        if (_token == null || now >= tokenExpireTime - 30 || forceRefresh) {  
            val (token, expireIn) = generateToken()  
            _token = token  
            // 根据返回的过期时间设置  
            tokenExpireTime = now + expireIn  
        }  
        return _token ?: throw IllegalStateException("Token not available")  
    }  
  
    private suspend fun generateToken(): Pair<String, Long> {  
        try {  
            val config = JWTTokenConfig(  
                appId = GetApiConfig.APP_ID,  
                aud = GetApiConfig.AUD,  
                keyId = GetApiConfig.KEY_ID,  
                privateKey = GetApiConfig.PRIVATE_KEY  
                    .trimIndent()  
                    .lines()  
                    .joinToString("\n")  
                    .trim()  
            )  
            val jwtRsp = JWTService.getJWTToken(config)  
            val token = jwtRsp.accessToken  
            if (token.isEmpty()) {  
                throw IllegalStateException("Received empty access token from server")  
            }  
            // 返回token和过期时间  
            return Pair(token, jwtRsp.expiresIn ?: 900L)  
        } catch (e: Exception) {  
            println("Token generation failed: ${e.message}")  
            throw IllegalStateException("Failed to generate token: ${e.message}", e)  
        }  
    }  
  
    private object GetApiConfig {  
        const val APP_ID = "xxx"  
        const val AUD = "api.coze.com"  
        const val KEY_ID = "xxx"  
        const val PRIVATE_KEY = """  
-----BEGIN PRIVATE KEY-----  
xxx
-----END PRIVATE KEY-----  
        """    
    }  
}
```

# 安全
## 安全问题分析
把私钥内置到 App 中是有一些安全问题的，这里做些分析。
- **私钥证书存储安全风险**：如果 Android 设备被恶意攻击者获取了 root 权限，或者应用本身存在安全漏洞（如代码注入、反编译漏洞等），存储在设备上的私钥证书可能会被窃取。一旦私钥证书泄露，攻击者就有可能伪装成合法的应用向服务端请求令牌，从而获取未经授权的访问权限。
- **传输过程安全风险**：在向服务端请求交换令牌的过程中，如果通信没有采用足够的加密措施（如 TLS/SSL 协议未正确配置或者被中间人攻击绕过），那么私钥证书和令牌相关的信息可能会在传输过程中被窃取。例如，攻击者通过在公共 WiFi 环境中进行中间人攻击，拦截并篡改请求和响应信息。
- **JWT 和 OAuth 令牌滥用风险**：即使令牌的获取过程是安全的，但是如果令牌的有效期过长或者没有正确的权限管理机制，被窃取的令牌可能会被滥用。例如，JWT 令牌没有设置合适的过期时间，或者 OAuth 令牌的权限范围没有得到精细的控制，攻击者获取令牌后可能会在有效期内持续访问受保护的资源。
## 安全建议
- **安全存储私钥证书**：使用 Android 系统提供的安全存储机制，如 KeyStore 系统。它可以将私钥证书存储在一个受硬件保护的区域（如果设备支持），并且通过密码学手段对访问进行限制。同时，对应用进行加固，防止反编译和代码注入等攻击方式。
- **确保传输安全**：在与服务端的通信过程中，强制使用 TLS/SSL 协议，并进行严格的证书验证。可以采用双向认证的方式，即服务端和客户端（Android 应用）互相验证对方的证书，确保通信双方的身份真实可靠。
- **令牌管理优化**：合理设置 JWT 和 OAuth 令牌的有效期，对于高风险操作可以采用短有效期的令牌，并要求用户频繁重新认证。同时，对 OAuth 令牌的权限进行精细的划分，确保每个令牌只能访问其授权范围内的资源。例如，对于只需要读取用户基本信息的操作和需要修改用户密码的操作，分别使用不同权限范围的令牌。
