// notLoginView
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { CloseSvg, LoginLockSvg } from '../../assets/svgs';
import { useNavigation } from '@react-navigation/native';
import NetworkWrapper from './NetworkWrapper';

import Toast from 'react-native-toast-message';
import AppColors from '../../../share/constants/AppColors';
import DSButton from './DSButton';
import AppFonts from '../../../share/constants/AppFonts';


const BACKGROUND_IMAGE = require('../../assets/pngs/backgrounImage2.png');


const NotLoginView = ({ screenName, isBottomSheet, setIsBottomSheetVisible }: any) => {
   const navigation: any = useNavigation()
   return (
       <NetworkWrapper>
           <View style={stylesLogin.container}>
               <ImageBackground
                   source={BACKGROUND_IMAGE}
                   style={stylesLogin.backgroundImage}
                   resizeMode="cover"
               >
                   {isBottomSheet &&
                       <TouchableOpacity style={stylesLogin.svgView}
                           onPress={setIsBottomSheetVisible}>
                           <CloseSvg />
                       </TouchableOpacity>
                   }
                   <LoginLockSvg width={isBottomSheet ? 140 : 159} />
                   <View style={stylesLogin.bottomContent}>
                       <Text style={[stylesLogin.welcomeTitle, { color: AppColors.THEME_BEIGE, fontSize: isBottomSheet ? 30 : 30 }]}>Login to your account</Text>
                       <Text style={[stylesLogin.welcomeDescription, { color: AppColors.PRIMARY_TEXT, fontSize: isBottomSheet ? 14 : 16 }]}> Log in to your account to place orders and access your personal details.</Text>




                       <View style={{ width: '100%' }}>
                         
                           <DSButton
                               label='Continue'
                               onPress={() => {
                                   Toast.hide();
                                   if (isBottomSheet) setIsBottomSheetVisible();
                                   // Updated navigation for Global Auth Stack
                                   navigation.navigate('AuthFlow', {
                                       screen: 'LoginScreen',
                                       params: { returnTo: screenName }
                                   });
                               }}
                           />
                       </View>
                   </View>
               </ImageBackground>
           </View>
       </NetworkWrapper>
   );
}
export default NotLoginView


const stylesLogin = StyleSheet.create({
   container: {
       flex: 1,
       backgroundColor: '#F5F5DC',
   },
   backgroundImage: {
       flex: 1,
       width: '100%',
       justifyContent: 'center',
       alignItems: 'center',


   },
   logo: {
       width: 150,
       height: 150,
       alignSelf: 'center',
       // marginTop: height * 0.08,
       // marginBottom: height * 0.05,
   },


   bottomContent: {
       // position: 'absolute',
       // bottom: height * 0.05,
       // left: 0,
       // right: 0,
       marginTop: 30,
       alignItems: 'center',
       paddingHorizontal: 30,
       width: '100%'


   },
   welcomeTitle: {
       fontSize: 32,
       // fontWeight: 'bold',
       color: '#D4AF37',
       marginBottom: 10,
       textAlign: 'center',
       fontFamily: AppFonts.Bold,
   },
   welcomeDescription: {
       fontSize: 16,
       color: '#4A4A4A',
       textAlign: 'center',
       lineHeight: 28,
       marginBottom: 30,
       fontFamily: AppFonts.Regular,
   },
   getStartedButton: {
       backgroundColor: '#1B5E20',
       height: 48,
       borderRadius: 30,
       width: '100%',
       alignItems: 'center',
       justifyContent: 'center',


       paddingHorizontal: 30,
   },
   buttonText: {
       color: '#fff',
       fontSize: 16,
       fontWeight: 'bold',
   },
   svgView: {
       position: 'absolute', right: 15, top: 15,
       width: 29, height: 28,
       borderWidth: 1, borderColor: '#DDDD',
       borderRadius: 20, backgroundColor: '#fff',
       justifyContent: 'center', alignItems: 'center'
   },
});


