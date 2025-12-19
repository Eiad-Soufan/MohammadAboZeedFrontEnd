// Footer.jsx — فوتر كامل بخلفية أزرق فاتح لكامل الفوتر
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer id="site-footer" className="ft-aurora-solid" role="contentinfo">
      {/* خلفية موحّدة بالكامل باللون الأزرق الفاتح */}
      <div className="ft-bg" aria-hidden="true" />

      <div className="ft-wrap" dir="rtl">
        <div className="ft-grid">
          {/* العمود 1: العلامة/العنوان */}
          <section className="ft-col brand" aria-label="العلامة">
            <h2 className="brand-title">الدكتور محمد أبوزيد</h2>
            <p className="brand-note">
              محتوى متخصص، دورات وبرامج عملية، ومنتجات معرفية لدعم تعلمك وتطويرك.
            </p>
          </section>

          {/* العمود 2: الدورات */}
          <nav className="ft-col" aria-label="الدورات">
            <h3 className="col-title">الدورات</h3>
            <ul className="list">
              <li><Link role="menuitem" to="/courses/online">دورات حضورية</Link></li>
              <li><Link role="menuitem" to="/courses/recorded">دورات مسجلة</Link></li>
            </ul>
          </nav>

          {/* العمود 3: المنتجات */}
          <nav className="ft-col" aria-label="المنتجات">
            <h3 className="col-title">المنتجات</h3>
            <ul className="list">
              <li><Link role="menuitem" to="/products/books">كتب</Link></li>
              <li><Link role="menuitem" to="/products/tools">أدوات</Link></li>
            </ul>
          </nav>

          {/* العمود 4: روابط عامة */}
          <nav className="ft-col" aria-label="روابط عامة">
            <h3 className="col-title">روابط</h3>
            <ul className="list">
              <li><Link role="menuitem" to="/articles">المقالات</Link></li>
              <li><Link role="menuitem" to="/about">عن محمد ابوزيد</Link></li>
              <li><Link role="menuitem" to="/contact">تواصل معنا</Link></li>
            </ul>
          </nav>
        </div>

        {/* فاصل داخلي خفيف */}
        <hr className="ft-sep" aria-hidden="true" />

        {/* الأسفل: حقوق وروابط سريعة */}
        <div className="ft-bottom">
          <small className="copy">
            © {new Date().getFullYear()} محمد أبوزيد. جميع الحقوق محفوظة.
          </small>

          <ul className="bottom-links">
            <li><Link role="menuitem" to="/privacy">سياسة الخصوصية</Link></li>
            <li><Link role="menuitem" to="/terms">الشروط والاحكام</Link></li>
          </ul>
        </div>
      </div>

      {/* ستايل كامل داخل نفس الملف */}
      <style>{`
        :root{
          /* نصوص داكنة أنيقة */
          --ink-900:#0f172a; --ink-800:#1f2937; --ink-700:#334155; --ink-600:#475569;

          /* خلفية الفوتر: أزرق فاتح موحّد */
          --tone-blue:#eef4ff;

          /* تأثير خط سفلي متدرّج للروابط */
          --link-underline: linear-gradient(90deg, #005467 0%, #0A6F82 45%, #CDDC2D 100%);

          /* أزرار (كما كانت) */
          --btn-fill-1: #0A6F82;     /* أفتح قليلاً من الأساسي */
--btn-fill-2: #005467;     /* الأساسي */
--btn-fill-3: #004452;     /* أغمق للتدرّج */
--btn-fill-hover: #003A46; /* عند الهوفر */
--btn-ring: rgba(0, 84, 103, .28);
        }

        #site-footer.ft-aurora-solid{
          position:relative; color:var(--ink-800); overflow:clip; background:transparent; isolation:isolate;
        }
        .ft-bg{ position:absolute; inset:0; z-index:-1; pointer-events:none; background:var(--tone-blue); }

        .ft-wrap{ max-width:1200px; margin-inline:auto; padding:2.4rem 1rem 2rem; }
        .ft-grid{ display:grid; grid-template-columns:1.2fr 1fr 1fr 1fr; gap:1.25rem; }
        @media (max-width:1024px){ .ft-grid{ grid-template-columns:1fr 1fr; } }
        @media (max-width:640px){ .ft-grid{ grid-template-columns:1fr; } }

        .brand-title{ color:var(--ink-900); font-weight:900; letter-spacing:.1px; font-size:1.15rem; margin:0 0 .6rem; }
        .brand-note{ color:var(--ink-700); line-height:1.8; margin:0 0 1rem; }

        .col-title{ color:var(--ink-900); font-weight:800; letter-spacing:.1px; margin:0 0 .75rem; font-size:1rem; }

        .list{ list-style:none; padding:0; margin:0; }
        .list li{ margin:.45rem 0; }

        #site-footer a{ color:var(--ink-800); text-decoration:none; position:relative; transition:color .2s ease; }
        #site-footer a:hover{ color:var(--ink-900); }
        #site-footer a::after{
          content:""; position:absolute; inset-inline:0; bottom:-3px; height:2px; border-radius:999px;
          background-image:var(--link-underline); transform:scaleX(0); transform-origin:left center;
          transition:transform 220ms cubic-bezier(.2,.6,.2,1);
        }
        html[dir="rtl"] #site-footer a::after{ transform-origin:right center; }
        #site-footer a:hover::after{ transform:scaleX(1); }

        .btn{ display:inline-flex; align-items:center; justify-content:center; padding:.62rem 1.1rem; border-radius:999px; font-weight:800; font-size:.95rem; text-decoration:none; white-space:nowrap; transition:transform .15s ease, box-shadow .2s ease, background-color .2s ease, border-color .2s ease; }
        .btn:hover{ transform:translateY(-1px); }
        .btn:active{ transform:translateY(0); }
        .btn.ghost{ color:var(--ink-800); background:rgba(255,255,255,.86); border:1px solid rgba(0,0,0,.07); box-shadow:inset 0 1px 0 rgba(255,255,255,.9); backdrop-filter:saturate(1.1) blur(2px); }
        .btn.ghost:hover{ background:rgba(255,255,255,.95); }
        .btn.filled.speaker-match{ color:#fff; background:linear-gradient(180deg,var(--btn-fill-1) 0%,var(--btn-fill-2) 46%,var(--btn-fill-3) 100%); border:1px solid rgba(255,255,255,.22); box-shadow:0 10px 26px var(--btn-ring), inset 0 1px 0 rgba(255,255,255,.35); }
        .btn.filled.speaker-match:hover{ background:linear-gradient(180deg,var(--btn-fill-1) 0%,var(--btn-fill-2) 35%,var(--btn-fill-hover) 100%); box-shadow:0 14px 34px var(--btn-ring), inset 0 1px 0 rgba(255,255,255,.4); }

        .ft-sep{ border:none; height:1px; background:linear-gradient(90deg, rgba(2,6,23,.08), rgba(2,6,23,.02)); margin:1.25rem 0 1rem; }

        .ft-bottom{ display:flex; align-items:center; justify-content:space-between; gap:1rem; flex-wrap:wrap; }
        .copy{ color:var(--ink-600); }
        .bottom-links{ display:inline-flex; align-items:center; gap:.9rem; list-style:none; padding:0; margin:0; }
        .bottom-links a{ color:var(--ink-700); }
        .bottom-links a:hover{ color:var(--ink-900); }

        @media (max-width:768px){ .ft-wrap{ padding:2rem 1rem 1.6rem; } }

        @media (prefers-reduced-motion:reduce){ #site-footer a::after{ transition:none; } }
      `}</style>
    </footer>
  );
}
