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
import { LanguageProvider } from './context/LanguageContext';

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
        main: '#0A84FF', // Apple blue
      },
      secondary: {
        main: '#FF375F', // Apple pink
      },
      background: {
        default: darkMode ? '#1c1c1e' : '#f5f5f7',
        paper: darkMode ? '#2c2c2e' : '#ffffff',
      },
      text: {
        primary: darkMode ? '#ffffff' : '#1d1d1f',
        secondary: darkMode ? 'rgba(255, 255, 255, 0.7)' : '#86868b',
      },
      divider: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
    },
    typography: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      h1: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        fontWeight: 700,
        letterSpacing: '-0.015em',
      },
      h2: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        fontWeight: 700,
        letterSpacing: '-0.01em',
      },
      h3: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        fontWeight: 600,
        letterSpacing: '-0.005em',
      },
      h4: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        fontWeight: 600,
      },
      h5: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        fontWeight: 600,
      },
      h6: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        fontWeight: 500,
      },
      button: {
        textTransform: 'none',
        fontWeight: 500,
      },
    },
    shape: {
      borderRadius: 12,
    },
    shadows: [
      'none',
      '0px 2px 4px rgba(0, 0, 0, 0.05)',
      '0px 4px 8px rgba(0, 0, 0, 0.06)',
      '0px 8px 16px rgba(0, 0, 0, 0.07)',
      '0px 12px 24px rgba(0, 0, 0, 0.08)',
      // ...keep other shadows from default theme
    ],
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
            padding: '8px 16px',
            transition: 'all 0.2s ease',
          },
          contained: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '16px',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          rounded: {
            borderRadius: '16px',
          },
          root: {
            margin: 0,
            padding: 0,
            paddingLeft: '0 !important',
            marginLeft: '0 !important',
            '&.MuiContainer-maxWidthXl': {
              paddingLeft: '0 !important',
              marginLeft: '0 !important',
            }
          }
        },
      },
      MuiBox: {
        styleOverrides: {
          root: {
            margin: 0,
            padding: 0,
            paddingLeft: '0 !important',
            marginLeft: '0 !important',
            borderLeft: 'none !important',
            '&.css-p43sob, &.css-14e3o55, &.css-1at9qkq': {
              paddingLeft: '0 !important',
              marginLeft: '0 !important',
              borderLeft: 'none !important',
              '& > *': {
                paddingLeft: '0 !important',
                marginLeft: '0 !important',
                borderLeft: 'none !important',
              }
            }
          }
        }
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            paddingLeft: '0 !important',
            marginLeft: '0 !important',
            paddingRight: '16px !important',
            marginRight: '0 !important',
            maxWidth: '100% !important',
            '&.css-hhdjsd-MuiContainer-root, &.MuiContainer-maxWidthXl': {
              paddingLeft: '0 !important',
              marginLeft: '0 !important',
              '& > *': {
                paddingLeft: '0 !important',
                marginLeft: '0 !important',
              }
            }
          }
        }
      },
      MuiGrid: {
        styleOverrides: {
          root: {
            paddingLeft: '0 !important',
            marginLeft: '0 !important'
          },
          container: {
            paddingLeft: '0 !important',
            marginLeft: '0 !important'
          }
        }
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            '&.MuiDrawer-paperAnchorDockedLeft': {
              borderRight: '1px solid rgba(0, 0, 0, 0.12)'
            }
          }
        }
      },
      body: {
        styleOverrides: {
          root: {
            margin: 0,
            padding: 0,
            '& *': {
              boxSizing: 'border-box'
            }
          }
        }
      }
    },
    // Global CSS overrides
    cssBaseline: {
      styleOverrides: {
        'html, body': {
          margin: 0,
          padding: 0,
          overflowX: 'hidden'
        },
        // Remove all left margins and padding for all elements
        '*': {
          boxSizing: 'border-box'
        },
        '.MuiBox-root': {
          paddingLeft: '0 !important',
          marginLeft: '0 !important'
        },
        '.MuiToolbar-root, .MuiToolbar-gutters, .MuiToolbar-regular, .css-1ygil4i-MuiToolbar-root': {
          paddingLeft: '0 !important',
          marginLeft: '0 !important',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        },
        '.css-p43sob, .css-14e3o55, .css-1at9qkq, .css-1bohzk3, .css-hhdjsd-MuiContainer-root': {
          paddingLeft: '0 !important',
          marginLeft: '0 !important',
          border: 'none !important',
          '& > *': {
            paddingLeft: '0 !important',
            marginLeft: '0 !important'
          }
        },
        '.MuiContainer-root': {
          paddingLeft: '0 !important',
          marginLeft: '0 !important',
          width: '100% !important',
          maxWidth: '100% !important'
        },
        '.MuiGrid-root, .MuiGrid-container, .MuiGrid-item': {
          paddingLeft: '0 !important',
          marginLeft: '0 !important'
        }
      }
    }
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
      <LanguageProvider>
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
                <Route path="/family-tree/:familyGroupId" element={<FamilyTree />} />
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
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
