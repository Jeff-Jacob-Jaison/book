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

export default function About() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, []);

    const [aboutRef, aboutVis] = useInView();
    const [footerRef, footerVis] = useInView();

    const navLinks = [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Collection", href: "/collection" },
        { label: "Services", href: "/#services" },
        { label: "Contact", href: "#contact" },
    ];

    return (
        <>
            <Head title="About Us - BookVault" />

            <div className="bg-[#f8f8f6] text-gray-800 font-sans antialiased overflow-x-hidden min-h-screen flex flex-col">

                {/* ═══════ NAVBAR ═══════ */}
                <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur shadow-lg py-3" : "bg-white py-5 shadow-sm"}`}>
                    <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                        <Link href="/" className="flex items-center gap-3 group">
                            <BookLogo className="h-9 w-9 text-emerald-brand drop-shadow-sm" />
                            <span className="text-lg font-bold tracking-wide uppercase">Book Vault</span>
                        </Link>

                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((l) => (
                                <a key={l.label} href={l.href}
                                    className={`text-sm font-medium transition-colors relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:transition-all ${l.label === 'About' ? 'text-emerald-brand after:w-full after:bg-emerald-brand' : 'text-gray-700 hover:text-emerald-brand after:w-0 hover:after:w-full after:bg-emerald-brand'}`}>
                                    {l.label}
                                </a>
                            ))}
                        </div>

                        <Link href="/login"
                            className="hidden md:inline-flex bg-gray-900 text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-emerald-brand transition-colors">
                            Get Started
                        </Link>

                        <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden flex flex-col gap-1.5">
                            <span className={`block w-6 h-0.5 bg-gray-800 transition-transform ${mobileMenu ? "rotate-45 translate-y-2" : ""}`} />
                            <span className={`block w-6 h-0.5 bg-gray-800 transition-opacity ${mobileMenu ? "opacity-0" : ""}`} />
                            <span className={`block w-6 h-0.5 bg-gray-800 transition-transform ${mobileMenu ? "-rotate-45 -translate-y-2" : ""}`} />
                        </button>
                    </div>

                    {mobileMenu && (
                        <div className="md:hidden bg-white shadow-lg py-4 px-6 space-y-3 animate-fade-in">
                            {navLinks.map((l) => (
                                <a key={l.label} href={l.href}
                                    onClick={() => setMobileMenu(false)}
                                    className={`block font-medium ${l.label === 'About' ? 'text-emerald-brand' : 'text-gray-700 hover:text-emerald-brand'}`}>
                                    {l.label}
                                </a>
                            ))}
                            <Link href="/login"
                                className="block text-center bg-gray-900 text-white px-5 py-2.5 rounded-full font-semibold hover:bg-emerald-brand transition-colors mt-2">
                                Get Started
                            </Link>
                        </div>
                    )}
                </nav>

                {/* ═══════ ABOUT HERO ═══════ */}
                <section className="pt-32 pb-24 bg-white flex-grow relative z-10">
                    <div className="max-w-4xl mx-auto px-6 text-center animate-fade-in-up">
                        <p className="text-emerald-brand font-semibold tracking-[0.2em] uppercase text-sm mb-4">Our Story</p>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-8">
                            Empowering Readers in the Digital Age
                        </h1>
                        <p className="text-xl text-gray-500 leading-relaxed mb-12">
                            BookVault was founded on a simple principle: access to knowledge should be seamless, inspiring, and tailored to you. We've built an ecosystem that bridges the gap between digital libraries and community bookstores.
                        </p>
                    </div>
                </section>

                {/* ═══════ CORE VALUES ═══════ */}
                <section ref={aboutRef} className={`transition-all duration-700 ${aboutVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                    <div className="flex flex-col md:flex-row min-h-[600px] bg-white">
                        {/* Left Side: Full Bleed Image */}
                        <div className="md:w-1/2 relative overflow-hidden group min-h-[400px]">
                            <img
                                src="/images/about-statue.png"
                                alt="Wisdom and Foundation"
                                className="absolute inset-0 w-full h-full object-cover object-bottom transition-transform duration-700 ease-out group-hover:scale-105 origin-bottom"
                            />
                        </div>

                        {/* Right Side: Content Area */}
                        <div className="md:w-1/2 py-20 px-8 lg:px-20 xl:px-32 flex flex-col justify-center bg-[#f8f8f6]">
                            <div className="max-w-xl">
                                <h3 className="text-3xl md:text-4xl font-bold mb-10 text-gray-900 border-l-4 border-emerald-brand pl-5">Our Mission & Values</h3>
                                <div className="space-y-10">
                                    <div className="flex gap-5 group/item">
                                        <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center flex-shrink-0 text-emerald-brand border border-emerald-100/50 group-hover/item:-translate-y-1 transition-transform">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold mb-2 text-gray-800">Accessibility</h4>
                                            <p className="text-gray-600 leading-relaxed">We believe books should be easily accessible. Our intuitive platform removes the friction of traditional borrowing and purchasing.</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-5 group/item">
                                        <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center flex-shrink-0 text-emerald-brand border border-emerald-100/50 group-hover/item:-translate-y-1 transition-transform">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold mb-2 text-gray-800">Discovery</h4>
                                            <p className="text-gray-600 leading-relaxed">Finding your next favorite book should be an adventure, not a chore. We focus on smart, tailored recommendations to guide your journey.</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-5 group/item">
                                        <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center flex-shrink-0 text-emerald-brand border border-emerald-100/50 group-hover/item:-translate-y-1 transition-transform">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold mb-2 text-gray-800">Community</h4>
                                            <p className="text-gray-600 leading-relaxed">We foster a thriving network of readers, authors, and institutions, connecting people through the shared power of storytelling.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════ STATS ═══════ */}
                <section className="relative bg-white pt-10 pb-20">
                    <div className="max-w-7xl mx-auto px-6 mb-12">
                        <hr className="border-t-2 border-slate-100" />
                    </div>

                    <div className="max-w-7xl mx-auto px-6">
                        <div className="bg-emerald-50 rounded-3xl p-10 md:p-14 border border-emerald-100/50 shadow-sm">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-emerald-200/60">
                                <div>
                                    <div className="text-4xl md:text-5xl font-extrabold mb-2 text-emerald-brand">50k+</div>
                                    <div className="text-emerald-800 font-medium tracking-wide uppercase text-sm">Digital Titles</div>
                                </div>
                                <div>
                                    <div className="text-4xl md:text-5xl font-extrabold mb-2 text-emerald-brand">120+</div>
                                    <div className="text-emerald-800 font-medium tracking-wide uppercase text-sm">Partner Libraries</div>
                                </div>
                                <div>
                                    <div className="text-4xl md:text-5xl font-extrabold mb-2 text-emerald-brand">10k+</div>
                                    <div className="text-emerald-800 font-medium tracking-wide uppercase text-sm">Active Readers</div>
                                </div>
                                <div>
                                    <div className="text-4xl md:text-5xl font-extrabold mb-2 text-emerald-brand">99%</div>
                                    <div className="text-emerald-800 font-medium tracking-wide uppercase text-sm">Satisfaction</div>
                                </div>
                            </div>
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
                            <p className="text-gray-400">Email: support@bookvault.com</p>
                            <p className="text-gray-400">Phone: +123 456 7890</p>
                            <p className="text-gray-400">Location: Your City, Country</p>
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
