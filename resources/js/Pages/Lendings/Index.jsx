import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';

export default function Index({ auth, lendings, flash }) {
    const isLibrarian = auth.user?.role?.name === 'Librarian';
    const [processingId, setProcessingId] = useState(null);

    const handleReturn = (id) => {
        if (confirm('Process return for this book? This will calculate any overdue fines.')) {
            setProcessingId(id);
            router.post(route('lendings.return', id), {}, {
                preserveScroll: true,
                onFinish: () => setProcessingId(null)
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="text-slate-500 hover:text-emerald-700 transition-colors" title="Back to Dashboard">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    </Link>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight font-serif">Lending Records</h2>
                </div>
            }
        >
            <Head title="Lendings - BookVault" />

            <div className="py-12 bg-[#f0f2f5] min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    {flash?.success && (
                        <div className="mb-6 bg-emerald-100 border border-emerald-400 text-emerald-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{flash.success}</span>
                        </div>
                    )}

                    {flash?.error && (
                        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{flash.error}</span>
                        </div>
                    )}

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-slate-100 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-[#0c4a30] font-serif">
                                {isLibrarian ? "All Active Member Rentals" : "My Active Rentals"}
                            </h3>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="py-4 px-4 font-sans font-bold text-slate-500 uppercase text-xs tracking-wider">Book Title</th>
                                        {isLibrarian && <th className="py-4 px-4 font-sans font-bold text-slate-500 uppercase text-xs tracking-wider">Borrower</th>}
                                        <th className="py-4 px-4 font-sans font-bold text-slate-500 uppercase text-xs tracking-wider">Borrowed On</th>
                                        <th className="py-4 px-4 font-sans font-bold text-slate-500 uppercase text-xs tracking-wider">Due Date</th>
                                        <th className="py-4 px-4 font-sans font-bold text-slate-500 uppercase text-xs tracking-wider">Status</th>
                                        <th className="py-4 px-4 font-sans font-bold text-slate-500 uppercase text-xs tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lendings && lendings.length > 0 ? lendings.map((lending) => (
                                        <tr key={lending.id} className="border-b border-gray-100 hover:bg-slate-50">
                                            <td className="py-3 px-4 font-serif text-gray-900 font-medium">{lending.book?.title}</td>

                                            {isLibrarian && (
                                                <td className="py-3 px-4 text-slate-600">
                                                    {lending.user?.name}
                                                    <div className="text-xs text-slate-400">{lending.user?.email}</div>
                                                </td>
                                            )}

                                            <td className="py-3 px-4 text-slate-600">{new Date(lending.created_at).toLocaleDateString()}</td>

                                            <td className={`py-3 px-4 font-semibold ${new Date(lending.due_date) < new Date() && lending.status === 'borrowed' ? 'text-red-600' : 'text-slate-600'}`}>
                                                {new Date(lending.due_date).toLocaleDateString()}
                                            </td>

                                            <td className="py-3 px-4">
                                                <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-bold uppercase ${lending.status === 'borrowed' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                                                    }`}>
                                                    {lending.status}
                                                </span>
                                            </td>

                                            <td className="py-3 px-4 text-right">
                                                {lending.status === 'borrowed' ? (
                                                    <button
                                                        onClick={() => handleReturn(lending.id)}
                                                        disabled={processingId === lending.id}
                                                        className={`text-sm font-bold border px-3 py-1.5 rounded transition-colors ${isLibrarian
                                                            ? "text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                                            : "text-emerald-700 border-emerald-200 bg-emerald-50 hover:bg-emerald-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                                            }`}
                                                    >
                                                        {processingId === lending.id ? 'Processing...' : (isLibrarian ? "Receive Return" : "Return Book")}
                                                    </button>
                                                ) : (
                                                    <span className="text-xs text-slate-400 italic">
                                                        Returned {new Date(lending.returned_at).toLocaleDateString()}
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={isLibrarian ? "6" : "5"} className="py-8 text-center text-slate-500 italic">No lending records found.</td>
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
