# GPT 项目协作指南 - 智慧农业预测平台

> **文档目的**：帮助 ChatGPT/GPT-4 快速理解项目架构、技术栈和协作规范，实现高效代码生成与问题解决。

---

## 🎯 项目核心信息速览

| 项目属性 | 详情 |
|---------|------|
| **项目名称** | 智慧农业预测平台 (Smart Agriculture Platform) |
| **项目类型** | React 单页应用（SPA） - 前端项目 |
| **主要技术栈** | React 19 + TypeScript + Vite + Tailwind CSS + Sass |
| **数据可视化** | Recharts（图表库） |
| **当前状态** | MVP 阶段，使用前端模拟数据（无真实后端） |
| **核心功能** | 农田数据可视化、智能建议生成、数据导出（CSV） |
| **代码规模** | ~3,263 行（TS: 1,590 行 + 样式: 1,673 行） |

---

## 📁 项目结构速查

```
smart-agriculture-platform/
├── src/
│   ├── components/          # UI 组件库
│   │   ├── ui/             # 基础组件（Card）
│   │   ├── Header.tsx      # 导航栏
│   │   ├── FieldCard.tsx   # 农田卡片
│   │   ├── LineChartPanel.tsx      # 图表面板
│   │   ├── RecommendationPanel.tsx # 建议面板
│   │   └── ParticleBackground.tsx  # 粒子背景
│   ├── pages/              # 页面组件（路由）
│   │   ├── Home.tsx        # 首页 - 农田列表
│   │   ├── FieldDetail.tsx # 详情页 - 图表分析
│   │   └── About.tsx       # 关于页
│   ├── types/
│   │   └── index.ts        # 全局 TypeScript 类型定义
│   ├── utils/
│   │   └── dataGenerator.ts # 数据生成与处理工具
│   ├── styles/
│   │   └── _variables.scss  # SCSS 全局变量
│   ├── App.tsx             # 应用根组件（路由配置）
│   ├── main.tsx            # 应用入口
│   └── index.css           # 全局样式（Tailwind + 自定义）
├── package.json            # 项目配置和依赖
├── vite.config.ts          # Vite 构建配置
├── tsconfig.json           # TypeScript 配置
└── tailwind.config.js      # Tailwind CSS 主题配置
```

---

## 🛠️ 技术栈详解

### 核心框架

```json
{
  "react": "^19.1.1",           // 最新 React
  "react-dom": "^19.1.1",
  "react-router-dom": "^7.9.5", // 客户端路由
  "typescript": "~5.9.3"        // 严格类型检查
}
```

### 构建工具

```json
{
  "vite": "^7.1.7",                    // 极速构建 + HMR
  "@vitejs/plugin-react": "^5.0.4"    // React 官方插件
}
```

### 样式方案（三层架构）

```json
{
  "tailwindcss": "^4.1.16",   // 原子化 CSS（布局、间距、颜色）
  "sass": "^1.93.3",          // SCSS 模块化样式（复杂组件）
  "postcss": "^8.5.6"         // CSS 后处理
}
```

### 数据可视化 & 动画

```json
{
  "recharts": "^3.3.0",             // React 图表库
  "@tsparticles/react": "^3.0.0",   // 粒子背景动画
  "papaparse": "^5.5.3"             // CSV 生成/解析
}
```

---

## 📊 核心数据模型

### TypeScript 类型定义（src/types/index.ts）

```typescript
/**
 * 单日监测数据点
 */
export type DataPoint = {
  date: string;                 // 日期 (ISO 8601: YYYY-MM-DD)
  temperature: number;          // 温度 (°C, 范围: 15-35)
  humidity: number;             // 土壤湿度 (%, 范围: 30-90)
  microbialActivity: number;    // 微生物活性 (0-1)
  ndvi: number;                 // 植被指数 (0-1)
  isPrediction?: boolean;       // 是否为预测数据
};

/**
 * 农田实体
 */
export type Field = {
  id: string;                   // 唯一标识 (field-1, field-2...)
  name: string;                 // 农田名称
  location: string;             // 地理位置
  crop: string;                 // 种植作物
  area: number;                 // 面积 (亩)
  description: string;          // 描述信息
  data: DataPoint[];            // 历史数据 (30天)
  predictions: DataPoint[];     // 预测数据 (7天)
};

/**
 * 统计数据（基于最近7天）
 */
export type FieldStats = {
  avgTemperature: number;
  avgHumidity: number;
  avgMicrobialActivity: number;
  avgNdvi: number;
};
```

