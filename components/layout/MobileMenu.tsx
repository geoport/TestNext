import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/dist/client/router';

type MobileMenuProps = {
    hiddenClass: string;
    handleRemove: () => void;
};

const MobileMenu = ({ hiddenClass, handleRemove }: MobileMenuProps) => {
    const [isActive, setIsActive] = useState({
        status: false,
        key: '',
    });

    const handleToggle = (key: string) => {
        if (isActive.key === key) {
            setIsActive({
                status: false,
                key,
            });
        } else {
            setIsActive({
                status: true,
                key,
            });
        }
    };
    const router = useRouter();
    const user = useSession()?.user;
    const supabase = useSupabaseClient();

    return (
        <>
            <div
                className={`${hiddenClass} navbar-menu relative z-50 transition duration-300`}
            >
                <div className="navbar-backdrop bg-blueGray-800 fixed inset-0 opacity-25"></div>
                <nav className="fixed top-0 left-0 bottom-0 flex w-5/6 max-w-sm flex-col overflow-y-auto border-r bg-white py-6 px-6 transition duration-300">
                    <div className="mb-8 flex items-center">
                        <button className="navbar-close" onClick={handleRemove}>
                            <svg
                                className="text-blueGray-400 h-6 w-6 cursor-pointer hover:text-blue-500"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <div>
                        <ul className="mobile-menu">
                            <li className="mb-1 rounded-xl">
                                <Link
                                    href="/"
                                    className="hover:text-blueGray-500 text-sm font-semibold"
                                >
                                    Ana Sayfa
                                </Link>
                            </li>
                            <li className="mb-1 rounded-xl">
                                <Link
                                    prefetch={false}
                                    href="/about-us"
                                    className="hover:text-blueGray-500 text-sm font-semibold"
                                >
                                    Hakkımızda
                                </Link>
                            </li>
                            <li className="mb-1">
                                <Link
                                    prefetch={false}
                                    href="/price-list"
                                    className="hover:text-blueGray-500 text-sm font-semibold"
                                >
                                    Fiyat Listesi
                                </Link>
                            </li>
                            <li
                                className={
                                    isActive.key == '2'
                                        ? 'menu-item-has-children active mb-1 rounded-xl'
                                        : 'menu-item-has-children mb-1 rounded-xl'
                                }
                                onClick={() => handleToggle('2')}
                            >
                                <span className="menu-expand">+</span>
                                <Link href="#">Yazılımlar</Link>
                                <ul
                                    className={
                                        isActive.key == '2'
                                            ? 'dropdown pl-5'
                                            : 'hidden'
                                    }
                                >
                                    <li>
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
                                            Sahaya Özel Davranış Analizi
                                            Yazılımı
                                        </Link>
                                        <Link
                                            prefetch={false}
                                            href="/apps/gmp_prediction"
                                            className="menu-sub-item hover:text-blueGray-500 text-sm text-black"
                                        >
                                            AI Yer Hareketi Parametresi Tahmini
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <div className="border-blueGray-100 mt-4 border-t pt-6">
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
                                        className="btn-accent hover-up-2"
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
                    </div>
                </nav>
            </div>
        </>
    );
};

export default MobileMenu;
