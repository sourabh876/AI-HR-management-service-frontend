import { useState } from "react";
import api from "../api/axios";
import Toast from "../components/Toast";

const INITIAL_FORM = {
    leave_type: "",
    start_date: "",
    end_date:   "",
    reason:     "",
};

function ApplyLeave() {
    const [form, setForm]       = useState(INITIAL_FORM);
    const [loading, setLoading] = useState(false);
    const [toast, setToast]     = useState({ message: "", type: "success" });

    const showToast = (message, type = "success") => setToast({ message, type });
    const closeToast = () => setToast({ message: "", type: "success" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Get today's date in YYYY-MM-DD format to block past dates
    const today = new Date().toISOString().split("T")[0];

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Frontend validation
        if (!form.leave_type) {
            showToast("Please select a leave type.", "warning");
            return;
        }
        if (!form.start_date || !form.end_date) {
            showToast("Please select both start and end dates.", "warning");
            return;
        }
        if (form.end_date < form.start_date) {
            showToast("End date cannot be before start date.", "warning");
            return;
        }
        if (!form.reason.trim()) {
            showToast("Please enter a reason for your leave.", "warning");
            return;
        }

        setLoading(true);
        try {
            await api.post("/leaves/apply", form);
            showToast("Leave applied successfully! Your manager will review it shortly.", "success");
            setForm(INITIAL_FORM); // ✅ clear the form
        } catch (error) {
            showToast(
                error.response?.data?.message || "Something went wrong. Please try again.",
                "danger"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Toast notification */}
            <Toast message={toast.message} type={toast.type} onClose={closeToast} />

            <div className="card shadow-sm" style={{ maxWidth: "600px", margin: "0 auto" }}>
                <div className="card-body p-4">

                    <h3 className="mb-1">Apply for Leave</h3>
                    <p className="text-muted mb-4" style={{ fontSize: "14px" }}>
                        Fill in the details below and submit your leave request.
                    </p>

                    <form onSubmit={handleSubmit}>

                        {/* Leave Type */}
                        <div className="mb-3">
                            <label className="form-label fw-semibold">
                                Leave Type <span className="text-danger">*</span>
                            </label>
                            <select
                                className="form-select"
                                name="leave_type"
                                value={form.leave_type}
                                onChange={handleChange}
                            >
                                <option value="">— Select Leave Type —</option>
                                <option value="Sick Leave">🤒 Sick Leave</option>
                                <option value="Casual Leave">🌴 Casual Leave</option>
                                <option value="Earned Leave">📅 Earned Leave</option>
                            </select>
                        </div>

                        {/* Dates — side by side on desktop */}
                        <div className="row g-3 mb-3">
                            <div className="col-12 col-md-6">
                                <label className="form-label fw-semibold">
                                    Start Date <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="start_date"
                                    value={form.start_date}
                                    min={today}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-12 col-md-6">
                                <label className="form-label fw-semibold">
                                    End Date <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="end_date"
                                    value={form.end_date}
                                    min={form.start_date || today}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Reason */}
                        <div className="mb-4">
                            <label className="form-label fw-semibold">
                                Reason <span className="text-danger">*</span>
                            </label>
                            <textarea
                                className="form-control"
                                name="reason"
                                value={form.reason}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Briefly describe the reason for your leave..."
                            />
                        </div>

                        {/* Buttons */}
                        <div className="d-flex gap-2">
                            <button
                                type="submit"
                                className="btn btn-primary flex-fill"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" />
                                        Submitting...
                                    </>
                                ) : (
                                    "📨 Submit Leave Request"
                                )}
                            </button>

                            {/* Reset button — clears the form */}
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => setForm(INITIAL_FORM)}
                                disabled={loading}
                            >
                                Clear
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default ApplyLeave;
