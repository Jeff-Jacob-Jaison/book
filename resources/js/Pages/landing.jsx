import React, { useState, useEffect, useRef } from "react";
import { Head, Link } from "@inertiajs/react";

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

/* ─── Tag pill component ─── */
function Tag({ label }) {
    return (
        <span className="inline-block border border-gray-300 text-gray-600 text-sm px-4 py-1.5 rounded-full hover:border-emerald-brand hover:text-emerald-brand transition-colors cursor-default">
            {label}
        </span>
    );
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

/* ━━━━━━━━━━━━━━━━━━  MAIN LANDING PAGE  ━━━━━━━━━━━━━━━━━━ */
export default function Landing() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);

    /* navbar shadow on scroll */
    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, []);

    /* section observers */
    const [aboutRef, aboutVis] = useInView();
    const [servicesRef, servicesVis] = useInView();
    const [footerRef, footerVis] = useInView();

    const navLinks = [
        { label: "About", href: "#about" },
        { label: "Browse", href: "#services" },
        { label: "Services", href: "#services" },
        { label: "Pricing", href: "#contact" },
        { label: "Contact", href: "#contact" },
    ];

    return (
        <>
            <Head title="BookVault – Smart Library & Book Store" />

            <div className="bg-[#f8f8f6] text-gray-800 font-sans antialiased overflow-x-hidden">

                {/* ═══════ NAVBAR ═══════ */}
                <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur shadow-lg py-3" : "bg-transparent py-5"}`}>
                    <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group">
                            <img src="/images/logo.png" alt="BookVault" className="h-9 w-auto" />
                            <span className="text-lg font-bold tracking-wide uppercase">Book Vault</span>
                        </Link>

                        {/* Desktop links */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((l) => (
                                <a key={l.label} href={l.href}
                                    className="text-sm font-medium text-gray-700 hover:text-emerald-brand transition-colors relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-0 hover:after:w-full after:bg-emerald-brand after:transition-all">
                                    {l.label}
                                </a>
                            ))}
                        </div>

                        {/* CTA */}
                        <Link href="/login"
                            className="hidden md:inline-flex bg-gray-900 text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-emerald-brand transition-colors">
                            Get Started
                        </Link>

                        {/* Mobile hamburger */}
                        <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden flex flex-col gap-1.5">
                            <span className={`block w-6 h-0.5 bg-gray-800 transition-transform ${mobileMenu ? "rotate-45 translate-y-2" : ""}`} />
                            <span className={`block w-6 h-0.5 bg-gray-800 transition-opacity ${mobileMenu ? "opacity-0" : ""}`} />
                            <span className={`block w-6 h-0.5 bg-gray-800 transition-transform ${mobileMenu ? "-rotate-45 -translate-y-2" : ""}`} />
                        </button>
                    </div>

                    {/* Mobile dropdown */}
                    {mobileMenu && (
                        <div className="md:hidden bg-white shadow-lg py-4 px-6 space-y-3 animate-fade-in">
                            {navLinks.map((l) => (
                                <a key={l.label} href={l.href}
                                    onClick={() => setMobileMenu(false)}
                                    className="block text-gray-700 hover:text-emerald-brand font-medium">
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


                {/* ═══════ HERO ═══════ */}
                <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center">

                        {/* Left – Copy */}
                        <div className="animate-fade-in-up">
                            <p className="text-emerald-brand font-semibold tracking-[0.25em] uppercase text-sm mb-4">
                                Book Vault
                            </p>

                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] mb-6">
                                Guiding You<br />
                                Through{" "}
                                <span className="text-emerald-brand">Book</span>
                                <br />Discovery
                            </h1>

                            <p className="text-gray-500 text-lg max-w-md leading-relaxed mb-8">
                                We simplify your reading journey with tailored recommendations,
                                seamless borrowing and an integrated marketplace for book lovers.
                            </p>

                            <Link href="/register"
                                className="inline-block bg-emerald-brand text-white font-semibold px-8 py-3.5 rounded-full hover:bg-emerald-dark shadow-lg shadow-emerald-brand/25 hover:shadow-emerald-brand/40 transition-all text-base">
                                Start Exploring
                            </Link>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-3 mt-10">
                                {["Library", "Book Store", "Digital Catalog", "Book Exchange", "Consultations"].map((t) => (
                                    <Tag key={t} label={t} />
                                ))}
                            </div>
                        </div>

                        {/* Right – Hero Image with leafy book frame */}
                        <div className="relative flex justify-center animate-slide-in-right">
                            {/* Outer glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-brand/20 via-transparent to-emerald-brand/10 rounded-[2rem] blur-2xl scale-105" />

                            <div className="relative">
                                {/* Decorative border ring */}
                                <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-emerald-brand via-teal-panel to-emerald-dark opacity-60" />
                                <div className="absolute -inset-2 rounded-[1.8rem] bg-[#f8f8f6]" />

                                {/* Main image card */}
                                <div className="relative bg-white rounded-3xl shadow-2xl p-3 overflow-hidden">
                                    <img
                                        src="/images/hero-statue.png"
                                        alt="BookVault – knowledge & discovery"
                                        className="w-full max-w-lg object-contain rounded-2xl"
                                    />
                                </div>

                                {/* ── SVG Leaf decorations ── */}
                                {/* Top-left leaves */}
                                <svg className="absolute -top-6 -left-6 w-16 h-16 text-emerald-brand drop-shadow-md" viewBox="0 0 64 64" fill="none">
                                    <path d="M32 8C18 8 8 20 8 32c6-8 16-14 24-14" fill="currentColor" opacity="0.7" />
                                    <path d="M28 4C16 6 6 16 4 28c8-6 18-10 24-12" fill="currentColor" opacity="0.5" />
                                    <path d="M20 2C12 6 6 14 4 22c6-4 14-8 20-10" fill="currentColor" opacity="0.35" />
                                </svg>

                                {/* Top-right leaves */}
                                <svg className="absolute -top-6 -right-6 w-16 h-16 text-emerald-brand drop-shadow-md" viewBox="0 0 64 64" fill="none">
                                    <path d="M32 8C46 8 56 20 56 32c-6-8-16-14-24-14" fill="currentColor" opacity="0.7" />
                                    <path d="M36 4C48 6 58 16 60 28c-8-6-18-10-24-12" fill="currentColor" opacity="0.5" />
                                    <path d="M44 2C52 6 58 14 60 22c-6-4-14-8-20-10" fill="currentColor" opacity="0.35" />
                                </svg>

                                {/* Bottom-left leaves */}
                                <svg className="absolute -bottom-5 -left-5 w-14 h-14 text-emerald-brand drop-shadow-md" viewBox="0 0 64 64" fill="none">
                                    <path d="M32 56C18 56 8 44 8 32c6 8 16 14 24 14" fill="currentColor" opacity="0.6" />
                                    <path d="M28 60C16 58 6 48 4 36c8 6 18 10 24 12" fill="currentColor" opacity="0.4" />
                                </svg>

                                {/* Bottom-right leaves */}
                                <svg className="absolute -bottom-5 -right-5 w-14 h-14 text-emerald-brand drop-shadow-md" viewBox="0 0 64 64" fill="none">
                                    <path d="M32 56C46 56 56 44 56 32c-6 8-16 14-24 14" fill="currentColor" opacity="0.6" />
                                    <path d="M36 60C48 58 58 48 60 36c-8 6-18 10-24 12" fill="currentColor" opacity="0.4" />
                                </svg>

                                {/* Top-center: open book icon */}
                                <svg className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 text-emerald-brand drop-shadow-lg" viewBox="0 0 48 48" fill="none">
                                    <path d="M24 12C20 8 12 6 6 8v26c6-2 14 0 18 4 4-4 12-6 18-4V8c-6-2-14 0-18 4z" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M24 12v28" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
                                </svg>

                                {/* Side vine accents */}
                                <svg className="absolute top-1/2 -left-4 -translate-y-1/2 w-6 h-24 text-emerald-brand" viewBox="0 0 24 96" fill="none">
                                    <path d="M12 0C12 0 4 16 4 24s8 8 8 16-8 16-8 24 8 8 8 16-8 16-8 16" stroke="currentColor" strokeWidth="1.5" opacity="0.3" fill="none" />
                                    <circle cx="4" cy="24" r="3" fill="currentColor" opacity="0.25" />
                                    <circle cx="4" cy="72" r="3" fill="currentColor" opacity="0.25" />
                                </svg>

                                <svg className="absolute top-1/2 -right-4 -translate-y-1/2 w-6 h-24 text-emerald-brand" viewBox="0 0 24 96" fill="none">
                                    <path d="M12 0C12 0 20 16 20 24s-8 8-8 16 8 16 8 24-8 8-8 16 8 16 8 16" stroke="currentColor" strokeWidth="1.5" opacity="0.3" fill="none" />
                                    <circle cx="20" cy="24" r="3" fill="currentColor" opacity="0.25" />
                                    <circle cx="20" cy="72" r="3" fill="currentColor" opacity="0.25" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* subtle divider */}
                    <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent" />
                </section>


                {/* ═══════ ABOUT ═══════ */}
                <section id="about" ref={aboutRef}
                    className={`py-24 bg-white transition-all duration-700 ${aboutVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                    <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
                        <div>
                            <p className="text-emerald-brand font-semibold tracking-[0.2em] uppercase text-sm mb-3">About Us</p>
                            <h3 className="text-3xl md:text-4xl font-bold mb-6">
                                A Modern Library for the<br />Digital Age
                            </h3>
                            <p className="text-gray-500 mb-4 leading-relaxed">
                                BookVault is a modern digital library system designed to simplify
                                book management for libraries, schools, and universities.
                            </p>
                            <p className="text-gray-500 leading-relaxed">
                                With our integrated e-commerce platform, users can purchase books,
                                track borrowing history, manage returns, and explore new arrivals
                                effortlessly.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-10 rounded-3xl shadow-lg">
                            <h4 className="text-2xl font-bold mb-6">Why Choose Us?</h4>
                            <ul className="space-y-4 text-gray-700">
                                {[
                                    "Easy Book Tracking",
                                    "Smart Borrowing System",
                                    "Online Book Purchases",
                                    "User-Friendly Dashboard",
                                ].map((item) => (
                                    <li key={item} className="flex items-center gap-3">
                                        <span className="w-6 h-6 rounded-full bg-emerald-brand text-white flex items-center justify-center flex-shrink-0">
                                            <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                        </span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>


                {/* ═══════ SERVICES ═══════ */}
                <section id="services" ref={servicesRef}
                    className={`py-24 bg-[#f8f8f6] transition-all duration-700 ${servicesVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <p className="text-emerald-brand font-semibold tracking-[0.2em] uppercase text-sm mb-3">What We Offer</p>
                        <h3 className="text-3xl md:text-4xl font-bold mb-14">Our Services</h3>

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
                        </div>
                    </div>
                </section>


                {/* ═══════ FOOTER ═══════ */}
                <footer id="contact" ref={footerRef}
                    className={`bg-gray-900 text-white py-16 transition-all duration-700 ${footerVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">

                        <div>
                            <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <img src="/images/logo.png" alt="" className="h-7 invert" />
                                BookVault
                            </h4>
                            <p className="text-gray-400 leading-relaxed">
                                Smart library management meets seamless e-commerce.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#about" className="hover:text-emerald-brand transition-colors">About</a></li>
                                <li><a href="#services" className="hover:text-emerald-brand transition-colors">Services</a></li>
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