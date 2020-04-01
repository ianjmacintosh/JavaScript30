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

// # Inventory of functionality:
// * Volume control adjusts video volume
function setVolume() {
    console.log(`Volume now set to ${volume.value}`);
    video.volume = volume.value;
}
// * Play button plays and pauses
// * Progress bar updates while video plays
// * User can click or drag seeker to navigate video
// * User can skip ahead or backward with skip buttons
// * User can adjust playback rate with control

// Bind our event listeners
volume.addEventListener("change", setVolume);