// src/pages/About.jsx
import { motion } from "framer-motion";
import {
    BadgeCheck,
    Briefcase,
    GraduationCap,
    Instagram,
    Mail,
    MapPin,
    Phone,
    Sparkles,
} from "lucide-react";
import { useEffect } from "react";

export default function About() {
    useEffect(function () {
        window.scrollTo(0, 0);
    }, []);

    // ===== Variants (حركات احترافية، متوافقة) =====
    const fadeUp = {
        hidden: { opacity: 0, y: 22 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };
    const heroRise = {
        hidden: { opacity: 0, y: 18 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.05 } },
    };
    const list = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
    };
    const item = {
        hidden: { opacity: 0, y: 14 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };
    const card = {
        hidden: { opacity: 0, y: 18, scale: 0.98 },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: "spring", stiffness: 120, damping: 16, mass: 0.6 },
        },
    };

    return (
        <div
            dir="rtl"
            className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white dark:from-gray-950 dark:via-gray-950 dark:to-gray-950"
        >
            {/* ===== HERO مع خلفية حيّة (Blobs متحركة) ===== */}
            <section className="relative overflow-hidden">
                {/* Blobs: ألوان الهوية الجديدة */}
                <motion.div
                    aria-hidden
                    className="absolute -top-24 -left-24 h-96 w-96 rounded-full blur-3xl"
                    style={{ background: "rgba(0,84,103,0.15)" }} // #005467/15
                    initial={{ x: -30, y: -30, scale: 0.95, opacity: 0.8 }}
                    animate={{
                        x: [-30, 20, -10, -30],
                        y: [-30, -10, 10, -30],
                        scale: [0.95, 1, 0.98, 0.95],
                        opacity: [0.8, 1, 0.9, 0.8],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    aria-hidden
                    className="absolute -bottom-20 -right-24 h-80 w-80 rounded-full blur-3xl"
                    style={{ background: "rgba(205,220,45,0.16)" }} // #CDDC2D/16 لمسة ليموني
                    initial={{ x: 30, y: 30, scale: 1.05, opacity: 0.7 }}
                    animate={{
                        x: [30, -10, 10, 30],
                        y: [30, 10, -10, 30],
                        scale: [1.05, 0.98, 1.02, 1.05],
                        opacity: [0.7, 0.9, 0.8, 0.7],
                    }}
                    transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
                />

                <div className="container mx-auto px-6 pt-16 sm:pt-20 pb-8 sm:pb-10 relative">
                    {/* شارة صغيرة */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55 }}
                        className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/50 dark:bg-white/5 px-3 py-1 text-xs text-slate-800 dark:text-white/80 backdrop-blur"
                    >
                        <Sparkles className="h-4 w-4" />
                        <span>عنّي</span>
                    </motion.div>

                    {/* العنوان الرئيسي — تدرّج تركواز */}
                    <motion.h1
                        variants={heroRise}
                        initial="hidden"
                        animate="show"
                        className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight md:leading-snug py-1"
                        style={{
                            backgroundImage:
                                "linear-gradient(180deg,#005467,#005467 62%,#004452)",
                            WebkitBackgroundClip: "text",
                            color: "transparent",
                        }}
                    >
                        د. محمد أبو زيد
                    </motion.h1>

                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        className="mt-3 max-w-3xl text-sm sm:text-base text-slate-600 dark:text-white/80"
                    >
                        خبير استراتيجي ومستشار قيادي ومدرب مهارات قيادية؛ خبرة واسعة في تمكين المؤسسات الحكومية والخاصة
                        عبر التخطيط الاستراتيجي، قيادة التحول، تطوير السياسات، تحسين العمليات وبناء القدرات.
                    </motion.p>

                    {/* روابط التواصل — شارات بهوية اللون */}
                    <motion.ul
                        variants={list}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.3 }}
                        className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
                    >
                        {/* بريد */}
                        <motion.li variants={item}>
                            <a
                                href="mailto:mizeed@gmail.com"
                                className="group block rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-gray-900/60 shadow-sm hover:shadow-md transition"
                            >
                                <div className="flex items-center gap-3 px-3 py-3">
                                    <span
                                        className="inline-grid h-8 w-8 place-items-center rounded-xl dark:bg-white/10 dark:text-white"
                                        style={{ background: "rgba(0,84,103,0.10)", color: "#005467" }}
                                    >
                                        <Mail className="h-4 w-4" />
                                    </span>
                                    <span className="text-sm text-slate-800 dark:text-white group-hover:opacity-90">
                                        mizeed@gmail.com
                                    </span>
                                </div>
                            </a>
                        </motion.li>

                        {/* إنستغرام */}
                        <motion.li variants={item}>
                            <a
                                href="https://www.instagram.com/abozeedmoh"
                                target="_blank"
                                rel="noreferrer"
                                className="group block rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-gray-900/60 shadow-sm hover:shadow-md transition"
                            >
                                <div className="flex items-center gap-3 px-3 py-3">
                                    <span
                                        className="inline-grid h-8 w-8 place-items-center rounded-xl dark:bg-white/10 dark:text-white"
                                        style={{ background: "rgba(0,84,103,0.10)", color: "#005467" }}
                                    >
                                        <Instagram className="h-4 w-4" />
                                    </span>
                                    <span className="text-sm text-slate-800 dark:text-white group-hover:opacity-90">
                                        abozeedmoh
                                    </span>
                                </div>
                            </a>
                        </motion.li>

                        {/* هاتف */}
                        <motion.li variants={item}>
                            <div className="group rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-gray-900/60 shadow-sm hover:shadow-md transition">
                                <div className="flex items-center gap-3 px-3 py-3">
                                    <span
                                        className="inline-grid h-8 w-8 place-items-center rounded-xl dark:bg-white/10 dark:text-white"
                                        style={{ background: "rgba(0,84,103,0.10)", color: "#005467" }}
                                    >
                                        <Phone className="h-4 w-4" />
                                    </span>
                                    <span className="text-sm text-slate-800 dark:text-white group-hover:opacity-90">
                                        +60 17 705 0968
                                    </span>
                                </div>
                            </div>
                        </motion.li>

                        {/* موقع */}
                        <motion.li variants={item}>
                            <div className="group rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-gray-900/60 shadow-sm hover:shadow-md transition">
                                <div className="flex items-center gap-3 px-3 py-3">
                                    <span
                                        className="inline-grid h-8 w-8 place-items-center rounded-xl dark:bg-white/10 dark:text-white"
                                        style={{ background: "rgba(0,84,103,0.10)", color: "#005467" }}
                                    >
                                        <MapPin className="h-4 w-4" />
                                    </span>
                                    <span className="text-sm text-slate-800 dark:text-white group-hover:opacity-90">
                                        كوالالمبور، ماليزيا
                                    </span>
                                </div>
                            </div>
                        </motion.li>
                    </motion.ul>
                </div>
            </section>

            {/* ===== نبذة + تركيز/لغات (بطاقات) ===== */}
            <section className="container mx-auto px-6 py-10 sm:py-14">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* ===== بطاقة النبذة ===== */}
                    <motion.div
                        variants={card}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        className="lg:col-span-2 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-gray-900/60 p-6 sm:p-8"
                    >
                        {/* عنوان + خط تركواز يتمدّد */}
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">نبذة</h2>
                        </div>

                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            className="mt-3 h-px"
                            style={{
                                background:
                                    "linear-gradient(to left, #005467 0%, #005467 65%, rgba(0,84,103,0))",
                            }}
                        />

                        <p className="mt-4 text-sm leading-7 text-slate-700 dark:text-slate-200">
                            أعمل على تمكين القيادات ورفع كفاءة الفرق عبر نقل المعرفة وتوطين المهارات لراسمي السياسات وصنّاع القرار،
                            مع قدرة عالية على العمل في بيئات متعددة الثقافات وسريعة التغيّر. أؤمن بأن القيادة الفعّالة هي التقاء الرؤية
                            الاستراتيجية مع بناء الشراكات والعلاقات التي تخدم الأهداف الوطنية والتنموية.
                        </p>
                    </motion.div>

                    {/* ===== عمود البطاقات — مجالات التركيز + اللغات ===== */}
                    <div className="space-y-6">
                        {/* مجالات التركيز */}
                        <motion.div
                            variants={card}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.2 }}
                            className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-gray-900/60 p-4 sm:p-5"
                        >
                            {/* شارة عنوان */}
                            <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-gray-900/60 px-3 py-1">
                                <span
                                    className="h-2 w-2 rounded-full"
                                    style={{ background: "#CDDC2D" }}
                                />
                                <span className="text-xs font-semibold text-slate-800 dark:text-white">
                                    مجالات التركيز
                                </span>
                            </div>

                            <div className="mt-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-gray-900/60 p-4">
                                <ul className="space-y-3">
                                    {[
                                        "الاستراتيجية المؤسسية والتخطيط الاستراتيجي",
                                        "قيادة التحول، تحسين العمليات، وبناء القدرات",
                                        "التدريب التنفيذي ونقل المعرفة",
                                    ].map((txt, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span
                                                className="mt-1 h-5 w-5 rounded-full inline-grid place-items-center"
                                                style={{ background: "rgba(0,84,103,0.10)", color: "#005467" }}
                                            >
                                                {/* أيقونة صح صغيرة برسمة CSS بسيطة */}
                                                <span className="block h-2 w-2 border-b-2 border-r-2 border-current rotate-45 translate-y-[1px]" />
                                            </span>
                                            <span className="text-sm text-slate-700 dark:text-slate-200">
                                                {txt}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                        {/* اللغات */}
                        <motion.div
                            variants={card}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.2 }}
                            className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-gray-900/60 p-4 sm:p-5"
                        >
                            <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-gray-900/60 px-3 py-1">
                                <span
                                    className="h-2 w-2 rounded-full"
                                    style={{ background: "#CDDC2D" }}
                                />
                                <span className="text-xs font-semibold text-slate-800 dark:text-white">
                                    اللغات
                                </span>
                            </div>

                            <div className="mt-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-gray-900/60 p-4">
                                <ul className="space-y-3">
                                    {[
                                        "العربية (اللغة الأم)",
                                        "الإنجليزية (بطلاقة)",
                                        "الماليزية (ممتاز)",
                                    ].map((txt, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span
                                                className="mt-1 h-5 w-5 rounded-full inline-grid place-items-center"
                                                style={{ background: "rgba(0,84,103,0.10)", color: "#005467" }}
                                            >
                                                <span className="block h-2 w-2 border-b-2 border-r-2 border-current rotate-45 translate-y-[1px]" />
                                            </span>
                                            <span className="text-sm text-slate-700 dark:text-slate-200">
                                                {txt}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ===== الخبرة (خط زمني تفاعلي) ===== */}
            <section className="container mx-auto px-6 pb-10">
                <motion.div
                    variants={card}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-gray-900/60 p-6 sm:p-8"
                >
                    <div className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5" />
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                            الخبرة والخدمات
                        </h2>
                    </div>

                    <div className="relative mt-6">
                        {/* خط زمني متحرك */}
                        <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: "100%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                            className="absolute right-3 top-0 w-0.5"
                            style={{ background: "rgba(0,84,103,0.60)", borderRadius: 2 }}
                        />
                        <div className="space-y-6 pl-0 pr-10">
                            {/* بند 1 */}
                            <motion.div
                                variants={item}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, amount: 0.3 }}
                                className="relative rounded-2xl border border-slate-200 dark:border-slate-700 p-4 hover:shadow-md transition"
                            >
                                <span
                                    className="absolute right-0 top-4 -mr-[7px] h-3 w-3 rounded-full"
                                    style={{ background: "#005467" }}
                                />
                                <h3 className="font-semibold text-slate-900 dark:text-white">
                                    مستشار أعمال وتخطيط استراتيجي
                                </h3>
                                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                                    2010 – حتى الآن — ماليزيا، كوالالمبور
                                </p>
                                <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
                                    تقديم استشارات في الاستراتيجية والثقافة المؤسسية، والمساهمة في صياغة وتنفيذ استراتيجيات تطويرية لجهات في الإمارات والسعودية وماليزيا،
                                    مع تعزيز قدرات الشركات على التوسع والاستدامة طويلة الأمد.
                                </p>
                            </motion.div>

                            {/* بند 2 */}
                            <motion.div
                                variants={item}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, amount: 0.3 }}
                                className="relative rounded-2xl border border-slate-200 dark:border-slate-700 p-4 hover:shadow-md transition"
                            >
                                <span
                                    className="absolute right-0 top-4 -mr-[7px] h-3 w-3 rounded-full"
                                    style={{ background: "#005467" }}
                                />
                                <h3 className="font-semibold text-slate-900 dark:text-white">
                                    مدرب محترف
                                </h3>
                                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                                    2010 – حتى الآن
                                </p>
                                <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
                                    تدريب رواد الأعمال والمؤسسات الحكومية والخاصة في المهارات الإدارية والقيادية وبناء نموذج العمل.
                                </p>
                                <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-200 list-disc pr-5">
                                    <li>وزارة الدفاع العمانية • المجلس الأعلى للقضاء في عُمان • المراسم الملكية السعودية</li>
                                    <li>وزارة الاقتصاد العُمانية • الهيئة العامة السعودية للمؤتمرات والمعارض • صندوق تنمية الموارد البشرية</li>
                                    <li>جامعة الإمارات • الجامعة الخليجية بالبحرين • IIUM ماليزيا • الكلية التقنية بالمصنعة • OMIFCO • WAMY</li>
                                </ul>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* ===== التعليم والاعتمادات ===== */}
            <section className="container mx-auto px-6 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* التعليم */}
                    <motion.div
                        variants={card}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.25 }}
                        whileHover={{ rotateX: 2, rotateY: -2, translateY: -2 }}
                        transition={{ type: "spring", stiffness: 120, damping: 14 }}
                        className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-gray-900/60 p-6 sm:p-8"
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        <div className="flex items-center gap-2">
                            <GraduationCap className="h-5 w-5" />
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                المؤهلات الأكاديمية
                            </h2>
                        </div>
                        <ul className="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-200">
                            <li>دكتوراه في الهندسة الكهربائية — جامعة التكنولوجيا، ماليزيا (2022)</li>
                            <li>ماجستير في الهندسة الإلكترونية والاتصالات — جامعة المالايا، ماليزيا (2017)</li>
                            <li>بكالوريوس هندسة الحاسوب — جامعة العلوم التطبيقية والاجتماعية، اليمن (2005)</li>
                        </ul>
                    </motion.div>

                    {/* الاعتمادات */}
                    <motion.div
                        variants={card}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.25 }}
                        whileHover={{ rotateX: -2, rotateY: 2, translateY: -2 }}
                        transition={{ type: "spring", stiffness: 120, damping: 14 }}
                        className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-gray-900/60 p-6 sm:p-8"
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        <div className="flex items-center gap-2">
                            <BadgeCheck className="h-5 w-5" />
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                الاعتمادات المهنية
                            </h2>
                        </div>
                        <ul className="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-200">
                            <li>محترف مؤشرات الأداء الرئيسية (KPI) — مؤسسة KPI أستراليا (2022)</li>
                            <li>مدرب محترف معتمد — الإبداع الخليجي (2018) والمجلس الخليجي للتنمية البشرية (2017)</li>
                            <li>ماستيري أكاديمي (بريطانيا، 2019) • إجازة خطية من د. طارق السويدان (2017) • المركز الكندي العالمي (2017)</li>
                        </ul>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
