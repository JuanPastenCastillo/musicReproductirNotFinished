const $ = (variable) => document.querySelector(variable);

const media = $(".audioOne")
let volumeDOM = $(".volume")
let volumeRangeDOM = $(".volumeRange")

const controls = $('.controls');

const play = $('.play');
const stop = $('.stop');
const rwd = $('.rwd');
const fwd = $('.fwd');

const timerWrapper = $('.timer');
const timer = $('.timer span');
const timerBar = $('.timer div');
const showUserTimeDOM = $(".tooltiptext")

const filesUploadDOM = $(".filesUpload")

const buttonToDeleteSongsDOM = $("#deleteFiles")
buttonToDeleteSongsDOM.addEventListener("click", () => {

 let areYouSure = confirm("Do you want to remove all the songs?")

 if (areYouSure) {
  while (toDisplaySongsNameDOM.hasChildNodes()) {
   toDisplaySongsNameDOM.removeChild(toDisplaySongsNameDOM.firstChild)
  }
 }
})




media.removeAttribute('controls');
controls.style.visibility = 'visible';

volumeRangeDOM.addEventListener("input", () => {
 media.volume = volumeRangeDOM.value
 volumeDOM.setAttribute("data-icon", "g")
})

volumeDOM.addEventListener("mouseleave", (e) => {
 let theNextButton = e.relatedTarget.tagName
 if (theNextButton === "BUTTON" || theNextButton === "HTML") {
  addHiddenRemoveShow(volumeRangeDOM)
 }
})

volumeDOM.addEventListener("mouseover", () => {
 addShowRemoveHidden(volumeRangeDOM)
})

volumeRangeDOM.addEventListener("mouseleave", () => {
 addHiddenRemoveShow(volumeRangeDOM)
})

window.addEventListener("load", () => {
 volumeRangeDOM.value = volumeRangeDOM.max;
})

function addShowRemoveHidden(elementToChange) {
 elementToChange.classList.add("show")
 elementToChange.classList.remove("hidden")
}

function addHiddenRemoveShow(elementToChange) {
 elementToChange.classList.add("hidden")
 elementToChange.classList.remove("show")
}

function stopRwdAndFwd() {
 clearInterval(intervalRwd);
 clearInterval(intervalFwd);
 rwd.classList.remove('active');
 fwd.classList.remove('active');
}

let lastValue;
function muteAndToggle() {
 if (volumeDOM.dataset.icon === "g") {
  volumeDOM.setAttribute("data-icon", "Q")
  lastValue = volumeRangeDOM.value
  volumeRangeDOM.value = 0
  media.volume = 0;
 } else {
  volumeDOM.setAttribute("data-icon", "g")
  volumeRangeDOM.value = lastValue;
  media.volume = volumeRangeDOM.value;
 }
}

volumeDOM.addEventListener("click", muteAndToggle)

volumeRangeDOM.addEventListener("input", () => {
 if (volumeRangeDOM.value > 0) {
  volumeDOM.setAttribute("data-icon", "g")
 } else {
  volumeDOM.setAttribute("data-icon", "Q")
 }
})

function playPauseMedia() {
 stopRwdAndFwd()
 addHiddenRemoveShow(showUserTimeDOM)
 showUserTimeDOM.classList.toggle("show")
 if (media.paused) {
  play.setAttribute('data-icon', 'u');
  media.play();
 } else {
  play.setAttribute('data-icon', 'P');
  media.pause();
 }
}

play.addEventListener('click', playPauseMedia);

stop.addEventListener('click', stopMedia);
media.addEventListener('ended', stopMedia);
media.addEventListener('ended', continueNextSong);

function stopMedia() {
 media.pause();
 media.currentTime = 0;
 console.log('media.currentTime:', media.currentTime)
 play.setAttribute('data-icon', 'P');
 stopRwdAndFwd()
 addHiddenRemoveShow(showUserTimeDOM)
 rwd.classList.add('removeHoverAndFocus');
 fwd.classList.add('removeHoverAndFocus');
 
 /* 
 
 !FH
 If the song ends, the next sibling have to be play. Use the same code of click and play (line 330)
 
  */
 
}

rwd.addEventListener('click', mediaBackward);
fwd.addEventListener('click', mediaForward);

let intervalFwd;
let intervalRwd;

function mediaBackward() {
 clearInterval(intervalFwd);
 fwd.classList.remove('active');
 rwd.classList.remove('removeHoverAndFocus');
 if (rwd.classList.contains('active')) {
  rwd.classList.remove('active');
  clearInterval(intervalRwd);
  media.play();
 } else {
  rwd.classList.add('active');
  media.pause();
  intervalRwd = setInterval(windBackward, 200);
 }

}

function mediaForward() {
 clearInterval(intervalRwd);
 rwd.classList.remove('active');
 fwd.classList.remove('removeHoverAndFocus');
 if (fwd.classList.contains('active')) {
  fwd.classList.remove('active');
  clearInterval(intervalFwd);
  media.play();
 } else {
  fwd.classList.add('active');
  media.pause();
  intervalFwd = setInterval(windForward, 200);
 }
}

