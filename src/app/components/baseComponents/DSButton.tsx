import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
  View,
} from 'react-native';
import AppColors from '../../../share/constants/AppColors';
import AppFonts from '../../../share/constants/AppFonts';

// Define the colors based on your image
const COLORS = {
  primary: AppColors.THEME_GREEN, // Dark Green
  lightBg: '#E8ECE9', // The light grey background for outlined
  white: '#FFFFFF',
  disabled: '#A0A0A0',
};

interface DSButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: 'filled' | 'outlined'; 
  icon?: any
  loading?: boolean;
}

const DSButton: React.FC<DSButtonProps> = ({
  label,
  variant = 'filled',
  icon,
  loading = false,
  disabled,
  style,
  ...props
}) => {
  const isFilled = variant === 'filled';

  // 1. Dynamic Container Styles
  const containerStyle: ViewStyle = {
    backgroundColor: disabled
      ? COLORS.disabled
      : isFilled
      ? COLORS.primary
      : COLORS.lightBg,
    borderColor: isFilled ? 'transparent' : COLORS.primary,
    borderWidth: isFilled ? 0 : 1.5,
  };

  // 2. Dynamic Text/Icon Styles
  const contentColor = isFilled ? COLORS.white : COLORS.primary;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled || loading}
      style={[styles.button, containerStyle, style,{backgroundColor:disabled?AppColors.THEME_GREEN:AppColors.THEME_GREEN, opacity:disabled?0.6:1}]} 
      {...props}>
      
   
      <View style={styles.iconContainer}>
        {loading ? (
          <ActivityIndicator size="small" color={contentColor} style={{ marginRight: 10 }} />
        ) : (
          icon && <View style={{ marginRight: 10}}>{icon}</View>
        )}
      </View>

      <Text style={[styles.text, { color:disabled?'#FFF': contentColor }]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    height: 42,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 10,
    
    
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5, 
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    fontFamily:AppFonts.ExtraBold
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DSButton;