import React, { createContext, useState, useEffect, ReactNode } from 'react';

type AuthContextType = {
  isLoading: boolean;
  userToken: string | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
};


export const AuthContext = createContext<AuthContextType>({} as AuthContextType);


type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userToken, setUserToken] = useState<string | null>(null);

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
    //   let storedToken = await AsyncStorage.getItem('userToken');
      // setUserToken('storedToken');
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

  const login = async () => {
    setIsLoading(true);
    // await AsyncStorage.setItem('userToken', token);
    setUserToken('storedToken');
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    // await AsyncStorage.removeItem('userToken');
    setUserToken(null);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ login, logout, isLoading, userToken }}>
      {children}
    </AuthContext.Provider>
  );
};