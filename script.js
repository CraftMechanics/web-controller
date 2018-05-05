var showLog = false;
var enableLog = false;
var elementVisibility = {
    directions: true,
    sliders: true,
    colors: false
}
var input = {
    direction: "stop",
    movementSpeed: 50,
    turnSpeed: 50,
    lowColor: [0, 0, 0],
    highColor: [255, 255, 255]
}
var activeButton = "stop";

function getState() {
    writeLog("Getting state from server...")
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            writeLog(this.responseText);
        }
    };
    xhttp.open("GET", "getState.php", true);
    xhttp.send();
}

function sendInput() {
    writeLog("Sending input to server...")
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            writeLog(this.responseText);
        }
    };
    xhttp.open("GET", "input.php" + formatPost(input), true);
    xhttp.send();
}


function formatPost(obj) {
    post = "?"
    Object.keys(obj).forEach(function (key, index) {
        post += key + "=" + obj[key] + "&";
    });
    return post;
}

function getTimestamp() {
    var date = new Date();
    var timestamp = "[";
    timestamp += date.getFullYear();
    timestamp += "-" + date.getMonth();
    timestamp += "-" + date.getDate();
    timestamp += "-" + date.getHours();
    timestamp += ":" + date.getMinutes();
    timestamp += ":" + date.getSeconds() + "]";
    return timestamp;
}

function writeLog(msg) {
    if (enableLog) {
        document.getElementById("log").innerHTML += getTimestamp() + " " + msg + "\n";
    }
}
function toogleLog() {
    var logtoogler = document.getElementById("logtoogler");
    var log = document.getElementById("log");
    if (showLog) {
        log.classList.add("hidden");
        logtoogler.innerHTML = "Show log";
        showLog = false;
    }
    else {
        log.classList.remove("hidden");
        logtoogler.innerHTML = "Hide log";
        showLog = true;
    }
}
function switchLog() {
    var logSwitcher = document.getElementById("logswitcher");
    if (enableLog) {
        enableLog = false;
        logSwitcher.innerHTML = "Enable log";
    }
    else {
        enableLog = true;
        logSwitcher.innerHTML = "Dissable log";
    }
}
function clearLog() {
    var log = document.getElementById("log");
    log.innerHTML = "";
}

function toogleElement(toogler) {
    var tooglerId = toogler.id;
    var elementId = tooglerId.substring(0, tooglerId.length - 7)
    var element = document.getElementById(elementId);
    console.debug(elementId);
    if (elementVisibility[elementId]) {
        element.classList.add("hidden");
        toogler.classList.remove("active");
        elementVisibility[elementId] = false;

    }
    else {
        element.classList.remove("hidden");
        toogler.classList.add("active");
        elementVisibility[elementId] = true;
    }
}

function setDirection(str) {
    input.direction = str;
    setActiveButton(str);
}

function setActiveButton(s) {
    var a = document.getElementById(activeButton);
    a.classList.remove("active");
    var b = document.getElementById(s);
    b.classList.add("active");
    activeButton = s;
}

function setSliders() {
    document.getElementById("movementSpeedSlider").value = input.movementSpeed;
    document.getElementById("turnSpeedSlider").value = input.turnSpeed;
}
function getSliders() {
    input.movementSpeed = document.getElementById("movementSpeedSlider").value;
    input.turnSpeed = document.getElementById("turnSpeedSlider").value;
}
function setSliderText() {
    document.getElementById("movementSpeedText").innerHTML = input.movementSpeed;
    document.getElementById("turnSpeedText").innerHTML = input.turnSpeed;
}

function getHighColor(picker) {
    for (i = 0; i < 3; i++) {
        input.highColor[i] = picker.hsv[i];
    }
}
function getLowColor(picker) {
    for (i = 0; i < 3; i++) {
        input.lowColor[i] = picker.hsv[i];
    }
}

function refresh() {
    getSliders();
    setSliderText();
}
setInterval(refresh, 100);
setInterval(sendInput, 100);