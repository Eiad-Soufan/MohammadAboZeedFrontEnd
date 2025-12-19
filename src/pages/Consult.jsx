// src/pages/Consult.jsx
import { useEffect } from "react";

export default function Consult() {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <section className="relative overflow-hidden bg-white" dir="rtl">
            {/* طبقة خلفية خفيفة بهوية الألوان */}
            <div aria-hidden className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full blur-3xl"
                    style={{ background: "rgba(0,84,103,0.14)" }} />
                <div className="absolute -bottom-20 -right-24 h-80 w-80 rounded-full blur-3xl"
                    style={{ background: "rgba(205,220,45,0.12)" }} />
            </div>

            <div className="container relative z-10 mx-auto max-w-5xl px-6 py-16 md:py-20">
                {/* العنوان */}
                <div className="mb-8">
                    <span className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/70 px-3 py-1 text-xs text-[#414042] backdrop-blur">
                        نموذج استشارة
                    </span>
                    <h1
                        className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight"
                        style={{
                            fontFamily: "Lyon Arabic Display, system-ui, sans-serif",
                            backgroundImage: "linear-gradient(180deg,#005467 0%,#005467 65%,#004452 100%)",
                            WebkitBackgroundClip: "text",
                            color: "transparent",
                        }}
                    >
                        احجز استشارتك الآن
                    </h1>
                    <p className="mt-2 max-w-2xl text-slate-700">
                        عبِّئ النموذج التالي لنفهم احتياجك بدقة ونجهز لك جلسة مركَّزة تُعطيك أسرع طريق للنتائج.
                    </p>
                </div>

                {/* إطار بطبقة تدرّج رفيعة */}
                <div
                    className="rounded-3xl p-[1px] shadow-[0_30px_80px_-40px_rgba(0,84,103,0.28)]"
                    style={{
                        background:
                            "linear-gradient(135deg, rgba(0,84,103,.18), rgba(205,220,45,.18))",
                    }}
                >
                    <form
                        className="rounded-3xl bg-white/90 backdrop-blur px-6 py-8 md:px-10 md:py-10"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        {/* شبكة الحقول */}
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <Field
                                id="fullName"
                                label="الاسم الكامل"
                                placeholder="اكتب اسمك هنا"
                                required
                            />
                            <Field
                                id="email"
                                type="email"
                                label="البريد الإلكتروني"
                                placeholder="name@example.com"
                                required
                            />
                            <Field
                                id="phone"
                                type="tel"
                                label="رقم الهاتف (اختياري)"
                                placeholder="+9665xxxxxxx"
                            />
                            <Field
                                id="role"
                                label="المسمّى الوظيفي"
                                placeholder="مدير/مؤسس/قائد فريق…"
                            />

                            <Field
                                id="company"
                                label="المنشأة"
                                placeholder="اسم الشركة/المشروع"
                            />

                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:col-span-2">
                                <SelectField
                                    id="topic"
                                    label="موضوع الاستشارة"
                                    options={[
                                        "تحسين تجربة المستخدم UX",
                                        "استراتيجية نمو وتحويل",
                                        "تطوير هوية ورسائل العلامة",
                                        "تحسين الأداء والسرعة",
                                        "بناء منتج MVP",
                                    ]}
                                    placeholder="اختر الموضوع الأقرب"
                                    required
                                />
                                <Field
                                    id="date"
                                    type="date"
                                    label="التاريخ المفضّل"
                                    placeholder=""
                                />
                            </div>

                            <Textarea
                                id="goals"
                                label="هدفك من الجلسة"
                                placeholder="صفْ المشكلة بإيجاز وما النتيجة التي تود الوصول إليها…"
                                rows={5}
                                required
                            />

                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:col-span-2">
                                <SelectField
                                    id="budget"
                                    label="النطاق التقريبي للميزانية (إن وجد)"
                                    options={[
                                        "— لاحقًا",
                                        "أقل من 1,000$",
                                        "1,000$ - 3,000$",
                                        "3,000$ - 7,000$",
                                        "أكثر من 7,000$",
                                    ]}
                                    placeholder="—"
                                />
                                <SelectField
                                    id="urgency"
                                    label="درجة الإلحاح"
                                    options={["عادي", "متوسط", "عاجل"]}
                                    placeholder="اختر"
                                />
                            </div>

                            <Checkbox
                                id="agree"
                                label={
                                    <>
                                        أوافق على{" "}
                                        <a href="/privacy" className="underline decoration-dotted text-[#005467]">
                                            سياسة الخصوصية
                                        </a>{" "}
                                        واستخدام بياناتي لغرض تنظيم الجلسة.
                                    </>
                                }
                                required
                            />
                        </div>

                        {/* زر مطابق للهوية — بدون توصيل فعلي الآن */}
                        <div className="mt-8 flex items-center justify-start">
                            <button
                                type="button"
                                className="relative inline-flex h-12 items-center justify-center rounded-2xl px-8 text-base font-extrabold tracking-tight text-white outline-none select-none"
                                style={{
                                    backgroundImage:
                                        "linear-gradient(135deg, #005467 0%, #0A6F82 60%, #005467 100%)",
                                    boxShadow: "0 24px 72px -28px rgba(0,84,103,0.55)",
                                    border: "1px solid rgba(255,255,255,.18)",
                                }}
                                onClick={() => { }}
                                onMouseDown={(e) => e.currentTarget.animate(
                                    [{ transform: "scale(1)" }, { transform: "scale(0.985)" }, { transform: "scale(1)" }],
                                    { duration: 180, easing: "ease-out" }
                                )}
                            >
                                إرسال الطلب
                                {/* لمسة لايم خفيفة عند الحافة */}
                                <span
                                    aria-hidden
                                    className="pointer-events-none absolute inset-0 rounded-2xl"
                                    style={{
                                        boxShadow:
                                            "inset 0 0 0 1px rgba(255,255,255,.1), 0 0 0 0 rgba(205,220,45,0)",
                                    }}
                                />
                            </button>
                            {/* ملاحظة صغيرة */}
                            <span className="ml-4 text-sm text-[#808285]">
                                (لن نخصم أي مبلغ — سنراجع طلبك ونتواصل معك)
                            </span>
                        </div>
                    </form>
                </div>
            </div>

            {/* خط سفلي متدرّج مثل بقية الأقسام */}
            <div className="relative z-10">
                <div
                    className="h-[2px] w-full"
                    style={{
                        background:
                            "linear-gradient(90deg, rgba(0,84,103,0.9), rgba(205,220,45,0.9), rgba(0,84,103,0.9))",
                    }}
                />
                <div
                    className="h-2 w-full blur-md opacity-35"
                    style={{
                        background:
                            "linear-gradient(90deg, rgba(0,84,103,0.35), rgba(205,220,45,0.25), rgba(0,84,103,0.35))",
                    }}
                />
            </div>
        </section>
    );
}

