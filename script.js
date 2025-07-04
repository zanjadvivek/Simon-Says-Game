let gameSeq = [];
let userSeq = [];
let btns = ["red", "yellow", "purple", "green"];
let start = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");

let highScoreDisplay = document.querySelector("h3");
highScoreDisplay.innerText = `Highest score: ${highScore}`;

document.addEventListener("keypress", function() {
    if(start == false) {
        console.log("Game started");
        start = true;
        levelUp();
    }
});

function btnFlash(btn) {
btn.classList.add("flash");
setTimeout(function() {
    btn.classList.remove("flash");
}, 250);
}

function userFlash(btn) {
btn.classList.add("userflash");
setTimeout(function() {
    btn.classList.remove("userflash");
}, 250);
}

function levelUp() {
    userSeq = [];
    level ++;
    h2.innerText = `Level: ${level}`;

    let randmIdx = Math.floor(Math.random()*4);
    let randmColor = btns[randmIdx];
    let randmbtn = document.querySelector(`.${randmColor}`);

    gameSeq.push(randmColor);
    console.log(gameSeq);
    btnFlash(randmbtn);
}

function checkSeq(idx) {
    if(userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        if(level > highScore) {
            highScore = level;
            highScoreDisplay.innerText = `Highest score: ${highScore}`;
        }

        h2.innerHTML = `Game Over ! Your score was <b>${level}</b> <br> Press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";

        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkSeq(userSeq.length-1);
}

let allBtn = document.querySelectorAll(".btn");
for(let btn of allBtn) {
    btn.addEventListener("click", btnPress);
}

function reset () {
    start = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}