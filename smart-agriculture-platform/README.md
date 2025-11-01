# 🌾 智慧农业预测平台

<div align="center">

**基于 React + TypeScript 的现代化农业数据可视化与预测系统**

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.0-purple?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-teal?logo=tailwindcss)

</div>

---

## 📖 项目简介

智慧农业预测平台是一个纯前端的农业数据分析与预测系统，旨在展示实验田的温度、湿度、微生物活性、NDVI 植被指数等关键指标的历史趋势和未来预测。

### ✨ 核心特性

- 🎨 **科技感界面**：玻璃拟态设计 + 动态粒子背景 + 渐变发光效果
- 📊 **数据可视化**：使用 Recharts 展示历史数据和预测趋势
- 🤖 **智能预测**：基于历史数据生成未来 7 天的环境预测
- 💡 **智能建议**：自动分析数据并生成农田管理建议
- 📥 **数据导出**：支持将数据导出为 CSV 格式
- 📱 **响应式设计**：完美适配桌面和移动设备

---

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0
- npm >= 8.0

### 安装步骤

```bash
# 1. 克隆项目（或直接进入项目目录）
cd smart-agriculture-platform

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 打开浏览器访问
# 通常是 http://localhost:5173
```

### 构建生产版本

```bash
# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

---

## 📁 项目结构

```
smart-agriculture-platform/
├── src/
│   ├── components/              # 组件目录
│   │   ├── Header.tsx          # 顶部导航栏
│   │   ├── Footer.tsx          # 底部版权信息
│   │   ├── FieldCard.tsx       # 地块卡片组件
│   │   ├── LineChartPanel.tsx  # 折线图组件
│   │   ├── RecommendationPanel.tsx  # 建议面板
│   │   └── ParticleBackground.tsx   # 粒子背景
│   ├── pages/                  # 页面目录
│   │   ├── Home.tsx           # 首页
│   │   ├── FieldDetail.tsx    # 地块详情页
│   │   └── About.tsx          # 关于页面
│   ├── utils/                  # 工具函数
│   │   └── dataGenerator.ts   # 数据生成器
│   ├── types/                  # 类型定义
│   │   └── index.ts           # TypeScript 类型
│   ├── App.tsx                # 主应用组件
│   ├── main.tsx               # 应用入口
│   └── index.css              # 全局样式
├── public/                     # 静态资源
├── index.html                 # HTML 模板
├── package.json               # 项目配置
├── tsconfig.json              # TypeScript 配置
├── tailwind.config.js         # TailwindCSS 配置
├── vite.config.ts             # Vite 配置
└── README.md                  # 项目文档
```

---

## 🎯 功能说明

### 1. 首页 (`/`)

- 展示三个示范地块的摘要信息
- 显示关键指标：温度、湿度、微生物活性、NDVI
- 提供快速导航到地块详情页

### 2. 地块详情页 (`/field/:id`)

- **温度趋势图**：展示历史 14 天 + 未来 7 天预测
- **湿度趋势图**：土壤湿度变化趋势
- **微生物活性指数**：土壤生物活性监测
- **NDVI 植被指数**：作物生长状况
- **智能建议面板**：基于数据自动生成管理建议
- **数据导出功能**：一键下载 CSV 报告

### 3. 关于页面 (`/about`)

- 项目简介与核心功能
- 技术架构展示
- 社会价值与研究意义

---

## 🛠️ 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| React | 18.x | UI 框架 |
| TypeScript | 5.x | 类型安全 |
| Vite | 5.x | 构建工具 |
| React Router | 6.x | 路由管理 |
| TailwindCSS | 3.x | 样式框架 |
| Recharts | 2.x | 图表库 |
| TSParticles | 3.x | 粒子动画 |
| PapaParse | 5.x | CSV 处理 |

---

## 🎨 设计特色

### 配色方案

- **主色调**：`#00FFC6` (荧光绿) - 代表科技与生命
- **强调色**：`#64FFDA` (青色) - 预测数据标识
- **背景色**：`#0A192F` (深蓝) - 营造专业氛围

### 视觉效果

- ✨ 玻璃拟态卡片（`backdrop-blur`）
- 🌟 发光按钮动画（`box-shadow` + `transition`）
- 💫 粒子背景动画（TSParticles）
- 🌈 渐变文字效果
- 🎯 悬浮动画（`hover` effects）

---

## 📊 数据说明

### 示范地块

1. **阳光示范田**
   - 作物：优质小麦
   - 面积：120 亩
   - 特点：节水灌溉技术

2. **西川水田**
   - 作物：有机水稻
   - 面积：95 亩
   - 特点：有机种植模式

3. **北岭试验田**
   - 作物：高产玉米
   - 面积：150 亩
   - 特点：精准农业技术

### 数据生成

数据通过 `dataGenerator.ts` 自动生成：
- 使用 `Math.sin()` 模拟自然周期变化
- 添加随机噪声增加真实性
- 历史数据：最近 30 天
- 预测数据：未来 7 天

---

## 🔧 自定义配置

### 修改地块数据

编辑 `src/utils/dataGenerator.ts` 中的 `generateAllFieldsData()` 函数：

```typescript
export function generateAllFieldsData(): Field[] {
  return [
    generateFieldData(
      'field-1',
      '你的地块名称',  // 修改这里
      '地理位置',      // 修改这里
      '作物类型',      // 修改这里
      100,            // 面积
      '描述文字',      // 描述
      1.23            // 随机种子
    ),
    // 添加更多地块...
  ];
}
```

### 调整颜色主题

编辑 `tailwind.config.js`：

```javascript
theme: {
  extend: {
    colors: {
      primary: '#00FFC6',    // 修改主色调
      secondary: '#0A192F',  // 修改背景色
      accent: '#64FFDA',     // 修改强调色
    },
  },
},
```

---

## 📱 效果展示说明

### 首页效果
- 顶部显示品牌 LOGO 和导航栏
- 中心区域展示项目标题和简介
- 统计卡片展示关键数据（地块数、历史天数等）
- 三个地块卡片以网格布局排列
- 底部展示平台核心功能介绍
- 全屏动态粒子背景效果

### 地块详情页效果
- 顶部面包屑导航
- 地块信息卡片（名称、位置、面积等）
- 左侧：四个大型折线图（温度、湿度、微生物、NDVI）
- 右侧：智能建议面板 + 快速操作按钮
- 图表支持 hover 显示详细数据
- 预测数据使用虚线显示

### 响应式设计
- 桌面端：多栏布局，充分利用屏幕空间
- 移动端：单栏布局，自动适配小屏幕
- 所有交互元素都有触摸友好的尺寸

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

---

## 📄 开源协议

本项目采用 MIT 协议开源

---

## 📮 联系方式

- 邮箱：contact@agriculture-ai.com
- 网站：www.agriculture-ai.com
- GitHub：[项目地址]

---

## 🙏 致谢

感谢所有为农业现代化做出贡献的开发者和研究者！

---

<div align="center">

**用科技点亮农业未来 🌾**

Made with ❤️ by Agriculture Intelligence Team

</div>
