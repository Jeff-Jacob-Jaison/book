import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Index({ auth, fines, flash }) {
    const isLibrarian = auth.user?.role?.name === 'Librarian';
    const { put, processing } = useForm();

    const handleMarkPaid = (id) => {
        if (confirm('Confirm receipt of payment for this fine?')) {
            put(route('fines.update', id));
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
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight font-serif">Financials & Fines</h2>
                </div>
            }
        >
            <Head title="Fines - BookVault" />

            <div className="py-12 bg-[#f0f2f5] min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    {flash?.success && (
                        <div className="mb-6 bg-emerald-100 border border-emerald-400 text-emerald-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{flash.success}</span>
                        </div>
                    )}

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-slate-100 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-[#0c4a30] font-serif">
                                {isLibrarian ? "All System Fines" : "My Outstanding Fines"}
                            </h3>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="py-4 px-4 font-sans font-bold text-slate-500 uppercase text-xs tracking-wider">Details</th>
                                        {isLibrarian && <th className="py-4 px-4 font-sans font-bold text-slate-500 uppercase text-xs tracking-wider">Member</th>}
                                        <th className="py-4 px-4 font-sans font-bold text-slate-500 uppercase text-xs tracking-wider">Issued On</th>
                                        <th className="py-4 px-4 font-sans font-bold text-slate-500 uppercase text-xs tracking-wider">Amount</th>
                                        <th className="py-4 px-4 font-sans font-bold text-slate-500 uppercase text-xs tracking-wider">Status</th>
                                        {isLibrarian && <th className="py-4 px-4 font-sans font-bold text-slate-500 uppercase text-xs tracking-wider text-right">Actions</th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {fines && fines.length > 0 ? fines.map((fine) => (
                                        <tr key={fine.id} className="border-b border-gray-100 hover:bg-slate-50">
                                            <td className="py-3 px-4 font-serif text-gray-900 font-medium whitespace-nowrap">
                                                Overdue Return
                                                <div className="text-xs text-slate-500 font-sans mt-1">Book: {fine.lending?.book?.title}</div>
                                            </td>

                                            {isLibrarian && (
                                                <td className="py-3 px-4 text-slate-600">
                                                    {fine.user?.name}
                                                </td>
                                            )}

                                            <td className="py-3 px-4 text-slate-600">{new Date(fine.created_at).toLocaleDateString()}</td>

                                            <td className="py-3 px-4 font-bold text-rose-600 font-mono text-lg">
                                                ${parseFloat(fine.amount).toFixed(2)}
                                            </td>

                                            <td className="py-3 px-4">
                                                <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-bold uppercase ${fine.paid ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                                                    }`}>
                                                    {fine.paid ? 'Paid' : 'Unpaid'}
                                                </span>
                                            </td>

                                            {isLibrarian && (
                                                <td className="py-3 px-4 text-right">
                                                    {!fine.paid ? (
                                                        <button
                                                            onClick={() => handleMarkPaid(fine.id)}
                                                            disabled={processing}
                                                            className="text-sm font-bold text-emerald-700 border border-emerald-200 bg-emerald-50 hover:bg-emerald-600 hover:text-white px-3 py-1.5 rounded transition-colors"
                                                        >
                                                            Mark as Paid
                                                        </button>
                                                    ) : (
                                                        <span className="text-xs text-slate-400 italic">Resolved</span>
                                                    )}
                                                </td>
                                            )}
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={isLibrarian ? "6" : "5"} className="py-8 text-center text-slate-500 italic">No fine records found.</td>
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
