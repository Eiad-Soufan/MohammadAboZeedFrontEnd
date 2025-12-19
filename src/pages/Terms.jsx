// src/pages/Terms.jsx
import { motion } from "framer-motion";
import { FileText, Sparkles } from "lucide-react";
import { useEffect } from "react";

export default function Terms() {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    // === Variants (مطابقة لأسلوب الصفحات السابقة) ===
    const fadeUp = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.55 } } };
    const card = {
        hidden: { opacity: 0, y: 14, scale: 0.98 },
        show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 120, damping: 16, mass: 0.7 } },
    };

    return (
        <div dir="rtl" className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white dark:from-gray-950 dark:via-gray-950 dark:to-gray-950">
            {/* =========== HERO =========== */}
            <section className="relative overflow-hidden">
                {/* Blobs بألوان الهوية */}
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
                    style={{ background: "rgba(205,220,45,0.14)" }} // لمسة لايم
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
                        <span>الشروط والأحكام</span>
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
                        الشروط والأحكام
                    </motion.h1>

                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        className="mt-3 max-w-3xl text-sm sm:text-base text-slate-600 dark:text-white/80"
                    >
                        يُرجى قراءة هذه الشروط بعناية؛ إن استخدامك لهذا الموقع يعني موافقتك على الالتزام بها وبأية تحديثات لاحقة.
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
                    {/* شريط علوي تركواز رفيع */}
                    <div
                        className="h-1 w-full rounded-full"
                        style={{ background: "linear-gradient(90deg,#005467,#0A6F82,#CDDC2D)" }}
                    />

                    <div className="mt-6 space-y-10 text-slate-700 dark:text-slate-200">
                        <section id="intro">
                            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
                                <FileText className="h-5 w-5 text-[color:#005467]" />
                                1) مقدّمة
                            </h2>
                            <p className="mt-2">
                                بدخولك أو استخدامك للخدمات، فإنك توافق على الالتزام بهذه الشروط. إذا لم توافق، يُرجى التوقف عن استخدام الموقع.
                            </p>
                        </section>

                        <section id="eligibility">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">2) الأهلية والاستخدام المقبول</h2>
                            <ul className="mt-2 list-disc pr-5 space-y-1">
                                <li>تتعهد باستخدام الخدمات بطريقة قانونية ومسؤولة.</li>
                                <li>يحظر إساءة الاستخدام، أو محاولة الوصول غير المصرّح به، أو تعطيل الخدمة.</li>
                            </ul>
                        </section>

                        <section id="accounts">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">3) الحسابات والأمان</h2>
                            <p className="mt-2">
                                تتحمل مسؤولية سرية بيانات الدخول إلى حسابك، وتوافق على إخطارنا فورًا بأي استخدام غير مصرح به.
                            </p>
                        </section>

                        <section id="content">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">4) المحتوى وحقوق الملكية</h2>
                            <p className="mt-2">
                                جميع المواد المنشورة على الموقع (نصوص، شعارات، تصميمات، صور…) مملوكة لمالك الموقع أو للمرخّصين له، ومحمية بموجب القوانين
                                المعمول بها. لا يجوز إعادة إنتاجها أو استخدامها إلا بإذن خطي مسبق.
                            </p>
                        </section>

                        <section id="payments">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">5) الدفع والاشتراكات</h2>
                            <ul className="mt-2 list-disc pr-5 space-y-1">
                                <li>قد تتضمن بعض الخدمات اشتراكات مدفوعة أو رسومًا إضافية.</li>
                                <li>تخضع الرسوم لسياسات الاسترجاع والضرائب المحلية والدولية حيثما ينطبق.</li>
                            </ul>
                        </section>

                        <section id="third-parties">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">6) الروابط وخدمات الطرف الثالث</h2>
                            <p className="mt-2">
                                قد يحتوي الموقع على روابط لمواقع خارجية لا نتحكم فيها. لسنا مسؤولين عن محتواها أو ممارساتها، ويُرجى مراجعة سياساتها.
                            </p>
                        </section>

                        <section id="disclaimer">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">7) إخلاء المسؤولية</h2>
                            <p className="mt-2">
                                تُقدَّم الخدمات "كما هي" و"حسب التوفر" بدون ضمانات صريحة أو ضمنية. لا نضمن خلو الخدمات من الأخطاء أو الانقطاعات.
                            </p>
                        </section>

                        <section id="liability">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">8) تحديد المسؤولية</h2>
                            <p className="mt-2">
                                في حدود ما يسمح به القانون، لا نتحمل المسؤولية عن أي خسائر غير مباشرة أو عرضية أو تبعية ناجمة عن استخدامك للخدمات.
                            </p>
                        </section>

                        <section id="privacy">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">9) الخصوصية</h2>
                            <p className="mt-2">
                                يُرجى مراجعة سياسة الخصوصية لمعرفة كيفية جمع بياناتك واستخدامها ومشاركتها وحماية خصوصيتك.
                            </p>
                        </section>

                        <section id="termination">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">10) الإنهاء</h2>
                            <p className="mt-2">
                                نحتفظ بحق تعليق أو إنهاء وصولك للخدمات عند مخالفة الشروط أو إساءة الاستخدام أو بأمر قانوني.
                            </p>
                        </section>

                        <section id="governing-law">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">11) القانون المُنظِّم</h2>
                            <p className="mt-2">
                                تخضع هذه الشروط ويفسَّر العمل بها وفق القوانين السارية في الاختصاص القضائي الذي يُعلن على صفحة "عنّا" أو صفحة "الاتصال".
                            </p>
                        </section>

                        <section id="contact">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">12) التواصل</h2>
                            <p className="mt-2">
                                لأي استفسارات بخصوص هذه الشروط، يُرجى التواصل عبر البريد: <a href="mailto:mizeed@gmail.com" className="underline decoration-dotted text-[color:#005467]">mizeed@gmail.com</a>
                            </p>
                        </section>

                        <section id="changes">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">13) التغييرات على الشروط</h2>
                            <p className="mt-2">
                                قد نقوم بتعديل هذه الشروط من وقت لآخر، وسيتم توضيح آخر تحديث أعلى الصفحة. استمرار استخدامك بعد النشر يعني موافقتك على التعديلات.
                            </p>
                        </section>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
