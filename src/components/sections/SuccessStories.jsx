import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import successicon from "../../assets/successicon.png"; // أيقونة قسم قصص النجاح

/**
 * SuccessStories — Stepper Carousel
 * (لا تغييرات وظيفية؛ ألوان فقط للهوية الجديدة)
 */

const CASES = [
    {
        title: "من 2% إلى 6.8% معدل تحويل خلال 10 أسابيع",
        sector: "SaaS B2B",
        duration: "10 أسابيع",
        summary:
            "خريطة تحسين لمسار الاشتراك + إعادة صياغة عرض القيمة + تجارب تسعير مصغّرة.",
        metrics: [
            { label: "Conversion", value: 6.8, suffix: "%" },
            { label: "CAC↓", value: 32, suffix: "%" },
            { label: "MRR↑", value: 2.4, suffix: "x" },
        ],
        tags: ["A/B Testing", "Pricing", "Activation"],
        cover:
            "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1600&auto=format&fit=crop",
    },
    {
        title: "زيادة 44% في المبيعات عبر تحسين تجربة الدفع",
        sector: "تجارة إلكترونية",
        duration: "6 أسابيع",
        summary:
            "تبسيط الخطوات، تقليل حقول الإدخال، ورسائل طمأنة بالأمان خلال الدفع.",
        metrics: [
            { label: "Sales↑", value: 44, suffix: "%" },
            { label: "Drop-off↓", value: 37, suffix: "%" },
            { label: "AOV↑", value: 18, suffix: "%" },
        ],
        tags: ["Checkout UX", "Trust", "Friction Removal"],
        cover:
            "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop",
    },
    {
        title: "تفعيل المحتوى لنمو عضوي مستدام",
        sector: "خدمات مالية",
        duration: "3 أشهر",
        summary:
            "محاور محتوى عالية النية + صفحات هبوط متخصّصة + قياس دقيق للـ ROI.",
        metrics: [
            { label: "Organic↑", value: 3.1, suffix: "x" },
            { label: "Leads↑", value: 62, suffix: "%" },
            { label: "CPL↓", value: 28, suffix: "%" },
        ],
        tags: ["Content Strategy", "SEO", "Landing Pages"],
        cover:
            "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1600&auto=format&fit=crop",
    },
    {
        title: "تجربة مستخدم اختزلت وقت الإتمام 35%",
        sector: "منصّة تعليم",
        duration: "8 أسابيع",
        summary:
            "هيكلة تدفق التسجيل + نماذج ذكية + رسائل إرشاد دقيقة للحظات التردد.",
        metrics: [
            { label: "Completion↑", value: 35, suffix: "%" },
            { label: "Support↓", value: 22, suffix: "%" },
            { label: "NPS↑", value: 17, suffix: "pt" },
        ],
        tags: ["UX Writing", "Onboarding", "Forms"],
        cover:
            "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1600&auto=format&fit=crop",
    },
    {
        title: "توسّع إقليمي مع ثبات في التكاليف",
        sector: "FinTech",
        duration: "4 أشهر",
        summary:
            "قنوات اكتساب متوازنة + أتمتة تسويق + توحيد رسائل الهوية في السوق الجديد.",
        metrics: [
            { label: "Regions↑", value: 5, suffix: "" },
            { label: "CPA↓", value: 19, suffix: "%" },
            { label: "ARPU↑", value: 14, suffix: "%" },
        ],
        tags: ["Go-To-Market", "Automation", "Brand"],
        cover:
            "https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1600&auto=format&fit=crop",
    },
    {
        title: "تحسين الأداء خفّض زمن التحميل 48%",
        sector: "SaaS",
        duration: "5 أسابيع",
        summary:
            "تحسين الحِزم + كاش ذكي + مراقبة حية للأداء بأهداف رقمية واضحة.",
        metrics: [
            { label: "TTFB↓", value: 38, suffix: "%" },
            { label: "LCP↓", value: 41, suffix: "%" },
            { label: "CR↑", value: 12, suffix: "%" },
        ],
        tags: ["Performance", "DX", "Monitoring"],
        cover:
            "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop",
    },
];

