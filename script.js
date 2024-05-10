let count = document.querySelector("#count");
let alarmSound = document.querySelector("#alarmSound");
let nextButton = document.querySelector("#nextButton"); // begin next alarm
let newButton = document.querySelector("#newButton"); // start the alarm cycle over
let stopButton = document.querySelector("#stopButton"); // stop the alarm
let progressBar = document.querySelector("#progressBar");
let currentProgress = document.querySelector("#currentProgress");
let displayDropdown = document.querySelector("#displayDropdown");
let dropdown = document.querySelector("#dropdown");
let nextAlarm = document.querySelector("#nextAlarm");
let navButton = document.querySelector("#navButton");
let navContainer = document.querySelector("#navContainer");
let about = document.querySelector("#about");
let aboutLink = document.querySelector("#aboutLink");
let aboutContent = document.querySelector("#aboutContent");
let close = document.querySelector("#close");

// alarmSound.loop = true;

// 4 hour timer
// 8 minute timer
// 4 minute timer
// 8 minute timer 
// 12 minute timer
// 16 minute timer
// 20 minute timer

// Time values

let timeArray = [240, 8, 4, 8, 12, 16, 20];
let currentTime = 0;
let totalMinutes = timeArray[currentTime];

let remainingHours = Math.floor(totalMinutes / 60);
let remainingMinutes = totalMinutes - (remainingHours * 60);

// Timer functionality

function sumArray(array) {
    let sum = 0; 
    for (let i = 0; i < array.length; i += 1) {
    sum += array[i];
  }
    return sum;
  }

let totalTime = sumArray(timeArray); // total minutes of the timer

let newInterval;

function intervalFunction(){
    errorMessage();
    checkLogic();
    checkLogic2();
    basicTimer();
    endTimer();
    progressProgression();
    showNext();
    updateTimer();
}

let finalTime = 0;

let increment = 1;


function progressProgression(){
    let result = ((timeArray[currentTime] - ((remainingHours * 60) + remainingMinutes)) + finalTime) / totalTime * 100;
    currentProgress.style.width = result + "%";
    }


function resetTime(){
    for (let i = 0; i < 1; i++) {
        currentTime += 1;
        totalMinutes = timeArray[currentTime];
        
        remainingHours = Math.floor(totalMinutes / 60);
        remainingMinutes = totalMinutes - (remainingHours * 60);
    }
}

function checkLogic(){
    if ((remainingMinutes === 60) && (remainingHours > 0)) {
        remainingHours--;
    }
}

function checkLogic2(){
    if (remainingMinutes <= 0 && remainingHours > 0) {
        remainingMinutes += 60;
        remainingHours--;
    }
}

function errorMessage(){
    if (currentTime > 6) {
        count.innerHTML = " ";
        alert("This is the end of the alarm!");
        nextAlarm.innerHTML = `Next alarm: 0 minutes`;
        count.innerHTML = `0 hours and 0 minutes`;
        clearInterval(newInterval);
    }
}

function basicTimer(){
    remainingMinutes--;
    updateTimer();
}

function updateTimer(){
    if (currentTime<=6){
    count.innerHTML = `${remainingHours} hours and ${remainingMinutes} minutes`;
    }
}

function endTimer(){
    if (remainingMinutes === 0 && remainingHours === 0) {
        clearInterval(newInterval);
        newInterval = null;
        alarmSound.play();
        alert("Alarm!");
    }
}

function showNext(){
    nextAlarm.innerHTML = `Next alarm: ${timeArray[currentTime + 1]} minutes`;
    if (timeArray[currentTime] === 20 || currentTime > 6) {
        nextAlarm.innerHTML = `Next alarm: 0 minutes`;
    }
}

// Button functionality

newButton.addEventListener("click", function resetAlarm(){
    remainingHours = 4;
    remainingMinutes = 0;
    currentTime = 0;
    currentProgress.style.width = 0 + "%";
    increment = 1;
    finalTime = 0;
    updateTimer();
    showNext();
    if (!newInterval) {
        newInterval = setInterval(intervalFunction, 1000);
      }
})

nextButton.addEventListener("click", function nextAlarm(){
    resetTime();
    alarmSound.pause();
    finalTime += (timeArray[currentTime - 1]);
    currentProgress.style.width = (finalTime * 100 / totalTime) + "%";
    updateTimer();
    showNext();
    if (!newInterval) {
        newInterval = setInterval(intervalFunction, 1000);
      };
})

stopButton.addEventListener("click", function stopAlarm(){
    alarmSound.pause();
    clearInterval(newInterval);
    newInterval = null;
})

// Dropdown display/hide

displayDropdown.addEventListener("click", function(){
    if (dropdown.classList.contains("hidden")) {
        dropdown.classList.remove("hidden");
    }
    else {
        dropdown.classList.add("hidden");
    }
})


// Nav section display/hide

navButton.addEventListener("click", function() {
    if (navContainer.style.display === "block") {
        navContainer.style.display = "none";
    }
    else {
        navContainer.style.display = "block";
}})

// About section display/hide

aboutLink.onclick = function(){
    about.style.display = "block";
}

close.onclick = function(){
    about.style.display = "none";
}

window.onclick = function(event) {
    if (event.target === about) {
      about.style.display = "none";
      navContainer.style.display = "none";
    }
    if (event.target === navContainer) {
        navContainer.style.display = "none";
}}
