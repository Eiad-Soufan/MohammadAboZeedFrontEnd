// src/pages/Contact.jsx
export default function Contact() {
    return (
        <section className="relative w-full overflow-hidden bg-white" dir="rtl">
            {/* شريط علوي أنيق بعرض كامل */}
            <div className="relative">
                <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16 py-14">
                    <h1
                        className="font-extrabold tracking-tight text-4xl md:text-5xl"
                        style={{
                            backgroundImage:
                                "linear-gradient(180deg, #005467 0%, #005467 62%, #003C48 100%)",
                            WebkitBackgroundClip: "text",
                            backgroundClip: "text",
                            color: "transparent",
                            lineHeight: 1.15,
                        }}
                    >
                        تواصل
                    </h1>
                    <p
                        className="mt-4 text-base sm:text-lg max-w-2xl"
                        style={{ color: "#808285" }}
                    >
                        يسعدنا تواصلك لأي استفسار أو تعاون. اختر الطريقة المناسبة لك من الخيارات التالية.
                    </p>
                </div>

                {/* خلفية لطيفة بخامة هوية: بقع radial + شبكة خفيفة */}
                <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-10"
                    style={{
                        background:
                            "radial-gradient(900px 420px at 86% 8%, rgba(0,84,103,0.10), transparent 60%), radial-gradient(700px 360px at 10% 80%, rgba(205,220,45,0.12), transparent 60%)",
                        maskImage:
                            "radial-gradient(100% 100% at 50% 50%, #000 72%, transparent 100%)",
                        WebkitMaskImage:
                            "radial-gradient(100% 100% at 50% 50%, #000 72%, transparent 100%)",
                    }}
                />
            </div>

            {/* شبكة بطاقات التواصل */}
            <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16 pb-18">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {/* البريد */}
                    <ContactCard
                        title="البريد الإلكتروني"
                        subtitle="نرد خلال 24–48 ساعة عمل"
                        value="info@abozeed.com"
                        href="mailto:info@abozeed.com"
                        type="email"
                    />

                    {/* الجوال */}
                    <ContactCard
                        title="الجوال"
                        subtitle="للاستفسارات العاجلة"
                        value="+6011-11110505"
                        href="tel:+601111110505"
                        type="phone"
                    />

                    {/* إنستغرام */}
                    <ContactCard
                        title="إنستغرام"
                        subtitle="أحدث المنشورات والتحديثات"
                        value="@abozeedmoh"
                        href="https://instagram.com/abozeedmoh"
                        type="instagram"
                    />
                </div>
            </div>

            {/* ستايل داخلي للهوية والهوفر */}
            <style>{`
        .c-card{
          position: relative;
          border-radius: 1.25rem; /* rounded-2xl */
          background: #fff;
          border: 1px solid rgba(2,6,23,.06);
          box-shadow: 0 16px 60px -36px rgba(0,0,0,.18);
          transition: transform .25s ease, box-shadow .35s ease, border-color .25s ease;
          overflow: hidden;
          will-change: transform, box-shadow;
        }
        .c-card:hover{
          transform: translateY(-8px);
          box-shadow: 0 32px 96px -44px rgba(0,84,103,.28);
          border-color: rgba(0,84,103,.18);
        }
        .c-edge{
          position:absolute; inset:0; pointer-events:none; opacity:.0; transition:opacity .25s ease;
          background: radial-gradient(60% 40% at 100% 0%, rgba(205,220,45,0.16), transparent 70%),
                      radial-gradient(60% 40% at 0% 100%, rgba(0,84,103,0.12), transparent 70%);
        }
        .c-card:hover .c-edge{ opacity:.9; }

        .c-icon{
          display:inline-flex; align-items:center; justify-content:center;
          width: 56px; height: 56px; border-radius: 999px;
          background: linear-gradient(135deg, #005467 0%, #3B8E9B 65%);
          box-shadow: 0 10px 28px -12px rgba(0,84,103,.45);
          color: #fff;
          flex: 0 0 auto;
        }
        .c-icon svg{ width: 26px; height: 26px; }

        .c-title{
          font-weight: 900; letter-spacing: .15px; color: #414042;
        }
        .c-sub{ color:#808285; }

        .c-value{
          font-weight: 800; color:#005467;
          direction:ltr; unicode-bidi: plaintext;
          word-break: break-all;
        }
        .c-link{
          display:inline-flex; align-items:center; gap:.5rem;
          padding:.7rem 1.1rem; border-radius: .9rem; font-weight:800;
          color:#414042; background: #F3F6F6; border:1px solid rgba(0,0,0,.06);
          transition: transform .2s ease, box-shadow .25s ease, background-color .2s ease, border-color .2s ease, color .2s ease;
          text-decoration: none;
        }
        .c-link:hover{
          transform: translateY(-2px);
          background: #EDEFF0; border-color: rgba(0,84,103,.25); color:#003C48;
          box-shadow: 0 16px 34px -16px rgba(0,84,103,.25);
        }

        .c-cta{
          display:inline-flex; align-items:center; justify-content:center;
          padding:.8rem 1.2rem; border-radius: .9rem; font-weight:900;
          color:#414042; background: #CDDC2D;
          border:1px solid rgba(0,0,0,.04);
          box-shadow: 0 18px 34px -16px rgba(0,0,0,.22), inset 0 1px 0 rgba(255,255,255,.35);
          transition: transform .18s ease, box-shadow .28s ease, filter .2s ease;
        }
        .c-cta:hover{
          transform: translateY(-2px);
          filter: saturate(1.05);
          box-shadow: 0 26px 48px -18px rgba(0,84,103,.35), inset 0 1px 0 rgba(255,255,255,.45);
        }
      `}</style>
        </section>
    );
}

/* ===== بطاقة تواصل عامة ===== */
function ContactCard({ title, subtitle, value, href, type = "email" }) {
    return (
        <article className="c-card">
            <div className="c-edge" />
            <div className="p-6 sm:p-7">
                <div className="flex items-center gap-4">
                    <span className="c-icon" aria-hidden="true">
                        {type === "email" && <MailIcon />}
                        {type === "phone" && <PhoneIcon />}
                        {type === "instagram" && <InstaIcon />}
                    </span>
                    <div>
                        <h3 className="c-title text-lg">{title}</h3>
                        <p className="c-sub text-sm mt-0.5">{subtitle}</p>
                    </div>
                </div>

                <div className="mt-5">
                    <div className="c-value text-base sm:text-lg">{value}</div>
                </div>

                <div className="mt-6 flex items-center gap-2">
                    <a className="c-link" href={href} target={type === "instagram" ? "_blank" : undefined} rel="noreferrer">
                        افتح الرابط
                        <ArrowOut />
                    </a>
                    {/* زر ثانوي اختياري (غير موصول الآن) */}
                    {/* <button type="button" className="c-cta">انسخ</button> */}
                </div>
            </div>
        </article>
    );
}

/* ===== أيقونات SVG خفيفة بدون مكتبات خارجية ===== */
function MailIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.8" />
            <path d="M22 8 12.8 13.2a2 2 0 0 1-1.6 0L2 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    );
}
function PhoneIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <path d="M6 2h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2C9.163 20 4 14.837 4 8a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
function InstaIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" />
        </svg>
    );
}
function ArrowOut(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" width="18" height="18" {...props}>
            <path d="M14 4h6m0 0v6m0-6L10 14" stroke="#005467" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20 14v4a2 2 0 0 1-2 2H8" stroke="#005467" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
