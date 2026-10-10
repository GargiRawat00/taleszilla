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

        const stories = await Promise.all(
          res.data
            .map((item) => item.story)
            .filter(Boolean)
            .map(async (story) => {
              try {
                const img = await api.get("/images/story", {
                  params: {
                    title: story.title,
                    theme: story.theme,
                    emotion: story.emotion,
                  },
                });

                return {
                  ...story,
                  id: story._id || story.id,
                  title_img: img.data.image,
                  imageAuthor: img.data.author,
                  isAdded: 1,
                  chNo: story.chNo || 1,
                };
              } catch {
                return {
                  ...story,
                  id: story._id || story.id,
                  title_img: story.image || "/images/Logo.png",
                  isAdded: 1,
                  chNo: story.chNo || 1,
                };
              }
            }),
        );

        setFavorites(stories);
      } catch (err) {
        console.error("Library error:", err.response?.data || err.message);
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
