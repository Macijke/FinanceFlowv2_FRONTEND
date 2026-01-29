import React, {createContext, ReactNode, useCallback, useContext, useState} from 'react';
import GlobalNotification from '../components/GlobalNotification';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface Notification {
    id: number;
    title: string;
    message: string;
    type: NotificationType;
}

interface NotificationContextType {
    showNotification: (title: string, message: string, type?: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [notification, setNotification] = useState<Notification | null>(null);

    const showNotification = useCallback((title: string, message: string, type: NotificationType = 'success') => {
        const id = Date.now();
        setNotification({id, title, message, type});

        // Auto-hide after 4 seconds
        setTimeout(() => {
            setNotification((current) => (current?.id === id ? null : current));
        }, 4000);
    }, []);

    const closeNotification = () => {
        setNotification(null);
    };

    return (
        <NotificationContext.Provider value={{showNotification}}>
            {children}
            {notification && (
                <GlobalNotification
                    title={notification.title}
                    message={notification.message}
                    type={notification.type}
                    onClose={closeNotification}
                />
            )}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};