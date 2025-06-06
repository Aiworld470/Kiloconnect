import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { mockUsers } from '../data/mockData';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio?: string;
  rating?: number;
  joinedDate: Date;
}

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  socialLogin: (provider: 'google' | 'facebook') => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('kiloconnect_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - In a real app, this would be an API call
    try {
      setIsLoading(true);
      // Simulating API delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // Find user with matching email
      const user = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
      
      if (!user) {
        return false;
      }
      
      setCurrentUser(user);
      localStorage.setItem('kiloconnect_user', JSON.stringify(user));
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Mock registration - In a real app, this would be an API call
    try {
      setIsLoading(true);
      // Simulating API delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // Check if user already exists
      const existingUser = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
      
      if (existingUser) {
        return false;
      }
      
      const newUser = {
        id: `user-${Math.floor(Math.random() * 1000)}`,
        name,
        email,
        avatar: `https://i.pravatar.cc/150?u=${email}`,
        joinedDate: new Date(),
        rating: 0,
      };
      
      setCurrentUser(newUser);
      localStorage.setItem('kiloconnect_user', JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const socialLogin = async (provider: 'google' | 'facebook'): Promise<boolean> => {
    try {
      setIsLoading(true);
      // Simulating API delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // For demo purposes, we'll just log in as a mock user
      const user = mockUsers[0];
      setCurrentUser(user);
      localStorage.setItem('kiloconnect_user', JSON.stringify(user));
      return true;
    } catch (error) {
      console.error(`${provider} login failed:`, error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('kiloconnect_user');
  };

  const value = {
    currentUser,
    isLoading,
    login,
    register,
    logout,
    socialLogin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};