---

## 🎨 代码风格规范（重要！）

### 1. TypeScript 严格模式

**✅ 必须遵守：**

```typescript
// ✅ 正确：显式类型定义
interface ComponentProps {
  field: Field;
  onExport?: () => void;
}

const Component = ({ field, onExport }: ComponentProps): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  // ...
};

// ❌ 禁止：使用 any
const getData = (data: any) => { /* ... */ };

// ❌ 禁止：隐式类型
const [items, setItems] = useState([]); // 类型为 never[]
```

### 2. React 组件规范

```typescript
// ✅ 推荐：函数组件 + 箭头函数
const FieldCard = ({ field }: FieldCardProps): JSX.Element => {
  // Hooks 在组件顶部
  const [expanded, setExpanded] = useState(false);

  // 事件处理器命名：handle<动作>
  const handleClick = () => {
    setExpanded(!expanded);
  };

  return <div>{/* ... */}</div>;
};

// ❌ 避免：类组件（除非必要）
class FieldCard extends React.Component { /* ... */ }
```

### 3. 样式使用规范

**三层样式选择规则：**

```typescript
// 层1：简单样式 → Tailwind 原子类
<div className="flex items-center gap-4 p-6 bg-dark rounded-xl">

// 层2：复杂样式 → SCSS 模块
import styles from './FieldCard.module.scss';
<div className={styles.fieldCard}>

// 层3：全局样式 → src/index.css（主题色、动画关键帧）
// 不要在组件中直接修改
```

**SCSS 命名规范：**

```scss
// ✅ 正确：camelCase（与 CSS Modules 兼容）
.fieldCard {
  &:hover {
    transform: scale(1.02);
  }
}

// ❌ 错误：kebab-case（导入困难）
.field-card { /* ... */ }
```

### 4. 命名约定

| 类型 | 规范 | 示例 |
|------|------|------|
| 组件 | PascalCase | `FieldCard`, `LineChartPanel` |
| 函数/变量 | camelCase | `generateData`, `fieldStats` |
| 常量 | UPPER_SNAKE_CASE | `MAX_DATA_POINTS` |
| 类型/接口 | PascalCase | `Field`, `DataPoint`, `FieldCardProps` |
| CSS 类 | camelCase | `.fieldCard`, `.cardBody` |

---

## 🔧 常用开发命令

```bash
# 启动开发服务器（HMR 热重载）
npm run dev
# → 访问 http://localhost:5173

# 代码检查（ESLint）
npm run lint

# 构建生产版本
npm run build
# → 输出到 dist/ 目录

# 预览构建结果
npm run preview

# TypeScript 类型检查
npx tsc --noEmit
```

---

## 🚀 核心功能实现逻辑

### 1. 数据生成（src/utils/dataGenerator.ts）

**关键函数：**

```typescript
// 生成所有农田数据（3个示例农田）
export const generateAllFieldsData = (): Field[] => {
  // 返回 3 个农田：阳光示范田、西川水田、北岭试验田
};

// 生成单个农田数据（30天历史 + 7天预测）
export const generateFieldData = (
  id: string,
  name: string,
  location: string,
  crop: string,
  area: number,
  description: string,
  seed: number
): Field => { /* ... */ };

// 计算统计指标（基于最近7天）
export const calculateFieldStats = (field: Field): FieldStats => {
  const recentData = field.data.slice(-7);
  // 计算平均值...
};

// 生成智能建议（基于阈值规则）
export const generateRecommendations = (stats: FieldStats): string[] => {
  const recommendations = [];
  if (stats.avgHumidity < 35) {
    recommendations.push("建议增加灌溉频次...");
  }
  // ... 更多规则
  return recommendations;
};

// 导出 CSV
export const downloadCSV = (field: Field): void => {
  const csv = Papa.unparse(/* ... */);
  // 触发浏览器下载
};
```

**智能建议规则：**

