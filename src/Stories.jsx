import React, {
  useEffect,
  useState
} from "react";

import Tile from "./components/Tile";
import api from "./api";

export default function Stories({
  sdata,
  setSdata
}) {
  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const loadStories = async () => {
      try {
        const res =
          await api.get("/stories");

        const stories =
          await Promise.all(
            res.data.map(async (story) => {
              try {
                const img =
                  await api.get(
                    "/images/story",
                    {
                      params: {
                        title: story.title,
                        theme: story.theme,
                        emotion: story.emotion
                      }
                    }
                  );

                return {
                  ...story,
                  title_img:
                    img.data.image,
                  imageAuthor:
                    img.data.author,
                  isAdded: 0,
                  chNo: 1
                };
              } catch {
                return {
                  ...story,
                  title_img:
                    "/images/Logo.png",
                  isAdded: 0,
                  chNo: 1
                };
              }
            })
          );

        setSdata(stories);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load stories"
        );
      } finally {
        setLoading(false);
      }
    };

    loadStories();
  }, [setSdata]);

  if (loading) {
    return (
      <div className="stories">
        <h2>Loading stories...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="stories">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="stories">
      <h1>Story time</h1>

      <div className="tiles">
        {sdata.map((entry) => (
          <Tile
            key={entry.id}
            entry={entry}
            sdata={sdata}
            setSdata={setSdata}
          />
        ))}
      </div>

      <p
        style={{
          textAlign: "center",
          marginTop: "25px",
          opacity: 0.7
        }}
      >
        Images provided by Pixabay
      </p>
    </div>
  );
}
