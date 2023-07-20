import React, { useRef, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import AuthError from 'components/elements/AuthError';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export default function ForgotPassword() {
    const emailRef = useRef<HTMLInputElement>(null);
    const supabase = useSupabaseClient();
    const router = useRouter();
    const [error, setError] = useState('');

    async function handleSubmit(e: any) {
        e.preventDefault();
        const { error } = await supabase.auth.resetPasswordForEmail(
            emailRef.current ? emailRef.current.value : '',
        );
        if (error) {
            setError('Şifre sıfırlama işlemi başarısız oldu.');
        } else {
            router.push('/authentication/login');
        }
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
                <div className="w-full rounded-lg bg-white p-6 shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md sm:p-8 md:mt-0">
                    <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
                        Şifremi unuttum
                    </h2>
                    <form
                        className="mt-4 space-y-4 md:space-y-5 lg:mt-5"
                        onSubmit={handleSubmit}
                    >
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                            >
                                E-mail
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                                ref={emailRef}
                            />
                        </div>
                        <button
                            type="submit"
                            className="inline-block rounded bg-blue-600 px-7 py-3 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
                        >
                            Şifre sıfırlama maili gönder
                        </button>
                    </form>
                </div>
                <AuthError error={error} />
            </div>
        </section>
    );
}
