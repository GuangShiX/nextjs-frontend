# 智慧农业平台 - 统一设计规范

本文档记录了平台的统一布局和设计规范，确保在所有设备上提供一致的用户体验。

## 设计原则

- **响应式优先**：所有组件在移动端、平板和桌面设备上均有优化
- **统一间距**：使用标准化的间距系统，避免视觉混乱
- **科技感仪表盘**：玻璃拟态效果 + 渐变色 + 动画，呈现现代科技感

## 容器规范

### 主容器 (Page Container)
```jsx
className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-24 md:pt-32 pb-16 md:pb-24"
```

- **最大宽度**: `max-w-7xl` (1280px)
- **水平内边距**:
  - 移动端: `px-4` (16px)
  - 小屏幕: `sm:px-6` (24px)
  - 中屏幕: `lg:px-8` (32px)
  - 大屏幕: `xl:px-12` (48px)
- **垂直内边距**:
  - 顶部: `pt-24 md:pt-32` (96px / 128px)
  - 底部: `pb-16 md:pb-24` (64px / 96px)

### Header 容器
```jsx
className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-4"
```

### Footer 容器
```jsx
className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6"
```

## 栅格规范

### 主要栅格间距
用于页面级别的模块之间：
```jsx
gap-4 md:gap-6  // 或 gap-6 md:gap-8
```

### 次要栅格间距
用于卡片内部的子元素：
```jsx
gap-3 md:gap-4
```

### 微小栅格间距
用于紧密排列的小元素：
```jsx
gap-2.5 md:gap-3
```

## 模块间距规范

### 大节距
用于页面主要区块之间：
```jsx
mb-12 md:mb-16  // 或 mb-16 md:mb-20
```

### 中节距
用于相关模块之间：
```jsx
mb-8 md:mb-12
```

### 小节距
用于紧密相关的内容：
```jsx
mb-6 md:mb-8
```

## 卡片内边距规范

### 大卡片 (Glass Card)
```jsx
p-6 md:p-8  // 主要页面卡片
p-5 md:p-6  // 次要卡片/组件
```

### 小卡片 (Inner Cards)
```jsx
p-3.5 md:p-4  // 指标卡片
p-2.5 md:p-3  // 微小卡片/统计项
```

## 响应式断点

遵循 Tailwind CSS 默认断点：
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

## 文件修改清单

### 全局布局
- ✅ `src/App.tsx` - 移除 `ml-[10%]`，实现居中对齐

### 页面文件
- ✅ `src/pages/Home.tsx` - 统一容器和模块间距
- ✅ `src/pages/About.tsx` - 统一容器和卡片内边距
- ✅ `src/pages/FieldDetail.tsx` - 统一容器和栅格间距

### 组件文件
- ✅ `src/components/Header.tsx` - 统一导航容器
- ✅ `src/components/Footer.tsx` - 统一页脚容器和间距
- ✅ `src/components/FieldCard.tsx` - 统一卡片和内部小卡片内边距
- ✅ `src/components/LineChartPanel.tsx` - 统一图表面板内边距
- ✅ `src/components/RecommendationPanel.tsx` - 统一建议面板内边距

## 关键变更说明

### 1. 移除左侧偏移
**之前**: `ml-[10%]` 导致左边内容贴边，右侧留白过多
**现在**: 居中对齐，左右对称的内边距

### 2. 统一容器宽度
**之前**: 使用 `container` 类，宽度不一致
**现在**: 统一使用 `max-w-7xl`，确保版心一致

### 3. 响应式内边距
**之前**: 固定 `px-6` 或 `p-8`
**现在**: 响应式内边距，移动端更紧凑，桌面端更宽敞

### 4. 卡片内边距优化
**之前**: 所有卡片都使用相同的内边距
**现在**: 根据卡片大小和层级使用不同的内边距规范

### 5. 统一模块间距
**之前**: 不同页面使用 `mb-8`, `mb-12`, `mb-16`, `mb-20` 混用
**现在**: 标准化为三个级别（大/中/小节距）

## 使用示例

### 创建新页面
```jsx
<div className="relative">
  <ParticleBackground />

  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-24 md:pt-32 pb-16 md:pb-24">
    {/* 标题区 */}
    <div className="text-center mb-12 md:mb-16">
      <h1 className="text-5xl font-bold gradient-text">页面标题</h1>
    </div>

    {/* 主要内容区 */}
    <div className="glass-card p-6 md:p-8 mb-8 md:mb-12">
      {/* 卡片内容 */}
    </div>
  </div>
</div>
```

### 创建栅格布局
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
  {items.map(item => (
    <div key={item.id} className="glass-card p-5 md:p-6">
      {/* 卡片内容 */}
    </div>
  ))}
</div>
```

### 创建内部小卡片
```jsx
<div className="grid grid-cols-2 gap-3 md:gap-4">
  <div className="bg-white/5 p-3.5 md:p-4 rounded-lg border border-white/10">
    {/* 小卡片内容 */}
  </div>
</div>
```

## 测试清单

- [ ] 移动端 (< 640px) - 内容不应贴边，左右有适当内边距
- [ ] 平板 (640px - 1024px) - 布局合理，间距适中
- [ ] 桌面 (> 1024px) - 版心居中，左右对称
- [ ] 卡片圆角 - 文字不应被圆角遮挡
- [ ] 模块间距 - 各模块之间有统一的呼吸感
- [ ] 跨页面一致性 - 所有页面的容器宽度和内边距保持一致

## 维护建议

1. **新增页面时**，复制现有页面的容器结构
2. **新增卡片时**，根据卡片大小选择合适的内边距规范
3. **调整间距时**，优先使用本文档定义的标准间距值
4. **避免使用**任意的固定像素值（如 `ml-[10%]`）

---

**最后更新**: 2025-11-02
**维护者**: Claude (Droid)
