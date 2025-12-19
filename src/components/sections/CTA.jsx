// src/components/sections/CTA.jsx
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* Stable In-View */
function useStableInView(
    ref,
    { threshold = 0.22, rootMargin = "-12% 0px -12% 0px", enterDelay = 40, exitDelay = 60 } = {}
) {
    const [visible, setVisible] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            (entries) => {
                for (const e of entries) {
                    clearTimeout(timerRef.current);
                    if (e.isIntersecting) {
                        timerRef.current = setTimeout(() => setVisible(true), enterDelay);
                    } else {
                        timerRef.current = setTimeout(() => setVisible(false), exitDelay);
                    }
                }
            },
            { threshold, rootMargin }
        );
        io.observe(el);
        return () => {
            clearTimeout(timerRef.current);
            io.disconnect();
        };
    }, [ref, threshold, rootMargin, enterDelay, exitDelay]);

    return visible;
}

/* Variants */
const sectionVariants = {
    hide: { opacity: 1, y: 0 },
    show: {
        opacity: 1,
        y: 0,
        transition: { when: "beforeChildren", staggerChildren: 0.1 },
    },
};

const blockVariants = {
    hide: { opacity: 0, y: 16, filter: "blur(4px)" },
    show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
};

const lineVariants = {
    hide: { opacity: 0, y: 10 },
    show: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.06, duration: 0.42, ease: [0.22, 1, 0.36, 1] },
    }),
};

