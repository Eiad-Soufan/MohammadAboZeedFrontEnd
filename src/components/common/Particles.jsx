import { useEffect, useRef } from "react";

export default function Particles({ count = 80 }) {
    const ref = useRef(null);

    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let frameId;

        const DPR = Math.min(window.devicePixelRatio || 1, 2);
        function resize() {
            canvas.width = canvas.clientWidth * DPR;
            canvas.height = canvas.clientHeight * DPR;
        }
        resize();
        window.addEventListener("resize", resize);

        const particles = Array.from({ length: count }).map(() => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: 0.5 + Math.random() * 1.6,
            v: 0.2 + Math.random() * 0.6,
            a: Math.random() * Math.PI * 2,
        }));

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (const p of particles) {
                p.a += (Math.random() - 0.5) * 0.05;
                p.x += Math.cos(p.a) * p.v;
                p.y += Math.sin(p.a) * p.v;
                if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
                const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
                g.addColorStop(0, "rgba(255,255,255,0.35)");
                g.addColorStop(1, "rgba(255,255,255,0)");
                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
                ctx.fill();
            }
            frameId = requestAnimationFrame(draw);
        }
        draw();

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener("resize", resize);
        };
    }, [count]);

    return <canvas ref={ref} className="absolute inset-0 h-full w-full" />;
}
