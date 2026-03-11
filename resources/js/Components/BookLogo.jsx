import React from 'react';

export default function BookLogo({ className = "w-8 h-8" }) {
    return (
        <img
            src="/images/book-logo.png"
            alt="BookVault Logo"
            className={className}
        />
    );
}
