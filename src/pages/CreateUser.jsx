import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";

const INITIAL_FORM = {
    name: "",
    email: "",
    role: "employee",
    department_id: "",
    password: "",
    confirmPassword: "",
};

const DEPARTMENTS = [
    { id: "1", name: "HR" },
    { id: "2", name: "IT" },
    { id: "3", name: "Finance" },
    { id: "4", name: "Sales" },
];

function CreateUser() {
    const navigate = useNavigate();

    const [form, setForm]               = useState(INITIAL_FORM);
    const [loading, setLoading]         = useState(false);
    const [toast, setToast]             = useState({ message: "", type: "success" });
    const [showPassword, setShowPassword]               = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const showToast = (message, type = "success") => setToast({ message, type });
    const closeToast = () => setToast({ message: "", type: "success" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // --- Simple password strength check ---
    const getPasswordStrength = (password) => {
        if (!password) return { label: "", color: "", width: "0%" };
        if (password.length < 6) return { label: "Weak", color: "danger", width: "33%" };
        const hasUpper   = /[A-Z]/.test(password);
        const hasNumber  = /[0-9]/.test(password);
        const hasSpecial = /[^A-Za-z0-9]/.test(password);
        const score = [hasUpper, hasNumber, hasSpecial].filter(Boolean).length;

        if (password.length >= 8 && score >= 2) return { label: "Strong", color: "success", width: "100%" };
        if (password.length >= 6 && score >= 1) return { label: "Medium", color: "warning", width: "66%" };
        return { label: "Weak", color: "danger", width: "33%" };
    };

    const passwordStrength = getPasswordStrength(form.password);
    const passwordsMatch   = form.confirmPassword && form.password === form.confirmPassword;
    const passwordsMismatch = form.confirmPassword && form.password !== form.confirmPassword;

    const handleSubmit = async (e) => {
        e.preventDefault();

        // --- Frontend validation ---
        if (!form.name.trim()) {
            showToast("Please enter the employee's full name.", "warning");
            return;
        }
        if (!form.email.trim()) {
            showToast("Please enter an email address.", "warning");
            return;
        }
        if (!form.department_id) {
            showToast("Please select a department.", "warning");
            return;
        }
        if (form.password.length < 6) {
            showToast("Password must be at least 6 characters long.", "warning");
            return;
        }
        if (form.password !== form.confirmPassword) {
            showToast("Passwords do not match.", "danger");
            return;
        }

        setLoading(true);
        try {
            await api.post("/auth/createuser", {
                name: form.name,
                email: form.email,
                role: form.role,
                department_id: form.department_id,
                password: form.password,
            });

            showToast(`User "${form.name}" created successfully!`, "success");
            setForm(INITIAL_FORM);

            // Give the toast a moment to be seen before navigating away
            setTimeout(() => navigate("/dashboard"), 1200);

        } catch (error) {
            showToast(error.response?.data?.message || "Failed to create user.", "danger");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-4">
            <Toast message={toast.message} type={toast.type} onClose={closeToast} />

            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 col-12">
                    <div className="card shadow-sm border-0" style={{ borderRadius: "12px" }}>

                        {/* Header */}
                        <div
                            className="card-header text-white py-4"
                            style={{
                                background: "linear-gradient(135deg, #4361ee, #3a0ca3)",
                                borderRadius: "12px 12px 0 0",
                            }}
                        >
                            <h3 className="mb-1">👤 Create New User</h3>
                            <p className="mb-0" style={{ fontSize: "14px", opacity: 0.9 }}>
                                Add a new employee, manager, or admin to the system.
                            </p>
                        </div>

                        <div className="card-body p-4">
                            <form onSubmit={handleSubmit}>

                                {/* Full Name */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">
                                        Full Name <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="e.g. Priya Sharma"
                                        autoFocus
                                    />
                                </div>

                                {/* Email */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">
                                        Email Address <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="employee@company.com"
                                    />
                                </div>

                                {/* Role + Department side by side on desktop */}
                                <div className="row g-3 mb-3">
                                    <div className="col-12 col-md-6">
                                        <label className="form-label fw-semibold">
                                            Role <span className="text-danger">*</span>
                                        </label>
                                        <select
                                            className="form-select"
                                            name="role"
                                            value={form.role}
                                            onChange={handleChange}
                                        >
                                            <option value="employee">👤 Employee</option>
                                            <option value="manager">👔 Manager</option>
                                            <option value="admin">🛡️ Admin</option>
                                        </select>
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <label className="form-label fw-semibold">
                                            Department <span className="text-danger">*</span>
                                        </label>
                                        <select
                                            className="form-select"
                                            name="department_id"
                                            value={form.department_id}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select Department</option>
                                            {DEPARTMENTS.map((dept) => (
                                                <option key={dept.id} value={dept.id}>
                                                    {dept.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="mb-2">
                                    <label className="form-label fw-semibold">
                                        Password <span className="text-danger">*</span>
                                    </label>
                                    <div className="input-group">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className="form-control"
                                            name="password"
                                            value={form.password}
                                            onChange={handleChange}
                                            placeholder="At least 6 characters"
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={() => setShowPassword(!showPassword)}
                                            tabIndex={-1}
                                        >
                                            {showPassword ? "🙈" : "👁️"}
                                        </button>
                                    </div>

                                    {/* Password strength bar */}
                                    {form.password && (
                                        <div className="mt-2">
                                            <div className="progress" style={{ height: "5px" }}>
                                                <div
                                                    className={`progress-bar bg-${passwordStrength.color}`}
                                                    style={{ width: passwordStrength.width, transition: "width 0.3s" }}
                                                />
                                            </div>
                                            <small className={`text-${passwordStrength.color}`}>
                                                {passwordStrength.label} password
                                            </small>
                                        </div>
                                    )}
                                </div>

                                {/* Confirm Password */}
                                <div className="mb-4">
                                    <label className="form-label fw-semibold">
                                        Confirm Password <span className="text-danger">*</span>
                                    </label>
                                    <div className="input-group">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            className={`form-control ${
                                                passwordsMismatch ? "is-invalid" : passwordsMatch ? "is-valid" : ""
                                            }`}
                                            name="confirmPassword"
                                            value={form.confirmPassword}
                                            onChange={handleChange}
                                            placeholder="Re-enter password"
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            tabIndex={-1}
                                        >
                                            {showConfirmPassword ? "🙈" : "👁️"}
                                        </button>
                                    </div>
                                    {passwordsMismatch && (
                                        <small className="text-danger">Passwords do not match.</small>
                                    )}
                                    {passwordsMatch && (
                                        <small className="text-success">✓ Passwords match.</small>
                                    )}
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 py-2"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" />
                                            Creating User...
                                        </>
                                    ) : (
                                        "✓ Create User"
                                    )}
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateUser;
