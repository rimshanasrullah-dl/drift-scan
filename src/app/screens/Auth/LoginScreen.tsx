import React, { useContext, useEffect, useState } from 'react';
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
import { clearUser, getUserSecurely, saveUserSecurely } from '../../../share/utility/KeyValueStorage';

const LoginScreen = ({ navigation }: any) => {
  const [userDetails, setUserDetails] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<any>({ emailErr: '', passErr: ''});
  const { isLoading, login } = useContext(AuthContext);

   useEffect(() => {
   loadRememberedUser()
 }, []);

  const handleUserInput = (val: any, type: string) => {
    setUserDetails((prev) => ({
      ...prev,
      [type]: val
    }));

    if (type === 'email') {
      setError((prev: any) => ({ ...prev, emailErr: '' }));
    } else if (type === 'password') {
      setError((prev: any) => ({ ...prev, passErr: '' }));
    }
  };

  const loadRememberedUser = async () => {
    try {
      const savedUser = await getUserSecurely()
      // console.log("rememUser==", savedUser)
      if (savedUser) {
        setUserDetails({ email: savedUser.email, password: savedUser.password })
        setRememberMe(true);
      }
    } catch (err) {
      console.log("Error loading remembered user", err);
    }
  }
  const handleLogin = async () => {

    // const { valid, emailErr, passErr } =validateLoginFields(userDetails.email, userDetails.password);

    // if (!valid) {
    //   setError({ ...error, emailErr: emailErr, passErr: passErr });
    //   return;
    // }

    if (rememberMe) {
       saveUserSecurely(userDetails)
    } else {
       clearUser()
    }

    login()
    // navigation.navigate("EmailVerification")
  };

  return (
    <AuthLayout
      title="Login"
      subtitle="to your existing account"
      cardHeight
    >

      <DSInput

        placeholder="Email Address"
        iconName={<EmailSvg />}
        value={userDetails.email}
        onChangeText={(text: any) => handleUserInput(text, 'email')}
        error={error.emailErr}
        autoCapitalize='none'
      />

      <DSInput

        placeholder="Password"
        iconName={<PasswordSvg />}
        password
        value={userDetails.password}
        onChangeText={(text: any) => handleUserInput(text, 'password')}
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
