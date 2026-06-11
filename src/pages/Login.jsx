import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function Login() {

  const navigate = useNavigate();

  const { login } =
    useContext(AuthContext);

  const [form, setForm] =
    useState({
      email: "",
      password: ""
    });

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

    try {

      const res =
      await api.post(
        "/auth/login",
        form
      );

      login(
        res.data.user,
        res.data.token
      );

      navigate("/dashboard");

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Login Failed"
      );

    }

  };

  return (

    <div
      className="container vh-100 d-flex justify-content-center align-items-center"
    >

      <div
        className="card shadow"
        style={{
          width:"400px"
        }}
      >

        <div className="card-body">

          <h2
            className="text-center mb-4"
          >
            HRMS Login
          </h2>

          {error && (

            <div
              className="alert alert-danger"
            >
              {error}
            </div>

          )}

          <form
            onSubmit={handleSubmit}
          >

            <div className="mb-3">

              <label>
                Email
              </label>

              <input
                type="email"
                className="form-control"
                name="email"
                value={form.email}
                onChange={handleChange}
              />

            </div>

            <div className="mb-3">

              <label>
                Password
              </label>

              <input
                type="password"
                className="form-control"
                name="password"
                value={form.password}
                onChange={handleChange}
              />

            </div>

            <button
              className="btn btn-primary w-100"
            >
              Login
            </button>

          </form>

          <p
            className="text-center mt-3"
          >
            Don't have an account?{" "}
            <Link to="/register">
              Register
            </Link>
          </p>

        </div>

      </div>

    </div>

  );

}

export default Login;