function continueNextSong(e){
 // console.log("finish here")
 // console.log('e:', e)
 console.log('toDisplaySongsNameDOM:', toDisplaySongsNameDOM)
}

function windBackward() {
 addHiddenRemoveShow(showUserTimeDOM)
 if (media.currentTime <= 3) {
  stopMedia();
  console.log("this is stop from backward")
 } else {
  media.currentTime -= 3;
 }
}

function windForward() {
 addHiddenRemoveShow(showUserTimeDOM)
 if (media.currentTime >= media.duration - 3) {
  stopMedia();
  console.log("this is stop from forward")
  
 } else {
  media.currentTime += 3;
 }
}

media.addEventListener('timeupdate', setTime);
// media2.addEventListener('timeupdate', setTime);

function timeCheck(variableToUse) {
 console.log(`
 ■ START variableToUse ■
 `);
 console.log('variableToUse:', variableToUse)
 console.log(`
 ■ FINISH variableToUse ■
 `);
 let hours = Math.floor((variableToUse / 60) / 60)
 let minutes = Math.floor((variableToUse / 60) - hours * 60);
 let seconds = Math.floor((variableToUse - Math.floor(variableToUse / 60) * 60));

 let hourValue;
 let minuteValue;
 let secondValue;

 if (hours < 10) {
  hourValue = `0${hours}`
 } else {
  hourValue = hours
 }

 if (minutes < 10) {
  minuteValue = '0' + minutes;
 } else {
  minuteValue = minutes;
 }

 if (seconds < 10) {
  secondValue = '0' + seconds;
 } else {
  secondValue = seconds;
 }

 return `${hourValue}:${minuteValue}:${secondValue}`;
}

media.addEventListener("durationchange", (e) => {
 console.log("duration changed")
})

// console.log('timerWrapper.clientWidth:', timerWrapper.clientWidth)

// console.log('timerWrapper:', timerWrapper)
/* 

COME BACK HERE
 */
function setTime() {
 let barLength = timerWrapper.clientWidth * (media.currentTime / media.duration);
 
 timerBar.style.width = barLength + 'px';
 timer.textContent = timeCheck(media.currentTime)
 console.log('timer.textContent:', timer.textContent)
 
 // console.log('media.currentTime:', media.currentTime)
}

timerWrapper.addEventListener("click", (e) => {
 stopRwdAndFwd()
 addHiddenRemoveShow(showUserTimeDOM)
 media.currentTime = (e.layerX * media.duration) / timerWrapper.clientWidth
 media.play()
 play.setAttribute('data-icon', 'u');
})

timerWrapper.addEventListener("mouseout", () => {
 addHiddenRemoveShow(showUserTimeDOM)
})

let showTheUserTime = (e) => {
 addShowRemoveHidden(showUserTimeDOM)
 let timeWatching = (e.layerX * media.duration) / timerWrapper.clientWidth;
 console.log(`
 ■ START showTheUserTime ■
 `)
 console.log('timerWrapper.clientWidth:', timerWrapper.clientWidth)
 console.log('media.duration:', media.duration)
 // console.log('media:', media)
 console.log('e.layerX:', e.layerX)
 console.log('timeWatching:', timeWatching)
 
 console.log(`
 ■ FINISH showTheUserTime ■
 `)
 
 showUserTimeDOM.textContent = timeCheck(timeWatching)
 // showUserTimeDOM.textContent = timeCheck(media.currentTime)
 
 // console.log('showUserTimeDOM.textContent:', showUserTimeDOM.textContent)
}

timerWrapper.addEventListener("mousemove", showTheUserTime)

function addMultiplesSongs() {
 // var fileinput = document.getElementById("browse");
 inputFile.click();
}
const inputFile = $('#files');
inputFile.addEventListener('change', cargaListaMusicaFile);


function addFolder() {
 inputFolder.click()
}
const inputFolder = $('#filelist')
inputFolder.addEventListener("change", cargaListaMusicaFile)


function cargaListaMusicaFile(evt) {
 let files = evt.target.files;

 for (let i = 0, f;f = files[i];i++) {
  // console.log('files[i]:', files[i])

  let reader = new FileReader();

  reader.onload = (function (elFile) {
   return function (e) {
    var li = document.createElement('li');
    li.className = 'music';
    li.innerHTML = `
    <input type="text" value="${e.target.result}" style="display:none">
    
    <input type="text" value="${elFile.name}" style="display:none"> 
    
    <a class="music-enlace">${elFile.name}</a>
    `;

    toDisplaySongsNameDOM.appendChild(li);

   }
  })(f)
  reader.readAsDataURL(f);

 }

//  toDisplaySongsNameDOM.addEventListener("dblclick", (e) => {
//   // console.log(e);
// 
//   // for (const x of e.target.parentElement.parentElement.children) {
//   //  if (x.children[2].classList.contains("liSongs")) {
//   //   x.children[2].classList.remove("liSongs")
//   //  }
//   // }
// 
//   for (const x of toDisplaySongsNameDOM.children) {
//    // if (x.children[2].classList.contains("liSongs")) {
//    //  x.children[2].classList.remove("liSongs")
//    // }
//   }
//   let srcOfTheSong = e.target.parentElement.children[0].value;
// 
//   // e.target.classList.add("liSongs")
//   // media.src = srcOfTheSong
//   // playPauseMedia()
//  })
 
 
}

