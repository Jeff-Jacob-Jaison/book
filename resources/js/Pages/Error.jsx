import { Head, Link } from '@inertiajs/react';
import BookLogo from '@/Components/BookLogo';

export default function ErrorPage({ status }) {
    const title = {
        503: '503: Service Unavailable',
        500: '500: Server Error',
        404: '404: Page Not Found',
        403: '403: Forbidden',
    }[status] || 'Error';

    const description = {
        503: 'Sorry, we are doing some maintenance. Please check back soon.',
        500: 'Whoops, something went wrong on our servers.',
        404: 'Sorry, the page you are looking for could not be found.',
        403: 'Sorry, you are forbidden from accessing this page.',
    }[status] || 'An unexpected error occurred.';

    return (
        <div className="min-h-screen bg-[#f8f9fa] font-sans antialiased text-gray-800 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Global Cloud Background Texture */}
            <div className="absolute inset-0 z-0 bg-[url('/images/cloud-texture.png')] bg-cover bg-center bg-fixed opacity-70 pointer-events-none" />

            <div className="relative z-10 w-full max-w-lg bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col items-center p-12 text-center">

                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-8 shadow-inner border border-emerald-100">
                    <BookLogo className="w-10 h-10 text-emerald-700 drop-shadow-sm" />
                </div>

                <h1 className="text-6xl font-extrabold text-[#0c4a30] font-serif mb-2 tracking-tighter">
                    {status}
                </h1>

                <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
                    {title.split(': ')[1] || title}
                </h2>

                <p className="text-slate-500 mb-8 leading-relaxed">
                    {description}
                </p>

                <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 bg-[#0c4a30] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-emerald-800 transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Return to Safety
                </Link>
            </div>

            <div className="relative z-10 mt-12 text-center text-sm text-gray-400">
                &copy; {new Date().getFullYear()} Book Vault. All rights reserved.
            </div>
        </div>
    );
}
