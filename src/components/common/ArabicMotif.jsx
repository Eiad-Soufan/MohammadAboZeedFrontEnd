
export default function ArabicMotif({ className = "" }) {
    return (
        <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-hidden
        >
            <defs>
                <linearGradient id="g" x1="0" x2="1">
                    <stop offset="0%" stopColor="#E7C36C" />
                    <stop offset="100%" stopColor="#7CF0E0" />
                </linearGradient>
            </defs>
            <g fill="none" stroke="url(#g)" strokeWidth="2" opacity="0.55">
                {Array.from({ length: 12 }).map((_, i) => (
                    <path key={i} d={`M 100 10 Q ${30 + i * 5} ${50 + i * 2}, 100 100 T 100 190`} />
                ))}
            </g>
        </svg>
    );
}
