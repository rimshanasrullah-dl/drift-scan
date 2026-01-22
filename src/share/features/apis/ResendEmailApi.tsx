import Toast from "react-native-toast-message";
import { api } from "../../core/api";

 export const resendEmail = async (token:any) => {
        console.log("resend email token to fetch:", token);
        try {
            const data: any = await api.post<any[]>('/resend-verification-link', {}, {
                requiresAuth: true,
                localToken: token
            });


            if (data) {
                Toast.show({
                    type: 'success',
                    text1: data.content,
                });
            }
        } catch (error: any) {
            console.error("Failed to fetch:", error?.message);
            Toast.show({
                type: 'error',
                text1: error?.message,
            });
        }
    }