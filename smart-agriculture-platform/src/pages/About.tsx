import ParticleBackground from '../components/ParticleBackground';

const About = () => {
  return (
    <div className="relative">
      <ParticleBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-24 md:pt-32 pb-16 md:pb-24">
        {/* 标题区 */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-5xl font-bold gradient-text mb-6">关于项目</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            探索农业现代化的数字未来
          </p>
        </div>

        {/* 项目简介 */}
        <div className="glass-card p-6 md:p-8 mb-8 md:mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <span className="text-4xl">🌾</span>
            <h2 className="text-3xl font-bold text-white">项目简介</h2>
          </div>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              智慧云枢是一个专为个体农户与中小合作社设计的人工智能预测平台。
              该平台通过实时监测和记录农田环境数据，结合先进的机器学习算法，
              为农业生产提供科学的决策支持。
            </p>
            <p>
              我们的目标是通过AI技术赋能中小农户，提高生产效率，
              优化资源利用，实现可持续的农业发展。平台覆盖温度、湿度、微生物活性、
              植被指数等多个关键指标，并提供施肥、农药使用及灌溉的个性化建议。
            </p>
          </div>
        </div>

        {/* 核心功能 */}
        <div className="glass-card p-6 md:p-8 mb-8 md:mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <span className="text-4xl">⚡</span>
            <h2 className="text-3xl font-bold text-white">核心功能</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-white/5 p-5 md:p-6 rounded-lg border border-white/10">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-3xl">📊</span>
                <h3 className="text-xl font-bold text-primary">数据可视化</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                提供直观的图表展示，清晰呈现农田数据的历史趋势和未来预测，
                帮助用户快速了解农田状况。
              </p>
            </div>
            <div className="bg-white/5 p-5 md:p-6 rounded-lg border border-white/10">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-3xl">🔮</span>
                <h3 className="text-xl font-bold text-accent">智能预测</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                基于历史数据和机器学习算法，提供未来7天的环境趋势预测，
                为农田管理提供前瞻性指导。
              </p>
            </div>
            <div className="bg-white/5 p-5 md:p-6 rounded-lg border border-white/10">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-3xl">💡</span>
                <h3 className="text-xl font-bold text-green-400">智能建议</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                根据实时监测数据和环境变化趋势，自动生成科学的农田管理建议，
                包括灌溉、施肥、病虫害防治等。
              </p>
            </div>
            <div className="bg-white/5 p-5 md:p-6 rounded-lg border border-white/10">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-3xl">📥</span>
                <h3 className="text-xl font-bold text-blue-400">数据导出</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                支持将监测数据和预测结果导出为CSV格式，方便进行深入分析
                和报告生成。
              </p>
            </div>
          </div>
        </div>

        {/* 技术栈 */}
        <div className="glass-card p-6 md:p-8 mb-8 md:mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <span className="text-4xl">🛠️</span>
            <h2 className="text-3xl font-bold text-white">技术架构</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { name: 'React 18', icon: '⚛️', desc: '现代化UI框架' },
              { name: 'TypeScript', icon: '📘', desc: '类型安全' },
              { name: 'Vite', icon: '⚡', desc: '快速构建工具' },
              { name: 'TailwindCSS', icon: '🎨', desc: '原子化样式' },
              { name: 'Recharts', icon: '📈', desc: '数据可视化' },
              { name: 'React Router', icon: '🛣️', desc: '路由管理' },
              { name: 'TSParticles', icon: '✨', desc: '动态背景' },
              { name: 'PapaParse', icon: '📄', desc: 'CSV处理' },
            ].map((tech, index) => (
              <div
                key={index}
                className="bg-white/5 p-3.5 md:p-4 rounded-lg border border-white/10 hover:border-primary/50 transition-all text-center group"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                  {tech.icon}
                </div>
                <div className="font-bold text-white mb-1">{tech.name}</div>
                <div className="text-xs text-gray-400">{tech.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 研究意义 */}
        <div className="glass-card p-6 md:p-8 mb-8 md:mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <span className="text-4xl">🎯</span>
            <h2 className="text-3xl font-bold text-white">社会价值</h2>
          </div>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              <span className="text-primary font-semibold">农业现代化：</span>
              通过数字技术推动传统农业向智慧农业转型，提升农业生产效率和质量。
            </p>
            <p>
              <span className="text-accent font-semibold">可持续发展：</span>
              优化资源利用，减少化肥农药使用，促进生态友好型农业发展。
            </p>
            <p>
              <span className="text-green-400 font-semibold">精准决策：</span>
              基于数据驱动的科学决策，降低生产风险，提高经济效益。
            </p>
            <p>
              <span className="text-blue-400 font-semibold">技术创新：</span>
              推动农业科技创新，为未来智慧农业发展积累经验和技术基础。
            </p>
          </div>
        </div>

        {/* 团队信息 */}
        <div className="glass-card p-6 md:p-8">
          <div className="flex items-center space-x-3 mb-6">
            <span className="text-4xl">👥</span>
            <h2 className="text-3xl font-bold text-white">项目团队</h2>
          </div>
          <div className="text-gray-300 leading-relaxed mb-6">
            <p>
              本项目由农业科技研究团队开发，团队成员来自计算机科学、农业工程、
              数据科学等多个领域，致力于将先进技术应用于农业现代化发展。
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 bg-primary/20 border border-primary rounded-full text-primary text-sm">
              农业工程
            </span>
            <span className="px-4 py-2 bg-accent/20 border border-accent rounded-full text-accent text-sm">
              数据科学
            </span>
            <span className="px-4 py-2 bg-green-400/20 border border-green-400 rounded-full text-green-400 text-sm">
              机器学习
            </span>
            <span className="px-4 py-2 bg-blue-400/20 border border-blue-400 rounded-full text-blue-400 text-sm">
              前端开发
            </span>
            <span className="px-4 py-2 bg-purple-400/20 border border-purple-400 rounded-full text-purple-400 text-sm">
              物联网
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
