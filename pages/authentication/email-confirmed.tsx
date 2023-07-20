// pages/email-confirmed.js
import Link from 'next/link';

export default function EmailConfirmed() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-md">
                <h2 className="mb-6 text-2xl font-bold">Üyelik Onaylandı</h2>
                <p className="mb-6 text-gray-700">
                    Emailiniz başarıyla onaylandı. Üye olduğunuz için teşekkür
                    ederiz.
                </p>
                <Link
                    href="/"
                    className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-500"
                >
                    Ana Sayfaya Dön
                </Link>
            </div>
        </div>
    );
}
