import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";



function CreateUser() {

  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "employee",
    department_id: "",
    password: "",
    confirmPassword: ""
  });

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value
    });

  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setMessage("");
      setError("");

      if (
        form.password !==
        form.confirmPassword
      ) {

        return setError(
          "Passwords do not match"
        );

      }

      try {

        await api.post(
          "/auth/createuser",
          {
            name: form.name,
            email: form.email,
            role: form.role,
            department_id:
              form.department_id,
            password:
              form.password
          }
        );

        setMessage(
          "User created successfully"
        );

        setForm({
          name: "",
          email: "",
          role: "",
          department_id: "",
          password: "",
          confirmPassword: ""
        });


        navigate("/dashboard")

      } catch (error) {

        setError(
          error.response?.data?.message ||
          "Failed to create user"
        );

      }

    };

  return (

    <div className="container py-4">

      <div className="row justify-content-center">

        <div className="col-lg-6 col-md-8 col-12">

          <div className="card shadow border-0">

            <div className="card-header bg-primary text-white">

              <h3 className="mb-0">
                Create New User
              </h3>

            </div>

            <div className="card-body">

              {message && (

                <div className="alert alert-success">

                  {message}

                </div>

              )}

              {error && (

                <div className="alert alert-danger">

                  {error}

                </div>

              )}

              <form
                onSubmit={handleSubmit}
              >

                <div className="mb-3">

                  <label className="form-label">

                    Full Name

                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="mb-3">

                  <label className="form-label">

                    Email Address

                  </label>

                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="mb-3">

                  <label className="form-label">

                    Role

                  </label>

                  <select
                    className="form-select"
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    required
                  >

                    <option value="employee">
                      Employee
                    </option>

                    <option value="manager">
                      Manager
                    </option>

                    <option value="admin">
                      Admin
                    </option>

                  </select>

                </div>

                <div className="mb-3">

                  <label className="form-label">

                    Department

                  </label>

                  <select
                    className="form-select"
                    name="department_id"
                    value={form.department_id}
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Select Department
                    </option>

                    <option value="1">
                      HR
                    </option>

                    <option value="2">
                      IT
                    </option>

                    <option value="3">
                      Finance
                    </option>

                    <option value="4">
                      Sales
                    </option>

                  </select>

                </div>

                <div className="mb-3">

                  <label className="form-label">

                    Password

                  </label>

                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="mb-4">

                  <label className="form-label">

                    Confirm Password

                  </label>

                  <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                  />

                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100"
                >
                  Create User
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