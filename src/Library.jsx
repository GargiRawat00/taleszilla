import React, { useEffect, useState } from "react";
import Tile from "./components/Tile";
import api from "./api";
import { useNavigate } from "react-router-dom";

export default function Library({ sdata, setSdata }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const loadFavorites = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await api.get("/favorites");

        const stories = res.data
          .map((item) => item.story)
          .filter(Boolean)
          .map((story) => ({
            ...story,
            isAdded: 1,
            chNo: story.chNo || 1
          }));

        setFavorites(stories);
      } catch (err) {
        console.error(
          "Library error:",
          err.response?.data || err.message
        );
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [navigate]);

  if (loading) {
    return (
      <div className="stories">
        <h2>Loading library...</h2>
      </div>
    );
  }

  return (
    <div className="stories">
      <h1>My Library</h1>

      {favorites.length === 0 ? (
        <div className="text-center">
          <h4>No favorite stories yet.</h4>
          <button
            className="btn btn-primary mt-3"
            onClick={() => navigate("/stories")}
          >
            Explore Stories
          </button>
        </div>
      ) : (
        <div className="tiles">
          {favorites.map((entry) => (
            <Tile
              key={entry.id}
              entry={entry}
              sdata={favorites}
              setSdata={setFavorites}
            />
          ))}
        </div>
      )}
    </div>
  );
}
