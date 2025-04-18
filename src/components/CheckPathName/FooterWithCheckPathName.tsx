'use client';

import { usePathname } from "next/navigation";
import Footer from "../footer/Footer";

export default function FooterWithCheckPathName() {
    const pathName = usePathname();

    const hideFooter = (
        pathName.startsWith('/login') ||
        pathName.startsWith('/verify') ||
        pathName.startsWith('/register') ||
        pathName.startsWith('/check-email') ||
        pathName.startsWith('/forgetPassword') ||
        pathName.startsWith('/contact') ||
        pathName.startsWith("/doctor-dashboard") ||
        pathName.startsWith("/profile") ||
        pathName.startsWith("/admin") || 
        pathName.startsWith('/auth/google/callback')
    )

    return <>{!hideFooter && <Footer />}</>;
}
