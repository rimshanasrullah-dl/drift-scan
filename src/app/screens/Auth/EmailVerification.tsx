
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { emailRegex } from '../../../share/core/Validators';
import AuthLayout from '../../components/AuthComponents/AuthLayout';
import { DSButton, DSInput } from '../../components/baseComponents';
import { EmailSvg } from '../../assets/svgs';
import AppFonts from '../../../share/constants/AppFonts';
import { resendEmail } from '../../../share/features/apis/ResendEmailApi';

const EmailVerification = ({ navigation ,route}: any, ) => {
    const params = route?.params?.data

//  Alert.alert("EmailVerification route"+JSON.stringify(route?.params?.data))


    return (
        <AuthLayout
            title="Email Verification"
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
                label="Submit"
                variant="filled"
                onPress={()=>{
                     resendEmail(params?.token)
                    navigation.navigate('EmailSentScreen',{data: params ,userDetails: route?.params?.userDetails})}}
                style={{ marginTop: 10 }}
            />
           
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
        // backgroundColor:'red'
    },

    inputContainer: {
        paddingHorizontal: 0,
        marginTop: 20,

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

});
export default EmailVerification;
