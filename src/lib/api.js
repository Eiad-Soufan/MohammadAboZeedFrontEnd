// src/lib/api.js
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

/** =========================================
 *   Axios instance
 * ========================================= */
export const api = axios.create({
    baseURL: API_BASE,
    headers: { "Content-Type": "application/json" },
});

/** =========================================
 *   Session storage helpers (Tokens + Me)
 *   (مؤقتًا على localStorage كما في نسختك)
 * ========================================= */
const getTokens = () => ({
    access: localStorage.getItem("access"),
    refresh: localStorage.getItem("refresh"),
});
const setTokens = ({ access, refresh }) => {
    if (access) localStorage.setItem("access", access);
    if (refresh) localStorage.setItem("refresh", refresh);
};
const clearTokens = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
};

// تخزين بيانات المستخدم (me) لملء النماذج تلقائيًا
const setMe = (me) => {
    if (!me) return;
    localStorage.setItem("me", JSON.stringify(me));
};
const getMe = () => {
    try {
        const raw = localStorage.getItem("me");
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
};
const clearMe = () => localStorage.removeItem("me");

// مهيّئ سريع بعد تسجيل الدخول/التسجيل
export const setSession = ({ access, refresh, me }) => {
    if (access || refresh) setTokens({ access, refresh });
    if (me) setMe(me);
    if (access) api.defaults.headers.common.Authorization = `Bearer ${access}`;
};
export const clearSession = () => {
    clearTokens();
    clearMe();
    delete api.defaults.headers.common.Authorization;
};

/** =========================================
 *   Attach Access token on every request
 * ========================================= */
api.interceptors.request.use((cfg) => {
    const { access } = getTokens();
    if (access) cfg.headers.Authorization = `Bearer ${access}`;
    return cfg;
});

/** =========================================
 *   Auto refresh on 401
 * ========================================= */
let isRefreshing = false;
let waiters = [];
const flush = (err, token = null) => {
    waiters.forEach((p) => (err ? p.reject(err) : p.resolve(token)));
    waiters = [];
};

api.interceptors.response.use(
    (r) => r,
    async (error) => {
        const original = error.config;
        if (error.response?.status === 401 && !original._retry) {
            if (isRefreshing) {
                // انتظر حتى يكتمل الريفرش الأول
                return new Promise((resolve, reject) => {
                    waiters.push({ resolve, reject });
                }).then((token) => {
                    original.headers.Authorization = `Bearer ${token}`;
                    return api(original);
                });
            }
            original._retry = true;
            isRefreshing = true;
            try {
                const { refresh } = getTokens();
                if (!refresh) throw new Error("No refresh token");
                const resp = await axios.post(`${API_BASE}/api/token/refresh/`, { refresh });
                const newAccess = resp.data.access;
                setTokens({ access: newAccess });
                flush(null, newAccess);
                original.headers.Authorization = `Bearer ${newAccess}`;
                return api(original);
            } catch (e) {
                flush(e, null);
                clearSession(); // امسح التوكنات وبيانات المستخدم
                window.location.href = "/login";
                return Promise.reject(e);
            } finally {
                isRefreshing = false;
            }
        }
        return Promise.reject(error);
    }
);

/** =========================================
 *   APIs
 * ========================================= */

// Auth
export const AuthAPI = {
    /**
     * يسمح بـ email أو username في نفس الحقل (السيرفر يتعامل مع الاثنين)
     * يُتوقّع الرد: { access, refresh, me }
     */
    login: (identifier, password) =>
        api.post("/api/token/", {
            email: identifier,   // يدعم بريد أو اسم مستخدم
            username: identifier, // للحالات التي تعتمد username_field
            password,
        }),

    /**
     * التسجيل: يُتوقّع الرد: { detail, access, refresh, me }
     */
    register: ({ full_name, email, password, phone }) =>
        api.post("/api/register/", { full_name, email, password, phone }),
};

// Current user (me)
export const MeAPI = {
    get: () => api.get("/api/me/"),
    update: (payload) => api.put("/api/me/", payload),
};

// Requests (مطابقة للمسارات في الباك)
export const RequestsAPI = {
    create: (kind, payload) => {
        const map = {
            book: "/api/requests/book/",
            tool: "/api/requests/tool/",
            "courses/recorded": "/api/requests/courses/recorded/",
            "courses/onsite": "/api/requests/courses/onsite/",
        };
        return api.post(map[kind], payload);
    },
};

// Interactions (saved/bought عبر GenericFK)
export const InteractionsAPI = {
    create: (content_type, object_id, interaction) =>
        api.post("/api/interactions/", { content_type, object_id, interaction }),
    remove: (id) => api.delete(`/api/interactions/${id}/`),
    listMine: (params = {}) => api.get("/api/interactions/", { params }),
};

// مُصدِّرات مساعدة (لو حبيت تستخدمها خارجًا)
export const SessionStore = { getTokens, setTokens, clearTokens, getMe, setMe, clearMe };
