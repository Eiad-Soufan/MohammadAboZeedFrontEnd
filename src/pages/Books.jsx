// src/pages/Books.jsx
import { motion } from "framer-motion";
import {
    AlertCircle,
    BookOpen,
    ChevronLeft,
    ChevronRight,
    Search,
    Sparkles,
    Star,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CardActionButton, GhostButton } from "../components/ui/Button";
import { api } from "../lib/api";

import { COLORS } from "../lib/theme";

const { BRAND, ACCENT: LIME, INK } = COLORS;


const shimmer = "animate-pulse bg-slate-100 dark:bg-slate-800";

function useDebounced(value, delay = 400) {
    const [v, setV] = useState(value);
    useEffect(() => { const id = setTimeout(() => setV(value), delay); return () => clearTimeout(id); }, [value, delay]);
    return v;
}

function CardSkeleton() {
    return (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-gray-900/60 shadow-sm overflow-hidden">
            <div className={`${shimmer}`} style={{ width: "100%", aspectRatio: "16/10" }} />
            <div className="p-4 space-y-3">
                <div className={`h-5 w-3/4 rounded ${shimmer}`} />
                <div className={`h-4 w-1/2 rounded ${shimmer}`} />
                <div className={`h-4 w-full rounded ${shimmer}`} />
                <div className={`h-4 w-5/6 rounded ${shimmer}`} />
                <div className="flex gap-2 pt-2">
                    <div className={`h-9 w-24 rounded-xl ${shimmer}`} />
                    <div className={`h-9 w-24 rounded-xl ${shimmer}`} />
                </div>
            </div>
        </div>
    );
}

function EmptyState({ message = "لا توجد نتائج" }) {
    return (
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-gray-900/60 p-8 text-center">
            <AlertCircle className="mx-auto h-8 w-8 text-slate-400" />
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{message}</p>
        </div>
    );
}

