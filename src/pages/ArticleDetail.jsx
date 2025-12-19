// src/pages/ArticleDetail.jsx
import { motion } from "framer-motion";
import { AlertCircle, CalendarDays, ChevronLeft, Loader2, Sparkles, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GhostButton } from "../components/ui/Button";
import { api } from "../lib/api";

import { COLORS } from "../lib/theme";

const { BRAND, ACCENT: LIME, INK } = COLORS;


function formatDate(iso) {
    try {
        const d = new Date(iso);
        if (isNaN(d.getTime())) return "";
        return d.toLocaleDateString("ar", { year: "numeric", month: "long", day: "numeric" });
    } catch {
        return "";
    }
}

function Skeleton() {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 sm:p-10">
            <div className="h-7 w-2/3 rounded animate-pulse bg-slate-100" />
            <div className="mt-2 h-4 w-1/3 rounded animate-pulse bg-slate-100" />
            <div className="mt-6 rounded-2xl overflow-hidden">
                <div className="w-full bg-slate-100" style={{ paddingTop: "56.25%" }} />
            </div>
            <div className="mt-6 space-y-3">
                <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-slate-100" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100" />
            </div>
        </div>
    );
}

function EmptyState({ message = "تعذّر تحميل تفاصيل هذا المقال." }) {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white/80 p-8 text-center">
            <AlertCircle className="mx-auto h-8 w-8 text-slate-400" />
            <p className="mt-3 text-sm text-slate-600">{message}</p>
        </div>
    );
}

