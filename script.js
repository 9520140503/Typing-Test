const wpm = document.querySelector("#wpm");
const accuracy = document.querySelector("#accuracy");
const time = document.querySelector("#time");
const restart = document.querySelector("#restart")

const paragraph = document.querySelector("#para");
const typing = document.querySelector("#text");

const key = document.querySelectorAll(".key");

async function fetchRandom() {
    const response = await fetch("https://baconipsum.com/api/?type=all-meat&paras=1&format=text");
    const Para = await response.text();
    paragraph.textContent = Para;
}

function showWpm(elapsedTime){
    const input = typing.value.trim();
    const words = input.split(/\s+/).filter(word => word.length > 0);
    const wpms = (words.length/elapsedTime)*60;
    wpm.textContent = `Wpm: ${Math.round(wpms)}`;
    
}


function calculateWords(){
    let count = 0;
    const input = typing.value.trim();
    const para = paragraph.textContent.trim();
    const inputWords = input.split(/\s+/).filter(word => word.length > 0);
    const paraWords = para.split(/\s+/).filter(word => word.length > 0);
    for(let i = 0;i < inputWords.length; i++){
        if(inputWords[i] === paraWords[i]){
            count++;
        }
    }
    return count;
}

function showAccuracy(){
    const totalWords = paragraph.textContent.trim().split(/\s+/).filter(word => word.length > 0).length;
    const correctWords = calculateWords();
    if(totalWords === 0){
        accuracy.textContent = `Accuracy: 0%`;
        return;
    }
    accuracy.textContent = `Accuracy: ${((correctWords/totalWords)*100).toFixed(2)}%`;
}

let timeStart = false;
let interval;
let sec = 10;
let elapsedTime = sec;

function updateTime(){
    time.textContent = `Time: 00:${(sec <10? "0"+sec : sec)}`;
    sec--;
    if(sec<=0){
        clearInterval(interval);
        time.textContent = `Time's up!`;
        typing.disabled = true;
        showWpm(elapsedTime);
        showAccuracy();
    }
}

document.addEventListener("keydown",()=>{
     if(!timeStart){
        timeStart = true;
        interval = setInterval(updateTime,1000);
     }
});

restart.addEventListener("click",()=>{
    location.reload();
})

fetchRandom();