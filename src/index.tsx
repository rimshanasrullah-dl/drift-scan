

// src/navigation/RootNavigator.tsx

import React, { useContext } from 'react';
import { ActivityIndicator, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { AuthContext } from './share/features/context/AuthContext';
import LoginScreen from './app/screens/Auth/LoginScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import EmailVerification from './app/screens/Auth/EmailVerification';
import ForgotPasswordScreen from './app/screens/Auth/ForgetPasswordScreen';
import OTPScreen from './app/screens/Auth/OTPScreen';
import ResetPasswordScreen from './app/screens/Auth/ResetPasswordScreen';
import EmailSentScreen from './app/screens/Auth/EmailSentScreen';
import TnCScreen from './app/screens/Auth/TnCScreen';
import PrivacyPolicyScreen from './app/screens/Auth/PrivacyPolicyScreen';
import HomeScreen from './app/screens/Home/HomeScreen';
import ProfileScreen from './app/screens/Home/ProfileScreen';
import DeleteAccount from './app/screens/Home/DeleteAccount';
import SlotDetailScreen from './app/screens/Home/SlotDetailScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ScanScreen from './app/screens/Home/ScanScreen';
import BootSplash from "react-native-bootsplash";








// Initialize Stacks
const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();


// --- Auth Stack ---
const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="EmailVerification"  component={EmailVerification}  />
      <AuthStack.Screen name="EmailSentScreen"  component={EmailSentScreen}  />
      <AuthStack.Screen name="ForgotPasswordScreen"  component={ForgotPasswordScreen}  />
      <AuthStack.Screen name="OTPScreen"  component={OTPScreen}  />
      <AuthStack.Screen name="ResetPasswordScreen"  component={ResetPasswordScreen}  />
      <AuthStack.Screen name="TnCScreen"  component={TnCScreen}  />
      <AuthStack.Screen name="PrivacyPolicyScreen"  component={PrivacyPolicyScreen}  />
    </AuthStack.Navigator>
  );
};

//  Home Stack ---
const HomeNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <HomeStack.Screen name="DeleteAccount" component={DeleteAccount} />
      <HomeStack.Screen name="SlotDetailScreen" component={SlotDetailScreen} />
      <HomeStack.Screen name="ScanScreen" component={ScanScreen} />
    </HomeStack.Navigator>
  );
};

// --- Root Stack ---
export const RootNavigator = () => {
  const { isLoading, userToken } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar 
        translucent={true} 
        backgroundColor="transparent" 
        barStyle="dark-content" 
      />
    <NavigationContainer onReady={() => BootSplash.hide({ fade: true })}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userToken == null ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <Stack.Screen name="HomeStack" component={HomeNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
      </SafeAreaProvider>
      </GestureHandlerRootView>
  );
};
