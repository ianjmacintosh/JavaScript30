const players = document.querySelectorAll(".player");

players.forEach(function initializePlayer(player) {
    const video = player.querySelector("video.viewer");
    const playButton = player.querySelector("button[title='Toggle Play']");
    const volumeSlider = player.querySelector("input[name=volume]");

    const toggleVideoPlayback = (video) => {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }

    const updateVolume = (volume) => {
        video.volume = volume;
    }

    const updateSeeker = (percentage) => {
        const newTime = video.duration * percentage;
        video.currentTime = newTime;
    }

    video.addEventListener("click", () => toggleVideoPlayback(video));
    playButton.addEventListener("click", () => toggleVideoPlayback(video));
    volumeSlider.addEventListener("input", (event) => updateVolume(event.target.value));
});