/* 
? Fails:
1) HTTP load failed with status 404. Load of media resource http://127.0.0.1:5501/0 failed.
2) Uncaught (in promise) DOMException: The media resource indicated by the src attribute or assigned media provider object was not suitable.


 */


const toDisplaySongsNameDOM = $(".toDisplaySongsName")

toDisplaySongsNameDOM.addEventListener("click", (e) => {

 if (e.ctrlKey) {
  if (e.target.parentElement.tagName === "LI") {
   e.target.parentElement.classList.add("delete")
   e.target.parentElement.classList.add("highlight")
  } else if (e.target.tagName === "LI") {
   e.target.classList.add("delete")
   e.target.classList.add("highlight")
  }


 } else {
  for (const x of toDisplaySongsNameDOM.children) {
   x.classList.remove("delete", "highlight")
   x.children[2].classList.remove("delete", "highlight")
  }

  if (e.target.parentElement.tagName === "LI") {
   e.target.parentElement.classList.add("delete")
   e.target.parentElement.classList.add("highlight")
  } else if (e.target.tagName === "LI") {
   e.target.classList.add("delete")
   e.target.classList.add("highlight")
  }
 }
 let srcOfTheSong = e.target.parentElement.children[0].value;
 media.src = srcOfTheSong
 // play.setAttribute('data-icon', 'P');
 playPauseMedia()
})




const removeSelectedDOM = $("#buttonRemoveSelected")
console.log('removeSelectedDOM:', removeSelectedDOM)

console.log('toDisplaySongsNameDOM:', toDisplaySongsNameDOM)


removeSelectedDOM.addEventListener("click", (e) => {

 let indexToDelete = [];

 let theListToArray = Object.entries(toDisplaySongsNameDOM.children)
 console.log('theListToArray:', theListToArray)

 for (const x of theListToArray) {
  if (x[1].classList.contains("delete")) {
   indexToDelete.push(x[0])
  }
 }

 for (let x = indexToDelete.length - 1;x > -1;x--) {
  toDisplaySongsNameDOM.children[indexToDelete[x]].remove()
 }

})









/*
*Complete this three challenge:
✅ 1) The time display currently breaks if the video is an hour long or more (well, it won't display hours; just minutes and seconds). Can you figure out how to change the example to make it display hours?

✅ 2) Can you work out a way to turn the timer inner <div> element into a true seek bar/scrobbler — i.e., when you click somewhere on the bar, it jumps to that relative position in the video playback? As a hint, you can find out the X and Y values of the element's left/right and top/bottom sides via the getBoundingClientRect() method, and you can find the coordinates of a mouse click via the event object of the click event, called on the Document object. For example:

document.onclick = function(e) {
  console.log(e.x) + ',' + console.log(e.y)
}

✅ 3) Make the time display in the center of the bar

✅ 4) Make the cursor display in what place the video will star if click

✅ 5) Because <audio> elements have the same HTMLMediaElement functionality available to them, you could easily get this player to work for an <audio> element too. Try doing so.

✅ 6) Add in the display of audio a bar that up and down the volume of that audio

✅ 7) Add a button to silence the audio that can toggle between mute and unmute

✅ 7.1) When the user move the volume range to 0 the button volume toggle to mute icon

*_______________BUGS_______________
✅ 1) when the bar of volume is displayed with the icon of volume in mute, if i click in some point of the volume bar, the next time the mute button will be clicked will return at a wrong place

✅ 2) When the mouse is over the mute button and leave that button without over on the volume bar, the bar will be stay displayed until the mouse will leave the bar volume

✅ [SO-SO] 3) When the backward and forward button stop, the over style have to disappear

¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯BUGS¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯
✅ 8) Create the posibility of add different songs and playit one after other

https://www.w3schools.com/tags/att_input_type_file.asp

0) https://www.youtube.com/watch?v=vM5Wct-Sq2A

0.1) https://www.youtube.com/watch?v=hU5dS2_5IP4

1) https://youtu.be/dSpoe873JCE

9) The interface of audio have a button to play te next song, button to play the last song

https://youtu.be/1-CvPn4AbT4

10) I can make a random order from the list of songs that the user will upload

✅ 11) When i double click in a song and this will reproduce, the background color habe to change.

✅ 12) When i double click in other song to play, the previous song habe to delete his background special color, return to the default background color & the new song that is played habe to be the new background color.




 */


