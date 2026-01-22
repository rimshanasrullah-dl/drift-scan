import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { _removeItem } from '../../utility/KeyValueStorage';
import { useUser } from './UserContext';

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
  const { userDetail, setUserDetail, fetchUserDetail }: any = useUser();

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      setUserToken(userToken);
      setIsLoading(false);
    } catch (e) {
      console.log(`isLoggedIn error: ${e}`);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  const login = async (token:string) => {
    setIsLoading(true);
    setUserToken(token);
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    await _removeItem('userData');
    setUserDetail(null)
    setUserToken(null);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ login, logout, isLoading, userToken }}>
      {children}
    </AuthContext.Provider>
  );
};