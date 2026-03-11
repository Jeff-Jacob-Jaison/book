import React, { useState, useEffect, useRef } from "react";
import { Head, Link } from "@inertiajs/react";
import BookLogo from "@/Components/BookLogo";

/* ─── tiny hook: fade-in when element enters viewport ─── */
function useInView(threshold = 0.15) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
            { threshold }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);
    return [ref, visible];
}

/* ─── Service card ─── */
function ServiceCard({ icon, title, desc }) {
    return (
        <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-brand text-2xl mb-5 group-hover:bg-emerald-brand group-hover:text-white transition-colors">
                {icon}
            </div>
            <h4 className="text-xl font-semibold mb-3">{title}</h4>
            <p className="text-gray-500 leading-relaxed">{desc}</p>
        </div>
    );
}

export default function Services({ auth }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, []);

    const [servicesRef, servicesVis] = useInView();
    const [footerRef, footerVis] = useInView();

    const navLinks = [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Collection", href: "/collection" },
        { label: "Services", href: "/services" },
        { label: "Contact", href: "/contact" },
    ];

    return (
        <>
            <Head title="Services - BookVault" />

            <div className="bg-[#f0ece6] text-gray-800 font-serif antialiased overflow-x-hidden min-h-screen flex flex-col selection:bg-emerald-900 selection:text-white">

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
                                    className={`text-sm font-sans font-medium tracking-wide transition-colors relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:transition-all ${l.label === 'Services'
                                        ? 'text-emerald-400 after:w-full after:bg-emerald-400'
                                        : 'text-emerald-100/70 hover:text-white after:w-0 hover:after:w-full after:bg-emerald-400'
                                        }`}>
                                    {l.label}
                                </Link>
                            ))}
                        </div>

                        {auth?.user ? (
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

                    {mobileMenu && (
                        <div className="md:hidden bg-white shadow-lg py-4 px-6 space-y-3 animate-fade-in">
                            {navLinks.map((l) => (
                                <Link key={l.label} href={l.href}
                                    onClick={() => setMobileMenu(false)}
                                    className={`block font-medium ${l.label === 'Services' ? 'text-emerald-brand' : 'text-gray-700 hover:text-emerald-brand'}`}>
                                    {l.label}
                                </Link>
                            ))}
                            {auth?.user ? (
                                <Link href="/dashboard"
                                    className="block text-center bg-[#0c4a30] text-white px-5 py-2.5 rounded-full font-semibold hover:bg-emerald-800 transition-colors mt-2">
                                    Dashboard
                                </Link>
                            ) : (
                                <Link href="/login"
                                    className="block text-center bg-[#0c4a30] text-white px-5 py-2.5 rounded-full font-semibold hover:bg-emerald-800 transition-colors mt-2">
                                    Member Access
                                </Link>
                            )}
                        </div>
                    )}
                </nav>

                {/* ═══════ HERO: WHAT WE OFFER ═══════ */}
                <section className="relative pt-40 pb-20 px-6 overflow-hidden bg-[#0c4a30]">
                    {/* Subtle pattern overlay */}
                    <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
                    <div className="max-w-7xl mx-auto relative z-10 text-center animate-fade-in-up">
                        <div className="inline-flex items-center justify-center gap-2 mb-6 opacity-80">
                            <span className="h-[1px] w-8 bg-emerald-400"></span>
                            <p className="text-emerald-400 font-sans text-xs font-bold uppercase tracking-[0.2em]">What We Offer</p>
                            <span className="h-[1px] w-8 bg-emerald-400"></span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-serif leading-tight">
                            Premium Features for <br className="hidden md:block" /> Readers and Institutions
                        </h1>
                        <p className="text-xl md:text-2xl text-emerald-100/80 max-w-3xl mx-auto font-serif italic mb-8">
                            From seamless digital borrowing to integrated e-commerce solutions, BookVault equips you with modern tools to manage and experience your library effectively.
                        </p>
                    </div>
                </section>

                {/* ═══════ SERVICES DETAILS ═══════ */}
                <section id="services" ref={servicesRef}
                    className={`pb-24 pt-12 transition-all duration-700 ${servicesVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid md:grid-cols-3 gap-8">
                            <ServiceCard
                                icon={
                                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                                        <path d="M8 7h8M8 11h6" />
                                    </svg>
                                }
                                title="Library Management"
                                desc="Manage book inventory, track borrowed books, handle returns and overdue notices seamlessly."
                            />
                            <ServiceCard
                                icon={
                                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                                        <path d="M3 6h18" />
                                        <path d="M16 10a4 4 0 01-8 0" />
                                    </svg>
                                }
                                title="Online Book Store"
                                desc="Browse and purchase books directly from our integrated online shop with secure checkout."
                            />
                            <ServiceCard
                                icon={
                                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="3" width="7" height="7" rx="1" />
                                        <rect x="14" y="3" width="7" height="7" rx="1" />
                                        <rect x="3" y="14" width="7" height="7" rx="1" />
                                        <rect x="14" y="14" width="7" height="7" rx="1" />
                                    </svg>
                                }
                                title="User Dashboard"
                                desc="Track borrowed books, purchase history, and manage your profile with ease."
                            />
                            <ServiceCard
                                icon={
                                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                }
                                title="Digital Consultations"
                                desc="Connect with our expert librarians and curators for personalized reading recommendations and assistance."
                            />
                            <ServiceCard
                                icon={
                                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                    </svg>
                                }
                                title="API Integrations"
                                desc="For schools and universities, seamlessly integrate our platform directly into your existing IT infrastructure."
                            />
                            <ServiceCard
                                icon={
                                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                }
                                title="Fine Management"
                                desc="Automatically calculate overdue metrics and let users pay their late fees digitally through the portal."
                            />
                        </div>
                    </div>
                </section>

                {/* ═══════ FOOTER ═══════ */}
                <footer id="contact" ref={footerRef}
                    className={`bg-gray-900 text-white py-16 transition-all duration-700 mt-auto ${footerVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
                        <div>
                            <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <BookLogo className="h-7 w-7 text-white" />
                                BookVault
                            </h4>
                            <p className="text-gray-400 leading-relaxed">
                                Smart library management meets seamless e-commerce.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="/" className="hover:text-emerald-brand transition-colors">Home</a></li>
                                <li><a href="/about" className="hover:text-emerald-brand transition-colors">About</a></li>
                                <li><a href="/login" className="hover:text-emerald-brand transition-colors">Login</a></li>
                                <li><a href="/register" className="hover:text-emerald-brand transition-colors">Register</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-xl font-bold mb-4">Contact Us</h4>
                            <p className="text-gray-400">Email: jeffjacob1527@gmail.com</p>
                            <p className="text-gray-400">Phone: +91 8075791048</p>
                            <p className="text-gray-400">Location: Kochi, Kerala</p>
                        </div>
                    </div>

                    <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
                        © {new Date().getFullYear()} BookVault. All rights reserved.
                    </div>
                </footer>
            </div>
        </>
    );
}
