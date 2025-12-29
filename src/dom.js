import { Piece } from "./javascript";

const board = document.querySelector(".board");

let curSquare = null;

let gameStarted = false;

let wPawn1 = new Piece("W", "P", 1);
let wPawn2 = new Piece("W", "P", 2);
let wPawn3 = new Piece("W", "P", 3);
let wPawn4 = new Piece("W", "P", 4);
let wPawn5 = new Piece("W", "P", 5);
let wPawn6 = new Piece("W", "P", 6);
let wPawn7 = new Piece("W", "P", 7);
let wPawn8 = new Piece("W", "P", 8);
let wRook1 = new Piece("W", "R", 1);
let wKnight1 = new Piece("W", "N", 1);
let wBishop1 = new Piece("W", "B", 1);
let wQueen = new Piece("W", "Q");
let wKing = new Piece("W", "K");
let wRook2 = new Piece("W", "R", 2);
let wKnight2 = new Piece("W", "N", 2);
let wBishop2 = new Piece("W", "B", 2);

let bPawn1 = new Piece("B", "P", 1);
let bPawn2 = new Piece("B", "P", 2);
let bPawn3 = new Piece("B", "P", 3);
let bPawn4 = new Piece("B", "P", 4);
let bPawn5 = new Piece("B", "P", 5);
let bPawn6 = new Piece("B", "P", 6);
let bPawn7 = new Piece("B", "P", 7);
let bPawn8 = new Piece("B", "P", 8);
let bRook1 = new Piece("B", "R", 1);
let bKnight1 = new Piece("B", "N", 1);
let bBishop1 = new Piece("B", "B", 1);
let bQueen = new Piece("B", "Q");
let bKing = new Piece("B", "K");
let bRook2 = new Piece("B", "R", 2);
let bKnight2 = new Piece("B", "N", 2);
let bBishop2 = new Piece("B", "B", 2);

let pieceArray = [];

pieceArray.push(wPawn1);
pieceArray.push(wPawn2);
pieceArray.push(wPawn3);
pieceArray.push(wPawn4);
pieceArray.push(wPawn5);
pieceArray.push(wPawn6);
pieceArray.push(wPawn7);
pieceArray.push(wPawn8);
pieceArray.push(wRook1);
pieceArray.push(wKnight1);
pieceArray.push(wBishop1);
pieceArray.push(wQueen);
pieceArray.push(wKing);
pieceArray.push(wRook2);
pieceArray.push(wKnight2);
pieceArray.push(wBishop2);

pieceArray.push(bPawn1);
pieceArray.push(bPawn2);
pieceArray.push(bPawn3);
pieceArray.push(bPawn4);
pieceArray.push(bPawn5);
pieceArray.push(bPawn6);
pieceArray.push(bPawn7);
pieceArray.push(bPawn8);
pieceArray.push(bRook1);
pieceArray.push(bKnight1);
pieceArray.push(bBishop1);
pieceArray.push(bQueen);
pieceArray.push(bKing);
pieceArray.push(bRook2);
pieceArray.push(bKnight2);
pieceArray.push(bBishop2);

