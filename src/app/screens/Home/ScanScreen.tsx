import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
  useCameraPermission
} from 'react-native-vision-camera';
import { BackBtnSvg } from '../../assets/svgs';
import { DSButton } from '../../components/baseComponents';
import ScreenWrapper from '../../components/HomeComponents/ScreenWrapper';
import AppColors from '../../../share/constants/AppColors';
import AppFonts from '../../../share/constants/AppFonts';
import Svg, { Path } from 'react-native-svg';
import HeaderContent from '../../components/HomeComponents/DeleteAccComponents/HeaderContent';
import { api } from '../../../share/core/api';
import Toast from 'react-native-toast-message';
import { useUser } from '../../../share/features/context/UserContext';

const ScanScreen = ({ navigation }: any) => {
  const device = useCameraDevice('back');
   const { userDetail ,loading}: any = useUser();
  const { hasPermission,  } = useCameraPermission();
  const isFocused = useIsFocused();
  const [isloading, setLoading] = useState(false);
  const [isScanned, setIsScanned] = useState(false);
  const isProcessing = useRef(false);

  // Animation for scan line
  const scanLinePosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateScanLine = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scanLinePosition, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(scanLinePosition, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    if (!isScanned) {
      animateScanLine();
    }

    return () => {
      scanLinePosition.stopAnimation();
    };
  }, [isScanned]);


  const verifyQRCode = async (qrCode?: any) => {
    setLoading(true)
    const payload = {
      "qr_code": qrCode,
    }
    try {

      const res: any = await api.post("/parking/verify-qr-code", payload, { requiresAuth: true });
      console.log("verifyQRCode res==", res)
      if (res) {
        navigation.replace("SlotDetailScreen", { data: res.content })
      }

      return res
    } catch (err: any) {
      console.log("verifyQRCode Catch==", err)
      Toast.show({
        type: 'error',
        text1: err.message,
      });
      // setTimeout(() => {
        setIsScanned(false); 
        isProcessing.current = false; 
      // }, 1000);

    } finally {
      isProcessing.current = false;
      setLoading(false)
    }
  }

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      if (isProcessing.current) return;

      const value = codes[0]?.value;
      if (value) {
        isProcessing.current = true;
        setIsScanned(true);
        console.log("Scanned QR Code:", value);
        setTimeout(() => {

          verifyQRCode(value)
          // navigation.replace("SlotDetailScreen")
        }, 1000);
      }
      else{
          isProcessing.current = false;
         setIsScanned(false); 
      }
    }
  });





  if (!hasPermission) return <View style={styles.center}><Text style={styles.instructionText}>No Camera Permission</Text></View>;
  if (device == null) {
    return (
      <View style={styles.center}>
        <Text style={styles.instructionText}>No Camera Device Found</Text>
      </View>
    );
  }

  return (
    <ScreenWrapper headerContent={<HeaderContent headerTitle={loading ? 'loading....' :userDetail?.restaurant_name} />}>
      <View style={styles.whiteBackground}>
        {isProcessing?.current || isloading ?
          <View style={[styles.scanFrameContainer, { gap: 50 }]}>
            <View style={{ marginHorizontal: 60 }}>
              <Text style={[styles.instructionText, { fontSize: 20, fontWeight: 'bold' }]}>
                Verifying QR Code
              </Text>
              <Text style={[styles.instructionText, { fontSize: 16, marginTop: 10 }]}>
                Checking against The Fancy Delight
              </Text>
            </View>

            <ActivityIndicator
              size="large"
              color={AppColors.THEME_BEIGE}
              style={{ transform: [{ scale: 2 }], opacity: 1, marginTop: 20 }}
            />
          </View>
          :
          <View style={styles.scanFrameContainer}>
            {/* Camera positioned within the scan frame */}
            {device && (
              <View style={styles.cameraContainer}>
                <View style={{ margin: 10 }}>
                  <Camera
                    style={styles.camera}
                    device={device}
                    isActive={isFocused && !isScanned}
                    codeScanner={codeScanner}
                  />
                </View>

                {/* --- Corner Brackets (Using SVG for perfect roundness) --- */}

                {/* Top Left */}
                <View style={[styles.cornerBase, styles.cornerTopLeft]}>
                  <Svg width="100%" height="100%" viewBox="0 0 60 60" fill="none">
                    <Path
                      d="M 4 56 L 4 20 Q 4 4 20 4 L 56 4"
                      stroke={AppColors.THEME_GREEN || '#1a4d2e'}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </View>

                {/* Top Right (Rotated 90 deg) */}
                <View style={[styles.cornerBase, styles.cornerTopRight]}>
                  <Svg width="100%" height="100%" viewBox="0 0 60 60" fill="none">
                    <Path
                      d="M 4 56 L 4 20 Q 4 4 20 4 L 56 4"
                      stroke={AppColors.THEME_GREEN || '#1a4d2e'}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </View>

                {/* Bottom Left (Rotated -90 deg) */}
                <View style={[styles.cornerBase, styles.cornerBottomLeft]}>
                  <Svg width="100%" height="100%" viewBox="0 0 60 60" fill="none">
                    <Path
                      d="M 4 56 L 4 20 Q 4 4 20 4 L 56 4"
                      stroke={AppColors.THEME_GREEN || '#1a4d2e'}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </View>

                {/* Bottom Right (Rotated 180 deg) */}
                <View style={[styles.cornerBase, styles.cornerBottomRight]}>
                  <Svg width="100%" height="100%" viewBox="0 0 60 60" fill="none">
                    <Path
                      d="M 4 56 L 4 20 Q 4 4 20 4 L 56 4"
                      stroke={AppColors.THEME_GREEN || '#1a4d2e'}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </View>

                {/* Animated scanning line */}
                <Animated.View
                  style={[
                    styles.scanLine,
                    {
                      transform: [{
                        translateY: scanLinePosition.interpolate({
                          inputRange: [0, 1],
                          outputRange: [-140, 140],
                        })
                      }]
                    }
                  ]}
                />
              </View>
            )}

            <View style={{ marginHorizontal: 60, marginTop: 50 }}>
              <Text style={styles.instructionText}>
                Scan the customer's order QR code to allocate parking.
              </Text>
            </View>
          </View>
        }


      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: AppColors.THEME_BEIGE,
    marginLeft: 15,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  manualButton: {
    width: '100%',
  },
  //updated
  whiteBackground: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    width: 320,
    height: 320,
    position: 'relative',

    // CHANGED: Removed overflow: 'hidden' so brackets can appear outside
  },
  camera: {
    width: '100%',
    height: '100%',
    // Optional: Add borderRadius if you want the camera itself rounded
    // borderRadius: 20, 
  },

  // --- Corner Brackets (Moved Outside) ---
  // cornerTopLeft: {
  //   position: 'absolute',
  //   top: -4,    // Changed from 20 to -4 (moves it outside top edge)
  //   left: -4,   // Changed from 20 to -4 (moves it outside left edge)
  //   width: 60,
  //   height: 60,
  //   borderTopWidth: 8,
  //   borderLeftWidth: 8,
  //   borderColor: AppColors.THEME_GREEN || '#1a4d2e',
  //   borderTopLeftRadius: 16, // Round the top-left corner
  //   borderRadius: 4,
  // },
  // cornerTopRight: {
  //   position: 'absolute',
  //   top: -4,    // Changed from 20 to -4
  //   right: -4,  // Changed from 20 to -4
  //   width: 60,
  //   height: 60,
  //   borderTopWidth: 8,
  //   borderRightWidth: 8,
  //   borderColor: AppColors.THEME_GREEN || '#1a4d2e',
  // },
  // cornerBottomLeft: {
  //   position: 'absolute',
  //   bottom: -4, // Changed from 20 to -4
  //   left: -4,   // Changed from 20 to -4
  //   width: 60,
  //   height: 60,
  //   borderBottomWidth: 8,
  //   borderLeftWidth: 8,
  //   borderColor: AppColors.THEME_GREEN || '#1a4d2e',
  // },
  // cornerBottomRight: {
  //   position: 'absolute',
  //   bottom: -4, // Changed from 20 to -4
  //   right: -4,  // Changed from 20 to -4
  //   width: 60,
  //   height: 60,
  //   borderBottomWidth: 8,
  //   borderRightWidth: 8,
  //   borderRadius:8,
  //   borderColor: AppColors.THEME_GREEN || '#1a4d2e',
  // },

  // --- Scan Line (Widen) ---
  scanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    height: 8,
    borderRadius: 20,
    backgroundColor: AppColors.THEME_GREEN,
    // shadowColor: AppColors.THEME_GREEN || '#1a4d2e',
    // shadowOffset: { width: 0, height: 0 },
    // shadowOpacity: 0.8,
    // shadowRadius: 4,
  },

  // ... keep the rest of your styles ...
  instructionText: {
    marginTop: 20,
    color: AppColors.THEME_GREEN,
    fontFamily: AppFonts.SemiBold,
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  // ... other styles ...

  // Base style for all corners (size and position reference)
  cornerBase: {
    position: 'absolute',
    width: 60,
    height: 60,
  },

  cornerTopLeft: {
    top: -4,
    left: -4,
    // No rotation needed for Top Left
  },
  cornerTopRight: {
    top: -4,
    right: -4,
    transform: [{ rotate: '90deg' }], // Rotate for Top Right
  },
  cornerBottomLeft: {
    bottom: -4,
    left: -4,
    transform: [{ rotate: '-90deg' }], // Rotate for Bottom Left
  },
  cornerBottomRight: {
    bottom: -4,
    right: -4,
    transform: [{ rotate: '180deg' }], // Rotate for Bottom Right
  },

  // ... keep scanLine and other styles ...
});
export default ScanScreen;