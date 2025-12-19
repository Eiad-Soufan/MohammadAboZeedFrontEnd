// src/components/sections/Hero.jsx
// خلفية سلايد شو مع نفس أنيميشن الدخول للصورة الأصلية
// كل صورة تظهر 2 ثانية ثم تنتقل تلقائياً مع نفس الحركة
// احترام prefers-reduced-motion + تحميل مُسبق للصور

import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import BG1 from "../../assets/DSC07353.jpg";
import BG3 from "../../assets/DSC07497-Enhanced-NR.jpeg";
import BG2 from "../../assets/DSC07516.jpeg";

const BRAND_PRIMARY = "#005467"; // تركوازي
const BRAND_ACCENT = "#CDDC2D";  // ليموني
const BRAND_ACCENT_HOVER = "#BFD027"; // تغميق خفيف للّيموني عند التحويم
const BRAND_GRAY_LIGHT = "#E5E7EB";    // نص فاتح جداً للفقرة
const BRAND_DARK = "#414042";

const DISPLAY_MS = 3000; // مدة عرض كل صورة بالمللي ثانية

export default function Hero() {
  // قائمة الصور — تأكدنا من مطابقة حالة الامتداد (JPG/jpg)
  const images = useMemo(() => [BG1, BG2, BG3], []);
  const [idx, setIdx] = useState(0);

  // احترام تفضيل تقليل الحركة
  const prefersReducedMotion = usePrefersReducedMotion();

  // تحميل مُسبق للصور لتفادي الوميض
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  // تدوير الصور كل DISPLAY_MS مع إعادة تشغيل أنيميشن الدخول
  useEffect(() => {
    if (prefersReducedMotion) return; // لا تدوير إذا كان المستخدم يفضّل تقليل الحركة
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % images.length);
    }, DISPLAY_MS);
    return () => clearInterval(t);
  }, [images.length, prefersReducedMotion]);

  return (
    <section className="relative w-full overflow-hidden">
      {/* ✅ حاوية الخلفية بعرض الشاشة */}
      <div className="relative w-full h-[560px] sm:h-[600px] lg:h-[640px]">
        {/* صورة الخلفية — ندفع React لإعادة تركيب العنصر بتغيير الـ key لتُعاد الأنيميشن */}
        <img
          key={idx} // مهم لإعادة تشغيل @keyframes عند تغيّر الصورة
          src={images[idx]}
          alt="خلفية قاعة تدريب"
          className="absolute inset-0 w-full h-full object-cover hero-bg"
        />

        {/* طبقة صبغة تركوازية خفيفة — تلاشي لطيف */}
        <div
          className="absolute inset-0 hero-tint"
          style={{ background: `${BRAND_PRIMARY}AA`, mixBlendMode: "multiply" }}
        />

        {/* تدرّج تركوازي من اليمين — تلاشي لطيف */}
        <div
          className="absolute inset-0 hero-grad"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,84,103,0.78) 0%, rgba(0,84,103,0.62) 18%, rgba(0,84,103,0.40) 36%, rgba(0,84,103,0.18) 56%, rgba(0,84,103,0.06) 72%, rgba(0,84,103,0) 100%)",
          }}
        />

        {/* المحتوى — تدرّج ظهور متتابع للنصوص */}
        <div className="absolute inset-0 flex items-center">
          <div className="w-full px-6 sm:px-10 lg:px-16">
            <div className="max-w-[720px] ml-auto text-right">
              <h1 className="text-white font-extrabold leading-[1.15] tracking-tight text-3xl sm:text-4xl lg:text-5xl">
                <span
                  className="block hero-line font-ibm"
                  style={{ animationDelay: "140ms" }}
                >
                  ريادة أعمال عملية.
                </span>
                <span
                  className="block mt-5 hero-line font-ibm"
                  style={{ animationDelay: "280ms" }}
                >
                  خبرة واقعية.
                </span>
                <span
                  className="block mt-5 hero-line font-ibm"
                  style={{ color: BRAND_ACCENT, animationDelay: "420ms" }}
                >
                  نتائج حقيقية.
                </span>
              </h1>

              <p
                className="mt-5 text-base sm:text-lg leading-8 hero-fade "
                style={{ color: BRAND_GRAY_LIGHT, animationDelay: "580ms" }}
              >
                لتصل إلى نتائج أسرع وتتجنب الأخطاء الشائعة، أساعدك بخبرة واقعية ومنهجية
                واضحة لبناء مشروع قابل للنمو والتوسع.
              </p>

              <div className="mt-7 flex items-center ltr:justify-end rtl:justify-start gap-8 hero-fade ltr:ml-auto rtl:mr-auto text-right" dir="rtl"

                style={{ animationDelay: "740ms" }}
              >
                <Link
                  className="btn ghost"
                  to="/courses/online"
                  style={{
                    background: '#FFFFFF',
                    backgroundImage: 'none',
                    color: '#005467',
                    border: '1px solid rgba(0,84,103,.22)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,.9)',
                    borderRadius: "6px", fontSize: "18px"
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#F8FAFC'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#FFFFFF'; }}
                >
                  ابدأ صناعة نجاحك الآن
                </Link>
                <Link
                  className="btn filled speaker-match"
                  to="/contact"
                  style={{
                    background: '#CDDC2D',
                    backgroundImage: 'none',      // يلغي أي تدرّج قديم
                    color: '#414042',
                    border: '1px solid rgba(0,0,0,.06)',
                    boxShadow: '0 10px 24px -12px rgba(0,0,0,.35)',
                    borderRadius: "6px", fontSize: "18px"
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#BFD027'; e.currentTarget.style.boxShadow = '0 16px 30px -12px rgba(0,0,0,.45)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#CDDC2D'; e.currentTarget.style.boxShadow = '0 10px 24px -12px rgba(0,0,0,.35)'; }}
                >
                  تواصل مع الدكتور محمد ابوزيد
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* أنماط الأنيميشن — مع احترام prefers-reduced-motion */}
      <style>{`
        /* خلفية: تكبير بسيط + تلاشي */
        @keyframes hero-bg-reveal {
          0%   { opacity: 0; transform: scale(1.035); }
          100% { opacity: 1; transform: scale(1); }
        }
        /* طبقات الصبغة/التدرج: تلاشي هادئ */
        @keyframes hero-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        /* النصوص: صعود لطيف + تلاشي */
        @keyframes hero-fade-up {
          0%   { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .hero-bg{
          opacity: 0;
          animation: hero-bg-reveal .9s ease-out forwards;
          animation-delay: 60ms;
          will-change: opacity, transform;
        }
        .hero-tint, .hero-grad{
          opacity: 0;
          animation: hero-fade 1s ease-out forwards;
          animation-delay: 140ms;
        }
        .hero-line{
          opacity: 0;
          animation: hero-fade-up .7s cubic-bezier(.22,.61,.36,1) forwards;
          will-change: opacity, transform;
        }
        .hero-fade{
          opacity: 0;
          animation: hero-fade-up .7s cubic-bezier(.22,.61,.36,1) forwards;
          will-change: opacity, transform;
        }

        /* احترام تقليل الحركة */
        @media (prefers-reduced-motion: reduce){
          .hero-bg,
          .hero-tint,
          .hero-grad,
          .hero-line,
          .hero-fade{
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}

/* هوك بسيط لاكتشاف تفضيل تقليل الحركة */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  const mqlRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    mqlRef.current = mql;
    const onChange = () => setReduced(!!mql.matches);
    onChange();
    mql.addEventListener ? mql.addEventListener("change", onChange) : mql.addListener(onChange);
    return () => {
      mql.removeEventListener ? mql.removeEventListener("change", onChange) : mql.removeListener(onChange);
    };
  }, []);

  return reduced;
}
