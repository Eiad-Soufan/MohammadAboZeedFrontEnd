import { motion } from "framer-motion";

const SectionHeader = ({ title, href = "#", icon = null }) => {
    return (
        <div className="mb-6 flex items-center justify-between" dir="rtl">
            {/* العنوان يمين */}
            <motion.h2
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="text-2xl md:text-3xl font-extrabold tracking-tight
                   text-slate-100 drop-shadow-sm"
            >
                <span className="relative inline-block">
                    {/* لمعان طفيف داخل النص */}
                    <span className="bg-clip-text text-transparent bg-gradient-to-tr
                           from-white to-white/70">
                        {title}
                    </span>
                    {icon && <span className="mr-2 align-middle">{icon}</span>}
                    {/* خط سفلي متحرك عند الهوفر */}
                    <span className="absolute -bottom-1 right-0 h-[2px] w-full
                           bg-gradient-to-l from-emerald-400/80 via-emerald-300/60 to-transparent
                           rounded-full opacity-70" />
                </span>
            </motion.h2>

            {/* زر المزيد يسار */}
            <a
                href={href}
                className="group inline-flex items-center gap-2 text-sm font-medium
                   text-emerald-300 hover:text-emerald-200
                   transition"
            >
                <span className="relative">
                    المزيد
                    <span className="absolute -bottom-0.5 right-0 h-[1px] w-full
                           bg-emerald-300/60 scale-x-0 group-hover:scale-x-100 origin-right
                           transition-transform duration-300" />
                </span>
                <svg viewBox="0 0 24 24" className="h-4 w-4 translate-x-0 group-hover:translate-x-0.5 transition">
                    <path fill="currentColor" d="M13 5l7 7-7 7v-4H4v-6h9V5z" />
                </svg>
            </a>
        </div>
    );
};

export default SectionHeader;
