import React, { useState, useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import BookLogo from "@/Components/BookLogo";

export default function Contact({ auth }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, []);

    const navLinks = [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Collection", href: "/collection" },
        { label: "Services", href: "/services" },
        { label: "Contact", href: "/contact" },
    ];

    return (
        <>
            <Head title="Contact - BookVault" />

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
                                    className={`text-sm font-sans font-medium tracking-wide transition-colors relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:transition-all ${l.label === 'Contact'
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
                        <div className="md:hidden bg-[#0c4a30] shadow-lg py-4 px-6 space-y-3 animate-fade-in border-t border-[#083522]">
                            {navLinks.map((l) => (
                                <Link key={l.label} href={l.href}
                                    onClick={() => setMobileMenu(false)}
                                    className={`block font-medium ${l.label === 'Contact' ? 'text-emerald-400' : 'text-emerald-100/70 hover:text-white'}`}>
                                    {l.label}
                                </Link>
                            ))}
                            {auth?.user ? (
                                <Link href="/dashboard"
                                    className="block text-center bg-white text-[#0c4a30] px-5 py-2.5 rounded font-bold tracking-wide hover:bg-emerald-100 transition-colors mt-2">
                                    Dashboard
                                </Link>
                            ) : (
                                <Link href="/login"
                                    className="block text-center bg-white text-[#0c4a30] px-5 py-2.5 rounded font-bold tracking-wide hover:bg-emerald-100 transition-colors mt-2">
                                    Member Access
                                </Link>
                            )}
                        </div>
                    )}
                </nav>

                {/* ═══════ HERO: CONTACT INFO ═══════ */}
                <section className="relative pt-40 pb-20 px-6 overflow-hidden bg-[#0c4a30]">
                    {/* Subtle pattern overlay */}
                    <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
                    <div className="max-w-7xl mx-auto relative z-10 text-center animate-fade-in-up">
                        <div className="inline-flex items-center justify-center gap-2 mb-6 opacity-80">
                            <span className="h-[1px] w-8 bg-emerald-400"></span>
                            <p className="text-emerald-400 font-sans text-xs font-bold uppercase tracking-[0.2em]">Reach Out</p>
                            <span className="h-[1px] w-8 bg-emerald-400"></span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-serif leading-tight">
                            Get In Touch
                        </h1>
                        <p className="text-xl md:text-2xl text-emerald-100/80 max-w-2xl mx-auto font-serif italic mb-8">
                            We're here to help you navigate our collection, manage your account, or answer any questions you may have.
                        </p>
                    </div>
                </section>

                {/* ═══════ CONTACT DETAILS SECTION ═══════ */}
                <main className="flex-grow max-w-[1200px] w-full mx-auto px-6 md:px-12 py-16">
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Detail Cards */}
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8 font-serif">Contact Information</h2>

                            <div className="bg-white p-6 rounded shadow-sm border border-gray-100 flex items-start gap-4">
                                <div className="w-12 h-12 bg-emerald-50 rounded text-[#0c4a30] flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 font-sans mb-1">Email</h3>
                                    <p className="text-gray-600 font-sans mb-3">Drop us a line anytime. We usually respond within 24 hours.</p>
                                    <a href="mailto:jeffjacob1527@gmail.com" className="text-[#0c4a30] font-bold font-sans hover:text-emerald-700 transition-colors">
                                        jeffjacob1527@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded shadow-sm border border-gray-100 flex items-start gap-4">
                                <div className="w-12 h-12 bg-emerald-50 rounded text-[#0c4a30] flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 font-sans mb-1">Phone</h3>
                                    <p className="text-gray-600 font-sans mb-3">Call us during regular business hours (9am - 5pm IST).</p>
                                    <a href="tel:+918075791048" className="text-[#0c4a30] font-bold font-sans hover:text-emerald-700 transition-colors">
                                        +91 8075791048
                                    </a>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded shadow-sm border border-gray-100 flex items-start gap-4">
                                <div className="w-12 h-12 bg-emerald-50 rounded text-[#0c4a30] flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 font-sans mb-1">Location</h3>
                                    <p className="text-gray-600 font-sans mb-3">Visit our central office and physical library space.</p>
                                    <span className="text-gray-800 font-bold font-sans">
                                        Kochi, Kerala
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Direct Action / Visual */}
                        <div className="bg-[#0c4a30] p-10 md:p-14 rounded shadow-xl text-center flex flex-col items-center justify-center relative overflow-hidden">
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-600 rounded-full opacity-20 blur-3xl"></div>
                            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-400 rounded-full opacity-20 blur-3xl"></div>

                            <h2 className="text-3xl font-bold text-white mb-6 font-serif relative z-10">Send a Query</h2>
                            <p className="text-emerald-100/90 mb-10 font-sans leading-relaxed relative z-10">
                                Prefer writing to us directly? Use your default mail client to draft a message to our support team. We're eager to assist you with any inquiries regarding the Book Vault.
                            </p>

                            <a href="mailto:jeffjacob1527@gmail.com?subject=BookVault Inquiry"
                                className="bg-emerald-400 text-[#0c4a30] font-sans font-bold tracking-widest uppercase px-8 py-4 rounded shadow-lg hover:bg-emerald-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative z-10 inline-flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                                Create an Email
                            </a>
                        </div>
                    </div>
                </main>

                {/* ═══════ FOOTER ═══════ */}
                <footer className="bg-[#0c4a30] text-emerald-100/70 border-t border-[#083522] py-16 mt-auto font-sans">
                    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
                        <div>
                            <h4 className="text-xl font-bold mb-4 flex items-center gap-2 text-white font-serif tracking-wide">
                                <BookLogo className="h-6 w-6 text-emerald-400" />
                                BookVault
                            </h4>
                            <p className="leading-relaxed">
                                Curated collections, exceptional services, right at your fingertips.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold mb-4 text-white uppercase tracking-wider text-sm">Quick Links</h4>
                            <ul className="space-y-2">
                                <li><Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link></li>
                                <li><Link href="/about" className="hover:text-emerald-400 transition-colors">About</Link></li>
                                <li><Link href="/collection" className="hover:text-emerald-400 transition-colors">Collection</Link></li>
                                <li><Link href="/services" className="hover:text-emerald-400 transition-colors">Services</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold mb-4 text-white uppercase tracking-wider text-sm">Contact Info</h4>
                            <p className="mb-2 hover:text-emerald-400 transition-colors"><a href="mailto:jeffjacob1527@gmail.com">jeffjacob1527@gmail.com</a></p>
                            <p className="mb-2 hover:text-emerald-400 transition-colors"><a href="tel:+918075791048">+91 8075791048</a></p>
                            <p>Kochi, Kerala</p>
                        </div>
                    </div>
                    <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-[#083522] text-center text-sm font-light">
                        © {new Date().getFullYear()} BookVault. All rights reserved.
                    </div>
                </footer>
            </div>
        </>
    );
}
