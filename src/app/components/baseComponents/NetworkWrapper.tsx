import React, { ReactNode } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useNetworkStatus } from '../../../share/features/context/NetworkProvider';
import NoInternetViewComp from './NoInternetViewComp';

interface NetworkWrapperProps {
  children: ReactNode;
  onReload?: () => void; 
}

const NetworkWrapper: React.FC<NetworkWrapperProps> = ({ children, onReload }) => {
  const { isConnected, checkConnection,connectionLoading } = useNetworkStatus();

  if (!isConnected) {
    return (
      <View style={styles.container}>
        <NoInternetViewComp onReload={onReload} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white',
  },
});

export default NetworkWrapper;