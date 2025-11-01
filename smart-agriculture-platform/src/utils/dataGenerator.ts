import { Field, DataPoint, FieldStats } from '../types';

/**
 * 生成带有自然波动的数据点
 */
function generateDataPoint(
  dayIndex: number,
  seed: number,
  isPrediction: boolean = false
): DataPoint {
  const date = new Date();
  date.setDate(date.getDate() - (isPrediction ? -dayIndex : 30 - dayIndex));

  // 使用 sin 函数模拟季节性变化 + 随机噪声
  const timePhase = dayIndex / 30 * Math.PI * 2;
  const randomFactor = Math.sin(seed * 100 + dayIndex) * 0.3 + 0.7;

  // 温度: 18-32°C，有日周期变化
  const baseTemp = 25 + Math.sin(timePhase) * 5;
  const temperature = parseFloat(
    (baseTemp + (Math.random() - 0.5) * 3 * randomFactor).toFixed(1)
  );

  // 湿度: 40-85%，与温度呈负相关
  const baseHumidity = 65 - Math.sin(timePhase) * 15;
  const humidity = parseFloat(
    (baseHumidity + (Math.random() - 0.5) * 10 * randomFactor).toFixed(1)
  );

  // 微生物活性: 0.3-0.9，受温度和湿度影响
  const baseMicrobial = 0.6 + Math.sin(timePhase + seed) * 0.2;
  const microbialActivity = parseFloat(
    (baseMicrobial + (Math.random() - 0.5) * 0.15 * randomFactor).toFixed(3)
  );

  // NDVI: 0.4-0.9，植被生长曲线
  const baseNdvi = 0.65 + Math.sin(timePhase * 0.5) * 0.2;
  const ndvi = parseFloat(
    (baseNdvi + (Math.random() - 0.5) * 0.1 * randomFactor).toFixed(3)
  );

  return {
    date: date.toISOString().split('T')[0],
    temperature: Math.max(15, Math.min(35, temperature)),
    humidity: Math.max(30, Math.min(90, humidity)),
    microbialActivity: Math.max(0.2, Math.min(1.0, microbialActivity)),
    ndvi: Math.max(0.3, Math.min(1.0, ndvi)),
    isPrediction,
  };
}

/**
 * 生成预测数据（基于历史数据的趋势）
 */
function generatePredictions(
  historicalData: DataPoint[],
  seed: number,
  days: number = 7
): DataPoint[] {
  const predictions: DataPoint[] = [];
  const recentData = historicalData.slice(-7); // 最近7天的数据

  // 计算趋势
  const avgTemp = recentData.reduce((sum, d) => sum + d.temperature, 0) / recentData.length;
  const avgHumidity = recentData.reduce((sum, d) => sum + d.humidity, 0) / recentData.length;
  const avgMicrobial = recentData.reduce((sum, d) => sum + d.microbialActivity, 0) / recentData.length;
  const avgNdvi = recentData.reduce((sum, d) => sum + d.ndvi, 0) / recentData.length;

  for (let i = 1; i <= days; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);

    // 预测数据有更小的波动
    const trendFactor = Math.sin(seed * 50 + i) * 0.5 + 0.5;

    predictions.push({
      date: date.toISOString().split('T')[0],
      temperature: parseFloat((avgTemp + (Math.random() - 0.5) * 2 * trendFactor).toFixed(1)),
      humidity: parseFloat((avgHumidity + (Math.random() - 0.5) * 5 * trendFactor).toFixed(1)),
      microbialActivity: parseFloat((avgMicrobial + (Math.random() - 0.5) * 0.08 * trendFactor).toFixed(3)),
      ndvi: parseFloat((avgNdvi + (Math.random() - 0.5) * 0.05 * trendFactor).toFixed(3)),
      isPrediction: true,
    });
  }

  return predictions;
}

/**
 * 生成单个地块的完整数据
 */
function generateFieldData(
  id: string,
  name: string,
  location: string,
  crop: string,
  area: number,
  description: string,
  seed: number
): Field {
  // 生成历史30天数据
  const historicalData: DataPoint[] = [];
  for (let i = 0; i < 30; i++) {
    historicalData.push(generateDataPoint(i, seed, false));
  }

  // 生成未来7天预测
  const predictions = generatePredictions(historicalData, seed, 7);

  return {
    id,
    name,
    location,
    crop,
    area,
    description,
    data: historicalData,
    predictions,
  };
}

