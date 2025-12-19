// src/pages/CourseRecordedDetail.jsx
import { motion } from "framer-motion";
import { AlertCircle, ChevronLeft, Loader2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GhostButton } from "../components/ui/Button";
import { api } from "../lib/api";

const BRAND = "#005467";
const BRAND_DARK = "#004452";
const INK = "#414042";

function Skeleton() {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 sm:p-10">
            <div className="h-7 w-2/3 rounded animate-pulse bg-slate-100" />
            <div className="mt-2 h-4 w-1/3 rounded animate-pulse bg-slate-100" />
            <div
                className="mt-6 rounded-2xl overflow-hidden"
                style={{ width: "100%", aspectRatio: "16/9" }}
            >
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

function EmptyState({ message = "تعذّر تحميل تفاصيل هذه الدورة." }) {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white/80 p-8 text-center">
            <AlertCircle className="mx-auto h-8 w-8 text-slate-400" />
            <p className="mt-3 text-sm text-slate-600">{message}</p>
        </div>
    );
}

function LongDescription({ value }) {
    if (typeof value !== "string" || value.trim() === "") return null;
    const hasHTML = /<\/?[a-z][\s\S]*>/i.test(value);
    if (hasHTML) {
        return (
            <div
                className="mt-6 prose prose-slate max-w-none leading-relaxed"
                style={{ direction: "rtl" }}
                dangerouslySetInnerHTML={{ __html: value }}
            />
        );
    }
    return (
        <div
            className="mt-6 text-slate-800 leading-8 whitespace-pre-line"
            style={{ direction: "rtl" }}
        >
            {value}
        </div>
    );
}

// دالة مساعدة لعرض عناصر ربما تكون string أو {title, bullets}
function renderComplexListItem(item, index) {
    if (!item) return null;

    if (typeof item === "string") {
        return <li key={index}>{item}</li>;
    }

    if (typeof item === "object") {
        const title = item.title || "";
        const bullets = Array.isArray(item.bullets) ? item.bullets : [];

        return (
            <li key={index}>
                {title && <div className="font-semibold mb-1">{title}</div>}
                {bullets.length > 0 && (
                    <ul className="list-disc pr-4 space-y-1 text-slate-700">
                        {bullets.map((b, j) => (
                            <li key={j}>{b}</li>
                        ))}
                    </ul>
                )}
            </li>
        );
    }

    return null;
}

