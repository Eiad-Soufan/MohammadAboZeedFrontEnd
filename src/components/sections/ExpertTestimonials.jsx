// src/components/sections/ExpertsTestimonials.jsx
import { motion, useInView } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef } from "react";
import expertsicon from "../../assets/expertsicon.png"; // أيقونة قسم شهادات الخبراء

const BORDER_SOFT = "1px solid rgba(2,6,23,.08)";

/* ألوان الهوية */
const BRAND_PRIMARY = "#005467"; // teal
const BRAND_ACCENT = "#CDDC2D";   // lime

/* ✅ أبعاد موحّدة للكروت (مستطيل احترافي) */
const CARD_SIZE = {
    w: 280,
    h: 170,
};

/* بيانات افتراضية */
const DEFAULT_ITEMS = [
    { name: "سعاد القيوضيه", title: "إدارية – وزارة الدفاع", quote: "تجربة مختلفة  الأسلوب الهادئ والعميق في طرح الدورات جعلني أرى عملي من زاوية جديدة تمامًا.", avatar: "https://cdn4.iconfinder.com/data/icons/professions-2-2/151/88-512.png" },
    { name: "فهد المنجي", title: "مهندس – الخدمات الهندسية", quote: "الدكتور  لا يقدم دورة عادية، بل يزرع طريقة تفكير جديدة. أصبحت قراراتي المهنية أكثر نضجًا وثقة.", avatar: "https://wallpapers.com/images/hd/professional-profile-pictures-1080-x-1080-460wjhrkbwdcp1ig.jpg" },
    { name: "حمود العامري", title: "مهندس – وزارة الدفاع", quote: "أسلوب راقٍ ومحتوى ثري؛ كل دقيقة في الدورة كانت استثمارًا حقيقيًا في تطوير الذات والقيادة.", avatar: "https://imgcdn.stablediffusionweb.com/2025/1/24/6873f129-24a9-43bd-bc6b-f44723d1c023.jpg" },
    { name: "علي الهاشمي", title: "مدير مشاريع", quote: "بعد حضور الدورة أصبحت أكثر وعيًا بمسؤولياتي، وأكثر توازنًا في التعامل مع فريقي.", avatar: "https://profile-images.xing.com/images/6c79813b9ae42639374e8e8f2823bc35-4/umer-awan.1024x1024.jpg" },
    { name: "مها الأنصاري", title: "أخصائية تطوير إداري", quote: "الدورات ثرية بالمضمون. خرجت منها بطاقة إيجابية ورؤية أوضح لمساري المهني.", avatar: "https://cdn4.iconfinder.com/data/icons/professions-2-2/151/88-512.png" },
    { name: "نورة البلوشي", title: "مديرة موارد بشرية", quote: "تجربة محفّزة وملهمة، جعلتني أؤمن أن التغيير يبدأ من الداخل قبل أي خطوة إدارية.", avatar: "https://cdn4.iconfinder.com/data/icons/professions-2-2/151/88-512.png" },
    { name: "محمد السالم", title: "خبير إداري", quote: "أسلوب يجمع بين الاحتراف والإنسانية، مما يجعل كل مفهوم إداري ينبض بالحياة.", avatar: "https://s41721.pcdn.co/wp-content/uploads/2024/12/Sheraz-Ahmed-Photo.jpg" },
    { name: "ابتسام العوفي", title: "مديرة تطوير قيادي", quote: "تغيّرت نظرتي للقيادة بالكامل، أصبحت أتعامل بثقة وهدوء في أصعب المواقف.", avatar: "https://cdn4.iconfinder.com/data/icons/professions-2-2/151/88-512.png" },
    { name: "راشد العتيبي", title: "مستشار موارد بشرية", quote: "طريقة فريدة في التوجيه والتحفيز، شعرت أنني أتلقى تدريبًا يخصني وحدي رغم عدد الحضور.", avatar: "https://www.shutterstock.com/image-photo/positive-handsome-arabic-businessman-beard-600nw-2510267591.jpg" },
    { name: "شيخة الهاجري", title: "مديرة قسم الجودة", quote: "من أروع الدورات التي حضرتها، منهجية منظمة، محتوى ثري، ومدرّب ملهم في كل كلمة.", avatar: "https://cdn4.iconfinder.com/data/icons/professions-2-2/151/88-512.png" },
];

