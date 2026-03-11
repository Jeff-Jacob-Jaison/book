import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import React from 'react';

export default function Dashboard({ auth }) {
    const userRole = auth.user?.role?.name || 'Member';
    const isLibrarian = userRole === 'Librarian';

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 w-full">
                    <div>
                        <h2 className="font-semibold text-2xl text-[#0c4a30] leading-tight font-serif mb-1">Welcome, {auth.user.name}</h2>
                        <p className="text-slate-500 font-sans text-sm">
                            BookVault Internal Portal. You are currently logged in with <strong className="text-gray-900">{userRole}</strong> access privileges.
                        </p>
                    </div>
                    <div className="bg-emerald-50 text-[#0c4a30] px-5 py-2 rounded-full font-bold text-xs tracking-wider uppercase border border-emerald-100">
                        {userRole} Access
                    </div>
                </div>
            }
        >
            <Head>
                <title>Dashboard - BookVault</title>
                <style>{`
                    @keyframes dashboard-fade-up {
                        0% { opacity: 0; transform: translateY(20px); }
                        100% { opacity: 1; transform: translateY(0); }
                    }
                    .animate-dashboard-fade-up {
                        opacity: 0;
                        animation: dashboard-fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    }
                `}</style>
            </Head>

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">



                {/* Librarian Dashboard Panels */}
                {isLibrarian && (
                    <div className="mb-12">
                        <h3 className="text-lg font-bold text-gray-900 uppercase tracking-widest mb-6 border-b border-gray-200/50 pb-2">Librarian Operations</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            {/* Manage Books Card */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 border-l-4 border-l-transparent hover:border-l-[#0c4a30] hover:shadow-md hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full animate-dashboard-fade-up" style={{ animationDelay: '100ms' }}>
                                <div className="w-12 h-12 bg-emerald-100/80 text-emerald-600 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-2 font-serif">Manage Inventory</h4>
                                <p className="text-slate-500 font-sans text-sm mb-6 flex-grow">
                                    Add new books to the vault, edit existing metadata, or remove damaged/lost copies from the catalog.
                                </p>
                                <Link href="/books" className="inline-flex items-center justify-between w-full bg-[#0c4a30] text-white font-bold px-4 py-2.5 rounded-lg hover:bg-emerald-800 transition-colors shadow-sm">
                                    Access Directory
                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                                </Link>
                            </div>

                            {/* Manage Lendings Card */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 border-l-4 border-l-transparent hover:border-l-[#0c4a30] hover:shadow-md hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full animate-dashboard-fade-up" style={{ animationDelay: '200ms' }}>
                                <div className="w-12 h-12 bg-blue-100/80 text-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-2 font-serif">Lending Records</h4>
                                <p className="text-slate-500 font-sans text-sm mb-6 flex-grow">
                                    View all books currently issued to members. Receive returns and automatically calculate overdue fines.
                                </p>
                                <Link href="/lendings" className="inline-flex items-center justify-between w-full bg-blue-600 text-white font-bold px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                                    View Active Lendings
                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                                </Link>
                            </div>

                            {/* Manage Fines Card */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 border-l-4 border-l-transparent hover:border-l-[#0c4a30] hover:shadow-md hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full animate-dashboard-fade-up" style={{ animationDelay: '300ms' }}>
                                <div className="w-12 h-12 bg-rose-100/80 text-rose-600 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-2 font-serif">Financials & Fines</h4>
                                <p className="text-slate-500 font-sans text-sm mb-6 flex-grow">
                                    Monitor outstanding balances from members who returned books late. Process payments and clear fines.
                                </p>
                                <Link href="/fines" className="inline-flex items-center justify-between w-full bg-rose-600 text-white font-bold px-4 py-2.5 rounded-lg hover:bg-rose-700 transition-colors shadow-sm">
                                    Collect Fines
                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                                </Link>
                            </div>

                        </div>
                    </div>
                )}

                {/* Member Dashboard Panels */}
                {!isLibrarian && (
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 uppercase tracking-widest mb-6 border-b border-gray-200/50 pb-2">Member Portal</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                            {/* My Rentals Card */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 border-l-4 border-l-transparent hover:border-l-[#0c4a30] hover:shadow-md hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full animate-dashboard-fade-up" style={{ animationDelay: '100ms' }}>
                                <div className="w-12 h-12 bg-emerald-100/80 text-emerald-600 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-2 font-serif">My Active Rentals</h4>
                                <p className="text-slate-500 font-sans text-sm mb-6 flex-grow">
                                    View the books you currently hold from the vault and check their due dates.
                                </p>
                                <Link href="/lendings" className="inline-flex items-center justify-between w-full bg-[#0c4a30] text-white font-bold px-4 py-2.5 rounded-lg hover:bg-emerald-800 transition-colors shadow-sm">
                                    View Rentals
                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                                </Link>
                            </div>

                            {/* My E-Library (Purchases) */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 border-l-4 border-l-transparent hover:border-l-[#0c4a30] hover:shadow-md hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full animate-dashboard-fade-up" style={{ animationDelay: '200ms' }}>
                                <div className="w-12 h-12 bg-blue-100/80 text-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-2 font-serif">My E-Library</h4>
                                <p className="text-slate-500 font-sans text-sm mb-6 flex-grow">
                                    Access your purchased digital books. Read and download your permanent collection.
                                </p>
                                <Link href="/purchases" className="inline-flex items-center justify-between w-full bg-blue-600 text-white font-bold px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                                    View Library
                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                                </Link>
                            </div>

                            {/* Pay Fines Card */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 border-l-4 border-l-transparent hover:border-l-[#0c4a30] hover:shadow-md hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full animate-dashboard-fade-up" style={{ animationDelay: '300ms' }}>
                                <div className="w-12 h-12 bg-rose-100/80 text-rose-600 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-2 font-serif">My Fines</h4>
                                <p className="text-slate-500 font-sans text-sm mb-6 flex-grow">
                                    Check if you have any outstanding penalty fees for late returns.
                                </p>
                                <Link href="/fines" className="inline-flex items-center justify-between w-full bg-rose-600 text-white font-bold px-4 py-2.5 rounded-lg hover:bg-rose-700 transition-colors shadow-sm">
                                    Check Fines
                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                                </Link>
                            </div>

                            {/* My E-Books / Selling Portal */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 border-l-4 border-l-transparent hover:border-l-[#0c4a30] hover:shadow-md hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full animate-dashboard-fade-up" style={{ animationDelay: '400ms' }}>
                                <div className="w-12 h-12 bg-purple-100/80 text-purple-600 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-2 font-serif">Selling Portal</h4>
                                <p className="text-slate-500 font-sans text-sm mb-6 flex-grow">
                                    Upload your own E-Books, track their moderation statuses, and view passive commission earnings.
                                </p>
                                <Link href="/submissions" className="inline-flex items-center justify-between w-full bg-purple-600 text-white font-bold px-4 py-2.5 rounded-lg hover:bg-purple-700 transition-colors shadow-sm">
                                    Manage Library
                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout >
    );
}
