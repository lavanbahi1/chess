const board = document.querySelector(".board");

function displayGameboard() {
    for (let i = 0; i < 8; i++) {
        const boardSquare = document.createElement("div");
        boardSquare.classList.add(`boardsquare${i}`);

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

        if (i % 2 == 0) {
            boardSquare.classList.add(`boardsquareblack`);
        }

        else if (i % 2 == 1) {
            boardSquare.classList.add(`boardsquarewhite`);
        }

        board.appendChild(boardSquare);
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

function continueButton() {
    const continueButton = document.querySelector(".continuebutton");
    const gameContainer = document.querySelector(".gamecontainer");
    const refreshContainer = document.querySelector(".refreshcontainer");

    function clickContinueButton() {
        refreshContainer.style.display = "none";
        gameContainer.style.display = "flex";

        continueButton.removeEventListener("click", clickContinueButton)

        gameBackButton();
    }

    continueButton.addEventListener("click", clickContinueButton);
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

        gameBackButton();
    }

    function clickBlackButton() {
        chooseColorContainer.style.display = "none";
        gameContainer.style.display = "flex";

        chooseColorWhiteButton.removeEventListener("click", clickWhiteButton);
        chooseColorBlackButton.removeEventListener("click", clickBlackButton);

        gameBackButton();
    }

    chooseColorWhiteButton.addEventListener("click", clickWhiteButton);
    chooseColorBlackButton.addEventListener("click", clickBlackButton);
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
    }

    gameBackButton.addEventListener("click", clickBackButton);
}

export { displayGameboard, chooseOpponent };