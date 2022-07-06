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
let checkWinner; // true ,will change the mesage 
let winner;


/*----- cached element references -----*/
const markerEls = [...document.querySelectorAll('#markers > div')];
const msgEl = document.querySelector('h1');
const buttonEl = document.querySelector('button');
/*----- event listeners -----*/
document.getElementById('markers').addEventListener('click', handleDrop);
document.querySelector('#board').addEventListener('click', handleBoard);
buttonEl.addEventListener('click', init);
// document.getElementById('board').addEventListener('click', handleMove);

/*----- functions -----*/

init();
// we initialize the state and then we will call render()
function handleBoard(evt) {
    if (evt.target.classList.value !== 'board') {
        console.log(evt);
        checkWinner = checkWinner(colArr, rowIdx)
        gameStatus = getGameStatus();
       

    }
}


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
    gameStatus = null;
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
    });
}
//we need to update all the updated states and make sure to call render
function handleDrop(evt) {
    const colIdx = markerEls.indexOf(evt.target);
    if (colIdx === -1) return;
    const colArr = board[colIdx];
    if (!colArr.includes(0)) return;
    const rowIdx = colArr.indexOf(0);
    colArr[rowIdx] = turn;
    turn *= -1;
  //gameStatus = checkWin(colIdx, rowIdx);
    render();
}


function checkVertWin(colIdx, rowIdx, player) {
    const colArr = board[colIdx];
    let count = 1;
    // We can use/modify rowIdx because we won't need
    // to access it's original value anymore
    rowIdx--;
    // Count until no longer the same 'player'
    while (colArr[rowIdx] === player && rowIdx >= 0) {
        count++;
        rowIdx--;
    }
    return count === 4 ? renderWinner(player) : 0;
}

function getGameStatus(){
    let flatBoard = board.flat(2); 
    if (!flatBoard.includes(0)) return 't'; 
    if (winner === true) return 'w'; 
   return null;
}

// function getGameStatus() {
//     if (!board.includes(0)) return "T";
//     return 0;
//   }
