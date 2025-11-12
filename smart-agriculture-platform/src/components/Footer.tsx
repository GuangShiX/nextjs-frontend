import AppContainer from './layout/AppContainer';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass-card backdrop-blur-md mt-12 md:mt-16 pt-5 border-t border-primary/20">
      <AppContainer>
        <div className="py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* 项目信息 */}
          <div>
            <h3 className="text-lg font-bold text-primary mb-3">智慧农业预测平台</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              基于现代化数字技术的农业数据分析与预测系统，
              助力农业现代化发展，提升农田管理效率。
            </p>
          </div>

          {/* 快速链接 */}
          <div>
            <h3 className="text-lg font-bold text-primary mb-3">快速链接</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-gray-400 hover:text-primary transition-colors">
                  首页
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-primary transition-colors">
                  关于项目
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  技术文档
                </a>
              </li>
            </ul>
          </div>

          {/* 联系方式 */}
          <div>
            <h3 className="text-lg font-bold text-primary mb-3">联系我们</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center space-x-2">
                <span>📧</span>
                <span>contact@agriculture-ai.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>📍</span>
                <span>中国农业科技研究中心</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>🌐</span>
                <span>www.agriculture-ai.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 版权信息 */}
        <div className="mt-6 pt-4 border-t border-gray-700 text-center text-sm text-gray-500">
          <p>
            © {currentYear} 智慧农业预测平台. All rights reserved.
            <span className="mx-2">|</span>
            <span className="text-primary">Powered by React + TypeScript</span>
          </p>
          <p className="mt-2 text-xs">
            本平台数据仅供参考，实际农田管理请结合当地实际情况
          </p>
        </div>
        </div>
      </AppContainer>
    </footer>
  );
};

export default Footer;
