
import { createMMKV } from "react-native-mmkv";


export const storage =  createMMKV()

export const secureStorage = createMMKV({
  id: "secure-user-storage",
  encryptionKey: "some-secure-key-here" 
});

const USER_KEY = "rememberedUser";


export const _saveItem = (key:string, value?:any) => {
  try {
    if (!value) return _removeItem(key);

    const jsonValue = JSON.stringify(value);

    storage.set(key, jsonValue);
  } catch (error) {
    console.log("error in saving data ",error);

  }
};


export const _loadItem = (key?:string) => {
  try {
    const jsonValue = storage.getString(key?key:'userData');
    return jsonValue != null ? JSON.parse(jsonValue) : null
    
  } catch (error) {
    console.log(error);
  }
};


export const _removeItem = (key:string) => {
  try {
    storage.remove(key);
  } catch (error) {
    console.error('Error while removing item:', error);
  }
};



export const _clearData = () => {
  try {
    storage.clearAll();
  } catch (error) {
    console.error('Error while clearing data:', error);
  }
}

// For encryption 
export const saveUserSecurely = (userDetails: any) => {
  try {
   
    const jsonValue = JSON.stringify(userDetails);
    secureStorage.set(USER_KEY, jsonValue);
    
    console.log("User details encrypted and saved!");
  } catch (error) {
    console.error("Failed to save user securely:", error);
  }
};


export const getUserSecurely = () => {
  try {
    const jsonValue = secureStorage.getString(USER_KEY);
  
    return jsonValue ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error("Failed to load user:", error);
    return null;
  }
};

export const clearUser = () => {
  secureStorage.remove(USER_KEY);
};