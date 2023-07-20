import '../public/assets/css/animate.min.css';
import '../styles/globals.css';
import '../public/assets/css/tailwind-built.css';
import 'swiper/css';
import React, { useEffect, useState } from 'react';
import Preloader from 'components/elements/Preloader';
import Layout from 'components/layout/Layout';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { AuthContextProvider } from 'context/AuthContext';

function MyApp({ Component, pageProps }) {
    const [loading, setLoading] = useState(false);
    const [supabaseClient] = useState(() => createBrowserSupabaseClient());
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);
    useEffect(() => {
        const use = async () => {
            await import('tw-elements').then((module) => {
                module.default;
            });
        };
        use();
    }, []);

    return (
        <>
            {!loading ? (
                <AuthContextProvider
                    client={supabaseClient}
                    initialSession={pageProps.initialSession}
                >
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </AuthContextProvider>
            ) : (
                <Preloader />
            )}
        </>
    );
}

export default MyApp;
