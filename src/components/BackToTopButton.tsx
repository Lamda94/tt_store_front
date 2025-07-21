// src/components/BackToTopButton.tsx
"use client";

import { useState, useEffect } from 'react';

const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Muestra el botón cuando el usuario baja 100px
    const toggleVisibility = () => {
        if (window.scrollY > 100) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Sube al inicio de la página suavemente
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);

        // Limpia el listener cuando el componente se desmonta
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <div className="btn-back-to-top" id="myBtn" style={{ display: isVisible ? 'flex' : 'none' }} onClick={scrollToTop}>
            <span className="symbol-btn-back-to-top">
                <i className="zmdi zmdi-chevron-up"></i>
            </span>
        </div>
    );
};

export default BackToTopButton;