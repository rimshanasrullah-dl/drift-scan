import React from 'react';
import { View, StyleSheet, StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


interface ScreenWrapperProps {
  children: React.ReactNode;     
  headerContent?: React.ReactNode;
  headerHeight?: number;        
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ 
  children, 
  headerContent,
}) => {
  return (
    <View style={styles.container}>
     
      <View style={styles.headerContainer}>
        <SafeAreaView  style={[styles.containerStyle]}>         
            {headerContent}         
        </SafeAreaView>
      </View>

      {/* body Area */}
      <View style={styles.bodyContainer}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
  },
  containerStyle:{
     flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom:Platform.OS=='ios'? -15:0,
    paddingTop:Platform.OS=='android'? 10:0
  },
  headerContainer: {
    zIndex:2,
   backgroundColor: '#F2EFDC', borderBottomLeftRadius:25,borderBottomRightRadius:25
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
});

export default ScreenWrapper;