import React, { useState } from "react";
import { login } from "../services/authService";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(form);
      window.location.href = "/";
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4">Login to TalesZilla</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          className="form-control mb-3"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          className="form-control mb-3"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button className="btn btn-primary w-100">
          Login
        </button>
      </form>

      {message && (
        <div className="alert alert-danger mt-3">
          {message}
        </div>
      )}

      <p className="mt-3">
        New to TalesZilla?{" "}
        <a href="/register">Create account</a>
      </p>
    </div>
  );
}

export default Login;
