// src/components/ui/Button.jsx

export function PrimaryButton({ className = "", ...props }) {
    return (
        <button
            {...props}
            className={[
                "inline-flex items-center justify-center gap-2",
                "rounded-2xl px-5 py-2.5 text-sm font-semibold transition",
                "shadow-md hover:shadow-lg disabled:opacity-60",
                "bg-[#005467] text-white hover:scale-[1.02]",
                "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#005467]",
                className,
            ].join(" ")}
        />
    );
}

export function GhostButton({ className = "", ...props }) {
    return (
        <button
            {...props}
            className={[
                "inline-flex items-center justify-center gap-2",
                "rounded-2xl px-4 py-2 text-sm font-semibold transition",
                "border bg-white/80 backdrop-blur text-slate-800 hover:bg-white",
                "border-[rgba(2,6,23,.06)] shadow-sm",
                className,
            ].join(" ")}
        />
    );
}

/**
 * زر موحّد للكروت (كتب / مقالات / أدوات)
 * يعكس هوية الألوان (#005467 مع لمعة ليمونية خفيفة)
 * مع حركة هوفر أوضح (تكبير بسيط + رفع خفيف) بدون ما يغيّر مكانه في الكرت.
 */
export function CardActionButton({
    className = "",
    style,
    children,
    ...props
}) {
    return (
        <PrimaryButton
            {...props}
            className={[
                "w-full !text-white",
                "relative overflow-hidden",
                // هوفر أوضح: تكبير بسيط + رفع خفيف
                "transform transition-transform transition-shadow duration-200",

                // توحيد الظل وإبرازه أكثر للكرت
                "shadow-[0_18px_46px_-18px_rgba(0,84,103,.65)] hover:shadow-[0_22px_55px_-20px_rgba(0,84,103,.85)]",
                // لمسة هوية: وهج ليموني خفيف في أحد الأطراف عند الهوفر
                "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_0_0,#CDDC2D33,transparent_55%)]",
                "before:opacity-0 hover:before:opacity-100 before:transition-opacity",
                className,
            ].join(" ")}
            style={{
                // جراديانت أقوى شوية ويعطي إحساس عمق
                backgroundImage:
                    "linear-gradient(135deg, #005467 0%, #0A6F82 45%, #008A98 100%)",
                border: "1px solid rgba(255,255,255,.2)",
                ...(style || {}),
            }}
        >
            <span className="inline-flex items-center justify-center gap-2">
                {children}
            </span>
        </PrimaryButton>
    );
}