/**
 * 生成所有地块数据
 */
export function generateAllFieldsData(): Field[] {
  return [
    generateFieldData(
      'field-1',
      '阳光示范田',
      '北纬 35.2° 东经 118.5°',
      '优质小麦',
      120,
      '采用节水灌溉技术的现代化示范田，土壤肥沃，光照充足。',
      1.23
    ),
    generateFieldData(
      'field-2',
      '西川水田',
      '北纬 34.8° 东经 119.2°',
      '有机水稻',
      95,
      '传统水稻种植区，水源充沛，生态环境优良，采用有机种植模式。',
      2.47
    ),
    generateFieldData(
      'field-3',
      '北岭试验田',
      '北纬 35.6° 东经 118.1°',
      '高产玉米',
      150,
      '高科技试验田，采用精准农业技术，配备智能监测系统和自动化设备。',
      3.89
    ),
  ];
}

/**
 * 计算地块统计数据
 */
export function calculateFieldStats(field: Field): FieldStats {
  const recentData = field.data.slice(-7); // 最近7天

  const avgTemperature = recentData.reduce((sum, d) => sum + d.temperature, 0) / recentData.length;
  const avgHumidity = recentData.reduce((sum, d) => sum + d.humidity, 0) / recentData.length;
  const avgMicrobialActivity = recentData.reduce((sum, d) => sum + d.microbialActivity, 0) / recentData.length;
  const avgNdvi = recentData.reduce((sum, d) => sum + d.ndvi, 0) / recentData.length;

  return {
    avgTemperature: parseFloat(avgTemperature.toFixed(1)),
    avgHumidity: parseFloat(avgHumidity.toFixed(1)),
    avgMicrobialActivity: parseFloat(avgMicrobialActivity.toFixed(3)),
    avgNdvi: parseFloat(avgNdvi.toFixed(3)),
  };
}

/**
 * 生成农田建议
 */
export function generateRecommendations(stats: FieldStats): string[] {
  const recommendations: string[] = [];

  // 温度建议
  if (stats.avgTemperature > 30) {
    recommendations.push('气温偏高，建议增加遮阳措施或调整灌溉时间至早晚');
  } else if (stats.avgTemperature < 18) {
    recommendations.push('气温偏低，注意防寒保暖，可考虑使用保温覆盖物');
  }

  // 湿度建议
  if (stats.avgHumidity < 50) {
    recommendations.push('土壤湿度偏低，建议增加灌溉频次，保持土壤湿润');
  } else if (stats.avgHumidity > 80) {
    recommendations.push('湿度过高，注意通风排水，预防病虫害发生');
  }

  // 微生物活性建议
  if (stats.avgMicrobialActivity < 0.5) {
    recommendations.push('微生物活性较低，建议施用有机肥料，增强土壤生物活性');
  } else if (stats.avgMicrobialActivity > 0.8) {
    recommendations.push('微生物活性良好，土壤生态系统健康，继续保持现有管理措施');
  }

  // NDVI 建议
  if (stats.avgNdvi < 0.5) {
    recommendations.push('植被指数偏低，关注作物生长状况，及时补充营养');
  } else if (stats.avgNdvi > 0.75) {
    recommendations.push('植被生长状况优良，作物长势良好，保持当前管理策略');
  }

  // 如果一切正常
  if (recommendations.length === 0) {
    recommendations.push('各项指标正常，继续保持良好的田间管理');
  }

  return recommendations;
}

/**
 * 导出数据为 CSV 格式
 */
export function exportToCSV(field: Field): string {
  const allData = [...field.data, ...field.predictions];

  let csv = 'Date,Temperature(°C),Humidity(%),Microbial Activity,NDVI,Type\n';

  allData.forEach(point => {
    csv += `${point.date},${point.temperature},${point.humidity},${point.microbialActivity},${point.ndvi},${point.isPrediction ? 'Prediction' : 'Historical'}\n`;
  });

  return csv;
}

/**
 * 触发文件下载
 */
export function downloadCSV(field: Field): void {
  const csv = exportToCSV(field);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `${field.name}_数据报告_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
