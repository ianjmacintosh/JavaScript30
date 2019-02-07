const players = document.querySelectorAll(".player");

players.forEach(function initializePlayer(player) {
    const video = player.querySelector("video.viewer");
    const playButton = player.querySelector("button[title='Toggle Play']");
    const volumeSlider = player.querySelector("input[name=volume]");
    const seeker = player.querySelector(".progress");
    const seekerProgress = seeker.querySelector(".progress__filled");

    let seeking = false;

    const toggleVideoPlayback = () => {
        video.paused ? video.play() : video.pause()
    }

    const updateVolume = (volume) => {
        video.volume = volume;
    }

    const seekTo = (percentage) => {
        const newTime = video.duration * percentage;
        video.currentTime = newTime;
    }

    const updateSeekerBar = () => {
        console.log("It ran" + video.duration);
        seekerProgress.style.flexBasis = `${video.currentTime / video.duration * 100}%`;
    }

    if (video.readyState === 0) {
        video.addEventListener("load", () => updateSeekerBar);
    } else {
        updateSeekerBar();
    }
    video.addEventListener("click", () => toggleVideoPlayback(video));
    video.addEventListener("timeupdate", () => updateSeekerBar(video));
    playButton.addEventListener("click", () => toggleVideoPlayback(video));
    volumeSlider.addEventListener("input", (event) => updateVolume(event.target.value));
    seeker.addEventListener("mousedown", () => seeking = true);
    seeker.addEventListener("mouseup", (event) => {
        seekTo(event.offsetX / seeker.clientWidth);
        seeking = false;
    });
    seeker.addEventListener("mousemove", (event) => {
        if (!seeking) { return false; }
        console.log(`Seek to ${event.offsetX / seeker.clientWidth * 100}%`);
        seekTo(event.offsetX / seeker.clientWidth);
    });
});