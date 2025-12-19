// src/pages/Home.jsx
import CTA from "../components/sections/CTA";
import Hero from "../components/sections/Hero";

import ExpertTestimonials from "../components/sections/ExpertTestimonials";
import ServicesShowcase from "../components/sections/ServicesShowcase";
import SiteMission from "../components/sections/SiteMission";
import Stats from "../components/sections/Stats";
import SuccessStories from "../components/sections/SuccessStories";

// ألوان الهوية
const BRAND = "#005467";
const ACCENT = "#CDDC2D";

export default function Home() {
    return (
        <div
            dir="rtl"
            className="min-h-screen relative overflow-x-clip"
            style={{
                background: "linear-gradient(to bottom, #ffffff, #f9fbfc, #ffffff)",
            }}
        >
            {/* خلفية لطيفة بألوان الهوية */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10"
                style={{
                    background: `
            radial-gradient(1100px 620px at 85% 8%, ${BRAND}0f, transparent 60%),
            radial-gradient(900px 540px at 12% 78%, ${ACCENT}17, transparent 60%),
            linear-gradient(180deg, #ffffff, #fbfdfd)
          `,
                }}
            />

            {/* ✅ الحيلة: حاوية full-bleed للـHero فقط */}
            <div className="edge-bleed">
                <Hero />
            </div>

            {/* بقية الأقسام تبقى ضمن التخطيط المعتاد */}
            <Stats />

            <ServicesShowcase />
            <ExpertTestimonials />
            <SuccessStories />
            <SiteMission />
            <CTA />

            {/* نمط مساعد للامتداد العرضي الكامل */}
            <style>{`
        .edge-bleed{
          width: 100vw;               /* يمتد بعرض النافذة */
          position: relative;
          left: 50%;
          right: 50%;
          margin-left: -50vw;         /* يلغي أي padding للحاويات الأبوية */
          margin-right: -50vw;
          transform: translateX(0);   /* لا حاجة لترجمة إضافية مع RTL */
          max-width: 100vw;
        }

        /* حماية من أي تمرير أفقي غير مرغوب */
        html, body { overflow-x: hidden; }
      `}</style>
        </div>
    );
}
