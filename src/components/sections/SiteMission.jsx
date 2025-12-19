// src/components/sections/SiteMission.jsx
// تصميم مطابق للّقطة المرجعية: فورم تركوازي يسار + صورة الدكتور مع دوائر الهوية يمين

import PORTRAIT from "../../assets/Mohammad AboZeed.png";

const BRAND = {
    primary: "#005467",  // تركوازي
    accent: "#CDDC2D",  // ليموني
    gray: "#808285",
    dark: "#414042",
};

export default function SiteMission() {
    return (
        <section className="relative py-14 sm:py-16 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

                    {/* يسار: بطاقة الاشتراك التركوازية */}
                    <div className="lg:col-span-5">
                        <div
                            className="rounded-[18px] sm:rounded-[22px] p-6 sm:p-7 shadow-xl"
                            style={{
                                background: BRAND.primary,
                                color: "white",
                                boxShadow: "0 30px 70px -30px rgba(0,84,103,.35)",
                            }}
                        >
                            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                                لنصنع شيئًا عظيمًا معًا
                            </h2>

                            <p className="mt-2 text-sm/6 opacity-95">
                                انضم اليوم وابدأ رحلتك بثقة. رسائل بريدية أسبوعية، ملفات عمل،
                                قوالب مختصرة — كلها أفكار عملية وسريعة التطبيق.
                            </p>

                            <form className="mt-5 space-y-3">
                                <input
                                    className="w-full rounded-xl border-0 px-4 py-3 text-slate-900"
                                    placeholder="الاسم"
                                />
                                <input
                                    type="email"
                                    className="w-full rounded-xl border-0 px-4 py-3 text-slate-900"
                                    placeholder="البريد الإلكتروني"
                                />
                                <select className="w-full rounded-xl border-0 px-4 py-3 text-slate-900">
                                    <option>إلى أي مرحلة وصلت؟</option>
                                    <option>أفكّر بمشروع</option>
                                    <option>أطلقت المشروع</option>
                                    <option>أطوّر وأوسّع</option>
                                </select>
                                <select className="w-full rounded-xl border-0 px-4 py-3 text-slate-900">
                                    <option>ما نوع المحتوى الذي تفضّله؟</option>
                                    <option>مقالات مختصرة</option>
                                    <option>فيديوهات تطبيقية</option>
                                    <option>قوالب عملية</option>
                                </select>

                                {/* زر الاشتراك — ليموني مع Hover/Focus */}
                                <button
                                    className="w-full rounded-xl px-4 py-3 font-semibold shadow-md transition transform focus:outline-none focus:ring-2 focus:ring-offset-2"
                                    style={{
                                        background: BRAND.accent,
                                        color: BRAND.dark,
                                        boxShadow: "0 10px 24px -12px rgba(0,0,0,.35)",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "translateY(-2px)";
                                        e.currentTarget.style.background = "#BFD027";
                                        e.currentTarget.style.boxShadow =
                                            "0 16px 30px -12px rgba(0,0,0,.45)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)";
                                        e.currentTarget.style.background = BRAND.accent;
                                        e.currentTarget.style.boxShadow =
                                            "0 10px 24px -12px rgba(0,0,0,.35)";
                                    }}
                                    onFocus={(e) => {
                                        e.currentTarget.style.boxShadow =
                                            "0 16px 30px -12px rgba(0,0,0,.45), 0 0 0 4px rgba(255,255,255,.35)";
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.boxShadow =
                                            "0 10px 24px -12px rgba(0,0,0,.35)";
                                    }}
                                >
                                    اشتراك
                                </button>
                            </form>

                            <p className="mt-3 text-xs opacity-85">
                                بالضغط على اشتراك، يمكنك إلغاء الاشتراك في أي وقت.
                            </p>
                        </div>
                    </div>

                    {/* يمين: صورة الدكتور + عنوان "رسالتي" + نص */}
                    <div className="lg:col-span-7">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                            {/* نص الرسالة (يمين في RTL) */}
                            <div className="lg:col-span-6 text-right order-2 lg:order-1">
                                <h3 className="text-2xl font-extrabold" style={{ color: BRAND.dark }}>
                                    رسالتي:
                                </h3>
                                <p className="mt-3 text-lg leading-8" style={{ color: BRAND.dark }}>
                                    أمضي وقتي وخبرتي لأصنع أداة أقوى وأعمق لروّاد الأعمال. أفكّر وأنبني معك
                                    بمنهجية واضحة وأمانة ومهنية، لنصل إلى نتائج حقيقية قابلة للنمو.
                                </p>
                                <p className="mt-4 font-semibold text-sm" style={{ color: BRAND.primary }}>
                                    د. محمد أبوزيد
                                </p>
                            </div>

                            {/* صورة الدكتور مع دوائر الهوية خلفها */}
                            <div className="lg:col-span-6 order-1 lg:order-2">
                                <div className="relative w-full max-w-[460px] mx-auto">
                                    {/* دائرة ليمونية كبيرة أعلى-يمين */}
                                    <div
                                        className="absolute -top-10 -right-10 h-40 w-40 rounded-full"
                                        style={{ background: BRAND.accent }}
                                    />
                                    {/* دائرة تركوازية أسفل-يسار */}
                                    <div
                                        className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full"
                                        style={{ background: BRAND.primary, opacity: 0.95 }}
                                    />
                                    {/* صورة الدكتور */}
                                    <img
                                        src={PORTRAIT}
                                        alt="Mohammad AboZeed"
                                        className="relative z-10 w-full rounded-[24px] shadow-2xl object-contain bg-transparent"
                                        style={{ aspectRatio: "3 / 4" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
