import { useSession } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';

export default function CheckUserLoggedIn({
    onLoggedIn,
}: {
    onLoggedIn: Function;
}) {
    const user = useSession()?.user;
    const [attempts, setAttempts] = useState(0);
    const maxAttempts = 10;

    useEffect(() => {
        if (!user && attempts < maxAttempts) {
            const timeoutId = setTimeout(() => {
                setAttempts(attempts + 1);
            }, 100);

            return () => clearTimeout(timeoutId);
        } else if (!user && attempts >= maxAttempts) {
            onLoggedIn(false);
        } else {
            onLoggedIn(true);
        }
    }, [attempts, user]);

    return null;
}
