var typeOfPlay = '';
var oPlayer = 'O';
var xPlayer = 'X';
var currentPlayer = 'X';
var aiPlayer = 'O';

var origBoard = [0,1,2,3,4,5,6,7,8];

var pickText = document.getElementById("pickText");
var intro = document.getElementsByClassName('intro');
var currentPlayerEl = document.getElementById('currentPlayer');
var allTD = document.getElementsByTagName('td');

var startGame = function(param) {
    pickText.style.display = 'none';
    for(let i = 0; i < intro.length; i++) {
        intro[i].style.display = 'none';
    }
    document.getElementById('board').style.display = 'block';
    currentPlayerEl.style.opacity = '1';
    currentPlayerEl.textContent = 'It`s your turn: ' + currentPlayer;
    typeOfPlay = param;
};

function gameHandler(square) {
    if(typeOfPlay === 'normal') {
        if(origBoard[square.id] !== xPlayer && origBoard[square.id] !== oPlayer && !winning(origBoard, xPlayer) && !winning(origBoard, oPlayer)) {
            if (currentPlayer === xPlayer) {
                square.textContent = xPlayer;
                square.classList.add(xPlayer);
                origBoard[square.id] = xPlayer;
                currentPlayer = oPlayer;
            } else if(currentPlayer === oPlayer) {
                square.textContent = oPlayer;
                square.classList.add(oPlayer);
                origBoard[square.id] = oPlayer;
                currentPlayer = xPlayer;
            }
            currentPlayerEl.textContent = 'It`s your turn: ' + currentPlayer;
        }
        if (winning(origBoard, xPlayer) || winning(origBoard, oPlayer)) {
            let winner;
            if(winning(origBoard, xPlayer)) {
                winner = xPlayer;
            } else {
                winner = oPlayer;
            }
            currentPlayerEl.textContent = 'We have a winner! ' + winner + ' 👏';
            document.getElementById('restart').style.display = 'block';
        } else if(origBoard.every(i => (typeof i === 'string'))) {
            currentPlayerEl.textContent = 'Draw! 👏';
            document.getElementById('restart').style.display = 'block';
        }
    } else if(typeOfPlay === 'auto') {
        if(origBoard[square.id] !== currentPlayer && origBoard[square.id] !== aiPlayer && !winning(origBoard, currentPlayer) && !winning(origBoard, aiPlayer)) {
            square.textContent = currentPlayer;
            square.classList.add(currentPlayer);
            origBoard[square.id] = currentPlayer;
            if(!origBoard.every(i => (typeof i === 'string'))) {
                aiPlayerMove(origBoard);
            }
        }
        if(winning(origBoard, currentPlayer) === true) {
            currentPlayerEl.textContent = 'You win! 👏';
            document.getElementById('restart').style.display = 'block';
        } else if(winning(origBoard, aiPlayer) === true) {
            currentPlayerEl.textContent = 'Computer win! ☹️';
            document.getElementById('restart').style.display = 'flex';
        } else if(origBoard.every(i => (typeof i === 'string'))) {
            document.getElementById('currentPlayer').textContent = 'Draw! 👏';
            document.getElementById('restart').style.display = 'block';
        }
    }
}
function aiPlayerMove(board) {
    for(let i = 0; i < board.length; i++) {
        let random = Math.floor(Math.random() * board.length);
        while (origBoard.every(i => (typeof i === 'string')) && board[random] === currentPlayer || board[random] === aiPlayer) {
            random = Math.floor(Math.random() * board.length-1);
        }
        if(board[random] !== currentPlayer && board[random] !== aiPlayer) {
            console.log('Random: ' + random);
            document.getElementById(board[random]).textContent = aiPlayer;
            document.getElementById(board[random]).classList.add(aiPlayer);
            board[random] = aiPlayer;
            origBoard = board;
            if (winning(origBoard, aiPlayer)) {
                currentPlayerEl.textContent = 'Computer win! 👏';
                document.getElementById('restart').style.display = 'block';
            } else if (winning(origBoard, currentPlayer)) {
                currentPlayerEl.textContent = 'We have a winner! ' + currentPlayer + ' 👏';
                document.getElementById('restart').style.display = 'block';
            }
            console.log(board);
            return;
        }
    }
}
let pickX = function() {
    oPlayer = 'O';
    xPlayer = 'X';
    currentPlayer = xPlayer;
    aiPlayer = oPlayer;
    document.getElementById('pickX').style.display = 'none';
    document.getElementById('pickO').style.display = 'none';
    picked();
};
let pickO = function(){
    oPlayer = 'O';
    xPlayer = 'X';
    currentPlayer = oPlayer;
    aiPlayer = xPlayer;
    document.getElementById('pickX').style.display = 'none';
    document.getElementById('pickO').style.display = 'none';
    picked();
};
let picked = function() {
    for(let i = 0; i < intro.length; i++) {
        intro[i].style.display = 'block';
    }
    pickText.innerText = 'Mode?';
};
let chooseMode = function(mode) {
    startGame(mode);
    window.scrollTo(0, document.body.scrollHeight);
};
function winning(board, player) {
    if (
        (board[0] === player && board[1] === player && board[2] === player) ||
        (board[3] === player && board[4] === player && board[5] === player) ||
        (board[6] === player && board[7] === player && board[8] === player) ||
        (board[0] === player && board[3] === player && board[6] === player) ||
        (board[1] === player && board[4] === player && board[7] === player) ||
        (board[2] === player && board[5] === player && board[8] === player) ||
        (board[0] === player && board[4] === player && board[8] === player) ||
        (board[2] === player && board[4] === player && board[6] === player)
    ) {
        return true;
    } else {
        return false;
    }
}
function reset() {
    for (let i = 0; i < allTD.length; i++){
        allTD[i].textContent = '';
    }
    typeOfPlay='';
    origBoard = [0,1,2,3,4,5,6,7,8];
    document.getElementById('restart').style.display = 'none';
    currentPlayerEl.textContent = '';
    document.getElementById('board').style.display='none';
    document.getElementById('or').style.display='none';
    pickText.style.display='block';
    pickText.innerText = 'You are?';
    document.getElementById('pickX').style.display='block';
    document.getElementById('pickO').style.display='block';
    let blocks = document.getElementsByClassName('block');
    for(let i = 0; i < blocks.length; i++) {
        if(blocks[i].classList.contains('X')) {
            blocks[i].classList.remove('X');
        } else if(blocks[i].classList.contains('O')) {
            blocks[i].classList.remove('O');
        }
    }
}
