const players = document.querySelectorAll(".player");

players.forEach(function initializePlayer(player) {
    const video = player.querySelector("video.viewer"),
        playButton = player.querySelector("button[title='Toggle Play']"),
        volumeSlider = player.querySelector("input[name=volume]"),
        seeker = player.querySelector(".progress"),
        seekerProgress = seeker.querySelector(".progress__filled"),
        speedSlider = player.querySelector("input[name=playbackRate]");
        skipButtons = player.querySelectorAll("button[data-skip]"),
        fullscreenButton = player.querySelector("button[title='Go Fullscreen']");

    let seeking = false;

    const toggleVideoPlayback = () => {
        video.paused ? video.play() : video.pause();
        playButton.textContent = video.paused ? "▶️" : "⏸";
    }

    const updateVolume = (volume) => {
        video.volume = volume;
    }

    const updateSpeed = (speed) => {
        video.playbackRate = speed;
    }

    const seekTo = (percentage) => video.currentTime = video.duration * percentage

    const updateSeekerBar = () => {
        seekerProgress.style.flexBasis = `${video.currentTime / video.duration * 100}%`;
    }

    updateSeekerBar();

    // Bind event listeners
    video.addEventListener("click", toggleVideoPlayback);
    video.addEventListener("timeupdate", updateSeekerBar);
    skipButtons.forEach(function addEventListener(button) {
            button.addEventListener("click", (event) => {
                video.currentTime += parseInt(event.target.dataset.skip, 10);
            })
        }
    );
    playButton.addEventListener("click", toggleVideoPlayback);
    volumeSlider.addEventListener("input", (event) => updateVolume(event.target.value));
    speedSlider.addEventListener("input", (event) => updateSpeed(event.target.value));
    fullscreenButton.addEventListener("click", () => { video.requestFullscreen() });
    seeker.addEventListener("mousedown", () => seeking = true);
    seeker.addEventListener("mouseup", (event) => {
        seekTo(event.offsetX / seeker.clientWidth);
        seeking = false;
    });
    seeker.addEventListener("mousemove", (event) => {
        if (!seeking) { return false; }
        seekTo(event.offsetX / seeker.clientWidth);
    });
});