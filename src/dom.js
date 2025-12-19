const board = document.querySelector(".board");

function displayGameboard(gameboard) {
    for (let i = 0; i < 8; i++) {
        const boardSquare = document.createElement("div");
        boardSquare.classList.add(`boardsquare${i}`);
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
        boardSquare.classList.add(`boardsquare${i}`);
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
        boardSquare.classList.add(`boardsquare${i}`);
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
        boardSquare.classList.add(`boardsquare${i}`);
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
        boardSquare.classList.add(`boardsquare${i}`);
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
        boardSquare.classList.add(`boardsquare${i}`);
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
        boardSquare.classList.add(`boardsquare${i}`);
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
        boardSquare.classList.add(`boardsquare${i}`);
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

function renderGameboard(gameboard) {
    for (let i = 0; i < gameboard.grid.length; i++) {
        if (gameboard.grid[i] != "|||") {
            const boardSquare = document.querySelector(`.boardsquare${i}`);
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

function chooseOpponent() {
    const battlePlayerButton = document.querySelector(".battleplayerbutton");
    const battleComputerButton = document.querySelector(".battlecomputerbutton");
    const startContainer = document.querySelector(".startcontainer");
    const chooseColorContainer = document.querySelector(".choosecolorcontainer");

    function clickBattleButton() {
        startContainer.style.display = "none";
        chooseColorContainer.style.display = "flex";

        battlePlayerButton.removeEventListener("click", clickBattleButton);
        battleComputerButton.removeEventListener("click", clickBattleButton);

        chooseColorBackButton();
        chooseColor();
    }

    battlePlayerButton.addEventListener("click", clickBattleButton);
    battleComputerButton.addEventListener("click", clickBattleButton);
}

function chooseColorBackButton() {
    const chooseColorBackButton = document.querySelector(".choosecolorbackbutton");
    const startContainer = document.querySelector(".startcontainer");
    const chooseColorContainer = document.querySelector(".choosecolorcontainer");

    function clickBackButton() {
        startContainer.style.display = "flex";
        chooseColorContainer.style.display = "none";

        chooseColorBackButton.removeEventListener("click", clickBackButton);

        chooseOpponent();
    }

    chooseColorBackButton.addEventListener("click", clickBackButton);
}

function chooseColor() {
    const chooseColorWhiteButton = document.querySelector(".choosewhite");
    const chooseColorBlackButton = document.querySelector(".chooseblack");
    const chooseColorContainer = document.querySelector(".choosecolorcontainer");
    const gameContainer = document.querySelector(".gamecontainer");

    function clickWhiteButton() {
        chooseColorContainer.style.display = "none";
        gameContainer.style.display = "flex";

        chooseColorWhiteButton.removeEventListener("click", clickWhiteButton);
        chooseColorBlackButton.removeEventListener("click", clickBlackButton);

        movePiece("Player 1");
        gameBackButton();
    }

    function clickBlackButton() {
        chooseColorContainer.style.display = "none";
        gameContainer.style.display = "flex";

        chooseColorWhiteButton.removeEventListener("click", clickWhiteButton);
        chooseColorBlackButton.removeEventListener("click", clickBlackButton);

        movePiece("Player 1");
        gameBackButton();
    }

    chooseColorWhiteButton.addEventListener("click", clickWhiteButton);
    chooseColorBlackButton.addEventListener("click", clickBlackButton);
}

function continueButton() {
    const continueButton = document.querySelector(".continuebutton");
    const gameContainer = document.querySelector(".gamecontainer");
    const refreshContainer = document.querySelector(".refreshcontainer");

    function clickContinueButton() {
        refreshContainer.style.display = "none";
        gameContainer.style.display = "flex";

        continueButton.removeEventListener("click", clickContinueButton);

        movePiece("Player 1");
        gameBackButton();
    }

    continueButton.addEventListener("click", clickContinueButton);
}

function newGameButton() {
    const newGameButton = document.querySelector(".newgamebutton");
    const startContainer = document.querySelector(".startcontainer");
    const refreshContainer = document.querySelector(".refreshcontainer");

    function clickNewGameButton() {
        refreshContainer.style.display = "none";
        startContainer.style.display = "flex";

        newGameButton.removeEventListener("click", clickNewGameButton);

        chooseOpponent();
    }

    newGameButton.addEventListener("click", clickNewGameButton);
}

function gameBackButton() {
    const gameBackButton = document.querySelector(".gamebackbutton");
    const refreshContainer = document.querySelector(".refreshcontainer");
    const gameContainer = document.querySelector(".gamecontainer");

    function clickBackButton() {
        refreshContainer.style.display = "flex";
        gameContainer.style.display = "none";

        gameBackButton.removeEventListener("click", clickBackButton);

        continueButton();
        newGameButton();
    }

    gameBackButton.addEventListener("click", clickBackButton);
}

function movePiece(playertype) {

    if (playertype == "Player 1") {
        const whitePieceSquares = document.querySelectorAll(".boardsquarewhitepiece");
        const boardSquares = document.querySelectorAll(".boardsquare");
        let curSquare = null;

        function clickPiece(e) {
            if (e.target.classList.contains("boardsquarewhitepiece")) {
                curSquare = e.target;
                boardSquares.forEach(boardSquare => {
                    boardSquare.classList.remove("boardsquarechosen");
                })
                e.target.classList.add("boardsquarechosen");
            }
        }

        boardSquares.forEach(boardSquare => {
            boardSquare.addEventListener("click", clickPiece);
        })
    }
}

export { displayGameboard, chooseOpponent };