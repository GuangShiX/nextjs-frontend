import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';
import LineChartPanel from '../components/LineChartPanel';
import RecommendationPanel from '../components/RecommendationPanel';
import { Field } from '../types';
import { generateAllFieldsData, calculateFieldStats, downloadCSV } from '../utils/dataGenerator';

const FieldDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [field, setField] = useState<Field | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟加载
    setTimeout(() => {
      const fields = generateAllFieldsData();
      const foundField = fields.find(f => f.id === id);

      if (foundField) {
        setField(foundField);
      }
      setLoading(false);
    }, 800);
  }, [id]);

  const handleExport = () => {
    if (field) {
      downloadCSV(field);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ParticleBackground />
        <div className="relative z-10 text-center">
          <div className="loading-shimmer w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center">
            <span className="text-4xl animate-pulse">📊</span>
          </div>
          <h2 className="text-xl font-bold text-primary">加载地块数据...</h2>
        </div>
      </div>
    );
  }

  if (!field) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ParticleBackground />
        <div className="relative z-10 text-center glass-card p-12">
          <span className="text-6xl mb-6 block">❌</span>
          <h2 className="text-2xl font-bold text-white mb-4">地块未找到</h2>
          <p className="text-gray-400 mb-6">抱歉，您访问的地块不存在</p>
          <Link
            to="/"
            className="px-6 py-3 bg-primary text-dark font-semibold rounded-lg hover:bg-accent transition-colors inline-block"
          >
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const stats = calculateFieldStats(field);

  return (
    <div className="relative">
      <ParticleBackground />

      <div className="relative z-10 container mx-auto px-6 py-12 pb-12">
        {/* 面包屑导航 */}
        <div className="mb-6 flex items-center space-x-2 text-sm text-gray-400">
          <Link to="/" className="hover:text-primary transition-colors">首页</Link>
          <span>/</span>
          <span className="text-white">{field.name}</span>
        </div>

        {/* 地块标题区 */}
        <div className="glass-card p-8 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <h1 className="text-4xl font-bold gradient-text">{field.name}</h1>
                <span className="px-4 py-1 bg-primary/20 border border-primary rounded-full text-primary text-sm font-semibold">
                  {field.crop}
                </span>
              </div>
              <p className="text-gray-300 mb-4 leading-relaxed">{field.description}</p>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">📍 位置:</span>
                  <span className="text-white">{field.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">📐 面积:</span>
                  <span className="text-white">{field.area} 亩</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">📅 数据更新:</span>
                  <span className="text-white">{field.data[field.data.length - 1].date}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleExport}
              className="px-6 py-3 bg-primary text-dark font-semibold rounded-lg hover:bg-accent transition-all duration-300 glow-button flex items-center space-x-2"
            >
              <span>📥</span>
              <span>导出报告</span>
            </button>
          </div>
        </div>

        {/* 图表和建议区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧图表区 */}
          <div className="lg:col-span-2 space-y-8">
            <LineChartPanel
              data={field.data}
              predictions={field.predictions}
              dataKey="temperature"
              title="温度趋势"
              unit="°C"
              color="#FF6B6B"
              icon="🌡️"
            />
            <LineChartPanel
              data={field.data}
              predictions={field.predictions}
              dataKey="humidity"
              title="湿度趋势"
              unit="%"
              color="#4ECDC4"
              icon="💧"
            />
            <LineChartPanel
              data={field.data}
              predictions={field.predictions}
              dataKey="microbialActivity"
              title="微生物活性指数"
              unit=""
              color="#95E1D3"
              icon="🦠"
            />
            <LineChartPanel
              data={field.data}
              predictions={field.predictions}
              dataKey="ndvi"
              title="植被指数 (NDVI)"
              unit=""
              color="#38D39F"
              icon="🌿"
            />
          </div>

          {/* 右侧建议区 */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <RecommendationPanel stats={stats} fieldName={field.name} />

              {/* 快速操作 */}
              <div className="glass-card p-6 mt-8">
                <h3 className="text-lg font-bold text-white mb-4">快速操作</h3>
                <div className="space-y-3">
                  <button
                    onClick={handleExport}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg hover:border-primary/50 transition-colors text-left flex items-center space-x-3 group"
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform">📥</span>
                    <div>
                      <div className="text-white font-semibold">导出数据</div>
                      <div className="text-xs text-gray-400">下载 CSV 格式报告</div>
                    </div>
                  </button>
                  <button
                    onClick={() => navigate('/')}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg hover:border-primary/50 transition-colors text-left flex items-center space-x-3 group"
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform">🏠</span>
                    <div>
                      <div className="text-white font-semibold">返回首页</div>
                      <div className="text-xs text-gray-400">查看所有地块</div>
                    </div>
                  </button>
                  <button
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg hover:border-primary/50 transition-colors text-left flex items-center space-x-3 group"
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform">🔔</span>
                    <div>
                      <div className="text-white font-semibold">设置提醒</div>
                      <div className="text-xs text-gray-400">异常数据自动通知</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldDetail;
