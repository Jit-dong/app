#!/bin/bash

# 部署配置
SERVER_IP="120.27.153.38"
SERVER_USER="djt"
SERVER_PATH="/home/djt/chip-app"
LOCAL_BUILD_PATH=".next"

echo "🚀 开始部署到服务器..."

# 1. 构建项目
echo "📦 构建项目..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 构建失败，停止部署"
    exit 1
fi

# 2. 创建部署包
echo "📁 创建部署包..."
tar -czf deploy.tar.gz .next public package.json package-lock.json next.config.js

# 3. 上传到服务器
echo "⬆️  上传文件到服务器..."
scp deploy.tar.gz ${SERVER_USER}@${SERVER_IP}:~/

# 4. 在服务器上部署
echo "🔧 在服务器上部署..."
ssh ${SERVER_USER}@${SERVER_IP} << 'EOF'
    # 创建应用目录
    mkdir -p /home/djt/chip-app
    cd /home/djt/chip-app
    
    # 解压文件
    tar -xzf ~/deploy.tar.gz
    
    # 安装依赖
    npm install --production
    
    # 停止旧的进程
    pkill -f "next start" || true
    
    # 启动新的进程
    nohup npm start > app.log 2>&1 &
    
    echo "✅ 部署完成！应用正在启动..."
    echo "📝 日志文件: /home/djt/chip-app/app.log"
    
    # 清理临时文件
    rm ~/deploy.tar.gz
EOF

# 5. 清理本地临时文件
rm deploy.tar.gz

echo "🎉 部署完成！"
echo "🌐 访问地址: http://${SERVER_IP}:3000"
