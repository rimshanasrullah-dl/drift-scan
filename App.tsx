import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RootNavigator } from './src/index'
import { AuthProvider } from './src/share/features/context/AuthContext';
import { NetworkProvider } from './src/share/features/context/NetworkProvider';

const App = () => {
  return (
    <NetworkProvider>
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
    </NetworkProvider>
  );
}

export default App

const styles = StyleSheet.create({})