import React, { createContext, useState, useEffect, ReactNode } from 'react';
// Make sure you import _setItem and _getItem (or whatever your 'get' function is named)
import { _removeItem, _saveItem, _loadItem } from '../../utility/KeyValueStorage';
import { useUser } from './UserContext';
import { setGlobalLogout } from '../../core/ApiClient';

type AuthContextType = {
  isLoading: boolean;
  userToken: string | null;
  login: (val:string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userToken, setUserToken] = useState<string | null>(null);
  const { setUserDetail }: any = useUser();

  // 1. CHECK LOGIN STATUS ON APP START
  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      
      // Attempt to retrieve the token from storage
      // Replace 'userToken' with whatever key you prefer, but keep it consistent
      let storedToken = await _loadItem('userToken'); 

      if (storedToken) {
        setUserToken(storedToken);
      } else {
        setUserToken(null);
      }
      
      setIsLoading(false);
    } catch (e) {
      console.log(`isLoggedIn error: ${e}`);
      setUserToken(null); 
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);
  useEffect(() => {
    setGlobalLogout(logout);
  }, []);

  // 2. LOGIN FUNCTION
  const login = async (token: string) => {
    setIsLoading(true);
    
    // Save token to persistent storage
    await _saveItem('userToken', token);
    
    // Update state
    setUserToken(token);
    
    setIsLoading(false);
  };

  // 3. LOGOUT FUNCTION
  const logout = async () => {
    setIsLoading(true);
    
    await _removeItem('userToken');
    await _removeItem('userData');
    
    setUserDetail(null);
    setUserToken(null);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ login, logout, isLoading, userToken }}>
      {children}
    </AuthContext.Provider>
  );
};