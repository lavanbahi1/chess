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

export { displayGameboard };