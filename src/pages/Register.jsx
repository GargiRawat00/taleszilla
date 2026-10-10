import React, { useState } from "react";
import { register } from "../services/authService";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    ageGroup: "8-10"
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
      await register(form);
      window.location.href = "/";
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4">Join TalesZilla</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          className="form-control mb-3"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />

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
          minLength="6"
          required
        />

        <select
          name="ageGroup"
          className="form-control mb-3"
          value={form.ageGroup}
          onChange={handleChange}
        >
          <option value="6-8">6 - 8 years</option>
          <option value="8-10">8 - 10 years</option>
          <option value="10-12">10 - 12 years</option>
        </select>

        <button className="btn btn-success w-100">
          Create Account
        </button>
      </form>

      {message && (
        <div className="alert alert-danger mt-3">
          {message}
        </div>
      )}

      <p className="mt-3">
        Already have an account?{" "}
        <a href="/login">Login</a>
      </p>
    </div>
  );
}

export default Register;
