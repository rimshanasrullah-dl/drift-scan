import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { emailRegex, validateLoginFields } from '../../../share/core/Validators';
import AuthLayout from '../../components/AuthComponents/AuthLayout';
import { DSButton, DSInput } from '../../components/baseComponents';
import { AdvancedCheckbox } from 'react-native-advanced-checkbox';
import { CheckboxTick, EmailSvg, PasswordSvg } from '../../assets/svgs';
import AppColors from '../../../share/constants/AppColors';
import AppFonts from '../../../share/constants/AppFonts';
import PrivacyView from '../../components/AuthComponents/PrivacyView';
import { AuthContext } from '../../../share/features/context/AuthContext';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<any>({
    emailErr: '',
    passErr: ''
  });
 const { isLoading, login } = useContext(AuthContext);

  const handleLogin = () => {

    // const { valid, emailErr, passErr } = validateLoginFields(email, password);
   
    // if (!valid) {
    //   setError({ ...error, emailErr: emailErr, passErr: passErr });
    //   return;
    // }

    login()
    // navigation.navigate("EmailVerification")
    console.log('Login Success');
  };

  return (
    <AuthLayout
      title="Login"
      subtitle="to your existing account"
      cardHeight
    >

      <DSInput
        label=""
        placeholder="Email Address"
        iconName={<EmailSvg />}
        value={email}
        onChangeText={(text) => {
          setError({ ...error, emailErr: '' })
          setEmail(text)
        }}
        style={styles.whiteInput} // Override grey bg
        error={error.emailErr}
        autoCapitalize='none'
      />

      <DSInput
        label=""
        placeholder="Password"
        iconName={<PasswordSvg />}
        password
        value={password}
        onChangeText={(text) => {
          setError({ ...error, passErr: '' })
          setPassword(text)
        }}

        style={styles.whiteInput}
        error={error.passErr}
      />

      {/* Remember Me & Forgot Password Row */}
      <View style={styles.rowBetween}>
        <AdvancedCheckbox
          value={rememberMe}
          onValueChange={() => setRememberMe(!rememberMe)}
          label="Remember me"
          checkedColor="#173E20"
          uncheckedColor="#ccc"
          size={20}
          checkMarkContent={<CheckboxTick />}
          labelStyle={styles.rememberText}
        />

        <TouchableOpacity onPress={() =>
          navigation.navigate('ForgotPasswordScreen')
        }>
          <Text style={styles.rememberText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      {/* {error && <Text style={styles.errorText}>{error.emailErr}</Text>} */}

      <DSButton
        label="Login"
        variant="filled"
        onPress={handleLogin}
        style={{ marginTop: 20 }}
      />




    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  whiteInput: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 5
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberText: {
    marginLeft: 5,
    color: AppColors.THEME_GREEN,
    fontSize: 14,
    fontWeight: '600',
    // fontFamily:AppFonts.Bold
  },
  linkText: {
    color: '#333',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 5,
  },

});

export default LoginScreen;
