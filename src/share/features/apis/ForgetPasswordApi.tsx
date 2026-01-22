import Toast from "react-native-toast-message";
import { api } from "../../core/api";

export const ForgetPasswordApi = async (email: string) => {
  
    try {
        const payload = {
            email: email,
            type: 'password_reset',
        };

        const response: any = await api.post(
            "/generate-otp",
            payload,
            {
                requiresAuth: false
            }
        );
        if (response) {
            Toast.show({
                type: 'success',
                text1: response?.detail,
            });
            console.log("res in otp generation",response)
            // navigation.navigate('OTPScreen', { data: response?.content })
        }
        else{
            console.log("Error in otp generation",response)
        }
        return response;
    } catch (error: any) {
        Toast.show({
            type: 'error',
            text1: error.message,
        });
        console.log("Catch Error in otp generation",error)

    }
};
