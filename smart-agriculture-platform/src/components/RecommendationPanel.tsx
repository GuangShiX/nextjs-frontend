import { FieldStats } from '../types';
import { generateRecommendations } from '../utils/dataGenerator';

interface RecommendationPanelProps {
  stats: FieldStats;
  fieldName: string;
}

const RecommendationPanel = ({ stats, fieldName }: RecommendationPanelProps) => {
  const recommendations = generateRecommendations(stats);

  return (
    <div className="glass-card p-5 md:p-6">
      {/* 标题 */}
      <div className="flex items-center space-x-3 mb-6">
        <span className="text-3xl">💡</span>
        <div>
          <h3 className="text-xl font-bold text-white">智能建议</h3>
          <p className="text-sm text-gray-400">基于最近7天数据分析</p>
        </div>
      </div>

      {/* 环境摘要 */}
      <div className="mb-6 p-3.5 md:p-4 bg-primary/10 border border-primary/30 rounded-lg">
        <h4 className="text-sm font-semibold text-primary mb-3 flex items-center">
          <span className="mr-2">🌾</span>
          {fieldName} - 环境概况
        </h4>
        <div className="grid grid-cols-2 gap-2.5 md:gap-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">温度:</span>
            <span className={`font-semibold ${
              stats.avgTemperature > 30 ? 'text-red-400' :
              stats.avgTemperature < 18 ? 'text-blue-400' :
              'text-green-400'
            }`}>
              {stats.avgTemperature}°C
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">湿度:</span>
            <span className={`font-semibold ${
              stats.avgHumidity < 50 ? 'text-orange-400' :
              stats.avgHumidity > 80 ? 'text-blue-400' :
              'text-green-400'
            }`}>
              {stats.avgHumidity}%
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">微生物活性:</span>
            <span className={`font-semibold ${
              stats.avgMicrobialActivity < 0.5 ? 'text-yellow-400' :
              'text-green-400'
            }`}>
              {stats.avgMicrobialActivity}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">植被指数:</span>
            <span className={`font-semibold ${
              stats.avgNdvi < 0.5 ? 'text-yellow-400' :
              'text-green-400'
            }`}>
              {stats.avgNdvi}
            </span>
          </div>
        </div>
      </div>

      {/* 建议列表 */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-300 mb-3">管理建议:</h4>
        {recommendations.map((recommendation, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 p-2.5 md:p-3 bg-white/5 rounded-lg border border-white/10 hover:border-primary/30 transition-colors group"
          >
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold mt-0.5 group-hover:bg-primary group-hover:text-dark transition-colors">
              {index + 1}
            </div>
            <p className="text-sm text-gray-300 leading-relaxed flex-1">
              {recommendation}
            </p>
          </div>
        ))}
      </div>

      {/* 底部提示 */}
      <div className="mt-6 p-2.5 md:p-3 bg-accent/10 border border-accent/30 rounded-lg">
        <p className="text-xs text-accent flex items-center">
          <span className="mr-2">ℹ️</span>
          以上建议基于AI算法生成，实际操作请结合现场情况和专家意见
        </p>
      </div>
    </div>
  );
};

export default RecommendationPanel;
