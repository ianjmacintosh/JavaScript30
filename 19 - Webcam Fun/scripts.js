const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const filmstrip = document.querySelector('.strip');
const snapSound = document.querySelector('.snap');

function getVideo() {
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
    })
        .then((localMediaStream) => {
            console.log(localMediaStream);
            video.srcObject = localMediaStream;
            video.play();
        })
        .catch(err => {
            console.error(`Oh no`, err);
        });
}