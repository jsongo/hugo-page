#!/bin/bash

# Hugo 博客本地预览脚本

cd "$(dirname "$0")"

echo "🚀 启动 Hugo 本地服务器..."
echo "📝 访问地址: http://localhost:1313"
echo "💡 按 Ctrl+C 停止服务"
echo ""

hugo server -D --bind 0.0.0.0 --baseURL http://localhost:1313
