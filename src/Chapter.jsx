import React, { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams
} from "react-router-dom";

import "./App.css";
import { Button } from "react-bootstrap";
import api from "./api";

export default function Chapter() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [story, setStory] = useState(
    location.state?.newentry || null
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStory = async () => {
      try {
        if (!story) {
          const res = await api.get(`/stories/${id}`);
          setStory(res.data);
        }
      } catch (err) {
        console.error("Story load error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadStory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const completeStory = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await api.put(`/progress/${id}`, {
        percentage: 100,
        completed: true
      });

      await api.post("/activity", {
        type: "story_completed",
        storyId: String(id)
      });

      alert("Story completed!");
    } catch (err) {
      console.error("Progress error:", err);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <h2>Loading story...</h2>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="container mt-5">
        <h2>Story not found</h2>
      </div>
    );
  }

  return (
    <div
      className="container mt-5 mb-5"
      style={{ maxWidth: "850px" }}
    >
      <h1 className="text-center">
        {story.title}
      </h1>

      <div className="text-center mb-4">
        {story.theme && (
          <span className="badge bg-primary me-2">
            {story.theme}
          </span>
        )}

        {story.emotion && (
          <span className="badge bg-warning text-dark">
            {story.emotion}
          </span>
        )}
      </div>

      {story.title_img && (
        <img
          src={story.title_img}
          alt={story.title}
          style={{
            width: "100%",
            maxHeight: "400px",
            objectFit: "cover",
            borderRadius: "12px",
            marginBottom: "25px"
          }}
        />
      )}

      <div
        style={{
          fontSize: "20px",
          lineHeight: "1.8",
          whiteSpace: "pre-wrap"
        }}
      >
        {story.content ||
          "Story content will appear here."}
      </div>

      {story.eqLesson && (
        <div className="alert alert-success mt-4">
          <h4>EQ Lesson</h4>
          <p>{story.eqLesson}</p>
        </div>
      )}

      {story.reflectionQuestions &&
        story.reflectionQuestions.length > 0 && (
          <div className="mt-4">
            <h3>Think About It</h3>

            {story.reflectionQuestions.map(
              (q, i) => (
                <p key={i}>
                  {i + 1}. {q}
                </p>
              )
            )}
          </div>
        )}

      <div className="d-flex justify-content-between mt-5">
        <Button
          variant="secondary"
          onClick={() => navigate("/stories")}
        >
          Back
        </Button>

        <Button
          variant="success"
          onClick={completeStory}
        >
          Complete Story
        </Button>
      </div>
    </div>
  );
}
