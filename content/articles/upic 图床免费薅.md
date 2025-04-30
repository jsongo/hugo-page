---
updated_at: 2024-10-27T11:31:09.698+08:00
edited_seconds: 220
tags:
  - IT/折腾/图床
created_at: Sat, Apr 12, 2025 - 16:59:03
date: 2025-04-12T16:59:03.470+08:00
banner_icon: 🐭
banner: "https://cdn.jsongo.top/banners/949a9178ccc501fe2ddb271fd63ba29b.jpeg"
title: upic 图床工具
slug: upic-image-tool
description: 使用uPic工具和Cloudflare R2搭建图床，实现便捷的图片上传和管理
draft: false
---
# 安装
从这里可以找到 upic [GitHub - 📤uPic is a native, powerful, beautiful and simple picture and file upload tool...](https://github.com/gee1k/uPic)  
如果通过 app store 来安装，它是收费，下载的版本可能不太一样。  
![|408x325](https://cdn.jsongo.top/upic/1744475945_34Huac.webp)  
而如果通过上面 github 链接来安装，比如 mac 上，它可以通过 brew 来装
```bash
brew install bigwig-club/brew/upic --cask
```

# Cloudflare 设置
菜单上进入 R2，在首页的右侧可以看到下图中的 API tokens 管理的选项，点击进入。  
![](https://cdn.jsongo.top/upic/1744475946_0TXAdx.webp)  
选 User API Token 就行，权限最小化。填写一些基础的选项：  
![](https://cdn.jsongo.top/upic/1744475947_LKC9Ly.webp)  
生成的各种 key 等记下来，后面用到。

# 设置 Upic
在 upic 设置添加图床时，要先 Amazon S3 (是的，cloudflare R2 也是选这个)。  
![|276x395](https://cdn.jsongo.top/upic/1744475949_sqc9BT.webp)  
具体设置这里就不介绍了，它走的是简单 http put 方式，有些公司的安全软件会把它禁掉，大厂基本都是。
所以还是想另外的办法去做上传。
>  禁掉是有道理的，因为担心你把公司的资料外传。

# Cloudflare Worker 代理
为了避开限制，同时也让国内可以正常的做上传（无需魔法），这时 worker 就成了一个很好的选择。  
上传到 R2 的话，worker 里是有内置一些对象可以直接绑定的，使用非常方便，比如上传只需要这么一行代码就可以了：
```js
const upload = await env.MY_BUCKET.put(key, fileData)
```
其实 env.MY_BUCKET 即为全局注入的对象，它可以用于做上传，调用它的 put 方法就可以，非常简单。
## 完整代码
```js
export default {
  async fetch(request, env, ctx) {
    // 声明全局变量
    let jsonData = null;
    // 处理 CORS 预检请求
    if (request.method === 'OPTIONS') {
      return handleCORS();
    }

    if (request.method !== "POST") {
      return new Response("Only POST allowed", { status: 405 });
    }

    // 从 Authorization 头部获取 Bearer token
    const authHeader = request.headers.get('Authorization') || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : '';

    // 验证 token
    if (!token || token !== env.AUTH_TOKEN) {
      return new Response('Unauthorized', { status: 401 });
    }

    const contentType = request.headers.get("content-type") || "";
    
    let fileData, fileType, fileName;
    
    // 处理 JSON 格式的请求 (包含 base64 编码的文件数据)
    if (contentType.includes("application/json")) {
      jsonData = await request.json();
      
      if (!jsonData.file || typeof jsonData.file !== "string") {
        return new Response("Invalid file data format", { status: 400 });
      }
      
      let base64Data = jsonData.file;
      
      // 检查是否是 data URL 格式
      if (jsonData.file.startsWith("data:")) {
        // 解析 data URL
        const dataUrlParts = jsonData.file.match(/^data:([^;]+);base64,(.+)$/);
        if (!dataUrlParts) {
          return new Response("Invalid data URL format", { status: 400 });
        }
        
        fileType = dataUrlParts[1]; // 例如 "image/png"
        base64Data = dataUrlParts[2];
      } else {
        // 直接使用文件内容，需要从请求或文件名推断类型
        fileType = jsonData.mimetype || jsonData.type || jsonData.contentType || "application/octet-stream";
        console.log(`[Info] Using MIME type: ${fileType}`);
      }
      
      try {
        // 将 base64 转换为二进制数据
        fileData = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
      } catch (error) {
        return new Response(`Invalid base64 encoding: ${error.message}`, { status: 400 });
      }
      
      // 从 MIME 类型生成文件名
      const extension = fileType.split('/')[1] || 'bin';
      // 使用提供的文件名或生成一个新的
      fileName = jsonData.name || jsonData.filename || `${Date.now()}.${extension}`;
    } 
    // 处理 multipart/form-data 格式的请求
    else if (contentType.includes("multipart/form-data")) {
      const form = await request.formData();
      const file = form.get("file"); // 文件字段名为 file
      
      if (!file || typeof file === "string") {
        return new Response("No file uploaded", { status: 400 });
      }
      
      fileData = file.stream();
      fileType = file.type;
      fileName = file.name;
    } 
    else {
      return new Response("Unsupported content type", { status: 400 });
    }
    
    // 使用自定义路径或默认路径
    let key;
    if (jsonData && jsonData.path) {
      key = jsonData.path;
      console.log(`[Info] Using custom path: ${key}`);
    } else {
      const timestamp = Date.now();
      key = `uploads/${timestamp}-${fileName || 'file'}`;
      console.log(`[Info] Using generated path: ${key}`);
    }
    
    console.log(`[Info] Uploading to R2: ${key} (${fileType})`); 
    const upload = await env.MY_BUCKET.put(key, fileData, {
      httpMetadata: {
        contentType: fileType || 'application/octet-stream',
      },
    });
    console.log(`[Info] Upload successful`);

    const publicURL = `https://${env.PUBLIC_DOMAIN}/${key}`;
    console.log(`[Info] Public URL: ${publicURL}`);
    
    // 返回 JSON 对象
    return Response.json({ url: publicURL });
  },
};


// 处理 CORS 预检请求
function handleCORS() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    }
  });
}
```
## 配置
有了这个之后，我们再绑一个域名上去，在 worker 的设置里直接加就行，这里就不展开。  
接着把这个域名用到 upic 的配置里  
![|734x540](https://cdn.jsongo.top/upic/1744475950_v3vq6M.webp)  
“其它字段” 里添加一下头部认证，和 body 的其它字段，用于存储的时候指定 key 等。  
![|711x658](https://cdn.jsongo.top/upic/1744475951_BpscpM.webp)  
这时就可以用 upic 去上传你的文件了。顺便说一句，upic 可以做截图上传、剪贴板上传，确实好方便。我设置了个快捷键，之后就直接用它来帮我快速做上传就行了。
