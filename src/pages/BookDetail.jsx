// src/pages/BookDetail.jsx
import { motion } from "framer-motion";
import { AlertCircle, ArrowRight, ChevronLeft, ExternalLink, Loader2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PrimaryButton } from "../components/ui/Button";
import { api } from "../lib/api";

import { COLORS } from "../lib/theme";

const { BRAND, ACCENT: LIME, INK } = COLORS;


function Skeleton() {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 sm:p-10">
            <div className="h-7 w-2/3 rounded animate-pulse bg-slate-100" />
            <div className="mt-2 h-4 w-1/3 rounded animate-pulse bg-slate-100" />
            <div className="mt-6 rounded-2xl overflow-hidden" style={{ width: "100%", aspectRatio: "16/9" }}>
                <div className="w-full h-full animate-pulse bg-slate-100" />
            </div>
            <div className="mt-6 space-y-3">
                <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-slate-100" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100" />
            </div>
        </div>
    );
}

function EmptyState({ message = "تعذّر تحميل تفاصيل هذا الكتاب." }) {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white/80 p-8 text-center">
            <AlertCircle className="mx-auto h-8 w-8 text-slate-400" />
            <p className="mt-3 text-sm text-slate-600">{message}</p>
        </div>
    );
}

export default function BookDetail() {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingRelated, setLoadingRelated] = useState(false);
    const [error, setError] = useState("");

    async function loadBook() {
        setLoading(true); setError("");
        try { const { data } = await api.get(`/api/books/${id}/`); setItem(data); }
        catch { setError("تعذّر تحميل تفاصيل هذا الكتاب."); }
        finally { setLoading(false); }
    }

    async function loadRelated(b) {
        if (!b) return;
        setLoadingRelated(true);
        try {
            const q = (b.author_name && b.author_name.split(" ")[0]) || (Array.isArray(b.keywords) && b.keywords[0]) || (b.title || "");
            const { data } = await api.get(`/api/books/?q=${encodeURIComponent(q)}&page_size=6`);
            const items = Array.isArray(data?.results) ? data.results : [];
            setRelated(items.filter((x) => String(x.id) !== String(b.id)));
        } catch { setRelated([]); }
        finally { setLoadingRelated(false); }
    }

    useEffect(() => { loadBook(); /* eslint-disable-next-line */ }, [id]);
    useEffect(() => { if (item) loadRelated(item); }, [item]);

    const rise = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

    return (
        <div dir="rtl" className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
            {/* HERO */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full blur-3xl" style={{ background: "rgba(0,84,103,0.16)" }} />
                    <div className="absolute -bottom-20 -right-24 h-80 w-80 rounded-full blur-3xl" style={{ background: "rgba(205,220,45,0.12)" }} />
                </div>

                <div className="container mx-auto px-6 pt-14 sm:pt-18">
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                        className="mb-4 flex items-center gap-2 text-sm" style={{ color: INK }}>
                        <Link to="/products/books" className="inline-flex items-center gap-1 hover:opacity-80">
                            <ChevronLeft className="h-4 w-4" />
                            العودة إلى الكتب
                        </Link>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                        className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/60 px-3 py-1 text-xs backdrop-blur"
                        style={{ color: INK }}>
                        <Sparkles className="h-4 w-4" />
                        <span>تفاصيل الكتاب</span>
                    </motion.div>

                    {!loading && item && (
                        <>
                            <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
                                className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight"
                                style={{ color: INK }}>
                                {item.title}
                            </motion.h1>
                            <p className="mt-1 text-sm" style={{ color: "#808285" }}>{item?.author_name || ""}</p>
                        </>
                    )}
                </div>
            </section>

            {/* Content */}
            <section className="container mx-auto px-6 pb-14 pt-6">
                {loading ? (
                    <Skeleton />
                ) : error ? (
                    <EmptyState message={error} />
                ) : !item ? (
                    <EmptyState />
                ) : (
                    <motion.div variants={rise} initial="hidden" animate="show"
                        className="rounded-3xl border border-slate-200 bg-white/80 p-6 sm:p-10">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Cover */}
                            <div className="lg:col-span-1">
                                <div className="rounded-2xl overflow-hidden shadow-md bg-slate-50">
                                    <div style={{ width: "100%", aspectRatio: "16/10" }}>
                                        <img src={item.cover_url} alt={item.title} className="h-full w-full object-cover"
                                            onError={(e) => (e.currentTarget.style.opacity = 0.3)} />
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center gap-2">
                                    {item.url && (
                                        <a href={item.url} target="_blank" rel="noreferrer" className="flex-1">
                                            <PrimaryButton
                                                className="w-full !text-white"
                                                style={{
                                                    backgroundImage: `linear-gradient(135deg, ${BRAND} 0%, #0A6F82 60%, ${BRAND} 100%)`,
                                                    boxShadow: `0 18px 46px -18px rgba(0,84,103,.55)`,
                                                    border: "1px solid rgba(255,255,255,.18)",
                                                }}
                                            >
                                                <ExternalLink className="h-4 w-4" />
                                                شراء الكتاب
                                            </PrimaryButton>
                                        </a>
                                    )}
                                </div>

                                {item.is_featured && (
                                    <div className="mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold"
                                        style={{ background: LIME, color: "#141414" }}>
                                        مميّز
                                    </div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="lg:col-span-2">
                                <h2 id="about" className="text-lg font-bold text-slate-900">نبذة</h2>
                                <p className="mt-2 text-sm leading-7 text-slate-700 whitespace-pre-line">
                                    {item.description || "—"}
                                </p>

                                {Array.isArray(item.keywords) && item.keywords.length > 0 && (
                                    <>
                                        <h3 className="mt-6 text-sm font-bold text-slate-900">كلمات مفتاحية</h3>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {item.keywords.map((k, i) => (
                                                <span key={i} className="rounded-full px-3 py-1 text-xs border"
                                                    style={{ borderColor: "rgba(0,0,0,.12)", color: INK, background: "#fff" }}>
                                                    {String(k)}
                                                </span>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </section>

            {/* Related */}
            {!loading && !error && related.length > 0 && (
                <section className="container mx-auto px-6 pb-16">
                    <div className="mb-4 flex items-center gap-2" style={{ color: INK }}>
                        <ArrowRight className="h-5 w-5" />
                        <h3 className="text-lg font-bold">كتب ذات صلة</h3>
                    </div>

                    {loadingRelated ? (
                        <div className="flex items-center gap-2 text-slate-600">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span className="text-sm">جاري جلب المقترحات…</span>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {related.map((b) => (
                                <article key={b.id} className="group rounded-2xl border border-slate-200 bg-white/90 shadow-sm overflow-hidden">
                                    <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/10" }}>
                                        <img src={b.cover_url} alt={b.title}
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                                    </div>
                                    <div className="p-4">
                                        <h4 className="font-bold text-slate-900 line-clamp-2">{b.title}</h4>
                                        <p className="mt-0.5 text-xs" style={{ color: "#808285" }}>{b.author_name}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            )}
        </div>
    );
}
