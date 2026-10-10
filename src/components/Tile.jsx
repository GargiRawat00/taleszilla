import React, { useState } from "react";
import "../App.css";

import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Tile({
  entry,
  sdata,
  setSdata
}) {
  const navigate = useNavigate();

  const [added, setAdded] =
    useState(Boolean(entry.isAdded));

  const handleFavorite = async () => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      if (!added) {
        await api.post(
          `/favorites/${entry.id}`
        );
      } else {
        await api.delete(
          `/favorites/${entry.id}`
        );
      }

      const val = !added;

      setAdded(val);

      setSdata(
        sdata.map((story) =>
          story.id === entry.id
            ? {
                ...story,
                isAdded: val ? 1 : 0
              }
            : story
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const readStory = () => {
    navigate(
      `/story/${entry.id}/${entry.chNo || 1}`,
      {
        state: {
          newentry: entry
        }
      }
    );
  };

  return (
    <div className="tile">
      <img
        className="tileimg"
        src={
          entry.title_img ||
          "/images/Logo.png"
        }
        alt={entry.title}
        onError={(e) => {
          e.currentTarget.src =
            "/images/Logo.png";
        }}
      />

      <div
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          flex: 1
        }}
      >
        <h3>
          {entry.title}
        </h3>

        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            marginBottom: "12px"
          }}
        >
          {entry.theme && (
            <span
              className="badge bg-primary"
            >
              {entry.theme}
            </span>
          )}

          {entry.emotion && (
            <span
              className="badge bg-warning text-dark"
            >
              {entry.emotion}
            </span>
          )}
        </div>

        {entry.eqLesson && (
          <p
            style={{
              fontSize: "14px",
              opacity: 0.85
            }}
          >
            {entry.eqLesson}
          </p>
        )}

        <div className="btn-ctn">
          <Button
            variant="primary"
            style={{
              flex: 1
            }}
            onClick={readStory}
          >
            Start Reading
          </Button>

          <Button
            variant={
              added
                ? "success"
                : "outline-primary"
            }
            style={{
              width: "52px"
            }}
            onClick={handleFavorite}
          >
            {added ? "?" : "?"}
          </Button>
        </div>

        {entry.imageAuthor && (
          <small
            style={{
              marginTop: "10px",
              opacity: 0.55
            }}
          >
            Image by {entry.imageAuthor}
          </small>
        )}
      </div>
    </div>
  );
}
