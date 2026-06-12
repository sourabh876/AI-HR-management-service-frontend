import { useEffect } from "react";

function Toast({ message, type = "success", onClose, duration = 3000 }) {

    useEffect(() => {
        if (!message) return;
        const timer = setTimeout(() => { onClose(); }, duration);
        return () => clearTimeout(timer);
    }, [message, duration, onClose]);

    if (!message) return null;

    const icons  = { success: "✅", danger: "❌", warning: "⚠️", info: "ℹ️" };
    const colors = {
        success : { bg: "#d1e7dd", border: "#a3cfbb", text: "#0a3622" },
        danger  : { bg: "#f8d7da", border: "#f1aeb5", text: "#58151c" },
        warning : { bg: "#fff3cd", border: "#ffe69c", text: "#664d03" },
        info    : { bg: "#cff4fc", border: "#9eeaf9", text: "#055160" },
    };
    const style = colors[type] || colors.info;

    return (
        <div style={{
            position: "fixed", top: "20px", right: "20px", zIndex: 9999,
            backgroundColor: style.bg, border: `1px solid ${style.border}`,
            color: style.text, padding: "14px 20px", borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)", display: "flex",
            alignItems: "center", gap: "10px", minWidth: "280px", maxWidth: "400px",
            animation: "slideIn 0.3s ease",
        }}>
            <span style={{ fontSize: "18px" }}>{icons[type]}</span>
            <span style={{ flex: 1, fontSize: "14px", fontWeight: "500" }}>{message}</span>
            <button onClick={onClose} style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: "18px", color: style.text, lineHeight: 1, padding: 0, opacity: 0.7,
            }}>&times;</button>
            <style>{`@keyframes slideIn { from { transform: translateX(100px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`}</style>
        </div>
    );
}

export default Toast;