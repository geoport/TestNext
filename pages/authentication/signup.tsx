import React, { useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import countryCodes from 'data/country_codes.json';
import { InputField, ListBox } from 'components/elements/FormFields';
import AuthError from 'components/elements/AuthError';
import Link from 'next/link';
import { FormField } from 'models/FormField';
import AuthenticationForm from 'forms/authentication_form';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import SupabaseClient from '@supabase/auth-helpers-react';

type SignupData = {
    fullname: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    countryCode: string;
};
function validatePassword(data: SignupData) {
    const password = data.password;
    const confirmPassword = data.confirmPassword;

    let isValid = true;
    let message = '';
    if (password !== confirmPassword) {
        message = 'Şifreler eşleşmiyor.';
        isValid = false;
    }
    if (password.length < 8) {
        message = 'Şifre en az 8 karakter olmalıdır.';
        isValid = false;
    }
    return { isValid, message };
}

function validateForm(data: SignupData) {
    let { isValid, message } = validatePassword(data);
    if (data.fullname === '') {
        message = 'Lütfen adınızı giriniz.';
        isValid = false;
    }
    if (data.email === '') {
        message = 'Lütfen email adresinizi giriniz.';
        isValid = false;
    }
    if (!data.email.includes('@')) {
        message = 'Lütfen geçerli bir email adresi giriniz.';
        isValid = false;
    }
    if (data.phone === '') {
        message = 'Lütfen telefon numaranızı giriniz.';
        isValid = false;
    }

    return { isValid, message };
}

function CountryCodeList(props: {
    data: SignupData;
    setData: (data: SignupData) => void;
    label: string;
}) {
    const { data, setData, label } = props;
    const countryCodeArray = [];
    for (const [key, value] of Object.entries(countryCodes)) {
        countryCodeArray.push({ key: `${key}(+${value})`, value: value });
    }
    const handleSelected = (e: any) => {
        setData({
            ...data,
            countryCode: e.key,
        });
    };
    const formField = new FormField({
        id: 'countryCode',
        label: label,
        choices: countryCodeArray,
    });
    return (
        <ListBox
            formField={formField}
            selected={data.countryCode}
            setSelected={handleSelected}
        />
    );
}

/**
 *
 * @param data - email or phone value
 * @param column - email or phone
 * @param client - supabase client
 * @returns true if data is duplicate in database else false
 */
async function checkDuplicate(
    data: string,
    column: string,
    client: SupabaseClient.SupabaseClient,
): Promise<boolean> {
    const { data: fetchedData } = await client
        .from('users')
        .select('*')
        .eq(column, data);

    if (fetchedData && fetchedData.length > 0) {
        return true;
    }
    return false;
}
async function createUser(
    data: SignupData,
    client: SupabaseClient.SupabaseClient,
) {
    let status = '200';
    let message = '';
    let redirectUrl = 'https://tr.soilprime.com';
    if (process.env.NODE_ENV === 'production') {
        redirectUrl = 'http://localhost:3000';
    }

    const { isValid, message: formMessage } = validateForm(data);
    if (!isValid) {
        return { status: '400', message: formMessage };
    }

    if (await checkDuplicate(data.email, 'email', client)) {
        status = '400';
        message = 'Bu email adresi kullanımda.';
        return { status, message };
    }
    if (await checkDuplicate(data.phone, 'phone', client)) {
        status = '400';
        message = 'Bu telefon numarası kullanımda.';
        return { status, message };
    }
    const { error } = await client.auth.signUp({
        email: data.email,
        password: data.password,
        phone: data.phone,
        options: {
            emailRedirectTo: redirectUrl,
        },
    });

    if (error) {
        status = '400';
        message = 'Bir hata oluştu.';
        return { status, message };
    }
    await client.from('users').insert({
        email: data.email,
        phone: data.phone,
        country_code: data.countryCode,
        name: data.fullname,
    });

    return { status, message };
}

export default function SignUp() {
    const [data, setData] = useState({
        fullname: '',
        email: '',
        password: '',
        confirmPassword: '',
        countryCode: 'Türkiye(+90)',
        phone: '',
    });
    const [status, setStatus] = useState<string>('');
    const supabase = useSupabaseClient();

    const user = useSession()?.user;
    const router = useRouter();

    if (user) {
        router.replace('/');
    }

    const [error, setError] = useState('');

    const handleChange = (e: any) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const response = await createUser(data as SignupData, supabase);
        if (response.status === '200') {
            setStatus('success');
        } else {
            setError(response.message);
        }
    };

    const form = new AuthenticationForm();

    return (
        <div className="bg-grey-lighter flex min-h-screen flex-col">
            <div className="mx-auto flex flex-1 flex-col items-center justify-center">
                {status === 'success' ? (
                    <div className="text-center text-2xl">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="green"
                            className="mx-auto mb-6 h-14 w-14"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        Kayıt işleminizi başarıyla gerçekleştirdik.
                        <br />
                        Lütfen mail kutunuzu kontrol edip gelen maildeki onay
                        linkine tıklayınız.
                    </div>
                ) : (
                    <>
                        <div className="w-full rounded bg-white px-6 py-8 text-black shadow-md">
                            <h1 className="mb-8 text-center text-3xl">
                                Kayıt Formu
                            </h1>
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-2 gap-2">
                                    <InputField
                                        formField={form.fullname}
                                        value={data.fullname}
                                        onChange={handleChange}
                                    />

                                    <InputField
                                        formField={form.email}
                                        value={data.email}
                                        onChange={handleChange}
                                    />

                                    <CountryCodeList
                                        data={data}
                                        setData={setData}
                                        label="Ülke Kodu"
                                    />

                                    <InputField
                                        formField={form.phone}
                                        value={data.phone}
                                        onChange={handleChange}
                                    />

                                    <InputField
                                        formField={form.password}
                                        value={data.password}
                                        onChange={handleChange}
                                    />

                                    <InputField
                                        formField={form.confirmPassword}
                                        value={data.confirmPassword}
                                        onChange={handleChange}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="my-10 inline-block w-full rounded bg-blue-600 px-7 py-3 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
                                >
                                    Kayıt Ol
                                </button>
                            </form>

                            <AuthError error={error} />

                            <div className="text-grey-dark mt-4 text-center text-sm">
                                Kayıt olarak
                                <a
                                    className="border-grey-dark text-grey-dark border-b no-underline"
                                    href="#"
                                >
                                    <span> </span>Üyelik Sözleşmesi
                                </a>
                                &apos;ni ve
                                <a
                                    className="border-grey-dark text-grey-dark border-b no-underline"
                                    href="#"
                                >
                                    <span> </span>Gizililik ve Çerez Politikası
                                </a>
                                &apos;nı kabul ettiğinizi onaylıyorsunuz.
                            </div>
                        </div>

                        <div className="text-grey-dark mt-6">
                            Zaten bir hesabınız var mı?
                            <Link
                                href="/authentication/login"
                                className="border-blue text-blue border-b no-underline"
                            >
                                <span> </span>Giriş Yapın
                            </Link>
                            .
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
