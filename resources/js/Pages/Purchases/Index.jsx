import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, purchases }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="text-slate-500 hover:text-emerald-700 transition-colors" title="Back to Dashboard">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    </Link>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight font-serif">My E-Library</h2>
                </div>
            }
        >
            <Head title="Purchased Content - BookVault" />

            <div className="py-12 bg-[#f0f2f5] min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <div className="mb-6 flex justify-between items-center px-2">
                        <div>
                            <h3 className="text-2xl font-bold font-serif text-[#0c4a30]">Digital Shelf</h3>
                            <p className="font-sans text-sm text-slate-500 mt-1">Access your purchased E-Books and downloadable reading material.</p>
                        </div>
                        <Link href="/collection" className="bg-[#0c4a30] text-white px-5 py-2.5 rounded font-sans text-sm font-bold shadow hover:bg-emerald-800 transition-colors">
                            Browse Storefront
                        </Link>
                    </div>

                    {purchases && purchases.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {purchases.map(({ id, book, created_at }) => (
                                <div key={id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col items-center text-center group">
                                    <div className="w-32 aspect-[2/3] mb-5 relative shadow-md rounded overflow-hidden cursor-pointer group-hover:scale-105 transition-transform duration-300">
                                        <img
                                            src={book.cover_image ? `/images/${book.cover_image}` : '/images/about-statue.png'}
                                            alt={book.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-r from-black/20 to-transparent mix-blend-multiply pointer-events-none"></div>
                                    </div>

                                    <h4 className="font-serif font-bold text-lg text-gray-900 leading-snug mb-1">
                                        {book.title}
                                    </h4>
                                    <p className="font-sans text-xs text-slate-500 italic mb-4">by {book.author}</p>

                                    <div className="mt-auto w-full pt-4 border-t border-slate-100">
                                        {book.file_path ? (
                                            <a
                                                href={`/ebooks/${book.file_path}#toolbar=0`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block w-full text-center bg-[#f0ece6] hover:bg-[#e1dacd] text-[#0c4a30] py-2 rounded font-sans text-sm font-bold transition-colors"
                                            >
                                                Read Online
                                            </a>
                                        ) : (
                                            <button disabled className="w-full bg-slate-100 text-slate-400 py-2 rounded font-sans text-sm font-bold cursor-not-allowed">
                                                File Unavailable
                                            </button>
                                        )}
                                        <div className="text-[10px] text-slate-400 font-sans tracking-wide uppercase mt-3">
                                            Purchased: {new Date(created_at).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-slate-100 p-12 text-center">
                            <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold font-serif text-gray-900 mb-2">Your library is empty.</h3>
                            <p className="text-slate-500 font-sans text-sm mb-6 max-w-md mx-auto">
                                You haven't purchased any digital E-Books yet. Head over to the storefront to discover immersive stories.
                            </p>
                            <Link href="/collection" className="inline-block bg-[#0c4a30] text-white px-8 py-3 rounded font-sans text-sm font-bold shadow hover:bg-emerald-800 transition-colors">
                                Explore Storefront
                            </Link>
                        </div>
                    )}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
