import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();

app.use(cors());
app.use(express.json());

const stories = JSON.parse(
  fs.readFileSync(new URL("./data/storiesData.json", import.meta.url), "utf-8"),
);

app.get("/", (req, res) => {
  res.send("TalesZilla API is running");
});

app.get("/api/stories", (req, res) => {
  res.json(stories);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
