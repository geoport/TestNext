import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';

type HeaderProps = {
    handleHidden: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Header({ handleHidden }: HeaderProps) {
    const user = useSession()?.user;
    const router = useRouter();
    const supabase = useSupabaseClient();

    return (
        <header className={'sticky-bar bg-slate-800'}>
            <div className="container bg-slate-800">
                <nav className="flex items-center justify-between bg-slate-800 py-3">
                    <Image
                        src="/assets/imgs/logos/soilprime-logo.png"
                        className="text-3xl font-semibold leading-none"
                        alt="SoilPrime Logo"
                        width={165}
                        height={40}
                    />
                    <ul className="hidden lg:flex lg:w-auto lg:items-center lg:space-x-12">
                        <li className="pb-4 pt-4">
                            <Link
                                href="/"
                                className="hover:text-blueGray-500 text-sm font-semibold text-white"
                            >
                                Ana Sayfa
                            </Link>
                        </li>
                        <li className="pb-4 pt-4">
                            <Link
                                prefetch={false}
                                href="/about-us"
                                className="hover:text-blueGray-500 text-sm font-semibold text-white"
                            >
                                Hakkımızda
                            </Link>
                        </li>
                        <li className="pb-4 pt-4">
                            <Link
                                prefetch={false}
                                href="/price-list"
                                className="hover:text-blueGray-500 text-sm font-semibold text-white"
                            >
                                Fiyat Listesi
                            </Link>
                        </li>
                        <li className="has-child group relative pb-4 pt-4">
                            <Link
                                prefetch={false}
                                href="/"
                                className="hover:text-blueGray-500 text-sm font-semibold text-white"
                            >
                                Yazılımlar
                            </Link>
                            <ul className="drop-down-menu min-w-200">
                                <li>
                                    <Link
                                        prefetch={false}
                                        href="/apps/georeport"
                                        className="menu-sub-item hover:text-blueGray-500 text-sm text-black"
                                    >
                                        Geoteknik Rapor Yazılımı
                                    </Link>
                                    <Link
                                        prefetch={false}
                                        href="/apps/earthquake_selection"
                                        className="menu-sub-item hover:text-blueGray-500 text-sm text-black"
                                    >
                                        Deprem Seçimi Yazılımı
                                    </Link>
                                    <Link
                                        prefetch={false}
                                        href="/apps/seismic_analysis"
                                        className="menu-sub-item hover:text-blueGray-500 text-sm text-black"
                                    >
                                        Sismik Veri Analizi Yazılımı
                                    </Link>
                                    <Link
                                        prefetch={false}
                                        href="/apps/ground_response_analysis"
                                        className="menu-sub-item hover:text-blueGray-500 text-sm text-black"
                                    >
                                        Sahaya Özel Davranış Analizi Yazılımı
                                    </Link>
                                    <Link
                                        prefetch={false}
                                        href="/apps/soil_correlation"
                                        className="menu-sub-item hover:text-blueGray-500 text-sm text-black"
                                    >
                                        Zemin Parametresi Korelasyonları
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <div className="hidden lg:block">
                        {user ? (
                            <button
                                className="flex items-center py-2 text-xs font-medium uppercase text-red-400 transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
                                onClick={() => {
                                    supabase.auth.signOut();
                                    router.replace('/authentication/login');
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span>Çıkış Yap</span>
                            </button>
                        ) : (
                            <>
                                <Link
                                    prefetch={false}
                                    href="/authentication/login"
                                    className="btn-accent hover-up-2 text-white"
                                >
                                    Giriş Yap
                                </Link>
                                <Link
                                    prefetch={false}
                                    href="/authentication/signup"
                                    className="btn-primary hover-up-2"
                                >
                                    Kayıt Ol
                                </Link>
                            </>
                        )}
                    </div>
                    <div className="lg:hidden">
                        <button
                            className="navbar-burger flex items-center rounded border border-blue-200 px-3 py-2 text-blue-500 hover:border-blue-300 hover:text-blue-700"
                            onClick={handleHidden}
                        >
                            <svg
                                className="h-4 w-4 fill-current"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <title>Mobile menu</title>
                                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                            </svg>
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    );
}
