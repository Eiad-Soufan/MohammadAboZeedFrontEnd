// src/pages/Profile.jsx
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Globe, Image as ImageIcon, Link2, Loader2, Mail, Phone, Save, User } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { api } from "../lib/api";

// ألوان الهوية
const BRAND_PRIMARY = "#005467";   // تركوازي أساسي
const BRAND_ACCENT = "#CDDC2D";   // ليموني
const INK_MAIN = "#414042";   // عناوين داكنة
const INK_SOFT = "#808285";   // نصوص مساعدة

// زر موحّد متوافق مع الهوية الجديدة
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


// كشف اتجاه بسيط: إن وُجدت حروف عربية نعتبره RTL
const inferDir = (s = "") => (/[\u0600-\u06FF]/.test(s) ? "rtl" : "ltr");

export default function Profile() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState({ type: "", text: "" });

    // بيانات الحساب للعرض فقط
    const [account, setAccount] = useState({ username: "", email: "" });

    // بيانات البروفايل القابلة للتعديل
    const [profile, setProfile] = useState({
        display_name: "",
        bio: "",
        avatar_url: "",
        phone: "",
        website: "",
        socials: {
            linkedin: "",
            x: "",
            github: "",
            facebook: "",
            instagram: "",
            youtube: "",
            website2: "",
        },
    });

    const [nameDir, setNameDir] = useState("auto");
    const resolvedNameDir = nameDir === "auto" ? inferDir(profile.display_name) : nameDir;

    // أسلوب الحقول — ضبط الألوان على الهوية
    const inputBase =
        "w-full rounded-2xl border text-sm py-3 pr-10 pl-3 outline-none " +
        "bg-white text-gray-900 placeholder-gray-400 " +
        "border-gray-300 focus:ring-2";

    const textareaBase =
        "w-full rounded-2xl border text-sm p-3 outline-none min-h[120px] " +
        "bg-white text-gray-900 placeholder-gray-400 " +
        "border-gray-300 focus:ring-2";

    const onChange = (e) => {
        const { name, value } = e.target;
        setProfile((s) => ({ ...s, [name]: value }));
    };

    const onSocialChange = (e) => {
        const { name, value } = e.target; // name = linkedin/x/github...
        setProfile((s) => ({ ...s, socials: { ...s.socials, [name]: value } }));
    };

    // تحميل بيانات البروفايل
    useEffect(() => {
        let isMounted = true;
        (async () => {
            setLoading(true);
            setMsg({ type: "", text: "" });
            try {
                const { data } = await api.get("/api/me/");
                const me = data?.me ?? data ?? {};
                const prof = me?.profile ?? me ?? {};

                const nextAccount = {
                    username: me?.username || me?.user?.username || "",
                    email: me?.email || me?.user?.email || "",
                };

                const nextProfile = {
                    display_name: prof.display_name || "",
                    bio: prof.bio || "",
                    avatar_url: prof.avatar_url || "",
                    phone: prof.phone || "",
                    website: prof.website || "",
                    socials: {
                        linkedin: prof.socials?.linkedin || "",
                        x: prof.socials?.x || "",
                        github: prof.socials?.github || "",
                        facebook: prof.socials?.facebook || "",
                        instagram: prof.socials?.instagram || "",
                        youtube: prof.socials?.youtube || "",
                        website2: prof.socials?.website2 || "",
                    },
                };

                if (!isMounted) return;
                setAccount(nextAccount);
                setProfile(nextProfile);
                setNameDir((prev) => (prev === "auto" ? "auto" : prev));
            } catch (error) {
                const status = error?.response?.status;
                const text =
                    status === 404
                        ? "واجهة /api/me/ غير مفعّلة بعد في الباك-إند."
                        : "تعذّر تحميل بيانات البروفايل حالياً.";
                if (!isMounted) return;
                setMsg({ type: "error", text });
            } finally {
                if (isMounted) setLoading(false);
            }
        })();
        return () => { isMounted = false; };
    }, []);

    const canSave = useMemo(() => true, [profile]);

    const onSave = async () => {
        setMsg({ type: "", text: "" });
        setSaving(true);
        try {
            const payload = {
                display_name: profile.display_name,
                bio: profile.bio,
                avatar_url: profile.avatar_url,
                phone: profile.phone,
                website: profile.website,
                socials: profile.socials,
            };
            await api.put("/api/me/", payload);
            setMsg({ type: "success", text: "تم حفظ التغييرات بنجاح." });
        } catch (error) {
            const status = error?.response?.status;
            const t =
                status === 404
                    ? "واجهة التحديث غير مفعّلة بعد (PUT /api/me/)."
                    : error?.response?.data?.detail || "تعذّر حفظ التغييرات حالياً.";
            setMsg({ type: "error", text: t });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div
            dir="rtl"
            className="min-h-screen bg-gradient-to-b from-white via-[#f7fafb] to-white"
            style={{ caretColor: BRAND_PRIMARY }}
        >
            <section className="mx-auto max-w-5xl px-4 py-14 sm:py-18">
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
                            الملف الشخصي
                        </motion.h1>
                        <p className="mt-2 text-sm" style={{ color: INK_SOFT }}>
                            راجع معلومات حسابك العامة، وعدّل تفاصيل البروفايل القابلة للتحديث.
                        </p>

                        {/* رسائل النظام */}
                        {msg.text && (
                            <div
                                className={[
                                    "mt-6 flex items-start gap-3 rounded-2xl border p-4",
                                    msg.type === "success"
                                        ? "border-lime-300 bg-lime-50 text-lime-800"
                                        : "border-red-200 bg-red-50 text-red-800",
                                ].join(" ")}
                            >
                                {msg.type === "success" ? <CheckCircle2 className="mt-0.5 h-5 w-5" /> : <AlertCircle className="mt-0.5 h-5 w-5" />}
                                <p className="text-sm">{msg.text}</p>
                            </div>
                        )}

                        {/* حالة التحميل */}
                        {loading ? (
                            <div className="flex items-center gap-3 mt-8" style={{ color: INK_SOFT }}>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                <span className="text-sm">جاري تحميل البيانات…</span>
                            </div>
                        ) : (
                            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
                                {/* عمود الصورة والمعلومات السريعة */}
                                <div className="lg:col-span-1">
                                    <div className="rounded-2xl border border-[#e6eaec] p-5">
                                        <div className="flex items-center gap-4">
                                            <div className="h-20 w-20 rounded-2xl overflow-hidden bg-[#f0f3f4] flex items-center justify-center">
                                                {profile.avatar_url ? (
                                                    <img
                                                        src={profile.avatar_url}
                                                        alt="Avatar"
                                                        className="h-full w-full object-cover"
                                                        onError={(e) => (e.currentTarget.style.display = "none")}
                                                    />
                                                ) : (
                                                    <ImageIcon className="h-8 w-8" style={{ color: INK_SOFT }} />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm" style={{ color: INK_SOFT }}>الاسم المعروض</p>
                                                <p className="font-medium" dir={resolvedNameDir} style={{ color: INK_MAIN }}>
                                                    {profile.display_name || "—"}
                                                </p>
                                                <p className="mt-1 text-xs" style={{ color: INK_SOFT }}>{account.username || "—"}</p>
                                            </div>
                                        </div>

                                        <div className="mt-5 space-y-3">
                                            <div className="flex items-center gap-3 text-sm" dir="ltr" style={{ color: INK_MAIN }}>
                                                <Mail className="h-4 w-4" style={{ color: INK_SOFT }} />
                                                <span className="truncate">{account.email || "—"}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm" dir="ltr" style={{ color: INK_MAIN }}>
                                                <Phone className="h-4 w-4" style={{ color: INK_SOFT }} />
                                                <span className="truncate">{profile.phone || "—"}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm" dir="ltr" style={{ color: INK_MAIN }}>
                                                <Globe className="h-4 w-4" style={{ color: INK_SOFT }} />
                                                <a
                                                    href={profile.website || "#"}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="truncate underline decoration-dotted hover:opacity-80"
                                                    style={{ color: BRAND_PRIMARY }}
                                                >
                                                    {profile.website || "—"}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* عمودا التحرير */}
                                <div className="lg:col-span-2">
                                    <div className="rounded-2xl border border-[#e6eaec] p-5">
                                        <h2 className="text-lg font-semibold" style={{ color: INK_MAIN }}>معلومات البروفايل</h2>

                                        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                                            {/* الاسم المعروض + اختيار اتجاه */}
                                            <div className="md:col-span-1">
                                                <div className="flex items-center justify-between">
                                                    <label className="mb-2 block text-sm font-medium" style={{ color: INK_MAIN }}>الاسم المعروض</label>
                                                    <div className="mb-2 inline-flex overflow-hidden rounded-xl border" style={{ borderColor: "#E0E3E5" }}>
                                                        <button
                                                            type="button"
                                                            className={`px-2.5 py-1 text-xs font-bold ${nameDir === "rtl" ? "bg-[#f4f7f8]" : ""}`}
                                                            title="محاذاة عربية (RTL)"
                                                            onClick={() => setNameDir("rtl")}
                                                            style={{ color: INK_MAIN }}
                                                        >
                                                            ع
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className={`px-2.5 py-1 text-xs font-bold ${nameDir === "auto" ? "bg-[#f4f7f8]" : ""}`}
                                                            title="تلقائي"
                                                            onClick={() => setNameDir("auto")}
                                                            style={{ color: INK_MAIN }}
                                                        >
                                                            ⊙
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className={`px-2.5 py-1 text-xs font-bold ${nameDir === "ltr" ? "bg-[#f4f7f8]" : ""}`}
                                                            title="محاذاة لاتينية (LTR)"
                                                            onClick={() => setNameDir("ltr")}
                                                            style={{ color: INK_MAIN }}
                                                        >
                                                            A
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="relative">
                                                    <User className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: INK_SOFT }} />
                                                    <input
                                                        type="text"
                                                        name="display_name"
                                                        value={profile.display_name}
                                                        onChange={onChange}
                                                        placeholder="مثال محمد احمد"
                                                        dir={resolvedNameDir}
                                                        className={[
                                                            inputBase,
                                                            resolvedNameDir === "ltr" ? "text-left" : "text-right",
                                                        ].join(" ")}
                                                        style={{
                                                            caretColor: BRAND_PRIMARY,
                                                            boxShadow: `0 0 0 0px ${BRAND_PRIMARY}00`,
                                                            borderColor: "#E0E3E5",
                                                        }}
                                                        onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px ${BRAND_PRIMARY}40`)}
                                                        onBlur={(e) => (e.currentTarget.style.boxShadow = `0 0 0 0px ${BRAND_PRIMARY}00`)}
                                                    />
                                                </div>
                                            </div>

                                            {/* رقم الهاتف — LTR دائمًا */}
                                            <div className="md:col-span-1">
                                                <label className="mb-2 block text-sm font-medium" style={{ color: INK_MAIN }}>رقم الهاتف</label>
                                                <div className="relative">
                                                    <Phone className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: INK_SOFT }} />
                                                    <input
                                                        type="text"
                                                        name="phone"
                                                        value={profile.phone}
                                                        onChange={onChange}
                                                        placeholder="+60 1X-XXXX XXXX"
                                                        dir="ltr"
                                                        className={[inputBase, "text-left font-mono"].join(" ")}
                                                        style={{ caretColor: BRAND_PRIMARY, borderColor: "#E0E3E5" }}
                                                    />
                                                </div>
                                            </div>

                                            {/* موقع ويب — LTR */}
                                            <div className="md:col-span-1">
                                                <label className="mb-2 block text-sm font-medium" style={{ color: INK_MAIN }}>الموقع الشخصي</label>
                                                <div className="relative">
                                                    <Globe className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: INK_SOFT }} />
                                                    <input
                                                        type="url"
                                                        name="website"
                                                        value={profile.website}
                                                        onChange={onChange}
                                                        placeholder="https://..."
                                                        dir="ltr"
                                                        className={[inputBase, "text-left"].join(" ")}
                                                        style={{ caretColor: BRAND_PRIMARY, borderColor: "#E0E3E5" }}
                                                    />
                                                </div>
                                            </div>

                                            {/* صورة البروفايل (رابط) — LTR */}
                                            <div className="md:col-span-1">
                                                <label className="mb-2 block text-sm font-medium" style={{ color: INK_MAIN }}>رابط صورة البروفايل</label>
                                                <div className="relative">
                                                    <ImageIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: INK_SOFT }} />
                                                    <input
                                                        type="url"
                                                        name="avatar_url"
                                                        value={profile.avatar_url}
                                                        onChange={onChange}
                                                        placeholder="https://.../avatar.png"
                                                        dir="ltr"
                                                        className={[inputBase, "text-left"].join(" ")}
                                                        style={{ caretColor: BRAND_PRIMARY, borderColor: "#E0E3E5" }}
                                                    />
                                                </div>
                                            </div>

                                            {/* السيرة الذاتية القصيرة — RTL */}
                                            <div className="md:col-span-2">
                                                <label className="mb-2 block text-sm font-medium" style={{ color: INK_MAIN }}>نبذة مختصرة</label>
                                                <textarea
                                                    name="bio"
                                                    value={profile.bio}
                                                    onChange={onChange}
                                                    placeholder="اكتب نبذة مختصرة عنك…"
                                                    dir="rtl"
                                                    className={[textareaBase, "text-right"].join(" ")}
                                                    style={{ caretColor: BRAND_PRIMARY, borderColor: "#E0E3E5" }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* قسم الروابط الاجتماعية — جميعها LTR */}
                                    <div className="mt-6 rounded-2xl border border-[#e6eaec] p-5">
                                        <h2 className="text-lg font-semibold" style={{ color: INK_MAIN }}>الروابط الاجتماعية</h2>

                                        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                                            {[
                                                { key: "linkedin", label: "LinkedIn" },
                                                { key: "x", label: "X (Twitter)" },
                                                { key: "github", label: "GitHub" },
                                                { key: "facebook", label: "Facebook" },
                                                { key: "instagram", label: "Instagram" },
                                                { key: "youtube", label: "YouTube" },
                                                { key: "website2", label: "موقع إضافي" },
                                            ].map(({ key, label }) => (
                                                <div key={key}>
                                                    <label className="mb-2 block text-sm font-medium" style={{ color: INK_MAIN }}>{label}</label>
                                                    <div className="relative">
                                                        <Link2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: INK_SOFT }} />
                                                        <input
                                                            type="url"
                                                            name={key}
                                                            value={profile.socials?.[key] || ""}
                                                            onChange={onSocialChange}
                                                            placeholder="https://..."
                                                            dir="ltr"
                                                            className={[inputBase, "text-left"].join(" ")}
                                                            style={{ caretColor: BRAND_PRIMARY, borderColor: "#E0E3E5" }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* أزرار الحفظ */}
                                    <div className="mt-6 flex items-center justify-end">
                                        <PrimaryButton onClick={onSave} disabled={!canSave || saving}>
                                            {saving ? (
                                                <>
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                    جاري الحفظ…
                                                </>
                                            ) : (
                                                <>
                                                    <Save className="h-4 w-4" />
                                                    حفظ التغييرات
                                                </>
                                            )}
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </section>

            {/* خط سفلي متدرّج بألوان الهوية */}
            <div className="absolute inset-x-0 bottom-0">
                <div
                    className="h-[2px] w-full"
                    style={{
                        background: `linear-gradient(90deg, ${BRAND_PRIMARY}, ${BRAND_ACCENT}, ${BRAND_PRIMARY})`,
                    }}
                />
                <div
                    className="h-2 w-full blur-md opacity-35"
                    style={{
                        background: `linear-gradient(90deg, ${BRAND_PRIMARY}66, ${BRAND_ACCENT}55, ${BRAND_PRIMARY}66)`,
                    }}
                />
            </div>
        </div>
    );
}
