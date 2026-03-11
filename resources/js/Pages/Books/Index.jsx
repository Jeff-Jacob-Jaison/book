import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';

export default function Index({ auth, books, flash }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this book?')) {
            destroy(route('books.destroy', id));
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
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight font-serif">Manage Inventory</h2>
                </div>
            }
        >
            <Head title="Manage Books - BookVault" />

            <div className="py-12 bg-[#f0f2f5] min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    {flash?.success && (
                        <div className="mb-6 bg-emerald-100 border border-emerald-400 text-emerald-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{flash.success}</span>
                        </div>
                    )}

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-slate-100 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-[#0c4a30] font-serif">Catalog Directory</h3>
                            <Link href={route('books.create')} className="bg-[#0c4a30] text-white px-4 py-2 rounded font-sans text-sm font-bold shadow-sm hover:bg-emerald-800 transition-colors">
                                + Add New Book
                            </Link>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="py-4 px-4 font-sans font-bold text-slate-500 uppercase text-xs tracking-wider">Format</th>
                                        <th className="py-4 px-4 font-sans font-bold text-slate-500 uppercase text-xs tracking-wider">Author</th>
                                        <th className="py-4 px-4 font-sans font-bold text-slate-500 uppercase text-xs tracking-wider">ISBN</th>
                                        <th className="py-4 px-4 font-sans font-bold text-slate-500 uppercase text-xs tracking-wider">Stock</th>
                                        <th className="py-4 px-4 font-sans font-bold text-slate-500 uppercase text-xs tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {books && books.length > 0 ? books.map((book) => (
                                        <tr key={book.id} className="border-b border-gray-100 hover:bg-slate-50">
                                            <td className="py-3 px-4 font-serif text-gray-900 font-medium">
                                                {book.title}
                                                {book.status === 'pending' && (
                                                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 uppercase tracking-widest">
                                                        Review
                                                    </span>
                                                )}
                                                {book.status === 'rejected' && (
                                                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 uppercase tracking-widest">
                                                        Rejected
                                                    </span>
                                                )}
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${book.type === 'E-Book' ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-800'
                                                    }`}>
                                                    {book.type}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-slate-600">{book.author}</td>
                                            <td className="py-3 px-4 text-slate-600 font-mono text-sm">{book.isbn}</td>
                                            <td className="py-3 px-4">
                                                <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-bold ${book.available_qty > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                                                    }`}>
                                                    {book.available_qty} / {book.quantity}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-right space-x-3">
                                                {book.status === 'pending' && (
                                                    <>
                                                        <button onClick={() => router.patch(route('books.moderate', book.id), { status: 'approved' })} className="text-emerald-600 hover:text-emerald-900 font-bold text-sm">
                                                            Approve
                                                        </button>
                                                        <button onClick={() => router.patch(route('books.moderate', book.id), { status: 'rejected' })} className="text-amber-600 hover:text-amber-900 font-bold text-sm">
                                                            Reject
                                                        </button>
                                                    </>
                                                )}
                                                <Link href={route('books.edit', book.id)} className="text-blue-600 hover:text-blue-900 font-semibold text-sm">
                                                    Edit
                                                </Link>
                                                <button onClick={() => handleDelete(book.id)} className="text-rose-600 hover:text-rose-900 font-semibold text-sm">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="6" className="py-8 text-center text-slate-500 italic">No books found in the vault.</td>
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
