---
title: "The Complete Guide to Nano Banana Pro: 10 Tips"
source: "https://x.com/GoogleAIStudio/status/1994480371061469306?t=c0LkdHNU0nYucaO2788Odg&s=09"
author:
published: 2025-11-29
created: 2025-12-09
description:
tags: - clippings
draft: "false"
slug: "google-ai-studio-thread"
date: "2025-12-09T20:48:57+08:00"
banner: "https://abs.twimg.com/rweb/ssr/default/v2/og/image.png"---
# 总结
0. 提示词的黄金法则：像创意总监一样沟通
	- **编辑，而非重新生成：** 如果图像已接近要求，直接要求具体修改，而不是重新生成。
	- **使用自然语言与完整句子：** 像与人类艺术家沟通一样，使用描述性形容词和正确语法。
	- **具体且详细：** 明确主体、场景、光线和风格，描述材质和细节。
	- **提供上下文：** 告知模型“为什么”或“给谁用”，帮助其做出符合逻辑的艺术决策。  
1. 文本渲染、信息图与视觉合成
	- Nano-Banana Pro 擅长渲染清晰的风格化文本，并将复杂信息转化为视觉格式。
	- **最佳实践：** 让模型将文本/PDF“压缩”为信息图，指定风格，明确文字内容。
	- **示例：** 财报信息图、复古信息图、技术示意图、黑板总结。  
2. 角色一致性与 Viral 缩略图
	- 支持高保真参考图，实现“身份锁定”，将特定人物/角色放入新场景而不失真。
	- **最佳实践：** 明确要求保持面部特征一致，描述变化的表情/动作，结合主体、图形与文字制作 Viral 缩略图。
	- **示例：** Viral 缩略图、毛茸茸朋友分镜、品牌资产生成。  
3. 结合 Google 搜索的场景落地
	- 可使用 Google 搜索生成基于实时数据、当前事件或事实验证的图像，减少幻觉问题。
	- **最佳实践：** 要求可视化动态数据（天气、股票、新闻），模型会在生成图像前“思考”搜索结果。
	- **示例：** 事件可视化。  
4. 高级编辑、修复与上色
	- 擅长复杂编辑，包括“补绘”（移除/添加物体）、“修复”（修复旧照片）、“上色”（漫画/黑白照片）与“风格转换”。
	- **最佳实践：** 使用语义指令，模型能理解物理规则并进行复杂变化。
	- **示例：** 物体移除与补绘、漫画上色、本地化、光线/季节控制。  
5. 维度平移（2D ↔ 3D）
	- 强大的新能力，可将 2D 示意图转为 3D 可视化（或反向转换）。
	- **示例：** 2D 平面图→3D 室内展示板、2D 到 3D 表情包转换。  
6. 高分辨率与纹理
	- 支持原生 1K 到 4K 图像生成，尤其适合细节纹理或大尺寸印刷。
	- **最佳实践：** 明确要求高清输出，描述高保真细节（瑕疵、表面纹理）。
	- **示例：** 4K 纹理生成、复杂逻辑（思考型模型）。  
7. 思考与推理
	- 默认采用“思考”过程，在渲染最终输出前生成临时思维图像，以改进构图、进行数据分析和解决视觉问题。
	- **示例：** 解方程、视觉推理。  
8. 单提示分镜与概念艺术
	- 可生成连贯的艺术或分镜，无需网格，确保单次会话内叙事连贯。
	- **示例：** 9 部分故事分镜。  
9. 结构控制与布局指导
	- 输入图片可用于严格控制最终输出的构图和布局，将草图、线框或特定网格布局转化为精致资产。
	- **最佳实践：** 上传手绘草图、线框图或网格图。
	- **示例：** 草图转最终广告、线框转 UI 原型、像素艺术与 LED 显示屏、精灵图。  
10. 下一步怎么做？
	- 在 UI 中实验，探索 Nano-Banana 驱动的应用，将提示词转化为应用，构建应用程序，阅读完整的 Gemini API 文档。
---
原文…
> 来自：https://x.com/GoogleAIStudio/status/1994480371061469306  

