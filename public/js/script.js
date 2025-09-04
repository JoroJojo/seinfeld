async function initializeGame() {
  const seinfeldData = await getSeinfeldData();

  if (!seinfeldData) {
    console.error("Failed to load Seinfeld data.");
    return;
  }

  const { guesses, scene, title: correctTitle } = seinfeldData;

  const video = document.getElementById("seinfeld-clip");
  video.setAttribute("src", scene);

  const buttons = createButtons(guesses);

  setupButtonListeners(buttons, correctTitle);
}

async function getSeinfeldData() {
  const url = "http://localhost:3000/randomepisode";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching Seinfeld data:", error.message);
    return null;
  }
}

function populateButtons(buttons, episodes) {
  buttons.forEach((button, idx) => {
    if (episodes[idx]) {
      button.textContent = episodes[idx];
    }
  });
}

function createButtons(episodes) {
  episodes.forEach((episode) => {
    const button = document.createElement("button");
    button.textContent = episode;
    document.getElementById("button-container").appendChild(button);
  });
  return document.querySelectorAll("button");
}

function setupButtonListeners(buttons, correctTitle) {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.textContent === correctTitle) {
        button.style.backgroundColor = "green";
      } else {
        button.style.backgroundColor = "red";
      }
      disableAllButtons(buttons);
      queueNextGame();
    });
  });
}

function disableAllButtons(buttons) {
  buttons.forEach((button) => {
    button.disabled = true;
  });
}

async function queueNextGame() {
  const playAgainButton = document.createElement("button");
  playAgainButton.classList.add("play-again-button");
  playAgainButton.textContent = "Play Again?";

  const buttonContainer = document.getElementById("play-again-button");
  buttonContainer.appendChild(playAgainButton);

  playAgainButton.addEventListener("click", () => {
    const allButtons = document.querySelectorAll("button");
    allButtons.forEach((button) => {
      button.parentNode.removeChild(button);
    });
    initializeGame();
  });
}

// Start the game
initializeGame();
