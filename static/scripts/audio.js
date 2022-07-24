var sound = new Howl({
    src: ['/static/audio/hoom_web_sample_white_noise.mp3'],
    volume: 0.5,
    onend: function () {
        alert('Finished!');
    }
});
sound.play()