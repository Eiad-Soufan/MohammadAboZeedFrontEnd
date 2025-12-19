// Header.MohammadAbuzayd.master.jsx
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoImg from "../../assets/999.png";
import { api, clearSession, SessionStore } from "../../lib/api";

function IcCalendar(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M16 2v3M8 2v3M3 10h18M5 6h14a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IcCollection(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M4 6h16M6 10h12M8 14h8M10 18h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
function IcUser(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M20 21a8 8 0 1 0-16 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}
function IcLogout(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M9 6V4a2 2 0 0 1 2-2h7v20h-7a2 2 0 0 1-2-2v-2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M13 12H3m0 0 3-3M3 12l3 3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function HeaderBar() {
  const headerRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);
  const timerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    const setH = () => {
      if (!el) return;
      const h = el.offsetHeight || 96;
      document.documentElement.style.setProperty("--hdr-h", `${h}px`);
      document.body.style.paddingTop = `var(--hdr-h, ${h}px)`;
    };
    setH();
    window.addEventListener("resize", setH);
    return () => window.removeEventListener("resize", setH);
  }, []);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const onScroll = () => { if (window.scrollY > 1) el.classList.add("glass"); else el.classList.remove("glass"); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const onKey = (e) => { if (e.key === "Escape") setOpenIndex(null); };
    document.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("scroll", onScroll); document.removeEventListener("keydown", onKey); };
  }, []);

  useEffect(() => {
    const readSession = () => {
      const { access } = SessionStore.getTokens();
      setIsAuthed(!!access);
      if (access) api.defaults.headers.common.Authorization = `Bearer ${access}`;
      const me = SessionStore.getMe();
      if (me) {
        const name = me?.profile?.display_name || me?.full_name || me?.username || me?.user?.username || "";
        const email = me?.email || me?.user?.email || "";
        const phone = me?.profile?.phone || "";
        setUser({ name, email, phone });
      } else setUser(null);
    };
    readSession();
    const onStorage = (e) => { if (!["access", "refresh", "me"].includes(e.key)) return; readSession(); };
    const onAuthChanged = () => readSession();
    window.addEventListener("storage", onStorage);
    window.addEventListener("auth-changed", onAuthChanged);
    return () => { window.removeEventListener("storage", onStorage); window.removeEventListener("auth-changed", onAuthChanged); };
  }, []);

  const onLogout = () => {
    clearSession();
    setUser(null);
    setIsAuthed(false);
    navigate("/login", { replace: true });
  };
  const openMenu = (i) => { clearTimeout(timerRef.current); setOpenIndex(i); };
  const closeMenu = (i) => { clearTimeout(timerRef.current); timerRef.current = setTimeout(() => { setOpenIndex((p) => (p === i ? null : p)); }, 150); };

  return (
    <header id="site-header" ref={headerRef} className="hdr-master" role="banner">
      <div className="hdr-wrap">
        {/* يمين: اللوغو */}
        <div className="site-title">
          <a href="/" className="logo-link" aria-label="العودة للصفحة الرئيسية">
            <img src={logoImg} alt="Mohammad AboZeed Logo" className="logo-img" style={{ height: "88px", objectFit: "contain" }} />
          </a>
        </div>

        {/* وسط: القائمة */}
        <nav className="main-nav" role="navigation" aria-label="Main">
          <ul className="menu" role="menubar">
            <li className={`menu-item has-sub ${openIndex === 0 ? "open" : ""}`} role="none"
              onMouseEnter={() => openMenu(0)} onMouseLeave={() => closeMenu(0)}>
              <a href="#courses" role="menuitem" aria-haspopup="true" aria-expanded={openIndex === 0}
                className="tab" onFocus={() => openMenu(0)} onBlur={() => closeMenu(0)}>
                <span className="tab-label">الدورات</span>
              </a>
              <ul className="submenu" role="menu" onMouseEnter={() => openMenu(0)} onMouseLeave={() => closeMenu(0)}>
                <li role="none"><Link role="menuitem" to="/courses/online">دورات حضورية</Link></li>
                <li role="none"><Link role="menuitem" to="/courses/recorded">دورات مسجلة</Link></li>
              </ul>
            </li>
            <li className={`menu-item has-sub ${openIndex === 1 ? "open" : ""}`} role="none"
              onMouseEnter={() => openMenu(1)} onMouseLeave={() => closeMenu(1)}>
              <a href="#products" role="menuitem" aria-haspopup="true" aria-expanded={openIndex === 1}
                className="tab" onFocus={() => openMenu(1)} onBlur={() => closeMenu(1)}>
                <span className="tab-label">المنتجات</span>
              </a>
              <ul className="submenu" role="menu" onMouseEnter={() => openMenu(1)} onMouseLeave={() => closeMenu(1)}>
                <li role="none"><Link role="menuitem" to="/products/books">كتب</Link></li>
                <li role="none"><Link role="menuitem" to="/products/tools">أدوات</Link></li>
              </ul>
            </li>
            <li className="menu-item" role="none"><Link role="menuitem" to="/articles" className="tab"><span className="tab-label">المقالات</span></Link></li>
            <li className="menu-item" role="none"><Link role="menuitem" to="/about" className="tab"><span className="tab-label">عن محمد أبوزيد</span></Link></li>
          </ul>
        </nav>

        {/* يسار: الأزرار */}
        <div className="hdr-actions">
          {!isAuthed ? (
            <>
              {/* زر أبيض بنص وحدود تركواز */}
              <Link
                className="btn ghost"
                to="/consult"
                style={{
                  background: '#FFFFFF',
                  backgroundImage: 'none',
                  color: '#005467',
                  border: '1px solid rgba(0,84,103,.22)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,.9)'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#F8FAFC'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#FFFFFF'; }}
              >
                احجز استشارتك الآن
              </Link>

              {/* زر ممتلئ ليموني (بدلاً من الأزرق) */}
              <Link
                className="btn filled speaker-match"
                to="/login"
                state={{ from: location }}
                style={{
                  background: '#CDDC2D',
                  backgroundImage: 'none',      // يلغي أي تدرّج قديم
                  color: '#414042',
                  border: '1px solid rgba(0,0,0,.06)',
                  boxShadow: '0 10px 24px -12px rgba(0,0,0,.35)'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#BFD027'; e.currentTarget.style.boxShadow = '0 16px 30px -12px rgba(0,0,0,.45)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#CDDC2D'; e.currentTarget.style.boxShadow = '0 10px 24px -12px rgba(0,0,0,.35)'; }}
              >
                انضم إلينا
              </Link>

            </>
          ) : (
            <div className="act-group" role="group" aria-label="حساب المستخدم">
              <Link className="chip ghost" to="/consult" title="احجز استشارتك الآن" aria-label="احجز استشارتك الآن">
                <IcCalendar className="ic" /><span className="lbl">احجز استشارتك</span>
              </Link>
              <Link className="chip ghost" to="/profile" title="الملف الشخصي" aria-label="الملف الشخصي">
                <IcUser className="ic" /><span className="lbl">{user?.name ? user.name : "الملف الشخصي"}</span>
              </Link>
              <button className="chip filled speaker-match" onClick={onLogout} title="تسجيل الخروج" aria-label="تسجيل الخروج" type="button">
                <IcLogout className="ic" /><span className="lbl">خروج</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        :root{
          --ink-900:#0f172a; --ink-800:#1f2937; --ink-700:#334155; --ink-600:#475569;

          /* === هوية الألوان الجديدة === */
          --brand-primary:#005467;           /* Teal */
          --brand-accent:#CDDC2D;            /* Lime */

          /* خلفية الهيدر المتدرجة (أصبحت تركوازية بالكامل بدل الأزرق) */
          --hdr-grad-base: linear-gradient(180deg,#F6F8FB 0%,#E9F3F3 34%,#D7ECEA 70%,rgba(0,84,103,0.18) 100%);
          --hdr-grad-diag: linear-gradient(135deg,rgba(0,84,103,0.10) 0%,rgba(0,84,103,0.00) 42%,rgba(12,18,28,0.00) 100%);
          --hdr-grad-radial: radial-gradient(120% 60% at 50% -20%,rgba(255,255,255,0.85) 0%,rgba(255,255,255,0.00) 60%);

          --glass-bg: rgba(255,255,255,0.55);
          --glass-bg-strong: rgba(255,255,255,0.62);
          --glass-border: rgba(0,0,0,0.06);

          /* تدرّج الأزرار/chips الممتلئة — تركواز */
          --btn-fill-1:#1BA3B7;
          --btn-fill-2:#0B7F90;
          --btn-fill-3:#005467;
          --btn-fill-hover:#004654;
          --btn-ring: rgba(0,84,103,.35);

          /* خط التبويب السفلي: من الليموني إلى التركواز */
          --tab-underline: linear-gradient(90deg, var(--brand-accent) 0%, #BFD027 40%, var(--brand-primary) 100%);
        }

        #site-header.hdr-master{
          position: fixed; top:0; left:0; right:0; z-index:9999; background:#fff;
          background-image: var(--hdr-grad-radial), var(--hdr-grad-diag), var(--hdr-grad-base);
          border-bottom: 1px solid rgba(0,0,0,.05);
          animation: hdrFade 360ms ease both;
          transition: background-color 280ms ease, background-image 280ms ease, box-shadow 280ms ease, border-color 280ms ease, -webkit-backdrop-filter 220ms ease, backdrop-filter 220ms ease;
          will-change: background-image, backdrop-filter, box-shadow;
        }
        #site-header.hdr-master, #site-header.hdr-master .hdr-wrap{ overflow: visible; }
        #site-header.hdr-master .submenu{ z-index: 10000; }
        @keyframes hdrFade{ from{opacity:0; transform: translateY(-10px);} to{opacity:1; transform: translateY(0);} }
        #site-header.hdr-master.glass{
          background-image:none; background-color:var(--glass-bg);
          -webkit-backdrop-filter: saturate(1.25) blur(18px); backdrop-filter: saturate(1.25) blur(18px);
          border-bottom:1px solid var(--glass-border); box-shadow:0 10px 28px rgba(0,0,0,.07);
        }
        @media (prefers-reduced-transparency: no-preference){
          #site-header.hdr-master.glass:hover{ background-color: var(--glass-bg-strong); }
        }
        .hdr-wrap{ max-width:1200px; margin-inline:auto; padding:.6rem 1rem; min-height:64px; display:flex; align-items:center; gap:1rem; }
        .logo-link{ text-decoration:none; display:inline-flex; align-items:center; }
        .main-nav{ flex:1; display:flex; justify-content:center; }
        .menu{ list-style:none; margin:0; padding:0; display:flex; align-items:center; gap:.25rem; }
        .menu-item{ position:relative; }
        .tab{ position:relative; display:inline-block; padding:.62rem .95rem; border-radius:.9rem; font-weight:700; color:var(--ink-700); letter-spacing:.1px; text-decoration:none; }
        .tab:hover{ color:var(--ink-900); background:rgba(2,6,23,.05); }
        .tab:focus-visible{ outline:2px solid rgba(0,84,103,.45); outline-offset:3px; border-radius:.9rem; }
        .tab::after{ content:""; position:absolute; left:.9rem; bottom:.35rem; height:3px; border-radius:999px; background-image:var(--tab-underline); transform:scaleX(0); transform-origin:left center; transition:transform 220ms cubic-bezier(.2,.6,.2,1); }
        .tab:hover::after{ transform:scaleX(1); }
        .submenu{
          position:absolute; left:0; top:calc(100% + .55rem); min-width:14rem; padding:.6rem; border-radius:1rem; background:#fff;
          border:1px solid rgba(0,0,0,.06); box-shadow:0 18px 40px rgba(2,6,23,.10);
          opacity:0; transform:translateY(-6px); pointer-events:none; transition:opacity 160ms ease, transform 200ms cubic-bezier(.2,.6,.2,1);
        }
        .submenu li a{ display:flex; justify-content:space-between; align-items:center; padding:.6rem .9rem; border-radius:.8rem; color:var(--ink-700); text-decoration:none; }
        .submenu li a:hover{ background:#f1f5f9; color:var(--ink-900); }
        .has-sub.open > .submenu{ opacity:1; transform:translateY(0); pointer-events:auto; }

        .hdr-actions{ display:flex; align-items:center; gap:.6rem; }
        .btn{ display:inline-flex; align-items:center; justify-content:center; padding:.62rem 1.1rem; border-radius:999px; font-weight:800; font-size:.95rem; text-decoration:none; transition:transform .15s ease, box-shadow .2s.ease, background-color .2s ease, border-color .2s ease; white-space:nowrap; }
        .btn:hover{ transform:translateY(-1px); }
        .btn:active{ transform:translateY(0); }

        /* === زر ghost: يبقى أبيض لكن بنص/حدود تركواز === */
      /* الزر الأبيض يبقى أبيض لكن النص/الحدود بالتركوازي الجديد */
.btn.ghost{
  color:#005467;                 /* brand primary */
  background:#FFFFFF;
  border:1px solid rgba(0,84,103,.22);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.9);
}
.btn.ghost:hover{ background:#F8FAFC; }

/* الزر الممتلئ يصبح ليمونياً تمامًا مثل الهيرو */
.btn.filled.speaker-match{
  color:#414042;                 /* نص داكن */
  background:#CDDC2D;           /* brand accent */
  border:1px solid rgba(0,0,0,.06);
  box-shadow:0 10px 24px -12px rgba(0,0,0,.35);
}
.btn.filled.speaker-match:hover{
  background:#BFD027;           /* تغميق خفيف عند الهوفر */
  box-shadow:0 16px 30px -12px rgba(0,0,0,.45);
}


        /* === أزرار الحساب (بعد تسجيل الدخول) === */
        .act-group{ display:flex; align-items:center; gap:.4rem; }
        .chip{
          --bg: rgba(248,250,252,1);
          --bd: rgba(0,0,0,.07);
          display:inline-flex; align-items:center; gap:.5rem;
          padding:.5rem .85rem; border-radius:999px;
          font-weight:800; font-size:.93rem; text-decoration:none;
          color:var(--ink-800); background:var(--bg);
          border:1px solid var(--bd);
          box-shadow:inset 0 1px 0 rgba(255,255,255,.9);
          transition:transform .15s ease, box-shadow .2s ease, background-color .2s ease, border-color .2s ease, color .2s ease;
        }
        /* لون الأيقونات كان أزرق -> تركواز مطابق للهوية */
        .chip .ic{ flex:0 0 auto; color:var(--brand-primary); }
        .chip:hover{ transform:translateY(-1px); background:#f1f5f9; }
        .chip:active{ transform:translateY(0); }
        .chip.filled.speaker-match{
          color:#fff;
          background:linear-gradient(180deg, var(--btn-fill-1) 0%, var(--btn-fill-2) 46%, var(--btn-fill-3) 100%);
          border:1px solid rgba(255,255,255,.22);
          box-shadow:0 10px 22px var(--btn-ring), inset 0 1px 0 rgba(255,255,255,.35);
        }
        .chip.filled.speaker-match:hover{
          background:linear-gradient(180deg, var(--btn-fill-1) 0%, var(--btn-fill-2) 35%, var(--btn-fill-hover) 100%);
          box-shadow:0 14px 30px var(--btn-ring), inset 0 1px 0 rgba(255,255,255,.4);
        }

        @media (max-width: 640px){
          .chip .lbl{ display:none; }
          .chip{ padding:.55rem .6rem; }
        }

        @media (max-width: 1024px){ .main-nav{ display:none; } }

        /* RTL fix للمنيو */
        html[dir="rtl"] #site-header.hdr-master .submenu{ right:0; left:auto; }
        html[dir="rtl"] #site-header.hdr-master .tab::after{ right:.9rem; left:auto; transform-origin:right center; }
      `}</style>
    </header>
  );
}
