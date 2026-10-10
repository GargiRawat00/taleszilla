import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";

export default function GenerateStory() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    theme: "Friendship",
    emotion: "Happiness",
    ageGroup: "8-10",
    character: "Leo the Lion",
    storyLength: "short",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
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

      const res = await api.post("/ai/generate-story", {
        theme: form.theme,
        emotion: form.emotion,
        ageGroup: form.ageGroup,
        characters: [form.character],
        storyLength: form.storyLength,
      });

      const story = {
        ...res.data,
        id: res.data._id || res.data.id,
        chNo: 1,
      };

      navigate(`/story/${story.id}/1`, {
        state: { story },
      });
    } catch (err) {
      setError(err.response?.data?.message || "Unable to generate story");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create Your Story</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Theme</label>
          <input
            className="form-control"
            name="theme"
            value={form.theme}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Emotion</label>
          <input
            className="form-control"
            name="emotion"
            value={form.emotion}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Age Group</label>
          <select
            className="form-control"
            name="ageGroup"
            value={form.ageGroup}
            onChange={handleChange}
          >
            <option value="5-7">5-7</option>
            <option value="8-10">8-10</option>
            <option value="11-13">11-13</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Character</label>
          <input
            className="form-control"
            name="character"
            value={form.character}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Story Length</label>
          <select
            className="form-control"
            name="storyLength"
            value={form.storyLength}
            onChange={handleChange}
          >
            <option value="short">Short</option>
            <option value="medium">Medium</option>
          </select>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button className="btn btn-primary" disabled={loading}>
          {loading ? "Generating..." : "Generate Story"}
        </button>
      </form>
    </div>
  );
}
