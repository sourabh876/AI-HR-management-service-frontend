import { useEffect, useState } from "react";
import api from "../api/axios";

function ManagerLeaves() {
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("info"); // "success" or "danger"

    useEffect(() => {
        fetchLeaves();
    }, []);

    const fetchLeaves = async () => {
        try {
            const res = await api.get("/leaves/pending-leaves");
            setLeaves(res.data.Leaves);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const approveLeave = async (id) => {
        try {
            await api.put(`/leaves/approve/${id}`);
            setMessage("Leave approved successfully.");
            setMessageType("success");
            fetchLeaves();
        } catch (error) {
            setMessage(error.response?.data?.message || "Failed to approve leave.");
            setMessageType("danger");
        }
    };

    const rejectLeave = async (id) => {
        try {
            await api.put(`/leaves/reject/${id}`);
            setMessage("Leave rejected successfully.");
            setMessageType("danger");
            fetchLeaves();
        } catch (error) {
            setMessage(error.response?.data?.message || "Failed to reject leave.");
            setMessageType("danger");
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
            <h2 className="mb-4">Pending Leave Requests</h2>

            {/* Alert Message */}
            {message && (
                <div
                    className={`alert alert-${messageType} alert-dismissible`}
                    role="alert"
                >
                    {message}
                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setMessage("")}
                        aria-label="Close"
                    />
                </div>
            )}

            {/* Empty state */}
            {leaves.length === 0 ? (
                <div className="alert alert-info">
                    No pending leave requests at the moment.
                </div>
            ) : (
                <>
                    {/* --------------------------------------------------------
                        DESKTOP VIEW — Table (visible on md and above)
                    -------------------------------------------------------- */}
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
                                                            >
                                                                ✓ Approve
                                                            </button>
                                                            <button
                                                                className="btn btn-danger btn-sm"
                                                                onClick={() => rejectLeave(leave.id)}
                                                            >
                                                                ✕ Reject
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

                    {/* --------------------------------------------------------
                        MOBILE VIEW — Cards (visible on small screens only)
                    -------------------------------------------------------- */}
                    <div className="d-md-none">
                        {leaves.map((leave) => (
                            <div key={leave.id} className="card mb-3 shadow-sm">
                                <div className="card-body">

                                    {/* Header row — name + status badge */}
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <h6 className="mb-0 fw-bold">{leave.name}</h6>
                                        <span className="badge bg-warning text-dark">
                                            {leave.status}
                                        </span>
                                    </div>

                                    {/* Details */}
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

                                    {/* Action buttons */}
                                    <div className="d-flex gap-2 mt-2">
                                        <button
                                            className="btn btn-success btn-sm flex-fill"
                                            onClick={() => approveLeave(leave.id)}
                                        >
                                            ✓ Approve
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm flex-fill"
                                            onClick={() => rejectLeave(leave.id)}
                                        >
                                            ✕ Reject
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