import { StyleSheet, } from 'react-native'
import React from 'react'
import { RootNavigator } from './src/index'
import AppProviders from './src/share/core/AppProvider';
import Toast from 'react-native-toast-message';
import { toastConfig, visibilityTime } from './src/share/utility/ToastConfig';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const AppContent = () => {
  const insets = useSafeAreaInsets();
  const toastTopOffset = insets.top + 15;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootNavigator />
      <Toast config={toastConfig} visibilityTime={visibilityTime} topOffset={toastTopOffset} />
    </GestureHandlerRootView>
  );
};
const App = () => {

  return (
    <AppProviders>
      <SafeAreaProvider>
        <AppContent />
      </SafeAreaProvider>
    </AppProviders>
  );
}

export default App

const styles = StyleSheet.create({})