/*----- constants -----*/


/*----- app's state (variables) -----*/
//array of 42 elements DONE - MADE 42 DIV'S 
//board which is the main part of the game
//the turn (each player switches off going)
// the game status (so where we are in the game and eventually, who WINS!)
let board; //an array where the nested arrays will rep the columns
let turn; /// 1 or -1 for player; 0 for no user in that cell


/*----- cached element references -----*/


/*----- event listeners -----*/


/*----- functions -----*/
init();
// we initialize the state and then we will call render()
function init() {
border = [
    [0, 0, 0, 0, 0, 0], // this represents column 0
    [0, 0, 0, 0, 0, 0], // this represents column 1
    [0, 0, 0, 0, 0, 0], // this represents column 2
    [0, 0, 0, 0, 0, 0], // this represents column 3
    [0, 0, 0, 0, 0, 0], // this represents column 4
    [0, 0, 0, 0, 0, 0], // this represents column 5
    [0, 0, 0, 0, 0, 0], // this represents column 6
];
turn = 1;
render()
}