/* بطاقة — بحجم مستطيل موحّد ومحترف */
function TestimonialCard({ item, size = CARD_SIZE }) {
    return (
        <article
            className="group"
            style={{
                width: `${size.w}px`,
                height: `${size.h}px`,
                opacity: "var(--op,1)",
                filter: "var(--blur, blur(0px))",
                transition: "opacity .45s ease, filter .45s ease",
            }}
            tabIndex={0}
        >
            <div
                className="rounded-2xl p-[1px]"
                style={{
                    background: "linear-gradient(135deg, rgba(0,84,103,.14), rgba(3,113,135,.14))",
                    boxShadow: "0 26px 110px -64px rgba(0,84,103,.22)",
                    transition: "transform .3s ease, box-shadow .45s ease",
                }}
            >
                <div
                    className="relative rounded-2xl overflow-hidden bg-white"
                    style={{
                        border: BORDER_SOFT,
                        backgroundImage: `
              linear-gradient(180deg, rgba(0,84,103,.03), rgba(0,84,103,0) 26%),
              linear-gradient(90deg, rgba(205,220,45,.04), rgba(205,220,45,0) 32%)
            `,
                        transition:
                            "transform .3s ease, box-shadow .45s ease, background .35s ease, border-color .35s ease",
                    }}
                    onMouseMove={(e) => {
                        const el = e.currentTarget, r = el.getBoundingClientRect();
                        const cx = (e.clientX - r.left) / r.width - 0.5;
                        const cy = (e.clientY - r.top) / r.height - 0.5;
                        const host = el.parentElement;
                        if (host) {
                            host.style.setProperty("--rx", `${-(cy * 4)}deg`);
                            host.style.setProperty("--ry", `${cx * 6}deg`);
                        }
                    }}
                    onMouseLeave={(e) => {
                        const host = e.currentTarget.parentElement;
                        if (host) {
                            host.style.setProperty("--rx", `0deg`);
                            host.style.setProperty("--ry", `0deg`);
                        }
                    }}
                >
                    {/* شريط علوي نحيف */}
                    <div
                        aria-hidden
                        className="h-1 w-full"
                        style={{
                            background: `linear-gradient(90deg, ${BRAND_PRIMARY}50, ${BRAND_ACCENT}B3)`,
                        }}
                    />

                    {/* الرأس */}
                    <div className="flex items-center gap-3 p-4" dir="rtl">
                        <img
                            src={item.avatar}
                            alt={item.name}
                            className="h-11 w-11 rounded-full object-cover ring-2 ring-slate-100"
                        />
                        <div className="min-w-0">
                            <h3 className="truncate text-[14.5px] font-extrabold text-slate-900">
                                {item.name}
                            </h3>
                            <p className="truncate text-[12px] font-semibold text-slate-500">
                                {item.title}
                            </p>
                        </div>
                    </div>

                    {/* فاصل */}
                    <div
                        aria-hidden
                        style={{
                            height: 1,
                            background:
                                "linear-gradient(90deg, rgba(2,6,23,.06), rgba(2,6,23,.08) 50%, rgba(2,6,23,.06))",
                        }}
                    />

                    {/* المتن */}
                    <div className="px-4 pb-4 pt-3" dir="rtl">
                        {/* حاوية ثابتة الارتفاع للنص */}
                        <div
                            style={{
                                minHeight: 60,          // حوالي 3 أسطر بخط 13.25px و leading-6
                                display: "flex",
                                alignItems: "flex-start",
                            }}
                        >
                            <blockquote
                                className="text-[13.25px] leading-6 text-slate-700"
                                style={{
                                    display: "-webkit-box",
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                }}
                            >
                                “{item.quote}”
                            </blockquote>
                        </div>

                        <div
                            className="mt-3 h-1 w-20 rounded-full"
                            style={{
                                background: `linear-gradient(90deg, ${BRAND_PRIMARY}33, ${BRAND_ACCENT}AA)`,
                            }}
                        />
                    </div>


                    <style>{`
            .group:hover > div,
            .group:focus-visible > div{
              transform: translateY(-8px);
              box-shadow: 0 46px 140px -64px rgba(0,84,103,.28);
            }
            .group:hover > div > div,
            .group:focus-visible > div > div{
              background-color: rgba(255,255,255,.99);
              border-color: rgba(2,6,23,.12);
            }
            @media (prefers-reduced-motion: reduce){
              .group:hover > div,
              .group:focus-visible > div{ transform:none; }
            }
          `}</style>
                </div>
            </div>
        </article>
    );
}

