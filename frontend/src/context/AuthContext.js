import React, { createContext, useState, useEffect } from 'react';

// Create context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Check for token on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = JSON.parse(localStorage.getItem('user'));
    
    if (token && storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true);
    }
  }, []);
  
  // Login function
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      // For now, simulate a login with mock data
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock login logic
      if (email === 'user@example.com' && password === 'password') {
        const userData = {
          id: '1',
          username: 'johndoe',
          email: 'user@example.com',
          firstName: 'John',
          lastName: 'Doe',
          role: 'user'
        };
        
        const token = 'mock-jwt-token';
        
        // Store in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        setUser(userData);
        setIsAuthenticated(true);
        setLoading(false);
        return userData;
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };
  
  // Register function
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      // For now, simulate registration with mock data
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful registration
      const registeredUser = {
        id: '2',
        username: userData.username,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: 'user'
      };
      
      const token = 'mock-jwt-token';
      
      // Store in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(registeredUser));
      
      setUser(registeredUser);
      setIsAuthenticated(true);
      setLoading(false);
      return registeredUser;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };
  
  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };
  
  // Password reset request
  const requestPasswordReset = async (email) => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      // For now, simulate the request
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock success
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        isAuthenticated,
        login,
        register,
        logout,
        requestPasswordReset
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 