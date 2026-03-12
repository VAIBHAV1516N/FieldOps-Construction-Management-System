import styles from './Toast.module.css';

export default function Toast({ message, type = 'success', onClose }) {
  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      <span className={styles.icon}>{type === 'success' ? '✓' : '✕'}</span>
      <span className={styles.message}>{message}</span>
      <button className={styles.close} onClick={onClose} aria-label="Dismiss">×</button>
    </div>
  );
}
