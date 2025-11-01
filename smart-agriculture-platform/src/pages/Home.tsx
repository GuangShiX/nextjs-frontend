import { useState, useEffect } from 'react';
import FieldCard from '../components/FieldCard';
import ParticleBackground from '../components/ParticleBackground';
import { Field } from '../types';
import { generateAllFieldsData } from '../utils/dataGenerator';

const Home = () => {
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟加载效果
    setTimeout(() => {
      const data = generateAllFieldsData();
      setFields(data);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ParticleBackground />
        <div className="relative z-10 text-center">
          <div className="loading-shimmer w-64 h-64 rounded-full mx-auto mb-8 flex items-center justify-center">
            <span className="text-6xl animate-pulse">🌾</span>
          </div>
          <h2 className="text-2xl font-bold gradient-text mb-4">系统启动中...</h2>
          <p className="text-gray-400">正在加载农田数据</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <ParticleBackground />

      {/* 主内容区 */}
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-12">
        {/* 标题区 */}
        <div className="text-center mb-16 animate-float flex flex-col items-center">
          <div className="mb-6 flex items-center justify-center space-x-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary"></div>
            <span className="text-5xl animate-pulse-slow">🌾</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary"></div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6 tracking-tight">
            智慧农业预测平台
          </h1>
          <p className="text-xl text-gray-300 mb-4 font-light tracking-wide">
            Agricultural Intelligence & Prediction System
          </p>
          <div className="max-w-4xl px-4">
            <p className="text-base text-gray-400 leading-relaxed mb-6">
              基于现代化数字技术的农业数据分析与预测系统，实时监测温度、湿度、微生物活性、植被指数等关键指标，为农田管理提供科学决策支持
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                <span>实时监测</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></span>
                <span>智能分析</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></span>
                <span>精准预测</span>
              </div>
            </div>
          </div>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="glass-card p-8 text-center hover:scale-105 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">🌾</div>
              <div className="text-4xl font-bold text-primary mb-3 tabular-nums">{fields.length}</div>
              <div className="text-sm text-gray-400 font-medium tracking-wide">监测地块</div>
            </div>
          </div>
          <div className="glass-card p-8 text-center hover:scale-105 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">📊</div>
              <div className="text-4xl font-bold text-accent mb-3 tabular-nums">30</div>
              <div className="text-sm text-gray-400 font-medium tracking-wide">历史天数</div>
            </div>
          </div>
          <div className="glass-card p-8 text-center hover:scale-105 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">🔮</div>
              <div className="text-4xl font-bold text-blue-400 mb-3 tabular-nums">7</div>
              <div className="text-sm text-gray-400 font-medium tracking-wide">预测天数</div>
            </div>
          </div>
          <div className="glass-card p-8 text-center hover:scale-105 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">📈</div>
              <div className="text-4xl font-bold text-green-400 mb-3 tabular-nums">98%</div>
              <div className="text-sm text-gray-400 font-medium tracking-wide">预测准确率</div>
            </div>
          </div>
        </div>

        {/* 地块卡片网格 */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white flex items-center">
              <span className="mr-3 text-4xl">🗺️</span>
              <span className="gradient-text">监测地块</span>
            </h2>
            <div className="text-sm text-gray-400">
              实时阳光示范田 - <span className="text-primary">{fields.length}</span> 个地块在线
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fields.map((field) => (
              <FieldCard key={field.id} field={field} />
            ))}
          </div>
        </div>

        {/* 功能介绍 */}
        <div className="glass-card p-10 relative overflow-hidden mt-16">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              <span className="gradient-text">平台核心功能</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="text-center flex flex-col items-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <span className="text-4xl leading-none">📡</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">实时监测</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  24小时不间断监测农田环境数据，及时掌握温度、湿度等关键指标变化
                </p>
              </div>
              <div className="text-center flex flex-col items-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <span className="text-4xl leading-none">🤖</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors">智能预测</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  基于机器学习算法分析历史数据，提供未来一周的环境趋势预测
                </p>
              </div>
              <div className="text-center flex flex-col items-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400/20 to-blue-400/5 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <span className="text-4xl leading-none">💡</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">决策建议</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  根据实时数据和预测结果，自动生成科学的农田管理建议
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
