import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
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
  // 合并历史数据和预测数据
  const combinedData = [
    ...data.slice(-14).map(d => ({ ...d, type: 'historical' })),
    ...predictions.map(d => ({ ...d, type: 'prediction' }))
  ];

  // 自定义 Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glass-card p-4 border border-primary/30">
          <p className="text-sm text-gray-300 mb-2">{data.date}</p>
          <p className="text-lg font-bold" style={{ color }}>
            {data[dataKey]} {unit}
          </p>
          {data.type === 'prediction' && (
            <p className="text-xs text-primary mt-1">预测数据</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card p-6">
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
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis
            dataKey="date"
            stroke="#888"
            tick={{ fill: '#888', fontSize: 12 }}
            tickFormatter={(value) => {
              const date = new Date(value);
              return `${date.getMonth() + 1}/${date.getDate()}`;
            }}
          />
          <YAxis
            stroke="#888"
            tick={{ fill: '#888', fontSize: 12 }}
            label={{ value: unit, angle: -90, position: 'insideLeft', fill: '#888' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
            fill={`url(#gradient-${dataKey})`}
            dot={(props: any) => {
              const { cx, cy, payload } = props;
              return (
                <circle
                  cx={cx}
                  cy={cy}
                  r={payload.type === 'prediction' ? 4 : 3}
                  fill={payload.type === 'prediction' ? '#64FFDA' : color}
                  stroke={payload.type === 'prediction' ? '#64FFDA' : color}
                  strokeWidth={2}
                />
              );
            }}
            strokeDasharray={(props: any) => props?.type === 'prediction' ? '5 5' : '0'}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* 统计信息 */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-white/5 rounded-lg">
          <p className="text-xs text-gray-400 mb-1">当前值</p>
          <p className="text-lg font-bold" style={{ color }}>
            {data[data.length - 1][dataKey]} {unit}
          </p>
        </div>
        <div className="text-center p-3 bg-white/5 rounded-lg">
          <p className="text-xs text-gray-400 mb-1">平均值</p>
          <p className="text-lg font-bold" style={{ color }}>
            {(data.slice(-7).reduce((sum, d) => sum + Number(d[dataKey]), 0) / 7).toFixed(2)} {unit}
          </p>
        </div>
        <div className="text-center p-3 bg-white/5 rounded-lg">
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
