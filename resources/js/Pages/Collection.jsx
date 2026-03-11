import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import BookLogo from "@/Components/BookLogo";
import Modal from "@/Components/Modal";

export default function Collection({ books, purchasedBookIds = [], auth }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFormat, setSelectedFormat] = useState("All");
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [isGenresOpen, setIsGenresOpen] = useState(false);
    const [sortOrder, setSortOrder] = useState("");
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [rentingBook, setRentingBook] = useState(null);
    const [previewBook, setPreviewBook] = useState(null);
    const genresRef = React.useRef(null);
    const sortRef = React.useRef(null);

    const getAccent = (index) => {
        const accents = [
            "from-purple-500 to-indigo-600",
            "from-blue-400 to-emerald-400",
            "from-slate-600 to-slate-900",
            "from-amber-600 to-orange-800",
            "from-cyan-400 to-blue-600",
            "from-rose-800 to-red-950",
            "from-sky-500 to-indigo-500",
            "from-fuchsia-600 to-purple-800"
        ];
        return accents[index % accents.length];
    };

    React.useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, []);

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (genresRef.current && !genresRef.current.contains(event.target)) {
                setIsGenresOpen(false);
            }
            if (sortRef.current && !sortRef.current.contains(event.target)) {
                setIsSortOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const navLinks = [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Collection", href: "/collection" },
        { label: "Services", href: "/services" },
        { label: "Contact", href: "/contact" },
    ];

    const filteredBooks = books ? books.filter(b => {
        const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || b.author.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFormat = selectedFormat === "All" || b.type === selectedFormat;
        const bookGenres = (b.genre || "").split(',').map(g => g.trim());
        const matchesGenre = selectedGenres.length === 0 || selectedGenres.some(sg => bookGenres.includes(sg));
        return matchesSearch && matchesFormat && matchesGenre;
    }).sort((a, b) => {
        if (sortOrder === "price_asc") return parseFloat(a.price || 0) - parseFloat(b.price || 0);
        if (sortOrder === "price_desc") return parseFloat(b.price || 0) - parseFloat(a.price || 0);
        return 0;
    }) : [];

    const baseGenres = [
        "Fiction", "Non-Fiction", "Mystery/Thriller", "Sci-Fi",
        "Fantasy", "Biography", "History", "Children's", "Romance", "Other"
    ];
    const dbGenres = (books || []).flatMap(b => (b.genre || "").split(',').map(g => g.trim())).filter(Boolean);
    const availableGenres = [...new Set([...baseGenres, ...dbGenres])].sort();

    const handleRent = (id, e) => {
        e.preventDefault();

        if (!auth.user) {
            router.get(route('login'));
            return;
        }

        setRentingBook(id);

        router.post(route('lendings.store'), {
            book_id: id,
            user_id: auth.user.id
        }, {
            preserveScroll: true,
            onFinish: () => setRentingBook(null)
        });
    };

    const handlePurchase = (id, e) => {
        e.preventDefault();

        if (!auth.user) {
            router.get(route('login'));
            return;
        }

        setRentingBook(id);

        router.post(route('purchases.store'), {
            book_id: id,
            user_id: auth.user.id
        }, {
            preserveScroll: true,
            onFinish: () => setRentingBook(null)
        });
    };

    const handleWishlist = (id) => {
        if (!auth.user) {
            router.get(route('login'));
            return;
        }

        router.post(route('wishlists.store'), {
            book_id: id
        }, {
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Collection - BookVault" />

            {/* Custom Brand Background - Soft library parchment feel */}
            <div className="bg-[#f0ece6] text-gray-800 font-serif antialiased min-h-screen flex flex-col selection:bg-emerald-900 selection:text-white">

                {/* ═══════ ORIGINAL BOOKVAULT NAVBAR (Dark Theme) ═══════ */}
                <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-[#0c4a30]/95 backdrop-blur-md shadow-lg border-b border-[#083522] py-3" : "bg-transparent py-5"}`}>
                    <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                        <Link href="/" className="flex items-center gap-3 group">
                            <BookLogo className={`h-9 w-9 text-emerald-400 drop-shadow-sm transition-transform group-hover:scale-105`} />
                            <span className={`text-lg font-bold tracking-widest uppercase text-white`}>Book Vault</span>
                        </Link>

                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((l) => (
                                <Link key={l.label} href={l.href}
                                    className={`text-sm font-sans font-medium tracking-wide transition-colors relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:transition-all ${l.label === 'Collection'
                                        ? 'text-emerald-400 after:w-full after:bg-emerald-400'
                                        : 'text-emerald-100/70 hover:text-white after:w-0 hover:after:w-full after:bg-emerald-400'
                                        }`}>
                                    {l.label}
                                </Link>
                            ))}
                        </div>

                        {auth.user ? (
                            <Link href="/dashboard"
                                className={`hidden md:inline-flex bg-white text-[#0c4a30] hover:bg-emerald-100 font-sans text-sm font-bold tracking-wide px-7 py-2.5 rounded transition-colors shadow-sm`}>
                                Dashboard
                            </Link>
                        ) : (
                            <Link href="/login"
                                className={`hidden md:inline-flex bg-white text-[#0c4a30] hover:bg-emerald-100 font-sans text-sm font-bold tracking-wide px-7 py-2.5 rounded transition-colors shadow-sm`}>
                                Member Access
                            </Link>
                        )}

                        <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden flex flex-col gap-1.5">
                            <span className={`block w-6 h-0.5 bg-white transition-transform ${mobileMenu ? "rotate-45 translate-y-2" : ""}`} />
                            <span className={`block w-6 h-0.5 bg-white transition-opacity ${mobileMenu ? "opacity-0" : ""}`} />
                            <span className={`block w-6 h-0.5 bg-white transition-transform ${mobileMenu ? "-rotate-45 -translate-y-2" : ""}`} />
                        </button>
                    </div>
                </nav>

                {/* ═══════ HERO: THE VAULT ═══════ */}
                <section className="relative pt-40 pb-20 px-6 overflow-hidden bg-[#0c4a30]">
                    {/* Subtle pattern overlay */}
                    <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
                    <div className="max-w-7xl mx-auto relative z-10 text-center">
                        <div className="inline-flex items-center justify-center gap-2 mb-6 opacity-80">
                            <span className="h-[1px] w-8 bg-emerald-400"></span>
                            <p className="text-emerald-400 font-sans text-xs font-bold uppercase tracking-[0.2em]">Curated Library</p>
                            <span className="h-[1px] w-8 bg-emerald-400"></span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-serif">
                            The Collection
                        </h1>
                        <p className="text-xl md:text-2xl text-emerald-100/80 max-w-2xl mx-auto font-serif italic">
                            Discover stories that shape worlds. Meticulously selected for our members.
                        </p>
                    </div>
                </section>

                {/* ═══════ FILTER DESK (Glassmorphism Sticky Bar) ═══════ */}
                <div className="sticky top-[60px] z-40 bg-[#f0ece6]/80 backdrop-blur-md border-b border-[#e1dacd] shadow-sm">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">

                        {/* Format Filters */}
                        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide w-full md:w-auto shrink-0">
                            {["All", "Physical", "E-Book"].map(format => (
                                <button
                                    key={format}
                                    onClick={() => setSelectedFormat(format)}
                                    className={`px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${selectedFormat === format
                                        ? "bg-[#0c4a30] text-white shadow-md"
                                        : "bg-[#e1dacd]/30 text-[#0c4a30] hover:bg-[#e1dacd]/60"
                                        }`}
                                >
                                    {format}
                                </button>
                            ))}
                        </div>

                        {/* Dropdowns */}
                        <div className="flex gap-3 w-full md:w-auto flex-wrap overflow-visible pb-2 md:pb-0 shrink-0 z-50 relative">
                            {/* Custom Multi-Select Genre Dropdown */}
                            <div className="relative shrink-0" ref={genresRef}>
                                <button
                                    onClick={() => setIsGenresOpen(!isGenresOpen)}
                                    className="h-full bg-white/50 border border-[#e1dacd] text-[#0c4a30] font-bold rounded-full px-4 py-1.5 outline-none focus:border-[#0c4a30] focus:ring-1 focus:ring-[#0c4a30] transition-all font-sans text-sm flex items-center justify-between gap-2 min-w-[140px]"
                                >
                                    <span>{selectedGenres.length === 0 ? "All Genres" : `${selectedGenres.length} Selected`}</span>
                                    <svg className={`w-4 h-4 transition-transform duration-200 ${isGenresOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </button>

                                {isGenresOpen && (
                                    <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-[#e1dacd] rounded-xl shadow-xl z-50 py-2 max-h-60 overflow-y-auto">
                                        {availableGenres.length === 0 ? (
                                            <div className="px-4 py-2 text-sm text-gray-500 italic">No genres found</div>
                                        ) : (
                                            <>
                                                <label className="flex items-center gap-3 px-4 py-2 hover:bg-emerald-50 cursor-pointer transition-colors border-b border-gray-100">
                                                    <input
                                                        type="checkbox"
                                                        className="rounded border-[#e1dacd] text-[#0c4a30] focus:ring-[#0c4a30]"
                                                        checked={selectedGenres.length === 0}
                                                        onChange={() => setSelectedGenres([])}
                                                    />
                                                    <span className="text-sm font-sans font-bold text-[#0c4a30]">All Genres</span>
                                                </label>
                                                {availableGenres.map(genre => (
                                                    <label key={genre} className="flex items-center gap-3 px-4 py-2 hover:bg-emerald-50 cursor-pointer transition-colors">
                                                        <input
                                                            type="checkbox"
                                                            className="rounded border-[#e1dacd] text-[#0c4a30] focus:ring-[#0c4a30]"
                                                            checked={selectedGenres.includes(genre)}
                                                            onChange={() => {
                                                                setSelectedGenres(prev =>
                                                                    prev.includes(genre)
                                                                        ? prev.filter(g => g !== genre)
                                                                        : [...prev, genre]
                                                                );
                                                            }}
                                                        />
                                                        <span className="text-sm font-sans font-medium text-slate-700">{genre}</span>
                                                    </label>
                                                ))}
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Custom Sort Dropdown */}
                            <div className="relative shrink-0" ref={sortRef}>
                                <button
                                    onClick={() => setIsSortOpen(!isSortOpen)}
                                    className={`h-full bg-white/50 border ${isSortOpen ? 'border-[#0c4a30] ring-1 ring-[#0c4a30]' : 'border-[#e1dacd] hover:border-[#0c4a30]'} text-[#0c4a30] font-bold rounded-full px-4 py-1.5 outline-none transition-all font-sans text-sm flex items-center justify-between gap-2 min-w-[160px] cursor-pointer`}
                                >
                                    <span>
                                        {sortOrder === "price_asc" ? "Price: Low to High" : sortOrder === "price_desc" ? "Price: High to Low" : "Sort: Default"}
                                    </span>
                                    <svg className={`w-4 h-4 transition-transform duration-200 ${isSortOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </button>

                                {isSortOpen && (
                                    <div className="absolute top-full right-0 md:left-0 mt-2 w-48 bg-white border border-[#e1dacd] rounded-xl shadow-xl z-50 py-1 overflow-hidden">
                                        <button
                                            onClick={() => { setSortOrder(""); setIsSortOpen(false); }}
                                            className={`w-full text-left px-4 py-2 text-sm font-sans transition-colors ${sortOrder === "" ? "bg-[#0c4a30] text-white font-bold" : "text-[#0c4a30] font-medium hover:bg-emerald-50"}`}
                                        >
                                            Sort: Default
                                        </button>
                                        <button
                                            onClick={() => { setSortOrder("price_asc"); setIsSortOpen(false); }}
                                            className={`w-full text-left px-4 py-2 text-sm font-sans transition-colors ${sortOrder === "price_asc" ? "bg-[#0c4a30] text-white font-bold" : "text-[#0c4a30] font-medium hover:bg-emerald-50"}`}
                                        >
                                            Price: Low to High
                                        </button>
                                        <button
                                            onClick={() => { setSortOrder("price_desc"); setIsSortOpen(false); }}
                                            className={`w-full text-left px-4 py-2 text-sm font-sans transition-colors ${sortOrder === "price_desc" ? "bg-[#0c4a30] text-white font-bold" : "text-[#0c4a30] font-medium hover:bg-emerald-50"}`}
                                        >
                                            Price: High to Low
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Search Input */}
                        <div className="relative w-full xl:w-72 shrink-0">
                            <input
                                type="text"
                                placeholder="Search the catalog..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white/50 border border-[#e1dacd] text-slate-800 rounded-full pl-10 pr-4 py-2 outline-none focus:border-[#0c4a30] focus:ring-1 focus:ring-[#0c4a30] transition-all font-sans text-sm placeholder-slate-500"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ═══════ MAIN CONTENT: THE SHELVES ═══════ */}
                <main className="flex-grow max-w-[1600px] w-full mx-auto px-6 md:px-12 py-16">

                    {/* CUSTOM BOOK GRID */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
                        {filteredBooks.map((book, index) => {
                            const isRenting = rentingBook === book.id;
                            const isOwned = purchasedBookIds.includes(book.id);

                            return (
                                <div
                                    key={book.id}
                                    className="group flex flex-col items-center animate-fade-in-up"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    {/* Physical Book Object Display */}
                                    {/* Aspect ratio [2/3] is standard book size. Heavy drop shadow for 3D depth */}
                                    <div
                                        className="relative w-full aspect-[2/3] max-w-[280px] mb-8 cursor-pointer perspective-1000"
                                        onClick={() => setPreviewBook(book)}
                                    >

                                        {/* Colored backdrop glow behind the book */}
                                        <div className={`absolute inset-4 rounded-xl bg-gradient-to-tr ${getAccent(index)} opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500`}></div>

                                        {/* The Book Itself */}
                                        <div className="absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-4 group-hover:rotate-y-[-5deg]">
                                            <img
                                                src={book.cover_image ? `/images/${book.cover_image}` : '/images/about-statue.png'}
                                                alt={book.title}
                                                className="w-full h-full object-cover rounded-md shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5),auto_auto_auto_auto_rgba(255,255,255,0.1)_inset] border-l-2 border-l-white/20"
                                            />
                                            {/* Book spine simulation line */}
                                            <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/20 to-transparent mix-blend-multiply rounded-l-md pointer-events-none"></div>

                                            {/* Format Badge Overlay */}
                                            {book.type === 'E-Book' && (
                                                <div className="absolute top-2 right-2 bg-purple-600/90 backdrop-blur text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded shadow border border-white/20">
                                                    Digital Content
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Book Details Wrapper */}
                                    <div className="w-full max-w-[280px] text-center px-4 flex flex-col flex-grow">
                                        <div className="font-sans text-[10px] sm:text-xs font-bold tracking-widest text-[#0c4a30] uppercase mb-2">
                                            Library Rental
                                        </div>
                                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 leading-snug group-hover:text-[#0c4a30] transition-colors font-serif">
                                            {book.title}
                                        </h3>
                                        <p className="text-sm font-sans text-gray-500 mb-6 italic">
                                            by {book.author}
                                        </p>

                                        {/* Action Area */}
                                        <div className="mt-auto pt-4 flex items-center justify-center gap-4">
                                            <div className="font-sans text-sm font-bold text-gray-900">
                                                <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded-sm text-xs ${book.type === 'E-Book' || book.available_qty > 0 ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50'}`}>
                                                    {book.type === 'E-Book' ? 'Digital Download' : (book.available_qty > 0 ? 'In Stock' : 'Out of Stock')}
                                                </span>
                                            </div>
                                            <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                                            <button
                                                onClick={(e) => book.price > 0 && book.type === 'E-Book' ? handlePurchase(book.id, e) : handleRent(book.id, e)}
                                                disabled={isRenting || isOwned || (book.type === 'Physical' && book.available_qty < 1)}
                                                className={`font-sans text-xs font-bold tracking-widest uppercase py-2 px-5 border transition-all duration-300 ${isRenting || isOwned || (book.type === 'Physical' && book.available_qty < 1)
                                                    ? "border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed"
                                                    : "border-gray-300 text-gray-700 hover:border-[#0c4a30] hover:bg-[#0c4a30] hover:text-white"
                                                    }`}
                                            >
                                                {isRenting ? "Processing..." : (
                                                    book.type === 'E-Book'
                                                        ? (isOwned ? "Owned" : (book.price > 0 ? `Buy - $${Number(book.price).toFixed(2)}` : "Borrow Digital"))
                                                        : "Rent"
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {filteredBooks.length === 0 && (
                        <div className="text-center py-32 max-w-md mx-auto">
                            <h3 className="text-2xl font-bold font-serif text-gray-900 mb-3">No tomes discovered</h3>
                            <p className="font-sans text-gray-500">
                                {selectedGenres.length > 0
                                    ? "There are no books currently available in the selected genre(s)."
                                    : "The archives currently hold no records matching your query. Please adjust your search constraints."}
                            </p>
                        </div>
                    )}
                </main>
            </div>

            {/* ═══════ BOOK PREVIEW MODAL ═══════ */}
            <Modal show={!!previewBook} onClose={() => setPreviewBook(null)} maxWidth="4xl">
                {previewBook && (
                    <div className="flex flex-col md:flex-row bg-[#f0ece6] overflow-hidden">
                        {/* Left: Book Cover */}
                        <div className="w-full md:w-2/5 md:bg-[#0c4a30] p-8 flex items-center justify-center relative bg-gradient-to-br from-[#0c4a30] to-[#042014]">
                            {/* Decorative elements */}
                            <div className="absolute inset-0 opacity-10 mix-blend-overlay hidden md:block" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
                            <div className="relative w-full aspect-[2/3] max-w-[280px] perspective-1000 z-10 group">
                                <img
                                    src={previewBook.cover_image ? `/images/${previewBook.cover_image}` : '/images/about-statue.png'}
                                    alt={previewBook.title}
                                    className="w-full h-full object-cover rounded-md shadow-2xl border-l-2 border-l-white/20 transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-y-[-5deg]"
                                />
                                {previewBook.type === 'E-Book' && (
                                    <div className="absolute top-2 right-2 bg-purple-600/90 backdrop-blur text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded shadow border border-white/20">
                                        Digital Content
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right: Book Details */}
                        <div className="w-full md:w-3/5 p-8 md:p-10 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="font-sans text-xs font-bold tracking-widest text-[#0c4a30] uppercase mb-2">
                                        {previewBook.type === 'E-Book' ? 'Digital Library' : 'Library Physical Vault'}
                                    </div>
                                    <button onClick={() => setPreviewBook(null)} className="text-gray-400 hover:text-gray-600 p-1 -mt-2 -mr-2 transition-colors">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                    </button>
                                </div>

                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 font-serif leading-tight">
                                    {previewBook.title}
                                </h2>
                                <p className="text-lg font-sans text-gray-600 mb-6 italic">
                                    by <span className="font-semibold text-gray-800">{previewBook.author}</span> <span className="mx-2 text-gray-300">|</span> {previewBook.published_year}
                                </p>

                                {/* Badges */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {previewBook.genre && previewBook.genre.split(',').map(g => g.trim()).map((genre, i) => (
                                        <span key={i} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-[#e1dacd]/60 text-[#0c4a30] border border-[#d1c8b4]">
                                            {genre}
                                        </span>
                                    ))}
                                </div>

                                <div className="prose prose-sm text-gray-600 mb-8 max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300">
                                    {previewBook.description ? (
                                        <p className="font-serif leading-relaxed text-base">{previewBook.description}</p>
                                    ) : (
                                        <p className="font-serif italic text-gray-400">No synopsis available in the archives.</p>
                                    )}
                                </div>

                                {/* Stats grid */}
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="bg-white/60 rounded-lg p-3 border border-[#d1c8b4]/50 shadow-sm">
                                        <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Stock Status</div>
                                        <div className={`text-sm font-bold ${previewBook.type === 'E-Book' || previewBook.available_qty > 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                                            {previewBook.type === 'E-Book' ? 'Unlimited Digital' : (previewBook.available_qty > 0 ? `${previewBook.available_qty} In Stock` : 'Out of Stock')}
                                        </div>
                                    </div>
                                    <div className="bg-white/60 rounded-lg p-3 border border-[#d1c8b4]/50 shadow-sm">
                                        <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Identifier (ISBN)</div>
                                        <div className="text-sm font-mono text-gray-700">
                                            {previewBook.isbn}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Area */}
                            <div className="pt-6 border-t border-[#d1c8b4] flex items-center justify-between mt-auto space-x-4">
                                <span className="text-2xl font-bold font-serif text-[#0c4a30]">
                                    {previewBook.type === 'E-Book' && previewBook.price > 0
                                        ? `$${Number(previewBook.price).toFixed(2)}`
                                        : 'Free'}
                                </span>

                                <div className="flex gap-2 items-center text-right">
                                    <button
                                        onClick={() => handleWishlist(previewBook.id)}
                                        className="p-3 bg-[#e1dacd]/50 hover:bg-[#e1dacd] active:bg-[#d1c8b4] text-[#0c4a30] transition rounded-sm flex items-center shadow-sm"
                                        title="Save for Later"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                        </svg>
                                    </button>

                                    <button
                                        onClick={(e) => {
                                            if (previewBook.price > 0 && previewBook.type === 'E-Book') {
                                                handlePurchase(previewBook.id, e);
                                            } else {
                                                handleRent(previewBook.id, e);
                                            }
                                            // Optional: Do NOT auto-close modal to let users see "Processing..."
                                            // setPreviewBook(null); 
                                        }}
                                        disabled={rentingBook === previewBook.id || purchasedBookIds.includes(previewBook.id) || (previewBook.type === 'Physical' && previewBook.available_qty < 1)}
                                        className={`font-sans text-sm font-bold tracking-widest uppercase py-3 px-8 transition-all duration-300 shadow-md rounded-sm ${rentingBook === previewBook.id || purchasedBookIds.includes(previewBook.id) || (previewBook.type === 'Physical' && previewBook.available_qty < 1)
                                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            : "bg-[#0c4a30] text-white hover:bg-emerald-800 hover:shadow-lg hover:-translate-y-0.5"
                                            }`}
                                    >
                                        {rentingBook === previewBook.id ? "Processing..." : (
                                            previewBook.type === 'E-Book'
                                                ? (purchasedBookIds.includes(previewBook.id) ? "Owned" : (previewBook.price > 0 ? `Buy E-Book` : "Borrow Digital"))
                                                : "Rent Physical Copy"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
}
