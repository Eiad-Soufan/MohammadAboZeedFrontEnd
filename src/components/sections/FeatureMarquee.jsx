// src/components/sections/FeatureMarquee.jsx
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Props:
 * - items?: string[]    (النصوص المعروضة)
 * - compact?: boolean   (نسخة مضغوطة لتحت الصورة)
 * - className?: string  (كلاسات إضافية للحاوية)
 */
export default function FeatureMarquee({ items: itemsProp, compact = false, className = "" }) {
    const defaultItems = [
        "مدير استراتيجيات نمو لشركات تقنية وتجارية (8+ سنوات).",
        "قيادة فرق بين-وظيفية وتحويل رقمي مُوجَّه بالأثر.",
        "تصميم تجارب تُحقق مبيعات — لا مجرد واجهات جميلة.",
        "بناء أنظمة قابلة للتوسّع: أداء، أمن، وثبات.",
        "نمو مدفوع بالبيانات: محتوى ذكي وتجارب محسوبة.",
    ];

    // لو compact ولم يتم تمرير items → نعرض الجملة المطلوبة فقط
    const items = useMemo(() => {
        if (itemsProp && itemsProp.length) return itemsProp;
        return compact ? ["قيادة، إدارة أعمال، واستراتيجيات نمو "] : defaultItems;
    }, [itemsProp, compact]);

    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const timerRef = useRef(null);
    const DURATION = 4200;

    useEffect(() => {
        if (paused || items.length <= 1) return; // إذا عنصر واحد لا ندوّر
        timerRef.current = setInterval(() => {
            setIndex((i) => (i + 1) % items.length);
        }, DURATION);
        return () => clearInterval(timerRef.current);
    }, [paused, items.length]);

    // كلاس الحاوية حسب النمط
    const containerPadding = compact ? "py-4 px-4 sm:px-5" : "py-8 px-6 sm:px-10";
    const radius = compact ? "rounded-2xl" : "rounded-3xl";

    return (
        <div
            dir="rtl"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className={`relative w-full ${className}`}
        >
            {/* توهج خارجي خفيف */}
            <div
                aria-hidden="true"
                className={`pointer-events-none absolute -inset-[2px] ${radius.replace("rounded", "rounded-")} `}
                style={{
                    background:
                        "linear-gradient(135deg, rgba(16,185,129,0.45), rgba(56,189,248,0.25), rgba(253,224,71,0.35))",
                    filter: "blur(8px) saturate(120%)",
                    opacity: 0.55,
                }}
            />

            {/* الصندوق الزجاجي */}
            <div
                className={`
          relative overflow-hidden ${radius}
          bg-[rgba(13,18,22,0.72)] backdrop-blur-2xl
          ring-1 ring-white/10 shadow-[0_40px_140px_-40px_rgba(0,0,0,0.7)]
          ${containerPadding}
        `}
            >
                {/* توهج داخلي + حبيبات */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-overlay"
                    style={{
                        background:
                            "radial-gradient(1200px 500px at 85% -20%, rgba(255,255,255,0.08), transparent 60%), radial-gradient(1000px 500px at 10% 120%, rgba(16,185,129,0.14), transparent 55%)",
                    }}
                />
                {/* لمعة حافة داخلية */}
                <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 ${radius}`}
                    style={{
                        boxShadow:
                            "inset 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 40px rgba(255,255,255,0.03)",
                    }}
                />

                {/* النص */}
                <div className="relative">
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.h3
                            key={index}
                            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                            transition={{ duration: 0.55, ease: "easeOut" }}
                            className={`
                mx-auto text-center
                ${compact ? "max-w-3xl text-[1.05rem] sm:text-[1.15rem] md:text-[1.25rem]" : "max-w-5xl text-[1.25rem] sm:text-[1.4rem] md:text-[1.6rem]"}
                leading-8 md:leading-9
                font-extrabold tracking-[0.01em]
                text-slate-50 drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]
              `}
                            style={{
                                WebkitTextStroke: "0.2px rgba(0,0,0,0.25)",
                                background:
                                    "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(221,244,255,0.95))",
                                WebkitBackgroundClip: "text",
                                backgroundClip: "text",
                                color: "transparent",
                            }}
                        >
                            {items[index]}
                        </motion.h3>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
