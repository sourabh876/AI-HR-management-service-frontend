// import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import { AuthContext } from "../context/AuthContext";

// function Login() {
//     const navigate        = useNavigate();
//     const { login }       = useContext(AuthContext);

//     // --- views: "login" | "forgot" | "sent" ---
//     const [view, setView] = useState("login");

//     const [form, setForm]         = useState({ email: "", password: "" });
//     const [forgotEmail, setForgotEmail] = useState("");
//     const [error, setError]       = useState("");
//     const [loading, setLoading]   = useState(false);

//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//         setError("");
//     };

//     // ---------------------------------------------------------------
//     // LOGIN
//     // ---------------------------------------------------------------
//     const handleLogin = async (e) => {
//         e.preventDefault();
//         if (!form.email || !form.password) {
//             setError("Please enter your email and password.");
//             return;
//         }
//         setLoading(true);
//         setError("");
//         try {
//             const res = await api.post("/auth/login", form);
//             login(res.data.user, res.data.token);
//             navigate("/dashboard");
//         } catch (err) {
//             setError(err.response?.data?.message || "Login failed. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     // ---------------------------------------------------------------
//     // FORGOT PASSWORD
//     // ---------------------------------------------------------------
//     const handleForgotPassword = async (e) => {
//         e.preventDefault();
//         if (!forgotEmail) {
//             setError("Please enter your email address.");
//             return;
//         }
//         setLoading(true);
//         setError("");
//         try {
//             await api.post("/auth/forgot-password", { email: forgotEmail });
//             setView("sent"); // show confirmation screen
//         } catch (err) {
//             setError(err.response?.data?.message || "Something went wrong. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     // ---------------------------------------------------------------
//     // SHARED CARD WRAPPER
//     // ---------------------------------------------------------------
//     return (
//         <div className="container vh-100 d-flex justify-content-center align-items-center">
//             <div className="card shadow" style={{ width: "420px", borderRadius: "12px" }}>
//                 <div className="card-body p-4">

//                     {/* ================================================
//                         VIEW 1 — LOGIN
//                     ================================================ */}
//                     {view === "login" && (
//                         <>
//                             <h2 className="text-center mb-1">HRMS Login</h2>
//                             <p className="text-center text-muted mb-4" style={{ fontSize: "14px" }}>
//                                 Welcome back! Please sign in to continue.
//                             </p>

//                             {error && <div className="alert alert-danger py-2">{error}</div>}

//                             <form onSubmit={handleLogin}>
//                                 <div className="mb-3">
//                                     <label className="form-label fw-semibold">Email</label>
//                                     <input
//                                         type="email"
//                                         className="form-control"
//                                         name="email"
//                                         value={form.email}
//                                         onChange={handleChange}
//                                         placeholder="you@company.com"
//                                         autoFocus
//                                     />
//                                 </div>

//                                 <div className="mb-2">
//                                     <label className="form-label fw-semibold">Password</label>
//                                     <input
//                                         type="password"
//                                         className="form-control"
//                                         name="password"
//                                         value={form.password}
//                                         onChange={handleChange}
//                                         placeholder="Enter your password"
//                                     />
//                                 </div>

//                                 {/* Forgot password link */}
//                                 <div className="text-end mb-4">
//                                     <button
//                                         type="button"
//                                         className="btn btn-link p-0"
//                                         style={{ fontSize: "13px" }}
//                                         onClick={() => { setView("forgot"); setError(""); }}
//                                     >
//                                         Forgot password?
//                                     </button>
//                                 </div>

//                                 <button
//                                     type="submit"
//                                     className="btn btn-primary w-100"
//                                     disabled={loading}
//                                 >
//                                     {loading ? (
//                                         <>
//                                             <span className="spinner-border spinner-border-sm me-2" />
//                                             Signing in...
//                                         </>
//                                     ) : "Login"}
//                                 </button>
//                             </form>
//                         </>
//                     )}

//                     {/* ================================================
//                         VIEW 2 — FORGOT PASSWORD
//                     ================================================ */}
//                     {view === "forgot" && (
//                         <>
//                             {/* Back button */}
//                             <button
//                                 className="btn btn-link p-0 mb-3"
//                                 style={{ fontSize: "13px" }}
//                                 onClick={() => { setView("login"); setError(""); setForgotEmail(""); }}
//                             >
//                                 ← Back to Login
//                             </button>

//                             <h4 className="mb-1">Forgot Password</h4>
//                             <p className="text-muted mb-4" style={{ fontSize: "14px" }}>
//                                 Enter your registered email address and we'll send you a password reset link.
//                             </p>

//                             {error && <div className="alert alert-danger py-2">{error}</div>}

//                             <form onSubmit={handleForgotPassword}>
//                                 <div className="mb-4">
//                                     <label className="form-label fw-semibold">Email Address</label>
//                                     <input
//                                         type="email"
//                                         className="form-control"
//                                         value={forgotEmail}
//                                         onChange={(e) => { setForgotEmail(e.target.value); setError(""); }}
//                                         placeholder="you@company.com"
//                                         autoFocus
//                                     />
//                                 </div>

//                                 <button
//                                     type="submit"
//                                     className="btn btn-primary w-100"
//                                     disabled={loading}
//                                 >
//                                     {loading ? (
//                                         <>
//                                             <span className="spinner-border spinner-border-sm me-2" />
//                                             Sending...
//                                         </>
//                                     ) : "Send Reset Link"}
//                                 </button>
//                             </form>
//                         </>
//                     )}

