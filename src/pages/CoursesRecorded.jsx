// src/pages/CoursesRecorded.jsx
import { motion } from "framer-motion";
import { AlertCircle, PlayCircle, Search, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CardActionButton, GhostButton } from "../components/ui/Button";
import { api } from "../lib/api";

// ألوان الهوية
const BRAND = "#005467";        // أساسي
const BRAND_DARK = "#004452";   // درجة أدكن للتدرّج
const ACCENT = "#CDDC2D";       // تمييز لطيف
const INK = "#414042";          // للنصوص الداكنة

// ====== Variants للدخول المتدرّج ======
const gridVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 14, scale: 0.98 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.45, ease: [0.22, 0.65, 0.25, 0.95] },
    },
};

function CardSkeleton() {
    return (
        <div
            className="rounded-3xl border border-slate-200 bg-white/90 shadow-md overflow-hidden animate-pulse"
        >
            <div className="aspect-[16/10] bg-slate-200" />
            <div className="p-4 space-y-2">
                <div className="h-4 w-2/3 bg-slate-200 rounded" />
                <div className="h-3 w-full bg-slate-200 rounded" />
                <div className="h-3 w-4/5 bg-slate-200 rounded" />
            </div>
        </div>
    );
}

function CourseCard({ c }) {
    return (
        <motion.article
            variants={cardVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            whileHover={{ y: -6 }}
            whileTap={{ y: -1 }}
            transition={{ type: "spring", stiffness: 320, damping: 24, mass: 0.6 }}
            className="group h-full flex flex-col rounded-3xl border border-slate-200 bg-white/90 shadow-md overflow-hidden focus-within:shadow-lg"
        >
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/10" }}>
                {c.image_url ? (
                    <motion.img
                        src={c.image_url}
                        alt={c.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5, ease: [0.22, 0.65, 0.25, 0.95] }}
                        loading="lazy"
                    />
                ) : (
                    <div className="h-full w-full flex items-center justify-center text-xs text-slate-400 bg-slate-100">
                        بدون صورة
                    </div>
                )}

                {/* لمسة تدرّج خفيفة من الأسفل */}
                <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-20"
                    style={{
                        background: "linear-gradient(to top, rgba(0,84,103,0.18), transparent)",
                    }}
                />
            </div>

            <div className="p-4 flex flex-col h-full">
                <h3 className="text-lg font-extrabold text-slate-900 line-clamp-2">
                    {c.title}
                </h3>
                {c.summary ? (
                    <p className="mt-2 text-sm text-slate-700 line-clamp-3">
                        {c.summary}
                    </p>
                ) : null}

                <div className="mt-4 pt-2 flex items-center gap-2 mt-auto">
                    <Link
                        to={`/courses/recorded/${c.slug || c.id}`}
                        className="flex-1"
                    >
                        <CardActionButton>
                            <PlayCircle className="h-4 w-4" />
                            تفاصيل الدورة
                        </CardActionButton>
                    </Link>
                </div>

            </div>
        </motion.article>
    );
}

function Pagination({ page, pageCount, onPage }) {
    if (pageCount <= 1) return null;
    const canPrev = page > 1;
    const canNext = page < pageCount;
    return (
        <div className="mt-8 flex items-center justify-center gap-2" style={{ direction: "rtl" }}>
            <GhostButton disabled={!canPrev} onClick={() => onPage(page - 1)}>
                السابق
            </GhostButton>
            <span className="text-sm text-slate-600 px-2">
                صفحة {page} من {pageCount}
            </span>
            <GhostButton disabled={!canNext} onClick={() => onPage(page + 1)}>
                التالي
            </GhostButton>
        </div>
    );
}

