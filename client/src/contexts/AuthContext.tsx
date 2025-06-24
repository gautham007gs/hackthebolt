import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  level: number;
  points: number;
  achievements: string[];
  joinedDate: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  socialLogin: (provider: 'google' | 'github', userData: any) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('hacktheshell_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data
    const userData: User = {
      id: '1',
      name: 'John Doe',
      email: email,
      level: 5,
      points: 2450,
      achievements: ['First Steps', 'Web Security Expert', 'Network Ninja'],
      joinedDate: '2024-01-15',
      role: 'user'
    };

    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('hacktheshell_user', JSON.stringify(userData));
    return true;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userData: User = {
      id: Date.now().toString(),
      name: name,
      email: email,
      level: 1,
      points: 0,
      achievements: [],
      joinedDate: new Date().toISOString().split('T')[0],
      role: 'user'
    };

    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('hacktheshell_user', JSON.stringify(userData));
    return true;
  };

  const socialLogin = async (provider: 'google' | 'github', userData: any): Promise<boolean> => {
    // Simulate social login API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user: User = {
      id: userData.id || Date.now().toString(),
      name: userData.name,
      email: userData.email,
      level: 1,
      points: 0,
      achievements: [],
      joinedDate: new Date().toISOString().split('T')[0],
      role: 'user'
    };

    setUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('hacktheshell_user', JSON.stringify(user));
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('hacktheshell_user');
    // Redirect to home page after logout
    window.location.href = '/';
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('hacktheshell_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      register,
      socialLogin,
      logout,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};