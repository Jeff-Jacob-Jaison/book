import { Link } from '@inertiajs/react';
import BookLogo from '@/Components/BookLogo';

export default function GuestLayout({ children }) {
    return (
        <div
            className="flex flex-col lg:flex-row min-h-screen lg:h-screen lg:overflow-hidden bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/cloud-texture.png')" }}
        >
            {/* Left Column: Form Area */}
            <div className="relative flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16 xl:px-24 border-r border-gray-100 lg:h-screen lg:overflow-y-auto">
                {/* Back to Home Button */}
                <Link href="/" className="absolute top-6 left-6 lg:top-10 lg:left-10 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors z-20 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-white/40">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                    <span className="font-medium text-sm">Home</span>
                </Link>

                <div className="relative z-10 mx-auto w-full max-w-sm bg-white/70 backdrop-blur-xl p-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-white">
                    {/* Logo */}
                    <Link href="/" className="mb-10 flex items-center gap-3 group">
                        <BookLogo className="h-10 w-10 text-emerald-brand drop-shadow-md" />
                        <span className="text-xl font-bold tracking-wide uppercase text-gray-900">Book Vault</span>
                    </Link>

                    {/* Form Content */}
                    <div className="mt-8">
                        {children}
                    </div>
                </div>
            </div>

            {/* Right Column: Visual Area (Hidden on Mobile) */}
            <div className="hidden lg:relative lg:flex lg:w-1/2 items-center justify-center p-8 lg:h-screen lg:overflow-hidden">
                {/* Background Panel */}
                <div className="absolute inset-0 bg-teal-panel m-4 rounded-[2rem] overflow-hidden shadow-2xl">
                    {/* Decorative Background Elements */}
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-brand rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-dark rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 w-full h-full max-w-lg text-center flex flex-col items-center justify-center py-6">
                    <div className="flex-1 min-h-0 w-full flex items-center justify-center mb-6">
                        <img
                            src="/images/auth-statue.png"
                            alt="Wisdom and Discovery"
                            className="max-h-full max-w-[16rem] lg:max-w-[20rem] xl:max-w-md object-contain drop-shadow-2xl"
                        />
                    </div>
                    <div className="w-[90%] shrink-0 bg-white/10 backdrop-blur-md rounded-2xl p-6 xl:p-8 border border-white/20 shadow-xl">
                        <h2 className="text-2xl xl:text-3xl font-bold text-white mb-4">
                            Unlock Your Next Adventure
                        </h2>
                        <p className="text-emerald-50 text-lg leading-relaxed">
                            Join BookVault to discover tailored recommendations, seamlessly manage your reading list, and explore our integrated marketplace.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
