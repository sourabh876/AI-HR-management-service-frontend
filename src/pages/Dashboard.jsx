import {
  useContext,
  useEffect,
  useState
} from "react";

import {
  AuthContext
} from "../context/AuthContext";

import api from "../api/axios";

function Dashboard() {

  const { user } =
    useContext(AuthContext);

  const [stats, setStats] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchStats();

  }, []);

  const fetchStats =
    async () => {

      try {

        const endpoint =

          user.role === "admin" ||
          user.role === "manager"

            ? "/dashboard/admin"

            : "/dashboard/employee";

        const res =
          await api.get(endpoint);

        setStats(
          res.data
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  if (loading) {

    return (
      <h3>
        Loading...
      </h3>
    );

  }

  if (!stats) {

    return (
      <h3>
        No data found
      </h3>
    );

  }

  // ==========================
  // Employee Dashboard
  // ==========================

  if (user.role === "employee") {

    return (

      <div className="container-fluid">

        <h2 className="mb-4">
          Welcome, {user.name}
        </h2>

        <div className="row">

          <div className="col-md-3 mb-3">

            <div className="card shadow-sm">

              <div className="card-body text-center">

                <h5>
                  Applied
                </h5>

                <h2>
                  {stats.totalApplied}
                </h2>

              </div>

            </div>

          </div>

          <div className="col-md-3 mb-3">

            <div className="card shadow-sm">

              <div className="card-body text-center">

                <h5>
                  Pending
                </h5>

                <h2>
                  {stats.pending}
                </h2>

              </div>

            </div>

          </div>

          <div className="col-md-3 mb-3">

            <div className="card shadow-sm">

              <div className="card-body text-center">

                <h5>
                  Approved
                </h5>

                <h2>
                  {stats.approved}
                </h2>

              </div>

            </div>

          </div>

          <div className="col-md-3 mb-3">

            <div className="card shadow-sm">

              <div className="card-body text-center">

                <h5>
                  Rejected
                </h5>

                <h2>
                  {stats.rejected}
                </h2>

              </div>

            </div>

          </div>

        </div> 
      </div>

    );

  }

  // ==========================
  // HR / Admin Dashboard
  // ==========================

  return (

    <div className="container-fluid">

      <h2 className="mb-4">
        HR Dashboard
      </h2>

      <div className="row">

        <div className="col-md-3 mb-3">

          <div className="card shadow-sm">

            <div className="card-body text-center">

              <h5>
                Employees
              </h5>

              <h2>
                {stats.totalEmployees}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-3 mb-3">

          <div className="card shadow-sm">

            <div className="card-body text-center">

              <h5>
                Pending
              </h5>

              <h2>
                {stats.pendingLeaves}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-3 mb-3">

          <div className="card shadow-sm">

            <div className="card-body text-center">

              <h5>
                Approved
              </h5>

              <h2>
                {stats.approvedLeaves}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-3 mb-3">

          <div className="card shadow-sm">

            <div className="card-body text-center">

              <h5>
                Rejected
              </h5>

              <h2>
                {stats.rejectedLeaves}
              </h2>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;