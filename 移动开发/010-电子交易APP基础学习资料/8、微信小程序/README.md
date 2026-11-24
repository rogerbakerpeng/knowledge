# 实现要求
根据Gemini 3 pro + Stitch生成的html代码，实现能接入微信小程序，webview加载的移动前端页面。带有mock数据，能够在微信小程序中正常运行。


# 开发工具
- 浏览器（用于调试）
- 代码编辑器（如Visual Studio Code）

# 前期准备
- 项目代码拉取M8.3或者M8.4的框架代码
- 将根据Gemini 3 pro + Stitch生成的html代码放到根目录的_doc_的设计稿文件夹下。
- 下载[M8.4 移动前端跨端框架知识库](http://192.168.217.8/mobile_framework_group/ai_knowledge/-/tree/main/m84-front-framework?ref_type=heads)，放置到skills文件夹下。


#  开发步骤
1、根据设计稿和生成的html代码。

提示词：
```    
1、读取references页面，我要把他们编译到pages文件夹里面，用vue编写，遵循.claude/skills/ai-m84-knowledge的规范，不要写到modules文件夹里面。
```

2、查看页面是否符合预期，按情况调整。


3、使用npm run build生成dist代码包，手机端扫码调试，查看最终效果。

