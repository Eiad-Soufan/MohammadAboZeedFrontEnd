// src/pages/Tools.jsx
import { motion } from "framer-motion";
import {
    AlertCircle,
    ChevronLeft,
    ChevronRight,
    ExternalLink,
    Search,
    Sparkles,
    Star
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { CardActionButton, GhostButton } from "../components/ui/Button";
import { api } from "../lib/api";

import { COLORS } from "../lib/theme";

const { BRAND, ACCENT, LIME, INK } = COLORS;


// =============================
// Helpers (no arbitrary values)
// =============================
const shimmer = "animate-pulse bg-slate-100 dark:bg-slate-800";

function useDebounced(value, delay) {
    const [v, setV] = useState(value);
    useEffect(function () {
        const id = setTimeout(function () {
            setV(value);
        }, delay || 400);
        return function () {
            clearTimeout(id);
        };
    }, [value, delay]);
    return v;
}

function CardSkeleton() {
    return (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-gray-900/60 shadow-sm overflow-hidden">
            <div className={shimmer} style={{ width: "100%", paddingTop: "62.5%" }} />
            <div className="p-4 space-y-3">
                <div className={"h-5 w-3/4 rounded " + shimmer} />
                <div className={"h-4 w-1/2 rounded " + shimmer} />
                <div className={"h-4 w-full rounded " + shimmer} />
                <div className={"h-4 w-5/6 rounded " + shimmer} />
                <div className="flex gap-2 pt-2">
                    <div className={"h-9 w-24 rounded-xl " + shimmer} />
                    <div className={"h-9 w-24 rounded-xl " + shimmer} />
                </div>
            </div>
        </div>
    );
}

function EmptyState(props) {
    var message = props && props.message ? props.message : "لا توجد نتائج";
    return (
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-gray-900/60 p-8 text-center">
            <AlertCircle className="mx-auto h-8 w-8 text-slate-400" />
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{message}</p>
        </div>
    );
}

// =============================
// Main Page
// =============================
export default function Tools() {
    // UI state
    const [q, setQ] = useState("");
    const dq = useDebounced(q, 380);
    const [featured, setFeatured] = useState(false);

    // Data state
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(12);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // fetcher
    async function load(p) {
        var current = p || page;
        setLoading(true);
        setError("");
        try {
            var params = new URLSearchParams();
            params.set("page", String(current));
            params.set("page_size", String(pageSize));
            if (dq) params.set("q", dq);
            if (featured) params.set("featured", "1");
            var resp = await api.get("/api/tools/?" + params.toString());
            var data = resp && resp.data ? resp.data : {};
            setItems(Array.isArray(data.results) ? data.results : []);
            setCount(Number(data.count || 0));
        } catch (e) {
            setError("تعذّر تحميل الأدوات حالياً.");
            setItems([]);
            setCount(0);
        } finally {
            setLoading(false);
        }
    }

    // Effects
    useEffect(function () {
        setPage(1);
    }, [dq, featured]);

    useEffect(function () {
        load(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dq, featured]);

    useEffect(function () {
        load(page);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const totalPages = useMemo(function () {
        return Math.max(1, Math.ceil((count || 0) / pageSize));
    }, [count, pageSize]);

    // Motion variants
    const containerV = {
        hidden: { opacity: 0, y: 18 },
        show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06, delayChildren: 0.06 } },
    };
    const cardV = {
        hidden: { opacity: 0, y: 16, scale: 0.98 },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: "spring", stiffness: 120, damping: 14 },
        },
    };

    return (
        <div
            dir="rtl"
            className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white dark:from-gray-950 dark:via-gray-950 dark:to-gray-950"
        >
            {/* Top Section / Heading */}
            <section className="relative overflow-hidden">
                {/* ✅ استبدال بقع الخلفية بالألوان الجديدة */}
                <div className="absolute inset-0 pointer-events-none">
                    <div
                        className="absolute -top-24 -left-24 h-96 w-96 rounded-full blur-3xl"
                        style={{ background: `${BRAND}22` }}
                    />
                    <div
                        className="absolute -bottom-20 -right-24 h-80 w-80 rounded-full blur-3xl"
                        style={{ background: `${ACCENT}33` }}
                    />
                </div>

                <div className="container mx-auto px-6 pt-16 sm:pt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/50 px-3 py-1 text-xs text-slate-700 backdrop-blur"
                    >
                        <Sparkles className="h-4 w-4" style={{ color: BRAND }} />
                        <span>مجموعة أدوات عمل موثوقة</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.05 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900"
                    >
                        الأدوات
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.1 }}
                        className="mt-2 max-w-2xl text-sm sm:text-base text-slate-700"
                    >
                        أدوات إنتاجية وتصميم وتطوير نستخدمها وننصح بها لرفع جودة العمل وتسريع الإنجاز.
                    </motion.p>

                    {/* Controls */}
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.14 }}
                        className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
                    >
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                            <input
                                type="text"
                                value={q}
                                onChange={function (e) {
                                    setQ(e.target.value);
                                }}
                                placeholder="ابحث باسم الأداة أو الوصف"
                                className="w-full rounded-2xl border border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400 pr-9 pl-3 py-3 outline-none focus:ring-2"
                                // حلقة تركيز بلون الهوية
                                style={{ boxShadow: `0 0 0 0 ${BRAND}00` }}
                                onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px ${BRAND}44`)}
                                onBlur={(e) => (e.currentTarget.style.boxShadow = `0 0 0 0 ${BRAND}00`)}
                            />
                        </div>
                        {/* Featured toggle */}
                        <GhostButton
                            onClick={function () {
                                setFeatured(function (v) {
                                    return !v;
                                });
                            }}
                            className={"h-[46px] !px-4 " + (featured ? "!bg-white !text-slate-900" : "!bg-white/80")}
                            style={{ borderColor: `${BRAND}22` }}
                        >
                            <Star className={"h-4 w-4 " + (featured ? "" : "text-slate-500")} style={{ color: featured ? ACCENT : undefined }} />
                            {featured ? "المميّزة" : "كل الأدوات"}
                        </GhostButton>
                    </motion.div>
                </div>
            </section>

            {/* Grid */}
            <section className="container mx-auto px-6 py-10 sm:py-14">
                {error ? <EmptyState message={error} /> : null}

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map(function (_, i) {
                            return <CardSkeleton key={i} />;
                        })}
                    </div>
                ) : items.length === 0 ? (
                    <EmptyState message="لا توجد أدوات مطابقة لبحثك" />
                ) : (
                    <motion.div variants={containerV} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.map(function (t) {
                            return (
                                <motion.article
                                    key={t.id}
                                    variants={cardV}
                                    whileHover={{ y: -6 }}
                                    className="group h-full flex flex-col rounded-2xl border bg-white/90 shadow-md overflow-hidden"
                                    style={{
                                        borderColor: "rgba(2,6,23,.08)",
                                        // رينغ خفيف جدًا بلون الهوية (يظهر كـ sheen عند الهوفر)
                                        boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.02)",
                                    }}
                                >
                                    {/* الغلاف مع الحفاظ على صورة كل أداة */}
                                    <div className="relative w-full overflow-hidden" style={{ position: "relative", paddingTop: "62.5%" }}>
                                        {t.image_url ? (
                                            <img
                                                src={t.image_url}
                                                alt={t.name}
                                                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                                loading="lazy"
                                                decoding="async"
                                            />
                                        ) : null}
                                        {t.is_featured ? (
                                            <div
                                                className="absolute top-3 left-3 rounded-full text-xs font-bold px-2.5 py-1 shadow"
                                                // ✅ badge بالألوان الجديدة
                                                style={{ background: ACCENT, color: "#002b33" }}
                                            >
                                                مميّز
                                            </div>
                                        ) : null}
                                    </div>

                                    <div className="p-4 flex flex-col h-full">
                                        <h3 className="text-lg font-extrabold text-slate-900 line-clamp-2">{t.name}</h3>
                                        <p className="mt-2 text-sm text-slate-700 line-clamp-3">{t.description}</p>

                                        <div className="mt-auto pt-4 flex items-center gap-2">
                                            {t.link_url ? (
                                                <a href={t.link_url} target="_blank" rel="noreferrer" className="flex-1">

                                                    <CardActionButton>
                                                        <ExternalLink className="h-4 w-4" />
                                                        زيارة الموقع
                                                    </CardActionButton>
                                                </a>
                                            ) : (
                                                <div className="flex-1">
                                                    <GhostButton className="w-full" disabled>
                                                        غير متاح
                                                    </GhostButton>
                                                </div>
                                            )}
                                            {/* 
                                            <div className="flex-1">
                                                <GhostButton className="w-full" style={{ borderColor: `${BRAND}22` }}>
                                                    <Wrench className="h-4 w-4" style={{ color: BRAND }} />
                                                    تفاصيل لاحقاً
                                                </GhostButton>
                                            </div> */}
                                        </div>
                                    </div>

                                    {/* توهج حافة عند الهوفر بنفس ألوان الهوية */}
                                    <div
                                        aria-hidden="true"
                                        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                        style={{
                                            boxShadow: `inset 0 0 0 1px ${BRAND}1f, inset 0 1px 26px ${BRAND}1f`,
                                        }}
                                    />
                                </motion.article>
                            );
                        })}
                    </motion.div>
                )}

                {/* Pagination */}
                {count > pageSize ? (
                    <div className="mt-10 flex items-center justify-center gap-2">
                        <GhostButton
                            onClick={function () {
                                setPage(function (p) {
                                    return Math.max(1, p - 1);
                                });
                            }}
                            disabled={page === 1}
                            style={{ borderColor: `${BRAND}22` }}
                        >
                            <ChevronRight className="h-4 w-4" style={{ color: BRAND }} />
                            السابق
                        </GhostButton>
                        <span className="inline-flex items-center gap-2 text-sm text-slate-700">
                            صفحة <b className="px-1">{page}</b> من <b className="px-1">{totalPages}</b>
                        </span>
                        <GhostButton
                            onClick={function () {
                                setPage(function (p) {
                                    return Math.min(totalPages, p + 1);
                                });
                            }}
                            disabled={page === totalPages}
                            style={{ borderColor: `${BRAND}22` }}
                        >
                            التالي
                            <ChevronLeft className="h-4 w-4" style={{ color: BRAND }} />
                        </GhostButton>
                    </div>
                ) : null}
            </section>
        </div>
    );
}
