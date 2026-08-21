import React, { createContext, useContext, useState, useEffect } from 'react';
import settingService from '../services/settingService';
import { useToast } from './ToastContext';

const RestaurantStatusContext = createContext();

export const RestaurantStatusProvider = ({ children }) => {
  const [isRestaurantOpen, setIsRestaurantOpen] = useState(true);
  const [closingMessage, setClosingMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const res = await settingService.getSettings();
      if (res.success && res.data) {
        setIsRestaurantOpen(res.data.isRestaurantOpen);
        setClosingMessage(res.data.closingMessage);
      }
    } catch (err) {
      console.error('Failed to fetch restaurant status:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const toggleRestaurantStatus = async () => {
    try {
      const newStatus = !isRestaurantOpen;
      const res = await settingService.updateSettings({ isRestaurantOpen: newStatus });
      if (res.success && res.data) {
        setIsRestaurantOpen(res.data.isRestaurantOpen);
        return res;
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <RestaurantStatusContext.Provider
      value={{
        isRestaurantOpen,
        closingMessage,
        loading,
        toggleRestaurantStatus,
        fetchSettings,
      }}
    >
      {children}
    </RestaurantStatusContext.Provider>
  );
};

export const useRestaurantStatus = () => {
  const context = useContext(RestaurantStatusContext);
  if (!context) {
    throw new Error('useRestaurantStatus must be used within a RestaurantStatusProvider');
  }
  return context;
};
