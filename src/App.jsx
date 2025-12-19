// App.jsx
import { useState } from "react";
import SplashIntro from "./components/intro/SplashIntro";
import Home from "./pages/Home";

export default function App() {
  const [done, setDone] = useState(() => {
    try {
      return sessionStorage.getItem("splashSeen") === "1";
    } catch {
      return false;
    }
  });

  const handleSplashDone = () => {
    try { sessionStorage.setItem("splashSeen", "1"); } catch { }
    setDone(true);
  };

  return (
    <>
      {!done && (
        <SplashIntro
          duration={3200}
          phrase="Authentic Never Fades."
          subphrase="خبرة تصنع الفارق."
          doctorSrc="/src/assets/dr.png"
          onDone={handleSplashDone}
        />
      )}

      {/* ✅ بدل إخفاء المحتوى كليًا، نستخدم غلاف مع انتقال ناعم */}
      <div
        aria-hidden={!done}
        className={`page-shell ${done ? "is-in" : ""}`}
      >
        <Home />
      </div>

      {/* أنماط الانتقال الخفيف */}
      <style>{`
        .page-shell{
          opacity: 0;
          transform: translateY(8px);
          transition: opacity .45s ease, transform .45s ease;
          will-change: opacity, transform;
        }
        .page-shell.is-in{
          opacity: 1;
          transform: translateY(0);
        }
        /* تلطيف إضافي: تأخير بسيط حتى لا "يصطدم" مع اختفاء السبلاش */
        .page-shell.is-in{
          transition-delay: .08s;
        }
        /* احترام تفضيل تقليل الحركة */
        @media (prefers-reduced-motion: reduce){
          .page-shell{ transition: opacity .25s linear; transform:none; }
          .page-shell.is-in{ opacity:1; }
        }
      `}</style>
    </>
  );
}