export default function CoursesRecorded() {
    const [params, setParams] = useSearchParams();
    const pageParam = parseInt(params.get("page") || "1", 10);
    const queryParam = params.get("q") || "";
    const featuredParam = params.get("featured") || "";

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    const [page, setPage] = useState(pageParam);
    const [pageSize] = useState(12);
    const [total, setTotal] = useState(0);
    // حقل البحث (متحكم به) + نسخة مؤجلة للاستخدام مع API
    const [q, setQ] = useState(queryParam);
    const [debouncedQ, setDebouncedQ] = useState(queryParam);

    const pageCount = useMemo(
        () => Math.max(1, Math.ceil(total / pageSize)),
        [total, pageSize]
    );

    const applySearchParams = ({ page, q, featured }) => {
        const next = new URLSearchParams();
        next.set("page", String(page || 1));
        if (q) next.set("q", q);
        if (featured) next.set("featured", "1");
        setParams(next, { replace: true });
    };
    useEffect(() => {
        const id = setTimeout(() => {
            const clean = q.trim();
            setDebouncedQ(clean);
            // نرجع دائماً لأول صفحة عند تغيير البحث
            setPage(1);
            applySearchParams({
                page: 1,
                q: clean,
                featured: featuredParam === "1",
            });
        }, 400); // 400ms مثل سلوك "يبحث أثناء الكتابة"

        return () => clearTimeout(id);
        // ما نحط applySearchParams في deps حتى ما يدخل في دوامة
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [q, featuredParam]);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                setLoading(true);
                setErr("");
                const { data } = await api.get("/api/courses/recorded/", {
                    params: {
                        page,
                        page_size: pageSize,
                        q: debouncedQ || undefined,
                        featured: featuredParam === "1" ? 1 : undefined,
                    },
                });
                if (!mounted) return;
                setList(Array.isArray(data?.results) ? data.results : []);
                setTotal(typeof data?.count === "number" ? data.count : 0);
            } catch (e) {
                if (!mounted) return;
                setErr("تعذّر تحميل الدورات المسجّلة الآن.");
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => {
            mounted = false;
        };
    }, [page, pageSize, debouncedQ, featuredParam]);




    const onToggleFeatured = () => {
        setPage(1);
        const willBe = featuredParam !== "1";
        applySearchParams({ page: 1, q: debouncedQ, featured: willBe });
    };


    const onPageChange = (p) => {
        setPage(p);
        applySearchParams({ page: p, q: queryParam, featured: featuredParam === "1" });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="min-h-screen bg-slate-50/60">
            {/* الهيرو الموحّد مع باقي الصفحات */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                        aria-hidden
                        className="absolute -top-24 -left-24 h-96 w-96 rounded-full blur-3xl"
                        style={{ background: "rgba(0,84,103,0.16)" }}
                        initial={{ x: -30, y: -30, scale: 0.95, opacity: 0.85 }}
                        animate={{
                            x: [-30, 20, -10, -30],
                            y: [-30, -10, 10, -30],
                            scale: [0.95, 1, 0.98, 0.95],
                            opacity: [0.85, 1, 0.9, 0.85],
                        }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        aria-hidden
                        className="absolute -bottom-20 -right-24 h-80 w-80 rounded-full blur-3xl"
                        style={{ background: "rgba(205,220,45,0.12)" }}
                        initial={{ x: 30, y: 30, scale: 1.05, opacity: 0.7 }}
                        animate={{
                            x: [30, -10, 10, 30],
                            y: [30, 10, -10, 30],
                            scale: [1.05, 0.98, 1.02, 1.05],
                            opacity: [0.7, 0.9, 0.8, 0.7],
                        }}
                        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>

                <div className="container mx-auto px-6 pt-16 sm:pt-20 pb-8 sm:pb-10 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55 }}
                        className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/60 px-3 py-1 text-xs backdrop-blur"
                        style={{ color: INK }}
                    >
                        <Sparkles className="h-4 w-4" />
                        <span>الدورات المسجّلة</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight md:leading-snug py-1"
                        style={{
                            backgroundImage: `linear-gradient(180deg, ${BRAND}, ${BRAND} 62%, ${BRAND_DARK})`,
                            WebkitBackgroundClip: "text",
                            color: "transparent",
                        }}
                    >
                        تعلّم بالوتيرة التي تناسبك
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, delay: 0.05 }}
                        className="mt-3 max-w-xl text-sm sm:text-base"
                        style={{ color: INK }}
                    >
                        استكشف مكتبة الدورات المسجّلة الجاهزة للمشاهدة في أي وقت، مع إمكانية البحث عن الدورة المناسبة أو التركيز
                        على الدورات المميّزة فقط.
                    </motion.p>

                    {/* أدوات البحث والتصفية */}
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.1 }}
                        className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
                    >
                        <div className="flex flex-col sm:flex-row gap-3 flex-1">
                            <div className="relative flex-1">
                                <Search className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                                <input
                                    value={q}
                                    onChange={(e) => setQ(e.target.value)}
                                    placeholder="ابحث بعنوان الدورة أو الكلمات المفتاحية"
                                    className="w-full rounded-2xl border border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400 pr-9 pl-3 py-3 outline-none focus:ring-2"
                                    style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,.9)" }}
                                />
                            </div>
                        </div>

                        <GhostButton
                            type="button"
                            onClick={onToggleFeatured}
                            className="sm:w-auto"
                        >
                            {featuredParam === "1" ? "عرض كل الدورات" : "الدورات المميّزة فقط"}
                        </GhostButton>
                    </motion.div>

                </div>
            </section>

            {/* محتوى النتائج */}
            <section className="py-8 sm:py-10">
                <div className="container mx-auto px-6">
                    {err ? (
                        <div
                            className="mt-4 rounded-2xl border bg-white p-4 sm:p-6 shadow-sm text-red-600 flex items-start gap-3"
                            style={{ borderColor: "rgba(2,6,23,.06)" }}
                        >
                            <AlertCircle className="h-5 w-5 mt-0.5" />
                            <p className="text-sm sm:text-base">{err}</p>
                        </div>
                    ) : loading ? (
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <CardSkeleton key={i} />
                            ))}
                        </div>
                    ) : list.length === 0 ? (
                        <div
                            className="mt-8 rounded-2xl border bg-white p-6 shadow-sm text-slate-700"
                            style={{ borderColor: "rgba(2,6,23,.06)" }}
                        >
                            لا توجد نتائج مطابقة.
                        </div>
                    ) : (
                        <>
                            <motion.div
                                variants={gridVariants}
                                initial="hidden"
                                animate="show"
                                className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {list.map((c) => (
                                    <CourseCard key={c.id} c={c} />
                                ))}
                            </motion.div>
                            <Pagination page={page} pageCount={pageCount} onPage={onPageChange} />
                        </>
                    )}
                </div>
            </section>
        </div>
    );
}
