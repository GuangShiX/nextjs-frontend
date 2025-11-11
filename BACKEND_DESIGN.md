# 智慧云枢后端架构设计文档

## 📋 目录

1. [技术栈](#技术栈)
2. [数据库设计](#数据库设计)
3. [API 接口设计](#api-接口设计)
4. [项目结构](#项目结构)
5. [快速开始](#快速开始)
6. [部署说明](#部署说明)

---

## 🛠️ 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| **NestJS** | 10.x | Node.js 后端框架 |
| **PostgreSQL** | 15.x | 关系型数据库 |
| **TypeORM** | 0.3.x | ORM 框架 |
| **Joi** | 17.x | 数据验证 |
| **class-validator** | 0.14.x | DTO 验证 |
| **class-transformer** | 0.5.x | 数据转换 |

---

## 🗄️ 数据库设计

### 1. **fields 表 (农田信息)**

```sql
CREATE TABLE fields (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  location VARCHAR(200) NOT NULL,
  crop_type VARCHAR(50) NOT NULL,
  area DECIMAL(10, 2) NOT NULL COMMENT '面积(亩)',
  description TEXT,
  user_id VARCHAR(50) COMMENT '所属农户ID(预留字段)',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);

CREATE INDEX idx_fields_user_id ON fields(user_id);
CREATE INDEX idx_fields_created_at ON fields(created_at);
```

**示例数据:**

```sql
INSERT INTO fields (id, name, location, crop_type, area, description) VALUES
('field-1', '张家小麦田', '山东泰安·北纬 36.2° 东经 117.1°', '优质小麦', 15, '位于泰山脚下的小型家庭农场'),
('field-2', '李家水稻田', '湖北宜昌·北纬 30.7° 东经 111.3°', '有机水稻', 12, '三峡库区的梯田水稻种植区'),
('field-3', '王家山地玉米田', '云南昆明·北纬 25.0° 东经 102.7°', '高产玉米', 18, '高海拔山区农田(海拔约1900米)');
```

---

### 2. **field_data 表 (农田监测数据)**

```sql
CREATE TABLE field_data (
  id BIGSERIAL PRIMARY KEY,
  field_id VARCHAR(50) NOT NULL REFERENCES fields(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  temperature DECIMAL(4, 1) NOT NULL COMMENT '温度(°C)',
  humidity DECIMAL(5, 2) NOT NULL COMMENT '湿度(%)',
  microbial_activity DECIMAL(5, 3) NOT NULL COMMENT '微生物活性(0-1)',
  ndvi DECIMAL(5, 3) NOT NULL COMMENT '植被指数(0-1)',
  is_prediction BOOLEAN DEFAULT FALSE COMMENT '是否为预测数据',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_field_date (field_id, date)
);

CREATE INDEX idx_field_data_field_id ON field_data(field_id);
CREATE INDEX idx_field_data_date ON field_data(date);
CREATE INDEX idx_field_data_prediction ON field_data(is_prediction);
```

**设计说明:**
- `is_prediction = FALSE`: 历史监测数据
- `is_prediction = TRUE`: AI预测数据
- `date` 字段为日期主键,保证每个农田每天只有一条数据

---

### 3. **recommendations 表 (智能决策建议)**

```sql
CREATE TABLE recommendations (
  id BIGSERIAL PRIMARY KEY,
  field_id VARCHAR(50) NOT NULL REFERENCES fields(id) ON DELETE CASCADE,
  recommendation_type VARCHAR(20) NOT NULL COMMENT '建议类型: fertilizer/pesticide/irrigation/general',
  category VARCHAR(50) COMMENT '分类(如肥料类型、农药名称)',
  dosage VARCHAR(100) COMMENT '用量',
  timing VARCHAR(100) COMMENT '时间',
  reason TEXT COMMENT '原因/说明',
  target VARCHAR(100) COMMENT '防治对象(农药专用)',
  precaution TEXT COMMENT '注意事项(农药专用)',
  generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE COMMENT '是否有效(用于历史记录)'
);

CREATE INDEX idx_recommendations_field_id ON recommendations(field_id);
CREATE INDEX idx_recommendations_type ON recommendations(recommendation_type);
CREATE INDEX idx_recommendations_generated_at ON recommendations(generated_at);
```

**recommendation_type 枚举值:**
- `fertilizer`: 施肥建议
- `pesticide`: 农药建议
- `irrigation`: 灌溉建议
- `general`: 综合建议

---

### 4. **prediction_models 表 (预测模型配置)**

```sql
CREATE TABLE prediction_models (
  id SERIAL PRIMARY KEY,
  model_name VARCHAR(100) NOT NULL UNIQUE COMMENT '模型名称',
  model_version VARCHAR(20) NOT NULL COMMENT '模型版本',
  model_type VARCHAR(50) NOT NULL COMMENT '模型类型: ARIMA/LSTM/RandomForest',
  accuracy DECIMAL(5, 2) COMMENT '准确率(%)',
  hyperparameters JSON COMMENT '超参数(JSON格式)',
  training_data_range VARCHAR(100) COMMENT '训练数据范围',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO prediction_models (model_name, model_version, model_type, accuracy) VALUES
('环境预测模型v1', '1.0.0', 'LSTM', 98.00),
('作物生长预测模型v1', '1.0.0', 'RandomForest', 95.50);
```

---

## 🚀 API 接口设计

### **基础 URL**

```
http://localhost:3000/api/v1
```

---

### **1. 农田管理接口**

#### **1.1 获取所有农田**

```http
GET /fields
```

**查询参数:**
- `user_id` (可选): 用户ID
- `is_active` (可选): 是否激活 (默认 true)

**响应示例:**

```json
{
  "success": true,
  "data": [
    {
      "id": "field-1",
      "name": "张家小麦田",
      "location": "山东泰安·北纬 36.2° 东经 117.1°",
      "cropType": "优质小麦",
      "area": 15,
      "description": "位于泰山脚下的小型家庭农场",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-10T00:00:00.000Z"
    }
  ],
  "total": 3
}
```

---

#### **1.2 获取单个农田详情**

```http
GET /fields/:id
```

**响应示例:**

```json
{
  "success": true,
  "data": {
    "id": "field-1",
    "name": "张家小麦田",
    "location": "山东泰安·北纬 36.2° 东经 117.1°",
    "cropType": "优质小麦",
    "area": 15,
    "description": "位于泰山脚下的小型家庭农场",
    "data": [
      {
        "date": "2025-01-01",
        "temperature": 22.5,
        "humidity": 65.5,
        "microbialActivity": 0.75,
        "ndvi": 0.82,
        "isPrediction": false
      }
    ],
    "predictions": [
      {
        "date": "2025-01-11",
        "temperature": 23.0,
        "humidity": 63.0,
        "microbialActivity": 0.78,
        "ndvi": 0.85,
        "isPrediction": true
      }
    ]
  }
}
```

---

#### **1.3 创建农田**

```http
POST /fields
```

**请求体:**

```json
{
  "id": "field-4",
  "name": "赵家蔬菜大棚",
  "location": "北京大兴·北纬 39.7° 东经 116.3°",
  "cropType": "有机蔬菜",
  "area": 8,
  "description": "现代化智能温室大棚",
  "userId": "user-001"
}
```

---

### **2. 监测数据接口**

#### **2.1 获取农田历史数据**

```http
GET /field-data/:fieldId
```

**查询参数:**
- `startDate` (可选): 开始日期 (YYYY-MM-DD)
- `endDate` (可选): 结束日期 (YYYY-MM-DD)
- `isPrediction` (可选): 是否为预测数据 (默认 false)

**响应示例:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "fieldId": "field-1",
      "date": "2025-01-01",
      "temperature": 22.5,
      "humidity": 65.5,
      "microbialActivity": 0.75,
      "ndvi": 0.82,
      "isPrediction": false,
      "createdAt": "2025-01-01T08:00:00.000Z"
    }
  ],
  "total": 30
}
```

---

#### **2.2 批量插入监测数据**

```http
POST /field-data/batch
```

**请求体:**

```json
{
  "fieldId": "field-1",
  "data": [
    {
      "date": "2025-01-01",
      "temperature": 22.5,
      "humidity": 65.5,
      "microbialActivity": 0.75,
      "ndvi": 0.82
    },
    {
      "date": "2025-01-02",
      "temperature": 23.0,
      "humidity": 64.0,
      "microbialActivity": 0.76,
      "ndvi": 0.83
    }
  ]
}
```

---

### **3. 预测数据接口**

#### **3.1 生成预测数据**

```http
POST /predictions/:fieldId
```

**查询参数:**
- `days` (可选): 预测天数 (默认 7, 最大 30)
- `modelName` (可选): 模型名称 (默认使用最新版本)

**响应示例:**

```json
{
  "success": true,
  "message": "预测数据生成成功",
  "data": {
    "fieldId": "field-1",
    "modelName": "环境预测模型v1",
    "modelVersion": "1.0.0",
    "accuracy": 98.0,
    "predictions": [
      {
        "date": "2025-01-11",
        "temperature": 23.0,
        "humidity": 63.0,
        "microbialActivity": 0.78,
        "ndvi": 0.85,
        "isPrediction": true
      }
    ]
  }
}
```

---

### **4. 智能建议接口**

#### **4.1 生成智能管理建议**

```http
POST /recommendations/:fieldId
```

**请求体(可选):**

```json
{
  "forceRegenerate": true,
  "basedOnDays": 7
}
```

**响应示例:**

```json
{
  "success": true,
  "data": {
    "fieldId": "field-1",
    "fieldName": "张家小麦田",
    "cropType": "优质小麦",
    "generatedAt": "2025-01-10T10:00:00.000Z",
    "stats": {
      "avgTemperature": 24.5,
      "avgHumidity": 62.3,
      "avgMicrobialActivity": 0.76,
      "avgNdvi": 0.84
    },
    "recommendations": {
      "general": [
        "各项指标正常，继续保持良好的田间管理"
      ],
      "fertilizers": [
        {
          "type": "尿素(含氮46%)",
          "dosage": "6-8 kg/亩",
          "timing": "拔节期至孕穗期",
          "reason": "小麦拔节期需大量氮素促进穗分化"
        }
      ],
      "pesticides": [
        {
          "name": "苦参碱水剂(生物农药)",
          "dosage": "0.3%苦参碱 100-150ml/亩，稀释500-800倍喷雾",
          "timing": "生长期每隔10-15天预防性喷施",
          "target": "预防多种害虫(蚜虫、红蜘蛛、小菜蛾)",
          "precaution": "生物农药，对环境友好，对人畜安全，可用于有机农业"
        }
      ],
      "irrigation": [
        "土壤湿度适宜(当前 62.3%)，保持正常灌溉节奏",
        "根据作物需水特性和天气预报灵活调整"
      ]
    }
  }
}
```

---

#### **4.2 获取历史建议**

```http
GET /recommendations/:fieldId
```

**查询参数:**
- `startDate` (可选): 开始日期
- `endDate` (可选): 结束日期
- `type` (可选): 建议类型 (fertilizer/pesticide/irrigation/general)

---

### **5. 统计分析接口**

#### **5.1 获取农田统计数据**

```http
GET /analytics/:fieldId/stats
```

**查询参数:**
- `days` (可选): 统计天数 (默认 7)

**响应示例:**

```json
{
  "success": true,
  "data": {
    "fieldId": "field-1",
    "period": "最近7天",
    "stats": {
      "avgTemperature": 24.5,
      "minTemperature": 18.2,
      "maxTemperature": 30.1,
      "avgHumidity": 62.3,
      "avgMicrobialActivity": 0.76,
      "avgNdvi": 0.84
    },
    "trend": {
      "temperatureTrend": "上升",
      "humidityTrend": "稳定",
      "microbialActivityTrend": "上升",
      "ndviTrend": "上升"
    }
  }
}
```

---

## 📂 项目结构

```
backend/
├── src/
│   ├── modules/
│   │   ├── fields/                    # 农田管理模块
│   │   │   ├── dto/
│   │   │   │   ├── create-field.dto.ts
│   │   │   │   ├── update-field.dto.ts
│   │   │   │   └── query-field.dto.ts
│   │   │   ├── entities/
│   │   │   │   └── field.entity.ts
│   │   │   ├── fields.controller.ts
│   │   │   ├── fields.service.ts
│   │   │   └── fields.module.ts
│   │   │
│   │   ├── field-data/                # 监测数据模块
│   │   │   ├── dto/
│   │   │   │   ├── create-field-data.dto.ts
│   │   │   │   └── batch-insert.dto.ts
│   │   │   ├── entities/
│   │   │   │   └── field-data.entity.ts
│   │   │   ├── field-data.controller.ts
│   │   │   ├── field-data.service.ts
│   │   │   └── field-data.module.ts
│   │   │
│   │   ├── predictions/               # 预测数据模块
│   │   │   ├── dto/
│   │   │   │   └── generate-prediction.dto.ts
│   │   │   ├── predictions.controller.ts
│   │   │   ├── predictions.service.ts
│   │   │   └── predictions.module.ts
│   │   │
│   │   ├── recommendations/           # 智能建议模块
│   │   │   ├── dto/
│   │   │   │   ├── create-recommendation.dto.ts
│   │   │   │   └── generate-recommendation.dto.ts
│   │   │   ├── entities/
│   │   │   │   └── recommendation.entity.ts
│   │   │   ├── recommendations.controller.ts
│   │   │   ├── recommendations.service.ts
│   │   │   └── recommendations.module.ts
│   │   │
│   │   └── analytics/                 # 统计分析模块
│   │       ├── analytics.controller.ts
│   │       ├── analytics.service.ts
│   │       └── analytics.module.ts
│   │
│   ├── common/
│   │   ├── filters/                   # 异常过滤器
│   │   │   └── http-exception.filter.ts
│   │   ├── interceptors/              # 拦截器
│   │   │   ├── transform.interceptor.ts   # 响应转换
│   │   │   └── logging.interceptor.ts     # 日志记录
│   │   ├── guards/                    # 守卫(认证授权)
│   │   │   └── auth.guard.ts
│   │   ├── decorators/                # 自定义装饰器
│   │   │   └── user.decorator.ts
│   │   └── utils/
│   │       ├── response.util.ts       # 统一响应格式
│   │       └── date.util.ts           # 日期工具
│   │
│   ├── config/
│   │   ├── database.config.ts         # 数据库配置
│   │   ├── app.config.ts              # 应用配置
│   │   └── typeorm.config.ts          # TypeORM配置
│   │
│   ├── migrations/                    # 数据库迁移文件
│   │   ├── 1704067200000-CreateFieldsTable.ts
│   │   ├── 1704067300000-CreateFieldDataTable.ts
│   │   └── 1704067400000-CreateRecommendationsTable.ts
│   │
│   ├── app.module.ts
│   └── main.ts
│
├── .env.example                       # 环境变量示例
├── .gitignore
├── package.json
├── tsconfig.json
├── nest-cli.json
└── README.md
```

---

## 🚀 快速开始

### **1. 安装依赖**

```bash
npm install
```

### **2. 配置环境变量**

创建 `.env` 文件:

```env
# 应用配置
NODE_ENV=development
PORT=3000
API_PREFIX=api/v1

# 数据库配置
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=zhinong_cloud

# TypeORM 配置
TYPEORM_SYNCHRONIZE=false
TYPEORM_LOGGING=true

# JWT 配置(预留)
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# CORS 配置
CORS_ORIGIN=http://localhost:5173
```

### **3. 初始化数据库**

```bash
# 运行 SQL 脚本创建表
psql -U postgres -d zhinong_cloud -f migrations/init.sql

# 或使用 TypeORM 迁移
npm run migration:run
```

### **4. 启动开发服务器**

```bash
npm run start:dev
```

访问 http://localhost:3000/api/v1

---

## 📦 部署说明

### **1. 生产环境构建**

```bash
npm run build
```

### **2. 使用 PM2 部署**

```bash
pm2 start dist/main.js --name zhinong-backend
```

### **3. Docker 部署**

```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3000
CMD ["node", "dist/main.js"]
```

```bash
docker build -t zhinong-backend .
docker run -d -p 3000:3000 --env-file .env zhinong-backend
```

---

## 🔐 安全建议

1. **API 认证**: 集成 JWT 认证机制
2. **速率限制**: 使用 @nestjs/throttler 防止 DDoS
3. **输入验证**: 所有 DTO 使用 class-validator 严格验证
4. **SQL 注入防护**: TypeORM 自动参数化查询
5. **CORS 配置**: 仅允许前端域名访问
6. **环境变量**: 敏感信息存储在 .env 文件中

---

## 📊 性能优化

1. **数据库索引**: 已在高频查询字段上建立索引
2. **查询优化**: 使用 select 语句仅查询需要的字段
3. **缓存策略**: 可集成 Redis 缓存热点数据
4. **分页查询**: 大数据量查询使用分页避免内存溢出
5. **连接池**: PostgreSQL 连接池配置 (max: 20, min: 5)

---

## 📝 开发注意事项

1. **代码规范**: 遵循 NestJS 官方最佳实践
2. **错误处理**: 所有异常使用 HTTP 异常过滤器统一处理
3. **日志记录**: 使用 Winston 记录详细日志
4. **测试覆盖**: 单元测试覆盖率 >80%
5. **API 文档**: 使用 Swagger 生成 API 文档

---

**文档版本**: v1.0.0
**最后更新**: 2025-01-10
**维护者**: ZhiNong Cloud Core Team