function displayGameboard(gameboard) {
    for (let i = 0; i < 8; i++) {
        const boardSquare = document.createElement("div");
        boardSquare.classList.add(`a${i}`);
        boardSquare.classList.add('boardsquare');

        if (i % 2 == 0) {
            boardSquare.classList.add(`boardsquarewhite`);
        }

        else if (i % 2 == 1) {
            boardSquare.classList.add(`boardsquareblack`);
        }

        board.appendChild(boardSquare);
    }

    for (let i = 8; i < 16; i++) {
        const boardSquare = document.createElement("div");
        boardSquare.classList.add(`a${i}`);
        boardSquare.classList.add('boardsquare');

        if (i % 2 == 0) {
            boardSquare.classList.add(`boardsquareblack`);
        }

        else if (i % 2 == 1) {
            boardSquare.classList.add(`boardsquarewhite`);
        }

        board.appendChild(boardSquare);
    }

    for (let i = 16; i < 24; i++) {
        const boardSquare = document.createElement("div");
        boardSquare.classList.add(`a${i}`);
        boardSquare.classList.add('boardsquare');

        if (i % 2 == 0) {
            boardSquare.classList.add(`boardsquarewhite`);
        }

        else if (i % 2 == 1) {
            boardSquare.classList.add(`boardsquareblack`);
        }

        board.appendChild(boardSquare);
    }

    for (let i = 24; i < 32; i++) {
        const boardSquare = document.createElement("div");
        boardSquare.classList.add(`a${i}`);
        boardSquare.classList.add('boardsquare');

        if (i % 2 == 0) {
            boardSquare.classList.add(`boardsquareblack`);
        }

        else if (i % 2 == 1) {
            boardSquare.classList.add(`boardsquarewhite`);
        }

        board.appendChild(boardSquare);
    }

    for (let i = 32; i < 40; i++) {
        const boardSquare = document.createElement("div");
        boardSquare.classList.add(`a${i}`);
        boardSquare.classList.add('boardsquare');

        if (i % 2 == 0) {
            boardSquare.classList.add(`boardsquarewhite`);
        }

        else if (i % 2 == 1) {
            boardSquare.classList.add(`boardsquareblack`);
        }

        board.appendChild(boardSquare);
    }

    for (let i = 40; i < 48; i++) {
        const boardSquare = document.createElement("div");
        boardSquare.classList.add(`a${i}`);
        boardSquare.classList.add('boardsquare');

        if (i % 2 == 0) {
            boardSquare.classList.add(`boardsquareblack`);
        }

        else if (i % 2 == 1) {
            boardSquare.classList.add(`boardsquarewhite`);
        }

        board.appendChild(boardSquare);
    }

    for (let i = 48; i < 56; i++) {
        const boardSquare = document.createElement("div");
        boardSquare.classList.add(`a${i}`);
        boardSquare.classList.add('boardsquare');

        if (i % 2 == 0) {
            boardSquare.classList.add(`boardsquarewhite`);
        }

        else if (i % 2 == 1) {
            boardSquare.classList.add(`boardsquareblack`);
        }

        board.appendChild(boardSquare);
    }

    for (let i = 56; i < 64; i++) {
        const boardSquare = document.createElement("div");
        boardSquare.classList.add(`a${i}`);
        boardSquare.classList.add('boardsquare');

        if (i % 2 == 0) {
            boardSquare.classList.add(`boardsquareblack`);
        }

        else if (i % 2 == 1) {
            boardSquare.classList.add(`boardsquarewhite`);
        }

        board.appendChild(boardSquare);
    }

    renderGameboard(gameboard);
}

function renderGameboard(gameboard, option) {

    if (option == "Clear") {
        for (let i = 0; i < gameboard.grid.length; i++) {
            if (gameboard.grid[i] != "|||") {
                const boardSquare = document.querySelector(`.a${i}`);
                boardSquare.textContent = "";
                if (gameboard.grid[i].startsWith("W")) {
                    boardSquare.classList.remove('boardsquarewhitepiece');
                }

                else if (gameboard.grid[i].startsWith("B")) {
                    boardSquare.classList.remove('boardsquareblackpiece');
                }
                boardSquare.classList.remove('boardsquarepiece');
            }
        }
    }

    else {
        for (let i = 0; i < gameboard.grid.length; i++) {
            if (gameboard.grid[i] != "|||") {
                const boardSquare = document.querySelector(`.a${i}`);
                boardSquare.textContent = gameboard.grid[i];
                boardSquare.style.fontSize = "10px";
                boardSquare.style.textAlign = "center";
                if (gameboard.grid[i].startsWith("W")) {
                    boardSquare.classList.add('boardsquarewhitepiece');
                }

                else if (gameboard.grid[i].startsWith("B")) {
                    boardSquare.classList.add('boardsquareblackpiece');
                }
                boardSquare.classList.add('boardsquarepiece');
            }
        }
    }
}

function chooseOpponent(currentplayer, player, otherPlayer, gameboard) {
    const battlePlayerButton = document.querySelector(".battleplayerbutton");
    const battleComputerButton = document.querySelector(".battlecomputerbutton");
    const startContainer = document.querySelector(".startcontainer");
    const chooseColorContainer = document.querySelector(".choosecolorcontainer");

    function clickBattleButton() {
        startContainer.style.display = "none";
        chooseColorContainer.style.display = "flex";

        battlePlayerButton.removeEventListener("click", clickBattleButton);
        battleComputerButton.removeEventListener("click", clickBattleButton);

        chooseColorBackButton(currentplayer, player, otherPlayer, gameboard);
        chooseColor(currentplayer, player, otherPlayer, gameboard);
    }

    battlePlayerButton.addEventListener("click", clickBattleButton);
    battleComputerButton.addEventListener("click", clickBattleButton);
}

