const gameStatus = document.querySelector ('.state--game'); //storing game in a state/status element

let activeGame = true; //pauses the game when a completed scenario occurs

let currentPlayer = "X"; //allows us to determine whose turn it is later on

let gameState = ["", "", "", "", "", "", "", "", ""]; //empty strings in an array lets us track played cells and figure out state later

const winnerWinner = () => `Player ${currentPlayer} wins!`; //template literal displays win a player wins
const draw = () => `Match is a Draw!`; //template literal displays when there's a draw
const playerTurn = () => `It is ${currentPlayer}'s turn!`; //using this to convey whose turn

gameStatus.innerHTML = playerTurn(); //initial message stating whose turn it is

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function cellPlayed(clickedCell, clickedCellIndex) { //this helper function updates gameState and our user interface
    gameState[clickedCellIndex] = currentPlayer; //updates game state
    clickedCell.innerHTML = currentPlayer; //reflects played move in the cell
}

function changePlayers() {
    currentPlayer = currentPlayer === "X" ? "O" : "X"; //tenary operation! If true that current player is X, switch to O; if false that current player is X, make current player X
    gameStatus.innerHTML = playerTurn();
}

function validateResult() {
    let gameWon = false; //assuming game isn't won unless one of the winningCombos is present
    for (let i = 0; i <= 7; i++) { //using a for loop to iterate through the 8 winningCombos to see if any match
        const winnerCombo = winningCombos[i];
        let a = gameState[winnerCombo[0]];
        let b = gameState[winnerCombo[1]];
        let c = gameState[winnerCombo[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            gameWon = true;
            break;
        }
    }
    if (gameWon) { //if game is won...
        gameStatus.innerHTML = winnerWinner(); //display the winnerWinner message in game status, which will populate the .state--game html element
        activeGame = false; //if above is the case...
        return; //declares game inactive or over and our script stops here, thus no need for an else condition
    }
    let roundDraw = !gameState.includes(""); //a draw is NOT valid if any of the cells in the game state array are still blank or unclicked
    if (roundDraw) { //if all cells have been populated or clicked, a draw is valid
        gameStatus.innerHTML = draw(); //display the draw message in game status, which will populate the .state--game html element
        activeGame = false; //if above is the case...
        return; //declares game inactive or over and our script stops here, thus no need for an else condition
    }
    changePlayers(); //if neither of the above if statements are true, then we get down to here and the changePlayers function is called
}

function cellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target; //saving the clicked html element for use later
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index')); //using data-cell-index to see where cell is in our grid; getAttribute returns string, so we will parse it to an integer. "When should you use parseInt? Using parseInt is useful in situations where you have a string number like 0500 but want the output integer to be 500 . parseInt easily converts your string to a rounded integer."
    
    if (gameState[clickedCellIndex] !== "" || !activeGame) { //if a cell has already been clicked, or the game is paused...
        return; //the click gets ignored
    }
    cellPlayed(clickedCell, clickedCellIndex); //if a cell hasn't been clicked and the game isn't paused, continue with game
    validateResult();
} 

function restartGame() {
    activeGame = true; //resets activeGame to true
    currentPlayer = "X"; //resets first player to X
    gameState = ["", "", "", "", "", "", "", "", ""]; //resets gameState to each value in the array being empty
    gameStatus.innerHTML = playerTurn(); //resets player turn message to 'it is X's turn!'
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = ""); //takes away all the X's & O's and makes the cells blank
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', cellClick)); //event listener that will execute cellClick function each time cell is clicked
document.querySelector('.game--restart').addEventListener('click', restartGame); //adding event listener that will execute restartGame function when that button is clicked