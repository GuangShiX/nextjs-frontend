import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { DataPoint } from '../types';

interface LineChartPanelProps {
  data: DataPoint[];
  predictions: DataPoint[];
  dataKey: keyof Omit<DataPoint, 'date' | 'isPrediction'>;
  title: string;
  unit: string;
  color: string;
  icon: string;
}

const LineChartPanel = ({ data, predictions, dataKey, title, unit, color, icon }: LineChartPanelProps) => {
  // 准备历史数据（最近14天）
  const historicalData = data.slice(-14);

  // 合并历史数据和预测数据，为图表创建完整的时间轴
  const combinedData = [
    ...historicalData.map(d => ({
      ...d,
      type: 'historical',
      historicalValue: d[dataKey],
      predictionValue: null
    })),
    ...predictions.map((d, index) => ({
      ...d,
      type: 'prediction',
      historicalValue: index === 0 ? historicalData[historicalData.length - 1][dataKey] : null,
      predictionValue: d[dataKey]
    }))
  ];

  // 自定义 Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      const displayValue = dataPoint.type === 'prediction' ? dataPoint.predictionValue : dataPoint.historicalValue;

      return (
        <div className="glass-card p-4 border border-primary/30">
          <p className="text-sm text-gray-300 mb-2">{dataPoint.date}</p>
          <p className="text-lg font-bold" style={{ color: dataPoint.type === 'prediction' ? '#64FFDA' : color }}>
            {displayValue} {unit}
          </p>
          {dataPoint.type === 'prediction' && (
            <p className="text-xs text-accent mt-1">预测数据</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card p-5 md:p-6">
      {/* 标题 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">{icon}</span>
          <div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="text-sm text-gray-400">最近14天历史 + 未来7天预测</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-1 bg-primary rounded"></div>
            <span className="text-gray-400">历史数据</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-1 border-2 border-dashed border-accent rounded"></div>
            <span className="text-gray-400">预测数据</span>
          </div>
        </div>
      </div>

      {/* 图表 */}
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={combinedData}>
          <defs>
            <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
            <linearGradient id={`gradient-prediction-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#64FFDA" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#64FFDA" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis
            dataKey="date"
            stroke="#888"
            tick={{ fill: '#888', fontSize: 11 }}
            tickFormatter={(value, index) => {
              // 只显示部分日期标签，避免拥挤
              if (index % 3 === 0) {
                const date = new Date(value);
                return `${date.getMonth() + 1}/${date.getDate()}`;
              }
              return '';
            }}
          />
          <YAxis
            stroke="#888"
            tick={{ fill: '#888', fontSize: 12 }}
            label={{ value: unit, angle: -90, position: 'insideLeft', fill: '#888' }}
          />
          <Tooltip content={<CustomTooltip />} />

          {/* 历史数据区域 - 实线 */}
          <Area
            type="monotone"
            dataKey="historicalValue"
            stroke={color}
            strokeWidth={2}
            fill={`url(#gradient-${dataKey})`}
            connectNulls={false}
            dot={(props: any) => {
              if (props.payload.historicalValue === null) return null;
              return (
                <circle
                  cx={props.cx}
                  cy={props.cy}
                  r={3}
                  fill={color}
                  stroke={color}
                  strokeWidth={2}
                />
              );
            }}
          />

          {/* 预测数据区域 - 虚线 */}
          <Area
            type="monotone"
            dataKey="predictionValue"
            stroke="#64FFDA"
            strokeWidth={2}
            strokeDasharray="5 5"
            fill={`url(#gradient-prediction-${dataKey})`}
            connectNulls={true}
            dot={(props: any) => {
              if (props.payload.predictionValue === null) return null;
              return (
                <circle
                  cx={props.cx}
                  cy={props.cy}
                  r={4}
                  fill="#64FFDA"
                  stroke="#64FFDA"
                  strokeWidth={2}
                />
              );
            }}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* 统计信息 */}
      <div className="mt-4 grid grid-cols-3 gap-3 md:gap-4">
        <div className="text-center p-2.5 md:p-3 bg-white/5 rounded-lg">
          <p className="text-xs text-gray-400 mb-1">当前值</p>
          <p className="text-lg font-bold" style={{ color }}>
            {data[data.length - 1][dataKey]} {unit}
          </p>
        </div>
        <div className="text-center p-2.5 md:p-3 bg-white/5 rounded-lg">
          <p className="text-xs text-gray-400 mb-1">平均值</p>
          <p className="text-lg font-bold" style={{ color }}>
            {(data.slice(-7).reduce((sum, d) => sum + Number(d[dataKey]), 0) / 7).toFixed(2)} {unit}
          </p>
        </div>
        <div className="text-center p-2.5 md:p-3 bg-white/5 rounded-lg">
          <p className="text-xs text-gray-400 mb-1">预测趋势</p>
          <p className="text-lg font-bold text-accent">
            {Number(predictions[predictions.length - 1][dataKey]) > Number(data[data.length - 1][dataKey]) ? '↗ 上升' : '↘ 下降'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LineChartPanel;
