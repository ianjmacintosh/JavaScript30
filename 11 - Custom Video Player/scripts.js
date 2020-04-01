// Get our elements
const player = document.querySelector(".player");
const video = player.querySelector("video");
const seeker = player.querySelector(".progress");
const seekerFiller = seeker.querySelector(".progress__filled");
const buttons = {
    play: player.querySelector("button[title='Toggle Play']"),
    skipBack: player.querySelector("button[data-skip='-10']"),
    skipForward: player.querySelector("button[data-skip='25']")
};
const playbackRate = player.querySelector("input[name='playbackRate']");
const volume = player.querySelector("input[name='volume']");

console.assert(player && video && seeker && seekerFiller && buttons && playbackRate && volume,
    "One of your elements could not be found");

// Define our functionality

// # Inventory of functionality:
// * Volume control adjusts video volume
function setVolume() {
    console.log(`Volume now set to ${volume.value}`);
    video.volume = volume.value;
}

// * Play button plays and pauses
function togglePlay() {
    if (video.paused) {
        buttons.play.textContent = "⏸️";
        video.play();
    }
    else {
        buttons.play.textContent = "▶️";
        video.pause();
    }
}
// * Progress bar updates while video plays
function updateSeeker() {
    seekerFiller.style.flexBasis = `${(video.currentTime / video.duration) * 100}%`;
}

// * User can click or drag seeker to navigate video
function seekTo(event) {
    let newTime = (event.offsetX / seeker.clientWidth) * video.duration;
    console.log(`Seeking to ${newTime}`);
    video.currentTime = newTime;
}

// * User can skip ahead or backward with skip buttons
// * User can adjust playback rate with control

// Bind our event listeners
volume.addEventListener("change", setVolume);

video.addEventListener("click", togglePlay);
buttons.play.addEventListener("click", togglePlay);

video.addEventListener("timeupdate", updateSeeker);

seeker.addEventListener("mouseup", seekTo);

updateSeeker(); // Update the seeker to show we're at 0% status