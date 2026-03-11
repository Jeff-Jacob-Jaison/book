import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, books, flash }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="text-slate-500 hover:text-emerald-700 transition-colors" title="Back to Dashboard">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    </Link>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight font-serif">Selling Portal</h2>
                </div>
            }
        >
            <Head title="My E-Books - BookVault" />

            <div className="py-12 bg-[#f0f2f5] min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    {/* Member Commission Balance Readout */}
                    <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-emerald-800 rounded-2xl p-6 text-white shadow-lg overflow-hidden relative">
                            {/* Decorative Pattern */}
                            <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

                            <div className="relative z-10">
                                <h3 className="text-emerald-100 font-sans text-xs font-bold uppercase tracking-widest mb-1">Available Funds</h3>
                                <div className="text-4xl font-serif font-bold text-white tracking-tight">
                                    ${Number(auth.user.balance || 0).toFixed(2)}
                                </div>
                                <p className="text-sm text-emerald-200 mt-2 italic font-serif">
                                    Total 20% passive commissions accrued from your published material.
                                </p>

                                {/* Conditional Withdrawal Button */}
                                {Number(auth.user.balance) >= 10.00 && (
                                    <div className="mt-5 border-t border-emerald-700/50 pt-4">
                                        <Link
                                            href={route('submissions.withdraw')}
                                            method="post"
                                            as="button"
                                            className="inline-flex items-center gap-2 bg-yellow-400 text-yellow-950 px-5 py-2.5 rounded shadow hover:bg-yellow-300 font-sans text-sm font-bold transition-colors w-full justify-center md:w-auto md:justify-start"
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                                            Withdraw Funds
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-slate-100 p-6 flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-[#0c4a30] font-serif mb-1">Upload New Material</h3>
                                <p className="text-sm text-slate-500 font-sans">
                                    Submit your own E-Books for review. Once approved by our Librarians, they will go live on the storefront for members to purchase.
                                </p>
                            </div>
                            <div className="ml-4">
                                <Link href={route('submissions.create')} className="bg-[#0c4a30] text-white px-6 py-3 rounded whitespace-nowrap font-sans text-sm font-bold shadow hover:bg-emerald-800 transition-colors">
                                    + Sell E-Book
                                </Link>
                            </div>
                        </div>
                    </div>

                    {flash?.success && (
                        <div className="mb-6 bg-emerald-100 border border-emerald-400 text-emerald-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{flash.success}</span>
                        </div>
                    )}

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-slate-100 p-6">
                        <h3 className="text-xl font-bold text-gray-900 font-serif mb-6">My Published Titles</h3>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="py-4 px-4 font-sans font-bold text-slate-500 uppercase text-xs tracking-wider">Book Name</th>
                                        <th className="py-4 px-4 font-sans font-bold text-slate-500 uppercase text-xs tracking-wider">Author</th>
                                        <th className="py-4 px-4 font-sans font-bold text-slate-500 uppercase text-xs tracking-wider">Selling Price</th>
                                        <th className="py-4 px-4 font-sans font-bold text-slate-500 uppercase text-xs tracking-wider">Moderation Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {books && books.length > 0 ? books.map((book) => (
                                        <tr key={book.id} className="border-b border-gray-100 hover:bg-slate-50 transition-colors">
                                            <td className="py-3 px-4 font-serif text-gray-900 font-medium">
                                                {book.title}
                                            </td>
                                            <td className="py-3 px-4 text-slate-600">{book.author}</td>
                                            <td className="py-3 px-4 text-slate-900 font-bold font-mono">
                                                ${Number(book.price).toFixed(2)}
                                            </td>
                                            <td className="py-3 px-4">
                                                {book.status === 'approved' && (
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 uppercase tracking-wide">
                                                        Live on Store
                                                    </span>
                                                )}
                                                {book.status === 'pending' && (
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 uppercase tracking-wide">
                                                        Awaiting Review
                                                    </span>
                                                )}
                                                {book.status === 'rejected' && (
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 uppercase tracking-wide">
                                                        Rejected
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="4" className="py-12 text-center text-slate-500 italic">
                                                You haven't submitted any books for sale yet.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
