import React, { useState } from "react";
import api from "./api";
import { useNavigate } from "react-router-dom";

export default function GenerateStory() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    theme: "Friendship",
    emotion: "Happiness",
    ageGroup: "8-10",
    character: "Leo the Lion",
    storyLength: "short"
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await api.post(
        "/ai/generate-story",
        {
          theme: form.theme,
          emotion: form.emotion,
          ageGroup: form.ageGroup,
          characters: [form.character],
          storyLength: form.storyLength
        }
      );

      const story = res.data.story;

      navigate(
        `/story/${story.id}/1`,
        {
          state: {
            newentry: story
          }
        }
      );

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to generate story"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container mt-5 mb-5"
      style={{ maxWidth: "650px" }}
    >
      <h1 className="text-center mb-4">
        Create Your Story
      </h1>

      <form onSubmit={handleSubmit}>
        <label className="form-label">
          Theme
        </label>

        <select
          name="theme"
          value={form.theme}
          onChange={handleChange}
          className="form-control mb-3"
        >
          <option>Friendship</option>
          <option>Courage</option>
          <option>Kindness</option>
          <option>Sharing</option>
          <option>Honesty</option>
        </select>

        <label className="form-label">
          Emotion
        </label>

        <select
          name="emotion"
          value={form.emotion}
          onChange={handleChange}
          className="form-control mb-3"
        >
          <option>Happiness</option>
          <option>Fear</option>
          <option>Jealousy</option>
          <option>Anger</option>
          <option>Sadness</option>
        </select>

        <label className="form-label">
          Age Group
        </label>

        <select
          name="ageGroup"
          value={form.ageGroup}
          onChange={handleChange}
          className="form-control mb-3"
        >
          <option value="6-8">6-8</option>
          <option value="8-10">8-10</option>
          <option value="10-12">10-12</option>
        </select>

        <label className="form-label">
          Character
        </label>

        <input
          name="character"
          value={form.character}
          onChange={handleChange}
          className="form-control mb-3"
          placeholder="Leo the Lion"
          required
        />

        <label className="form-label">
          Story Length
        </label>

        <select
          name="storyLength"
          value={form.storyLength}
          onChange={handleChange}
          className="form-control mb-4"
        >
          <option value="short">Short</option>
          <option value="medium">Medium</option>
          <option value="long">Long</option>
        </select>

        <button
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading
            ? "Generating..."
            : "Generate Story"}
        </button>
      </form>

      {error && (
        <div className="alert alert-danger mt-3">
          {error}
        </div>
      )}
    </div>
  );
}
