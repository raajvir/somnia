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
    // Animation element
    const element = document.getElementById("animationElement");

    // Initial and final values
    const initialValue = 5.45;
    const finalValue = 10;

    // Calculate the increment value per second
    const duration = time; // The total duration you want to increase the animation duration over in seconds
    const incrementPerSec = (finalValue - initialValue) / duration;

    // The variable that is going to be increased
    let variable = initialValue;
    document.getElementById("circle").style.animationDuration = (String(variable) + "s");
    // Update animation duration every second
    const interval = setInterval(() => {
        // Increase the variable
        variable += incrementPerSec;

        // Limit the value to the final value
        variable = Math.min(variable, finalValue);

        // Apply the new duration to the CSS animation
        element.style.animationDuration = variable + "s";
    }, 1000);

    // Stop the interval after the total duration
    setTimeout(() => {
        clearInterval(interval);

        // Set the variable to the final value to correct for any inaccuracy
        variable = finalValue;

        // Apply the final value to the CSS animation
        document.getElementById("circle").style.animationDuration = variable + "s";

        console.log("Finished. Final value: " + variable);
    }, duration * 1000);
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