Nano-Banana Pro 是相较于上一代模型的一大飞跃，从“趣味”图像生成转向“功能”专业资产生产。它在文本渲染、角色一致性、视觉合成、世界知识（搜索）和高分辨率（4K）输出方面表现出色。 [developer guide](https://dev.to/googleai/introducing-nano-banana-pro-complete-developer-tutorial-5fc8) [AI Studio](https://ai.studio/)  
遵循关于如何开始使用 [开发者指南](https://dev.to/googleai/introducing-nano-banana-pro-complete-developer-tutorial-5fc8) 和 API 的指南，本指南涵盖了核心功能以及如何有效提示它们。  
> 作者：Guillaume Vernade，Gemini 开发者布道师，谷歌深度思维

# 本文将包含以下内容
提示词的黄金法则 
1. 文本渲染、信息图表与视觉合成 
2. 角色一致性与病毒式缩略图 
3. 以谷歌搜索为基础 
4. 高级编辑、修复与上色 
5. 维度转换（2D ↔ 3D） 
6. 高分辨率与纹理 
7. 思考与推理 
8. 单次故事板绘制与概念艺术 
9. 结构控制与布局指导
10. 接下来是什么？

# 🛑 第 0 节：提示词的黄金法则
Nano-Banana Pro 是一个 " 思考型 " 模型。它不仅匹配关键词，还能理解意图、物理和构图。要获得最佳效果，请停止使用 " 标签汤 "（例如，狗、公园、4k、逼真），并开始像创意总监一样行动。
## 1. 编辑，不要重新生成
该模型在理解对话式编辑方面表现出色。如果图像有 80% 的正确率，不要从零开始生成新图像。相反，只需请求你需要的具体修改。
> 示例：" 很好，但将光线改为日落，并将文字调整为霓虹蓝。"
## 2. 使用自然语言和完整句子
像向人类艺术家汇报一样与模型交流。使用正确的语法和描述性形容词。
> ❌ 差: " 酷炫的车，霓虹灯，城市，夜晚，8k."

> ✅ 好: " 一个电影般的广角镜头，展示一辆未来派跑车在雨夜的东京街道上疾驰。霓虹灯招牌在湿滑的路面上反射，车身的金属底盘闪闪发光."
## 3. 保持具体和描述性
模糊的提示会得到泛泛的结果。定义主体、背景、光照和氛围。  
主体： 不要说“一个女人”，而要说“一位穿着复古香奈儿风格套装的优雅老妇人”。  
材质： 描述纹理。“哑光表面”、“拉丝钢”、“柔软天鹅绒”、“皱纸”。
## 4. 提供背景信息（“为什么”或“为谁”）
因为模型会“思考”，给它提供背景信息有助于它做出合理的艺术决策。  
示例： " 为巴西高端美食烹饪书创作一张三明治图片。"（模型将推断出专业的摆盘、浅景深和完美的光线）

---
# 1. 文本渲染、信息图表与视觉合成
Nano-Banana Pro 在渲染易读的、风格化的文本以及将复杂信息合成视觉格式方面具有顶尖能力。  
最佳实践：
- 压缩： 要求模型将密集文本或 PDF 压缩成视觉辅助工具。
- 风格： 指定你想要 " 精炼的编辑风格 "、" 技术图表 " 或 " 手绘白板 " 的外观。
- 引言： 明确指定您希望在引号中显示的文本。  
示例提示：> [earnings report](https://s206.q4cdn.com/479360582/files/doc_news/2025/Oct/29/attachments/2025q3-alphabet-earnings-release.pdf)  
> 收益报告信息图（数据输入）： \[输入谷歌最新< div id=2>[收益报告](https://s206.q4cdn.com/479360582/files/doc_news/2025/Oct/29/attachments/2025q3-alphabet-earnings-release.pdf) \] " 生成一张简洁现代的信息图表，总结这份盈利报告中的关键财务要点。包含 ' 营收增长 ' 和 ' 净利润 ' 的图表，并用风格化的引言框突出 CEO 的关键引言。"  
![278cb1e8091bf35e5560c79fe67e38e1_MD5.webp|800](https://cdn.lyb.pub/upic/1765285966_T2C5qf.webp)  
[Try it in AI Studio](https://aistudio.google.com/prompts/new_chat?prompt=Generate%20a%20clean%2C%20modern%20infographic%20summarizing%20the%20key%20financial%20highlights%20from%20this%20earnings%20report.%20Include%20charts%20for%20%27Revenue%20Growth%27%20and%20%27Net%20Income%27%2C%20and%20highlight%20the%20CEO%27s%20key%20quote%20in%20a%20stylized%20pull-quote%20box.&model=gemini-3-pro-image-preview)  
(Note: Requires uploading a PDF)

> 复古风格信息图表： " 制作一张复古、50 年代风格的关于美国餐厅历史的信息图表。包含 ' 食物 '、' 点唱机 ' 和 ' 装饰 ' 的独立板块。确保所有文字清晰可读，并风格化以匹配那个时代。"  
  ![973a1a0948471078de4b6b4f75af7729_MD5.webp|600](https://cdn.lyb.pub/upic/1765285968_OKTlto.webp)  
[在 AI Studio 中尝试](https://aistudio.google.com/prompts/new_chat?prompt=Make%20a%20retro%2C%201950s-style%20infographic%20about%20the%20history%20of%20the%20American%20diner.%20Include%20distinct%20sections%20for%20%27The%20Food%2C%27%20%27The%20Jukebox%2C%27%20and%20%27The%20Decor.%27%20Ensure%20all%20text%20is%20legible%20and%20stylized%20to%20match%20the%20period.&model=gemini-3-pro-image-preview)

> 技术图纸： " 创建一个正交蓝图，描述该建筑在平面、立面和剖面上的情况。用技术建筑字体清晰标注 ' 北立面 ' 和 ' 主入口 '。格式为 16:9。"  
  ![b15994b10439a8d33f280b47280f5c16_MD5.webp|800](https://cdn.lyb.pub/upic/1765285972_KhlygV.webp)  
[在 AI Studio 中尝试](https://aistudio.google.com/prompts/new_chat?prompt=Create%20an%20orthographic%20blueprint%20that%20describes%20this%20building%20in%20plan%2C%20elevation%2C%20and%20section.%20Label%20the%20%27North%20Elevation%27%20and%20%27Main%20Entrance%27%20clearly%20in%20technical%20architectural%20font.%20Format%2016%3A9.&model=gemini-3-pro-image-preview)

> 白板总结（教育类）： " 以手绘白板图的形式，为大学讲座总结 'Transformer 神经网络架构 ' 的概念。使用不同颜色的标记区分编码器和解码器模块，并包含清晰的 ' 自注意力 ' 和 ' 前馈 ' 标签。"  
  ![79b7660765a3ee84def3065a0e37e390_MD5.webp|600|600x328](https://cdn.lyb.pub/upic/1765285977_3nqb2p.webp)  
[在 AI Studio 中尝试](https://aistudio.google.com/prompts/new_chat?prompt=Summarize%20the%20concept%20of%20%27Transformer%20Neural%20Network%20Architecture%27%20as%20a%20hand-drawn%20whiteboard%20diagram%20suitable%20for%20a%20university%20lecture.%20Use%20different%20colored%20markers%20for%20the%20Encoder%20and%20Decoder%20blocks%2C%20and%20include%20legible%20labels%20for%20%27Self-Attention%27%20and%20%27Feed%20Forward%27.&model=gemini-3-pro-image-preview)
---

# 2. 角色一致性与病毒式缩略图
Nano-Banana Pro 支持最多 14 张参考图片 （其中 6 张具有高保真度）。这允许进行“身份锁定”——将特定人物或角色放置到新场景中而不产生面部变形。  
最佳实践：
- 身份锁定： 明确说明：“保持人物的面部特征与图片 1 完全一致。”
- 表情/动作： 描述情绪或姿态的变化，同时保持身份的一致性。
- 病毒式构图： 在单次操作中结合主题与醒目的图形和文字。  
示例提示：
> " 病毒式缩略图 "（身份 + 文字 + 图形）： 使用图 1 中的人物设计一个病毒式视频缩略图。面部一致性： 保持人物面部特征与图 1 完全相同，但改变表情使其看起来兴奋和惊讶。动作： 将人物摆放在左侧，手指指向画面的右侧。主题： 在右侧放置一张高质量的香煎鳄梨吐司图片。图形： 添加一个粗黄色箭头，连接人物的手指和吐司。文字： 在中间叠加巨大、流行风格的文字："3 分钟搞定!"（3 分钟搞定！），使用粗白色轮廓和阴影。背景： 一个模糊、明亮的厨房背景。高饱和度和对比度。  
  ![c33c317fa78860d5c6c96205c04fc91b_MD5.webp|600](https://cdn.lyb.pub/upic/1765285979_0TRBrq.webp)  
[Try it in AI Studio](https://aistudio.google.com/prompts/new_chat?prompt=Design%20a%20viral%20video%20thumbnail%20using%20the%20person%20from%20Image%201.%20Face%20Consistency%3A%20Keep%20the%20person%27s%20facial%20features%20exactly%20the%20same%20as%20Image%201%2C%20but%20change%20their%20expression%20to%20look%20excited%20and%20surprised.%20Action%3A%20Pose%20the%20person%20on%20the%20left%20side%2C%20pointing%20their%20finger%20towards%20the%20right%20side%20of%20the%20frame.%20Subject%3A%20On%20the%20right%20side%2C%20place%20a%20high-quality%20image%20of%20a%20delicious%20avocado%20toast.%20Graphics%3A%20Add%20a%20bold%20yellow%20arrow%20connecting%20the%20person%27s%20finger%20to%20the%20toast.%20Text%3A%20Overlay%20massive%2C%20pop-style%20text%20in%20the%20middle%3A%20%273%E5%88%86%E9%92%9F%E6%90%9E%E5%AE%9A!%27%20%28Done%20in%203%20mins!%29.%20Use%20a%20thick%20white%20outline%20and%20drop%20shadow.%20Background%3A%20A%20blurred%2C%20bright%20kitchen%20background.%20High%20saturation%20and%20contrast.&model=gemini-3-pro-image-preview)  
(Note: Requires uploading a reference image)

> " 毛茸茸的朋友 " 场景（群体一致性）： \[输入 3 张不同毛绒玩具的图片\] " 用这 3 个毛茸茸的朋友创作一个有趣的 10 部分故事，让他们去热带度假。整个故事充满刺激，有情感的高潮和低谷，并以一个快乐的时刻结束。保持 3 个角色的服装和身份一致，但他们的表情和角度在所有 10 张图片中应有变化。确保每张图片中只有一个角色。"  
  ![dc1a92807dfdd3ee9eabe2bb783a218a_MD5.webp|600](https://cdn.lyb.pub/upic/1765285982_a3V3KJ.webp)  
[Try it in AI Studio](https://aistudio.google.com/prompts/new_chat?prompt=Create%20a%20funny%2010-part%20story%20with%20these%203%20fluffy%20friends%20going%20on%20a%20tropical%20vacation.%20The%20story%20is%20thrilling%20throughout%20with%20emotional%20highs%20and%20lows%20and%20ends%20in%20a%20happy%20moment.%20Keep%20the%20attire%20and%20identity%20consistent%20for%20all%203%20characters%2C%20but%20their%20expressions%20and%20angles%20should%20vary%20throughout%20all%2010%20images.%20Make%20sure%20to%20only%20have%20one%20of%20each%20character%20in%20each%20image.&model=gemini-3-pro-image-preview)  
(Note: Requires uploading reference images)

> 品牌资产生成： \[输入 1 张产品图片\] " 创建 9 张令人惊叹的时尚照片，仿佛来自获奖时尚杂志。以这个参考为品牌风格，但为范围增添细微差别和多样性，使其传达专业设计感。请分批次生成九张图片。"  
  ![ebf9e83c02d6452dcc8daf0d89dd4225_MD5.webp|600](https://cdn.lyb.pub/upic/1765285998_7EMXQf.webp)  
[Try it in AI Studio](https://aistudio.google.com/prompts/new_chat?prompt=Create%209%20stunning%20fashion%20shots%20as%20if%20they%E2%80%99re%20from%20an%20award-winning%20fashion%20editorial.%20Use%20this%20reference%20as%20the%20brand%20style%20but%20add%20nuance%20and%20variety%20to%20the%20range%20so%20they%20convey%20a%20professional%20design%20touch.%20Please%20generate%20nine%20images%2C%20one%20at%20a%20time.&model=gemini-3-pro-image-preview)  
(Note: Requires uploading a reference image)
---

# 3. 使用谷歌搜索进行基础设定
Nano-Banana Pro 利用谷歌搜索根据实时数据、当前事件或事实验证来生成图像，减少及时性话题上的幻觉。  
最佳实践：
- 请求动态数据的可视化（天气、股票、新闻）。
- 模型将在生成图像前对搜索结果进行“思考”（推理）。  
示例提示：
> 事件可视化： 根据当前旅行趋势，生成一张关于 2025 年访问美国国家公园最佳时间的图表。  
  ![01c0e2091349a3b1ce0eaa955d64d081_MD5.webp|600](https://cdn.lyb.pub/upic/1765286001_BxcU5y.webp)  
[在 AI Studio 中尝试](https://aistudio-preprod.corp.google.com/prompts/new_chat?prompt=Create%20an%20image%20visualizing%20the%20current%20league%20standings%20of%20the%20top%20European%20football%20clubs%20and%20their%20recent%20form%20trends%20\(last%205%20matches\).%20For%20each%20team,%20add%20an%20explanation%20regarding%20recent%20results,%20injuries,%20or%20managerial%20changes%20that%20explain%20their%20current%20trajectory.&model=gemini-3-pro-image-preview)

# 4. 高级编辑、修复与上色
该模型擅长通过对话式提示进行复杂编辑。这包括“图像修复”（移除/添加物体）、“修复旧照片”、“上色”（漫画/黑白照片）和“风格切换”。  
最佳实践：
- 语义指令： 你不需要手动遮罩；只需自然地告诉模型要改变什么。
- 物理理解： 你可以要求进行复杂的变化，例如“往这个杯子里倒液体”，以测试物理生成效果。  
示例提示：
> 移除对象与修复填充： " 从这张照片的背景中移除游客，并用符合周围环境的逻辑纹理（鹅卵石和店铺）填充空间。"  
  ![b71c441d11de3190f394c53265e7243e_MD5.webp|600](https://cdn.lyb.pub/upic/1765286008_b2veBu.webp)  
[Try it in AI Studio](https://aistudio.google.com/prompts/new_chat?prompt=Remove%20the%20tourists%20from%20the%20background%20of%20this%20photo%20and%20fill%20the%20space%20with%20logical%20textures%20\(cobblestones%20and%20storefronts\)%20that%20match%20the%20surrounding%20environment.&model=gemini-3-pro-image-preview)  
(Note: Requires uploading a photo)

> 漫画/漫画上色： \[输入黑白漫画面板\] " 为这个漫画面板上色。使用充满活力的动漫风格调色板。确保能量光束的光照效果为发光的霓虹蓝色，角色服装需与官方颜色保持一致。"  
  ![61f2eac368b4497f0c1ca6a7f1352d41_MD5.webp|600](https://cdn.lyb.pub/upic/1765286013_98laP6.webp)  
[Try it in AI Studio](https://aistudio.google.com/prompts/new_chat?prompt=Colorize%20this%20manga%20panel.%20Use%20a%20vibrant%20anime%20style%20palette.%20Ensure%20the%20lighting%20effects%20on%20the%20energy%20beams%20are%20glowing%20neon%20blue%20and%20the%20character%27s%20outfit%20is%20consistent%20with%20their%20official%20colors.&model=gemini-3-pro-image-preview)  
(Note: Requires uploading an image)

> 本地化（文本翻译 + 文化适配）： \[输入图片：伦敦公交车站广告\] " 将这个概念本地化到东京场景中，包括将标语翻译成日语。将背景改为夜晚繁忙的涩谷街头。"  
  ![284fdf32b7b77b62838068612199a4fd_MD5.webp|800](https://cdn.lyb.pub/upic/1765286021_J62dUb.webp)  
[Try it in AI Studio](https://aistudio.google.com/prompts/new_chat?prompt=Take%20this%20concept%20and%20localize%20it%20to%20a%20Tokyo%20setting%2C%20including%20translating%20the%20tagline%20into%20Japanese.%20Change%20the%20background%20to%20a%20bustling%20Shibuya%20street%20at%20night.&model=gemini-3-pro-image-preview)  
(Note: Requires uploading an image)

> 灯光/季节控制： \[输入一张夏天的房子图片\] " 将这个场景变成冬天。保持房屋建筑结构完全相同，但在屋顶和院子里加上雪，并将光照改为寒冷、阴沉的下午。"  
  ![3c001c26a3d99431a666f1b392fffe18_MD5.webp|600](https://cdn.lyb.pub/upic/1765286136_EPfsxU.webp)  
[Try it in AI Studio](https://aistudio.google.com/prompts/new_chat?prompt=Turn%20this%20scene%20into%20winter%20time.%20Keep%20the%20house%20architecture%20exactly%20the%20same%2C%20but%20add%20snow%20to%20the%20roof%20and%20yard%2C%20and%20change%20the%20lighting%20to%20a%20cold%2C%20overcast%20afternoon.&model=gemini-3-pro-image-preview)  
(Note: Requires uploading an image)

# 5. 维度转换（2D ↔ 3D)
一项强大的新功能是将 2D 示意图转换为 3D 可视化，反之亦然。这对于室内设计师、建筑师和表情包创作者来说非常理想。  
示例提示：
> 2D 平面图转换为 3D 室内设计展示板： " 基于上传的 2D 平面图，生成一张专业的室内设计展示板。布局： 一张拼贴图，顶部是一个大的主图像（客厅的广角视角），下方是三个较小的图像（主卧室、家庭办公室和一个 3D 俯视平面图）。风格： 在所有图像中应用现代极简主义风格，搭配暖色调橡木地板和浅白色墙壁。质量： 照片级渲染，柔和的自然光线。"  
  ![b43ab52e9b1db96e9d44168aa5daaf24_MD5.webp|600](https://cdn.lyb.pub/upic/1765286051_gWc0aI.webp)  
[Try it in AI Studio](https://aistudio.google.com/prompts/new_chat?prompt=Based%20on%20the%20uploaded%202D%20floor%20plan%2C%20generate%20a%20professional%20interior%20design%20presentation%20board%20in%20a%20single%20image.%20Layout%3A%20A%20collage%20with%20one%20large%20main%20image%20at%20the%20top%20\(wide-angle%20perspective%20of%20the%20living%20area\)%2C%20and%20three%20smaller%20images%20below%20\(Master%20Bedroom%2C%20Home%20Office%2C%20and%20a%203D%20top-down%20floor%20plan\).%20Style%3A%20Apply%20a%20Modern%20Minimalist%20style%20with%20warm%20oak%20wood%20flooring%20and%20off-white%20walls%20across%20ALL%20images.%20Quality%3A%20Photorealistic%20rendering%2C%20soft%20natural%20lighting.&model=gemini-3-pro-image-preview)  
(Note: Requires uploading a floor plan)

> 2D 到 3D 表情包转换： " 将 'This is Fine' 狗狗表情包转换为逼真的 3D 渲染。保持构图不变，但让狗狗看起来像毛绒玩具，火焰看起来像真实的火焰。"  
  ![0feb34c7422869dc69e622090cecf600_MD5.webp|600](https://cdn.lyb.pub/upic/1765286066_Kzgljz.webp)  
[在 AI Studio 中尝试](https://aistudio.google.com/prompts/new_chat?prompt=Turn%20the%20%27This%20is%20Fine%27%20dog%20meme%20into%20a%20photorealistic%203D%20render.%20Keep%20the%20composition%20identical%20but%20make%20the%20dog%20look%20like%20a%20plush%20toy%20and%20the%20fire%20look%20like%20realistic%20flames.&model=gemini-3-pro-image-preview)

# 6. 高分辨率与纹理
Nano-Banana Pro 支持原生 1K 至 4K 图像生成。这对于精细纹理或大幅面印刷特别有用。  
最佳实践：
- 如果您的 API/界面允许，请明确要求高分辨率（2K 或 4K）。
- 描述高保真细节（瑕疵、表面纹理）。  
示例提示：
> 4K 纹理生成： " 利用原生高保真输出功能，打造一个令人惊叹、充满氛围的苔藓森林地面环境。控制复杂的灯光效果和精致的纹理，确保每一根苔藓和每一束光线都以像素级完美的分辨率渲染，适合作为 4K 壁纸。"  
  ![008142155e358590a742e769fc5b8fb0_MD5.webp|600](https://cdn.lyb.pub/upic/1765286069_RNFUgy.webp)  
[在 AI Studio 中尝试](https://aistudio.google.com/prompts/new_chat?prompt=Harness%20native%20high-fidelity%20output%20to%20craft%20a%20breathtaking%2C%20atmospheric%20environment%20of%20a%20mossy%20forest%20floor.%20Command%20complex%20lighting%20effects%20and%20delicate%20textures%2C%20ensuring%20every%20strand%20of%20moss%20and%20beam%20of%20light%20is%20rendered%20in%20pixel-perfect%20resolution%20suitable%20for%20a%204K%20wallpaper.&model=gemini-3-pro-image-preview)

> 复杂逻辑（思考模式）： " 创建一个超写实的牛排汉堡信息图，分解展示烤布里欧修面包的纹理、牛排焦脆的边缘和奶酪的晶莹融化。为每一层标注其风味特征。"  
  ![2cd48b493fe664ed3b3f846e1159aaf7_MD5.webp|600](https://cdn.lyb.pub/upic/1765286076_7M2wvY.webp)  
[在 AI Studio 中尝试](https://aistudio.google.com/prompts/new_chat?prompt=Create%20a%20hyper-realistic%20infographic%20of%20a%20gourmet%20cheeseburger%2C%20deconstructed%20to%20show%20the%20texture%20of%20the%20toasted%20brioche%20bun%2C%20the%20seared%20crust%20of%20the%20patty%2C%20and%20the%20glistening%20melt%20of%20the%20cheese.%20Label%20each%20layer%20with%20its%20flavor%20profile.&model=gemini-3-pro-image-preview)

# 7. 思考与推理
Nano-Banana Pro 默认采用 " 思考 " 流程，在渲染最终输出前会生成中间思考图像（不收费），以优化构图。这有助于数据分析及解决视觉问题。  
示例提示：
> 解方程： 在白板上用 C 语言解方程 log\_{x^2+1}(x^4-1)=2，并清晰展示步骤。  
  ![d20ff1ffdf0dcbcdfaa69d52e1c3f900_MD5.webp|600](https://cdn.lyb.pub/upic/1765286083_RGCHNe.webp)  
[在 AI Studio 中尝试](https://aistudio.google.com/prompts/new_chat?prompt=Solve%20log_%7Bx%2B1%7D\(x%5E2%2B1\)%3D2%20in%20C%20on%20a%20white%20board.%20Show%20the%20steps%20clearly.&model=gemini-3-pro-image-preview)

> 视觉推理： " 分析这张房间图片，并生成一张 ' 施工前 ' 的图片，展示房间在施工期间可能的样子，包括框架和未完成的石膏板。"  
  ![84e14cdbfad517642934a531c274b22f_MD5.webp|600](https://cdn.lyb.pub/upic/1765286089_VzD3Z2.webp)  
[Try it in AI Studio](https://aistudio.google.com/prompts/new_chat?prompt=Analyze%20this%20image%20of%20a%20room%20and%20generate%20a%20%27before%27%20image%20that%20shows%20what%20the%20room%20might%20have%20looked%20like%20during%20construction%2C%20showing%20the%20framing%20and%20unfinished%20drywall.&model=gemini-3-pro-image-preview)  
(Note: Requires uploading an image)

# 8. 单次故事板与概念艺术
您可以在没有网格的情况下生成连续艺术或故事板，确保在单次会话中保持连贯的叙事流程。这也常用于“电影概念艺术”（例如，即将上映电影的虚假泄露）。  
示例提示：
> 创作一个由 9 张图片组成的、引人入胜的 9 段故事，展现一对男女在获奖的豪华行李箱广告中。故事应包含情感的高潮与低谷，最终以一位女士优雅地手持标志的镜头结束。女士和男士的身份及其着装必须在整个故事中保持一致，但可以并且应该从不同的角度和距离展现。请逐张生成图片。确保每张图片均为 16:9 的横向格式。  
  ![61187e15611b2c468199f0a2ad776fce_MD5.webp|600](https://cdn.lyb.pub/upic/1765286096_z5as1I.webp)  
[在 AI Studio 中尝试](https://aistudio.google.com/prompts/new_chat?prompt=Create%20an%20addictively%20intriguing%209-part%20story%20with%209%20images%20featuring%20a%20woman%20and%20man%20in%20an%20award-winning%20luxury%20luggage%20commercial.%20The%20story%20should%20have%20emotional%20highs%20and%20lows%2C%20ending%20on%20an%20elegant%20shot%20of%20the%20woman%20with%20the%20logo.%20The%20identity%20of%20the%20woman%20and%20man%20and%20their%20attire%20must%20stay%20consistent%20throughout%20but%20they%20can%20and%20should%20be%20seen%20from%20different%20angles%20and%20distances.%20Please%20generate%20images%20one%20at%20a%20time.%20Make%20sure%20every%20image%20is%20in%20a%2016%3A9%20landscape%20format.&model=gemini-3-pro-image-preview)

# 9. 结构控制与布局指导
输入图片不仅限于角色参考或编辑主题。你可以使用它们来严格控制最终输出的构图和布局。这对于需要将餐巾纸草图、线框图或特定网格布局转化为精致资产的设计师来说是一个变革性的工具。  
最佳实践：
- 草图与速写： 上传手绘草图，明确文字和对象的位置。
- 线框图： 使用现有布局或线框图的截图，生成高保真 UI 模型。
- 网格： 使用网格图像，强制模型为基于瓦片的游戏或 LED 显示屏生成资源。  
示例提示：
> 从草图到最终广告： " 根据这个草图创建一个\[产品\] 的广告。"  
  ![81970d74e8421e3baf3bbb9a7ed30428_MD5.webp|600](https://cdn.lyb.pub/upic/1765286102_mjeqna.webp)  
[Try it in AI Studio](https://aistudio.google.com/prompts/new_chat?prompt=Create%20a%20high-end%20magazine%20advertisement%20for%20a%20luxury%20perfume%20brand%20called%20%27Nebula%27%20based%20on%20this%20hand-drawn%20sketch.%20Keep%20the%20exact%20layout%20of%20the%20bottle%20and%20text%20placement%2C%20but%20render%20it%20in%20a%20photorealistic%20style%20with%20a%20galaxy-themed%20background.&model=gemini-3-pro-image-preview)  
(Note: Requires uploading a sketch)

> 从线框图制作 UI 模型： " 按照这些指南为\[产品\] 创建模型。"  
  ![8a8c5deb23bc22caa81d733c117368b0_MD5.webp|600](https://cdn.lyb.pub/upic/1765286105_PvX7Uq.webp)  
[Try it in AI Studio](https://aistudio.google.com/prompts/new_chat?prompt=Generate%20a%20photorealistic%20UI%20mockup%20for%20a%20fitness%20tracking%20app%20based%20on%20this%20wireframe.%20Replace%20the%20placeholder%20boxes%20with%20high-quality%20images%20of%20runners%20and%20data%20visualization%20charts%2C%20but%20strictly%20adhere%20to%20the%20button%20placement%20and%20grid%20structure.&model=gemini-3-pro-image-preview)  
(Note: Requires uploading a wireframe)

> 像素艺术与 LED 显示屏： " 生成一个完美适配这个 64x64 网格图像的单峰驼像素艺术精灵。使用高对比度颜色。" (提示：开发者可以随后通过编程方式提取每个单元格的中心颜色，以驱动一个连接的 64x64 LED 矩阵显示屏)  
  ![79e30a275d6c73500b292e49e4a04d54_MD5.webp|600](https://cdn.lyb.pub/upic/1765286109_UUZ9ia.webp)  
[Try it in AI Studio](https://aistudio.google.com/prompts/new_chat?prompt=Generate%20a%20pixel%20art%20sprite%20of%20a%20unicorn%20that%20fits%20perfectly%20into%20this%2064x64%20grid%20image.%20Use%20high%20contrast%20colors.&model=gemini-3-pro-image-preview)  
(Note: Requires uploading a grid image)

> 精灵： 一个女性在无人机上做空翻的精灵表，3x3 网格，序列，逐帧动画，方形长宽比。严格按照附带的参考图像结构进行制作... (提示：然后可以提取每个单元格制作成 gif)  
  ![acf1519d016f14704e943efc11982295_MD5.webp|600](https://cdn.lyb.pub/upic/1765286115_Q9OROh.webp)  
[在 Colab 中尝试](https://colab.sandbox.google.com/github/google-gemini/cookbook/blob/main/quickstarts/Get_Started_Nano_Banana.ipynb#scrollTo=xuQeyK-teUf1)

# 10. 接下来做什么？
现在你已经掌握了提示的基础知识，以下是你可以开始构建的方法：
- [Google AI Studio](https://aistudio.google.com/) 在界面中实验：[Google AI Studio](https://aistudio.google.com/) 是测试提示和参数的最快方式。
- [App Gallery](https://aistudio.google.com/apps?source=showcase&showcaseTag=nano-banana) 查看在 [应用画廊](https://aistudio.google.com/apps?source=showcase&showcaseTag=nano-banana) 中非常酷炫的 Nano-banana 驱动的应用。
- [AI Studio Build](https://aistudio.google.com/apps) 用代码实现你梦想中的应用： 将你最好的提示转换为一个你可以在 [AI Studio Build](https://aistudio.google.com/apps) 中轻松与朋友分享的应用。
- [developer guide](https://dev.to/googleai/introducing-nano-banana-pro-complete-developer-tutorial-5fc8) Gemini API Cookbook](https://colab.sandbox.google.com/github/google-gemini/cookbook/blob/main/quickstarts/Get_Started_Nano_Banana.ipynb#nano-banana-pro) 构建应用程序： 准备好编码了？查看 [开发者指南](https://dev.to/googleai/introducing-nano-banana-pro-complete-developer-tutorial-5fc8) 或 [Gemini API 烹饪书](https://colab.sandbox.google.com/github/google-gemini/cookbook/blob/main/quickstarts/Get_Started_Nano_Banana.ipynb#nano-banana-pro) 获取指南和代码片段。
- [Gemini API Documentation](https://ai.google.dev/gemini-api/docs) 技术深入解析： 阅读完整的 [Gemini API 文档](https://ai.google.dev/gemini-api/docs) 了解速率限制、定价和集成的详细信息。
