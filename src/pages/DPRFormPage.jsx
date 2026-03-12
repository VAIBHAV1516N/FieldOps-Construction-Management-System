import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Toast from '../components/Toast';
import { PROJECTS, WEATHER_OPTIONS } from '../constants/projects';
import { validateDPR } from '../utils/validation';
import styles from './DPRFormPage.module.css';

export default function DPRFormPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const selectedProject = PROJECTS.find((p) => p.id === parseInt(projectId, 10));

  const [form, setForm] = useState({
    projectId: projectId || '',
    date: new Date().toISOString().split('T')[0],
    weather: '',
    workDescription: '',
    workerCount: '',
    photos: [],
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const remaining = 3 - form.photos.length;
    if (files.length > remaining) {
      setErrors((prev) => ({ ...prev, photos: `Maximum 3 photos allowed` }));
      return;
    }
    const newPhotos = files.map((file) => ({
      file,
      name: file.name,
      url: URL.createObjectURL(file),
      size: (file.size / 1024).toFixed(1),
    }));
    setForm((prev) => ({ ...prev, photos: [...prev.photos, ...newPhotos] }));
    setErrors((prev) => ({ ...prev, photos: '' }));
    // Reset input so same file can be re-selected after removal
    e.target.value = '';
  };

  const removePhoto = (idx) => {
    setForm((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = async () => {
    const validationErrors = validateDPR(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      const firstErrorEl = document.querySelector('[data-field-error="true"]');
      firstErrorEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);

    const proj = PROJECTS.find((p) => p.id === parseInt(form.projectId, 10));
    setToast({
      message: `DPR submitted successfully for ${proj?.name}`,
      type: 'success',
    });

    setTimeout(() => {
      setToast(null);
      navigate('/projects');
    }, 2500);
  };

  const today = new Date().toISOString().split('T')[0];
  const charCount = form.workDescription.length;

  return (
    <div className={styles.page}>
      <Navbar
        showBack
        title="Daily Progress Report"
        subtitle={selectedProject?.name}
      />

      <main className={styles.main}>
        <div className={styles.formCard}>
          {/* Card header */}
          <div className={styles.cardHeader}>
            <div className={styles.cardHeaderIcon}>📋</div>
            <div>
              <h2 className={styles.cardHeaderTitle}>DPR Submission</h2>
              <p className={styles.cardHeaderSubtitle}>Fill in today's site progress report</p>
            </div>
          </div>

          <div className={styles.formBody}>
            {/* ── Section: Project Details ── */}
            <h3 className={styles.sectionTitle}>Project Details</h3>
            <div className={styles.row2}>
              <div data-field-error={!!errors.projectId || undefined}>
                <label className={styles.label} htmlFor="projectId">Project *</label>
                <select
                  id="projectId"
                  value={form.projectId}
                  onChange={(e) => update('projectId', e.target.value)}
                  className={`${styles.input} ${errors.projectId ? styles.inputError : ''}`}
                >
                  <option value="">Select a project…</option>
                  {PROJECTS.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
                {errors.projectId && (
                  <p className={styles.errorMsg}>⚠ {errors.projectId}</p>
                )}
              </div>

              <div data-field-error={!!errors.date || undefined}>
                <label className={styles.label} htmlFor="date">Date *</label>
                <input
                  id="date"
                  type="date"
                  value={form.date}
                  max={today}
                  onChange={(e) => update('date', e.target.value)}
                  className={`${styles.input} ${errors.date ? styles.inputError : ''}`}
                />
                {errors.date && (
                  <p className={styles.errorMsg}>⚠ {errors.date}</p>
                )}
              </div>
            </div>

            <div className={styles.divider} />

            {/* ── Section: Site Conditions ── */}
            <h3 className={styles.sectionTitle}>Site Conditions</h3>
            <div className={styles.row2}>
              <div data-field-error={!!errors.weather || undefined}>
                <label className={styles.label} htmlFor="weather">Weather *</label>
                <select
                  id="weather"
                  value={form.weather}
                  onChange={(e) => update('weather', e.target.value)}
                  className={`${styles.input} ${errors.weather ? styles.inputError : ''}`}
                >
                  <option value="">Select condition…</option>
                  {WEATHER_OPTIONS.map((w) => (
                    <option key={w.value} value={w.value}>{w.label}</option>
                  ))}
                </select>
                {errors.weather && (
                  <p className={styles.errorMsg}>⚠ {errors.weather}</p>
                )}
              </div>

              <div data-field-error={!!errors.workerCount || undefined}>
                <label className={styles.label} htmlFor="workerCount">Workers on Site *</label>
                <input
                  id="workerCount"
                  type="number"
                  min="1"
                  max="500"
                  value={form.workerCount}
                  onChange={(e) => update('workerCount', e.target.value)}
                  placeholder="e.g. 24"
                  className={`${styles.input} ${errors.workerCount ? styles.inputError : ''}`}
                />
                {errors.workerCount && (
                  <p className={styles.errorMsg}>⚠ {errors.workerCount}</p>
                )}
              </div>
            </div>

            <div className={styles.divider} />

            {/* ── Section: Work Summary ── */}
            <h3 className={styles.sectionTitle}>Work Summary</h3>
            <div data-field-error={!!errors.workDescription || undefined}>
              <label className={styles.label} htmlFor="workDescription">
                Work Description *
              </label>
              <textarea
                id="workDescription"
                value={form.workDescription}
                onChange={(e) => update('workDescription', e.target.value)}
                rows={5}
                placeholder="Describe the work completed today — tasks, milestones, areas worked on, materials used…"
                className={`${styles.input} ${styles.textarea} ${errors.workDescription ? styles.inputError : ''}`}
              />
              <div className={styles.charRow}>
                {errors.workDescription ? (
                  <p className={styles.errorMsg}>⚠ {errors.workDescription}</p>
                ) : <span />}
                <span className={charCount < 20 ? styles.charWarn : styles.charOk}>
                  {charCount} chars
                  {charCount < 20 ? ` (${20 - charCount} more needed)` : ' ✓'}
                </span>
              </div>
            </div>

            <div className={styles.divider} />

            {/* ── Section: Photos ── */}
            <h3 className={styles.sectionTitle}>
              Site Photos{' '}
              <span className={styles.sectionOptional}>(optional · max 3)</span>
            </h3>

            {form.photos.length < 3 && (
              <label className={`${styles.uploadZone} ${errors.photos ? styles.uploadZoneError : ''}`}>
                <span className={styles.uploadIcon}>📷</span>
                <p className={styles.uploadText}>Click to upload photos</p>
                <p className={styles.uploadHint}>
                  JPG, PNG, WEBP · {3 - form.photos.length} slot{3 - form.photos.length !== 1 ? 's' : ''} remaining
                </p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className={styles.fileInput}
                />
              </label>
            )}

            {errors.photos && (
              <p className={`${styles.errorMsg} ${styles.errorMb}`}>⚠ {errors.photos}</p>
            )}

            {form.photos.length > 0 && (
              <div className={styles.photoGrid}>
                {form.photos.map((photo, i) => (
                  <div key={i} className={styles.photoThumb}>
                    <img src={photo.url} alt={photo.name} className={styles.photoImg} />
                    <div className={styles.photoOverlay}>
                      <span className={styles.photoName}>{photo.name}</span>
                    </div>
                    <button
                      className={styles.photoRemove}
                      onClick={() => removePhoto(i)}
                      aria-label={`Remove ${photo.name}`}
                    >
                      ×
                    </button>
                    <span className={styles.photoSize}>{photo.size} KB</span>
                  </div>
                ))}
              </div>
            )}

            <div className={styles.divider} />

            {/* ── Actions ── */}
            <div className={styles.actions}>
              <button
                className={styles.cancelBtn}
                onClick={() => navigate('/projects')}
              >
                Cancel
              </button>
              <button
                className={styles.submitBtn}
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? 'Submitting DPR…' : 'Submit Daily Report ✓'}
              </button>
            </div>
          </div>
        </div>
      </main>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
