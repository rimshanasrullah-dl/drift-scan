import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { OtpInput } from 'react-native-otp-entry';
import AuthLayout from '../../components/AuthComponents/AuthLayout';
import { DSButton } from '../../components/baseComponents';
import AppColors from '../../../share/constants/AppColors';
import { getDubaiDate, parseExpiryTime } from '../../../share/core/TimerFunctions';
import Toast from 'react-native-toast-message';
import AppFonts from '../../../share/constants/AppFonts';

const OtpScreen = ({ navigation, route }: any) => {
    const params = route?.params?.data || {};
 const { email, token, expires_at: expiryFromApi } = route?.params?.data || {};

  const [otp, setOtp] = useState('');
 const [otpErr, setOtpErr] = useState('');
 const [loading, setLoading] = useState(false);
 const [timer, setTimer] = useState("00:00");
 const [expires_at, setExpiresAt] = useState(expiryFromApi);

 useEffect(() => {
 if (!expires_at) return;


 const expiryTime: any = parseExpiryTime(expires_at);


 if (!expiryTime || isNaN(expiryTime.getTime())) {
   setTimer("00:00");
   return;
 }


 const interval = setInterval(() => {
   // Ensure getDubaiDate() returns a JS Date object
   const now: any = getDubaiDate();
   const diff = expiryTime - now;


   if (diff <= 0) {
     setTimer("00:00");
     clearInterval(interval);
     return;
   }


   // Calculate Hours, Minutes, Seconds
   const hours = Math.floor(diff / (1000 * 60 * 60));
   const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
   const seconds = Math.floor((diff % (1000 * 60)) / 1000);


   // Format Logic
   const hDisplay = hours > 0 ? `${hours.toString().padStart(2, "0")}:` : "";
   const mDisplay = minutes.toString().padStart(2, "0");
   const sDisplay = seconds.toString().padStart(2, "0");


   setTimer(`${hDisplay}${mDisplay}:${sDisplay}`);
  
 }, 1000);


 return () => clearInterval(interval);
}, [expires_at]);


  const handleResendOTP = async () => {
   if (!email) {
     Toast.show({
       type: 'error',
       text1: 'Email not found for resend.',
     });
     return;
   }


//    try {
//      const response = await ForgetPasswordApi(email);


//      if (response?.content) {
//        setExpiresAt(response?.content?.expires_at)
//        setNewToken(response?.content?.token)
//      }


//    } catch (error) {
//      Toast.show({
//        type: 'error',
//        text1: 'Something went wrong while resending OTP.',
//      });


//    }
 };


 const handleVerifyOTP = async (otp: any) => {
   if (otp?.length == 0) {
     setOtpErr("Please enter OTP")
     return
   }
   if (otp?.length < 4) {
     setOtpErr("Please enter correct OTP")
     return
   }
     navigation.navigate('ResetPasswordScreen', { data: otp })
//    try {
//      const payload = {
//        email: email,
//        otp: otp,
//        type: 'password_reset',
//      };
//      setLoading(true);


//      const response: any = await api.post("/verify-otp", payload, { requiresAuth: false });
//      if (response) {
//        Toast.show({
//          type: 'success',
//          text1: response?.detail,
//        });
//        console.log("res in otp generation", response)
      
//      }
//      else {
//        setOtpErr('Error in otp generation')
//        console.log("Error in otp generation", response)
//      }
//      return response;
//    } catch (error: any) {


//      setOtpErr(error?.message)
//      console.log("Catch Error in otp generation", error)
//      setLoading(false);
//    } finally {
//      setLoading(false);
//    }






 }


 

  return (
    <AuthLayout
      title="Enter OTP"
      subtitle="Enter verification code sent to your Email"
      showBack
      onBackPress={() => navigation.goBack()}
    >
      <View style={styles.otpContainer}>
      
        <OtpInput
           numberOfDigits={4}
           focusColor={otpErr ? 'red' : AppColors.THEME_GREEN}
           autoFocus={true}
           placeholder=""
           blurOnFilled={true}
           type="numeric"
           focusStickBlinkingDuration={500}
           onTextChange={(text: any) => {
             setOtpErr('')
             setOtp(text) }}
           onFilled={(text) => handleVerifyOTP(text)}
           theme={{
             containerStyle: { paddingHorizontal: 30, paddingVertical: 10 },
             pinCodeContainerStyle: { borderColor: otpErr ? 'red' : AppColors.THEME_BEIGE, borderWidth: 2, width: 55 },
           }}
           textProps={{
             accessibilityRole: "text",
             accessibilityLabel: "OTP digit",
             allowFontScaling: true,
           }}

         />
        
      </View>
        {otpErr ? <Text style={{ fontSize: 12, color: 'red', textAlign: 'center', marginVertical: 8, fontFamily:AppFonts.Regular}}>{otpErr}</Text> : <></>}
     

      <DSButton
        label="Verify"
        variant="filled"
        onPress={()=>handleVerifyOTP(otp)}
        style={{ marginTop: 20 }}
      />

      <View style={styles.resendContainer}>
         {timer === "00:00" ? (
               <Text style={styles.resendLink}>
                 Didn’t receive code?{' '}
                 <Text
                   onPress={handleResendOTP}
                   style={[styles.resendLink, { color: AppColors.THEME_GREEN }]}
                 >
                   Resend OTP
                 </Text>
               </Text>
             ) : (
               <Text style={styles.timerText}>
                 {timer}
               </Text>
             )}
      </View>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  otpContainer: {
    marginVertical: 20,
    height: 60,
  },
  otpInputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  pinCodeContainer: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#D4A056', // Gold border from UI
    backgroundColor: '#FFF',
  },
  activePinCodeContainer: {
    borderColor: '#1E3C2F',
  },
  pinCodeText: {
    fontSize: 20,
    color: '#000',
  },
  resendContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  timerText: {
    marginBottom: 10,
    color: '#333',
    fontWeight: '600',
  },
  row: {
      flexDirection: 'row',
  },
  resendLink: {
      fontWeight: 'bold',
      color: '#1E3C2F',
  }
});

export default OtpScreen;