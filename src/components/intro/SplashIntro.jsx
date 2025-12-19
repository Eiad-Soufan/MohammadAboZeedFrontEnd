// src/components/intro/SplashIntro.jsx
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/* ===== ألوان الهوية الجديدة ===== */
const COLOR_PRIMARY = "#005467";          // تركوازي أساسي
const COLOR_PRIMARY_DARK = "#003C48";     // تركوازي أغمق بسيط
const COLOR_PRIMARY_LIGHT = "#3B8E9B";    // تركوازي أفتح (مشتق)
const COLOR_ACCENT = "#CDDC2D";           // ليموني
const TEXT_SECONDARY = "#414042";         // رمادي داكن من الهوية
const BG_SOFT = "#FFFFFF";                // خلفية فاتحة جدًا (أبيض)

function usePrefersReducedMotion() {
    const [reduced, setReduced] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReduced(mq.matches);
        const handler = () => setReduced(mq.matches);
        mq.addEventListener?.("change", handler);
        return () => mq.removeEventListener?.("change", handler);
    }, []);
    return reduced;
}

export default function SplashIntro({
    phraseAr = "الإرث الذي يصنع المستقبل",          // بدون نقطة
    phraseEn = "A heritage that shapes the future.",   // مع نقطة (LTR)
    doctorSrc = doctorImg,                             // public/
    doctorName = "الدكتور محمد أبوزيد",
    onDone = () => { },
}) {
    const prefersReduced = usePrefersReducedMotion();
    const [show, setShow] = useState(true);
    const [closing, setClosing] = useState(false);

    // تقسيم النصوص
    const wordsAr = phraseAr.split(" ");
    const wordsEn = phraseEn.split(" ");

    // الإيقاع: عربي → خط → إنجليزي → صورة + اسم
    const tArStart = 0.15;
    const tArEnd = prefersReduced ? 0.15 : tArStart + wordsAr.length * 0.09 + 0.18;
    const tLine = tArEnd + 0.15;
    const tEnStart = tLine + 0.40;
    const tEnEnd = prefersReduced ? tEnStart : tEnStart + wordsEn.length * 0.06 + 0.22;
    const tImageAndName = tEnEnd + 0.18;

    // خروج شبه غير ملحوظ: انتظر انتهاء الاسم + 1s راحة ثم تلاشي 0.2s
    const nameSweepMs = 1300;
    useEffect(() => {
        const totalMs = prefersReduced ? 1500 : (tImageAndName * 1000) + nameSweepMs + 1000;
        const timer = setTimeout(() => {
            setClosing(true);
            setTimeout(() => { setShow(false); onDone?.(); }, 200); // 0.2s
        }, totalMs);

        const prev = document.documentElement.style.overflow;
        document.documentElement.style.overflow = "hidden";
        return () => {
            clearTimeout(timer);
            document.documentElement.style.overflow = prev;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [prefersReduced]);

    return (
        <AnimatePresence>
            {show && (
                <motion.aside
                    className="fixed inset-0 z-[9999] flex items-center justify-center"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: closing ? 0 : 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: closing ? 0.2 : 0, ease: "easeOut" }}
                    style={{ background: BG_SOFT }}
                >
                    <div className="relative mx-auto w-full max-w-6xl px-6">
                        {/* 1) صورة الدكتور — تبقى كما هي */}
                        <div
                            className="flex justify-center"
                            style={{
                                backgroundImage: `url(${doctorSrc})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center 22%",
                            }}
                        />

                        {/* 2) العنوان العربي — بتدرّج تركوازي مع لمسة داكنة */}
                        <div className="relative z-10 mt-10 flex flex-wrap items-baseline justify-center gap-x-3 text-center">
                            {wordsAr.map((w, i) => (
                                <motion.span
                                    key={`ar-${i}`}
                                    className="leading-[2.0]"
                                    dir="rtl"
                                    style={{
                                        fontSize: "clamp(34px, 5.2vw, 54px)",
                                        fontWeight: 800,
                                        letterSpacing: "0.15px",
                                        backgroundImage: `linear-gradient(180deg, ${COLOR_PRIMARY}, ${COLOR_PRIMARY} 62%, ${COLOR_PRIMARY_DARK})`,
                                        WebkitBackgroundClip: "text",
                                        backgroundClip: "text",
                                        color: "transparent",
                                        textShadow: "0 1px 0 rgba(0,84,103,0.10)",
                                    }}
                                    initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 170,
                                        damping: 20,
                                        delay: prefersReduced ? 0 : tArStart + i * 0.09,
                                    }}
                                >
                                    {w}
                                </motion.span>
                            ))}
                        </div>

                        {/* 3) الخط المتدرّج — ألوان الهوية الجديدة */}
                        <div className="relative z-0 mx-auto mt-8 flex w-full max-w-3xl justify-center">
                            <GradientLine delay={tLine} />
                        </div>

                        {/* 4) الترجمة الإنجليزية — نص ثانوي مع لمسة تركواز */}
                        <div className="mt-6 flex flex-wrap justify-center gap-x-2 text-center" dir="ltr">
                            {wordsEn.map((w, i) => (
                                <motion.span
                                    key={`en-${i}`}
                                    style={{
                                        fontSize: "clamp(18px, 2.5vw, 24px)",
                                        fontWeight: 600,
                                        letterSpacing: "0.2px",
                                        backgroundImage: `linear-gradient(180deg, ${TEXT_SECONDARY}, ${TEXT_SECONDARY} 70%, ${COLOR_PRIMARY})`,
                                        WebkitBackgroundClip: "text",
                                        backgroundClip: "text",
                                        color: "transparent",
                                        transform: "skewX(-3deg)",
                                        unicodeBidi: "isolate",
                                    }}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.4,
                                        delay: prefersReduced ? 0 : tEnStart + i * 0.06,
                                    }}
                                >
                                    {w}
                                </motion.span>
                            ))}
                        </div>

                        {/* 5) اسم الدكتور — لون تركوازي + بريق ليموني خفيف */}
                        <div className="mt-10 flex justify-center">
                            <NameSignatureSweep
                                name={doctorName}
                                delay={tImageAndName}
                                sweepMs={nameSweepMs}
                                color={COLOR_PRIMARY}
                            />
                        </div>
                    </div>
                </motion.aside>
            )}
        </AnimatePresence>
    );
}

/* ===== صورة (بدون تغيير وظيفي) ===== */
function ImageBox({ src, width = 260, height = 340, delay = 0 }) {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        const img = new Image();
        img.onload = () => setLoaded(true);
        img.onerror = () => setLoaded(false);
        img.src = src;
    }, [src]);

    return (
        <motion.div
            className="relative overflow-hidden rounded-3xl border bg-white"
            style={{
                borderColor: "rgba(0,84,103,0.18)",
                width,
                height,
                boxShadow:
                    "0 28px 80px -28px rgba(0,84,103,0.25), inset 0 0 0 1px rgba(0,84,103,0.06)",
            }}
            initial={{ opacity: 0, y: 12, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut", delay }}
        >
            {loaded ? (
                <img src={src} alt="Doctor" className="h-full w-full object-cover" />
            ) : (
                <div
                    className="h-full w-full"
                    style={{
                        background: `linear-gradient(135deg, #F7FAF9, #EDF5F4)`,
                    }}
                />
            )}
        </motion.div>
    );
}

/* ===== الخط المتدرّج — هوية جديدة (تركاوزي + ليموني) ===== */
function GradientLine({ delay = 0 }) {
    const prefersReduced = usePrefersReducedMotion();
    const baseStyle = {
        height: 5,
        width: "100%",
        borderRadius: 999,
        background: `linear-gradient(
      90deg,
      rgba(0,84,103,0) 0%,
      ${COLOR_PRIMARY_LIGHT} 14%,
      ${COLOR_PRIMARY} 50%,
      ${COLOR_PRIMARY_DARK} 76%,
      ${COLOR_ACCENT} 90%,
      rgba(0,84,103,0) 100%
    )`,
        backgroundSize: "240% 100%",
        boxShadow: "0 6px 18px -10px rgba(0,84,103,0.45)",
    };
    if (prefersReduced) return <div style={baseStyle} />;

    return (
        <motion.div
            style={baseStyle}
            initial={{ opacity: 0, backgroundPosition: "50% 0%" }}
            animate={{ opacity: 1, backgroundPosition: ["40% 0%", "60% 0%", "40% 0%"] }}
            transition={{
                delay,
                duration: 0.6,
                ease: "easeOut",
                backgroundPosition: { delay, duration: 4.0, repeat: Infinity, ease: "easeInOut" },
            }}
        />
    );
}

/* ===== اسم الدكتور — مع لمسة بريق تناسب الهوية ===== */
function NameSignatureSweep({ name, delay = 0, sweepMs = 1300, color = COLOR_PRIMARY }) {
    const styleBase = {
        fontSize: "clamp(28px, 5vw, 46px)",
        fontWeight: 500,
        color,
        whiteSpace: "nowrap",
        lineHeight: 1.2,
        fontFamily: "'Great Vibes', 'Dancing Script', 'Scheherazade New', cursive, 'Tahoma'",
        transform: "skewX(-6deg)",
        textShadow: "0 1px 0 rgba(0,84,103,0.10)",
    };

    return (
        <div className="relative inline-block" dir="rtl">
            <motion.div
                initial={{ clipPath: "inset(0 0 0 100%)", opacity: 1 }}
                animate={{ clipPath: "inset(0 0 0 0%)", opacity: 1 }}
                transition={{ delay, duration: sweepMs / 1000, ease: "easeInOut" }}
                style={{ willChange: "clip-path" }}
            >
                <span style={styleBase}>{name}</span>
            </motion.div>

            {/* القلم: يتحرك ثم يختفي — بريق ليموني لطيف */}
            <motion.span
                aria-hidden
                className="absolute top-1/2 -translate-y-1/2"
                initial={{ right: 0, opacity: 1 }}
                animate={{ right: "100%", opacity: 0 }}
                transition={{ delay, duration: sweepMs / 1000, ease: "easeInOut" }}
                style={{
                    width: 10,
                    height: 10,
                    background: color,
                    borderRadius: 999,
                    boxShadow: `0 0 10px ${COLOR_ACCENT}AA, 0 0 18px rgba(0,84,103,0.45)`,
                }}
            />
        </div>
    );
}
