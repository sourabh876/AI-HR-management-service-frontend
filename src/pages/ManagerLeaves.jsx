import { useEffect, useState } from "react";
import api from "../api/axios";
import Toast from "../components/Toast";

function ManagerLeaves() {
    const [leaves, setLeaves]         = useState([]);
    const [loading, setLoading]       = useState(true);
    const [toast, setToast]           = useState({ message: "", type: "success" });
    const [processing, setProcessing] = useState(null); // tracks which leave id is mid-request

    useEffect(() => {
        fetchLeaves();
    }, []);

    const fetchLeaves = async () => {
        try {
            const res = await api.get("/leaves/pending-leaves");
            setLeaves(res.data.Leaves);
        } catch (error) {
            showToast(error.response?.data?.message || "Failed to load leaves.", "danger");
        } finally {
            setLoading(false);
        }
    };

    const showToast = (message, type = "success") => setToast({ message, type });
    const closeToast = () => setToast({ message: "", type: "success" });

    const approveLeave = async (id) => {
        setProcessing(id);
        try {
            const res = await api.put(`/leaves/approve/${id}`);
            showToast(res.data.message || "Leave approved successfully.", "success");
            fetchLeaves();
        } catch (error) {
            showToast(error.response?.data?.message || "Failed to approve leave.", "danger");
        } finally {
            setProcessing(null);
        }
    };

    const rejectLeave = async (id) => {
        setProcessing(id);
        try {
            const res = await api.put(`/leaves/reject/${id}`);
            showToast(res.data.message || "Leave rejected successfully.", "danger");
            fetchLeaves();
        } catch (error) {
            showToast(error.response?.data?.message || "Failed to reject leave.", "danger");
        } finally {
            setProcessing(null);
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* ✅ Toast — auto-dismisses on its own, no manual setTimeout needed here */}
            <Toast message={toast.message} type={toast.type} onClose={closeToast} />

            <h2 className="mb-4">Pending Leave Requests</h2>

            {leaves.length === 0 ? (
                <div className="alert alert-info">
                    No pending leave requests at the moment.
                </div>
            ) : (
                <>
                    {/* DESKTOP — Table */}
                    <div className="d-none d-md-block">
                        <div className="card">
                            <div className="card-body p-0">
                                <div className="table-responsive">
                                    <table className="table table-bordered table-hover mb-0">
                                        <thead className="table-dark">
                                            <tr>
                                                <th>Name</th>
                                                <th>Emp ID</th>
                                                <th>Leave Type</th>
                                                <th>Start Date</th>
                                                <th>End Date</th>
                                                <th>Reason</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {leaves.map((leave) => (
                                                <tr key={leave.id}>
                                                    <td>{leave.name}</td>
                                                    <td>{leave.employee_id}</td>
                                                    <td>{leave.leave_type}</td>
                                                    <td>{new Date(leave.start_date).toLocaleDateString()}</td>
                                                    <td>{new Date(leave.end_date).toLocaleDateString()}</td>
                                                    <td>{leave.reason}</td>
                                                    <td>
                                                        <span className="badge bg-warning text-dark">
                                                            {leave.status}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex gap-2">
                                                            <button
                                                                className="btn btn-success btn-sm"
                                                                onClick={() => approveLeave(leave.id)}
                                                                disabled={processing === leave.id}
                                                            >
                                                                {processing === leave.id ? "..." : "✓ Approve"}
                                                            </button>
                                                            <button
                                                                className="btn btn-danger btn-sm"
                                                                onClick={() => rejectLeave(leave.id)}
                                                                disabled={processing === leave.id}
                                                            >
                                                                {processing === leave.id ? "..." : "✕ Reject"}
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* MOBILE — Cards */}
                    <div className="d-md-none">
                        {leaves.map((leave) => (
                            <div key={leave.id} className="card mb-3 shadow-sm">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <h6 className="mb-0 fw-bold">{leave.name}</h6>
                                        <span className="badge bg-warning text-dark">
                                            {leave.status}
                                        </span>
                                    </div>

                                    <div style={{ fontSize: "14px" }}>
                                        <div className="row mb-1">
                                            <span className="col-5 text-muted">Emp ID</span>
                                            <span className="col-7">{leave.employee_id}</span>
                                        </div>
                                        <div className="row mb-1">
                                            <span className="col-5 text-muted">Leave Type</span>
                                            <span className="col-7">{leave.leave_type}</span>
                                        </div>
                                        <div className="row mb-1">
                                            <span className="col-5 text-muted">Start Date</span>
                                            <span className="col-7">{new Date(leave.start_date).toLocaleDateString()}</span>
                                        </div>
                                        <div className="row mb-1">
                                            <span className="col-5 text-muted">End Date</span>
                                            <span className="col-7">{new Date(leave.end_date).toLocaleDateString()}</span>
                                        </div>
                                        <div className="row mb-2">
                                            <span className="col-5 text-muted">Reason</span>
                                            <span className="col-7">{leave.reason}</span>
                                        </div>
                                    </div>

                                    <div className="d-flex gap-2 mt-2">
                                        <button
                                            className="btn btn-success btn-sm flex-fill"
                                            onClick={() => approveLeave(leave.id)}
                                            disabled={processing === leave.id}
                                        >
                                            {processing === leave.id ? "Processing..." : "✓ Approve"}
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm flex-fill"
                                            onClick={() => rejectLeave(leave.id)}
                                            disabled={processing === leave.id}
                                        >
                                            {processing === leave.id ? "Processing..." : "✕ Reject"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default ManagerLeaves;
