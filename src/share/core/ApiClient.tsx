import { ApiOptions } from "./ApiOptions";
import { _loadItem } from "../utility/KeyValueStorage";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";

const BASE_URL = 'https://staging.driftapp.ae/api';


let globalLogout: (() => void) | null = null;

// Export a helper to allow AuthContext to set this function
export const setGlobalLogout = (fn: () => void) => {
  globalLogout = fn;
};

async function ApiClient<T>(
  endpoint: string,
  { body, params, requiresAuth = true, localToken = '', ...customConfig }: ApiOptions = {}
): Promise<T> {
  const headers: any = { 'Content-Type': 'application/json', 'device': 'Handset' };

  if (requiresAuth) {
    let asyncToken = await _loadItem();
    const token = (localToken && localToken != '' && localToken != null) ? localToken : asyncToken?.content?.token;

    if (token) {
     
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
  const url = `${BASE_URL}${endpoint}${queryString}`;

  const config: RequestInit = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) config.body = JSON.stringify(body);

  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok || data.code != 200) {
    const mainMessage = typeof data?.message === 'string' ? data.message : 'Validation Error';
    
    //  Check for Unauthenticated and trigger the logout
    if(mainMessage?.includes('Unauthenticated.') || response.status === 401){
         Toast.show({
                type: 'error',
                text1: 'Your account has been deactivated. Please contact the restaurant/admin for access.',
              });
         
         // CALL THE LOGOUT FUNCTION HERE
         if (globalLogout) {
           await globalLogout();
         }
    }

    const customError: any = new Error(mainMessage);
    customError.messages = data?.messages || data?.message || `Error: ${data?.code || response.status}`;;
    customError.code = data?.code;
    customError.content = data;

    throw customError;
  }
  return data as T;
}
export default ApiClient;