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
function checkWin () {

} // true ,will change the mesage 
let winner;
let player;


/*----- cached element references -----*/
const markerEls = [...document.querySelectorAll('#markers > div')];
const msgEl = document.querySelector('h1');
const buttonEl = document.querySelector('button');
/*----- event listeners -----*/
document.getElementById('markers').addEventListener('click', handleDrop);
buttonEl.addEventListener('click', init);
// document.getElementById('board').addEventListener('click', handleMove);

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
    winner = null;
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
function renderMessage() {
    if (gameStatus === 0) {
        msgEl.innerHTML = `Player <span style=“color: ${COLORS[turn]}“>${COLORS[turn].toUpperCase()}</span>’s Turn`;
    } else if (gameStatus === 'T') {
        // Tie game
    } else {
        // Player has won!
    }
}
//hide- show the markers will hide when no 0's are there in the column
function renderMarkers() {
    markerEls.forEach(function (markerEl, colIdx) {
        markerEl.style.visibility = board[colIdx].includes(0) ? 'visible' : 'hidden';
        if (winner === -1 || winner === 1 ) {
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


function checkWin(colIdx, rowIdx) {
    const player = board[colIdx][rowIdx];
    if (checkVertWin(colIdx, rowIdx, player) ||
        checkHorzWin(colIdx, rowIdx, player))
        //checkDiagWin(colIdx, rowIdx, player); 
        return turn;
}
function checkVertWin(colIdx, rowIdx, player) {
    const colArr = board[colIdx];
    let count = 1;
    rowIdx--;
    while (colArr[rowIdx] === player && rowIdx >= 0) {
        count++;
        rowIdx--;
    }
    return count === 4 ? winner = turn : 0;
}

function checkHorzWin(colIdx, rowIdx, player) {
    const colArr = board[colIdx];
    let count = 1;
    let idx = colIdx + 1;
    while (idx < board.length && board [idx][rowIdx] === player) {
        count++;
        idx++; 
    }
    idx = colIdx -1;
    while((idx >= 0) && board[idx][rowIdx] === player) {
        count++;
        idx--;
    }
    return count >= 4 ? winner = turn : null;

}