export default function SuccessStories() {
    const N = CASES.length;
    const DUP = 3;
    const items = useMemo(
        () =>
            Array.from({ length: DUP }).flatMap((_, k) =>
                CASES.map((c, i) => ({ ...c, _g: k * N + i, _i: i }))
            ),
        [N]
    );

    const viewportRef = useRef(null);
    const trackRef = useRef(null);

    const [cursor, setCursor] = useState(N);
    const [activeIndex, setActiveIndex] = useState(0);

    const AUTOPLAY_MS = 2000;
    const [paused, setPaused] = useState(false);
    const autoRef = useRef();

    useEffect(() => {
        centerOn(N, "auto");
        const onResize = () => centerOn(cursor, "auto");
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        clearInterval(autoRef.current);
        if (!paused) autoRef.current = setInterval(() => step(1), AUTOPLAY_MS);
        return () => clearInterval(autoRef.current);
    }, [paused, cursor]);

    function wrapToMiddle(idx) {
        if (idx < N) idx += N;
        if (idx >= 2 * N) idx -= N;
        return idx;
    }

    function step(dir) {
        centerOn(cursor + dir, "smooth");
    }

    function centerOn(idx, behavior = "smooth") {
        const vp = viewportRef.current;
        const tr = trackRef.current;
        if (!vp || !tr) return;

        idx = wrapToMiddle(idx);
        const el = tr.querySelector(`[data-idx="${idx}"]`);
        if (!el) return;

        const target = el.offsetLeft - (vp.clientWidth - el.clientWidth) / 2;
        vp.scrollTo({ left: target, behavior });
        setCursor(idx);
        setActiveIndex(idx % N);
    }

    return (
        <section
            className="relative overflow-hidden bg-white py-16 md:py-20 text-slate-900"
            dir="rtl"
            style={{
                transform: "translateZ(0)",
                // خلفية أساسية ناعمة مائلة للأصفر الفاتح
                backgroundColor: "#FFFFF8",
                // خط علوي وسفلي بنفس اللون الفاتح
                borderTop: "1px solid #D9E56C",
                borderBottom: "1px solid #D9E56C",
            }}
        >
            {/* طبقة زخرفية بالخلفية الصفراء المخفّفة */}
            <div className="pointer-events-none absolute inset-0">
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: `
          radial-gradient(circle at 0% 0%, rgba(217,229,108,0.26), transparent 55%),
          radial-gradient(circle at 100% 100%, rgba(217,229,108,0.18), transparent 55%),
          linear-gradient(to right, rgba(217,229,108,0.10), transparent 30%, transparent 70%, rgba(217,229,108,0.10))
        `,
                        opacity: 0.9,
                        mixBlendMode: "multiply",
                    }}
                />
            </div>

            <div className="container relative z-10 mx-auto max-w-7xl px-6">
                <div className="mb-8 flex items-end justify-between gap-4">
                    {/* 👇 هنا لم ألمس أي كلاس — نفس ما عندك بالضبط */}
                    <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight">
                        قصص نجاح
                    </h2>
                    <img
                        src={successicon}
                        alt="أيقونة القسم"
                        className="h-11 w-11 md:h-14 md:w-14 object-contain"
                        loading="lazy"
                        decoding="async"
                    />
                </div>

                <div
                    className="relative"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                >
                    {/* أزرار التحكم — تركواز الهوية */}
                    <button
                        type="button"
                        aria-label="السابق"
                        onClick={() => step(-1)}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full border bg-white shadow hover:scale-105 transition"
                        style={{ borderColor: "rgba(0,84,103,.40)" }}
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M15 6l-6 6 6 6"
                                stroke="#005467"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>

                    <button
                        type="button"
                        aria-label="التالي"
                        onClick={() => step(1)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full border bg-white shadow hover:scale-105 transition"
                        style={{ borderColor: "rgba(0,84,103,.40)" }}
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M9 18l6-6-6-6"
                                stroke="#005467"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>

                    {/* الشريط */}
                    <div
                        ref={viewportRef}
                        className="relative -mx-6 px-6 overflow-x-auto overflow-y-visible select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                        style={{ minHeight: 560 }}
                    >
                        <div
                            ref={trackRef}
                            className="inline-flex gap-6 md:gap-8 pr-6 items-stretch"
                        >
                            {items.map((c, gIdx) => {
                                const isActive = gIdx % N === activeIndex;
                                return (
                                    <motion.div
                                        key={`card-${gIdx}`}
                                        data-idx={gIdx}
                                        animate={{
                                            scale: isActive ? 1.12 : 0.92,
                                            opacity: isActive ? 1 : 0.55,
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 260,
                                            damping: 28,
                                        }}
                                        style={{ willChange: "transform" }}
                                    >
                                        <Card data={c} />
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* المؤشرات */}
                <div className="mt-6 flex items-center justify-center gap-2">
                    {CASES.map((_, i) => {
                        const active = i === activeIndex;
                        return (
                            <span
                                key={`dot-${i}`}
                                className={[
                                    "inline-flex h-2.5 rounded-full transition-all",
                                    active ? "w-6" : "w-2.5",
                                ].join(" ")}
                                style={{ background: active ? "#005467" : "#CBD5E1" }}
                                aria-label={`Card ${i + 1}`}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

/* === بطاقة العرض — ألوان فقط للهوية الجديدة؛ لا تغيير هيكلي === */
function Card({ data }) {
    const { title, sector, duration, summary, metrics, tags, cover } = data;

    const CARD_H = 460;
    const CARD_W_SM = 340;
    const CARD_W_MD = 380;

    return (
        <article
            className="
        relative shrink-0 rounded-3xl
        border ring-1
        bg-white transition-transform duration-300 hover:-translate-y-1.5
      "
            style={{
                height: CARD_H,
                width: CARD_W_SM,
                borderColor: "rgba(0,84,103,.12)",
                boxShadow: "0 24px 70px -32px rgba(0,84,103,0.25)",
                backgroundImage:
                    "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(233,243,243,0.82))",
                outline: "none",
                WebkitTapHighlightColor: "transparent",
            }}
            dir="rtl"
        >
            <div className="hidden md:block" style={{ width: CARD_W_MD }} />

            {/* الغلاف */}
            <div
                className="relative w-full overflow-hidden"
                style={{ height: CARD_H * (1 / 3) }}
            >
                {cover ? (
                    <img
                        src={cover}
                        alt={title}
                        className="h-full w-full object-cover"
                        onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                ) : (
                    <div
                        className="h-full w-full"
                        style={{
                            background:
                                "linear-gradient(135deg, #F3F7F7 0%, #EAF3F3 45%, #E7EFEF 100%)",
                        }}
                    />
                )}

                {/* لمسة توهج تركواز/ليموني خفيفة */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(600px 260px at 85% 20%, rgba(0,84,103,0.22), transparent 55%)",
                    }}
                />
            </div>

            {/* المحتوى */}
            <div
                className="relative flex h.full flex-col p-6"
                style={{ height: CARD_H * (2 / 3) }}
            >
                <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-slate-600">
                    <span
                        className="inline-flex items-center gap-1 rounded-full px-2.5 py-1"
                        style={{
                            border: "1px solid rgba(0,84,103,.20)",
                            background: "#E9F3F3",
                            color: "#005467",
                        }}
                    >
                        {sector}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg.white px-2.5 py-1 text-slate-600">
                        {duration}
                    </span>
                </div>

                <h3 className="font-display text-lg md:text-xl font-bold leading-7 text-slate-900">
                    {title}
                </h3>

                <p className="mt-2 text-[15px] leading-7 text-slate-700">
                    {summary}
                </p>

                <div className="mt-3 grid grid-cols-3 gap-2">
                    {metrics?.map((m, idx) => (
                        <div
                            key={idx}
                            className="rounded-xl bg-white/80 p-3 text-center border"
                            style={{
                                borderColor: "rgba(0,84,103,.10)",
                                boxShadow:
                                    "inset 0 0 0 1px rgba(0,84,103,0.06), 0 6px 16px rgba(0,84,103,0.08)",
                            }}
                        >
                            <div
                                className="font-display text-base font-extrabold"
                                style={{ color: "#005467" }}
                                lang="en"
                            >
                                {Number(m.value).toLocaleString("en-US")}
                                <span className="ml-0.5 text-xs align-middle">
                                    {m.suffix}
                                </span>
                            </div>
                            <div className="mt-0.5 text-[11px] text-slate-500">
                                {m.label}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                    {tags?.map((t, i) => (
                        <span
                            key={i}
                            className="rounded-full border bg-white px-2.5 py-1 text-xs text-slate-600"
                            style={{ borderColor: "#e2e8f0" }}
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </div>

            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 hover:opacity-100"
                style={{
                    boxShadow:
                        "inset 0 0 0 1px rgba(0,84,103,0.12), inset 0 1px 26px rgba(0,84,103,0.12)",
                }}
            />
        </article>
    );
}
