import { useState, useEffect, ReactNode } from 'react';
import { setUser as setSentryUser } from '@sentry/nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

/**
 * A provider component that wraps its children in an AuthContext object
 * @param children - The child components to wrap in the AuthContext object
 * @returns  The AuthContextProvider component
 */
export const AuthContextProvider = (props: {
    children: ReactNode;
    initialSession: any;
    client: any;
}): JSX.Element => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = props.initialSession?.user;
        if (user) {
            setSentryUser({
                id: user.id,
                email: user.email,
            });
        }
        setLoading(false);
    }, []);

    return (
        <SessionContextProvider
            supabaseClient={props.client}
            initialSession={props.initialSession}
        >
            {loading ? null : props.children}
        </SessionContextProvider>
    );
};
