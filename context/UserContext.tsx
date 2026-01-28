import React, {createContext, useContext, useEffect, useState} from 'react';
import {useCookies} from "react-cookie";
import {getApiUrl} from "@/config/api.ts";

interface UserProfile {
    firstName: string;
    lastName: string;
    role: string;
    profilePictureUrl?: string;
}

interface UserContextType {
    userProfile: UserProfile | null;
    loading: boolean;
    refreshProfile: () => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchProfile = async () => {
        if (!cookies.user) {
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(getApiUrl(`/users/profile`), {
                headers: {
                    'Authorization': `Bearer ${cookies.user}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setUserProfile(data.data);
            }
        } catch (err) {
            console.error('Error fetching profile:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [cookies.user]);

    const refreshProfile = () => {
        fetchProfile();
    };

    const logout = () => {
        removeCookie('user', { path: '/' });
        setUserProfile(null);
        window.location.href = '/login';
    };

    return (
        <UserContext.Provider value={{userProfile, loading, refreshProfile, logout}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
