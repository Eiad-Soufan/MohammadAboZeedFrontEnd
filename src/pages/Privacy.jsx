// src/pages/Privacy.jsx
import { motion } from "framer-motion";
import { ShieldCheck, Sparkles } from "lucide-react";
import { useEffect } from "react";

export default function Privacy() {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    // Variants (مطابقة لصفحات About/Terms)
    const fadeUp = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.55 } } };
    const card = {
        hidden: { opacity: 0, y: 14, scale: 0.98 },
        show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 120, damping: 16, mass: 0.7 } },
    };

    return (
        <div dir="rtl" className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white dark:from-gray-950 dark:via-gray-950 dark:to-gray-950">
            {/* =========== HERO =========== */}
            <section className="relative overflow-hidden">
                {/* Blobs بألوان الهوية (تركواز + لايم) */}
                <motion.div
                    aria-hidden
                    className="absolute -top-24 -left-20 h-96 w-96 rounded-full blur-3xl"
                    style={{ background: "rgba(0,84,103,0.16)" }}
                    initial={{ x: -28, y: -18, scale: 0.95, opacity: 0.9 }}
                    animate={{ x: [-28, 18, -10, -28], y: [-18, -6, 8, -18], scale: [0.95, 1, 0.98, 0.95], opacity: [0.9, 1, 0.92, 0.9] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    aria-hidden
                    className="absolute -bottom-16 -right-24 h-80 w-80 rounded-full blur-3xl"
                    style={{ background: "rgba(205,220,45,0.14)" }}
                    initial={{ x: 24, y: 24, scale: 1.04, opacity: 0.75 }}
                    animate={{ x: [24, -8, 12, 24], y: [24, 10, -6, 24], scale: [1.04, 1, 1.02, 1.04], opacity: [0.75, 0.9, 0.82, 0.75] }}
                    transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
                />

                <div className="container mx-auto px-6 pt-16 sm:pt-20 pb-10 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/60 dark:bg-white/5 px-3 py-1 text-xs text-slate-800 dark:text-white/80 backdrop-blur"
                    >
                        <Sparkles className="h-4 w-4" />
                        <span>سياسة الخصوصية</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight md:leading-snug py-1"
                        style={{
                            backgroundImage: "linear-gradient(180deg,#005467 0%,#005467 65%,#004452 100%)",
                            WebkitBackgroundClip: "text",
                            color: "transparent",
                        }}
                    >
                        سياسة الخصوصية
                    </motion.h1>

                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        className="mt-3 max-w-3xl text-sm sm:text-base text-slate-600 dark:text-white/80"
                    >
                        نلتزم بحماية خصوصيتك وبياناتك الشخصية. توضّح هذه السياسة طبيعة البيانات التي نجمعها وكيفية استخدامها ومشاركتها وحمايتها وحقوقك حيالها.
                    </motion.p>
                </div>
            </section>

            {/* =========== المحتوى =========== */}
            <section className="container mx-auto px-6 pb-16">
                <motion.div
                    variants={card}
                    initial="hidden"
                    animate="show"
                    className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-gray-900/60 p-6 sm:p-8"
                >
                    {/* شريط علوي تركواز + لمسة لايم */}
                    <div className="h-1 w-full rounded-full" style={{ background: "linear-gradient(90deg,#005467,#0A6F82,#CDDC2D)" }} />

                    <div className="mt-6 space-y-10 text-slate-700 dark:text-slate-200">
                        {/* 1) البيانات التي نجمعها */}
                        <section id="what-we-collect">
                            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
                                <ShieldCheck className="h-5 w-5 text-[color:#005467]" />
                                1) البيانات التي نجمعها
                            </h2>
                            <ul className="mt-2 list-disc pr-5 space-y-1">
                                <li>بيانات التعريف الأساسية: الاسم، البريد الإلكتروني، رقم الهاتف (عند التسجيل أو التواصل).</li>
                                <li>بيانات الاستخدام: الصفحات التي تزورها، المدد، الجهاز/المتصفح، وملفات تعريف الارتباط (Cookies).</li>
                                <li>بيانات الدفع (إن وُجدت): تُعالج عبر مزوّد دفع موثوق ولا نخزّن بيانات البطاقة كاملة على خوادمنا.</li>
                            </ul>
                        </section>

                        {/* 2) كيف نستخدم بياناتك */}
                        <section id="how-we-use">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">2) كيف نستخدم بياناتك</h2>
                            <ul className="mt-2 list-disc pr-5 space-y-1">
                                <li>تقديم الخدمات وتحسين التجربة وقياس الأداء.</li>
                                <li>إرسال تحديثات مهمة أو مواد تعليمية حسب تفضيلاتك (مع خيار إلغاء الاشتراك).</li>
                                <li>منع الاحتيال والحفاظ على الأمان والامتثال للالتزامات القانونية.</li>
                            </ul>
                        </section>

                        {/* 3) مشاركة البيانات */}
                        <section id="sharing">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">3) مشاركة البيانات</h2>
                            <p className="mt-2">
                                لا نبيع بياناتك الشخصية. قد نشارك حدًا أدنى من البيانات مع مزوّدي الخدمات (الاستضافة، التحليلات، الدفع) لأغراض تشغيلية وبموجب اتفاقيات حماية البيانات.
                            </p>
                        </section>

                        {/* 4) ملفات تعريف الارتباط */}
                        <section id="cookies">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">4) ملفات تعريف الارتباط (Cookies)</h2>
                            <p className="mt-2">
                                نستخدم ملفات كوكيز أساسية وتحليلية لتحسين الأداء وتجربة المستخدم. يمكنك ضبط المتصفح لرفض بعضها؛ قد يؤثر ذلك على بعض الميزات.
                            </p>
                        </section>

                        {/* 5) الأساس القانوني للمعالجة */}
                        <section id="legal-basis">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">5) الأساس القانوني للمعالجة</h2>
                            <p className="mt-2">
                                نعتمد على موافقتك، وتنفيذ العقد، والمصلحة المشروعة، والالتزام القانوني — وفق النظام المطبق في بلدك.
                            </p>
                        </section>

                        {/* 6) حقوقك */}
                        <section id="your-rights">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">6) حقوقك</h2>
                            <ul className="mt-2 list-disc pr-5 space-y-1">
                                <li>الاطلاع على بياناتك أو تصحيحها أو حذفها.</li>
                                <li>سحب الموافقة على المعالجة التسويقية في أي وقت.</li>
                                <li>طلب نسخة من بياناتك القابلة للنقل.</li>
                            </ul>
                            <p className="mt-2">
                                لممارسة حقوقك، راسلنا على:{" "}
                                <a href="mailto:mizeed@gmail.com" className="underline decoration-dotted text-[color:#005467]">
                                    mizeed@gmail.com
                                </a>
                                .
                            </p>
                        </section>

                        {/* 7) الحفظ والأمان */}
                        <section id="security">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">7) تخزين البيانات وأمانها</h2>
                            <p className="mt-2">
                                نطبّق ضوابط تقنية وإجرائية لحماية البيانات من الوصول أو الاستخدام غير المصرّح بهما. نحتفظ بالبيانات للمدد اللازمة للأغراض المذكورة أو حسب ما يقتضيه القانون.
                            </p>
                        </section>

                        {/* 8) نقل البيانات عبر الحدود */}
                        <section id="transfers">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">8) نقل البيانات عبر الحدود</h2>
                            <p className="mt-2">
                                قد تُعالَج بياناتك على خوادم خارج بلد إقامتك. في هذه الحالات، نحرص على وجود ضمانات مناسبة لحماية بياناتك.
                            </p>
                        </section>

                        {/* 9) خصوصية الأطفال */}
                        <section id="children">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">9) خصوصية الأطفال</h2>
                            <p className="mt-2">
                                خدماتنا موجّهة للبالغين. إذا تبيّن لنا جمع بيانات قاصر دون موافقة ولي الأمر، سنتخذ خطوات لحذفها.
                            </p>
                        </section>

                        {/* 10) التحديثات */}
                        <section id="changes">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">10) التحديثات على السياسة</h2>
                            <p className="mt-2">
                                قد نُحدّث هذه السياسة دوريًا. سيُشار إلى آخر تحديث في أعلى الصفحة، ويُعد استمرارك في الاستخدام موافقةً على التعديلات.
                            </p>
                        </section>

                        {/* 11) التواصل */}
                        <section id="contact">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">11) تواصل معنا</h2>
                            <p className="mt-2">
                                لأي طلبات أو استفسارات تتعلق بالخصوصية وحقوقك، راسلنا عبر البريد:{" "}
                                <a href="mailto:mizeed@gmail.com" className="underline decoration-dotted text-[color:#005467]">
                                    mizeed@gmail.com
                                </a>
                                .
                            </p>
                        </section>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
