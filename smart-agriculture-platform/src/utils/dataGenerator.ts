import { Field, DataPoint, FieldStats, ManagementRecommendation } from '../types';

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
 * 预测值从当前实际值开始，然后逐渐根据趋势变化
 */
function generatePredictions(
  historicalData: DataPoint[],
  seed: number,
  days: number = 7
): DataPoint[] {
  const predictions: DataPoint[] = [];
  const recentData = historicalData.slice(-7); // 最近7天的数据
  const lastDay = historicalData[historicalData.length - 1]; // 最后一天的实际数据

  // 计算最近3天的趋势（线性回归斜率）
  const recent3Days = historicalData.slice(-3);
  const tempTrend = (recent3Days[2].temperature - recent3Days[0].temperature) / 2;
  const humidityTrend = (recent3Days[2].humidity - recent3Days[0].humidity) / 2;
  const microbialTrend = (recent3Days[2].microbialActivity - recent3Days[0].microbialActivity) / 2;
  const ndviTrend = (recent3Days[2].ndvi - recent3Days[0].ndvi) / 2;

  // 计算波动范围（基于最近7天的标准差）
  const tempStd = Math.sqrt(recentData.reduce((sum, d) => sum + Math.pow(d.temperature - lastDay.temperature, 2), 0) / recentData.length);
  const humidityStd = Math.sqrt(recentData.reduce((sum, d) => sum + Math.pow(d.humidity - lastDay.humidity, 2), 0) / recentData.length);
  const microbialStd = Math.sqrt(recentData.reduce((sum, d) => sum + Math.pow(d.microbialActivity - lastDay.microbialActivity, 2), 0) / recentData.length);
  const ndviStd = Math.sqrt(recentData.reduce((sum, d) => sum + Math.pow(d.ndvi - lastDay.ndvi, 2), 0) / recentData.length);

  for (let i = 1; i <= days; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);

    // 随着天数增加，波动逐渐增大（不确定性增加）
    const uncertaintyFactor = Math.min(i / days, 0.8); // 最大到 0.8
    const randomFactor = (Math.sin(seed * 50 + i) * 2 - 1) * uncertaintyFactor;

    // 预测值 = 当前值 + 趋势 * 天数 + 随机波动
    const predictedTemp = lastDay.temperature + tempTrend * i + tempStd * randomFactor * 0.5;
    const predictedHumidity = lastDay.humidity + humidityTrend * i + humidityStd * randomFactor * 0.5;
    const predictedMicrobial = lastDay.microbialActivity + microbialTrend * i + microbialStd * randomFactor * 0.3;
    const predictedNdvi = lastDay.ndvi + ndviTrend * i + ndviStd * randomFactor * 0.2;

    predictions.push({
      date: date.toISOString().split('T')[0],
      temperature: parseFloat(Math.max(15, Math.min(35, predictedTemp)).toFixed(1)),
      humidity: parseFloat(Math.max(30, Math.min(90, predictedHumidity)).toFixed(1)),
      microbialActivity: parseFloat(Math.max(0.2, Math.min(1.0, predictedMicrobial)).toFixed(3)),
      ndvi: parseFloat(Math.max(0.3, Math.min(1.0, predictedNdvi)).toFixed(3)),
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
// 批注1 表格数据1
export function generateAllFieldsData(): Field[] {
  return [
    generateFieldData(
      'field-1',
      '张家小麦田',
      '山东泰安·北纬 36.2° 东经 117.1°',
      '优质小麦',
      15,
      '位于泰山脚下的小型家庭农场,土壤肥沃,光照充足,采用节水灌溉技术。',
      1.23
    ),
    generateFieldData(
      'field-2',
      '李家水稻田',
      '湖北宜昌·北纬 30.7° 东经 111.3°',
      '有机水稻',
      12,
      '三峡库区的梯田水稻种植区,水源充沛,生态环境优良,采用有机种植模式。',
      2.47
    ),
    generateFieldData(
      'field-3',
      '王家山地玉米田',
      '云南昆明·北纬 25.0° 东经 102.7°',
      '高产玉米',
      18,
      '高海拔山区农田(海拔约1900米),昼夜温差大,采用坡地种植技术,配备智能监测系统。',
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
 * 生成综合管理建议(包含施肥、农药、灌溉建议)
 */
export function generateManagementRecommendations(stats: FieldStats, cropType: string): ManagementRecommendation {
  const recommendation: ManagementRecommendation = {
    general: [],
    fertilizers: [],
    pesticides: [],
    irrigation: []
  };

  // ========== 常规建议 ==========
  if (stats.avgTemperature > 30) {
    recommendation.general.push('气温偏高，建议增加遮阳措施或调整灌溉时间至早晚');
  } else if (stats.avgTemperature < 18) {
    recommendation.general.push('气温偏低，注意防寒保暖，可考虑使用保温覆盖物');
  }

  if (stats.avgNdvi > 0.75) {
    recommendation.general.push('植被生长状况优良，作物长势良好，保持当前管理策略');
  } else if (stats.avgNdvi < 0.5) {
    recommendation.general.push('植被指数偏低，需重点关注作物营养供给');
  }

  // ========== 施肥建议 ==========
  // 基于微生物活性的有机肥建议
  if (stats.avgMicrobialActivity < 0.5) {
    recommendation.fertilizers.push({
      type: '腐熟有机肥',
      dosage: '15-20 kg/亩',
      timing: '播种前7-10天或生长期前期',
      reason: '微生物活性偏低(当前 ' + stats.avgMicrobialActivity.toFixed(2) + '),需增强土壤生物活性'
    });
  }

  // 基于NDVI的氮磷钾建议
  if (stats.avgNdvi < 0.5) {
    recommendation.fertilizers.push({
      type: '氮磷钾复合肥(15-15-15)',
      dosage: '10-12 kg/亩',
      timing: '作物生长期,分2-3次追施',
      reason: 'NDVI指数偏低(当前 ' + stats.avgNdvi.toFixed(2) + '),作物需补充全面营养'
    });
  } else if (stats.avgNdvi >= 0.5 && stats.avgNdvi < 0.7) {
    recommendation.fertilizers.push({
      type: '高氮复合肥(20-10-10)',
      dosage: '8-10 kg/亩',
      timing: '作物快速生长期追施',
      reason: 'NDVI指数中等(当前 ' + stats.avgNdvi.toFixed(2) + '),适量补氮促进叶片生长'
    });
  }

  // 根据作物类型的专门建议
  if (cropType.includes('小麦')) {
    recommendation.fertilizers.push({
      type: '尿素(含氮46%)',
      dosage: '6-8 kg/亩',
      timing: '拔节期至孕穗期',
      reason: '小麦拔节期需大量氮素促进穗分化'
    });
  } else if (cropType.includes('水稻')) {
    recommendation.fertilizers.push({
      type: '钾肥(氯化钾)',
      dosage: '5-7 kg/亩',
      timing: '分蘖期和孕穗期',
      reason: '水稻对钾需求高,可提高抗倒伏能力和籽粒饱满度'
    });
  } else if (cropType.includes('玉米')) {
    recommendation.fertilizers.push({
      type: '磷酸二铵',
      dosage: '10-12 kg/亩',
      timing: '播种时作基肥,或苗期追施',
      reason: '玉米苗期对磷需求高,促进根系发育'
    });
  }

  // ========== 农药建议 ==========
  // 基于湿度的病害预防
  if (stats.avgHumidity > 80) {
    recommendation.pesticides.push({
      name: '多菌灵可湿性粉剂',
      dosage: '50%多菌灵 80-100g/亩,稀释后喷雾',
      timing: '清晨或傍晚(避开高温时段)',
      target: '预防真菌性病害(如白粉病、锈病、叶斑病)',
      precaution: '雨前或雨后不宜施药,间隔7-10天可重复施用'
    });
  }

  // 基于温度和湿度的虫害预防
  if (stats.avgTemperature > 25 && stats.avgHumidity < 70) {
    recommendation.pesticides.push({
      name: '吡虫啉可溶液剂',
      dosage: '10%吡虫啉 20-30ml/亩,稀释1000-1500倍喷雾',
      timing: '早晨或傍晚',
      target: '防治刺吸式害虫(蚜虫、粉虱、蓟马)',
      precaution: '注意轮换用药,避免害虫产生抗药性,采收前15天停止使用'
    });
  }

  // NDVI偏低可能伴随病虫害
  if (stats.avgNdvi < 0.5) {
    recommendation.pesticides.push({
      name: '高效氯氰菊酯',
      dosage: '4.5%高效氯氰菊酯 40-50ml/亩,稀释1500倍喷雾',
      timing: '虫害发生初期,傍晚施药效果更佳',
      target: '防治鳞翅目害虫(菜青虫、玉米螟、棉铃虫)',
      precaution: '对鱼类高毒,避免药液进入水体,采收前7天停用'
    });
  }

  // 预防性用药(适用于生长健康但需预防的情况)
  if (stats.avgNdvi > 0.7 && recommendation.pesticides.length === 0) {
    recommendation.pesticides.push({
      name: '苦参碱水剂(生物农药)',
      dosage: '0.3%苦参碱 100-150ml/亩,稀释500-800倍喷雾',
      timing: '生长期每隔10-15天预防性喷施',
      target: '预防多种害虫(蚜虫、红蜘蛛、小菜蛾)',
      precaution: '生物农药,对环境友好,对人畜安全,可用于有机农业'
    });
  }

  // ========== 灌溉建议 ==========
  if (stats.avgHumidity < 50) {
    recommendation.irrigation.push('土壤湿度偏低(当前 ' + stats.avgHumidity.toFixed(1) + '%),建议增加灌溉频次');
    recommendation.irrigation.push('推荐灌溉时间:清晨6-8点或傍晚18-20点,避免高温时段');
    recommendation.irrigation.push('采用滴灌或喷灌方式,每次灌溉量控制在25-35mm');
  } else if (stats.avgHumidity > 80) {
    recommendation.irrigation.push('湿度过高(当前 ' + stats.avgHumidity.toFixed(1) + '%),暂停灌溉');
    recommendation.irrigation.push('加强田间排水,防止积水导致根系缺氧');
    recommendation.irrigation.push('注意通风,降低田间湿度,预防病害发生');
  } else {
    recommendation.irrigation.push('土壤湿度适宜(当前 ' + stats.avgHumidity.toFixed(1) + '%),保持正常灌溉节奏');
    recommendation.irrigation.push('根据作物需水特性和天气预报灵活调整');
  }

  // 如果所有指标正常且没有建议
  if (recommendation.general.length === 0) {
    recommendation.general.push('各项指标正常,继续保持良好的田间管理');
  }

  return recommendation;
}

/**
 * 生成农田建议(保留旧函数,用于向后兼容)
 * @deprecated 推荐使用 generateManagementRecommendations
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
