import { Link } from 'react-router-dom';
import { Field, FieldStats } from '../types';
import { calculateFieldStats } from '../utils/dataGenerator';

interface FieldCardProps {
  field: Field;
}

const FieldCard = ({ field }: FieldCardProps) => {
  const stats: FieldStats = calculateFieldStats(field);

  return (
    <div className="glass-card p-6 hover:scale-105 transition-all duration-300 group relative overflow-hidden">
      {/* 背景渐变效果 */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative z-10">
        {/* 标题区 */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
              {field.name}
            </h3>
            <p className="text-sm text-gray-400 flex items-center space-x-2">
              <span>📍</span>
              <span>{field.location}</span>
            </p>
          </div>
          <div className="px-4 py-1.5 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full text-primary text-sm font-semibold border border-primary/30">
            {field.crop}
          </div>
        </div>

        {/* 描述 */}
        <p className="text-gray-300 text-sm mb-6 leading-relaxed">
          {field.description}
        </p>

        {/* 数据指标网格 */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {/* 温度 */}
          <div className="bg-gradient-to-br from-white/5 to-white/0 rounded-xl p-4 border border-white/10 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-xs font-medium">平均温度</span>
              <span className="text-2xl">🌡️</span>
            </div>
            <p className="text-2xl font-bold text-primary tabular-nums">
              {stats.avgTemperature}°C
            </p>
          </div>

          {/* 湿度 */}
          <div className="bg-gradient-to-br from-white/5 to-white/0 rounded-xl p-4 border border-white/10 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-xs font-medium">土壤湿度</span>
              <span className="text-2xl">💧</span>
            </div>
            <p className="text-2xl font-bold text-blue-400 tabular-nums">
              {stats.avgHumidity}%
            </p>
          </div>

          {/* 微生物活性 */}
          <div className="bg-gradient-to-br from-white/5 to-white/0 rounded-xl p-4 border border-white/10 hover:border-green-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-400/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-xs font-medium">微生物活性</span>
              <span className="text-2xl">🦠</span>
            </div>
            <p className="text-2xl font-bold text-green-400 tabular-nums">
              {stats.avgMicrobialActivity}
            </p>
          </div>

          {/* NDVI */}
          <div className="bg-gradient-to-br from-white/5 to-white/0 rounded-xl p-4 border border-white/10 hover:border-emerald-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-xs font-medium">植被指数</span>
              <span className="text-2xl">🌿</span>
            </div>
            <p className="text-2xl font-bold text-emerald-400 tabular-nums">
              {stats.avgNdvi}
            </p>
          </div>
        </div>

        {/* 底部信息 */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/10 flex-wrap sm:flex-nowrap">
          <div className="text-sm text-gray-400 flex-shrink-0">
            面积: <span className="text-white font-semibold tabular-nums">{field.area}</span> 亩
          </div>
          <Link
            to={`/field/${field.id}`}
            className="px-5 py-2 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary text-primary rounded-lg hover:bg-primary hover:text-dark transition-all duration-300 text-sm font-semibold glow-button relative overflow-hidden group/btn whitespace-nowrap flex-shrink-0 min-w-fit"
          >
            <span className="relative z-10 flex items-center space-x-1">
              <span>查看详情</span>
              <span className="transform group-hover/btn:translate-x-1 transition-transform">→</span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FieldCard;