/* الحلقة الدوّارة */
function RingCarousel({
    items,
    inView,
    speed = 16,
    size = CARD_SIZE,
    radius = 440,
    tiltDeg = 8,
    introDuration = 900,
    introStagger = 70,
}) {
    const stageRef = useRef(null);
    const wrapRefs = useRef([]);
    const faceRefs = useRef([]);

    const hoveredRef = useRef(false);
    const introRunningRef = useRef(false);
    const rafRef = useRef(0);
    const angleRef = useRef(0);
    const velRef = useRef(0);
    const lastTsRef = useRef(0);
    const timersRef = useRef([]);

    const draggingRef = useRef(false);
    const lastXRef = useRef(0);

    const N = items.length;
    const stepAngle = useMemo(() => 360 / Math.max(N, 1), [N]);

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);

    const snapAngleToFront = useCallback(() => {
        const step = stepAngle;
        angleRef.current = Math.round(angleRef.current / step) * step;
        if (stageRef.current) {
            stageRef.current.style.transform = `rotateX(${-tiltDeg}deg) rotateY(${angleRef.current}deg)`;
        }
    }, [stepAngle, tiltDeg]);

    const runIntro = useCallback(() => {
        introRunningRef.current = true;
        timersRef.current.forEach(clearTimeout);
        timersRef.current = [];

        hoveredRef.current = true;
        snapAngleToFront();

        wrapRefs.current.forEach((el) => {
            if (!el) return;
            el.style.opacity = "0";
            el.style.filter = "blur(10px)";
            el.style.setProperty("--r", `${radius * 0.6}px`);
        });
        faceRefs.current.forEach((face) => {
            if (!face) return;
            face.style.setProperty("--sc", "0.96");
        });

        const t0 = performance.now();
        const total = introDuration;

        const animate = () => {
            const now = performance.now();
            const p = Math.min(1, (now - t0) / total);
            const k = easeOutQuint(p);
            const k2 = easeOutCubic(p);

            wrapRefs.current.forEach((el, i) => {
                if (!el) return;
                const delay = Math.min(0.8, (i * introStagger) / total);
                const pp = Math.min(1, Math.max(0, (p - delay) / (1 - delay)));
                const kk = easeOutQuint(pp);

                const rNow = radius * (0.6 + 0.4 * kk);
                el.style.setProperty("--r", `${rNow}px`);
                el.style.opacity = String(kk);
                el.style.filter = `blur(${(1 - kk) * 8}px)`;
            });

            faceRefs.current.forEach((face) => {
                if (!face) return;
                const sc = 0.96 + 0.04 * k2;
                face.style.transform = `
          translate3d(-50%, -50%, 0)
          rotateX(var(--rx,0deg))
          rotateY(0deg)
          scale(${sc})
        `;
            });

            if (p < 1) requestAnimationFrame(animate);
            else {
                introRunningRef.current = false;
                hoveredRef.current = false;
            }
        };

        requestAnimationFrame(animate);
    }, [introDuration, introStagger, radius, snapAngleToFront]);

    useEffect(() => { runIntro(); }, [runIntro, N]);
    useEffect(() => { if (inView) runIntro(); }, [inView, runIntro]);

    const tick = useCallback((ts) => {
        if (!lastTsRef.current) lastTsRef.current = ts;
        const dt = Math.min(0.05, (ts - lastTsRef.current) / 1000);
        lastTsRef.current = ts;

        const base = inView && !hoveredRef.current && !introRunningRef.current ? speed : 0;
        velRef.current *= 0.92;
        angleRef.current += (base + velRef.current) * dt;

        const a = angleRef.current;
        if (stageRef.current) {
            stageRef.current.style.transform = `rotateX(${-tiltDeg}deg) rotateY(${a}deg)`;
        }

        const step = stepAngle;
        faceRefs.current.forEach((face, i) => {
            if (!face) return;
            const theta = a + i * step;
            face.style.transform = `
        translate3d(-50%, -50%, 0)
        rotateX(var(--rx,0deg))
        rotateY(calc(-1deg * ${theta}))
        scale(var(--sc,1))
      `;
        });

        rafRef.current = requestAnimationFrame(tick);
    }, [inView, speed, tiltDeg, stepAngle]);

    useEffect(() => {
        rafRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafRef.current);
    }, [tick]);

    const onMouseDown = (e) => {
        draggingRef.current = true;
        lastXRef.current = e.clientX;
        document.body.style.userSelect = "none";
        document.body.style.cursor = "grabbing";
    };
    const onMouseMove = (e) => {
        if (!draggingRef.current) return;
        const dx = e.clientX - lastXRef.current;
        lastXRef.current = e.clientX;
        velRef.current += dx * 0.6;
    };
    const onMouseUp = () => {
        draggingRef.current = false;
        document.body.style.userSelect = "";
        document.body.style.cursor = "";
    };
    const onWheel = (e) => {
        const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        velRef.current += -d * 0.25;
    };

    return (
        <div
            className="relative"
            style={{
                height: 360,
                overflow: "visible",
                perspective: "1300px",
            }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={() => { onMouseUp(); hoveredRef.current = false; }}
            onWheel={onWheel}
            onMouseEnter={() => { hoveredRef.current = true; }}
            onMouseOut={(e) => {
                const root = e.currentTarget;
                if (!root.contains(e.relatedTarget)) hoveredRef.current = false;
            }}
        >
            <div
                ref={stageRef}
                className="absolute inset-0 will-change-transform"
                style={{ transformStyle: "preserve-3d", transition: "transform .15s" }}
            >
                {items.map((it, i) => {
                    const angle = i * stepAngle;
                    return (
                        <div
                            key={i}
                            className="absolute left-1/2 top-1/2 will-change-transform"
                            style={{
                                transformStyle: "preserve-3d",
                                transform: `
                  translate3d(-50%, -50%, 0)
                  rotateY(${angle}deg)
                  translateZ(var(--r, ${radius}px))
                `,
                                transition:
                                    "transform .8s cubic-bezier(.2,.7,.2,1), opacity .45s, filter .45s",
                            }}
                            ref={(el) => (wrapRefs.current[i] = el)}
                        >
                            <div
                                className="absolute left-1/2 top-1/2"
                                style={{ transformStyle: "preserve-3d" }}
                                ref={(el) => (faceRefs.current[i] = el)}
                            >
                                <TestimonialCard item={it} size={CARD_SIZE} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

/* — القسم الرئيسي — */
export default function ExpertsTestimonials({
    title = "شهادات من الخبراء",
    items = DEFAULT_ITEMS,
}) {
    const sectionRef = useRef(null);
    const inView = useInView(sectionRef, {
        amount: 0.35,
        margin: "-10% 0px -10% 0px",
        once: false,
    });

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-white pt-14 pb-20 md:pt-16 md:pb-24 text-slate-900"
            dir="rtl"
        >
            <div className="container relative z-10 mx-auto max-w-7xl px-6">
                <div className="mb-10 flex items-end justify-between gap-4">
                    <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight">
                        {title}
                    </h2>
                    <img
                        src={expertsicon}
                        alt="أيقونة القسم"
                        className="h-11 w-11 md:h-14 md:w-14 object-contain"
                        loading="lazy"
                        decoding="async"
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 14, scale: 0.99 }}
                    animate={
                        inView
                            ? { opacity: 1, y: 0, scale: 1 }
                            : { opacity: 0, y: 14, scale: 0.99 }
                    }
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                    <RingCarousel
                        items={items}
                        inView={inView}
                        speed={16}
                        size={CARD_SIZE}
                        radius={440}
                        tiltDeg={8}
                        introDuration={900}
                        introStagger={70}
                    />
                </motion.div>
            </div>
        </section>
    );
}
