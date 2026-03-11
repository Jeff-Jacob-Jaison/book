import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ auth, wishlists }) {
    const handleRemove = (id) => {
        router.delete(route('wishlists.destroy', id), {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">My Wishlist</h2>}
        >
            <Head title="Wishlist" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 border-b border-gray-200">
                            {wishlists.length === 0 ? (
                                <p className="text-gray-500 italic">Your wishlist is currently empty.</p>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                                    {wishlists.map((item) => {
                                        const isLibraryBook = !!item.book;
                                        const book = item.book || item.book_for_sale;

                                        if (!book) return null;

                                        return (
                                            <div key={item.id} className="border border-gray-200 rounded-lg p-4 flex flex-col items-center text-center shadow-sm relative">
                                                <div className="absolute top-2 right-2">
                                                    <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded ${isLibraryBook ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}`}>
                                                        {isLibraryBook ? 'Library' : 'Marketplace'}
                                                    </span>
                                                </div>

                                                <div className="w-32 h-48 mb-4">
                                                    <img
                                                        src={book.cover_image ? `/images/${book.cover_image}` : '/images/about-statue.png'}
                                                        alt={book.title}
                                                        className="w-full h-full object-cover rounded shadow shadow-gray-400"
                                                    />
                                                </div>

                                                <h3 className="font-bold text-lg leading-tight mb-1 truncate w-full" title={book.title}>{book.title}</h3>
                                                <p className="text-sm text-gray-600 mb-4 truncate w-full">by {book.author}</p>

                                                <div className="mt-auto w-full flex flex-col gap-2">
                                                    {isLibraryBook ? (
                                                        <Link
                                                            href={route('collection')}
                                                            className="w-full px-4 py-2 bg-[#0c4a30] text-white text-sm font-bold uppercase tracking-widest hover:bg-emerald-800 transition rounded text-center"
                                                        >
                                                            Go to Collection
                                                        </Link>
                                                    ) : (
                                                        <button disabled className="w-full px-4 py-2 bg-gray-300 text-white text-sm font-bold uppercase tracking-widest cursor-not-allowed rounded">
                                                            Coming Soon
                                                        </button>
                                                    )}

                                                    <button
                                                        onClick={() => handleRemove(item.id)}
                                                        className="w-full px-4 py-2 border border-red-300 text-red-600 hover:bg-red-50 text-sm font-bold uppercase tracking-widest transition rounded"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