export default function ArticleDetail() {
    const { slug = "" } = useParams();
    const [item, setItem] = useState(null);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingRelated, setLoadingRelated] = useState(false);
    const [error, setError] = useState("");

    async function loadArticle() {
        setLoading(true); setError("");
        try {
            const resp = await api.get(`/api/articles/${slug}/`);
            setItem(resp?.data ?? null);
        } catch {
            setError("تعذّر تحميل تفاصيل هذا المقال.");
        } finally { setLoading(false); }
    }

    async function loadRelated(a) {
        if (!a) return;
        setLoadingRelated(true);
        try {
            let q = a.title || (a.keywords && a.keywords[0]) || "";
            const r = await api.get(`/api/articles/?q=${encodeURIComponent(q)}&page_size=6&published=1`);
            const arr = Array.isArray(r?.data?.results) ? r.data.results : [];
            setRelated(arr.filter((x) => String(x.slug || x.id) !== String(a.slug || a.id)));
        } catch {
            setRelated([]);
        } finally { setLoadingRelated(false); }
    }

    useEffect(() => { window.scrollTo(0, 0); }, []);
    useEffect(() => { loadArticle(); /* eslint-disable-next-line */ }, [slug]);
    useEffect(() => { if (item) loadRelated(item); }, [item]);

    const card = { hidden: { opacity: 0, y: 16, scale: 0.98 }, show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 120, damping: 16 } } };

    return (
        <div dir="rtl" className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
            {/* HERO */}
            <section className="relative overflow-hidden">
                {/* Blobs بلون الهوية */}
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

                <div className="container mx-auto px-6 pt-14 sm:pt-18 pb-6 relative">
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                        className="mb-3 flex items-center gap-2 text-sm" style={{ color: INK }}>
                        <Link to="/articles" className="inline-flex items-center gap-1 hover:opacity-80">
                            <ChevronLeft className="h-4 w-4" />
                            العودة إلى المقالات
                        </Link>
                    </motion.div>

                    {!loading && item && (
                        <>
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/60 px-3 py-1 text-xs backdrop-blur"
                                style={{ color: INK }}>
                                <Sparkles className="h-4 w-4" />
                                <span>تفاصيل المقال</span>
                            </motion.div>

                            <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
                                className="mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight md:leading-snug py-1"
                                style={{ backgroundImage: `linear-gradient(180deg, ${BRAND}, ${BRAND} 62%, #004452)`, WebkitBackgroundClip: "text", color: "transparent" }}>
                                {item.title}
                            </motion.h1>

                            <div className="mt-1 flex flex-wrap items-center gap-3 text-xs" style={{ color: "#808285" }}>
                                <span className="inline-flex items-center gap-1">
                                    <CalendarDays className="h-4 w-4" />
                                    {item.published_at ? formatDate(item.published_at) : ""}
                                </span>
                                {item.keywords?.length ? (
                                    <span className="inline-flex items-center gap-1">
                                        <Tag className="h-4 w-4" />
                                        {item.keywords.slice(0, 3).join(" • ")}
                                    </span>
                                ) : null}
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* النص */}
            <section className="container mx-auto px-6 pb-12">
                {loading ? (
                    <Skeleton />
                ) : error ? (
                    <EmptyState message={error} />
                ) : !item ? (
                    <EmptyState />
                ) : (
                    <motion.div variants={card} initial="hidden" animate="show"
                        className="rounded-3xl border border-slate-200 bg-white/80 p-6 sm:p-10">
                        {/* الغلاف */}
                        {item.cover_url && (
                            <div className="rounded-2xl overflow-hidden shadow-md bg-slate-50">
                                <div className="w-full bg-slate-200/60" style={{ position: "relative", paddingTop: "56.25%" }}>
                                    <img src={item.cover_url} alt={item.title} className="absolute inset-0 h-full w-full object-cover"
                                        onError={(e) => (e.currentTarget.style.opacity = 0.3)} />
                                </div>
                            </div>
                        )}

                        {/* المحتوى */}
                        <article className="prose prose-slate max-w-none mt-6">
                            <div className="text-sm leading-7 text-slate-800" dangerouslySetInnerHTML={{ __html: item.content || "" }} />
                        </article>

                        {/* الكلمات المفتاحية */}
                        {item.keywords?.length ? (
                            <div className="mt-6 flex flex-wrap gap-2">
                                {item.keywords.map((k, i) => (
                                    <span key={i}
                                        className="rounded-full px-3 py-1 text-xs border"
                                        style={{ borderColor: "rgba(0,0,0,.12)", color: INK, background: "#fff" }}>
                                        {String(k)}
                                    </span>
                                ))}
                            </div>
                        ) : null}
                    </motion.div>
                )}
            </section>

            {/* ذات صلة */}
            {!loading && !error && related?.length > 0 && (
                <section className="container mx-auto px-6 pb-16">
                    <div className="mb-4 flex items-center gap-2" style={{ color: INK }}>
                        <Sparkles className="h-5 w-5" />
                        <h3 className="text-lg font-bold">مقالات ذات صلة</h3>
                    </div>

                    {loadingRelated ? (
                        <div className="flex items-center gap-2 text-slate-600">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span className="text-sm">جاري جلب المقترحات</span>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {related.map((a) => {
                                const href = "/articles/" + (a.slug || a.id);
                                return (
                                    <article key={a.slug || a.id}
                                        className="group rounded-2xl border border-slate-200 bg-white/90 shadow-sm overflow-hidden">
                                        <div className="w-full overflow-hidden" style={{ position: "relative", paddingTop: "62.5%" }}>
                                            {a.cover_url && (
                                                <img src={a.cover_url} alt={a.title}
                                                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <h4 className="font-bold text-slate-900 line-clamp-2">{a.title}</h4>
                                            <p className="mt-1 text-xs" style={{ color: "#808285" }}>{a.published_at ? formatDate(a.published_at) : ""}</p>
                                            <div className="mt-3">
                                                <Link to={href}>
                                                    <GhostButton className={`border !border-[${BRAND}] !text-[${BRAND}] hover:!bg-[${BRAND}] hover:!text-white`}>
                                                        قراءة
                                                    </GhostButton>
                                                </Link>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </section>
            )}
        </div>
    );
}
