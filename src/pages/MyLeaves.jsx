import {
  useState,
  useEffect
} from "react";

import api from "../api/axios";

function MyLeaves() {

  const [leaves, setLeaves] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchLeaves();

  }, []);

  const fetchLeaves =
    async () => {

      try {

        const res =
          await api.get(
            "/leaves/my-leaves"
          );

        console.log(res.data.Leaves)
        setLeaves(
          res.data.Leaves
        );

      } catch (error) {

        console.log(
          error
        );

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

  if (leaves.length === 0) {

    return (

      <div
        className="alert alert-info"
      >
        No leave requests found.
      </div>

    );

  }

  return (

    <div className="card">

      <div className="card-body">

        <h3 className="mb-3">
          My Leaves
        </h3>

        <div className="table-responsive">

          <table
            className="table table-bordered table-striped"
          >

            <thead>

              <tr>

                <th>Type</th>

                <th>Start</th>

                <th>End</th>

                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              {leaves.map((leave) => (

                <tr key={leave.id}>

                  <td>{leave.leave_type}</td>

                  <td>{
                    new Date(
                      leave.start_date
                    ).toLocaleDateString()
                  }</td>

                  <td>{
                    new Date(
                      leave.end_date
                    ).toLocaleDateString()
                  }</td>

                  <td>

                    <span
                      className={
                        leave.status === "approved"
                          ? "badge bg-success"
                          : leave.status === "rejected"
                            ? "badge bg-danger"
                            : "badge bg-warning text-dark"
                      }
                    >
                      {leave.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );
}

export default MyLeaves;