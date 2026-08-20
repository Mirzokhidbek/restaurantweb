import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import { useToast } from './ToastContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(() => authService.getCurrentUser());
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('adminToken');
      if (token) {
        try {
          const res = await authService.getMe();
          if (res.data) {
            const userData = res.data.data || res.data;
            setAdminUser(userData);
          }
        } catch (err) {
          authService.logout();
          setAdminUser(null);
        }
      } else {
        setAdminUser(null);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    const res = await authService.login(email, password);
    const userData = res.data?.data || res.data;
    if (userData) {
      setAdminUser(userData);
      toast.success(
        `Xush kelibsiz, ${userData.name || 'Mijoz'}! Tizimga muvaffaqiyatli kirdingiz.`,
        '👋 Tizimga Kirildi!'
      );
    }
    return res;
  };

  const register = async (name, email, password, phone) => {
    const res = await authService.register(name, email, password, phone);
    const userData = res.data?.data || res.data;
    if (userData) {
      setAdminUser(userData);
      toast.success(
        `Tabriklaymiz, ${userData.name || name}! Akkauntingiz muvaffaqiyatli yaratildi.`,
        '🎉 Ro‘yxatdan O‘tildi!'
      );
    }
    return res;
  };

  const logout = () => {
    authService.logout();
    setAdminUser(null);
    toast.info('Tizimdan muvaffaqiyatli chiqdingiz. Yana kutib qolamiz!', 'ℹ️ Chiqish Bajarildi');
  };

  return (
    <AuthContext.Provider
      value={{
        adminUser,
        user: adminUser,
        isAuthenticated: !!adminUser,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
