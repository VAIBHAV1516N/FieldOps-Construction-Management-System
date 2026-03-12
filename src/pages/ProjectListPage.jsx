import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { PROJECTS, STATUS_CONFIG } from '../constants/projects';
import styles from './ProjectListPage.module.css';

export default function ProjectListPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = PROJECTS.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || p.status === filter;
    return matchSearch && matchFilter;
  });

  const activeCount = PROJECTS.filter((p) => p.status === 'active').length;

  return (
    <div className={styles.page}>
      <Navbar />

      <main className={styles.main}>
        {/* Page header */}
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.pageTitle}>Projects</h1>
            <p className={styles.pageMeta}>
              {PROJECTS.length} total · {activeCount} active
            </p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className={styles.controls}>
          <div className={styles.searchWrap}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects or locations…"
              className={styles.searchInput}
            />
          </div>
          <div className={styles.filters}>
            {['all', 'active', 'on-hold', 'completed'].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`${styles.filterBtn} ${filter === s ? styles.filterActive : ''}`}
              >
                {s === 'all'
                  ? 'All'
                  : s.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>🔍</span>
            <p className={styles.emptyTitle}>No projects found</p>
            <p className={styles.emptyDesc}>Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {filtered.map((proj) => {
              const sc = STATUS_CONFIG[proj.status];
              return (
                <div
                  key={proj.id}
                  className={styles.card}
                  onClick={() => navigate(`/dpr/${proj.id}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && navigate(`/dpr/${proj.id}`)}
                  aria-label={`Open DPR for ${proj.name}`}
                >
                  {/* Top row */}
                  <div className={styles.cardTop}>
                    <span
                      className={styles.statusBadge}
                      style={{ background: sc.bg, color: sc.color }}
                    >
                      <span
                        className={styles.statusDot}
                        style={{ background: sc.dot }}
                      />
                      {sc.label}
                    </span>
                    <span className={styles.projectId}>
                      #{String(proj.id).padStart(3, '0')}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className={styles.projectName}>{proj.name}</h3>

                  {/* Meta */}
                  <div className={styles.metaRow}>
                    <div className={styles.metaItem}>
                      <p className={styles.metaLabel}>Start Date</p>
                      <p className={styles.metaValue}>
                        {new Date(proj.startDate).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className={styles.metaItem}>
                      <p className={styles.metaLabel}>Location</p>
                      <p className={styles.metaValue}>📍 {proj.location}</p>
                    </div>
                    <div className={styles.metaItem}>
                      <p className={styles.metaLabel}>Team</p>
                      <p className={styles.metaValue}>👷 {proj.team}</p>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className={styles.progressBlock}>
                    <div className={styles.progressHeader}>
                      <span className={styles.progressLabel}>Progress</span>
                      <span className={styles.progressValue}>{proj.progress}%</span>
                    </div>
                    <div className={styles.progressTrack}>
                      <div
                        className={styles.progressFill}
                        style={{
                          width: `${proj.progress}%`,
                          background:
                            proj.progress === 100
                              ? '#3b82f6'
                              : proj.progress > 50
                              ? '#10b981'
                              : '#f59e0b',
                        }}
                      />
                    </div>
                  </div>

                  <p className={styles.cta}>Open DPR →</p>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
