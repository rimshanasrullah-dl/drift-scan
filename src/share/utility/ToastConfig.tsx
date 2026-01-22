 import Toast, { BaseToast, BaseToastProps, ErrorToast, ToastProps, } from 'react-native-toast-message';
import AppColors from '../constants/AppColors';
import { StyleSheet } from 'react-native';

export const visibilityTime=1500
 export const toastConfig = {
  
    success: (props:ToastProps) => (
      <BaseToast
        {...props}
        style={[styles.container, {
          borderColor: AppColors.THEME_GREEN,
          borderLeftColor: AppColors.THEME_GREEN,
        }]}
        contentContainerStyle={styles.contentContainer}
        text1Style={styles.label}
        text1NumberOfLines={2}
      />
    ),
    error: (props:any) => (
      <ErrorToast
        {...props}
        style={[styles.container, {
          borderColor: '#9D190E',
          borderLeftColor: '#9D190E',
        }]}
        contentContainerStyle={styles.contentContainer}
        text1Style={styles.label}
        text1NumberOfLines={2}
       autoHide={props.autoHide ?? true}
      />
    ),
    info: (props:any) => (
      <ErrorToast
        {...props}
        style={[styles.container, {
          borderColor: AppColors.THEME_BEIGE,
          borderLeftColor: AppColors.THEME_BEIGE,
        }]}
        contentContainerStyle={styles.contentContainer}
        text1Style={[styles.label, { fontWeight: '500', color: '#000' }]}
        text2Style={styles.label2}
        text1NumberOfLines={2}
        text2NumberOfLines={2}
       autoHide={props.autoHide ?? true}
       visibilityTime={props.visibilityTime ??1500}
      />
    ),
  };

  const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderLeftWidth: 5,
    width: '80%', borderRadius: 15
  },
  contentContainer: {
    paddingHorizontal: 12,
    borderRadius: 10
  },
  label: {
    fontSize: 13,
    fontWeight: '400'
  },
  label2: {
    fontSize: 12,
    color: '#000'
  }
})