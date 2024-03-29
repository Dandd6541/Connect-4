/*----- constants -----*/
const COLORS = {
    '0': 'white',
    '1': 'yellow',
    '-1': 'red',
};

/*----- app's state (variables) -----*/
//array of 42 elements DONE - MADE 42 DIV'S 
//board which is the main part of the game
//the turn (each player switches off going)
// the game status (so where we are in the game and eventually, who WINS!)

let board; //an array where the nested arrays will rep the columns
let turn; /// 1 or -1 for player; 0 for no user in that cell
let gameStatus; // ths will be null -> game in play; 1/-1 player win; 'T' -> tie

// true ,will change the mesage 
let winner;
let player;


/*----- cached element references -----*/
const markerEls = [...document.querySelectorAll('#markers > div')];
const msgEl = document.querySelector('h1');
const buttonEl = document.querySelector('button');
/*----- event listeners -----*/
document.getElementById('markers').addEventListener('click', handleDrop);
buttonEl.addEventListener('click', init);

/*----- functions -----*/

init();

function init() {
    board = [
        [0, 0, 0, 0, 0, 0], // this represents column 0
        [0, 0, 0, 0, 0, 0], // this represents column 1
        [0, 0, 0, 0, 0, 0], // this represents column 2
        [0, 0, 0, 0, 0, 0], // this represents column 3
        [0, 0, 0, 0, 0, 0], // this represents column 4
        [0, 0, 0, 0, 0, 0], // this represents column 5
        [0, 0, 0, 0, 0, 0], // this represents column 6
    ];
    turn = 1;
    winner = 0;
    renderMarkers();
    render()
}

function render() {
    //    Iterating over the column array
    board.forEach(function (colArr, colIdx) {
        colArr.forEach(function (cellVal, rowIdx) {
            const coinEl = document.getElementById(`c${colIdx}r${rowIdx}`);
            coinEl.style.backgroundColor = COLORS[cellVal];
        });
    });
    renderMarkers();
    renderMessage();

}
//This is the logic that tells you W,T or whos turn it is. 
function renderMessage() {
    if (winner === 'T') {
        msgEl.innerHTML = "It's a Tie!!!";
    } else if (winner === 1 || winner === -1) {
        msgEl.innerHTML = `<span style=“color:${COLORS[winner]}“>${COLORS[winner].toUpperCase()}</span> Wins!`;
    } else {
        msgEl.innerHTML = `<span style=“color:${COLORS[turn]}“>${COLORS[turn].toUpperCase()}</span>'s Turn`;
    }
}
//hide- show the markers will hide when no 0's are there in the column
function renderMarkers() {
    markerEls.forEach(function (markerEl, colIdx) {
        markerEl.style.visibility = board[colIdx].includes(0) ? 'visible' : 'hidden';
        if (winner === -1 || winner === 1) {
            markerEl.style.visibility = 'hidden'
        };
    });
}
//we need to update all the updated states and make sure to call render
function handleDrop(evt) {
    const colIdx = markerEls.indexOf(evt.target);
    if (colIdx === -1) return;
    const colArr = board[colIdx];
    const rowIdx = colArr.indexOf(0);
    if (!colArr.includes(0)) return;
    colArr[rowIdx] = turn;
    turn *= -1;
    winner = checkWin(colIdx, rowIdx);
     render();
}
//this checks the directions of winning (vert,hor and diag)
function checkWin(colIdx, rowIdx) {
    const player = board[colIdx][rowIdx];
   return checkVertWin(colIdx, rowIdx, player) ||
        checkHorzWin(colIdx, rowIdx, player)||
        checkDiagWinRight(colIdx, rowIdx, player)||
        checkDiagWinLeft(colIdx, rowIdx, player)||
        (board.flat().includes(0) ?null : 'T');
};

function checkVertWin(colIdx, rowIdx, player) {
    const colArr = board[colIdx];
    let count = 1;
    rowIdx--;
    while (colArr[rowIdx] === player && rowIdx >= 0) {
        count++;
        rowIdx--;
    }
    return count === 4 ? winner = turn * -1 : 0;
}

function checkHorzWin(colIdx, rowIdx, player) {
    const colArr = board[colIdx][rowIdx];
    let count = 1;
    let idx = colIdx + 1;
    while (idx < board.length && board[idx][rowIdx] === colArr) {
        count++;
        idx++;
    }
    idx = colIdx - 1;
    while (idx >= 0 && board[idx][rowIdx] === player) {
        count++;
        idx--;
    }
  
    return count >= 4 ? winner = turn * -1 : 0;

}

function checkDiagWinRight(colIdx, rowIdx) {
    const colArr = board[colIdx][rowIdx];
    let count = 1;
    let idx1 = colIdx - 1;
    let idx2 = rowIdx + 1;
    while (idx1 >= 0 && idx2 < board[0].length && board[idx1][idx2] === colArr) {
        
        count++;
        idx1--;
        idx2++;
    }

    idx1 = colIdx + 1;
    idx2 = rowIdx - 1;
    while (idx1 < board.length && idx2 >= 0 && board[idx1][idx2] === colArr) {
       
        count++;
        idx1++;
        idx2--;
    }
    return count >= 4 ? winner = turn * -1 : 0; 
};
    
function checkDiagWinLeft(colIdx, rowIdx) {
    const colArr = board[colIdx][rowIdx];
    let count = 1;
    let idx1 = colIdx + 1;
    let idx2 = rowIdx +1;

    while (idx1 < board.length && idx2 > board[0].length && board[idx1][idx2] === colArr) {
    count++;
    idx1++;
    idx2++;

    } 
    idx1 = colIdx - 1;
    idx2 = rowIdx - 1;
    while (idx1 >= 0 && idx2 >= 0 && board[idx1][idx2] === colArr) {
        count++;
        idx1--;
        idx2--;
    }
    return count >=4 ? winnter = turn * -1 : 0;
}

// var timer;
// var ele = document.getElementById('timer');


// (function (){
//     var seconds = 0;
//     timer = setInterval(()=>{
//         ele.innerHTML = '00:'+seconds;
//         seconds ++;


//     }, 1000)


// })()
// function pause() {
//     clearInterval(timer);
// }

//Global variavles
const time_el = document.querySelector('.watch.time');
const start_btn = document.querySelector('start');
const stop_btn = document.querySelector("stop");
const reset_btn = document.getElementById("reset");


let seconds = 0;
let interval = null;

// Event listeners 
start_btn.addEventListener('click', start);
stop_btn.addEventListener('click', stop);
reset_btn.addEventListener('click', reset);
// update the timer 

function timer () {
    seconds++;

    //Format our time 
    let hrs = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds - (hrs * 3600)) / 60);
    let secs = seconds % 60;

    if (secs < 10) secs = '0' + secs;
    if (mins < 10) mins = '0' + mins;
    if (hrs < 10) hrs = '0' + hrs;

    time_el.innerText = `${hrs} :${mins} :{secs}`;
}

function start () {
    if (interval) {
        return
    }
    interval = setInterval(timer, 1000);
}
function stop () {
    clearInterval(interval);
    interval = null;

}

function reset () {
    stop();
    seconds = 0;
    time_el.innerText = '00:00:00'
}