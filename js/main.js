'use strict'
var gDiff = [16, 25, 36];
var next = 0;
var gBoardSize = gDiff[next];
var counter = 1;
var gNums;
var gStart = 1;
var milisec = 0;
var sec = 0;
var min = 0;
var gGameInterval;

play()

function play() {
    counter = 1;
    gNums = makeNumsArr(gBoardSize);
    gNums = shuffleArray(gNums, gBoardSize);
    renderGame(gNums);

}

function restart() {
    counter = 1;
    gStart = 1;
    milisec = 0;
    sec = 0;
    min = 0;
    next = 0;
    var timer = document.querySelector('.time');
    timer.innerText = '00:00:00';
    clearInterval(gGameInterval);
    gBoardSize = gDiff[next];
    counterBtn();
    var dif = document.querySelector('.difficult');
    dif.innerText = 'Change To 5x5 ?';
    play();
}
function counterBtn() {
    var elNumDiv = document.querySelector('.number');
    elNumDiv.innerText = 'Next Number Is : ' + counter;
}

function difficult(elDifficult) {
    next++;
    if (next < 2) {
        gStart = 1;
        milisec = 0;
        min = 0;
        var timer = document.querySelector('.time');
        timer.innerText = '00:00:00';
        clearInterval(gGameInterval);
    }
    sec = 0;
    if (next < 1) elDifficult.innerText = 'Change To 5x5 ?';
    if (next === 1) elDifficult.innerText = 'Change To 6x6 ?';
    if (next > 1) elDifficult.innerText = 'MAX Level';
    if (next > 2) next = 2;
    else {
        gBoardSize = gDiff[next];
        play();
    }
}


function cellClicked(elCell) {
    if (gStart === 1) getTime();
    gStart++;
    if (+elCell.innerText === counter) {
        elCell.classList.add('pressed');
        counter++;
        counterBtn();
        var audio = new Audio('sounds/touch.mp3');
        audio.play();
        if (counter === gNums.length + 1) {
            var elToCut = document.querySelector('.tocut');
            audio = new Audio('sounds/winner.mp3');
            audio.play();
            clearInterval(gGameInterval);
            document.querySelector('h1').innerText = '🥳🥳🥳WWWWIIINNNNEERRRR🥳🥳🥳'
            elToCut.innerHTML = '<img src="imgs/61125530-winner-champion-number-one-background-with-red-ribbon-gold-medal-olive-branch-and-confetti-on-white-.jpg" alt="">'
        }
    }
}

function renderGame(nums) {
    var line = Math.sqrt(gNums.length);
    var idx = 0;
    var strHTML = '<table>';
    for (var i = 0; i < line; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < line; j++) {
            strHTML += `<td onclick="cellClicked(this)">${nums[idx]}</td>`;
            idx++;
        }
        strHTML += `</tr>`;
    }
    strHTML += `</table>`;
    var elToCut = document.querySelector('.tocut');
    elToCut.innerHTML = strHTML;
}

function shuffleArray(newNums, length) {
    var nums = [];
    for (var i = 0; i < length; i++) {
        var idx = getRandomInt(0, newNums.length);
        var currNum = newNums[idx];
        nums[i] = currNum;
        newNums.splice(idx, 1);
    }
    return nums;
}

function makeNumsArr(amount) {
    var nums = [];
    for (var i = 0; i < amount; i++) {
        nums[i] = i + 1;
    }
    return nums;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function getTime() {
    gGameInterval = setInterval(startTimer, 100);
}


function startTimer() {
    var timer = document.querySelector('.time');
    milisec++;
    if (milisec > 9) {
        sec++;
        milisec = 0;
    }
    if (sec > 59) {
        min++;
        sec = 0;
    }
    timer.innerText = (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec) + ':' + '0' + milisec;
}