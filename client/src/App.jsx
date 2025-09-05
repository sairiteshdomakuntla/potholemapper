import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import MunicipalDashboard from './components/municipal/MunicipalDashboard';
import ReportPothole from './components/ReportPothole';
import PotholeMap from './components/PotholeMap';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />

              {/* User (commuter) routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute roles={['commuter']}>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/report" 
                element={
                  <ProtectedRoute roles={['commuter']}>
                    <ReportPothole />
                  </ProtectedRoute>
                } 
              />

              {/* Admin routes */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute roles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />

              {/* Municipality routes */}
              <Route 
                path="/municipal" 
                element={
                  <ProtectedRoute roles={['municipality']}>
                    <MunicipalDashboard />
                  </ProtectedRoute>
                } 
              />

              {/* Shared route (map) */}
              <Route 
                path="/map" 
                element={
                  <ProtectedRoute roles={['commuter', 'admin', 'municipality']}>
                    <PotholeMap />
                  </ProtectedRoute>
                } 
              />

              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
