// src/components/sections/RequestForm.jsx
import { RequestsAPI } from "@/lib/api";
import { useAuth } from "@/store/auth";
import { useState } from "react";

/**
 * props:
 * - kind: "book" | "tool" | "courses/recorded" | "courses/onsite"
 * - targetId: رقم العنصر
 * - onSuccess?: () => void
 */
export default function RequestForm({ kind, targetId, onSuccess }) {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [preferred, setPreferred] = useState("email"); // email | phone | whatsapp
    const disabled = !user || !targetId || !kind;

    if (!user) {
        return <div className="p-3 rounded-lg border bg-amber-50">سجّل الدخول لإرسال طلب.</div>;
    }

    const submit = async (e) => {
        e.preventDefault();
        if (disabled) return;
        setLoading(true);
        try {
            const payload = { message, preferred_contact: preferred };
            if (kind === "book") payload.book = targetId;
            if (kind === "tool") payload.tool = targetId;
            if (kind === "courses/recorded") payload.course = targetId;
            if (kind === "courses/onsite") payload.course = targetId;

            await RequestsAPI.create(kind, payload);
            onSuccess?.();
            setMessage("");
        } catch {
            alert("فشل إرسال الطلب");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={submit} className="space-y-3 p-4 rounded-2xl border">
            <div>
                <label className="block mb-1">طريقة التواصل المفضلة</label>
                <select className="border rounded p-2" value={preferred} onChange={(e) => setPreferred(e.target.value)}>
                    <option value="email">الإيميل</option>
                    <option value="phone">الهاتف</option>
                    <option value="whatsapp">واتساب</option>
                </select>
            </div>

            <div>
                <label className="block mb-1">ملاحظات</label>
                <textarea className="w-full border rounded p-2 min-h-[90px]"
                    placeholder="اكتب أي تفاصيل إضافية..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)} />
            </div>

            <button disabled={loading || disabled} className="rounded-lg px-4 py-2 font-semibold shadow">
                {loading ? "يرسل..." : "إرسال الطلب"}
            </button>
        </form>
    );
}
