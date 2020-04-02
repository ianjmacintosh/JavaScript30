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
function seekTo(newTime) {
    video.currentTime = newTime;
}

function handleSeekerActivity(event) {
    if (dragging) {
        seekTo((event.offsetX / seeker.clientWidth) * video.duration);
    }
}

// * User can skip ahead or backward with skip buttons
function skip() {
    let newTime = video.currentTime + parseInt(this.dataset.skip, 10);
    seekTo(newTime);
}

// * User can adjust playback rate with control
function setPlaybackRate() {
    video.playbackRate = playbackRate.value;
}

// Bind our event listeners
volume.addEventListener("change", setVolume);

video.addEventListener("click", togglePlay);
buttons.play.addEventListener("click", togglePlay);

video.addEventListener("timeupdate", updateSeeker);

seeker.addEventListener("mousemove", handleSeekerActivity);
seeker.addEventListener("mousedown", () => dragging = true);
seeker.addEventListener("mouseup", () => dragging = false);

buttons.skipBack.addEventListener("click", skip);
buttons.skipForward.addEventListener("click", skip);

playbackRate.addEventListener("change", setPlaybackRate);

updateSeeker(); // Update the seeker to show we're at 0% status