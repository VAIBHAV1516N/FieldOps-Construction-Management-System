import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Navbar.module.css';

export default function Navbar({ title, subtitle, showBack = false }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.left}>
          {showBack ? (
            <button className={styles.backBtn} onClick={() => navigate('/projects')}>
              ← Back
            </button>
          ) : (
            <div className={styles.brand}>
              <div className={styles.logo}>🏗️</div>
              <span className={styles.brandName}>FIELDOPS</span>
            </div>
          )}
          {(title || subtitle) && (
            <div className={styles.titleBlock}>
              {title && <p className={styles.title}>{title}</p>}
              {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            </div>
          )}
        </div>
        <div className={styles.right}>
          {user && (
            <>
              <div className={styles.userInfo}>
                <p className={styles.userEmail}>{user.email}</p>
                <p className={styles.userRole}>Field Manager</p>
              </div>
              <button className={styles.logoutBtn} onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
