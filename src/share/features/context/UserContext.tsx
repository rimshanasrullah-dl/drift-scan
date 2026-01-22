import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    ReactNode,
} from 'react';
import { Alert } from 'react-native';
import { api } from '../../core/api';

interface UserDetail {
    id: string;
    name: string;
    email: string;
    // add all fields returned from your API
}

interface UserContextType {
    userDetail: UserDetail | null;
    setUserDetail: any,
    loading: boolean;
    error: string | null;
    fetchUserDetail: (userId: string, token?: any) => Promise<any>;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [userDetail, setUserDetail] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 🔥 Reusable Function
    const fetchUserDetail = useCallback(async (userId: string, token?: any) => {
        try {
            setLoading(true);
            setError(null);
 
            const response = await api.post<any>(
                '/get-user-detail',
                { id: userId },
                {
                    requiresAuth: true,
                    localToken: token
                }
            )
            //  Alert.alert(JSON.stringify(response.content)+' = =response.content')
            // console.log('getuser data', response)
            setUserDetail(response.content || null);
        } catch (err: any) {
            setError(err?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <UserContext.Provider
            value={{
                userDetail,
                setUserDetail,
                loading,
                error,
                fetchUserDetail,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

// 🔥 Custom Hook for easy usage
export const useUser = () => {
    const ctx = useContext(UserContext);
    if (!ctx) {
        throw new Error('useUser must be used inside UserProvider');
    }
    return ctx;
};
