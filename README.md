# Chronos Manager

> 一个现代化的博客后台管理系统，采用 Material Design 3 设计风格

## ✨ 特性

- 🎨 **Material Design 3** - 现代化的 Material You 设计风格
- 🌓 **浅色/深色模式** - 支持一键切换主题
- 🎭 **可自定义主题色** - 支持调整主色调色板
- 📱 **响应式设计** - 完美适配桌面端和移动端
- ⚡ **快速流畅** - 基于 Vite + React 构建
- 🎬 **平滑动画** - 使用 Motion 实现流畅过渡效果

## 🛠️ 技术栈

- **前端框架**: React 19
- **构建工具**: Vite 6
- **样式方案**: Tailwind CSS 4
- **动画库**: Motion (Framer Motion)
- **图标库**: Lucide React
- **语言**: TypeScript

## 🚀 快速开始

### 前置要求

- Node.js 18+
- pnpm (推荐) 或 npm

### 安装依赖

```bash
# 使用 pnpm (推荐)
pnpm install

# 或使用 npm
npm install
```

### 启动开发服务器

```bash
pnpm dev
```

应用将在 http://localhost:3000 启动

### 构建生产版本

```bash
pnpm build
```

## 📋 功能模块

| 模块 | 描述 |
|------|------|
| 📊 **仪表盘** | 站点统计概览 |
| 📝 **文章管理** | CMS 文章 CRUD 操作 |
| 📔 **日记管理** | 个人日记记录 |
| 🖼️ **专辑管理** | 照片相册管理 |
| 📅 **时间线** | 成长历程记录 |
| 💼 **项目经历** | 项目作品集展示 |
| 🛠️ **技能管理** | 专业技能树 |
| 👥 **友链管理** | 社交链接维护 |
| 📱 **设备管理** | 生产力工具清单 |
| ℹ️ **关于页面** | 个人介绍 |

## 🎨 自定义主题

1. 点击顶部导航栏的调色板图标 🎨
2. 拖动色相滑块选择喜欢的颜色
3. 主题色会实时应用到整个应用

## 📁 项目结构

```
chronos-manager/
├── src/
│   ├── components/     # 可复用组件
│   │   ├── Sidebar.tsx    # 侧边导航
│   │   └── TopBar.tsx     # 顶部导航
│   ├── views/          # 页面视图
│   │   ├── DashboardView.tsx
│   │   ├── CMSView.tsx
│   │   ├── DiaryView.tsx
│   │   └── ...
│   ├── App.tsx         # 主应用组件
│   ├── main.tsx        # 入口文件
│   ├── index.css       # 全局样式
│   └── types.ts        # 类型定义
├── index.html          # HTML 入口
├── vite.config.ts      # Vite 配置
├── tailwind.config.js  # Tailwind 配置
└── package.json        # 依赖管理
```

## 🔧 配置

### 环境变量

复制 `.env.example` 为 `.env.local` 并配置：

```env
GEMINI_API_KEY=your_api_key_here
```

### 端口配置

默认端口为 3000，如需修改可在 `package.json` 中调整：

```json
{
  "scripts": {
    "dev": "vite --port=3000 --host=0.0.0.0"
  }
}
```

## 📄 许可证

MIT License - 详见 LICENSE 文件

---

<div align="center">
  <p>Made with ❤️ using React + Tailwind CSS</p>
</div>
