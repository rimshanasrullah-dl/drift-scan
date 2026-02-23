import React from 'react';
import { View, StyleSheet, StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNetworkStatus } from '../../../share/features/context/NetworkProvider';
import NoInternetViewComp from '../baseComponents/NoInternetViewComp';
import { Logo } from '../../assets/svgs';


interface ScreenWrapperProps {
  children: React.ReactNode;
  headerContent?: React.ReactNode;
  headerHeight?: number;
  onReload?: () => void;
  showLogoOnOffline?: boolean;
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  headerContent,
  onReload,
  showLogoOnOffline = false,
}) => {
  const { isConnected } = useNetworkStatus();

  return (
    <View style={styles.container}>

      <View style={styles.headerContainer}>
        <SafeAreaView  >
          {!isConnected && showLogoOnOffline ? (
            <View style={styles.offlineHeaderContent}>
              <Logo />
            </View>
          ) : (
            headerContent
          )}
        </SafeAreaView>
      </View>
      {/* body Area */}
      <View style={styles.bodyContainer}>
        {!isConnected ? (
          <NoInternetViewComp onReload={onReload} />
        ) : (
          children
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
 
  headerContainer: {
    backgroundColor: '#F2EFDC',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  headerContentWrapper: {
    paddingHorizontal: 20,
    minHeight: 50,
    justifyContent: 'center',
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  offlineHeaderContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
});

export default ScreenWrapper;