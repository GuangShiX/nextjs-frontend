import { FieldStats, ManagementRecommendation } from '../types';
import { generateManagementRecommendations } from '../utils/dataGenerator';

interface RecommendationPanelProps {
  stats: FieldStats;
  fieldName: string;
  cropType: string;
}

const RecommendationPanel = ({ stats, fieldName, cropType }: RecommendationPanelProps) => {
  const recommendations: ManagementRecommendation = generateManagementRecommendations(stats, cropType);

  return (
    <div className="space-y-6">
      {/* ========== 环境概况卡片 ========== */}
      <div className="glass-card p-5 md:p-6">
        <div className="flex items-center space-x-3 mb-5">
          <span className="text-3xl">📊</span>
          <div>
            <h3 className="text-xl font-bold text-white">环境监测概况</h3>
            <p className="text-sm text-gray-400">{fieldName} · 最近7天平均值</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 p-4 rounded-xl border border-red-500/20">
            <div className="text-xs text-gray-400 mb-2 flex items-center">
              <span className="mr-2">🌡️</span>温度
            </div>
            <div className={`text-2xl font-bold ${
              stats.avgTemperature > 30 ? 'text-red-400' :
              stats.avgTemperature < 18 ? 'text-blue-400' :
              'text-green-400'
            }`}>
              {stats.avgTemperature}°C
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {stats.avgTemperature > 30 ? '偏高⚠️' :
               stats.avgTemperature < 18 ? '偏低⚠️' : '正常✓'}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-4 rounded-xl border border-blue-500/20">
            <div className="text-xs text-gray-400 mb-2 flex items-center">
              <span className="mr-2">💧</span>湿度
            </div>
            <div className={`text-2xl font-bold ${
              stats.avgHumidity < 50 ? 'text-orange-400' :
              stats.avgHumidity > 80 ? 'text-blue-400' :
              'text-green-400'
            }`}>
              {stats.avgHumidity}%
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {stats.avgHumidity < 50 ? '偏低⚠️' :
               stats.avgHumidity > 80 ? '过高⚠️' : '适宜✓'}
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-4 rounded-xl border border-purple-500/20">
            <div className="text-xs text-gray-400 mb-2 flex items-center">
              <span className="mr-2">🦠</span>微生物
            </div>
            <div className={`text-2xl font-bold ${
              stats.avgMicrobialActivity < 0.5 ? 'text-yellow-400' :
              'text-green-400'
            }`}>
              {stats.avgMicrobialActivity.toFixed(2)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {stats.avgMicrobialActivity < 0.5 ? '偏低⚠️' : '良好✓'}
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-4 rounded-xl border border-green-500/20">
            <div className="text-xs text-gray-400 mb-2 flex items-center">
              <span className="mr-2">🌱</span>NDVI
            </div>
            <div className={`text-2xl font-bold ${
              stats.avgNdvi < 0.5 ? 'text-yellow-400' :
              stats.avgNdvi > 0.75 ? 'text-emerald-400' :
              'text-green-400'
            }`}>
              {stats.avgNdvi.toFixed(2)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {stats.avgNdvi < 0.5 ? '偏低⚠️' :
               stats.avgNdvi > 0.75 ? '优良✓' : '正常✓'}
            </div>
          </div>
        </div>
      </div>

      {/* ========== 施肥建议卡片 ========== */}
      {recommendations.fertilizers.length > 0 && (
        <div className="glass-card p-5 md:p-6">
          <div className="flex items-center space-x-3 mb-5">
            <span className="text-3xl">🌾</span>
            <div>
              <h3 className="text-xl font-bold text-white">施肥管理建议</h3>
              <p className="text-sm text-gray-400">基于土壤微生物与作物营养状态分析</p>
            </div>
          </div>

          <div className="space-y-4">
            {recommendations.fertilizers.map((fertilizer, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-4 rounded-xl border border-green-500/20 hover:border-green-500/40 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-bold text-sm">
                      {index + 1}
                    </div>
                    <h4 className="text-lg font-bold text-green-400">{fertilizer.type}</h4>
                  </div>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">施肥</span>
                </div>

                <div className="space-y-2 text-sm ml-11">
                  <div className="flex items-start">
                    <span className="text-gray-400 min-w-[80px]">📦 用量:</span>
                    <span className="text-white font-medium">{fertilizer.dosage}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-gray-400 min-w-[80px]">⏰ 时间:</span>
                    <span className="text-white font-medium">{fertilizer.timing}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-gray-400 min-w-[80px]">💡 原因:</span>
                    <span className="text-gray-300">{fertilizer.reason}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========== 农药建议卡片 ========== */}
      {recommendations.pesticides.length > 0 && (
        <div className="glass-card p-5 md:p-6">
          <div className="flex items-center space-x-3 mb-5">
            <span className="text-3xl">🛡️</span>
            <div>
              <h3 className="text-xl font-bold text-white">病虫害防治建议</h3>
              <p className="text-sm text-gray-400">基于环境条件与作物健康状况分析</p>
            </div>
          </div>

          <div className="space-y-4">
            {recommendations.pesticides.map((pesticide, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-4 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm">
                      {index + 1}
                    </div>
                    <h4 className="text-lg font-bold text-blue-400">{pesticide.name}</h4>
                  </div>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">农药</span>
                </div>

                <div className="space-y-2 text-sm ml-11">
                  <div className="flex items-start">
                    <span className="text-gray-400 min-w-[80px]">📦 用量:</span>
                    <span className="text-white font-medium">{pesticide.dosage}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-gray-400 min-w-[80px]">⏰ 时间:</span>
                    <span className="text-white font-medium">{pesticide.timing}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-gray-400 min-w-[80px]">🎯 防治:</span>
                    <span className="text-white font-medium">{pesticide.target}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-gray-400 min-w-[80px]">⚠️ 注意:</span>
                    <span className="text-orange-300">{pesticide.precaution}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========== 灌溉建议卡片 ========== */}
      {recommendations.irrigation.length > 0 && (
        <div className="glass-card p-5 md:p-6">
          <div className="flex items-center space-x-3 mb-5">
            <span className="text-3xl">💧</span>
            <div>
              <h3 className="text-xl font-bold text-white">灌溉管理建议</h3>
              <p className="text-sm text-gray-400">基于土壤湿度与气象条件分析</p>
            </div>
          </div>

          <div className="space-y-3">
            {recommendations.irrigation.map((item, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-all"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-xs font-bold mt-0.5">
                  {index + 1}
                </div>
                <p className="text-sm text-gray-300 leading-relaxed flex-1">{item}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========== 常规建议卡片 ========== */}
      {recommendations.general.length > 0 && (
        <div className="glass-card p-5 md:p-6">
          <div className="flex items-center space-x-3 mb-5">
            <span className="text-3xl">💡</span>
            <div>
              <h3 className="text-xl font-bold text-white">综合管理建议</h3>
              <p className="text-sm text-gray-400">基于整体环境评估</p>
            </div>
          </div>

          <div className="space-y-3">
            {recommendations.general.map((item, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:border-primary/30 transition-colors group"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold mt-0.5 group-hover:bg-primary group-hover:text-dark transition-colors">
                  {index + 1}
                </div>
                <p className="text-sm text-gray-300 leading-relaxed flex-1">{item}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========== 底部免责声明 ========== */}
      <div className="glass-card p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
        <div className="flex items-start space-x-3">
          <span className="text-2xl flex-shrink-0">⚠️</span>
          <div className="text-xs text-amber-300 leading-relaxed">
            <p className="font-semibold mb-1">重要提示:</p>
            <p>1. 以上建议基于AI算法和历史数据生成,仅供参考</p>
            <p>2. 实际操作请结合当地气候、土壤条件和农技专家意见</p>
            <p>3. 使用农药时务必遵守国家法规,注意安全防护和施药间隔期</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationPanel;
