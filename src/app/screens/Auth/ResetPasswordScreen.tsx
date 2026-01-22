import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { validatePasswordAndConfirm } from '../../../share/core/Validators';
import AuthLayout from '../../components/AuthComponents/AuthLayout';
import { DSButton, DSInput } from '../../components/baseComponents';
import { PasswordSvg } from '../../assets/svgs';
import { api } from '../../../share/core/api';
import Toast from 'react-native-toast-message';

const ResetPasswordScreen = ({ navigation, route }: any) => {
  const params = route?.params?.data
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState({
    passErr: '',
    confirmPassErr: '',
    genErr: ''
  });

  const resetPasswordApi = async () => {
    try {
      const payload = {
        "email": params?.email,
        "password": password,
        "password_confirmation": confirmPassword,
        "token": params?.token
      }


      setLoading(true);


      const response: any = await api.post("/customer-reset-password", payload, { requiresAuth: false });
      if (response) {
        Toast.show({
          type: 'success',
          text1: 'Password reset successfully',
        });


        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      }


      return response;
    } catch (error: any) {


      setError({
        ...error,
        genErr: error?.message,


      });
      console.log("Catch Error in resetting password", error)
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  const ResetPassword = () => {
    const result = validatePasswordAndConfirm(password, confirmPassword);
    console.log("reset params", params)


    setError({
      ...error,
      passErr: result.passErr,
      confirmPassErr: result.confirmPassErr
    });


    if (!result.isValid) {
      return;
    }
    resetPasswordApi()


  }

 

  return (
    <AuthLayout
      title="Reset your Password"
      subtitle="Enter a new password for your account"
      showBack
      onBackPress={() => navigation.goBack()}
    >
      <DSInput

        placeholder="Password"
        iconName={<PasswordSvg />}
        password
        value={password}
        onChangeText={(text: any) => {
          setError({ ...error, passErr: '' })
          setPassword(text)
        }}
        error={error.passErr}
        style={{ backgroundColor: '#FFF' }}
      />

      <DSInput

        placeholder="Confirm Password"
        iconName={<PasswordSvg />}
        password
        value={confirmPassword}
        onChangeText={(text: any) => {
          setError({ ...error, confirmPassErr: '' })
          setConfirmPassword(text)
        }}
        error={error.confirmPassErr}

        style={{ backgroundColor: '#FFF' }}
      />

      <DSButton
        label="Reset Password"
        variant="filled"
        onPress={ResetPassword}
        style={{ marginTop: 20 }}
      />

      {error?.genErr ? <Text style={{ fontSize: 12, color: 'red', textAlign: 'center', marginTop: 8 }}>{error?.genErr}</Text> : <></>}

    </AuthLayout>
  );
};

export default ResetPasswordScreen;