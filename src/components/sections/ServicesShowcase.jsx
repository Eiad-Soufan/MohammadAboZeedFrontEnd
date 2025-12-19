// src/components/sections/ServicesShowcase.jsx
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import sericon from "../../assets/sericon.png"; // أيقونة قسم الإحصائيات

/**
 * ✅ المطلوب: رجوع “الدخول المتسلسل” (كرت وراء كرت) مع تكرار الحركة في كل مرة يظهر القسم،
 *   وبدون رجفان عند عتبة الشاشة.
 *
 * كيف عملناها؟
 * - جعلنا التتالي (stagger) يتم على مستوى الحاوية (الـ grid) عبر Variants مع staggerChildren.
 * - نستخدم مراقب رؤية "مستقر" للقسم ككل (هستَرِسِس بسيط + rootMargin و threshold)،
 *   ثم نفعّل animate على الحاوية: animate={visible ? "show" : "hide"}.
 * - البطاقات نفسها مجرد أطفال للـgrid وتطبق hide/show، فيدخلوا متسلسلين ويخرجوا متسلسلين.
 * - أبقينا هوفر البطاقة على الطبقة الداخلية فقط (بدون تحريك عنصر الحركة) لعدم حدوث اهتزاز.
 */

const BRAND = "#1A43BF";
const BORDER_SOFT = "1px solid rgba(2,6,23,.06)";

/* صور أونلاين افتراضية */
const ONLINE_IMAGES = {
    program:
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1600&q=80",
    identity:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80",
    free:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80",
};

/* ───────────── Stable Section In-View ─────────────
   رؤية مستقرة للقسم: تمنع “الرفرفة” قرب العتبة وتعيد التحريك عند كل دخول/خروج.
*/
function useStableSectionInView(
    ref,
    {
        threshold = 0.22,
        rootMargin = "-12% 0px -12% 0px",
        enterDelay = 40,
        exitDelay = 60,
    } = {}
) {
    const [visible, setVisible] = useState(false);
    const toRef = useRef();

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            (entries) => {
                for (const e of entries) {
                    clearTimeout(toRef.current);
                    if (e.isIntersecting) {
                        toRef.current = setTimeout(() => setVisible(true), enterDelay);
                    } else {
                        toRef.current = setTimeout(() => setVisible(false), exitDelay);
                    }
                }
            },
            { threshold, rootMargin }
        );
        io.observe(el);
        return () => {
            clearTimeout(toRef.current);
            io.disconnect();
        };
    }, [ref, threshold, rootMargin, enterDelay, exitDelay]);

    return visible;
}

/* ───────────── Variants للحاوية والبطاقات ───────────── */
const gridVariants = {
    hide: {
        // مافي تغييرات على الحاوية نفسها — كل الشغل على الأطفال
        transition: {
            when: "afterChildren",
            staggerChildren: 0.08,
            staggerDirection: -1, // الخروج بالعكس يعطي احساس ناعم
        },
    },
    show: {
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.12, // ✅ دخول متسلسل “كرت وراء كرت”
            staggerDirection: 1,
        },
    },
};

const cardVariants = {
    hide: {
        opacity: 0,
        y: 16,
        scale: 0.965,
        filter: "blur(6px)",
        transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
    },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            type: "spring",
            stiffness: 220,
            damping: 26,
            mass: 0.7,
            restSpeed: 0.01,
            restDelta: 0.01,
        },
    },
};

// أضف هذا المساعد لاختيار أجمل تدرّج حسب التاغ
const badgeStyle = (tag = "") => {
    const t = String(tag).trim();
    // خريطة الألوان:
    // "جديد"  → أخضر زمردي
    // "حصري"  → أحمر وردي فاخر
    // "مجاني" → أصفر عنبري (نستخدم نص داكن لقراءة أعلى)
    if (t === "جديد") {
        return {
            background: "linear-gradient(135deg, #10B981 0%, #34D399 100%)", // emerald
            color: "#fff",
            boxShadow: "0 6px 18px -6px rgba(16,185,129,.45)",
        };
    }
    if (t === "حصري") {
        return {
            background: "linear-gradient(135deg, #E11D48 0%, #F43F5E 100%)", // rose
            color: "#fff",
            boxShadow: "0 6px 18px -6px rgba(225,29,72,.45)",
        };
    }
    if (t === "مجاني") {
        return {
            background: "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)", // amber
            color: "#fff",
            boxShadow: "0 6px 18px -6px rgba(245,158,11,.45)",
        };
    }
    // افتراضي: هوية البراند (أزرق)
    return {
        background: "linear-gradient(135deg, #1A43BF 0%, #4E73F2 100%)",
        color: "#fff",
        boxShadow: "0 6px 18px -6px rgba(26,67,191,.45)",
    };
};

