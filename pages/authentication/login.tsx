import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import AuthError from 'components/elements/AuthError';
import Image from 'next/image';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';

export default function LoginPage() {
    const [data, setData] = useState({ email: '', password: '' });
    const user = useSession()?.user;
    const router = useRouter();
    if (user) {
        router.replace('/');
    }
    const supabase = useSupabaseClient();
    const handleChange = (e: { target: { id: string; value: any } }) => {
        setData({ ...data, [e.target.id]: e.target.value });
    };
    const [error, setError] = useState('');
    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { error } = await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
        });

        if (error) {
            setError('Kullanıcı adı veya şifre hatalı');
        }
    };

    return (
        <section className="h-screen">
            <div className="container h-full">
                <div className="h-full px-6 text-gray-800">
                    <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between xl:justify-center">
                        <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                            <div className="w-full">
                                <Image
                                    src="/assets/imgs/login.webp"
                                    alt="Login"
                                    width={800}
                                    height={534}
                                />
                            </div>
                        </div>
                        <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:ml-20 xl:w-5/12">
                            <form onSubmit={handleLogin}>
                                <div className="mb-6">
                                    <input
                                        type="text"
                                        className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                                        id="email"
                                        placeholder="Email address"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-6">
                                    <input
                                        type="password"
                                        className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                                        id="password"
                                        placeholder="Password"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-6 flex items-center justify-between">
                                    <div className="form-group form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input float-left mt-1 mr-2 h-4 w-4 cursor-pointer appearance-none rounded-sm border border-gray-300 bg-white bg-contain bg-center bg-no-repeat align-top transition duration-200 checked:border-blue-600 checked:bg-blue-600 focus:outline-none"
                                            id="exampleCheck2"
                                        />
                                        <label
                                            className="form-check-label inline-block text-gray-800"
                                            htmlFor="exampleCheck2"
                                        >
                                            Beni hatırla
                                        </label>
                                    </div>
                                    <Link
                                        href="/authentication/forgot-password"
                                        className="text-gray-800"
                                    >
                                        Şifremi unuttum?
                                    </Link>
                                </div>

                                <div className="text-center lg:text-left">
                                    <button
                                        type="submit"
                                        className="inline-block rounded bg-blue-600 px-7 py-3 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
                                    >
                                        Giriş Yap
                                    </button>
                                    <div className="mt-2 mb-0 pt-1 text-sm font-semibold">
                                        Hesabınız yok mu?
                                        <Link
                                            href="/authentication/signup"
                                            className="text-red-600 transition duration-200 ease-in-out hover:text-red-700 focus:text-red-700"
                                        >
                                            Kayıt ol
                                        </Link>
                                    </div>
                                </div>
                                <AuthError error={error} />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
