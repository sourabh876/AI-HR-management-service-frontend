import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "./MainLayout.css"

function MainLayout() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    // Controls whether the sidebar is open on mobile
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    // Close sidebar when a link is clicked on mobile
    const handleLinkClick = () => {
        setSidebarOpen(false);
    };

    // Helper to highlight the active link
    const isActive = (path) => location.pathname === path;

    const linkStyle = (path) => ({
        color: isActive(path) ? "#ffc107" : "white",
        textDecoration: "none",
        fontWeight: isActive(path) ? "bold" : "normal",
    });

    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>

            {/* ----------------------------------------------------------------
                Overlay — dark background behind sidebar on mobile
                Clicking it closes the sidebar
            ---------------------------------------------------------------- */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    style={{
                        position: "fixed",
                        inset: 0,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        zIndex: 998,
                        display: "block",
                    }}
                />
            )}

            {/* ----------------------------------------------------------------
                Sidebar
            ---------------------------------------------------------------- */}
            <div
                style={{
                    width: "250px",
                    backgroundColor: "#212529",
                    color: "white",
                    padding: "20px 16px",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    height: "100vh",
                    zIndex: 999,
                    overflowY: "auto",
                    // On mobile: slide in/out. On desktop: always visible.
                    transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
                    transition: "transform 0.3s ease",
                }}
                // On desktop (min-width 768px) always show sidebar
                className="sidebar"
            >
                {/* Sidebar Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h4 style={{ margin: 0 }}>HRMS</h4>
                    {/* Close button — only useful on mobile */}
                    <button className="sidebar-close-btn"
                        onClick={() => setSidebarOpen(false)}
                        style={{
                            background: "none",
                            border: "none",
                            color: "white",
                            fontSize: "22px",
                            cursor: "pointer",
                            lineHeight: 1,
                        }}
                        aria-label="Close sidebar"
                    >
                        &times;
                    </button>
                </div>

                <hr style={{ borderColor: "#555" }} />

                {/* Nav Links */}
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>

                    <li style={{ marginBottom: "16px" }}>
                        <Link to="/dashboard" style={linkStyle("/dashboard")} onClick={handleLinkClick}>
                            🏠 Dashboard
                        </Link>
                    </li>

                    <li style={{ marginBottom: "16px" }}>
                        <Link to="/apply-leave" style={linkStyle("/apply-leave")} onClick={handleLinkClick}>
                            📝 Apply Leave
                        </Link>
                    </li>

                    <li style={{ marginBottom: "16px" }}>
                        <Link to="/my-leaves" style={linkStyle("/my-leaves")} onClick={handleLinkClick}>
                            📋 My Leaves
                        </Link>
                    </li>

                    {user.role !== "employee" && (
                        <li style={{ marginBottom: "16px" }}>
                            <Link to="/manager-leaves" style={linkStyle("/manager-leaves")} onClick={handleLinkClick}>
                                👔 Manager Requests
                            </Link>
                        </li>
                    )}

                    <li style={{ marginBottom: "16px" }}>
                        <Link to="/leave-balance" style={linkStyle("/leave-balance")} onClick={handleLinkClick}>
                            ⚖️ Leave Balance
                        </Link>
                    </li>

                    <li style={{ marginBottom: "16px" }}>
                        <Link to="/chatbot" style={linkStyle("/chatbot")} onClick={handleLinkClick}>
                            🤖 Chatbot
                        </Link>
                    </li>

                    <li style={{ marginTop: "32px" }}>
                        <button
                            className="btn btn-danger w-100"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </li>

                </ul>
            </div>

            {/* ----------------------------------------------------------------
                Main Content Area
            ---------------------------------------------------------------- */}
            <div className="main-content" style={{ flex: 1, display: "flex", flexDirection: "column" }}>

                {/* Top Navbar */}
                <div
                    style={{
                        backgroundColor: "#f8f9fa",
                        borderBottom: "1px solid #dee2e6",
                        padding: "12px 20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        position: "sticky",
                        top: 0,
                        zIndex: 100,
                    }}
                >
                    {/* Hamburger button — opens sidebar on mobile */}
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="hamburger-btn"
                        style={{
                            background: "none",
                            border: "none",
                            fontSize: "24px",
                            cursor: "pointer",
                            lineHeight: 1,
                            padding: "0 4px",
                        }}
                        aria-label="Open sidebar"
                    >
                        ☰
                    </button>

                    <div className=" d-flex w-100 justify-content-between align-items-center">
                        <span style={{ fontWeight: "500" }}>
                            Employee Leave Management System
                        </span>

                        <div className="d-flex gap-4 align-items-center">

                            {user?.name && (
                            <span
                                style={{
                                    marginLeft: "auto",
                                    fontSize: "14px",
                                    color: "#6c757d",
                                }}
                            >
                                👤 {user.name}
                            </span>
                        )}

                                {
                            user.role === "admin" && (

                                <span className="nav-item">

                                    <Link
                                        to="/create-user"
                                        className="btn btn-primary"
                                    >
                                        Create User
                                    </Link>

                                </span>

                            )
                        }

                        {/* Show logged in user name on the right */}
                        
                        </div>
                    </div>
                </div>

                {/* Page Content */}
                <div style={{ padding: "24px", flex: 1 }}>
                    <Outlet />
                </div>

            </div>

            {/* ----------------------------------------------------------------
                CSS — handles desktop sidebar always-visible behavior
            ---------------------------------------------------------------- */}
            <style>{`
                /* Desktop: sidebar always visible, push content right */
                @media (min-width: 768px) {
                    .sidebar {
                        transform: translateX(0) !important;
                    }
                    .main-content {
                        margin-left: 250px;
                    }
                    .hamburger-btn {
                        display: none;
                    }
                }

                /* Mobile: full width content, sidebar slides over */
                @media (max-width: 767px) {
                    .main-content {
                        margin-left: 0;
                    }
                    .hamburger-btn {
                        display: block;
                    }
                }
            `}</style>

        </div>
    );
}

export default MainLayout;