function chooseColorBackButton(currentplayer, player, otherPlayer, gameboard) {
    const chooseColorBackButton = document.querySelector(".choosecolorbackbutton");
    const startContainer = document.querySelector(".startcontainer");
    const chooseColorContainer = document.querySelector(".choosecolorcontainer");

    function clickBackButton() {
        startContainer.style.display = "flex";
        chooseColorContainer.style.display = "none";

        chooseColorBackButton.removeEventListener("click", clickBackButton);

        chooseOpponent(currentplayer, player, otherPlayer, gameboard);
    }

    chooseColorBackButton.addEventListener("click", clickBackButton);
}

function chooseColor(currentplayer, player, otherPlayer, gameboard) {
    const chooseColorWhiteButton = document.querySelector(".choosewhite");
    const chooseColorBlackButton = document.querySelector(".chooseblack");
    const chooseColorContainer = document.querySelector(".choosecolorcontainer");
    const gameContainer = document.querySelector(".gamecontainer");

    function clickWhiteButton() {
        chooseColorContainer.style.display = "none";
        gameContainer.style.display = "flex";

        chooseColorWhiteButton.removeEventListener("click", clickWhiteButton);
        chooseColorBlackButton.removeEventListener("click", clickBlackButton);

        if (gameStarted == false) {
            movePiece(currentplayer, player, otherPlayer, gameboard);
        }

        gameBackButton(currentplayer, player, otherPlayer, gameboard);
    }

    function clickBlackButton() {
        chooseColorContainer.style.display = "none";
        gameContainer.style.display = "flex";

        chooseColorWhiteButton.removeEventListener("click", clickWhiteButton);
        chooseColorBlackButton.removeEventListener("click", clickBlackButton);

        if (gameStarted == false) {
            movePiece(currentplayer, player, otherPlayer, gameboard);
        }

        gameBackButton(currentplayer, player, otherPlayer, gameboard);
    }

    chooseColorWhiteButton.addEventListener("click", clickWhiteButton);
    chooseColorBlackButton.addEventListener("click", clickBlackButton);
}

function continueButton(currentplayer, player, otherPlayer, gameboard) {
    const continueButton = document.querySelector(".continuebutton");
    const gameContainer = document.querySelector(".gamecontainer");
    const refreshContainer = document.querySelector(".refreshcontainer");

    function clickContinueButton() {
        refreshContainer.style.display = "none";
        gameContainer.style.display = "flex";

        continueButton.removeEventListener("click", clickContinueButton);

        if (gameStarted == false) {
            movePiece(currentplayer, player, otherPlayer, gameboard);
        }
        
        gameBackButton(currentplayer, player, otherPlayer, gameboard);
    }

    continueButton.addEventListener("click", clickContinueButton);
}

function newGameButton(currentplayer, player, otherPlayer, gameboard) {
    const newGameButton = document.querySelector(".newgamebutton");
    const startContainer = document.querySelector(".startcontainer");
    const refreshContainer = document.querySelector(".refreshcontainer");

    function clickNewGameButton() {
        refreshContainer.style.display = "none";
        startContainer.style.display = "flex";

        newGameButton.removeEventListener("click", clickNewGameButton);

        chooseOpponent(currentplayer, player, otherPlayer, gameboard);
    }

    newGameButton.addEventListener("click", clickNewGameButton);
}

function gameBackButton(currentplayer, player, otherPlayer, gameboard) {
    const gameBackButton = document.querySelector(".gamebackbutton");
    const refreshContainer = document.querySelector(".refreshcontainer");
    const gameContainer = document.querySelector(".gamecontainer");
    const boardSquares = document.querySelectorAll(".boardsquare");

    function clickBackButton() {
        refreshContainer.style.display = "flex";
        gameContainer.style.display = "none";

        gameBackButton.removeEventListener("click", clickBackButton);

        curSquare = null;

        gameStarted = true;

        boardSquares.forEach(boardSquare => {
            boardSquare.classList.remove("boardsquarechosen");
        })

        gameBackButton.removeEventListener("click", clickBackButton);

        continueButton(currentplayer, player, otherPlayer, gameboard);
        newGameButton(currentplayer, player, otherPlayer, gameboard);
    }

    gameBackButton.addEventListener("click", clickBackButton);
}