/* ============== مكوّنات حقول صغيرة أنيقة ============== */

function Field({ id, label, placeholder, type = "text", required }) {
    return (
        <label htmlFor={id} className="block">
            <span className="mb-2 inline-block text-sm font-bold text-[#414042]">{label}{required && " *"}</span>
            <input
                id={id}
                name={id}
                type={type}
                required={required}
                placeholder={placeholder}
                className="w-full rounded-2xl border bg-white/90 px-3 py-3 text-slate-900 outline-none transition"
                style={{
                    borderColor: "rgba(2,6,23,.08)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,.9)",
                }}
                onFocus={(e) => {
                    e.currentTarget.style.borderColor = "rgba(0,84,103,.35)";
                    e.currentTarget.style.boxShadow =
                        "0 10px 30px -20px rgba(0,84,103,.30), inset 0 1px 0 rgba(255,255,255,.9)";
                }}
                onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(2,6,23,.08)";
                    e.currentTarget.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,.9)";
                }}
            />
        </label>
    );
}

function Textarea({ id, label, placeholder, rows = 4, required }) {
    return (
        <label htmlFor={id} className="md:col-span-2 block">
            <span className="mb-2 inline-block text-sm font-bold text-[#414042]">{label}{required && " *"}</span>
            <textarea
                id={id}
                name={id}
                rows={rows}
                required={required}
                placeholder={placeholder}
                className="w-full rounded-2xl border bg-white/90 px-3 py-3 text-slate-900 outline-none transition"
                style={{
                    borderColor: "rgba(2,6,23,.08)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,.9)",
                }}
                onFocus={(e) => {
                    e.currentTarget.style.borderColor = "rgba(0,84,103,.35)";
                    e.currentTarget.style.boxShadow =
                        "0 10px 30px -20px rgba(0,84,103,.30), inset 0 1px 0 rgba(255,255,255,.9)";
                }}
                onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(2,6,23,.08)";
                    e.currentTarget.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,.9)";
                }}
            />
        </label>
    );
}

function SelectField({ id, label, options = [], placeholder = "—", required }) {
    return (
        <label htmlFor={id} className="block">
            <span className="mb-2 inline-block text-sm font-bold text-[#414042]">{label}{required && " *"}</span>
            <div className="relative">
                <select
                    id={id}
                    name={id}
                    required={required}
                    defaultValue=""
                    className="w-full appearance-none rounded-2xl border bg-white/90 px-3 py-3 pr-8 text-slate-900 outline-none transition"
                    style={{
                        borderColor: "rgba(2,6,23,.08)",
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,.9)",
                    }}
                    onFocus={(e) => {
                        e.currentTarget.style.borderColor = "rgba(0,84,103,.35)";
                        e.currentTarget.style.boxShadow =
                            "0 10px 30px -20px rgba(0,84,103,.30), inset 0 1px 0 rgba(255,255,255,.9)";
                    }}
                    onBlur={(e) => {
                        e.currentTarget.style.borderColor = "rgba(2,6,23,.08)";
                        e.currentTarget.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,.9)";
                    }}
                >
                    <option value="" disabled>{placeholder}</option>
                    {options.map((o) => (
                        <option key={o} value={o}>{o}</option>
                    ))}
                </select>

                {/* سهم القائمة */}
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 opacity-60"
                    fill="none"
                    stroke="#005467"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </div>
        </label>
    );
}

function Checkbox({ id, label, required }) {
    return (
        <label htmlFor={id} className="md:col-span-2 mt-1 inline-flex cursor-pointer items-start gap-2">
            <input
                id={id}
                name={id}
                type="checkbox"
                required={required}
                className="h-5 w-5 cursor-pointer appearance-none rounded-md border outline-none transition"
                style={{
                    borderColor: "rgba(2,6,23,.15)",
                    background: "#fff",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,.9)",
                }}
                onChange={(e) => {
                    const el = e.currentTarget;
                    if (el.checked) {
                        el.style.background = "#005467";
                        el.style.borderColor = "#005467";
                    } else {
                        el.style.background = "#fff";
                        el.style.borderColor = "rgba(2,6,23,.15)";
                    }
                }}
            />
            <span className="text-sm text-[#414042]">{label}</span>
        </label>
    );
}
