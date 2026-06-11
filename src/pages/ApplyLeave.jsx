import {
  useState
} from "react";

import api from "../api/axios";

function ApplyLeave() {

  const [form, setForm] =
    useState({
      leave_type: "",
      start_date: "",
      end_date: "",
      reason: ""
    });

  const [message, setMessage] =
    useState("");

  const handleChange =
    (e) => {

      setForm({
        ...form,
        [e.target.name]:
          e.target.value
      });

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const res =
          await api.post(
            "/leaves/",
            form
          );

        setMessage(
          "Leave applied successfully"
        );

        console.log(res.data);

      } catch (error) {

        setMessage(
          error.response?.data?.message ||
          "Something went wrong"
        );

      }

    };

  return (

    <div
      className="card"
    >

      <div
        className="card-body"
      >

        <h3>
          Apply Leave
        </h3>

        <form
          onSubmit={handleSubmit}
        >

          <div className="mb-3">

            <label>
              Leave Type
            </label>

            <select
              className="form-control"
              name="leave_type"
              onChange={handleChange}
            >

              <option value="">
                Select
              </option>

              <option value="Sick Leave">
                Sick Leave
              </option>

              <option value="Casual Leave">
                Casual Leave
              </option>

              <option value="Earned Leave">
                Earned Leave
              </option>

            </select>

          </div>

          <div className="mb-3">

            <label>
              Start Date
            </label>

            <input
              type="date"
              className="form-control" 
              name="start_date"
              onChange={handleChange}
            />

          </div>

          <div className="mb-3">

            <label>
              End Date
            </label>

            <input
              type="date"
              className="form-control"
              name="end_date" 
              onChange={handleChange}

            />

          </div>

          <div className="mb-3">

            <label>
              Reason
            </label>

            <textarea
              className="form-control"
              name="reason"
              onChange={handleChange}
            />

          </div>

          <button
            className="btn btn-primary"
          >
            Apply Leave
          </button>

        </form>

        {message && (

          <div
            className="mt-3 alert alert-info"
          >
            {message}
          </div>

        )}

      </div>

    </div>

  );
}

export default ApplyLeave;