
import React from 'react';
import {  StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AuthLayout from '../../components/AuthComponents/AuthLayout';
import { DSButton } from '../../components/baseComponents';

import AppFonts from '../../../share/constants/AppFonts';
import { EmailSentSvg } from '../../assets/svgs';
import AppColors from '../../../share/constants/AppColors';

const EmailSentScreen = ({ navigation ,route}: any, ) => {
    const params = route?.params?.data
    return (
        <AuthLayout
        headerSvg={<EmailSentSvg/>}
            title="Email Sent"
            subtitle=""
            showBack
            onBackPress={() => navigation.goBack()}
        >

            <View style={styles.formContainer}>

                <Text style={styles.subTitle}>Hi {params?.customer_details?.name},</Text>
                <Text style={[styles.subTitle, { marginTop: 5 }]}>We noticed that your email
                    ({params?.customer_details?.email}) is not verified with Drift.
                    Please take a moment to verify your account</Text>
                <Text style={[styles.subTitle, { marginTop: 10 }]}>Click the button below to receive an email with
                    further instructions.</Text>


            </View>
            <DSButton
                label="Proceed To Login"
                variant="filled"
                onPress={()=>navigation.navigate('EmailSentScreen')}
                style={{ marginTop: 10 }}
            />
              <View style={styles.signUpContainer}>
                   <Text style={styles.footerText}>Didn’t receive Email? </Text>
                   <TouchableOpacity
                    // onPress={() => resendEmail(params?.data?.token)}
                   >
                       <Text style={[styles.signUpText, { color: AppColors.THEME_GREEN }]}>Resend Email</Text>
                   </TouchableOpacity>
               </View>
            
        </AuthLayout>
    );
};

const styles = StyleSheet.create({

    headerContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    loginTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: AppFonts.Bold,
    },
    subTitle: { fontSize: 14, color: '#000', fontFamily: AppFonts.Regular },
    formContainer: {
        paddingHorizontal: 10,
           marginBottom:20,
    },

    inputContainer: {
        paddingHorizontal: 0,
        marginTop: 20,
          marginBottom:20,
        backgroundColor:'red'

    },
    inputStyle: {
        paddingVertical: 0,
        borderWidth: 1,
        borderColor: '#E6E2DA',
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 15,
        color: '#2C2C2C',

    },
    buttonContainer: {

        marginTop: 10,
    },
    chipContainer: {
        marginTop: 15,
        paddingVertical: 0
    },
    loginButton: {
        paddingVertical: 12,
    },
    loginButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff',
    },
 signUpContainer: {
       flexDirection: 'row',
       justifyContent: 'center',
       marginTop: 5,
       
   },
   footerText: {
       fontSize: 16,
       color: '#666',
       fontFamily: AppFonts.Regular
   },
   signUpText: {
       fontSize: 16,
       fontWeight: 'bold',
       fontFamily: AppFonts.Bold
   },

});
export default EmailSentScreen;
