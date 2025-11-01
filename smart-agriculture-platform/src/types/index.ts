// 数据点类型
export type DataPoint = {
  date: string;
  temperature: number;
  humidity: number;
  microbialActivity: number;
  ndvi: number;
  isPrediction?: boolean;
};

// 地块类型
export type Field = {
  id: string;
  name: string;
  location: string;
  crop: string;
  area: number; // 单位：亩
  description: string;
  data: DataPoint[];
  predictions: DataPoint[];
};

// 统计数据
export type FieldStats = {
  avgTemperature: number;
  avgHumidity: number;
  avgMicrobialActivity: number;
  avgNdvi: number;
};
