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

// 施肥建议类型
export type FertilizerRecommendation = {
  type: string; // 肥料类型(如"有机肥"、"氮肥"、"磷肥"、"钾肥")
  dosage: string; // 建议用量(如"15-20kg/亩")
  timing: string; // 施肥时间(如"生长期前3天")
  reason: string; // 施肥原因
};

// 农药建议类型
export type PesticideRecommendation = {
  name: string; // 农药名称(如"多菌灵"、"吡虫啉")
  dosage: string; // 建议用量(如"稀释1000倍喷雾")
  timing: string; // 施药时间(如"早晨或傍晚")
  target: string; // 防治对象(如"预防真菌病害"、"蚜虫")
  precaution: string; // 注意事项
};

// 智能管理建议(综合)
export type ManagementRecommendation = {
  general: string[]; // 常规建议
  fertilizers: FertilizerRecommendation[]; // 施肥建议
  pesticides: PesticideRecommendation[]; // 农药建议
  irrigation: string[]; // 灌溉建议
};
