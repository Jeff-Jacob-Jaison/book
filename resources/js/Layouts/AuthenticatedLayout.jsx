import BookLogo from '@/Components/BookLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const userRole = user?.role?.name || 'Member';
    const isLibrarian = userRole === 'Librarian';

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    // Common styling classes for the sidebar links
    const sidebarLinkClass = (active) => `
        flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 w-full mb-1
        ${active
            ? 'bg-white text-[#0c4a30] font-bold shadow-md'
            : 'text-emerald-50 hover:bg-emerald-800 hover:text-white font-medium'
        }
    `;

    return (
        <div className="min-h-screen bg-[#f8f9fa] font-sans antialiased text-gray-800 flex overflow-hidden">

            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-64 bg-[#0c4a30] h-screen fixed top-0 left-0 z-40 overflow-y-auto overflow-x-hidden pt-6 shadow-xl">

                {/* Brand Logo */}
                <div className="px-8 pb-8 flex items-center gap-3">
                    <BookLogo className="h-8 w-8 text-white" />
                    <span className="text-xl font-bold tracking-tight text-white uppercase">Book Vault</span>
                </div>

                {/* Main Menu Navigation */}
                <div className="px-4 flex-1">
                    <p className="px-4 text-[10px] font-bold tracking-widest text-emerald-300 uppercase mb-3">Main Menu</p>

                    <Link href={route('dashboard')} className={sidebarLinkClass(route().current('dashboard'))}>
                        <svg className="w-5 h-5" fill={route().current('dashboard') ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={route().current('dashboard') ? 0 : 2} >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Dashboard
                    </Link>

                    <Link href={route('collection')} className={sidebarLinkClass(route().current('collection'))}>
                        <svg className="w-5 h-5" fill={route().current('collection') ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={route().current('collection') ? 0 : 2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        Storefront
                    </Link>

                    {isLibrarian && (
                        <>
                            <p className="px-4 text-[10px] font-bold tracking-widest text-emerald-300 uppercase mt-8 mb-3">Librarian Operations</p>
                            <Link href="/books" className={sidebarLinkClass(route().current('books.*'))}>
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                Manage Inventory
                            </Link>
                        </>
                    )}

                    <p className="px-4 text-[10px] font-bold tracking-widest text-emerald-300 uppercase mt-8 mb-3">User Menu</p>

                    <Link href="/submissions" className={sidebarLinkClass(route().current('submissions.*'))}>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        My Submissions
                    </Link>

                    <Link href="/purchases" className={sidebarLinkClass(route().current('purchases.*'))}>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        My E-Library
                    </Link>

                    <Link href="/wishlists" className={sidebarLinkClass(route().current('wishlists.*'))}>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                        Wishlist
                    </Link>

                    <Link href="/lendings" className={sidebarLinkClass(route().current('lendings.*'))}>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {isLibrarian ? "Lending Records" : "My Rentals"}
                    </Link>

                    <Link href="/fines" className={sidebarLinkClass(route().current('fines.*'))}>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {isLibrarian ? "Financials & Fines" : "My Fines"}
                    </Link>


                </div>

                {/* Bottom Settings Navigation */}
                <div className="p-4 mb-4">
                    <Link href={route('profile.edit')} className={sidebarLinkClass(route().current('profile.edit'))}>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Setting
                    </Link>

                    <Link href={route('logout')} method="post" as="button" className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 w-full mb-1 text-emerald-100 hover:bg-emerald-900 hover:text-white font-medium text-left">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Log out
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col md:ml-64 relative min-w-0 h-screen overflow-y-auto">

                {/* Top Header Row aligned to the right like the reference image */}
                <header className="flex items-center justify-between md:justify-end px-8 py-4 bg-white/50 backdrop-blur sticky top-0 z-30">

                    {/* Mobile Hamburger toggle */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                            className="p-2 -ml-2 text-gray-400 bg-white rounded-lg hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <span className="ml-3 font-bold text-gray-800 uppercase tracking-wide md:hidden">Book Vault</span>
                    </div>

                    {/* Profile & Notifications container */}
                    <div className="flex items-center gap-4">

                        {/* Notification Bell */}
                        <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm hover:shadow text-gray-500 hover:text-emerald-600 transition-all border border-gray-100">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </button>

                        {/* Profile Dropdown */}
                        <div className="relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button
                                        type="button"
                                        className="inline-flex items-center gap-2 rounded-full border border-transparent bg-white px-3 py-1.5 shadow-sm hover:shadow text-sm font-bold text-gray-700 transition"
                                    >
                                        {/* generic avatar circle based on reference image */}
                                        <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs uppercase overflow-hidden border border-emerald-200">
                                            {user.name.charAt(0)}
                                        </div>
                                        {user.name}

                                        <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">Log Out</Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                    </div>
                </header>

                {/* Mobile Navigation Dropdown */}
                <div className={`md:hidden bg-white border-b border-gray-100 shadow-sm ${showingNavigationDropdown ? 'block' : 'hidden'}`}>
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>Dashboard</ResponsiveNavLink>
                        <ResponsiveNavLink href={route('collection')} active={route().current('collection')}>Storefront</ResponsiveNavLink>
                        {isLibrarian && <ResponsiveNavLink href="/books" active={route().current('books.*')}>Manage Inventory</ResponsiveNavLink>}
                        <ResponsiveNavLink href="/submissions" active={route().current('submissions.*')}>My Submissions</ResponsiveNavLink>
                        <ResponsiveNavLink href="/purchases" active={route().current('purchases.*')}>My E-Library</ResponsiveNavLink>
                        <ResponsiveNavLink href="/wishlists" active={route().current('wishlists.*')}>Wishlist</ResponsiveNavLink>
                        <ResponsiveNavLink href="/lendings" active={route().current('lendings.*')}>{isLibrarian ? "Lending Records" : "My Rentals"}</ResponsiveNavLink>
                        <ResponsiveNavLink href="/fines" active={route().current('fines.*')}>{isLibrarian ? "Financials & Fines" : "My Fines"}</ResponsiveNavLink>
                    </div>

                    <div className="border-t border-gray-100 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800">{user.name}</div>
                            <div className="text-sm font-medium text-gray-500">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">Log Out</ResponsiveNavLink>
                        </div>
                    </div>
                </div>

                {/* Page Action Header (The Title and Action buttons container) */}
                {header && (
                    <div className="px-8 mt-2 mb-6">
                        {header}
                    </div>
                )}

                {/* Main Rendered View Content */}
                <main className="flex-1 px-8 pb-12 w-full max-w-7xl mx-auto">
                    {children}
                </main>

            </div>
        </div>
    );
}
