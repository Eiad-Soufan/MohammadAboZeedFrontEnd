// src/pages/Join.jsx
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Lock, Mail, User } from "lucide-react";
import { useMemo, useState } from "react";
// استخدم API الموحّد + setSession
import { AuthAPI, setSession } from "../lib/api";

// ألوان الهوية
const BRAND_PRIMARY = "#005467";
const BRAND_ACCENT = "#CDDC2D";
const INK_MAIN = "#414042";
const INK_SOFT = "#808285";

// زر موحّد (يحاكي زر الهيرو)
// بدل التعريف الحالي لـ PrimaryButton بهذا:
function PrimaryButton({ children, className = "", ...props }) {
    return (
        <button
            {...props}
            className={`btn filled speaker-match ${className}`}
        >
            {children}
        </button>
    );
}


export default function Join() {
    const [form, setForm] = useState({
        full_name: "",
        email: "",
        password: "",
        confirm: "",
        accept: false,
    });
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState({ type: "", text: "" });

    const onChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
    };

    const passStrength = useMemo(() => {
        const p = form.password || "";
        let score = 0;
        if (p.length >= 8) score++;
        if (/[A-Z]/.test(p)) score++;
        if (/[a-z]/.test(p)) score++;
        if (/\d/.test(p)) score++;
        if (/[^A-Za-z0-9]/.test(p)) score++;
        return Math.min(score, 4); // 0..4
    }, [form.password]);

    const validate = () => {
        if (!form.full_name.trim()) return "يرجى إدخال الاسم الكامل.";
        if (!/^\S+@\S+\.\S+$/.test(form.email)) return "يرجى إدخال بريد إلكتروني صالح.";
        if (form.password.length < 8) return "كلمة المرور يجب أن تكون 8 أحرف على الأقل.";
        if (form.password !== form.confirm) return "كلمتا المرور غير متطابقتين.";
        if (!form.accept) return "يرجى الموافقة على الشروط وسياسة الخصوصية.";
        return "";
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setMsg({ type: "", text: "" });
        const err = validate();
        if (err) {
            setMsg({ type: "error", text: err });
            return;
        }
        setLoading(true);
        try {
            // ✅ التسجيل يرجّع { detail, access, refresh, me }
            const { data } = await AuthAPI.register({
                full_name: form.full_name,
                email: form.email,
                password: form.password,
            });

            const { access, refresh, me } = data || {};
            if (access) {
                setSession({ access, refresh, me });
                setMsg({ type: "success", text: "تم إنشاء الحساب وتسجيل الدخول." });
                window.location.href = "/profile";
                return;
            }

            setMsg({ type: "success", text: "تم إنشاء الحساب بنجاح! يمكنك تسجيل الدخول الآن." });
            setForm({ full_name: "", email: "", password: "", confirm: "", accept: false });
        } catch (error) {
            const status = error?.response?.status;
            const detail =
                error?.response?.data?.detail ||
                (status === 409
                    ? "البريد مستخدم مسبقًا."
                    : status === 404
                        ? "واجهة التسجيل غير مفعّلة بعد."
                        : "تعذّر إنشاء الحساب حاليًا. حاول مرة أخرى.");
            setMsg({ type: "error", text: detail });
        } finally {
            setLoading(false);
        }
    };

    const strengthLabel = ["ضعيفة جدًا", "ضعيفة", "جيدة", "قوية", "ممتازة"][passStrength] || "ضعيفة جدًا";
    const strengthWidth = ["w-1/5", "w-2/5", "w-3/5", "w-4/5", "w-full"][passStrength] || "w-1/5";

    const inputBase =
        "w-full rounded-2xl border text-sm py-3 pr-10 pl-3 text-right outline-none " +
        "bg-white text-gray-900 placeholder-gray-400 " +
        "border-[#E0E3E5] " +
        "focus:ring-2";

    return (
        <div dir="rtl" className="min-h-screen bg-gradient-to-b from-white via-[#f7fafb] to-white">
            <section className="mx-auto max-w-3xl px-4 py-14 sm:py-18">
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="rounded-3xl shadow-xl border border-[#e6eaec] bg-white/85 backdrop-blur"
                >
                    <div className="p-6 sm:p-10">
                        <motion.h1
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.08, duration: 0.45 }}
                            className="text-3xl sm:text-4xl font-extrabold tracking-tight"
                            style={{ color: INK_MAIN }}
                        >
                            إنشاء حساب جديد
                        </motion.h1>
                        <p className="mt-2 text-sm" style={{ color: INK_SOFT }}>
                            انضم للمدوّنة لحفظ المفضلة وطلب الكتب والأدوات والوصول إلى الكورسات المسجّلة.
                        </p>

                        {msg.text && (
                            <div
                                className={[
                                    "mt-6 flex items-start gap-3 rounded-2xl border p-4",
                                    msg.type === "success"
                                        ? "border-lime-300 bg-lime-50 text-lime-800"
                                        : "border-red-200 bg-red-50 text-red-800",
                                ].join(" ")}
                            >
                                {msg.type === "success" ? (
                                    <CheckCircle2 className="mt-0.5 h-5 w-5" />
                                ) : (
                                    <AlertCircle className="mt-0.5 h-5 w-5" />
                                )}
                                <p className="text-sm">{msg.text}</p>
                            </div>
                        )}

                        <form onSubmit={onSubmit} className="mt-8 grid grid-cols-1 gap-6">
                            <div>
                                <label className="mb-2 block text-sm font-medium" style={{ color: INK_MAIN }}>
                                    الاسم الكامل
                                </label>
                                <div className="relative">
                                    <User className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: INK_SOFT }} />
                                    <input
                                        type="text"
                                        name="full_name"
                                        value={form.full_name}
                                        onChange={onChange}
                                        placeholder="مثال: إياد عبد الهادي سوفان"
                                        className={inputBase}
                                        style={{ caretColor: BRAND_PRIMARY }}
                                        autoComplete="name"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium" style={{ color: INK_MAIN }}>
                                    البريد الإلكتروني
                                </label>
                                <div className="relative">
                                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: INK_SOFT }} />
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={onChange}
                                        placeholder="you@example.com"
                                        className={inputBase}
                                        style={{ caretColor: BRAND_PRIMARY }}
                                        autoComplete="email"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium" style={{ color: INK_MAIN }}>
                                    كلمة المرور
                                </label>
                                <div className="relative">
                                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: INK_SOFT }} />
                                    <input
                                        type="password"
                                        name="password"
                                        value={form.password}
                                        onChange={onChange}
                                        placeholder="••••••••"
                                        className={inputBase}
                                        style={{ caretColor: BRAND_PRIMARY }}
                                        autoComplete="new-password"
                                    />
                                </div>
                                {/* مؤشر قوة كلمة المرور */}
                                <div className="mt-2 h-1.5 w-full rounded-full bg-[#e9edef] overflow-hidden">
                                    <div className={`h-1.5 ${strengthWidth} rounded-full transition-all`} style={{ background: BRAND_PRIMARY }} />
                                </div>
                                <p className="mt-1 text-xs" style={{ color: INK_SOFT }}>القوة: {strengthLabel}</p>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium" style={{ color: INK_MAIN }}>
                                    تأكيد كلمة المرور
                                </label>
                                <div className="relative">
                                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: INK_SOFT }} />
                                    <input
                                        type="password"
                                        name="confirm"
                                        value={form.confirm}
                                        onChange={onChange}
                                        placeholder="••••••••"
                                        className={inputBase}
                                        style={{ caretColor: BRAND_PRIMARY }}
                                        autoComplete="new-password"
                                    />
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <input
                                    id="accept"
                                    type="checkbox"
                                    name="accept"
                                    checked={form.accept}
                                    onChange={onChange}
                                    className="mt-1 h-4 w-4 rounded border-[#E0E3E5]"
                                    style={{ accentColor: BRAND_PRIMARY }}
                                />
                                <label htmlFor="accept" className="text-sm" style={{ color: INK_SOFT }}>
                                    أوافق على <a href="/terms" className="underline hover:opacity-80" style={{ color: BRAND_PRIMARY }}>الشروط والأحكام</a> و{" "}
                                    <a href="/privacy" className="underline hover:opacity-80" style={{ color: BRAND_PRIMARY }}>سياسة الخصوصية</a>.
                                </label>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <PrimaryButton type="submit" disabled={loading}>
                                    {loading ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
                                </PrimaryButton>
                                <p className="text-xs" style={{ color: INK_SOFT }}>
                                    لديك حساب مسبقًا؟{" "}
                                    <a href="/login" className="font-medium underline hover:opacity-80" style={{ color: BRAND_PRIMARY }}>تسجيل الدخول</a>
                                </p>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
