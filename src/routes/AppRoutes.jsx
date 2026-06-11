import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Login from "../pages/Login";
import CreateUser from "../pages/CreateUser";

import Dashboard from "../pages/Dashboard";
import ApplyLeave from "../pages/ApplyLeave";
import MyLeaves from "../pages/MyLeaves";
import Notifications from "../pages/Notifications";
import ManagerLeaves from "../pages/ManagerLeaves";
import LeaveBalance from "../pages/LeaveBalance";
import Chatbot from "../pages/Chatbot";
import ProtectedRoute from "./ProtectedRoute";
import ManagerRoute from "./ManagerRoutes";

import MainLayout from "../layouts/MainLayout";

function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/create-user"
                    element={
                        <ProtectedRoute>
                            <CreateUser />
                        </ProtectedRoute>
                    }
                />

                <Route
                    element={
                        <ProtectedRoute>
                            <MainLayout />
                        </ProtectedRoute>
                    }
                >

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/apply-leave"
                        element={<ApplyLeave />}
                    />

                    <Route
                        path="/my-leaves"
                        element={<MyLeaves />}
                    />

                    <Route
                        path="/manager-leaves"
                        element={
                            <ManagerRoute>
                                <ManagerLeaves />
                            </ManagerRoute>
                        }
                    />

                    <Route
                        path="/leave-balance"
                        element={
                            <ProtectedRoute>
                                <LeaveBalance />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/chatbot"
                        element={
                            <ProtectedRoute>
                                <Chatbot />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/notifications"
                        element={<Notifications />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>

    );
}

export default AppRoutes;