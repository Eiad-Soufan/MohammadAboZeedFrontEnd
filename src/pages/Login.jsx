// src/pages/Login.jsx
import { motion } from "framer-motion";
import { AlertCircle, Eye, EyeOff, Lock, LogIn, Mail } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api, AuthAPI, setSession } from "../lib/api";

// ألوان الهوية
const BRAND_PRIMARY = "#005467";
const BRAND_ACCENT = "#CDDC2D";
const INK_MAIN = "#414042";
const INK_SOFT = "#808285";

// زر موحّد (مطابق للـ Join)
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


export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const [form, setForm] = useState({ email: "", password: "", remember: false });
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState({ type: "", text: "" });

    const onChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
    };

    const validate = () => {
        if (!form.email.trim()) return "يرجى إدخال البريد الإلكتروني أو اسم المستخدم.";
        if (!form.password) return "يرجى إدخال كلمة المرور.";
        return "";
    };

    const inputBase =
        "w-full rounded-2xl border text-sm py-3 pr-10 pl-3 text-right outline-none " +
        "bg-white text-gray-900 placeholder-gray-400 " +
        "border-[#E0E3E5] focus:ring-2";

    const smartRedirect = () => {
        const params = new URLSearchParams(location.search);
        const next = params.get("next");
        const from = location.state?.from;

        if (from?.pathname && from.pathname !== "/login") {
            const search = from.search || "";
            const hash = from.hash || "";
            navigate(`${from.pathname}${search}${hash}`, { replace: true });
            return;
        }
        if (next && next !== "/login") {
            navigate(next, { replace: true });
            return;
        }
        try {
            const ref = document.referrer;
            if (ref && new URL(ref).origin === window.location.origin) {
                const prevPath = new URL(ref).pathname;
                if (!/\/login$/.test(prevPath)) {
                    navigate(-1);
                    return;
                }
            }
        } catch { }
        navigate("/", { replace: true });
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
            const { data } = await AuthAPI.login(form.email, form.password);
            const { access, refresh, me } = data || {};
            if (!access) throw new Error("no_access");

            setSession({ access, refresh, me });
            api.defaults.headers.common.Authorization = `Bearer ${access}`;
            window.dispatchEvent(new Event("auth-changed"));

            setMsg({ type: "success", text: "تم تسجيل الدخول بنجاح." });
            smartRedirect();
        } catch (error) {
            const status = error?.response?.status;
            const serverDetail = error?.response?.data?.detail;
            let text =
                serverDetail ||
                (status === 401
                    ? "بيانات الدخول غير صحيحة."
                    : status === 404
                        ? "واجهة تسجيل الدخول غير مفعّلة بعد."
                        : "تعذّر تسجيل الدخول الآن. حاول مرة أخرى.");
            setMsg({ type: "error", text });
        } finally {
            setLoading(false);
        }
    };

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
                            تسجيل الدخول
                        </motion.h1>
                        <p className="mt-2 text-sm" style={{ color: INK_SOFT }}>
                            أدخل بريدك الإلكتروني أو اسم المستخدم، وكلمة المرور للوصول إلى حسابك.
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
                                <AlertCircle className="mt-0.5 h-5 w-5" />
                                <p className="text-sm">{msg.text}</p>
                            </div>
                        )}

                        <form onSubmit={onSubmit} className="mt-8 grid grid-cols-1 gap-6">
                            {/* المعرّف (بريد أو اسم مستخدم) */}
                            <div>
                                <label className="mb-2 block text-sm font-medium" style={{ color: INK_MAIN }}>
                                    البريد الإلكتروني أو اسم المستخدم
                                </label>
                                <div className="relative">
                                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: INK_SOFT }} />
                                    <input
                                        type="text"
                                        name="email"
                                        value={form.email}
                                        onChange={onChange}
                                        placeholder="you@example.com أو username"
                                        className={inputBase}
                                        style={{ caretColor: BRAND_PRIMARY }}
                                        autoComplete="username"
                                    />
                                </div>
                            </div>

                            {/* كلمة المرور */}
                            <div>
                                <label className="mb-2 block text-sm font-medium" style={{ color: INK_MAIN }}>كلمة المرور</label>
                                <div className="relative">
                                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: INK_SOFT }} />
                                    <input
                                        type={showPass ? "text" : "password"}
                                        name="password"
                                        value={form.password}
                                        onChange={onChange}
                                        placeholder="••••••••"
                                        className={inputBase + " pr-10 pl-10"}
                                        style={{ caretColor: BRAND_PRIMARY }}
                                        autoComplete="current-password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPass((s) => !s)}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 focus:outline-none"
                                        style={{ color: INK_SOFT, boxShadow: `0 0 0 0px ${BRAND_PRIMARY}00` }}
                                        aria-label={showPass ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                                        onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px ${BRAND_PRIMARY}40`)}
                                        onBlur={(e) => (e.currentTarget.style.boxShadow = `0 0 0 0px ${BRAND_PRIMARY}00`)}
                                    >
                                        {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>

                                <div className="mt-2 flex items-center justify-between">
                                    <label className="flex items-center gap-2 text-xs" style={{ color: INK_SOFT }}>
                                        <input
                                            type="checkbox"
                                            name="remember"
                                            checked={form.remember}
                                            onChange={onChange}
                                            className="rounded border-[#E0E3E5]"
                                            style={{ accentColor: BRAND_PRIMARY }}
                                        />
                                        تذكّرني على هذا الجهاز
                                    </label>
                                    <a href="/reset" className="text-xs underline hover:opacity-80" style={{ color: BRAND_PRIMARY }}>
                                        نسيت كلمة المرور؟
                                    </a>
                                </div>
                            </div>

                            {/* الأزرار */}
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <PrimaryButton type="submit" disabled={loading}>
                                    <LogIn className="h-4 w-4" />
                                    {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                                </PrimaryButton>

                                <p className="text-xs" style={{ color: INK_SOFT }}>
                                    ليس لديك حساب؟{" "}
                                    <a href="/join" className="font-medium underline hover:opacity-80" style={{ color: BRAND_PRIMARY }}>
                                        إنشاء حساب جديد
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
