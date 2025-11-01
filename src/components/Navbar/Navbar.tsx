import Link from 'next/link';
import styles from './Navbar.module.scss';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className="container">
        <Link href="/" className={styles.logo}>
          刘鼎杯
        </Link>

        <ul className={styles.navLinks}>
          <li>
            <Link href="/">首页</Link>
          </li>
          <li>
            <Link href="/about">关于</Link>
          </li>
          <li>
            <Link href="/projects">项目</Link>
          </li>
          <li>
            <Link href="/contact">联系</Link>
          </li>
        </ul>

        <button className={styles.menuButton}>
          ☰
        </button>
      </div>
    </nav>
  );
}
