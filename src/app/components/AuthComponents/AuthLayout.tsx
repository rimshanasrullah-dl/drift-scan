import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  Dimensions,
  Keyboard,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {  AuthBackgroundSvg, BackBtnSvg, BackSvg, SplashSvg } from '../../assets/svgs';
import AppColors from '../../../share/constants/AppColors';
import PrivacyView from './PrivacyView';
import NetworkWrapper from '../baseComponents/NetworkWrapper';
import TemplateSvg from '../../assets/svgs/TemplateSvg.svg'


const BG_MAIN = require('../../assets/pngs/bgMain.png');
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


const KEYBOARD_BUFFER = 100;

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
  const keyboardOffset = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSub = Keyboard.addListener(showEvent, (e) => {
      Animated.timing(keyboardOffset, {
        toValue: -(e.endCoordinates.height - KEYBOARD_BUFFER),
        duration: Platform.OS === 'ios' ? e.duration : 200,
        useNativeDriver: true,
      }).start();
    });

    const hideSub = Keyboard.addListener(hideEvent, (e) => {
      Animated.timing(keyboardOffset, {
        toValue: 0,
        duration: Platform.OS === 'ios' ? e.duration : 200,
        useNativeDriver: true,
      }).start();
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [keyboardOffset]);

  return (
    <View style={styles.container}>
      <NetworkWrapper>
        <ImageBackground source={BG_MAIN} style={styles.outerBackground}>
          <View style={styles.svgBackground} pointerEvents="none">
            <AuthBackgroundSvg />
          </View>
          <View style={{ flex: 1, zIndex: 10 }}>
            <ScrollView
              ref={scrollViewRef}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              bounces={false}
              keyboardShouldPersistTaps="handled"
            >
              <Animated.View style={{ transform: [{ translateY: keyboardOffset }] }}>
                {showBack && (
                  <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
                    <BackBtnSvg />
                  </TouchableOpacity>
                )}
                <View style={styles.androidShadowWrapper}>
                  <View style={styles.shadowContainer}>
                    <ImageBackground
                      source={BG_INNER}
                      style={[styles.innerCard, cardHeight && { minHeight: height * 0.55 }]}
                      imageStyle={styles.innerCardImage}
                      resizeMode="stretch"
                    >
                      <SafeAreaView>
                        <View style={styles.header}>
                          {headerSvg && <View style={{marginBottom:15}}>{headerSvg}</View>}
                          <Text style={styles.title}>{title}</Text>
                          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
                        </View>

                        <View style={{ paddingHorizontal: 20, flex: 1, justifyContent: 'center' }}>
                          {children}
                        </View>
                        <View style={{ height: 40 }} />
                        {cardHeight && <PrivacyView />}
                      </SafeAreaView>
                    </ImageBackground>
                  </View>
                </View>
              </Animated.View>
            </ScrollView>
          </View>
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
    backgroundColor: 'pink'
  },
  svgBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
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
    // justifyContent: 'center', 
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