import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import ProjectListPage from './pages/ProjectListPage';
import DPRFormPage from './pages/DPRFormPage';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <ProjectListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dpr/:projectId"
          element={
            <ProtectedRoute>
              <DPRFormPage />
            </ProtectedRoute>
          }
        />
        {/* Also allow opening blank DPR without a pre-selected project */}
        <Route
          path="/dpr"
          element={
            <ProtectedRoute>
              <DPRFormPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  );
}
