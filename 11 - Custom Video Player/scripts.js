// Get our elements
const player = document.querySelector(".player");
const video = player.querySelector("video");
const progressBar = player.querySelector(".progress");
const buttons = {
    play: player.querySelector("button[title='Toggle Play']"),
    skipBack: player.querySelector("button[data-skip='-10']"),
    skipForward: player.querySelector("button[data-skip='25']")
};
const playbackRate = player.querySelector("input[name='playbackRate']");
const volume = player.querySelector("input[name='volume']");

console.assert(player && video && progressBar && buttons && playbackRate && volume,
    "One of your elements could not be found");

// Define our functionality

// Bind our event listeners