let wakeLock = null;
document.getElementById("body").style.backgroundImage = 'url("static/images/stars.svg")';
// document.getElementsByClassName("instructions").style.display = 'none';

/* regForm.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(regForm);

    console.log("Form Data");
    for (let obj of formData) {
        console.log(obj);
    }
}; */


function startAll() {
    launchFullScreen(document.documentElement);
    const collection = document.getElementsByClassName("disappear");
    for (let i = 0; i < collection.length; i++) {
        collection[i].style.display = 'none';
    }
    document.getElementById("circle").style.display = 'block';
    document.getElementById("outC").style.display = 'block';
    document.getElementById("body").style.backgroundImage = "none";
    document.getElementById("body").style.backgroundColor = "black";
    document.getElementById("menu").style.display = "flex";
    document.getElementById("instructions").style.display = 'table';
}

function endAll() {
    const collection = document.getElementsByClassName("disappear");
    for (let i = 0; i < collection.length; i++) {
        collection[i].style.display = 'block';
    }
    document.getElementById("circle").style.display = 'none';
    document.getElementById("outC").style.display = 'none';
    document.getElementById("body").style.backgroundImage = 'url("static/images/stars.svg")';
    document.getElementById("body").style.backgroundColor = "black";
    document.getElementById("menu").style.display = "none";
    document.getElementById("instructions").style.display = 'none';
    music.pause();
    exitFullscreen();
    wakeLock.release();
}

function play(type) {
    startAll();
    if (type === 0) {
        console.log('8 minute sleep session initiated')
        initiate(8);
        window.timeW = 8;
    }

    else if (type === 1) {
        console.log('20 minute sleep session initiated')
        initiate(20);
        window.timeW = 20;
    }
}

async function end() {
    const collection = document.getElementsByClassName("disappear");
    for (let i = 0; i < collection.length; i++) {
        collection[i].style.display = 'block';
    }
    document.getElementById("circle").style.display = 'none';
    document.getElementById("outC").style.display = 'none';
    document.getElementById("body").style.backgroundImage = 'url("static/images/stars.svg")';
    document.getElementById("menu").style.display = "none";
    music.pause();
    exitFullscreen();
    try {
        wakeLock.release();
    }
    catch (err) {
        console.log('error, no wakelock in this damn piece of antique junk')
    }
}

function timer(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// const timer = ms => new Promise(res => setTimeout(res, ms))

async function instructions() {
    document.getElementById("instructions").style.display = 'table';
    const currentText = $('#alternating').text();
    console.log(currentText)
    const deafultText = "hi";
    $("#alternating").fadeOut("slow", function () {
        $('#alternating').text('hi');
        $("#alternating").delay(0).fadeIn("slow");
    });
    await timer(3000)
    $("#alternating").fadeOut("slow", function () {
        $('#alternating').text('when the instructions disappear, set your phone beside you, facing the ceiling');
        $("#alternating").delay(750).fadeIn("slow");
    });
    await timer(6000)
    $("#alternating").fadeOut("slow", function () {
        $('#alternating').text('just follow the bubble created on the ceiling');
        $("#alternating").delay(750).fadeIn("slow");
    });
    await timer(3000)
    $("#alternating").fadeOut("slow", function () {
        $('#alternating').text('inhaling as it expands');
        $("#alternating").delay(750).fadeIn("slow");
    });
    await timer(4000)
    $("#alternating").fadeOut("slow", function () {
        $('#alternating').text('and exhaling as it shrinks');
        $("#alternating").delay(750).fadeIn("slow");
    });
    await timer(4000)
    $("#alternating").fadeOut("slow", function () {
        $('#alternating').text('3');
        $("#alternating").delay(750).fadeIn("slow");
    });
    await timer(1750)
    $("#alternating").fadeOut("slow", function () {
        $('#alternating').text('2');
        $("#alternating").delay(750).fadeIn("slow");
    });
    await timer(1750)
    $("#alternating").fadeOut("slow", function () {
        $('#alternating').text('1');
        $("#alternating").delay(750).fadeIn("slow");
    });
    await timer(1750)
    $("#alternating").fadeOut("slow", function () {
        $('#alternating').text('');
        $("#alternating").delay(750).fadeIn("slow");
    });
    await timer(500)
    document.getElementById("instructions").style.display = 'none';
}

async function initiate(time) {
    if (wakeLock in navigator) {
        wakelock = navigator.wakeLock.request('screen');
    }
    var music = document.getElementById('music');
    instructions()

    // Initial volume of 0.20
    // Make sure it's a multiple of 0.05
    var vol = 0.20;
    music.volume = vol;
    music.play()
    var interval = 200; // 200ms interval


    beatLength = 5.546
    document.getElementById("circle").style.animationDuration = (String(beatLength) + "s");

    if (time === 8) {
        var arrReps = [11, 9, 9, 8, 7, 6, 5, 5, 4, 4]
        for (let i = 0; i < arrReps.length; i++) {
            for (let j = 0; j < arrReps[i]; j++) {
                docVal = (String(beatLength) + "s");
                document.getElementById("circle").style.animationDuration = docVal;
                await timer(beatLength * 1000);
                /* var fadeout = setInterval(
                    function () {
                        // Reduce volume by 0.05 as long as it is above 0
                        // This works as long as you start with a multiple of 0.05!
                        if (vol < 0) {
                            vol += 0.05;
                            music.volume = vol;
                            console.log('increase')
                        }
                        else {
                            // Stop the setInterval when 0 is reached
                            clearInterval(fadeout);
                        }
                    }, (beatLength * 0.4));
                var fadeout = setInterval(
                    function () {
                        // Reduce volume by 0.05 as long as it is above 0
                        // This works as long as you start with a multiple of 0.05!
                        if (vol > 0.05) {
                            vol -= 0.05;
                            music.volume = vol;
                            console.log('decrease')
                        }
                        else {
                            // Stop the setInterval when 0 is reached
                            clearInterval(fadeout);
                        }
                    }, (beatLength * 0.6)); */
            }
            beatLength = beatLength * 1.07;
        }
    }

    else if (time === 20) {
        var arrReps = [18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 4]
        for (let i = 0; i < arrReps.length; i++) {
            for (let j = 0; j < arrReps[i]; j++) {
                docVal = (String(beatLength) + "s");
                document.getElementById("circle").style.animationDuration = docVal;
                await timer(beatLength * 1000);
            }
            beatLength = beatLength * 1.038;
        }
    }
    endAll()
}

async function restart() {
    console.log(window.timeW);
    initiate(window.timeW);
}

function launchFullScreen(element) {
    if (element.requestFullScreen) {
        element.requestFullScreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
    }
}
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}