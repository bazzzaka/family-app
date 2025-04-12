import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Layout components
import AppLayout from './components/layout/AppLayout';
import AuthLayout from './components/layout/AuthLayout';

// Auth pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

// App pages
import Dashboard from './pages/Dashboard';
import Messages from './pages/Messages';
import Chat from './pages/Chat';
import PhotoAlbums from './pages/PhotoAlbums';
import AlbumDetail from './pages/AlbumDetail';
import FamilyGroups from './pages/FamilyGroups';
import FamilyGroupDetail from './pages/FamilyGroupDetail';
import FamilyTree from './pages/FamilyTree';
import Budget from './pages/Budget';
import BudgetDetail from './pages/BudgetDetail';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

// Context
import { AuthProvider } from './context/AuthContext';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  
  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);
  
  // Toggle dark/light mode
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('theme', !darkMode ? 'dark' : 'light');
  };
  
  // Create MUI theme
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#f50057',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
  });
  
  // Auth check function
  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };
  
  // Protected route wrapper
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/login" replace />;
    }
    
    return children;
  };
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            {/* Auth routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Route>
            
            {/* App routes */}
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout toggleTheme={toggleTheme} darkMode={darkMode} />
                </ProtectedRoute>
              }
            >
              <Route path="/" element={<Dashboard />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/messages/:roomId" element={<Chat />} />
              <Route path="/albums" element={<PhotoAlbums />} />
              <Route path="/albums/:albumId" element={<AlbumDetail />} />
              <Route path="/family" element={<FamilyGroups />} />
              <Route path="/family/:groupId" element={<FamilyGroupDetail />} />
              <Route path="/family/:groupId/tree" element={<FamilyTree />} />
              <Route path="/budgets" element={<Budget />} />
              <Route path="/budgets/:budgetId" element={<BudgetDetail />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
            
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
