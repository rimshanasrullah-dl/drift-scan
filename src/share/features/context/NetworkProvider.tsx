import React, { createContext, useState, useEffect, useContext, useCallback, ReactNode } from 'react';
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import { Alert } from 'react-native';

interface NetworkContextType {
  isConnected: boolean;
  connectionLoading: boolean;
  checkConnection: () => Promise<void>;
}

const NetworkContext = createContext<NetworkContextType | undefined>(undefined);


interface NetworkProviderProps {
  children: ReactNode;
}

export const NetworkProvider: React.FC<NetworkProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState<boolean>(true)
  const [connectionLoading, setConnectionLoading] = useState<boolean>(false);

  useEffect(() => {
   const unsubscribe = NetInfo.addEventListener(updateConnectionState);
    return unsubscribe;
  }, []);

const updateConnectionState = (state: NetInfoState) => {
    const connected =
      state.isConnected == true 
      //  && state.isInternetReachable !== false;

    setIsConnected(connected);
     setTimeout(() => {
      setConnectionLoading(false)
    }, 500);
  };

  const checkConnection = useCallback(async () => {
    setConnectionLoading(true)
    const state = await NetInfo.fetch();
    updateConnectionState(state);
   

  }, []);

  return (
    <NetworkContext.Provider value={{ isConnected, connectionLoading, checkConnection }}>
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetworkStatus = (): NetworkContextType => {
  const context = useContext(NetworkContext);
  if (!context) {
    throw new Error("useNetworkStatus must be used within a NetworkProvider");
  }
  return context;
};