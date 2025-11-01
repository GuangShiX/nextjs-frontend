import styles from '../styles/page.module.scss';

export default function Home() {
  return (
    <div className={styles.page}>
      <div className="container">
        {/* Hero Section */}
        <section className={styles.hero}>
          <h1>刘鼎杯比赛 Next.js 项目</h1>
          <p>
            基于 Next.js 14 + React + Sass 构建的现代化纯前端应用
          </p>
          <div className={styles.heroActions}>
            <button className="btn-primary">开始使用</button>
            <button className="btn-secondary">了解更多</button>
          </div>
        </section>

        {/* Features Section */}
        <section className={styles.features}>
          <h2 className="text-center">核心特性</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.icon}>⚡</div>
              <h3>极速性能</h3>
              <p>
                Next.js 14 的 App Router 提供极致的页面加载速度和用户体验
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.icon}>🎨</div>
              <h3>Sass 样式</h3>
              <p>
                使用 Sass 预处理器，支持变量、嵌套、混合等高级特性
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.icon}>📱</div>
              <h3>响应式设计</h3>
              <p>
                完美适配桌面、平板和移动端，提供一致的用户体验
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.icon}>🔧</div>
              <h3>TypeScript</h3>
              <p>
                完整的类型支持，提升代码质量和开发效率
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.icon}>🚀</div>
              <h3>开箱即用</h3>
              <p>
                零配置启动，专注于业务逻辑开发
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.icon}>🔐</div>
              <h3>最佳实践</h3>
              <p>
                遵循 React 和 Next.js 最佳实践，代码结构清晰
              </p>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className={styles.techStack}>
          <h2>技术栈</h2>
          <div className={styles.techGrid}>
            <div className={styles.techItem}>
              <h3>前端框架</h3>
              <ul>
                <li>Next.js 14 (App Router)</li>
                <li>React 19</li>
                <li>TypeScript</li>
              </ul>
            </div>

            <div className={styles.techItem}>
              <h3>样式方案</h3>
              <ul>
                <li>Sass/SCSS</li>
                <li>CSS Modules</li>
                <li>响应式设计</li>
              </ul>
            </div>

            <div className={styles.techItem}>
              <h3>开发工具</h3>
              <ul>
                <li>ESLint</li>
                <li>TypeScript</li>
                <li>Hot Module Replacement</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.cta}>
          <h2>准备开始了吗？</h2>
          <p>
            立即开始使用这个模板构建您的下一个项目
          </p>
          <button className={styles.btn}>查看文档</button>
        </section>
      </div>
    </div>
  );
}