| 条件 | 建议 |
|------|------|
| `avgHumidity < 35%` | 增加灌溉频次 |
| `avgHumidity > 75%` | 注意排水 |
| `avgTemperature > 30°C` | 清晨或傍晚灌溉 |
| `avgMicrobialActivity < 0.5` | 施用有机肥 |
| `avgNdvi < 0.4` | 检查作物生长，考虑追肥 |

### 2. 路由配置（src/App.tsx）

```typescript
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/field/:id" element={<FieldDetail />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
```

### 3. 页面数据流

**Home 页面：**

```typescript
const Home = () => {
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const data = generateAllFieldsData(); // 生成模拟数据
      setFields(data);
      setLoading(false);
    }, 1000); // 模拟加载延迟
  }, []);

  return (
    <div>
      {fields.map(field => (
        <FieldCard key={field.id} field={field} />
      ))}
    </div>
  );
};
```

**FieldDetail 页面：**

```typescript
const FieldDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [field, setField] = useState<Field | null>(null);

  useEffect(() => {
    const fields = generateAllFieldsData();
    const found = fields.find(f => f.id === id);
    setField(found);
  }, [id]);

  const stats = useMemo(() =>
    field ? calculateFieldStats(field) : null
  , [field]);

  return (
    <div>
      {/* 4个图表 */}
      <LineChartPanel data={field.data} predictions={field.predictions} />
      {/* 建议面板 */}
      <RecommendationPanel stats={stats} />
    </div>
  );
};
```

---

## ⚠️ 常见陷阱与注意事项

### 1. TypeScript 陷阱

```typescript
// ❌ 错误：初始值为空数组，推断为 never[]
const [fields, setFields] = useState([]);

// ✅ 正确：显式指定类型
const [fields, setFields] = useState<Field[]>([]);
```

### 2. React Hooks 依赖

```typescript
// ❌ 错误：缺少 id 依赖，数据不会更新
useEffect(() => {
  fetchData(id);
}, []);

// ✅ 正确：包含所有依赖
useEffect(() => {
  fetchData(id);
}, [id]);
```

### 3. 样式冲突

```typescript
// ❌ 错误：Tailwind 类名不会覆盖
<div className="p-4 p-6"> // 最终 padding: 1rem（p-4）

// ✅ 正确：使用条件类名
<div className={isLarge ? "p-6" : "p-4"}>
```

### 4. 路由参数检查

```typescript
// ❌ 错误：id 可能为 undefined
const { id } = useParams();
const field = fields.find(f => f.id === id);

// ✅ 正确：检查并提供默认处理
const { id } = useParams<{ id: string }>();
if (!id) return <div>无效的农田 ID</div>;
```

---

## 🎯 GPT 协作时的关键原则

### 1. 类型安全优先

**生成代码时必须：**
- ✅ 所有变量/参数有明确类型
- ✅ 无 `any` 类型（除非有注释说明）
- ✅ Props 接口完整定义

### 2. 遵守样式分层

```typescript
// ✅ 简单布局 → Tailwind
<div className="flex gap-4 p-6">

// ✅ 复杂样式 → SCSS 模块
import styles from './Component.module.scss';
<div className={styles.component}>
```

### 3. 数据模拟规则

当前项目**无真实后端**，数据生成规则：
- 使用 `generateAllFieldsData()` 获取模拟数据
- 温度：15-35°C
- 湿度：30-90%
- 微生物活性：0.2-1.0
- NDVI：0.3-1.0
- 预测数据：基于最近7天历史数据生成

### 4. 性能考虑

```typescript
// ✅ 缓存计算结果
const stats = useMemo(() => calculateFieldStats(field), [field]);

// ✅ 缓存函数引用
const handleExport = useCallback(() => downloadCSV(field), [field]);

// ✅ 避免不必要的重渲染
export const FieldCard = React.memo(({ field }: FieldCardProps) => {
  // ...
});
```

### 5. 错误处理

```typescript
// ✅ 边界情况检查
if (!field) return <div>加载中...</div>;
if (!id) return <div>无效的参数</div>;

// ✅ 空数组/null 处理
const recentData = field?.data?.slice(-7) ?? [];
```

---

## 📋 代码生成检查清单

当 GPT 生成代码后，必须满足：

### 代码质量
- [ ] TypeScript 类型完整（无 `any`）
- [ ] ESLint 规则通过
- [ ] 组件有 Props 接口定义
- [ ] 复杂逻辑有注释

