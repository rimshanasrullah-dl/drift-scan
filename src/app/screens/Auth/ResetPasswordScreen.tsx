import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { validatePasswordAndConfirm } from '../../../share/core/Validators';
import AuthLayout from '../../components/AuthComponents/AuthLayout';
import { DSButton, DSInput } from '../../components/baseComponents';
import { PasswordSvg } from '../../assets/svgs';

const ResetPasswordScreen = ({ navigation }: any) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({ pass: '', confirm: '' });

  const handleReset = () => {
    const { isValid, passErr, confirmPassErr } = validatePasswordAndConfirm(
      password,
      confirmPassword,
      false // regForm=false means it says "new password"
    );

    if (!isValid) {
      setErrors({ pass: passErr, confirm: confirmPassErr });
      return;
    }

    // Success
    setErrors({ pass: '', confirm: '' });
    Alert.alert('Success', 'Password reset successfully', [
      { text: 'Login', onPress: () => navigation.popToTop() }
    ]);
  };

  return (
    <AuthLayout
      title="Reset your Password"
      subtitle="Enter a new password for your account"
      showBack
      onBackPress={() => navigation.goBack()}
    >
      <DSInput
        
        placeholder="Password"
        iconName={<PasswordSvg/>}
        password
        value={password}
        onChangeText={(t) => {
             setPassword(t); 
             if(errors.pass) setErrors(e => ({...e, pass: ''}));
        }}
        error={errors.pass}
        style={{ backgroundColor: '#FFF' }}
      />

      <DSInput
       
        placeholder="Confirm Password"
        iconName={<PasswordSvg/>}
        password
        value={confirmPassword}
        onChangeText={(t) => {
            setConfirmPassword(t);
            if(errors.confirm) setErrors(e => ({...e, confirm: ''}));
        }}
        error={errors.confirm}
        style={{ backgroundColor: '#FFF' }}
      />

      <DSButton
        label="Reset Password"
        variant="filled"
        onPress={handleReset}
        style={{ marginTop: 20 }}
      />
    </AuthLayout>
  );
};

export default ResetPasswordScreen;