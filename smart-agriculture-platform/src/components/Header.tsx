import { Link, useLocation } from 'react-router-dom';
import AppContainer from './layout/AppContainer';

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-primary border-b-2 border-primary' : 'text-gray-300 hover:text-primary';
  };

  return (
    <header className="sticky top-0 z-50 bg-transparent backdrop-blur-md">
      <AppContainer>
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-xl blur-sm opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center transform group-hover:rotate-12 transition-all duration-300 shadow-lg">
                <span className="text-2xl">🌾</span>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">智农云枢</h1>
              <p className="text-xs text-gray-400 font-light tracking-wide">ZhiNong Cloud Core</p>
            </div>
          </Link>

          {/* Navigation */}
          <div className="flex items-center space-x-2">
            <Link
              to="/"
              className={`px-5 py-2.5 transition-all duration-300 rounded-lg font-medium ${isActive('/')}`}
            >
              首页
            </Link>
            <Link
              to="/about"
              className={`px-5 py-2.5 transition-all duration-300 rounded-lg font-medium ${isActive('/about')}`}
            >
              关于项目
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 px-6 py-2.5 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary text-primary rounded-lg hover:bg-primary hover:text-dark transition-all duration-300 glow-button font-semibold text-sm relative overflow-hidden group/btn"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>GitHub</span>
                <span className="transform group-hover/btn:rotate-12 transition-transform">⚡</span>
              </span>
            </a>
          </div>
        </div>
      </AppContainer>
    </header>
  );
};

export default Header;
