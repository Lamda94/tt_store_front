// src/components/Header.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const changeMenuStatus = ()=>{
        setMobileMenuOpen(!isMobileMenuOpen);
    }

    return (
        <>
            <header className="header-v4">
                <div className="container-menu-desktop">
                    <div className="wrap-menu-desktop how-shadow1">
                        <nav className="limiter-menu-desktop container">
                            <Link href="/" className="logo">
                                <Image src="/images/icons/logo-01.png" alt="IMG-LOGO" width={118} height={28} />
                            </Link>

                            <div className="menu-desktop">
                                <ul className="main-menu">
                                    <li><Link href="/">Home</Link></li>
                                    <li><Link href="/product">Transacciones</Link></li>
                                    <li><Link href="/">Delivery</Link></li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
                <div className="wrap-header-mobile">
                    <div className="logo-mobile">
                        <Link href="/"><Image src="/images/icons/logo-01.png" alt="IMG-LOGO" width={98} height={23} /></Link>
                    </div>
                    <div onClick={changeMenuStatus} className={`btn-show-menu-mobile hamburger hamburger--squeeze ${isMobileMenuOpen ? 'is-active' : ''}`}>
                        <span className="hamburger-box"><span className="hamburger-inner"></span></span>
                    </div>
                </div>
                <div className={`menu-mobile ${isMobileMenuOpen ? 'd-block show-menu-mobile' : 'd-none'}`}>
                    <ul className="main-menu-m">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/product">Transacciones</Link></li>
                        <li><Link href="/">Delivery</Link></li>
                    </ul>
                </div>
            </header>
        </>
    );
}

export default Header;