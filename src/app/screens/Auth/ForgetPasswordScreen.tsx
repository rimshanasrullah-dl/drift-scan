import React, { useState } from 'react';
import { Alert, Keyboard } from 'react-native';
import { emailRegex } from '../../../share/core/Validators';
import AuthLayout from '../../components/AuthComponents/AuthLayout';
import { DSButton, DSInput } from '../../components/baseComponents';
import { EmailSvg } from '../../assets/svgs';
import { ForgetPasswordApi } from '../../../share/features/apis/ForgetPasswordApi';

const ForgotPasswordScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
      const [loading, setLoading] = useState<boolean>(false);
  

     const onSubmit = async () => {
        //  navigation.navigate('OTPScreen', { data: {} })
        let emailErr = ''
        if (!email?.trim()) {
            emailErr = 'Email is required.';
             setError(emailErr)
            return
        } else {

            if (!emailRegex.test(email)) {
                emailErr = 'Enter a valid Email.';
               setError(emailErr)
                return
            }

        }


        setLoading(true)
        let res = await ForgetPasswordApi(email)

        if (res) {
             Keyboard.dismiss()
            navigation.navigate('OTPScreen', { data: { ...res?.content, email: email } })
        }
        setLoading(false)
    }

    return (
        <AuthLayout
            title="Forgot Password"
            subtitle="Enter details to reset your password"
            showBack
            onBackPress={() => navigation.goBack()}
        >
            <DSInput
                label=""
                placeholder="Email Address"
                iconName={<EmailSvg />}
                value={email}
                onChangeText={(text) => {
                    setError('')
                    setEmail(text)
                }}
                style={{ backgroundColor: '#FFF', borderColor: '#E8E8E8' }}
                error={error}
                autoCapitalize='none'
            />

            <DSButton
                label="Submit"
                variant="filled"
                onPress={onSubmit}
                style={{ marginTop: 10 }}
            />
        </AuthLayout>
    );
};

export default ForgotPasswordScreen;