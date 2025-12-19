import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "../components/layout/Footer.jsx"; // ← خلي الامتداد jsx وتحقق من اسم المجلد/الملف
import HeaderBar from "../components/layout/HeaderBar.jsx"; // ← نفس الشي للهيدر

export default function RootLayout() {
    return (
        <>
            <HeaderBar />
            <main style={{ minHeight: "60vh" }}>
                <Outlet />
            </main>
            <Footer />
            <ScrollRestoration />
        </>
    );
}
