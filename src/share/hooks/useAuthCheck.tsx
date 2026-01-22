// useAuthCheck.ts
import { useContext, useEffect } from 'react';
import { useUser } from '../features/context/UserContext';


import { _loadItem } from '../utility/KeyValueStorage';
import { AuthContext } from '../features/context/AuthContext';
import { Alert } from 'react-native';


export const useAuthCheck = () => {
    const { isLoading,userToken, login,logout } = useContext(AuthContext);
   
   const { userDetail, fetchUserDetail, setUserDetail } = useUser();


    const loadProfile = async (token?:string, data?:any) => {
       
           if ((token||userToken) && !userDetail) {
               const userSession = data || await _loadItem('userData');
              
               if (userSession?.user?.id) {
                   await fetchUserDetail(userSession.user.id,token);
               } 
           }
       };


   useEffect(() => {
       loadProfile();
   }, [userToken]); // Only runs when login status changes


   return {
       userToken,
       userData: userDetail,
       localLogout: logout,
       loadProfile
   };
};

