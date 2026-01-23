import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
} from 'react-native';
import { HideEye, VisibleEyeSvg } from '../../assets/svgs';
import AppFonts from '../../../share/constants/AppFonts';
import AppColors from '../../../share/constants/AppColors';

interface InputProps extends TextInputProps {
  label?: string; // Made optional
  iconName: React.ReactNode; // Changed to ReactNode to accept SVG/Icon components directly
  error?: string;
  password?: boolean;
  notEditable?: boolean;
  onFocus?: () => void;
}

const DSInput: React.FC<InputProps> = ({
  label,
  iconName,
  error,
  password,
  notEditable,
  onFocus = () => {},
  ...props
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [hidePassword, setHidePassword] = useState<boolean>(password || false);

  return (
    <View style={styles.container}>
     
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error ? 'red' : isFocused ? AppColors.THEME_GREEN : '#ddd',
            backgroundColor:notEditable ? '#F6F3EC' : '#fff',
            overflow: 'hidden', 
          },
        ]}>
        
     
        <View style={styles.iconContainer}>
          {iconName}
        </View>

        
          <TextInput
          secureTextEntry={hidePassword}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor="#A0A0A0"
          placeholder={props.placeholder}
          value={props.value}
          onChangeText={props.onChangeText}
          style={[styles.textInput,{ color:notEditable?'#959596':'#2c2c2c'}]}
          autoCapitalize={props.autoCapitalize}
          keyboardType={props?.keyboardType ||'default'}
          editable={notEditable?false:true}
          
        />

        {password && (
          <TouchableOpacity 
            style={styles.eyeContainer} 
            onPress={() => setHidePassword(!hidePassword)}
            activeOpacity={0.7}
          >
            {hidePassword ? <HideEye /> : <VisibleEyeSvg />}
          </TouchableOpacity>
        )}
      </View>

       {error && (
        <Text style={styles.errorText}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: '100%', // Ensure the component itself takes full width
  },
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: '#2c2d2c',
    fontFamily: AppFonts.Regular,
  },
  inputContainer: {
    height: 45,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderWidth: 1, 
    borderRadius: 10,
  },
  iconContainer: {
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    height: '98%',
    // color: editable==false?'#959596':'#2c2c2c',
    fontFamily: AppFonts.Regular,
    fontSize: 14,
    paddingVertical: 0, 
    borderWidth: 0,
    backgroundColor: 'transparent', 
  },
  eyeContainer: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    marginTop: 5,
    color: 'red',
    fontSize: 12,
    fontFamily: AppFonts.Regular,
  },
});

export default DSInput;