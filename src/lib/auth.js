// src/lib/auth.js
export function setSession({ access, refresh, me }, remember = true) {
    if (!access) return;
    const store = remember ? localStorage : sessionStorage;
    store.setItem("access", access);
    if (refresh) store.setItem("refresh", refresh);
    if (me) store.setItem("me", JSON.stringify(me));
}

export function clearSession() {
    ["access", "refresh", "me"].forEach((k) => {
        localStorage.removeItem(k);
        sessionStorage.removeItem(k);
    });
}

export function getAccessToken() {
    return localStorage.getItem("access") || sessionStorage.getItem("access") || "";
}

export function getMe() {
    const raw = localStorage.getItem("me") || sessionStorage.getItem("me");
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
}
