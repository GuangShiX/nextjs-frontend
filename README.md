# Next.js 前端项目

基于 Next.js 14 + React + Sass 构建的现代化纯前端应用

## 技术栈

- **Next.js 14** - React 框架，支持 App Router
- **React 19** - 用户界面库
- **TypeScript** - 类型安全的 JavaScript
- **Sass/SCSS** - CSS 预处理器
- **CSS Modules** - 样式模块化

## 项目结构

```
nextjs-frontend/
├── src/
│   ├── app/                    # App Router 页面
│   │   ├── layout.tsx         # 根布局
│   │   └── page.tsx           # 首页
│   ├── components/            # 可复用组件
│   │   └── Navbar/           # 导航栏组件
│   └── styles/               # 全局样式
│       ├── _variables.scss   # Sass 变量
│       ├── _mixins.scss      # Sass 混合
│       ├── globals.scss      # 全局样式
│       └── page.module.scss  # 页面模块样式
├── public/                   # 静态资源
└── package.json
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

启动开发服务器（默认运行在 http://localhost:3000）：

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用

### 生产构建

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

## Sass 使用说明

### 全局变量

在 `src/styles/_variables.scss` 中定义了全局变量：

```scss
$primary-color: #0070f3;
$secondary-color: #7928ca;
$spacing-md: 1rem;
// ... 更多变量
```

### Mixins

在 `src/styles/_mixins.scss` 中定义了可复用的样式混合：

```scss
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

@mixin card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
}
```

### 在组件中使用 Sass

创建 `.module.scss` 文件：

```scss
// MyComponent.module.scss
@import '../../styles/variables';
@import '../../styles/mixins';

.container {
  @include flex-center;
  background: $primary-color;
  padding: $spacing-md;
}
```

在组件中导入：

```tsx
// MyComponent.tsx
import styles from './MyComponent.module.scss';

export default function MyComponent() {
  return <div className={styles.container}>内容</div>;
}
```

## 样式系统

### 工具类

全局样式中包含了常用的工具类：

```html
<!-- 间距 -->
<div className="mb-3">底部外边距</div>
<div className="mt-4">顶部外边距</div>

<!-- 文本对齐 -->
<div className="text-center">居中对齐</div>

<!-- 按钮 -->
<button className="btn-primary">主要按钮</button>
<button className="btn-secondary">次要按钮</button>

<!-- 布局 -->
<div className="container">容器</div>
<div className="grid grid-3">三列网格</div>
<div className="flex flex-center">居中弹性布局</div>
```

### 响应式设计

使用预定义的响应式 mixins：

```scss
.element {
  padding: 2rem;

  @include mobile-only {
    padding: 1rem; // 仅移动端
  }

  @include tablet-up {
    padding: 1.5rem; // 平板及以上
  }

  @include desktop-up {
    padding: 2rem; // 桌面及以上
  }
}
```

## 开发建议

1. **组件结构**
   - 每个组件一个文件夹
   - 包含 `.tsx` 和 `.module.scss` 文件
   - 保持组件小而专注

2. **样式组织**
   - 使用 CSS Modules 避免样式冲突
   - 复用 `_variables.scss` 和 `_mixins.scss`
   - 避免内联样式

3. **TypeScript**
   - 为组件定义 props 类型
   - 使用类型推断减少冗余代码
   - 利用 TypeScript 的类型检查

4. **性能优化**
   - 使用 Next.js Image 组件优化图片
   - 使用 dynamic import 进行代码分割
   - 合理使用 React Server Components

## 可用脚本

- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm start` - 启动生产服务器
- `npm run lint` - 运行 ESLint 检查

## 环境变量

在根目录创建 `.env.local` 文件：

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

在代码中使用：

```ts
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

## 部署

### Vercel（推荐）

```bash
npm install -g vercel
vercel
```

### 其他平台

```bash
npm run build
# 将 .next 文件夹部署到服务器
```

## 学习资源

- [Next.js 文档](https://nextjs.org/docs)
- [React 文档](https://react.dev)
- [Sass 文档](https://sass-lang.com/documentation)
- [TypeScript 文档](https://www.typescriptlang.org/docs)

## 许可证

MIT
