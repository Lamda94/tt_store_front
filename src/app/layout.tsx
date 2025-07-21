// src/app/layout.tsx
import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BackToTopButton from "../components/BackToTopButton";
import Script from "next/script";

import "./vendor/bootstrap/css/bootstrap.min.css";
import "./fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "./fonts/iconic/css/material-design-iconic-font.min.css";
import "./fonts/linearicons-v1.0.0/icon-font.min.css";
import "./vendor/animate/animate.css";
import "./vendor/css-hamburgers/hamburgers.min.css";
import "./vendor/animsition/css/animsition.min.css";
import "./vendor/select2/select2.min.css";
import "./vendor/daterangepicker/daterangepicker.css";
import "./vendor/slick/slick.css";
import "./vendor/MagnificPopup/magnific-popup.css";
import "./vendor/perfect-scrollbar/perfect-scrollbar.css";
import "./css/util.css";
import "./css/main.css";
import StoreProvider from "./StoreProvider";


export const metadata: Metadata = {
  title: "Product Page",
  description: "Plantilla de productos con Next.js",
  // El favicon.png debe estar en la carpeta /public
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>
         <StoreProvider>{children}</StoreProvider> 
        </main>
        <BackToTopButton />
        <Footer />
        <Script src="./vendor/bootstrap/js/bootstrap.min.js" />
      </body>
    </html>
  );
}