function movePiece(currentplayer, player, otherPlayer, gameboard) {

    if (player.currentTurn == true) {
        const whitePieceSquares = document.querySelectorAll(".boardsquarewhitepiece");
        const boardSquares = document.querySelectorAll(".boardsquare");

        function clickPiece(e) {

            //Choose piece
            if (e.target.classList.contains("boardsquarewhitepiece")) {
                curSquare = e.target;
                boardSquares.forEach(boardSquare => {
                    boardSquare.classList.remove("boardsquarechosen");
                })
                e.target.classList.add("boardsquarechosen");
            }

            //Moving piece
            else if (!e.target.classList.contains("boardsquarewhitepiece") && !e.target.classList.contains("boardsquarechosen") && curSquare != null) {
                //let chosenPiece = new Piece(curSquare.textContent[0], curSquare.textContent[1], Number(curSquare.textContent[2]));
                let chosenPiece;
                
                for (let i = 0; i < pieceArray.length; i++) {
                    if (pieceArray[i].color == curSquare.textContent[0] && pieceArray[i].name == curSquare.textContent[1] && pieceArray[i].num == curSquare.textContent[2]) {
                        chosenPiece = pieceArray[i];
                    }
                }

                let classes = e.target.classList;
                let newIndex = null;
                for (let i = 0; i < classes.length; i++) {
                    if (classes[i].startsWith("a")) {
                        newIndex = Number(classes[i].slice(1));
                    }
                }
                renderGameboard(gameboard, "Clear");
                player.move(gameboard.grid, chosenPiece, newIndex, otherPlayer);
                renderGameboard(gameboard);
                boardSquares.forEach(boardSquare => {
                    boardSquare.classList.remove("boardsquarechosen");
                })
                curSquare = null;

                if (player.currentTurn == false) {
                    boardSquares.forEach(boardSquare => {
                        boardSquare.removeEventListener("click", clickPiece);
                    })

                    movePiece(currentplayer, player, otherPlayer, gameboard);
                }
            }
        }

        boardSquares.forEach(boardSquare => {
            boardSquare.addEventListener("click", clickPiece);
        })
    }

    else if (player.currentTurn == false) {
        const boardSquares = document.querySelectorAll(".boardsquare");

        function clickPiece(e) {

            //Choose piece
            if (e.target.classList.contains("boardsquareblackpiece")) {
                curSquare = e.target;
                boardSquares.forEach(boardSquare => {
                    boardSquare.classList.remove("boardsquarechosen");
                })
                e.target.classList.add("boardsquarechosen");
            }

            //Moving piece
            else if (!e.target.classList.contains("boardsquareblackpiece") && !e.target.classList.contains("boardsquarechosen") && curSquare != null) {
                //let chosenPiece = new Piece(curSquare.textContent[0], curSquare.textContent[1], Number(curSquare.textContent[2]));
                let chosenPiece;

                for (let i = 0; i < pieceArray.length; i++) {
                    if (pieceArray[i].color == curSquare.textContent[0] && pieceArray[i].name == curSquare.textContent[1] && pieceArray[i].num == curSquare.textContent[2]) {
                        chosenPiece = pieceArray[i];
                    }
                }

                let classes = e.target.classList;
                let newIndex = null;
                for (let i = 0; i < classes.length; i++) {
                    if (classes[i].startsWith("a")) {
                        newIndex = Number(classes[i].slice(1));
                    }
                }
                renderGameboard(gameboard, "Clear");
                otherPlayer.move(gameboard.grid, chosenPiece, newIndex, player);
                renderGameboard(gameboard);
                boardSquares.forEach(boardSquare => {
                    boardSquare.classList.remove("boardsquarechosen");
                })
                curSquare = null;

                if (player.currentTurn == true) {
                    boardSquares.forEach(boardSquare => {
                        boardSquare.removeEventListener("click", clickPiece);
                    })

                    movePiece(currentplayer, player, otherPlayer, gameboard);
                }
            }
        }

        boardSquares.forEach(boardSquare => {
            boardSquare.addEventListener("click", clickPiece);
        })
    }
}

function computerPlayerMovePiece(player, gameboard) {
    if (player.currentTurn == false) {
        
    }
}

export { displayGameboard, chooseOpponent };