/* ───────────── بطاقة الخدمة ───────────── */
function ServiceCard({ item }) {
    // Tilt 3D هادئ على الطبقة الداخلية فقط — لا يمس عنصر الحركة (motion.article)
    const onMove = (e) => {
        const el = e.currentTarget;
        const r = el.getBoundingClientRect();
        const cx = (e.clientX - r.left) / r.width - 0.5;
        const cy = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty("--rx", `${-(cy * 6)}deg`);
        el.style.setProperty("--ry", `${cx * 8}deg`);
    };
    const onLeave = (e) => {
        const el = e.currentTarget;
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
    };

    return (
        <motion.article
            className="relative will-change-transform"
            style={{ zIndex: 0, transform: "translateZ(0)" }} // استقرار لمنع أي flicker
            variants={cardVariants}
        >
            {/* إطار ناعم */}
            <div
                className="rounded-2xl p-[1px]"
                style={{
                    background:
                        "linear-gradient(135deg, rgba(26,67,191,.16), rgba(103,138,247,.16))",
                    boxShadow: "0 24px 90px -48px rgba(23,53,155,.22)",
                }}
            >
                {/* البطاقة الداخلية — عليها الهوفر فقط */}
                <div
                    className="relative rounded-2xl bg-white overflow-hidden"
                    style={{
                        border: BORDER_SOFT,
                        transform:
                            "perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
                        transition: "transform .25s ease, box-shadow .35s ease",
                    }}
                    onMouseMove={onMove}
                    onMouseLeave={onLeave}
                >
                    {/* صورة + sheen */}
                    <div className="relative h-48 overflow-hidden">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="absolute inset-0 h-full w-full object-cover will-change-transform"
                            loading="lazy"
                            decoding="async"
                        />
                        <span
                            className="pointer-events-none absolute inset-0 translate-x-[-130%] bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0"
                            style={{ mixBlendMode: "overlay" }}
                        />
                        <style>{`
              .relative.rounded-2xl.bg-white.overflow-hidden:hover > .relative.h-48.overflow-hidden > span {
                opacity: 1;
                transform: translateX(130%);
                transition: transform .9s cubic-bezier(.2,.7,.2,1), opacity .3s ease;
              }
            `}</style>

                        {item.badge && (
                            <div
                                className="absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-bold shadow"
                                style={badgeStyle(item.badge)}
                            >
                                {item.badge}
                            </div>
                        )}
                    </div>

                    {/* المحتوى */}
                    <div className="p-4" dir="rtl">
                        <div className="mb-1 text-[13px] font-semibold text-slate-500">
                            {item.category}
                        </div>
                        <h3 className="text-lg font-extrabold leading-snug text-slate-900">
                            {item.title}
                        </h3>
                        <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                            {item.desc}
                        </p>

                        <div className="mt-4 flex items-center justify-between">
                            <a
                                href={item.href || "#"}
                                className="rounded-full bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
                            >
                                {item.cta || "التفاصيل"}
                            </a>
                            <div
                                className="pointer-events-none h-8 w-8 rounded-full opacity-0 blur-[6px] transition-opacity duration-300 group-hover:opacity-100"
                                style={{ background: "rgba(103,138,247,.42)" }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* هوفر رفع خفيف على الطبقة الداخلية فقط */}
            <style>{`
        .relative.rounded-2xl.bg-white.overflow-hidden:hover{
          transform: perspective(900px) translateY(-12px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));
          box-shadow: 0 38px 110px -52px rgba(26,67,191,.28);
        }
        @media (prefers-reduced-motion: reduce){
          .relative.rounded-2xl.bg-white.overflow-hidden:hover{
            transform: none;
            box-shadow: 0 14px 40px -24px rgba(26,67,191,.18);
          }
        }
      `}</style>
        </motion.article>
    );
}

/* ───────────── القسم ───────────── */
export default function ServicesShowcase({
    title = "أفضل خدماتنا",
    items = DEFAULT_ITEMS,
}) {
    const sectionRef = useRef(null);
    const visible = useStableSectionInView(sectionRef, {
        threshold: 0.22,
        rootMargin: "-12% 0px -12% 0px",
        enterDelay: 40,
        exitDelay: 70,
    });

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden py-16 md:py-20 text-slate-900"
            dir="rtl"
            style={{
                transform: "translateZ(0)",
                // خلفية أساسية ناعمة تميل للأصفر الفاتح
                backgroundColor: "#FFFFF8",
                // خط علوي وسفلي بنفس اللون المستخرج
                borderTop: "1px solid #D9E56C",
                borderBottom: "1px solid #D9E56C",
            }}
        >
            {/* طبقة زخرفية للخلفية باللون الأصفر المستخرج */}
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

                {/* العنوان */}
                <div className="mb-10 flex items-end justify-between gap-4">

                    <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight">
                        {title}
                    </h2>
                    <img
                        src={sericon}
                        alt="أيقونة القسم"
                        className="h-11 w-11 md:h-14 md:w-14 object-contain"
                        loading="lazy"
                        decoding="async"
                    />

                </div>

                {/* ✅ الحاوية المتحركة — هي التي تُحدث التتالي (stagger) للأبناء */}
                <motion.div
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    variants={gridVariants}
                    initial="hide"
                    animate={visible ? "show" : "hide"}
                >
                    {items.map((it, i) => (
                        <ServiceCard key={i} item={it} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

/* بيانات افتراضية */
const DEFAULT_ITEMS = [
    {
        title: "برنامج احترافي",
        category: "كورسات",
        badge: "حصري",
        desc: "برنامج متكامل لرفع جودة الأداء وتوسيع الأثر.",
        image: ONLINE_IMAGES.program,
        href: "/products/tools",
        cta: "انضم الآن",
    },
    {
        title: "كورس جديد: بناء الهوية",
        category: "كورسات",
        badge: "جديد",
        desc: "أسلوب عملي لصناعة هوية قوية للأعمال.",
        image: ONLINE_IMAGES.identity,
        href: "/courses/recorded",
        cta: "شاهد التفاصيل",
    },
    {
        title: "خدمة مجانية: جلسة تعريفية",
        category: "خدمات",
        badge: "مجاني",
        desc: "جلسة تمهيدية للتعرّف على المنهجية وتحديد المسار المناسب.",
        image: ONLINE_IMAGES.free,
        href: "/consult",
        cta: "احجز الآن",
    },
];
