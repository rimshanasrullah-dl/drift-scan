import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  StatusBar,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackBtnSvg } from '../../assets/svgs';
import AppColors from '../../../share/constants/AppColors';
import PrivacyView from './PrivacyView';
import NetworkWrapper from '../baseComponents/NetworkWrapper';

const BG_MAIN = require('../../assets/pngs/BackgroundImage1.png');
const BG_INNER = require('../../assets/pngs/backgrounImage2.png');

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  showBack?: boolean;
  headerSvg?: any;
  cardHeight?: boolean
  onBackPress?: () => void;
}

const { height } = Dimensions.get('window');

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  headerSvg,
  subtitle,
  showBack,
  cardHeight,
  onBackPress,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const hideListener = Keyboard.addListener('keyboardDidHide', () => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    });
    return () => hideListener.remove();
  }, []);

  return (
    <View style={styles.container}>
      <NetworkWrapper>
        <ImageBackground source={BG_MAIN} style={styles.outerBackground} >
          <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>

            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{ flex: 1 }}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
            >
              <ScrollView
                ref={scrollViewRef}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                bounces={false}
                keyboardShouldPersistTaps="handled"
              >



                <View style={{ marginBottom: 5 }}>

                  {showBack && (
                    <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
                      <BackBtnSvg />
                    </TouchableOpacity>
                  )}
                  <View style={styles.androidShadowWrapper}>
                    <View style={[styles.shadowContainer,

                    ]}
                    >
                      <ImageBackground
                        source={BG_INNER}
                        style={[styles.innerCard,
                        cardHeight && { minHeight: height * 0.55, }
                        ]}
                        imageStyle={[styles.innerCardImage,]}
                        resizeMode="stretch"
                      >


                        <View style={styles.header}>
                          {headerSvg && <View>{headerSvg}</View>}
                          <Text style={styles.title}>{title}</Text>
                          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
                        </View>

                        <View style={{ paddingHorizontal: 20, flex: 1, }}>
                          {children}
                        </View>

                        <View style={{ height: 40 }} />
                        {cardHeight && <PrivacyView />}
                      </ImageBackground>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>

          </SafeAreaView>
        </ImageBackground>
      </NetworkWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  outerBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  androidShadowWrapper: {
    overflow: 'hidden',
    paddingTop: 15,
    paddingBottom: 0,
  },
  shadowContainer: {
    elevation: 5, paddingTop: 2,
    backgroundColor: 'transparent',
    marginBottom: Platform.OS == 'android' ? -12 : 0,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: -3 },
    // shadowOpacity: 0.25,
    // shadowRadius: 2.84,

    borderRadius: 40,
  },
  innerCard: {
    paddingTop: 30,
    justifyContent: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 2.84,
    // elevation: 5,
    // paddingBottom:30,
  },
  innerCardImage: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    width: '100%',

  },
  backButton: {
    // position: 'absolute',
    // top: 25,
    // left: 20,
    zIndex: 10,
    padding: 15,
  },
  header: {
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: AppColors.THEME_BEIGE,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    maxWidth: '80%',
  },

});

export default AuthLayout;