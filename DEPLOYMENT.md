# 部署说明

## 远程仓库配置

本项目配置了两个远程仓库：

1. **GitHub**: https://github.com/Jit-dong/app.git
2. **阿里云CodeUp**: git@codeup.aliyun.com:67f693658330212176aeda55/FE/demo-fe.git

## 手动部署命令

### 推送到GitHub
```bash
git push origin feature/chip-search-ui
```

### 推送到阿里云CodeUp
```bash
git push codeup feature/chip-search-ui:main
```

## 项目功能总结

### 🎯 核心功能
- 三级筛选面板系统（品牌、封装、参数）
- 分类查询页面手机端优化
- 热门品牌框重新设计
- 产品列表厂家信息显示
- 筛选条件标签管理

### 🎨 设计特色
- 橙色主题色彩系统
- 毛玻璃效果和渐变背景
- 响应式移动端设计
- 现代化动画效果

### 📱 移动端优化
- 紧凑的布局设计
- 优化的触摸交互
- 减少的间距和尺寸
- 提升的空间利用率

## 清理说明

部署完成后，可以删除以下文件：
- .git/ 目录（如果需要）
- node_modules/ 目录（生产环境重新安装）
- 各种配置文件的备份