//                     {/* ================================================
//                         VIEW 3 — EMAIL SENT CONFIRMATION
//                     ================================================ */}
//                     {view === "sent" && (
//                         <div className="text-center py-3">
//                             <div style={{ fontSize: "52px", marginBottom: "12px" }}>📧</div>
//                             <h4 className="mb-2">Check your email</h4>
//                             <p className="text-muted mb-4" style={{ fontSize: "14px" }}>
//                                 We've sent a password reset link to <br />
//                                 <strong>{forgotEmail}</strong>
//                             </p>
//                             <p className="text-muted mb-4" style={{ fontSize: "13px" }}>
//                                 Didn't receive it? Check your spam folder or try again.
//                             </p>

//                             <button
//                                 className="btn btn-outline-primary w-100 mb-2"
//                                 onClick={() => { setView("forgot"); setError(""); }}
//                             >
//                                 Try a different email
//                             </button>

//                             <button
//                                 className="btn btn-link w-100"
//                                 style={{ fontSize: "13px" }}
//                                 onClick={() => { setView("login"); setError(""); setForgotEmail(""); }}
//                             >
//                                 ← Back to Login
//                             </button>
//                         </div>
//                     )}

//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Login;

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function Login() {
    const navigate        = useNavigate();
    const { login }       = useContext(AuthContext);

    // --- views: "login" | "forgot" | "sent" ---
    const [view, setView] = useState("login");

    const [form, setForm]         = useState({ email: "", password: "" });
    const [forgotEmail, setForgotEmail] = useState("");
    const [error, setError]       = useState("");
    const [loading, setLoading]   = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    // ---------------------------------------------------------------
    // LOGIN
    // ---------------------------------------------------------------
    const handleLogin = async (e) => {
        e.preventDefault();
        if (!form.email || !form.password) {
            setError("Please enter your email and password.");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const res = await api.post("/auth/login", form);
            login(res.data.user, res.data.token);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // ---------------------------------------------------------------
    // FORGOT PASSWORD
    // ---------------------------------------------------------------
    const handleForgotPassword = async (e) => {
        e.preventDefault();
        if (!forgotEmail) {
            setError("Please enter your email address.");
            return;
        }
        setLoading(true);
        setError("");
        try {
            await api.post("/auth/forgot-password", { email: forgotEmail });
            setView("sent"); // show confirmation screen
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // ---------------------------------------------------------------
    // SHARED CARD WRAPPER
    // ---------------------------------------------------------------
    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
            <div className="card shadow" style={{ width: "420px", borderRadius: "12px" }}>
                <div className="card-body p-4">

                    {/* ================================================
                        VIEW 1 — LOGIN
                    ================================================ */}
                    {view === "login" && (
                        <>
                            <h2 className="text-center mb-1">HRMS Login</h2>
                            <p className="text-center text-muted mb-4" style={{ fontSize: "14px" }}>
                                Welcome back! Please sign in to continue.
                            </p>

                            {error && <div className="alert alert-danger py-2">{error}</div>}

                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="you@company.com"
                                        autoFocus
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="form-label fw-semibold">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                    />
                                </div>

                                {/* Forgot password link */}
                                <div className="text-end mb-4">
                                    <button
                                        type="button"
                                        className="btn btn-link p-0"
                                        style={{ fontSize: "13px" }}
                                        onClick={() => { setView("forgot"); setError(""); }}
                                    >
                                        Forgot password?
                                    </button>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" />
                                            Signing in...
                                        </>
                                    ) : "Login"}
                                </button>
                            </form>
                        </>
                    )}

                    {/* ================================================
                        VIEW 2 — FORGOT PASSWORD
                    ================================================ */}
                    {view === "forgot" && (
                        <>
                            {/* Back button */}
                            <button
                                className="btn btn-link p-0 mb-3"
                                style={{ fontSize: "13px" }}
                                onClick={() => { setView("login"); setError(""); setForgotEmail(""); }}
                            >
                                ← Back to Login
                            </button>

                            <h4 className="mb-1">Forgot Password</h4>
                            <p className="text-muted mb-4" style={{ fontSize: "14px" }}>
                                Enter your registered email address and we'll send you a password reset link.
                            </p>

                            {error && <div className="alert alert-danger py-2">{error}</div>}

                            <form onSubmit={handleForgotPassword}>
                                <div className="mb-4">
                                    <label className="form-label fw-semibold">Email Address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={forgotEmail}
                                        onChange={(e) => { setForgotEmail(e.target.value); setError(""); }}
                                        placeholder="you@company.com"
                                        autoFocus
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" />
                                            Sending...
                                        </>
                                    ) : "Send Reset Link"}
                                </button>
                            </form>
                        </>
                    )}

                    {/* ================================================
                        VIEW 3 — EMAIL SENT CONFIRMATION
                    ================================================ */}
                    {view === "sent" && (
                        <div className="text-center py-3">
                            <div style={{ fontSize: "52px", marginBottom: "12px" }}>📧</div>
                            <h4 className="mb-2">Check your email</h4>
                            <p className="text-muted mb-4" style={{ fontSize: "14px" }}>
                                We've sent a password reset link to <br />
                                <strong>{forgotEmail}</strong>
                            </p>
                            <p className="text-muted mb-4" style={{ fontSize: "13px" }}>
                                Didn't receive it? Check your spam folder or try again.
                            </p>

                            <button
                                className="btn btn-outline-primary w-100 mb-2"
                                onClick={() => { setView("forgot"); setError(""); }}
                            >
                                Try a different email
                            </button>

                            <button
                                className="btn btn-link w-100"
                                style={{ fontSize: "13px" }}
                                onClick={() => { setView("login"); setError(""); setForgotEmail(""); }}
                            >
                                ← Back to Login
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default Login;