export default function Books() {
    const [q, setQ] = useState("");
    const dq = useDebounced(q, 380);
    const [featured, setFeatured] = useState(false);

    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(12);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function load(p = page) {
        setLoading(true); setError("");
        try {
            const params = new URLSearchParams();
            params.set("page", String(p));
            params.set("page_size", String(pageSize));
            if (dq) params.set("q", dq);
            if (featured) params.set("featured", "1");
            const { data } = await api.get(`/api/books/?${params.toString()}`);
            setItems(Array.isArray(data?.results) ? data.results : []);
            setCount(Number(data?.count ?? 0));
        } catch {
            setError("تعذّر تحميل الكتب حالياً."); setItems([]); setCount(0);
        } finally { setLoading(false); }
    }

    useEffect(() => { setPage(1); }, [dq, featured]);
    useEffect(() => { load(1); /* eslint-disable-next-line */ }, [dq, featured]);
    useEffect(() => { load(page); /* eslint-disable-next-line */ }, [page]);

    const totalPages = useMemo(() => Math.max(1, Math.ceil(count / pageSize)), [count, pageSize]);

    const containerV = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06, delayChildren: 0.06 } } };
    const cardV = { hidden: { opacity: 0, y: 16, scale: 0.98 }, show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 120, damping: 14 } } };

    return (
        <div dir="rtl" className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white dark:from-gray-950 dark:via-gray-950 dark:to-gray-950">
            {/* HERO */}
            <section className="relative overflow-hidden">
                {/* Blobs بألوان الهوية */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full blur-3xl" style={{ background: "rgba(0,84,103,0.16)" }} />
                    <div className="absolute -bottom-20 -right-24 h-80 w-80 rounded-full blur-3xl" style={{ background: "rgba(205,220,45,0.12)" }} />
                </div>

                <div className="container mx-auto px-6 pt-16 sm:pt-20">
                    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                        className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/60 px-3 py-1 text-xs backdrop-blur"
                        style={{ color: INK }}>
                        <Sparkles className="h-4 w-4" />
                        <span>مكتبة معرفية مختارة بعناية</span>
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight md:leading-snug py-1"
                        style={{ backgroundImage: `linear-gradient(180deg, ${BRAND} 0%, ${BRAND} 65%, #004452 100%)`, WebkitBackgroundClip: "text", color: "transparent" }}>
                        الكتب
                    </motion.h1>

                    <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }}
                        className="mt-2 max-w-2xl text-sm sm:text-base text-slate-700">
                        باقة من الكتب التقنية والإدارية التي ننصح بها لبناء أساس قوي ورؤية عملية حديثة.
                    </motion.p>

                    {/* Controls */}
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.14 }}
                        className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                            <input
                                type="text" value={q} onChange={(e) => setQ(e.target.value)} placeholder="ابحث عن عنوان أو مؤلف…"
                                className="w-full rounded-2xl border border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400 pr-9 pl-3 py-3 outline-none focus:ring-2"
                                style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,.9)" }}
                            />
                        </div>

                        {/* Featured toggle */}
                        <GhostButton
                            onClick={() => setFeatured((v) => !v)}
                            className={`h-[46px] !px-4 border !border-[${BRAND}] !text-[${BRAND}] hover:!bg-[${BRAND}] hover:!text-white`}
                        >
                            <Star className="h-4 w-4" />
                            {featured ? "المميّزة" : "كل الكتب"}
                        </GhostButton>
                    </motion.div>
                </div>
            </section>

            {/* Grid */}
            <section className="container mx-auto px-6 py-10 sm:py-14">
                {error && <EmptyState message={error} />}

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
                    </div>
                ) : items.length === 0 ? (
                    <EmptyState message="لا توجد كتب مطابقة لبحثك" />
                ) : (
                    <motion.div variants={containerV} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.map((b) => (
                            <motion.article key={b.id} variants={cardV} whileHover={{ y: -6 }}
                                className="group h-full flex flex-col rounded-2xl border border-slate-200 bg-white/90 shadow-md overflow-hidden">
                                <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/10" }}>
                                    <img src={b.cover_url} alt={b.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                                    {b.is_featured && (
                                        <div className="absolute top-3 left-3 rounded-full px-2.5 py-1 text-xs font-bold shadow"
                                            style={{ background: LIME, color: "#141414" }}>
                                            مميّز
                                        </div>
                                    )}
                                </div>

                                <div className="p-4 flex flex-col h-full">
                                    <h3 className="text-lg font-extrabold text-slate-900 line-clamp-2">{b.title}</h3>
                                    <p className="mt-0.5 text-xs" style={{ color: "#808285" }}>{b.author_name}</p>
                                    <p className="mt-2 text-sm text-slate-700 line-clamp-3">{b.description}</p>

                                    <div className="mt-auto pt-4 flex items-center gap-2">
                                        <Link to={`/products/books/${b.id}`} className="flex-1">
                                            <CardActionButton>
                                                <BookOpen className="h-4 w-4" />
                                                تفاصيل الكتاب
                                            </CardActionButton>
                                        </Link>

                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>
                )}

                {/* Pagination */}
                {count > pageSize && (
                    <div className="mt-10 flex items-center justify-center gap-2">
                        <GhostButton onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                            className={`border !border-[${BRAND}] !text-[${BRAND}] hover:!bg-[${BRAND}] hover:!text-white`}>
                            <ChevronRight className="h-4 w-4" />
                            السابق
                        </GhostButton>
                        <span className="inline-flex items-center gap-2 text-sm text-slate-700">
                            صفحة <b className="px-1">{page}</b> من <b className="px-1">{totalPages}</b>
                        </span>
                        <GhostButton onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                            className={`border !border-[${BRAND}] !text-[${BRAND}] hover:!bg-[${BRAND}] hover:!text-white`}>
                            التالي
                            <ChevronLeft className="h-4 w-4" />
                        </GhostButton>
                    </div>
                )}
            </section>
        </div>
    );
}
