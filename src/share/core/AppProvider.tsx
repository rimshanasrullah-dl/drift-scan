// AppProvider
import React from 'react';
import { AuthProvider } from '../features/context/AuthContext';
import { UserProvider } from '../features/context/UserContext';
import { NetworkProvider } from '../features/context/NetworkProvider';


export default function AppProviders({ children }: any) {
    return (
        <NetworkProvider>
            <UserProvider>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </UserProvider>
        </NetworkProvider>
    );
}



