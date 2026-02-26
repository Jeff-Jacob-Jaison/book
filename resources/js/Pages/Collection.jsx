import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import BookLogo from "@/Components/BookLogo";

const BOOKS = [
    { id: 1, title: "Neon Twilight", author: "Aries Vance", category: "Sci-Fi", price: "$4.99 / Rent", image: "collection_book_cover_scifi_1772048319648.png", accent: "from-purple-500 to-indigo-600" },
    { id: 2, title: "The Crystal Crown", author: "Elara Moon", category: "Fantasy", price: "$3.49 / Rent", image: "collection_book_cover_fantasy_1772048215433.png", accent: "from-blue-400 to-emerald-400" },
    { id: 3, title: "The Silent Echo", author: "Julian Cross", category: "Mystery", price: "$5.99 / Rent", image: "collection_book_cover_mystery_1772048379658.png", accent: "from-slate-600 to-slate-900" },
    { id: 4, title: "Empires of Dust", author: "Dr. Aris Thorne", category: "History", price: "$2.99 / Rent", image: "collection_book_cover_history_1772048474201.png", accent: "from-amber-600 to-orange-800" },
    { id: 5, title: "Cybernetic Dawn", author: "Aries Vance", category: "Sci-Fi", price: "$4.99 / Rent", image: "collection_book_cover_scifi_1772048319648.png", accent: "from-cyan-400 to-blue-600" },
    { id: 6, title: "Shadows of Rome", author: "Dr. Aris Thorne", category: "History", price: "$3.99 / Rent", image: "collection_book_cover_history_1772048474201.png", accent: "from-rose-800 to-red-950" },
    { id: 7, title: "Starship Echoes", author: "Nova Steele", category: "Sci-Fi", price: "$4.49 / Rent", image: "collection_book_cover_scifi_1772048319648.png", accent: "from-sky-500 to-indigo-500" },
    { id: 8, title: "The Lost Kingdom", author: "Elara Moon", category: "Fantasy", price: "$2.99 / Rent", image: "collection_book_cover_fantasy_1772048215433.png", accent: "from-fuchsia-600 to-purple-800" },
];

const CATEGORIES = ["All", "Sci-Fi", "Fantasy", "Mystery", "History"];

export default function Collection() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [rentingBook, setRentingBook] = useState(null);

    React.useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, []);

    const navLinks = [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Collection", href: "/collection" },
        { label: "Services", href: "/#services" },
        { label: "Contact", href: "#contact" },
    ];

    const filteredBooks = BOOKS.filter(b => {
        const matchesCategory = activeCategory === "All" || b.category === activeCategory;
        const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || b.author.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleRent = (id, e) => {
        e.preventDefault();
        setRentingBook(id);
        setTimeout(() => setRentingBook(null), 1500);
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

                        <Link href="/login"
                            className={`hidden md:inline-flex bg-white text-[#0c4a30] hover:bg-emerald-100 font-sans text-sm font-bold tracking-wide px-7 py-2.5 rounded transition-colors shadow-sm`}>
                            Member Access
                        </Link>

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
                <div className="sticky top-[72px] z-40 bg-[#f0ece6]/80 backdrop-blur-md border-b border-[#e1dacd] shadow-sm">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">

                        {/* Categories */}
                        <div className="flex overflow-x-auto hide-scrollbar w-full md:w-auto gap-8 pb-2 md:pb-0">
                            {CATEGORIES.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`whitespace-nowrap font-sans text-sm font-bold tracking-wider uppercase transition-all relative py-1 ${activeCategory === category
                                        ? "text-[#0c4a30]"
                                        : "text-slate-500 hover:text-slate-800"
                                        }`}
                                >
                                    {category}
                                    {activeCategory === category && (
                                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0c4a30] rounded-t"></span>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Search Input */}
                        <div className="relative w-full md:w-72">
                            <input
                                type="text"
                                placeholder="Search the catalog..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white/50 border border-[#e1dacd] text-slate-800 rounded-sm pl-10 pr-4 py-2.5 outline-none focus:border-[#0c4a30] focus:ring-1 focus:ring-[#0c4a30] transition-all font-sans text-sm placeholder-slate-400"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

                            return (
                                <div
                                    key={book.id}
                                    className="group flex flex-col items-center animate-fade-in-up"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    {/* Physical Book Object Display */}
                                    {/* Aspect ratio [2/3] is standard book size. Heavy drop shadow for 3D depth */}
                                    <div className="relative w-full aspect-[2/3] max-w-[280px] mb-8 cursor-pointer perspective-1000">

                                        {/* Colored backdrop glow behind the book */}
                                        <div className={`absolute inset-4 rounded-xl bg-gradient-to-tr ${book.accent} opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500`}></div>

                                        {/* The Book Itself */}
                                        <div className="absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-4 group-hover:rotate-y-[-5deg]">
                                            <img
                                                src={`/images/${book.image}`}
                                                alt={book.title}
                                                className="w-full h-full object-cover rounded-md shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5),auto_auto_auto_auto_rgba(255,255,255,0.1)_inset] border-l-2 border-l-white/20"
                                            />
                                            {/* Book spine simulation line */}
                                            <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/20 to-transparent mix-blend-multiply rounded-l-md pointer-events-none"></div>
                                        </div>
                                    </div>

                                    {/* Book Details Wrapper */}
                                    <div className="w-full max-w-[280px] text-center px-4 flex flex-col flex-grow">
                                        <div className="font-sans text-[10px] sm:text-xs font-bold tracking-widest text-[#0c4a30] uppercase mb-2">
                                            {book.category}
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
                                                {book.price}
                                            </div>
                                            <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                                            <button
                                                onClick={(e) => handleRent(book.id, e)}
                                                disabled={isRenting}
                                                className={`font-sans text-xs font-bold tracking-widest uppercase py-2 px-5 border transition-all duration-300 ${isRenting
                                                    ? "border-emerald-200 text-emerald-600 bg-emerald-50"
                                                    : "border-gray-300 text-gray-700 hover:border-[#0c4a30] hover:bg-[#0c4a30] hover:text-white"
                                                    }`}
                                            >
                                                {isRenting ? "Processing..." : "Rent"}
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
                            <p className="font-sans text-gray-500">The archives currently hold no records matching your query. Please adjust your search constraints.</p>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}
