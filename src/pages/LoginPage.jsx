import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateLogin } from '../utils/validation';
import { MOCK_CREDENTIALS } from '../constants/projects';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = async () => {
    const validationErrors = validateLogin({ email, password });
    setErrors(validationErrors);
    setAuthError('');

    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 800));

    if (
      email === MOCK_CREDENTIALS.email &&
      password === MOCK_CREDENTIALS.password
    ) {
      login({ email });
      navigate('/projects');
    } else {
      setAuthError('Invalid email or password. Try test@test.com / 123456');
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logoBlock}>
          <div className={styles.logoIcon}>🏗️</div>
          <h1 className={styles.brandName}>FIELDOPS</h1>
          <p className={styles.tagline}>Construction Field Management</p>
        </div>

        {/* Card */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Sign in</h2>
          <p className={styles.cardSubtitle}>Access your project dashboard</p>

          {authError && (
            <div className={styles.authError}>
              <span>⚠</span>
              <span>{authError}</span>
            </div>
          )}

          {/* Email */}
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              placeholder="test@test.com"
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((p) => ({ ...p, email: '' }));
                setAuthError('');
              }}
              onKeyDown={handleKeyDown}
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              autoComplete="email"
            />
            {errors.email && (
              <p className={styles.errorMsg}>⚠ {errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="password">Password</label>
            <div className={styles.passwordWrap}>
              <input
                id="password"
                type={showPw ? 'text' : 'password'}
                value={password}
                placeholder="••••••••"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((p) => ({ ...p, password: '' }));
                  setAuthError('');
                }}
                onKeyDown={handleKeyDown}
                className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                autoComplete="current-password"
              />
              <button
                className={styles.togglePw}
                onClick={() => setShowPw(!showPw)}
                type="button"
                aria-label="Toggle password visibility"
              >
                {showPw ? '🙈' : '👁'}
              </button>
            </div>
            {errors.password && (
              <p className={styles.errorMsg}>⚠ {errors.password}</p>
            )}
          </div>

          <button
            className={styles.submitBtn}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Signing in…' : 'Sign In →'}
          </button>

          <p className={styles.demoHint}>
            Demo: <span className={styles.demoValue}>test@test.com</span> /{' '}
            <span className={styles.demoValue}>123456</span>
          </p>
        </div>
      </div>
    </div>
  );
}
