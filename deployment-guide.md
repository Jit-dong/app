# 🚀 芯片应用部署指南

## 服务器信息
- **IP地址**: 120.27.153.38
- **用户名**: djt
- **密码**: djt20250408

## 方法一：使用 iTerm2 手动部署（推荐）

### 1. 安装 iTerm2
- 访问：https://www.iterm2.com
- 下载并安装 iTerm2

### 2. 连接服务器
```bash
ssh djt@120.27.153.38
# 输入密码：djt20250408
```

### 3. 在服务器上安装 Node.js（如果未安装）
```bash
# 安装 Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 验证安装
node --version
npm --version
```

### 4. 上传部署包
在本地终端（新窗口）运行：
```bash
# 上传部署包到服务器
scp /Users/junteng_dong/Desktop/app/chip-app-deploy.tar.gz djt@120.27.153.38:~/
```

### 5. 在服务器上部署
回到服务器终端：
```bash
# 创建应用目录
mkdir -p ~/chip-app
cd ~/chip-app

# 解压部署包
tar -xzf ~/chip-app-deploy.tar.gz

# 安装依赖
npm install --production

# 启动应用
npm start
```

### 6. 配置防火墙（如果需要）
```bash
# 开放 3000 端口
sudo ufw allow 3000
```

### 7. 使用 PM2 管理进程（推荐）
```bash
# 安装 PM2
sudo npm install -g pm2

# 启动应用
pm2 start npm --name "chip-app" -- start

# 设置开机自启
pm2 startup
pm2 save
```

## 方法二：使用自动化脚本

### 1. 在本地运行部署脚本
```bash
cd /Users/junteng_dong/Desktop/app
./deploy.sh
```

## 访问应用
部署完成后，访问：http://120.27.153.38:3000

## 常用命令

### 查看应用状态
```bash
pm2 status
pm2 logs chip-app
```

### 重启应用
```bash
pm2 restart chip-app
```

### 停止应用
```bash
pm2 stop chip-app
```

### 更新应用
```bash
# 1. 上传新的部署包
scp chip-app-deploy.tar.gz djt@120.27.153.38:~/

# 2. 在服务器上更新
cd ~/chip-app
tar -xzf ~/chip-app-deploy.tar.gz
npm install --production
pm2 restart chip-app
```

## 故障排除

### 端口被占用
```bash
# 查看端口占用
sudo netstat -tlnp | grep :3000

# 杀死占用进程
sudo kill -9 <PID>
```

### 权限问题
```bash
# 修改文件权限
chmod -R 755 ~/chip-app
```

### 内存不足
```bash
# 查看内存使用
free -h

# 清理缓存
sudo apt-get clean
```
