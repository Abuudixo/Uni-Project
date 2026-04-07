import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getMe, getMyAssessments } from '../api';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Local state for active patient taking assessment
  const [scores, setScores] = useState({});
  const [completedKeys, setCompletedKeys] = useState([]);

  // Check if user is logged in
  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          const [userData, myAsses] = await Promise.all([getMe(), getMyAssessments()]);
          setUser(userData);
          
          if (myAsses && Array.isArray(myAsses)) {
            const keys = [...new Set(myAsses.map(a => a.assessmentType))];
            setCompletedKeys(keys);
          }
        }
      } catch (error) {
        console.error("Failed to restore session:", error);
        AsyncStorage.removeItem('userToken');
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  const loginUser = async (token, userData) => {
    await AsyncStorage.setItem('userToken', token);
    setUser(userData);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('userToken');
    setUser(null);
    setScores({});
    setCompletedKeys([]);
  };

  const completeAssessmentLocal = (key, score, breakdown = null) => {
    setScores(prev => ({ ...prev, [key]: { total: score, breakdown } }));
    if (!completedKeys.includes(key)) {
      setCompletedKeys(prev => [...prev, key]);
    }
  };

  return (
    <AppContext.Provider value={{
      user, 
      loading,
      loginUser,
      logout,
      
      // Backward-compat aliases
      patient: user,
      
      // Assessment state
      scores,
      completedKeys,
      completeAssessmentLocal,
      
      resetAll: logout,
    }}>
      {children}
    </AppContext.Provider>
  );
};
