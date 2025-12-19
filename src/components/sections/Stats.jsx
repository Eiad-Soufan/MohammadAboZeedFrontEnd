// src/components/sections/Stats.jsx
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import numbersIcon from "../../assets/numbersicon.png"; // أيقونة قسم الإحصائيات

/**
 * نفس التحسينات السابقة؛ تم استبدال الألوان فقط بالهوية الجديدة.
 */

const BRAND_PRIMARY = "#005467"; // teal
const BRAND_ACCENT = "#CDDC2D"; // lime

const STATS = [
    { label: "سنوات خبرة", value: 8, suffix: "+", duration: 1200 },
    { label: "مشاريع مكتملة", value: 120, suffix: "+", duration: 1400 },
    { label: "ورش / محاضرات", value: 45, suffix: "+", duration: 1300 },
    { label: "شهادات عملاء", value: 300, suffix: "+", duration: 1500 },
    { label: "متوسط نمو الإيرادات", value: 27, suffix: "%", duration: 1600 },
];

// ظهور الشبكة (يتكرر عند الدخول)
const gridVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
            when: "beforeChildren",
            staggerChildren: 0.1,
        },
    },
};

// ظهور كل بطاقة
const cardVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

export default function Stats() {
    const sectionRef = useRef(null);
    const inView = useInView(sectionRef, { amount: 0.28 });
    const controls = useAnimation();

    useEffect(() => {
        if (inView) controls.start("visible");
        else controls.set("hidden");
    }, [inView, controls]);

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-white py-16 md:py-20 text-slate-900"
            dir="rtl"
        >
            {/* 🛡️ أنماط الهوفر نفسها لكن بألوان الهوية الجديدة */}
            <style
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                    __html: `
@keyframes statGlowPulse {
  0%, 100% { box-shadow:
      0 0 0 1px rgba(0,84,103,0.22),
      0 0 18px rgba(0,84,103,0.14),
      inset 0 0 0 1px rgba(0,84,103,0.10); }
  50% { box-shadow:
      0 0 0 1px rgba(0,84,103,0.26),
      0 0 22px rgba(0,84,103,0.20),
      inset 0 0 0 1px rgba(0,84,103,0.12); }
}
@keyframes statTopSweep {
  0%   { transform: translateX(-30%); opacity: 0; }
  15%  { opacity: 1; }
  85%  { opacity: 1; }
  100% { transform: translateX(130%); opacity: 0; }
}

/* قفل أي تحريك عند الهوفر */
[data-stat-card]{
  position:relative;
  border-radius:16px;
  transform:none !important;
  transition-property: box-shadow, opacity;
  transition-duration:220ms;
  transition-timing-function:cubic-bezier(0.22,1,0.36,1);
  will-change: box-shadow, opacity;
  overflow:hidden;
}
[data-stat-card]:hover{ transform:none !important; }

/* توهج الحواف */
[data-stat-card]::after{
  content:"";
  position:absolute; inset:0; border-radius:16px; pointer-events:none;
  opacity:0; transition:opacity 200ms cubic-bezier(0.22,1,0.36,1);
  box-shadow:
    0 0 0 1px rgba(0,84,103,0.22),
    0 0 18px rgba(0,84,103,0.14),
    inset 0 0 0 1px rgba(0,84,103,0.10);
  background:transparent;
}
[data-stat-card]:hover::after{
  opacity:1; animation: statGlowPulse 1800ms ease-in-out infinite;
}

/* شريط لمعان علوي 2px */
[data-stat-card]::before{
  content:"";
  position:absolute; top:-1px; left:0; height:2px; width:40%;
  border-radius:9999px;
  background: linear-gradient(90deg, rgba(0,84,103,0), rgba(0,84,103,0.35), rgba(0,84,103,0));
  opacity:0; transform: translateX(-30%); pointer-events:none;
}
[data-stat-card]:hover::before{
  opacity:1; animation: statTopSweep 1600ms cubic-bezier(0.22,1,0.36,1) infinite;
}

/* لا يتحرك محتوى البطاقة */
[data-stat-card] *{ transform:none !important; }
        `,
                }}
            />

            <div className="container relative z-10 mx-auto max-w-7xl px-6">
                <div className="mb-10 flex items-end justify-between gap-4">
                    <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight">
                        الأرقام والإحصائيات
                    </h2>
                    <img
                        src={numbersIcon}
                        alt="أيقونة القسم"
                        className="h-11 w-11 md:h-14 md:w-14 object-contain"
                        loading="lazy"
                        decoding="async"
                    />

                </div>

                <motion.div
                    variants={gridVariants}
                    initial="hidden"
                    animate={controls}
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
                >
                    {STATS.map((s, i) => (
                        <StatCard key={i} {...s} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

function StatCard({ label, value, suffix = "", duration = 1500 }) {
    const [display, setDisplay] = useState(0);
    const cardRef = useRef(null);
    const inView = useInView(cardRef, { amount: 0.8 });

    useEffect(() => {
        let raf;
        if (inView) {
            const t0 = performance.now();
            const animate = (t) => {
                const p = Math.min(1, (t - t0) / duration);
                const eased = 1 - Math.pow(1 - p, 3);
                setDisplay(Math.round(value * eased));
                if (p < 1) raf = requestAnimationFrame(animate);
            };
            raf = requestAnimationFrame(animate);
        } else {
            setDisplay(0);
        }
        return () => raf && cancelAnimationFrame(raf);
    }, [inView, value, duration]);

    const number = useMemo(() => display.toLocaleString("en-US"), [display]);

    return (
        <motion.article
            ref={cardRef}
            variants={cardVariants}
            data-stat-card
            className={[
                "relative overflow-hidden rounded-2xl",
                "bg-white border border-slate-200 ring-1",
                // حلقة خفيفة بلون التركواز الجديد
                "ring-[color:rgba(0,84,103,0.10)]",
                "p-5 sm:p-6",
                "transform-gpu",
            ].join(" ")}
            style={{
                // تدرّج خفيف أبيض → لمسة تركواز فاتحة بدل الأزرق السابق
                backgroundImage:
                    "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(233,243,243,0.86))",
            }}
        >
            <div className="relative z-10 flex flex-col items-center text-center">
                {/* الرقم والسُّفكس: تركواز جديد */}
                <div
                    className="font-display text-[2.5rem] md:text-[3rem] font-extrabold tracking-tight leading-none"
                    style={{ color: BRAND_PRIMARY }}
                    lang="en"
                >
                    {number}
                    <span
                        className="ml-0.5 align-middle text-2xl md:text-3xl"
                        style={{ color: BRAND_PRIMARY }}
                    >
                        {suffix}
                    </span>
                </div>

                {/* النص داخل الكارد: رمادي داكن واضح */}
                <div className="mt-2 text-sm md:text-base" style={{ color: "#414042" }}>
                    {label}
                </div>

                {/* الشريط السفلي: تدرّج من التركواز إلى لمسة ليمونية خفيفة */}
                <span
                    aria-hidden="true"
                    className="mt-3 h-1 w-10 rounded-full"
                    style={{
                        background: `linear-gradient(90deg, ${BRAND_PRIMARY}CC, ${BRAND_ACCENT}80)`,
                        boxShadow: "0 0 10px rgba(0,84,103,0.16)",
                    }}
                />
            </div>
        </motion.article>
    );
}
