import Head from 'next/head';
import React, { useState } from 'react';
import BackToTop from '../elements/BackToTop';
import Footer from './Footer';
import Header from './Header';
import Script from 'next/script';
import MobileMenu from './MobileMenu';
import { useSession } from '@supabase/auth-helpers-react';
import { setUser as setSentryUser } from '@sentry/nextjs';

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [hiddenClass, setHiddenClass] = useState('hidden');

    const handleHidden = () => setHiddenClass('');

    const handleRemove = () => {
        if (hiddenClass === '') {
            setHiddenClass('hidden');
        }
    };

    const user = useSession()?.user;
    if (user) {
        setSentryUser({
            id: user.id,
            email: user.email,
        });
    }

    return (
        <>
            <Head>
                <title>SoilPrime</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                    name="description"
                    content="Soilprime online geoteknik analizleri gerçekleştirebileceğiniz bir web sitesidir."
                />
                <meta name="author" content="SoilPrime" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1"
                />
            </Head>
            <Script src="//code-eu1.jivosite.com/widget/6TdQR4EJjs" async />
            <Script src="https://www.googletagmanager.com/gtag/js?id=G-W5S40RFS18"></Script>
            <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js"
                integrity="sha512-Eak/29OTpb36LLo2r47IpVzPBLXnAMPAVypbSZiZ4Qkf8p/7S/XRG5xp7OKWPPYfJT6metI+IORkR5G8F900+g=="
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
            />
            <div className="main text-body font-body">
                <Header handleHidden={handleHidden} />
                <MobileMenu
                    hiddenClass={hiddenClass}
                    handleRemove={handleRemove}
                />
                {children}
                <Footer />
                <BackToTop />
            </div>
        </>
    );
};

export default Layout;
