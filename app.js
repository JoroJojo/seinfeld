const express = require("express");
const util = require("./public/js/util.js");
const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

app.get("/randomepisode", (req, res) => {
  const { season, episode, title, scene } = util.getRandomEpisode();
  let randomEpisodeArray = util.getRandomEpisodeList(title);

  // randomize the answer insertion, otherwise the user can predict the answer based on position
  const randIdx = Math.floor(Math.random() * (randomEpisodeArray.length + 1));
  randomEpisodeArray.splice(randIdx, 0, title);

  // scene is path to .mp4 file that is used for <video> html
  res.json({
    season: season,
    episode: episode,
    title: title,
    scene: scene,
    guesses: randomEpisodeArray,
  });
});
