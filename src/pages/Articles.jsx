// src/pages/Articles.jsx
import { motion } from "framer-motion";
import { AlertCircle, ChevronLeft, ChevronRight, FileText, Search, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CardActionButton, GhostButton } from "../components/ui/Button";
import { api } from "../lib/api";

import { COLORS } from "../lib/theme";

const { BRAND, ACCENT: LIME, INK } = COLORS;


const shimmer = "animate-pulse bg-slate-100 dark:bg-slate-800";

function useDebounced(value, delay = 380) {
    const [v, setV] = useState(value);
    useEffect(() => { const id = setTimeout(() => setV(value), delay); return () => clearTimeout(id); }, [value, delay]);
    return v;
}

function formatDate(iso) {
    try {
        const d = new Date(iso); if (isNaN(d.getTime())) return "";
        return d.toLocaleDateString("ar", { year: "numeric", month: "long", day: "numeric" });
    } catch { return ""; }
}

function CardSkeleton() {
    return (
        <div className="h-full flex flex-col rounded-2xl border border-slate-200 bg-white/80 shadow-sm overflow-hidden">
            <div className={shimmer} style={{ width: "100%", paddingTop: "62.5%" }} />
            <div className="p-4 flex flex-col h-full">
                <div className={"h-5 w-3/4 rounded " + shimmer} />
                <div className={"mt-2 h-4 w-1/2 rounded " + shimmer} />
                <div className={"mt-3 h-4 w-full rounded " + shimmer} />
                <div className={"mt-2 h-4 w-5/6 rounded " + shimmer} />
                <div className="mt-auto pt-4 flex gap-2">
                    <div className={"h-9 w-28 rounded-xl " + shimmer} />
                    <div className={"h-9 w-24 rounded-xl " + shimmer} />
                </div>
            </div>
        </div>
    );
}

function EmptyState({ message = "لا توجد نتائج" }) {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white/80 p-8 text-center">
            <AlertCircle className="mx-auto h-8 w-8 text-slate-400" />
            <p className="mt-3 text-sm text-slate-600">{message}</p>
        </div>
    );
}

export default function Articles() {
    const [q, setQ] = useState("");
    const dq = useDebounced(q, 380);

    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(9);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function load(p) {
        const current = p || page;
        setLoading(true); setError("");
        try {
            const params = new URLSearchParams();
            params.set("page", String(current));
            params.set("page_size", String(pageSize));
            params.set("published", "1");
            if (dq) params.set("q", dq);
            const resp = await api.get("/api/articles/?" + params.toString());
            const data = resp?.data || {};
            setItems(Array.isArray(data.results) ? data.results : []);
            setCount(Number(data.count || 0));
        } catch {
            setError("تعذّر تحميل المقالات حالياً."); setItems([]); setCount(0);
        } finally { setLoading(false); }
    }

    useEffect(() => { setPage(1); }, [dq]);
    useEffect(() => { load(1); /* eslint-disable-next-line */ }, [dq]);
    useEffect(() => { load(page); /* eslint-disable-next-line */ }, [page]);

    const totalPages = useMemo(() => Math.max(1, Math.ceil((count || 0) / pageSize)), [count, pageSize]);

    const containerV = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06, delayChildren: 0.06 } } };
    const cardV = { hidden: { opacity: 0, y: 16, scale: 0.98 }, show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 120, damping: 14 } } };

    return (
        <div dir="rtl" className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
            {/* HERO */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <motion.div aria-hidden className="absolute -top-24 -left-24 h-96 w-96 rounded-full blur-3xl"
                        style={{ background: "rgba(0,84,103,0.16)" }}
                        initial={{ x: -30, y: -30, scale: 0.95, opacity: 0.85 }}
                        animate={{ x: [-30, 20, -10, -30], y: [-30, -10, 10, -30], scale: [0.95, 1, 0.98, 0.95], opacity: [0.85, 1, 0.9, 0.85] }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div aria-hidden className="absolute -bottom-20 -right-24 h-80 w-80 rounded-full blur-3xl"
                        style={{ background: "rgba(205,220,45,0.12)" }}
                        initial={{ x: 30, y: 30, scale: 1.05, opacity: 0.7 }}
                        animate={{ x: [30, -10, 10, 30], y: [30, 10, -10, 30], scale: [1.05, 0.98, 1.02, 1.05], opacity: [0.7, 0.9, 0.8, 0.7] }}
                        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>

                <div className="container mx-auto px-6 pt-16 sm:pt-20 pb-8 sm:pb-10 relative">
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}
                        className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/60 px-3 py-1 text-xs backdrop-blur"
                        style={{ color: INK }}>
                        <Sparkles className="h-4 w-4" />
                        <span>المقالات</span>
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight md:leading-snug py-1"
                        style={{ backgroundImage: `linear-gradient(180deg, ${BRAND}, ${BRAND} 62%, #004452)`, WebkitBackgroundClip: "text", color: "transparent" }}>
                        المقالات
                    </motion.h1>

                    {/* Controls */}
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }}
                        className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <div className="relative flex-1">
                            <Search className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                            <input
                                type="text" value={q} onChange={(e) => setQ(e.target.value)}
                                placeholder="ابحث بعنوان المقال أو الكلمات المفتاحية"
                                className="w-full rounded-2xl border border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400 pr-9 pl-3 py-3 outline-none focus:ring-2"
                                style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,.9)" }}
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Grid */}
            <section className="container mx-auto px-6 pb-12">
                {error ? <EmptyState message={error} /> : null}

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
                    </div>
                ) : items.length === 0 ? (
                    <EmptyState message="لا توجد مقالات مطابقة لبحثك" />
                ) : (
                    <motion.div variants={containerV} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.map((a) => (
                            <motion.article key={a.id || a.slug} variants={cardV} whileHover={{ y: -6 }}
                                className="group h-full flex flex-col rounded-2xl border border-slate-200 bg-white/90 shadow-md overflow-hidden">
                                <div className="relative w-full overflow-hidden" style={{ position: "relative", paddingTop: "62.5%" }}>
                                    {a.cover_url && (
                                        <img src={a.cover_url} alt={a.title}
                                            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                                    )}
                                </div>

                                <div className="p-4 flex flex-col h-full">
                                    <h3 className="text-lg font-extrabold text-slate-900 line-clamp-2">{a.title}</h3>
                                    <p className="mt-1 text-xs" style={{ color: "#808285" }}>{a.published_at ? formatDate(a.published_at) : ""}</p>
                                    <p className="mt-2 text-sm text-slate-700 line-clamp-3">{a.excerpt || ""}</p>

                                    {/* keywords */}
                                    {a.keywords?.length ? (
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {a.keywords.slice(0, 4).map((k, i) => (
                                                <span key={i} className="rounded-full px-3 py-1 text-xs border"
                                                    style={{ borderColor: "rgba(0,0,0,.12)", color: INK, background: "#fff" }}>
                                                    {String(k)}
                                                </span>
                                            ))}
                                        </div>
                                    ) : null}

                                    {/* Action */}
                                    <div className="mt-auto pt-4 flex items-center gap-2">
                                        <Link to={"/articles/" + (a.slug || a.id)} className="flex-1">
                                            <CardActionButton>
                                                <FileText className="h-4 w-4" />
                                                قراءة المقال
                                            </CardActionButton>
                                        </Link>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>
                )}

                {/* Pagination */}
                {count > pageSize ? (
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
                ) : null}
            </section>
        </div>
    );
}