export default function CTA() {
    const sectionRef = useRef(null);
    const visible = useStableInView(sectionRef);

    return (
        <section
            ref={sectionRef}
            data-cta
            className="relative overflow-hidden bg-white py-20 md:py-24 text-slate-900"
            dir="rtl"
            style={{ transform: "translateZ(0)" }}
        >
            {/* الخلفية — ألوان الهوية الجديدة */}
            <style>{`
        [data-cta] .bg-grid {
          position:absolute; inset:0; pointer-events:none; z-index:0;
          background:
            radial-gradient(1200px 700px at 85% 20%, rgba(0,84,103,0.10), transparent 60%),
            radial-gradient(900px 600px at 10% 70%, rgba(0,84,103,0.12), transparent 60%),
            linear-gradient(180deg, rgba(233,243,243,0.80), rgba(255,255,255,0.92));
          -webkit-mask-image: radial-gradient(100% 100% at 50% 50%, #000 30%, transparent 100%);
                  mask-image: radial-gradient(100% 100% at 50% 50%, #000 30%, transparent 100%);
        }
        [data-cta] .bg-lines{
          position:absolute; inset:0; pointer-events:none; z-index:0;
          background-image:
            linear-gradient(rgba(0,84,103,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,84,103,0.06) 1px, transparent 1px);
          background-size: 36px 36px, 36px 36px;
          opacity:.65;
          -webkit-mask-image: radial-gradient(90% 70% at 50% 50%, #000 65%, transparent 100%);
                  mask-image: radial-gradient(90% 70% at 50% 50%, #000 65%, transparent 100%);
        }
        @media (prefers-reduced-motion: reduce){
          [data-cta] .spark, [data-cta] .bg-lines { animation:none !important; }
        }
      `}</style>

            {/* طبقات الخلفية */}
            <div className="bg-grid" aria-hidden="true" />
            <div className="bg-lines" aria-hidden="true" />

            <motion.div
                variants={sectionVariants}
                initial="hide"
                animate={visible ? "show" : "hide"}
                className="container relative z-10 mx-auto max-w-7xl px-6"
            >
                <motion.div
                    variants={blockVariants}
                    className="mx-auto flex min-h-[46vh] max-w-3xl flex-col items-center justify-center text-center"
                >
                    {/* هالة خلف الزر */}
                    <div className="relative">
                        <motion.div
                            aria-hidden="true"
                            className="absolute -inset-8 -z-10 rounded-full"
                            initial={{ opacity: 0.35, scale: 1 }}
                            whileHover={{ opacity: 0.55, scale: 1.03 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            style={{
                                background:
                                    "radial-gradient(60% 60% at 50% 50%, rgba(0,84,103,0.35), rgba(233,243,243,0))",
                                filter: "blur(16px)",
                            }}
                        />

                        {/* زر الانضمام — تركواز مع لمسة ليموني خفيفة في الظل */}
                        <motion.a
                            href="/login"
                            variants={lineVariants}
                            initial={false}
                            className="relative inline-flex h-14 items-center justify-center rounded-2xl px-10 text-lg md:text-xl font-extrabold tracking-tight text-white ring-1 ring-white/10 outline-none focus-visible:ring-2 focus-visible:ring-[rgba(0,84,103,.4)] select-none"
                            style={{
                                backgroundImage:
                                    "linear-gradient(135deg, #005467 0%, #037187 55%, #0C8AA3 100%)",
                                backgroundSize: "200% 200%",
                            }}
                            whileHover={{
                                scale: 1.015,
                                y: -1,
                                boxShadow: "0 24px 80px -28px rgba(0,84,103,0.60)",
                                backgroundPosition: "100% 50%",
                            }}
                            whileTap={{ scale: 0.985 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                                mass: 0.4,
                                backgroundPosition: { duration: 0.8, ease: "easeOut" },
                            }}
                        >
                            انضم إلينا الآن
                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10"
                            />
                        </motion.a>
                    </div>

                    {/* نص ترغيبي — الكلمات المميزة بالتركواز */}
                    <motion.p
                        custom={1}
                        variants={lineVariants}
                        className="mt-6 text-base md:text-lg leading-8 text-slate-700"
                    >
                        انضم اليوم وابدأ رحلتك مع{" "}
                        <span className="font-semibold" style={{ color: "#005467" }}>
                            نشرة يومية مركّزة
                        </span>
                        ،
                        <span className="font-semibold" style={{ color: "#005467" }}>
                            {" "}كورسات مصغّرة مجانية
                        </span>
                        ،
                        <span className="font-semibold" style={{ color: "#005467" }}>
                            {" "}قوالب جاهزة
                        </span>
                        ،
                        <span className="font-semibold" style={{ color: "#005467" }}>
                            {" "}أدوات قياس
                        </span>
                        ، و
                        <span className="font-semibold" style={{ color: "#005467" }}>
                            {" "}جلسات مباشرة
                        </span>
                        {" "}— كلُّها لتعزيز قيادتك، وتنمية أعمالك، وتسريع نتائجك. حساب مجاني ويمكنك الإلغاء في أي وقت.
                    </motion.p>

                    {/* نقاط قصيرة */}
                    <motion.ul
                        variants={blockVariants}
                        className="mt-4 grid grid-cols-1 gap-2 text-sm text-slate-600 md:grid-cols-3"
                    >
                        {[
                            "محتوى عملي بلا حشو",
                            "قوالب + أدوات قابلة للاستخدام",
                            "تحديثات أسبوعية على مسارك",
                        ].map((t, i) => (
                            <motion.li
                                key={t}
                                custom={i}
                                variants={lineVariants}
                                className="rounded-full px-3 py-1.5 border"
                                style={{
                                    background: "#E9F3F3", // بديل #F2F7FE
                                    borderColor: "rgba(0,84,103,.15)",
                                }}
                            >
                                {t}
                            </motion.li>
                        ))}
                    </motion.ul>
                </motion.div>
            </motion.div>

            {/* خط سفلي متدرّج بلون الهوية */}
            <div className="absolute inset-x-0 bottom-0">
                <div
                    className="h-[2px] w-full"
                    style={{
                        background:
                            "linear-gradient(90deg, rgba(0,84,103,0.9), rgba(233,243,243,0.9), rgba(0,84,103,0.9))",
                    }}
                />
                <div
                    className="h-2 w-full blur-md opacity-35"
                    style={{
                        background:
                            "linear-gradient(90deg, rgba(0,84,103,0.35), rgba(233,243,243,0.25), rgba(0,84,103,0.35))",
                    }}
                />
            </div>
        </section>
    );
}