const rise = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function CourseRecordedDetail() {
    const { slug } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        async function load() {
            setLoading(true);
            setError("");
            try {
                const { data } = await api.get(`/api/courses/recorded/${slug}/`);
                setItem(data ?? null);
            } catch (e) {
                setError("تعذّر تحميل تفاصيل هذه الدورة.");
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [slug]);

    return (
        <div className="min-h-screen bg-slate-50/60">
            {/* Hero */}
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

                <div className="container mx-auto px-6 pt-14 sm:pt-18 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-4 flex items-center gap-2 text-sm"
                        style={{ color: INK }}
                    >
                        <Link
                            to="/courses/recorded"
                            className="inline-flex items-center gap-1 hover:opacity-80"
                        >
                            <ChevronLeft className="h-4 w-4" />
                            العودة إلى الدورات المسجّلة
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/60 px-3 py-1 text-xs backdrop-blur"
                        style={{ color: INK }}
                    >
                        <Sparkles className="h-4 w-4" />
                        <span>دورة مسجّلة</span>
                    </motion.div>

                    {loading && !item && (
                        <div className="mt-4 flex items-center gap-2 text-slate-500 text-sm">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>جاري تحميل تفاصيل الدورة...</span>
                        </div>
                    )}

                    {!loading && item && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.05 }}
                            className="mt-4"
                        >
                            <h1
                                className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight"
                                style={{
                                    backgroundImage: `linear-gradient(180deg, ${BRAND}, ${BRAND} 62%, ${BRAND_DARK})`,
                                    WebkitBackgroundClip: "text",
                                    color: "transparent",
                                }}
                            >
                                {item.title}
                            </h1>
                            {item.subtitle && (
                                <p className="mt-1 text-sm text-slate-600">{item.subtitle}</p>
                            )}
                        </motion.div>
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
                    <motion.div
                        variants={rise}
                        initial="hidden"
                        animate="show"
                        className="rounded-3xl border border-slate-200 bg-white/80 p-6 sm:p-10 shadow-md"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* صورة ومعطيات سريعة */}
                            <div className="lg:col-span-1">
                                <div className="rounded-2xl overflow-hidden shadow-md bg-slate-50">
                                    <div style={{ width: "100%", aspectRatio: "16/9" }}>
                                        {item.image_url ? (
                                            <img
                                                src={item.image_url}
                                                alt={item.title}
                                                className="h-full w-full object-cover"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
                                                لا توجد صورة متاحة
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                                    {item.level && (
                                        <span className="rounded-full px-3 py-1 border bg-white/80 text-slate-700">
                                            المستوى: {item.level}
                                        </span>
                                    )}
                                    {item.duration && (
                                        <span className="rounded-full px-3 py-1 border bg-white/80 text-slate-700">
                                            المدة: {item.duration}
                                        </span>
                                    )}
                                    {item.language && (
                                        <span className="rounded-full px-3 py-1 border bg-white/80 text-slate-700">
                                            اللغة: {item.language}
                                        </span>
                                    )}
                                </div>

                                {item.summary && (
                                    <p className="mt-4 text-sm text-slate-700 leading-relaxed">
                                        {item.summary}
                                    </p>
                                )}
                            </div>

                            {/* محتوى النص */}
                            <div className="lg:col-span-2">
                                <LongDescription value={item.long_description} />

                                {/* الأهداف */}
                                {Array.isArray(item.objectives) &&
                                    item.objectives.length > 0 && (
                                        <div className="mt-10">
                                            <h2 className="text-xl font-bold text-slate-900 mb-3">
                                                أهداف الدورة
                                            </h2>
                                            <ul className="list-disc pr-5 text-slate-700 space-y-1 leading-8">
                                                {item.objectives.map((it, i) =>
                                                    renderComplexListItem(it, i)
                                                )}
                                            </ul>
                                        </div>
                                    )}

                                {/* الفئة المستهدفة */}
                                {Array.isArray(item.target_audience) &&
                                    item.target_audience.length > 0 && (
                                        <div className="mt-8">
                                            <h2 className="text-xl font-bold text-slate-900 mb-3">
                                                هذه الدورة مناسبة لـ
                                            </h2>
                                            <ul className="list-disc pr-5 text-slate-700 space-y-1 leading-8">
                                                {item.target_audience.map((it, i) =>
                                                    renderComplexListItem(it, i)
                                                )}
                                            </ul>
                                        </div>
                                    )}

                                {/* محاور الدورة */}
                                {Array.isArray(item.outline) && item.outline.length > 0 && (
                                    <div className="mt-8">
                                        <h2 className="text-xl font-bold text-slate-900 mb-3">
                                            محاور الدورة
                                        </h2>
                                        <ol className="list-decimal pr-5 text-slate-700 space-y-2 leading-8">
                                            {item.outline.map((sec, i) =>
                                                renderComplexListItem(sec, i)
                                            )}
                                        </ol>
                                    </div>
                                )}

                                <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                                    <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                                        لطلب هذه الدورة أو الاستفسار
                                    </h2>
                                    <div className="space-y-1 text-sm sm:text-base text-slate-800" style={{ direction: "rtl" }}>
                                        <p>
                                            <span className="font-semibold">البريد الإلكتروني:</span>{" "}
                                            <a href="mailto:info@abozeed.com" className="text-[#005467] hover:underline">
                                                info@abozeed.com
                                            </a>
                                        </p>
                                        <p>
                                            <span className="font-semibold">الجوال:</span>{" "}
                                            <a href="tel:+601111110505" className="text-[#005467] hover:underline inline-block text-left">
                                                60-11-11110505+
                                            </a>
                                        </p>
                                        <p>
                                            <span className="font-semibold">حساب انستغرام:</span>{" "}
                                            <a
                                                href="https://www.instagram.com/abozeedmoh"
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-[#005467] hover:underline"
                                            >
                                                @abozeedmoh
                                            </a>
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <GhostButton onClick={() => window.history.back()}>
                                        رجوع
                                    </GhostButton>
                                </div>

                            </div>
                        </div>
                    </motion.div>
                )}
            </section>
        </div>
    );
}
