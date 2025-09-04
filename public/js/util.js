const fs = require("fs");

const seinfeldData = JSON.parse(
  fs.readFileSync("public/seinfeld-episodes/episodes.json", "utf8")
);

function getRandomEpisode() {
  const seasonKeys = Object.keys(seinfeldData);
  const randomSeasonKey =
    seasonKeys[Math.floor(Math.random() * seasonKeys.length)];
  const randomSeason = seinfeldData[randomSeasonKey];

  const episodeKeys = Object.keys(randomSeason);
  const randomEpisodeKey =
    episodeKeys[Math.floor(Math.random() * episodeKeys.length)];
  const randomEpisode = randomSeason[randomEpisodeKey];

  const { Title: title, Scenes: scenes } = randomEpisode;
  const randomScene = scenes[Math.floor(Math.random() * scenes.length)];

  return {
    season: randomSeasonKey,
    episode: randomEpisodeKey,
    title,
    scene: randomScene,
  };
}

function getRandomEpisodeList(episodeToExclude) {
  let options = [];
  let counter = 0;

  // user only gets 5 options in addition to episodeToExclude
  while (counter < 5) {
    const randomEpisode = getRandomEpisode();
    const title = randomEpisode.title;
    if (title === episodeToExclude || options.includes(title)) {
      continue;
    } else {
      options.push(title);
      counter++;
    }
  }
  return options;
}

const exportedFunctions = { getRandomEpisode, getRandomEpisodeList };
module.exports = exportedFunctions;