### 功能正确性
- [ ] 边界情况处理（null、undefined、空数组）
- [ ] 异步操作有错误处理
- [ ] 数据验证（范围、格式）

### 样式规范
- [ ] 简单样式用 Tailwind
- [ ] 复杂样式用 SCSS 模块
- [ ] CSS 类名用 camelCase

### 性能优化
- [ ] 使用 useMemo 缓存计算
- [ ] 使用 useCallback 缓存函数
- [ ] 避免不必要的重渲染

---

## 🚨 禁止操作清单

**未经确认不得执行：**

1. ❌ 修改配置文件（`vite.config.ts`, `tsconfig.json`, `eslint.config.js`）
2. ❌ 修改全局样式（`src/index.css`, `tailwind.config.js`, `_variables.scss`）
3. ❌ 修改核心数据逻辑（`src/utils/dataGenerator.ts`）
4. ❌ 修改全局类型定义（`src/types/index.ts` 中的现有类型）
5. ❌ 添加新依赖（`package.json`）

**需要执行以上操作时：**
1. 说明原因和影响范围
2. 提供多个方案供选择
3. 等待用户明确批准

---

## 💡 常见任务快速参考

### 添加新页面

```typescript
// 1. 创建页面组件
// src/pages/NewPage.tsx
const NewPage = (): JSX.Element => {
  return <div>新页面内容</div>;
};
export default NewPage;

// 2. 添加路由
// src/App.tsx
<Route path="/new-page" element={<NewPage />} />

// 3. 添加导航链接
// src/components/Header.tsx
<Link to="/new-page">新页面</Link>
```

### 添加新组件

```typescript
// 1. 创建组件文件
// src/components/NewComponent.tsx
interface NewComponentProps {
  data: SomeType;
}

const NewComponent = ({ data }: NewComponentProps): JSX.Element => {
  return <div>{/* ... */}</div>;
};

export default NewComponent;

// 2. 创建样式文件（如需要）
// src/components/NewComponent.module.scss
.newComponent {
  // 样式...
}

// 3. 在页面中使用
import NewComponent from '@/components/NewComponent';
<NewComponent data={someData} />
```

### 添加新工具函数

```typescript
// src/utils/helper.ts
export const calculateSomething = (input: number): number => {
  // 计算逻辑...
  return result;
};

// 使用
import { calculateSomething } from '@/utils/helper';
const result = calculateSomething(10);
```

### 添加新类型

```typescript
// src/types/index.ts
export type NewType = {
  field1: string;
  field2: number;
};

// 使用
import { NewType } from '@/types';
const data: NewType = { field1: 'test', field2: 123 };
```

---

## 🔍 调试与排查

### 常见问题解决

**问题 1：页面空白**
```bash
# 检查控制台错误
# 检查路由配置是否正确
# 检查组件是否正确导入/导出
```

**问题 2：类型错误**
```bash
# 运行类型检查
npx tsc --noEmit

# 确保所有变量有明确类型
# 检查 Props 接口定义
```

**问题 3：样式不生效**
```bash
# 检查 Tailwind 类名拼写
# 检查 SCSS 模块导入
# 检查样式优先级（全局 vs 局部）
```

**问题 4：数据不更新**
```bash
# 检查 useEffect 依赖数组
# 检查 state 更新逻辑
# 检查是否需要 useMemo/useCallback
```

---

## 📚 快速链接

- **React 文档**: https://react.dev/
- **TypeScript 手册**: https://www.typescriptlang.org/docs/
- **Vite 文档**: https://vitejs.dev/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Recharts**: https://recharts.org/en-US/

---

## 🎓 总结：GPT 协作要点

1. **严格遵守 TypeScript 类型规范**（无 `any`）
2. **遵循三层样式架构**（全局 CSS → Tailwind → SCSS 模块）
3. **使用驼峰命名**（组件 PascalCase / 函数 camelCase）
4. **性能优化**（useMemo、useCallback、React.memo）
5. **边界情况处理**（null、undefined、空数组）
6. **禁止修改配置文件**（除非明确批准）
7. **生成代码前检查清单**（类型、规范、性能）

---

**本文档由 Claude 生成，专为 GPT 协作优化。如有疑问请参考 README.md 和 CLAUDE.md。**

**最后更新：2025-11-10**
