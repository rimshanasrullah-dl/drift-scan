
import { ApiOptions } from "./ApiOptions";
import { _loadItem } from "../utility/KeyValueStorage";
import { Alert } from "react-native";


const BASE_URL = 'https://staging.driftapp.ae/api';


async function ApiClient<T>(
  endpoint: string,
  { body, params, requiresAuth = true,localToken='', ...customConfig }: ApiOptions = {}
): Promise<T> {
  const headers: any = { 'Content-Type': 'application/json', 'device': 'Handset' };
  
  if (requiresAuth) {

    let asyncToken= await _loadItem()
    const token = (localToken && localToken!='' && localToken!=null) ?localToken: asyncToken?.content?.token;
      // console.log('token==>', token)
     
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
  // console.log('api response==>', response)

  if (!response.ok || data.code != 200) {
    const mainMessage = typeof data?.message === 'string' ? data.message : 'Validation Error';
console.log('api config==>', config)
  console.log('api error mainMessage==>', mainMessage)
  console.log('api error response message==>', response)
  console.log('api error data message==>', data)
    const customError: any = new Error(mainMessage);

    customError.messages = data?.messages || data?.message || `Error: ${data?.code || response.status}`;;
    customError.code = data?.code;
    customError.content = data;

    throw customError;
  }
  return data as T;
}
export default ApiClient;