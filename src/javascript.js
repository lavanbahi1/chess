class Piece {
    constructor(color, name, num) {
        this.name = name;
        this.color = color;
        this.num = num;
        this.firstTurn = true;
    }

    resetPiece(name, num) {
        this.name = name;
        this.num = num;
        this.firstTurn = true;
    }
}

class Gameboard {
    constructor() {
        this.grid = this.createGrid();
        this.pieces = [];
    }

    createGrid() {
        let grid = [];

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let square = '|||';
                grid.push(square);
            }
        }

        grid[0] = "BR1";
        grid[1] = "BN1";
        grid[2] = "BB1";
        grid[3] = "BQ";
        grid[4] = "BK";
        grid[5] = "BB2";
        grid[6] = "BN2";
        grid[7] = "BR2";
        
        grid[8] = "BP1";
        grid[9] = "BP2";
        grid[10] = "BP3";
        grid[11] = "BP4";
        grid[12] = "BP5";
        grid[13] = "BP6";
        grid[14] = "BP7";
        grid[15] = "BP8";

        grid[48] = "WP1";
        grid[49] = "WP2";
        grid[50] = "WP3";
        grid[51] = "WP4";
        grid[52] = "WP5";
        grid[53] = "WP6";
        grid[54] = "WP7";
        grid[55] = "WP8";

        grid[56] = "WR1";
        grid[57] = "WN1";
        grid[58] = "WB1";
        grid[59] = "WQ";
        grid[60] = "WK";
        grid[61] = "WB2";
        grid[62] = "WN2";
        grid[63] = "WR2";

        //console.log(grid);

        return grid;
    }

    printGrid() {
        let arr = [];
        let row1 = [];
        let row2 = [];
        let row3 = [];
        let row4 = [];
        let row5 = [];
        let row6 = [];
        let row7 = [];
        let row8 = [];

        row1.push("0   ");

        for (let i = 0; i < 8; i++) {
            row1.push(this.grid[i]);
        }

        row1.push("    7");

        row2.push("8   ");

        for (let i = 8; i < 16; i++) {
            row2.push(this.grid[i]);
        }
        
        row2.push("  15");

        row3.push("16  ");

        for (let i = 16; i < 24; i++) {
            row3.push(this.grid[i]);
        }

        row3.push("  23");

        row4.push("24  ");

        for (let i = 24; i < 32; i++) {
            row4.push(this.grid[i]);
        }

        row4.push("  31")

        row5.push("32  ");

        for (let i = 32; i < 40; i++) {
            row5.push(this.grid[i]);
        }

        row5.push("  39");

        row6.push("40  ");

        for (let i = 40; i < 48; i++) {
            row6.push(this.grid[i]);
        }

        row6.push("  47");

        row7.push("48  ");

        for (let i = 48; i < 56; i++) {
            row7.push(this.grid[i]);
        }

        row7.push("  55");

        row8.push("56  ");

        for (let i = 56; i < 64; i++) {
            row8.push(this.grid[i]);
        }

        row8.push("    63");

        arr.push(row1.join(" "));
        arr.push(row2.join(" "));
        arr.push(row3.join(" "));
        arr.push(row4.join(" "));
        arr.push(row5.join(" "));
        arr.push(row6.join(" "));
        arr.push(row7.join(" "));
        arr.push(row8.join(" "));

        console.log(arr);

    }

    resetGrid() {
        this.grid = this.createGrid();
    }
}

class Player {
    constructor(color, currentTurn) {
        this.color = color;
        this.currentTurn = currentTurn;
        this.enPassant = false;
        this.hasMoved = false;
        this.completedTwoSquaresMove = false;
        this.numOfWhiteQueens = [2, 3, 4, 5, 6, 7, 8, 9];
        this.numOfBlackQueens = [2, 3, 4, 5, 6, 7, 8, 9];
        this.inCheck = false;
    }

    resetPlayer(currentTurn) {
        this.currentTurn = currentTurn;
        this.enPassant = false;
        this.hasMoved = false;
        this.completedTwoSquaresMove = false;
        this.numOfWhiteQueens = [2, 3, 4, 5, 6, 7, 8, 9];
        this.numOfBlackQueens = [2, 3, 4, 5, 6, 7, 8, 9];
        this.inCheck = false;
    }

    move(grid, piece, newIndex, enemyPlayer) {
        let pieceNum = piece.num;

        if (pieceNum == undefined) {
            pieceNum = "";
        }

        let pieceString = piece.color + piece.name + pieceNum;
        let pieceCurrentIndex = grid.indexOf(pieceString);

        if (this.checkIfKingIsInCheck(grid, piece, newIndex, this.color) == true) {

        }

        else if (this.checkIfKingIsInCheck(grid, piece, newIndex, this.color) == false) {
            this.inCheck = false;

            if (piece.name == "P") {
                if (piece.color == "W") {
                    
                    // Moving 1 space forward 
                    if (pieceCurrentIndex - newIndex == 8) {
                        if (grid[newIndex] != "|||") {

                        }

                        else {
                            grid[pieceCurrentIndex] = "|||";
                            grid[newIndex] = pieceString;

                            /*if (newIndex == 0 || newIndex == 1 || newIndex == 2 || newIndex == 3 || newIndex == 4 || newIndex == 5 || newIndex == 6 || newIndex == 7) {
                                piece.name = "Q"
                                piece.num = this.numOfWhiteQueens[0];
                                this.numOfWhiteQueens.shift();
                                grid[newIndex] = "W" + piece.name + piece.num;
                            }*/
                            
                            piece.firstTurn = false;
                            this.hasMoved = true;   

                            this.currentTurn = false;
                            enemyPlayer.currentTurn = true;
                        }
                    }

                    // Moving 2 spaces forward only during first turn
                    else if ((pieceCurrentIndex - newIndex == 16) && piece.firstTurn == true) {
                        if (grid[newIndex] != "|||") {

                        }

                        else if (grid[newIndex + 8] != "|||") {

                        }

                        else {
                            grid[pieceCurrentIndex] = "|||";
                            grid[newIndex] = pieceString;

                            /*if (newIndex == 0 || newIndex == 1 || newIndex == 2 || newIndex == 3 || newIndex == 4 || newIndex == 5 || newIndex == 6 || newIndex == 7) {
                                piece.name = "Q"
                                piece.num = this.numOfWhiteQueens[0];
                                this.numOfWhiteQueens.shift();
                                grid[newIndex] = "W" + piece.name + piece.num;
                            }*/

                            piece.firstTurn = false;
                            this.hasMoved = true;
                            this.completedTwoSquaresMove = true;

                            this.currentTurn = false;
                            enemyPlayer.currentTurn = true;
                        }
                    }

                    // Capturing piece diagonally in front of it
                    else if (pieceCurrentIndex - newIndex == 9 || pieceCurrentIndex - newIndex == 7) {
                        
                        if (this.enPassant == true && grid[newIndex - 8] != "BK") {
                            if (((newIndex >= 0 && newIndex < 8) && (pieceCurrentIndex >= 8 && pieceCurrentIndex < 16))
                            || ((newIndex >= 8 && newIndex < 16) && (pieceCurrentIndex >= 16 && pieceCurrentIndex < 24))
                            || ((newIndex >= 16 && newIndex < 24) && (pieceCurrentIndex >= 24 && pieceCurrentIndex < 32))
                            || ((newIndex >= 24 && newIndex < 32) && (pieceCurrentIndex >= 32 && pieceCurrentIndex < 40))
                            || ((newIndex >= 32 && newIndex < 40) && (pieceCurrentIndex >= 40 && pieceCurrentIndex < 48))
                            || ((newIndex >= 40 && newIndex < 48) && (pieceCurrentIndex >= 48 && pieceCurrentIndex < 56))
                            || ((newIndex >= 48 && newIndex < 56) && (pieceCurrentIndex >= 56 && pieceCurrentIndex < 64))) {

                                grid[pieceCurrentIndex] = "|||";
                                grid[newIndex] = pieceString;
                                grid[newIndex + 8] = "|||"; // Capture enemy pawn
                                this.enPassant = false;
                                this.hasMoved = true;
                                console.log("enPassant by white pawn");  
                                
                                this.currentTurn = false;
                                enemyPlayer.currentTurn = true;
                            }
                        }

                        else if (grid[newIndex] == "|||" || grid[newIndex] == "BK") { // Can not capture king

                        }

                        else {
                            if (((newIndex >= 0 && newIndex < 8) && (pieceCurrentIndex >= 8 && pieceCurrentIndex < 16))
                            || ((newIndex >= 8 && newIndex < 16) && (pieceCurrentIndex >= 16 && pieceCurrentIndex < 24))
                            || ((newIndex >= 16 && newIndex < 24) && (pieceCurrentIndex >= 24 && pieceCurrentIndex < 32))
                            || ((newIndex >= 24 && newIndex < 32) && (pieceCurrentIndex >= 32 && pieceCurrentIndex < 40))
                            || ((newIndex >= 32 && newIndex < 40) && (pieceCurrentIndex >= 40 && pieceCurrentIndex < 48))
                            || ((newIndex >= 40 && newIndex < 48) && (pieceCurrentIndex >= 48 && pieceCurrentIndex < 56))
                            || ((newIndex >= 48 && newIndex < 56) && (pieceCurrentIndex >= 56 && pieceCurrentIndex < 64))) {

                                grid[pieceCurrentIndex] = "|||";
                                grid[newIndex] = pieceString;

                                /*if (newIndex == 0 || newIndex == 1 || newIndex == 2 || newIndex == 3 || newIndex == 4 || newIndex == 5 || newIndex == 6 || newIndex == 7) {
                                    piece.name = "Q"
                                    piece.num = this.numOfWhiteQueens[0];
                                    this.numOfWhiteQueens.shift();
                                    grid[newIndex] = "W" + piece.name + piece.num;
                                }*/

                                this.hasMoved = true;

                                this.currentTurn = false;
                                enemyPlayer.currentTurn = true;
                            }
                        }
                    }

                    else {

                    }

                    // Check if enemy pawn can en passant. Makes sure the player pawn has moved (above occurred)
                    if (grid[newIndex - 1].startsWith("BP") && this.hasMoved == true && this.completedTwoSquaresMove == true) {
                        enemyPlayer.enPassant = true;
                        console.log(`White pawn ${grid[newIndex]} has black pawn ${grid[newIndex - 1]} to the left`);
                    }

                    else if (grid[newIndex + 1].startsWith("BP") && this.hasMoved == true && this.completedTwoSquaresMove == true) {
                        enemyPlayer.enPassant = true;
                        console.log(`White pawn ${grid[newIndex]} has black pawn ${grid[newIndex + 1]} to the right`);
                    }

                    // Check if enemy king is in check
                    if (((newIndex - 7 >= 0 && newIndex - 7 < 8) && (newIndex >= 8 && newIndex < 16))
                    || ((newIndex - 7 >= 8 && newIndex - 7 < 16) && (newIndex >= 16 && newIndex < 24))
                    || ((newIndex - 7 >= 16 && newIndex - 7 < 24) && (newIndex >= 24 && newIndex < 32))
                    || ((newIndex - 7 >= 24 && newIndex - 7 < 32) && (newIndex >= 32 && newIndex < 40))
                    || ((newIndex - 7 >= 32 && newIndex - 7 < 40) && (newIndex >= 40 && newIndex < 48))
                    || ((newIndex - 7 >= 40 && newIndex - 7 < 48) && (newIndex >= 48 && newIndex < 56))
                    || ((newIndex - 7 >= 48 && newIndex - 7 < 56) && (newIndex >= 56 && newIndex < 64))) {
                        if (grid[newIndex - 7].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                        }
                    }

                    else if (((newIndex - 9 >= 0 && newIndex - 9 < 8) && (newIndex >= 8 && newIndex < 16))
                    || ((newIndex - 9 >= 8 && newIndex - 9 < 16) && (newIndex >= 16 && newIndex < 24))
                    || ((newIndex - 9 >= 16 && newIndex - 9 < 24) && (newIndex >= 24 && newIndex < 32))
                    || ((newIndex - 9 >= 24 && newIndex - 9 < 32) && (newIndex >= 32 && newIndex < 40))
                    || ((newIndex - 9 >= 32 && newIndex - 9 < 40) && (newIndex >= 40 && newIndex < 48))
                    || ((newIndex - 9 >= 40 && newIndex - 9 < 48) && (newIndex >= 48 && newIndex < 56))
                    || ((newIndex - 9 >= 48 && newIndex - 9 < 56) && (newIndex >= 56 && newIndex < 64))) {
                        if (grid[newIndex - 9].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                        }
                    }

                    this.hasMoved = false;
                    this.completedTwoSquaresMove = false;
                }

                else if (piece.color == "B") {
                    // Moving 1 or 2 spaces forward 
                    if (newIndex - pieceCurrentIndex == 8) {
                        if (grid[newIndex] != "|||") {

                        }

                        else {
                            grid[pieceCurrentIndex] = "|||";
                            grid[newIndex] = pieceString;

                            /*if (newIndex == 56 || newIndex == 57 || newIndex == 58 || newIndex == 59 || newIndex == 60 || newIndex == 61 || newIndex == 62 || newIndex == 63) {
                                piece.name = "Q"
                                piece.num = this.numOfBlackQueens[0];
                                this.numOfBlackQueens.shift();
                                grid[newIndex] = "B" + piece.name + piece.num;
                            }*/

                            piece.firstTurn = false;
                            this.hasMoved = true;

                            this.currentTurn = false;
                            enemyPlayer.currentTurn = true;
                        }
                    }

                    else if ((newIndex - pieceCurrentIndex == 16) && piece.firstTurn == true) {
                        if (grid[newIndex] != "|||") {

                        }

                        else if (grid[newIndex - 8] != "|||") {

                        }

                        else {
                            grid[pieceCurrentIndex] = "|||";
                            grid[newIndex] = pieceString;

                            /*if (newIndex == 56 || newIndex == 57 || newIndex == 58 || newIndex == 59 || newIndex == 60 || newIndex == 61 || newIndex == 62 || newIndex == 63) {
                                piece.name = "Q"
                                piece.num = this.numOfBlackQueens[0];
                                this.numOfBlackQueens.shift();
                                grid[newIndex] = "B" + piece.name + piece.num;
                            }*/

                            piece.firstTurn = false;
                            this.hasMoved = true;
                            this.completedTwoSquaresMove = true

                            this.currentTurn = false;
                            enemyPlayer.currentTurn = true;
                        }                    
                    }

                    // Capturing piece diagonally in front of it
                    else if (newIndex - pieceCurrentIndex == 9 || newIndex - pieceCurrentIndex == 7) {
                        if (this.enPassant == true && grid[newIndex - 8] != "WK") {
                            if (((newIndex >= 8 && newIndex < 16) && (pieceCurrentIndex >= 0 && pieceCurrentIndex < 8))
                            || ((newIndex >= 16 && newIndex < 24) && (pieceCurrentIndex >= 8 && pieceCurrentIndex < 16))
                            || ((newIndex >= 24 && newIndex < 32) && (pieceCurrentIndex >= 16 && pieceCurrentIndex < 24))
                            || ((newIndex >= 32 && newIndex < 40) && (pieceCurrentIndex >= 24 && pieceCurrentIndex < 32))
                            || ((newIndex >= 40 && newIndex < 48) && (pieceCurrentIndex >= 32 && pieceCurrentIndex < 40))
                            || ((newIndex >= 48 && newIndex < 56) && (pieceCurrentIndex >= 40 && pieceCurrentIndex < 48))
                            || ((newIndex >= 56 && newIndex < 64) && (pieceCurrentIndex >= 48 && pieceCurrentIndex < 56))) { 
                                grid[pieceCurrentIndex] = "|||";
                                grid[newIndex] = pieceString;
                                grid[newIndex - 8] = "|||"; // Capture enemy pawn
                                this.enPassant = false;
                                this.hasMoved = true;
                                console.log("enPassant by black pawn");

                                this.currentTurn = false;
                                enemyPlayer.currentTurn = true;
                            }
                        }

                        else if (grid[newIndex] == "|||" || grid[newIndex] == "WK") { // Can not capture king

                        }

                        else {

                            if (((newIndex >= 8 && newIndex < 16) && (pieceCurrentIndex >= 0 && pieceCurrentIndex < 8))
                            || ((newIndex >= 16 && newIndex < 24) && (pieceCurrentIndex >= 8 && pieceCurrentIndex < 16))
                            || ((newIndex >= 24 && newIndex < 32) && (pieceCurrentIndex >= 16 && pieceCurrentIndex < 24))
                            || ((newIndex >= 32 && newIndex < 40) && (pieceCurrentIndex >= 24 && pieceCurrentIndex < 32))
                            || ((newIndex >= 40 && newIndex < 48) && (pieceCurrentIndex >= 32 && pieceCurrentIndex < 40))
                            || ((newIndex >= 48 && newIndex < 56) && (pieceCurrentIndex >= 40 && pieceCurrentIndex < 48))
                            || ((newIndex >= 56 && newIndex < 64) && (pieceCurrentIndex >= 48 && pieceCurrentIndex < 56))) {                        
                                grid[pieceCurrentIndex] = "|||";
                                grid[newIndex] = pieceString;

                                /*if (newIndex == 56 || newIndex == 57 || newIndex == 58 || newIndex == 59 || newIndex == 60 || newIndex == 61 || newIndex == 62 || newIndex == 63) {
                                    piece.name = "Q"
                                    piece.num = this.numOfBlackQueens[0];
                                    this.numOfBlackQueens.shift();
                                    grid[newIndex] = "B" + piece.name + piece.num;
                                }*/

                                this.hasMoved = true;

                                this.currentTurn = false;
                                enemyPlayer.currentTurn = true;
                            }
                        }
                    }

                    else {

                    }

                    // Check if enemy pawn can en passant. Makes sure the player pawn has moved (above occurred)
                    if (grid[newIndex - 1].startsWith("WP") && this.hasMoved == true && this.completedTwoSquaresMove == true) {
                        enemyPlayer.enPassant = true;
                        console.log(`Black pawn ${grid[newIndex]} has white pawn ${grid[newIndex - 1]} to the left`);
                    }

                    else if (grid[newIndex + 1].startsWith("WP") && this.hasMoved == true && this.completedTwoSquaresMove == true) {
                        enemyPlayer.enPassant = true;
                        console.log(`Black pawn ${grid[newIndex]} has white pawn ${grid[newIndex + 1]} to the right`);
                    }

                    // Check if enemy king is in check
                    if (((newIndex >= 0 && newIndex < 8) && (newIndex + 7 >= 8 && newIndex + 7 < 16))
                    || ((newIndex >= 8 && newIndex < 16) && (newIndex + 7 >= 16 && newIndex + 7 < 24))
                    || ((newIndex >= 16 && newIndex < 24) && (newIndex + 7 >= 24 && newIndex + 7 < 32))
                    || ((newIndex >= 24 && newIndex < 32) && (newIndex + 7 >= 32 && newIndex + 7 < 40))
                    || ((newIndex >= 32 && newIndex < 40) && (newIndex + 7 >= 40 && newIndex + 7 < 48))
                    || ((newIndex >= 40 && newIndex < 48) && (newIndex + 7 >= 48 && newIndex + 7 < 56))
                    || ((newIndex >= 48 && newIndex < 56) && (newIndex + 7 >= 56 && newIndex + 7 < 64))) {
                        if (grid[newIndex + 7].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                        }
                    }

                    else if (((newIndex >= 0 && newIndex < 8) && (newIndex + 9 >= 8 && newIndex + 9 < 16))
                    || ((newIndex >= 8 && newIndex < 16) && (newIndex + 9 >= 16 && newIndex + 9 < 24))
                    || ((newIndex >= 16 && newIndex < 24) && (newIndex + 9 >= 24 && newIndex + 9 < 32))
                    || ((newIndex >= 24 && newIndex < 32) && (newIndex + 9 >= 32 && newIndex + 9 < 40))
                    || ((newIndex >= 32 && newIndex < 40) && (newIndex + 9 >= 40 && newIndex + 9 < 48))
                    || ((newIndex >= 40 && newIndex < 48) && (newIndex + 9 >= 48 && newIndex + 9 < 56))
                    || ((newIndex >= 48 && newIndex < 56) && (newIndex + 9 >= 56 && newIndex + 9 < 64))) {
                        if (grid[newIndex + 9].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                        }
                    }

                    this.hasMoved = false;
                    this.completedTwoSquaresMove = false;
                }
            }

            else if (piece.name == "R") {

                if (piece.color == "W") {

                    // Moving up and capturing
                    if (pieceCurrentIndex - newIndex == 8 || pieceCurrentIndex - newIndex == 16
                        || pieceCurrentIndex - newIndex == 24 || pieceCurrentIndex - newIndex == 32 
                        || pieceCurrentIndex - newIndex == 40 || pieceCurrentIndex - newIndex == 48 
                        || pieceCurrentIndex - newIndex == 56) {

                        let notAllEmpty = false;

                        for (let i = pieceCurrentIndex - 8; i > newIndex; i -= 8) {
                            if ((grid[i] != "|||") && pieceCurrentIndex - newIndex != 8) {
                                notAllEmpty = true;
                            }
                        }

                        if (notAllEmpty == false) {
                            if (grid[newIndex].startsWith("W") || grid[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                grid[pieceCurrentIndex] = "|||";
                                grid[newIndex] = pieceString;

                                this.currentTurn = false;
                                enemyPlayer.currentTurn = true;
                            }
                        }
                    }

                    // Moving down and capturing
                    else if (newIndex - pieceCurrentIndex == 8 || newIndex - pieceCurrentIndex == 16
                        || newIndex - pieceCurrentIndex == 24 || newIndex - pieceCurrentIndex == 32 
                        || newIndex - pieceCurrentIndex == 40 || newIndex - pieceCurrentIndex == 48 
                        || newIndex - pieceCurrentIndex == 56) {
                            
                        let notAllEmpty = false;

                        for (let i = pieceCurrentIndex + 8; i < newIndex; i += 8) {
                            if ((grid[i] != "|||") && (newIndex - pieceCurrentIndex != 8)) {
                                notAllEmpty = true;
                            }
                        }

                        if (notAllEmpty == false) {
                            if (grid[newIndex].startsWith("W") || grid[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                grid[pieceCurrentIndex] = "|||";
                                grid[newIndex] = pieceString;

                                this.currentTurn = false;
                                enemyPlayer.currentTurn = true;
                            }
                        }
                    }

                    // Moving right and capturing
                    else if (newIndex - pieceCurrentIndex == 1 || newIndex - pieceCurrentIndex == 2
                        || newIndex - pieceCurrentIndex == 3 || newIndex - pieceCurrentIndex == 4 
                        || newIndex - pieceCurrentIndex == 5 || newIndex - pieceCurrentIndex == 6 
                        || newIndex - pieceCurrentIndex == 7) {

                        if (((newIndex >= 0 && newIndex < 8) && (pieceCurrentIndex >= 0 && pieceCurrentIndex < 8))
                        || ((newIndex >= 8 && newIndex < 16) && (pieceCurrentIndex >= 8 && pieceCurrentIndex < 16))
                        || ((newIndex >= 16 && newIndex < 24) && (pieceCurrentIndex >= 16 && pieceCurrentIndex < 24))
                        || ((newIndex >= 24 && newIndex < 32) && (pieceCurrentIndex >= 24 && pieceCurrentIndex < 32))
                        || ((newIndex >= 32 && newIndex < 40) && (pieceCurrentIndex >= 32 && pieceCurrentIndex < 40))
                        || ((newIndex >= 40 && newIndex < 48) && (pieceCurrentIndex >= 40 && pieceCurrentIndex < 48))
                        || ((newIndex >= 48 && newIndex < 56) && (pieceCurrentIndex >= 48 && pieceCurrentIndex < 56))
                        || ((newIndex >= 56 && newIndex < 64) && (pieceCurrentIndex >= 56 && pieceCurrentIndex < 64))) {
                            
                            let notAllEmpty = false;

                            for (let i = pieceCurrentIndex + 1; i < newIndex; i += 1) {
                                if ((grid[i] != "|||") && (newIndex - pieceCurrentIndex != 1)) {
                                    notAllEmpty = true;
                                }
                            }

                            if (notAllEmpty == false) {
                                if (grid[newIndex].startsWith("W") || grid[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                                }

                                else {
                                    grid[pieceCurrentIndex] = "|||";
                                    grid[newIndex] = pieceString;

                                    this.currentTurn = false;
                                    enemyPlayer.currentTurn = true;
                                }
                            }
                        }
                    }

                    // Moving left and capturing
                    else if (pieceCurrentIndex - newIndex == 1 || pieceCurrentIndex - newIndex == 2
                        || pieceCurrentIndex - newIndex == 3 || pieceCurrentIndex - newIndex == 4 
                        || pieceCurrentIndex - newIndex == 5 || pieceCurrentIndex - newIndex == 6 
                        || pieceCurrentIndex - newIndex == 7) {
                        
                        if (((newIndex >= 0 && newIndex < 8) && (pieceCurrentIndex >= 0 && pieceCurrentIndex < 8))
                        || ((newIndex >= 8 && newIndex < 16) && (pieceCurrentIndex >= 8 && pieceCurrentIndex < 16))
                        || ((newIndex >= 16 && newIndex < 24) && (pieceCurrentIndex >= 16 && pieceCurrentIndex < 24))
                        || ((newIndex >= 24 && newIndex < 32) && (pieceCurrentIndex >= 24 && pieceCurrentIndex < 32))
                        || ((newIndex >= 32 && newIndex < 40) && (pieceCurrentIndex >= 32 && pieceCurrentIndex < 40))
                        || ((newIndex >= 40 && newIndex < 48) && (pieceCurrentIndex >= 40 && pieceCurrentIndex < 48))
                        || ((newIndex >= 48 && newIndex < 56) && (pieceCurrentIndex >= 48 && pieceCurrentIndex < 56))
                        || ((newIndex >= 56 && newIndex < 64) && (pieceCurrentIndex >= 56 && pieceCurrentIndex < 64))) {
                            
                            let notAllEmpty = false;

                            for (let i = pieceCurrentIndex - 1; i > newIndex; i -= 1) {
                                if ((grid[i] != "|||") && pieceCurrentIndex - newIndex != 1) {
                                    notAllEmpty = true;
                                }
                            }

                            if (notAllEmpty == false) {
                                if (grid[newIndex].startsWith("W") || grid[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                                }

                                else {
                                    grid[pieceCurrentIndex] = "|||";
                                    grid[newIndex] = pieceString;

                                    this.currentTurn = false;
                                    enemyPlayer.currentTurn = true;
                                }
                            }
                        }
                    }

                    // Check if enemy king is in check upwards
                    for (let i = newIndex - 8; i >= 0; i -= 8) {
                        if (grid[i].startsWith("BK") == false && grid[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (grid[i].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }

                    // Check if enemy king is in check downwards
                    for (let i = newIndex + 8; i <= 63; i += 8) {
                        if (grid[i].startsWith("BK") == false && grid[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (grid[i].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }

                    // Check if enemy king is in check right
                    if (newIndex >= 0 && newIndex < 8) {
                        for (let i = newIndex + 1; i < 8; i++) {
                            if (grid[i].startsWith("BK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("BK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 8 && newIndex < 16) {
                        for (let i = newIndex + 1; i < 16; i++) {
                            if (grid[i].startsWith("BK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("BK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 16 && newIndex < 24) {
                        for (let i = newIndex + 1; i < 24; i++) {
                            if (grid[i].startsWith("BK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("BK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 24 && newIndex < 32) {
                        for (let i = newIndex + 1; i < 32; i++) {
                            if (grid[i].startsWith("BK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("BK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 32 && newIndex < 40) {
                        for (let i = newIndex + 1; i < 40; i++) {
                            if (grid[i].startsWith("BK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("BK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 40 && newIndex < 48) {
                        for (let i = newIndex + 1; i < 48; i++) {
                            if (grid[i].startsWith("BK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("BK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 48 && newIndex < 56) {
                        for (let i = newIndex + 1; i < 56; i++) {
                            if (grid[i].startsWith("BK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("BK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 56 && newIndex < 64) {
                        for (let i = newIndex + 1; i < 64; i++) {
                            if (grid[i].startsWith("BK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("BK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    // Check if enemy king is in check left
                    if (newIndex >= 0 && newIndex < 8) {
                        for (let i = newIndex - 1; i >= 0; i--) {
                            if (grid[i].startsWith("BK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("BK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 8 && newIndex < 16) {
                        for (let i = newIndex - 1; i >= 8; i--) {
                            if (grid[i].startsWith("BK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("BK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 16 && newIndex < 24) {
                        for (let i = newIndex - 1; i >= 16; i--) {
                            if (grid[i].startsWith("BK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("BK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 24 && newIndex < 32) {
                        for (let i = newIndex - 1; i >= 24; i--) {
                            if (grid[i].startsWith("BK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("BK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 32 && newIndex < 40) {
                        for (let i = newIndex - 1; i >= 32; i--) {
                            if (grid[i].startsWith("BK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("BK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 40 && newIndex < 48) {
                        for (let i = newIndex - 1; i >= 40; i--) {
                            if (grid[i].startsWith("BK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("BK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 48 && newIndex < 56) {
                        for (let i = newIndex - 1; i >= 48; i--) {
                            if (grid[i].startsWith("BK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("BK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 56 && newIndex < 64) {
                        for (let i = newIndex - 1; i >= 56; i--) {
                            if (grid[i].startsWith("BK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("BK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }
                }

                else if (piece.color == "B") {

                    // Moving up and capturing
                    if (pieceCurrentIndex - newIndex == 8 || pieceCurrentIndex - newIndex == 16
                        || pieceCurrentIndex - newIndex == 24 || pieceCurrentIndex - newIndex == 32 
                        || pieceCurrentIndex - newIndex == 40 || pieceCurrentIndex - newIndex == 48 
                        || pieceCurrentIndex - newIndex == 56) {

                        let notAllEmpty = false;

                        for (let i = pieceCurrentIndex - 8; i > newIndex; i -= 8) {
                            if ((grid[i] != "|||") && pieceCurrentIndex - newIndex != 8) {
                                notAllEmpty = true;
                            }
                        }

                        if (notAllEmpty == false) {
                            if (grid[newIndex].startsWith("B") || grid[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                grid[pieceCurrentIndex] = "|||";
                                grid[newIndex] = pieceString;

                                this.currentTurn = false;
                                enemyPlayer.currentTurn = true;
                            }
                        }
                    }

                    // Moving down and capturing
                    else if (newIndex - pieceCurrentIndex == 8 || newIndex - pieceCurrentIndex == 16
                        || newIndex - pieceCurrentIndex == 24 || newIndex - pieceCurrentIndex == 32 
                        || newIndex - pieceCurrentIndex == 40 || newIndex - pieceCurrentIndex == 48 
                        || newIndex - pieceCurrentIndex == 56) {
                        
                        let notAllEmpty = false;

                        for (let i = pieceCurrentIndex + 8; i < newIndex; i += 8) {
                            if ((grid[i] != "|||") && newIndex - pieceCurrentIndex != 8) {
                                notAllEmpty = true;
                            }
                        }

                        if (notAllEmpty == false) {
                            if (grid[newIndex].startsWith("B") || grid[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                grid[pieceCurrentIndex] = "|||";
                                grid[newIndex] = pieceString;

                                this.currentTurn = false;
                                enemyPlayer.currentTurn = true; 
                            }
                        }
                    }

                    // Moving right and capturing
                    else if (newIndex - pieceCurrentIndex == 1 || newIndex - pieceCurrentIndex == 2
                        || newIndex - pieceCurrentIndex == 3 || newIndex - pieceCurrentIndex == 4 
                        || newIndex - pieceCurrentIndex == 5 || newIndex - pieceCurrentIndex == 6 
                        || newIndex - pieceCurrentIndex == 7) {

                        if (((newIndex >= 0 && newIndex < 8) && (pieceCurrentIndex >= 0 && pieceCurrentIndex < 8))
                        || ((newIndex >= 8 && newIndex < 16) && (pieceCurrentIndex >= 8 && pieceCurrentIndex < 16))
                        || ((newIndex >= 16 && newIndex < 24) && (pieceCurrentIndex >= 16 && pieceCurrentIndex < 24))
                        || ((newIndex >= 24 && newIndex < 32) && (pieceCurrentIndex >= 24 && pieceCurrentIndex < 32))
                        || ((newIndex >= 32 && newIndex < 40) && (pieceCurrentIndex >= 32 && pieceCurrentIndex < 40))
                        || ((newIndex >= 40 && newIndex < 48) && (pieceCurrentIndex >= 40 && pieceCurrentIndex < 48))
                        || ((newIndex >= 48 && newIndex < 56) && (pieceCurrentIndex >= 48 && pieceCurrentIndex < 56))
                        || ((newIndex >= 56 && newIndex < 64) && (pieceCurrentIndex >= 56 && pieceCurrentIndex < 64))) {
                            
                            let notAllEmpty = false;

                            for (let i = pieceCurrentIndex + 1; i < newIndex; i += 1) {
                                if ((grid[i] != "|||") && newIndex - pieceCurrentIndex != 1) {
                                    notAllEmpty = true;
                                }
                            }

                            if (notAllEmpty == false) {
                                if (grid[newIndex].startsWith("B") || grid[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                                }

                                else {
                                    grid[pieceCurrentIndex] = "|||";
                                    grid[newIndex] = pieceString;

                                    this.currentTurn = false;
                                    enemyPlayer.currentTurn = true;
                                }
                            }
                        }
                    }

                    // Moving left and capturing
                    else if (pieceCurrentIndex - newIndex == 1 || pieceCurrentIndex - newIndex == 2
                        || pieceCurrentIndex - newIndex == 3 || pieceCurrentIndex - newIndex == 4 
                        || pieceCurrentIndex - newIndex == 5 || pieceCurrentIndex - newIndex == 6 
                        || pieceCurrentIndex - newIndex == 7) {
                        
                        if (((newIndex >= 0 && newIndex < 8) && (pieceCurrentIndex >= 0 && pieceCurrentIndex < 8))
                        || ((newIndex >= 8 && newIndex < 16) && (pieceCurrentIndex >= 8 && pieceCurrentIndex < 16))
                        || ((newIndex >= 16 && newIndex < 24) && (pieceCurrentIndex >= 16 && pieceCurrentIndex < 24))
                        || ((newIndex >= 24 && newIndex < 32) && (pieceCurrentIndex >= 24 && pieceCurrentIndex < 32))
                        || ((newIndex >= 32 && newIndex < 40) && (pieceCurrentIndex >= 32 && pieceCurrentIndex < 40))
                        || ((newIndex >= 40 && newIndex < 48) && (pieceCurrentIndex >= 40 && pieceCurrentIndex < 48))
                        || ((newIndex >= 48 && newIndex < 56) && (pieceCurrentIndex >= 48 && pieceCurrentIndex < 56))
                        || ((newIndex >= 56 && newIndex < 64) && (pieceCurrentIndex >= 56 && pieceCurrentIndex < 64))) {
                            
                            let notAllEmpty = false;

                            for (let i = pieceCurrentIndex - 1; i > newIndex; i -= 1) {
                                if ((grid[i] != "|||") && pieceCurrentIndex - newIndex != 1) {
                                    notAllEmpty = true;
                                }
                            }

                            if (notAllEmpty == false) {
                                if (grid[newIndex].startsWith("B") || grid[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                                }

                                else {
                                    grid[pieceCurrentIndex] = "|||";
                                    grid[newIndex] = pieceString;

                                    this.currentTurn = false;
                                    enemyPlayer.currentTurn = true;
                                }
                            }
                        }
                    }

                    // Check if enemy king is in check upwards
                    for (let i = newIndex - 8; i >= 0; i -= 8) {
                        if (grid[i].startsWith("WK") == false && grid[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (grid[i].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }

                    // Check if enemy king is in check downwards
                    for (let i = newIndex + 8; i <= 63; i += 8) {
                        if (grid[i].startsWith("WK") == false && grid[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (grid[i].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }

                    // Check if enemy king is in check right
                    if (newIndex >= 0 && newIndex < 8) {
                        for (let i = newIndex + 1; i < 8; i++) {
                            if (grid[i].startsWith("WK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("WK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 8 && newIndex < 16) {
                        for (let i = newIndex + 1; i < 16; i++) {
                            if (grid[i].startsWith("WK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("WK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 16 && newIndex < 24) {
                        for (let i = newIndex + 1; i < 24; i++) {
                            if (grid[i].startsWith("WK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("WK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 24 && newIndex < 32) {
                        for (let i = newIndex + 1; i < 32; i++) {
                            if (grid[i].startsWith("WK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("WK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 32 && newIndex < 40) {
                        for (let i = newIndex + 1; i < 40; i++) {
                            if (grid[i].startsWith("WK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("WK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 40 && newIndex < 48) {
                        for (let i = newIndex + 1; i < 48; i++) {
                            if (grid[i].startsWith("WK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("WK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 48 && newIndex < 56) {
                        for (let i = newIndex + 1; i < 56; i++) {
                            if (grid[i].startsWith("WK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("WK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 56 && newIndex < 64) {
                        for (let i = newIndex + 1; i < 64; i++) {
                            if (grid[i].startsWith("WK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("WK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    // Check if enemy king is in check left
                    if (newIndex >= 0 && newIndex < 8) {
                        for (let i = newIndex - 1; i >= 0; i--) {
                            if (grid[i].startsWith("WK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("WK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 8 && newIndex < 16) {
                        for (let i = newIndex - 1; i >= 8; i--) {
                            if (grid[i].startsWith("WK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("WK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 16 && newIndex < 24) {
                        for (let i = newIndex - 1; i >= 16; i--) {
                            if (grid[i].startsWith("WK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("WK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 24 && newIndex < 32) {
                        for (let i = newIndex - 1; i >= 24; i--) {
                            if (grid[i].startsWith("WK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("WK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 32 && newIndex < 40) {
                        for (let i = newIndex - 1; i >= 32; i--) {
                            if (grid[i].startsWith("WK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("WK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 40 && newIndex < 48) {
                        for (let i = newIndex - 1; i >= 40; i--) {
                            if (grid[i].startsWith("WK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("WK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 48 && newIndex < 56) {
                        for (let i = newIndex - 1; i >= 48; i--) {
                            if (grid[i].startsWith("WK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("WK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 56 && newIndex < 64) {
                        for (let i = newIndex - 1; i >= 56; i--) {
                            if (grid[i].startsWith("WK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("WK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }
                }
            }

            else if (piece.name == "B") {

                if (piece.color == "W") {

                    // Moving up and to the right
                    if (pieceCurrentIndex - newIndex == 7 || pieceCurrentIndex - newIndex == 14
                        || pieceCurrentIndex - newIndex == 21 || pieceCurrentIndex - newIndex == 28 
                        || pieceCurrentIndex - newIndex == 35 || pieceCurrentIndex - newIndex == 42 
                        || pieceCurrentIndex - newIndex == 49) {

                        let notAllEmpty = false;
                        let hitEdge = false;

                        for (let i = pieceCurrentIndex - 7; i > newIndex; i -= 7) {
                            if ((grid[i] != "|||") && pieceCurrentIndex - newIndex != 7) {
                                notAllEmpty = true;
                            }

                            if ((i == 7 && newIndex < i) || (i == 15 && newIndex < i) 
                                || (i == 23 && newIndex < i) || (i == 31 && newIndex < i) 
                                || (i == 39 && newIndex < i) || (i == 47 && newIndex < i) 
                                || (i == 55 && newIndex < i)) {

                                hitEdge = true;
                                break;
                            }
                        }

                        if (notAllEmpty == false && hitEdge == false) {
                            if (grid[newIndex].startsWith("W") || grid[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                grid[pieceCurrentIndex] = "|||";
                                grid[newIndex] = pieceString;

                                this.currentTurn = false;
                                enemyPlayer.currentTurn = true;
                            }
                        }      
                    }

                    // Moving up and to the left
                    else if (pieceCurrentIndex - newIndex == 9 || pieceCurrentIndex - newIndex == 18
                        || pieceCurrentIndex - newIndex == 27 || pieceCurrentIndex - newIndex == 36 
                        || pieceCurrentIndex - newIndex == 45 || pieceCurrentIndex - newIndex == 54 
                        || pieceCurrentIndex - newIndex == 63) {
                        
                        let notAllEmpty = false;
                        let hitEdge = false;

                        for (let i = pieceCurrentIndex - 9; i > newIndex; i -= 9) {
                            if ((grid[i] != "|||") && pieceCurrentIndex - newIndex != 9) {
                                notAllEmpty = true;
                            }

                            if ((i == 8 && newIndex < i) || (i == 16 && newIndex < i) 
                                || (i == 24 && newIndex < i) || (i == 32 && newIndex < i) 
                                || (i == 40 && newIndex < i) || (i == 48 && newIndex < i) ) {

                                hitEdge = true;
                                break;
                            }
                        }

                        if (notAllEmpty == false && hitEdge == false) {
                            if (grid[newIndex].startsWith("W") || grid[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                grid[pieceCurrentIndex] = "|||";
                                grid[newIndex] = pieceString;
                                
                                this.currentTurn = false;
                                enemyPlayer.currentTurn = true;
                            }
                        }     
                    }

                    // Moving down and to the right
                    else if (newIndex - pieceCurrentIndex == 9 || newIndex - pieceCurrentIndex == 18
                        || newIndex - pieceCurrentIndex == 27 || newIndex - pieceCurrentIndex == 36 
                        || newIndex - pieceCurrentIndex == 45 || newIndex - pieceCurrentIndex == 54 
                        || newIndex - pieceCurrentIndex == 63) {
                        
                        let notAllEmpty = false;
                        let hitEdge = false;

                        for (let i = pieceCurrentIndex + 9; i < newIndex; i += 9) {
                            if ((grid[i] != "|||") && newIndex - pieceCurrentIndex != 9) {
                                notAllEmpty = true;
                            }

                            if ((i == 15 && newIndex > i) || (i == 23 && newIndex > i) 
                                || (i == 31 && newIndex > i) || (i == 39 && newIndex > i) 
                                || (i == 47 && newIndex > i) || (i == 55 && newIndex > i)) {

                                hitEdge = true;
                                break;
                            }
                        }

                        if (notAllEmpty == false && hitEdge == false) {
                            if (grid[newIndex].startsWith("W") || grid[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                grid[pieceCurrentIndex] = "|||";
                                grid[newIndex] = pieceString;

                                this.currentTurn = false;
                                enemyPlayer.currentTurn = true;
                            }
                        }     
                    }

                    // Moving down and to the left
                    else if (newIndex - pieceCurrentIndex == 7 || newIndex - pieceCurrentIndex == 14
                        || newIndex - pieceCurrentIndex == 21 || newIndex - pieceCurrentIndex == 28 
                        || newIndex - pieceCurrentIndex == 35 || newIndex - pieceCurrentIndex == 42 
                        || newIndex - pieceCurrentIndex == 49) {
                        
                        let notAllEmpty = false;
                        let hitEdge = false;

                        for (let i = pieceCurrentIndex + 7; i < newIndex; i += 7) {
                            if ((grid[i] != "|||") && newIndex - pieceCurrentIndex != 7) {
                                notAllEmpty = true;
                            }

                            if ((i == 8 && newIndex > i) || (i == 16 && newIndex > i) 
                                || (i == 24 && newIndex > i) || (i == 32 && newIndex > i) 
                                || (i == 40 && newIndex > i) || (i == 48 && newIndex > i) ) {

                                hitEdge = true;
                                break;
                            }
                        }

                        if (notAllEmpty == false && hitEdge == false) {
                            if (grid[newIndex].startsWith("W") || grid[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                grid[pieceCurrentIndex] = "|||";
                                grid[newIndex] = pieceString;

                                this.currentTurn = false;
                                enemyPlayer.currentTurn = true;
                            }
                        }   
                    }

                    // Check if enemy king is in check up and to the right
                    for (let i = newIndex - 7; i >= 0; i -= 7) {
                        if (grid[i].startsWith("BK") == false && grid[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (grid[i].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }

                        if (i == 7 || i == 15 || i == 23 || i == 31 || i == 39 || i == 47 || i == 55) {
                            break;
                        }
                    }

                    // Check if enemy king is in check up and to the left
                    for (let i = newIndex - 9; i >= 0; i -= 9) {
                        if (grid[i].startsWith("BK") == false && grid[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (grid[i].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }

                        if (i == 0 || i == 8 || i == 16 || i == 24 || i == 32 || i == 40 || i == 48) {
                            break;
                        }
                    }

                    // Check if enemy king is in check down and to the right
                    for (let i = newIndex + 9; i <= 63; i += 9) {
                        if (grid[i].startsWith("BK") == false && grid[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (grid[i].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }

                        if (i == 15 || i == 23 || i == 31 || i == 39 || i == 47 || i == 55 || i == 63) {
                            break;
                        }
                    }

                    // Check if enemy king is in check down and to the left
                    for (let i = newIndex + 7; i <= 63; i += 7) {
                        if (grid[i].startsWith("BK") == false && grid[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (grid[i].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }

                        if (i == 8 || i == 16 || i == 24 || i == 32 || i == 40 || i == 48 || i == 56) {
                            break;
                        }
                    }
                }

                else if (piece.color == "B") {

                    // Moving up and to the right
                    if (pieceCurrentIndex - newIndex == 7 || pieceCurrentIndex - newIndex == 14
                        || pieceCurrentIndex - newIndex == 21 || pieceCurrentIndex - newIndex == 28 
                        || pieceCurrentIndex - newIndex == 35 || pieceCurrentIndex - newIndex == 42 
                        || pieceCurrentIndex - newIndex == 49) {
                        
                        let notAllEmpty = false;
                        let hitEdge = false;

                        for (let i = pieceCurrentIndex - 7; i > newIndex; i -= 7) {
                            if ((grid[i] != "|||") && pieceCurrentIndex - newIndex != 7) {
                                notAllEmpty = true;
                            }

                            if ((i == 7 && newIndex < i) || (i == 15 && newIndex < i) 
                                || (i == 23 && newIndex < i) || (i == 31 && newIndex < i) 
                                || (i == 39 && newIndex < i) || (i == 47 && newIndex < i) 
                                || (i == 55 && newIndex < i)) {

                                hitEdge = true;
                                break;
                            }
                        }

                        if (notAllEmpty == false && hitEdge == false) {
                            if (grid[newIndex].startsWith("B") || grid[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                grid[pieceCurrentIndex] = "|||";
                                grid[newIndex] = pieceString;

                                this.currentTurn = false;
                                enemyPlayer.currentTurn = true;
                            }
                        }   
                    }

                    // Moving up and to the left
                    else if (pieceCurrentIndex - newIndex == 9 || pieceCurrentIndex - newIndex == 18
                        || pieceCurrentIndex - newIndex == 27 || pieceCurrentIndex - newIndex == 36 
                        || pieceCurrentIndex - newIndex == 45 || pieceCurrentIndex - newIndex == 54 
                        || pieceCurrentIndex - newIndex == 63) {
                        
                        let notAllEmpty = false;
                        let hitEdge = false;

                        for (let i = pieceCurrentIndex - 9; i > newIndex; i -= 9) {
                            if ((grid[i] != "|||") && pieceCurrentIndex - newIndex != 9) {
                                notAllEmpty = true;
                            }

                            if ((i == 8 && newIndex < i) || (i == 16 && newIndex < i) 
                                || (i == 24 && newIndex < i) || (i == 32 && newIndex < i) 
                                || (i == 40 && newIndex < i) || (i == 48 && newIndex < i) ) {

                                hitEdge = true;
                                break;
                            }
                        }

                        if (notAllEmpty == false && hitEdge == false) {
                            if (grid[newIndex].startsWith("B") || grid[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                grid[pieceCurrentIndex] = "|||";
                                grid[newIndex] = pieceString;
                                
                                this.currentTurn = false;
                                enemyPlayer.currentTurn = true;
                            }
                        }    
                    }

                    // Moving down and to the right
                    else if (newIndex - pieceCurrentIndex == 9 || newIndex - pieceCurrentIndex == 18
                        || newIndex - pieceCurrentIndex == 27 || newIndex - pieceCurrentIndex == 36 
                        || newIndex - pieceCurrentIndex == 45 || newIndex - pieceCurrentIndex == 54 
                        || newIndex - pieceCurrentIndex == 63) {
                        
                        let notAllEmpty = false;
                        let hitEdge = false;

                        for (let i = pieceCurrentIndex + 9; i < newIndex; i += 9) {
                            if ((grid[i] != "|||") && newIndex - pieceCurrentIndex != 9) {
                                notAllEmpty = true;
                            }

                            if ((i == 15 && newIndex > i) || (i == 23 && newIndex > i) 
                                || (i == 31 && newIndex > i) || (i == 39 && newIndex > i) 
                                || (i == 47 && newIndex > i) || (i == 55 && newIndex > i)) {

                                hitEdge = true;
                                break;
                            }
                        }

                        if (notAllEmpty == false && hitEdge == false) {
                            if (grid[newIndex].startsWith("B") || grid[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                grid[pieceCurrentIndex] = "|||";
                                grid[newIndex] = pieceString;

                                this.currentTurn = false;
                                enemyPlayer.currentTurn = true;
                            }
                        }   
                    }

                    // Moving down and to the left
                    else if (newIndex - pieceCurrentIndex == 7 || newIndex - pieceCurrentIndex == 14
                        || newIndex - pieceCurrentIndex == 21 || newIndex - pieceCurrentIndex == 28 
                        || newIndex - pieceCurrentIndex == 35 || newIndex - pieceCurrentIndex == 42 
                        || newIndex - pieceCurrentIndex == 49) {
                        
                        let notAllEmpty = false;
                        let hitEdge = false;

                        for (let i = pieceCurrentIndex + 7; i < newIndex; i += 7) {
                            if ((grid[i] != "|||") && newIndex - pieceCurrentIndex != 7) {
                                notAllEmpty = true;
                            }

                            if ((i == 8 && newIndex > i) || (i == 16 && newIndex > i) 
                                || (i == 24 && newIndex > i) || (i == 32 && newIndex > i) 
                                || (i == 40 && newIndex > i) || (i == 48 && newIndex > i) ) {

                                hitEdge = true;
                                break;
                            }
                        }

                        if (notAllEmpty == false && hitEdge == false) {
                            if (grid[newIndex].startsWith("B") || grid[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                grid[pieceCurrentIndex] = "|||";
                                grid[newIndex] = pieceString;

                                this.currentTurn = false;
                                enemyPlayer.currentTurn = true;
                            }
                        }  
                    }

                    // Check if enemy king is in check up and to the right
                    for (let i = newIndex - 7; i >= 0; i -= 7) {
                        if (grid[i].startsWith("WK") == false && grid[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (grid[i].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }

                        if (i == 7 || i == 15 || i == 23 || i == 31 || i == 39 || i == 47 || i == 55) {
                            break;
                        }
                    }

                    // Check if enemy king is in check up and to the left
                    for (let i = newIndex - 9; i >= 0; i -= 9) {
                        if (grid[i].startsWith("WK") == false && grid[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (grid[i].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }

                        if (i == 0 || i == 8 || i == 16 || i == 24 || i == 32 || i == 40 || i == 48) {
                            break;
                        }
                    }

                    // Check if enemy king is in check down and to the right
                    for (let i = newIndex + 9; i <= 63; i += 9) {
                        if (grid[i].startsWith("WK") == false && grid[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (grid[i].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }

                        if (i == 15 || i == 23 || i == 31 || i == 39 || i == 47 || i == 55 || i == 63) {
                            break;
                        }
                    }

                    // Check if enemy king is in check down and to the left
                    for (let i = newIndex + 7; i <= 63; i += 7) {
                        if (grid[i].startsWith("WK") == false && grid[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (grid[i].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }

                        if (i == 8 || i == 16 || i == 24 || i == 32 || i == 40 || i == 48 || i == 56) {
                            break;
                        }
                    }
                }
            }

            else if (piece.name == "N") {

                if (piece.color == "W") {

                    // Moving 2 squares up and 1 square right
                    if (pieceCurrentIndex - newIndex == 15) {
                        if (grid[newIndex].startsWith("W") || grid[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            grid[pieceCurrentIndex] = "|||";
                            grid[newIndex] = pieceString;

                            this.currentTurn = false;
                            enemyPlayer.currentTurn = true;
                        }
                    }

                    // Moving 1 square up and 2 squares right
                    else if (pieceCurrentIndex - newIndex == 6) {
                        if (grid[newIndex].startsWith("W") || grid[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            grid[pieceCurrentIndex] = "|||";
                            grid[newIndex] = pieceString;

                            this.currentTurn = false;
                            enemyPlayer.currentTurn = true;
                        }
                    }

                    // Moving 2 squares up and 1 square left
                    else if (pieceCurrentIndex - newIndex == 17) {
                        if (grid[newIndex].startsWith("W") || grid[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            grid[pieceCurrentIndex] = "|||";
                            grid[newIndex] = pieceString;

                            this.currentTurn = false;
                            enemyPlayer.currentTurn = true;
                        }
                    }

                    // Moving 1 square up and 2 squares left
                    else if (pieceCurrentIndex - newIndex == 10) {
                        if (grid[newIndex].startsWith("W") || grid[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            grid[pieceCurrentIndex] = "|||";
                            grid[newIndex] = pieceString;

                            this.currentTurn = false;
                            enemyPlayer.currentTurn = true;
                        }
                    }

                    // Moving 2 squares down and 1 square right
                    else if (newIndex - pieceCurrentIndex == 17) {
                        if (grid[newIndex].startsWith("W") || grid[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            grid[pieceCurrentIndex] = "|||";
                            grid[newIndex] = pieceString;

                            this.currentTurn = false;
                            enemyPlayer.currentTurn = true;
                        }
                    }

                    // Moving 1 square down and 2 squares right
                    else if (newIndex - pieceCurrentIndex == 10) {
                        if (grid[newIndex].startsWith("W") || grid[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            grid[pieceCurrentIndex] = "|||";
                            grid[newIndex] = pieceString;

                            this.currentTurn = false;
                            enemyPlayer.currentTurn = true;
                        }
                    }

                    // Moving 2 squares down and 1 square left
                    else if (newIndex - pieceCurrentIndex == 15) {
                        if (grid[newIndex].startsWith("W") || grid[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            grid[pieceCurrentIndex] = "|||";
                            grid[newIndex] = pieceString;

                            this.currentTurn = false;
                            enemyPlayer.currentTurn = true;
                        }
                    }

                    // Moving 1 square down and 2 squares left
                    else if (newIndex - pieceCurrentIndex == 6) {
                        if (grid[newIndex].startsWith("W") || grid[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            grid[pieceCurrentIndex] = "|||";
                            grid[newIndex] = pieceString;

                            this.currentTurn = false;
                            enemyPlayer.currentTurn = true;
                        }
                    }

                    // Check if enemy king is in check
                    if (grid[newIndex - 15] != undefined) {
                        if (grid[newIndex - 15].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                        }
                    }

                    else if (grid[newIndex - 6] != undefined) {
                        if (grid[newIndex - 6].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                        }
                    }

                    else if (grid[newIndex - 17] != undefined) {
                        if (grid[newIndex - 17].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                        }
                    }

                    else if (grid[newIndex - 10] != undefined) {
                        if (grid[newIndex - 10].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                        }
                    }

                    else if (grid[newIndex + 17] != undefined) {
                        if (grid[newIndex + 17].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                        }
                    }

                    else if (grid[newIndex + 10] != undefined) {
                        if (grid[newIndex + 10].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                        }
                    }

                    else if (grid[newIndex + 6] != undefined) {
                        if (grid[newIndex + 6].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                        }
                    }

                    else if (grid[newIndex + 15] != undefined) {
                        if (grid[newIndex + 15].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                        }
                    }
                }

                else if (piece.color == "B") {

                    // Moving 2 squares up and 1 square right
                    if (pieceCurrentIndex - newIndex == 15) {
                        if (grid[newIndex].startsWith("B") || grid[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            grid[pieceCurrentIndex] = "|||";
                            grid[newIndex] = pieceString;

                            this.currentTurn = false;
                            enemyPlayer.currentTurn = true;
                        }
                    }

                    // Moving 1 square up and 2 squares right
                    else if (pieceCurrentIndex - newIndex == 6) {
                        if (grid[newIndex].startsWith("B") || grid[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            grid[pieceCurrentIndex] = "|||";
                            grid[newIndex] = pieceString;

                            this.currentTurn = false;
                            enemyPlayer.currentTurn = true;
                        }
                    }

                    // Moving 2 squares up and 1 square left
                    else if (pieceCurrentIndex - newIndex == 17) {
                        if (grid[newIndex].startsWith("B") || grid[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            grid[pieceCurrentIndex] = "|||";
                            grid[newIndex] = pieceString;

                            this.currentTurn = false;
                            enemyPlayer.currentTurn = true;
                        }
                    }

                    // Moving 1 square up and 2 squares left
                    else if (pieceCurrentIndex - newIndex == 10) {
                        if (grid[newIndex].startsWith("B") || grid[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            grid[pieceCurrentIndex] = "|||";
                            grid[newIndex] = pieceString;

                            this.currentTurn = false;
                            enemyPlayer.currentTurn = true;
                        }
                    }

                    // Moving 2 squares down and 1 square right
                    else if (newIndex - pieceCurrentIndex == 17) {
                        if (grid[newIndex].startsWith("B") || grid[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            grid[pieceCurrentIndex] = "|||";
                            grid[newIndex] = pieceString;

                            this.currentTurn = false;
                            enemyPlayer.currentTurn = true;
                        }
                    }

                    // Moving 1 square down and 2 squares right
                    else if (newIndex - pieceCurrentIndex == 10) {
                        if (grid[newIndex].startsWith("B") || grid[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            grid[pieceCurrentIndex] = "|||";
                            grid[newIndex] = pieceString;

                            this.currentTurn = false;
                            enemyPlayer.currentTurn = true;
                        }
                    }

                    // Moving 2 squares down and 1 square left
                    else if (newIndex - pieceCurrentIndex == 15) {
                        if (grid[newIndex].startsWith("B") || grid[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            grid[pieceCurrentIndex] = "|||";
                            grid[newIndex] = pieceString;

                            this.currentTurn = false;
                            enemyPlayer.currentTurn = true;
                        }
                    }

                    // Moving 1 square down and 2 squares left
                    else if (newIndex - pieceCurrentIndex == 6) {
                        if (grid[newIndex].startsWith("B") || grid[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            grid[pieceCurrentIndex] = "|||";
                            grid[newIndex] = pieceString;

                            this.currentTurn = false;
                            enemyPlayer.currentTurn = true;
                        }
                    }

                    // Check if enemy king is in check
                    if (grid[newIndex - 15] != undefined) {
                        if (grid[newIndex - 15].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                        }
                    }

                    else if (grid[newIndex - 6] != undefined) {
                        if (grid[newIndex - 6].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                        }
                    }

                    else if (grid[newIndex - 17] != undefined) {
                        if (grid[newIndex - 17].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                        }
                    }

                    else if (grid[newIndex - 10] != undefined) {
                        if (grid[newIndex - 10].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                        }
                    }

                    else if (grid[newIndex + 17] != undefined) {
                        if (grid[newIndex + 17].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                        }
                    }

                    else if (grid[newIndex + 10] != undefined) {
                        if (grid[newIndex + 10].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                        }
                    }

                    else if (grid[newIndex + 6] != undefined) {
                        if (grid[newIndex + 6].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                        }
                    }

                    else if (grid[newIndex + 15] != undefined) {
                        if (grid[newIndex + 15].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                        }
                    }
                }
            }

            else if (piece.name == "Q") {
                
                if (piece.color == "W") {
                    
                    // Moving up and capturing
                    if (pieceCurrentIndex - newIndex == 8 || pieceCurrentIndex - newIndex == 16
                        || pieceCurrentIndex - newIndex == 24 || pieceCurrentIndex - newIndex == 32 
                        || pieceCurrentIndex - newIndex == 40 || pieceCurrentIndex - newIndex == 48 
                        || pieceCurrentIndex - newIndex == 56) {

                        let notAllEmpty = false;

                        for (let i = pieceCurrentIndex - 8; i > newIndex; i -= 8) {
                            if ((grid[i] != "|||") && pieceCurrentIndex - newIndex != 8) {
                                notAllEmpty = true;
                            }
                        }

                        if (notAllEmpty == false) {
                            if (grid[newIndex].startsWith("W") || grid[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                grid[pieceCurrentIndex] = "|||";
                                grid[newIndex] = pieceString;

                                this.currentTurn = false;
                                enemyPlayer.currentTurn = true;
                            }
                        }
                    }

                    // Moving down and capturing
                    else if (newIndex - pieceCurrentIndex == 8 || newIndex - pieceCurrentIndex == 16
                        || newIndex - pieceCurrentIndex == 24 || newIndex - pieceCurrentIndex == 32 
                        || newIndex - pieceCurrentIndex == 40 || newIndex - pieceCurrentIndex == 48 
                        || newIndex - pieceCurrentIndex == 56) {
                            
                        let notAllEmpty = false;

                        for (let i = pieceCurrentIndex + 8; i < newIndex; i += 8) {
                            if ((grid[i] != "|||") && (newIndex - pieceCurrentIndex != 8)) {
                                notAllEmpty = true;
                            }
                        }

                        if (notAllEmpty == false) {
                            if (grid[newIndex].startsWith("W") || grid[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                grid[pieceCurrentIndex] = "|||";
                                grid[newIndex] = pieceString;

                                this.currentTurn = false;
                                enemyPlayer.currentTurn = true;
                            }
                        }
                    }

                    // Moving right and capturing
                    else if (newIndex - pieceCurrentIndex == 1 || newIndex - pieceCurrentIndex == 2
                        || newIndex - pieceCurrentIndex == 3 || newIndex - pieceCurrentIndex == 4 
                        || newIndex - pieceCurrentIndex == 5 || newIndex - pieceCurrentIndex == 6 
                        || newIndex - pieceCurrentIndex == 7) {

                        if (((newIndex >= 0 && newIndex < 8) && (pieceCurrentIndex >= 0 && pieceCurrentIndex < 8))
                        || ((newIndex >= 8 && newIndex < 16) && (pieceCurrentIndex >= 8 && pieceCurrentIndex < 16))
                        || ((newIndex >= 16 && newIndex < 24) && (pieceCurrentIndex >= 16 && pieceCurrentIndex < 24))
                        || ((newIndex >= 24 && newIndex < 32) && (pieceCurrentIndex >= 24 && pieceCurrentIndex < 32))
                        || ((newIndex >= 32 && newIndex < 40) && (pieceCurrentIndex >= 32 && pieceCurrentIndex < 40))
                        || ((newIndex >= 40 && newIndex < 48) && (pieceCurrentIndex >= 40 && pieceCurrentIndex < 48))
                        || ((newIndex >= 48 && newIndex < 56) && (pieceCurrentIndex >= 48 && pieceCurrentIndex < 56))
                        || ((newIndex >= 56 && newIndex < 64) && (pieceCurrentIndex >= 56 && pieceCurrentIndex < 64))) {
                            
                            let notAllEmpty = false;

                            for (let i = pieceCurrentIndex + 1; i < newIndex; i += 1) {
                                if ((grid[i] != "|||") && (newIndex - pieceCurrentIndex != 1)) {
                                    notAllEmpty = true;
                                }
                            }

                            if (notAllEmpty == false) {
                                if (grid[newIndex].startsWith("W") || grid[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                                }

                                else {
                                    grid[pieceCurrentIndex] = "|||";
                                    grid[newIndex] = pieceString;

                                    this.currentTurn = false;
                                    enemyPlayer.currentTurn = true;
                                }
                            }
                        }
                    }

                    // Moving left and capturing
                    else if (pieceCurrentIndex - newIndex == 1 || pieceCurrentIndex - newIndex == 2
                        || pieceCurrentIndex - newIndex == 3 || pieceCurrentIndex - newIndex == 4 
                        || pieceCurrentIndex - newIndex == 5 || pieceCurrentIndex - newIndex == 6 
                        || pieceCurrentIndex - newIndex == 7) {
                        
                        if (((newIndex >= 0 && newIndex < 8) && (pieceCurrentIndex >= 0 && pieceCurrentIndex < 8))
                        || ((newIndex >= 8 && newIndex < 16) && (pieceCurrentIndex >= 8 && pieceCurrentIndex < 16))
                        || ((newIndex >= 16 && newIndex < 24) && (pieceCurrentIndex >= 16 && pieceCurrentIndex < 24))
                        || ((newIndex >= 24 && newIndex < 32) && (pieceCurrentIndex >= 24 && pieceCurrentIndex < 32))
                        || ((newIndex >= 32 && newIndex < 40) && (pieceCurrentIndex >= 32 && pieceCurrentIndex < 40))
                        || ((newIndex >= 40 && newIndex < 48) && (pieceCurrentIndex >= 40 && pieceCurrentIndex < 48))
                        || ((newIndex >= 48 && newIndex < 56) && (pieceCurrentIndex >= 48 && pieceCurrentIndex < 56))
                        || ((newIndex >= 56 && newIndex < 64) && (pieceCurrentIndex >= 56 && pieceCurrentIndex < 64))) {
                            
                            let notAllEmpty = false;

                            for (let i = pieceCurrentIndex - 1; i > newIndex; i -= 1) {
                                if ((grid[i] != "|||") && pieceCurrentIndex - newIndex != 1) {
                                    notAllEmpty = true;
                                }
                            }

                            if (notAllEmpty == false) {
                                if (grid[newIndex].startsWith("W") || grid[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                                }

                                else {
                                    grid[pieceCurrentIndex] = "|||";
                                    grid[newIndex] = pieceString;

                                    this.currentTurn = false;
                                    enemyPlayer.currentTurn = true;
                                }
                            }
                        }
                    }

                    // Moving up and to the right
                    if (pieceCurrentIndex - newIndex == 7 || pieceCurrentIndex - newIndex == 14
                        || pieceCurrentIndex - newIndex == 21 || pieceCurrentIndex - newIndex == 28 
                        || pieceCurrentIndex - newIndex == 35 || pieceCurrentIndex - newIndex == 42 
                        || pieceCurrentIndex - newIndex == 49) {

                        let notAllEmpty = false;
                        let hitEdge = false;

                        for (let i = pieceCurrentIndex - 7; i > newIndex; i -= 7) {
                            if ((grid[i] != "|||") && pieceCurrentIndex - newIndex != 7) {
                                notAllEmpty = true;
                            }

                            if ((i == 7 && newIndex < i) || (i == 15 && newIndex < i) 
                                || (i == 23 && newIndex < i) || (i == 31 && newIndex < i) 
                                || (i == 39 && newIndex < i) || (i == 47 && newIndex < i) 
                                || (i == 55 && newIndex < i)) {

                                hitEdge = true;
                                break;
                            }
                        }

                        if (notAllEmpty == false && hitEdge == false) {
                            if (grid[newIndex].startsWith("W") || grid[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                grid[pieceCurrentIndex] = "|||";
                                grid[newIndex] = pieceString;

                                this.currentTurn = false;
                                enemyPlayer.currentTurn = true;
                            }
                        }      
                    }

                    // Moving up and to the left
                    else if (pieceCurrentIndex - newIndex == 9 || pieceCurrentIndex - newIndex == 18
                        || pieceCurrentIndex - newIndex == 27 || pieceCurrentIndex - newIndex == 36 
                        || pieceCurrentIndex - newIndex == 45 || pieceCurrentIndex - newIndex == 54 
                        || pieceCurrentIndex - newIndex == 63) {
                        
                        let notAllEmpty = false;
                        let hitEdge = false;

                        for (let i = pieceCurrentIndex - 9; i > newIndex; i -= 9) {
                            if ((grid[i] != "|||") && pieceCurrentIndex - newIndex != 9) {
                                notAllEmpty = true;
                            }

                            if ((i == 8 && newIndex < i) || (i == 16 && newIndex < i) 
                                || (i == 24 && newIndex < i) || (i == 32 && newIndex < i) 
                                || (i == 40 && newIndex < i) || (i == 48 && newIndex < i) ) {

                                hitEdge = true;
                                break;
                            }
                        }

                        if (notAllEmpty == false && hitEdge == false) {
                            if (grid[newIndex].startsWith("W") || grid[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                grid[pieceCurrentIndex] = "|||";
                                grid[newIndex] = pieceString;

                                this.currentTurn = false;
                                enemyPlayer.currentTurn = true;
                            }
                        }     
                    }

                    // Moving down and to the right
                    else if (newIndex - pieceCurrentIndex == 9 || newIndex - pieceCurrentIndex == 18
                        || newIndex - pieceCurrentIndex == 27 || newIndex - pieceCurrentIndex == 36 
                        || newIndex - pieceCurrentIndex == 45 || newIndex - pieceCurrentIndex == 54 
                        || newIndex - pieceCurrentIndex == 63) {
                        
                        let notAllEmpty = false;
                        let hitEdge = false;

                        for (let i = pieceCurrentIndex + 9; i < newIndex; i += 9) {
                            if ((grid[i] != "|||") && newIndex - pieceCurrentIndex != 9) {
                                notAllEmpty = true;
                            }

                            if ((i == 15 && newIndex > i) || (i == 23 && newIndex > i) 
                                || (i == 31 && newIndex > i) || (i == 39 && newIndex > i) 
                                || (i == 47 && newIndex > i) || (i == 55 && newIndex > i)) {

                                hitEdge = true;
                                break;
                            }
                        }

                        if (notAllEmpty == false && hitEdge == false) {
                            if (grid[newIndex].startsWith("W") || grid[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                grid[pieceCurrentIndex] = "|||";
                                grid[newIndex] = pieceString;

                                this.currentTurn = false;
                                enemyPlayer.currentTurn = true;
                            }
                        }     
                    }

                    // Moving down and to the left
                    else if (newIndex - pieceCurrentIndex == 7 || newIndex - pieceCurrentIndex == 14
                        || newIndex - pieceCurrentIndex == 21 || newIndex - pieceCurrentIndex == 28 
                        || newIndex - pieceCurrentIndex == 35 || newIndex - pieceCurrentIndex == 42 
                        || newIndex - pieceCurrentIndex == 49) {
                        
                        let notAllEmpty = false;
                        let hitEdge = false;

                        for (let i = pieceCurrentIndex + 7; i < newIndex; i += 7) {
                            if ((grid[i] != "|||") && newIndex - pieceCurrentIndex != 7) {
                                notAllEmpty = true;
                            }

                            if ((i == 8 && newIndex > i) || (i == 16 && newIndex > i) 
                                || (i == 24 && newIndex > i) || (i == 32 && newIndex > i) 
                                || (i == 40 && newIndex > i) || (i == 48 && newIndex > i) ) {

                                hitEdge = true;
                                break;
                            }
                        }

                        if (notAllEmpty == false && hitEdge == false) {
                            if (grid[newIndex].startsWith("W") || grid[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                grid[pieceCurrentIndex] = "|||";
                                grid[newIndex] = pieceString;

                                this.currentTurn = false;
                                enemyPlayer.currentTurn = true;
                            }
                        }   
                    }

                    // Check if enemy king is in check upwards
                    for (let i = newIndex - 8; i >= 0; i -= 8) {
                        if (grid[i].startsWith("BK") == false && grid[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (grid[i].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }

                    // Check if enemy king is in check downwards
                    for (let i = newIndex + 8; i <= 63; i += 8) {
                        if (grid[i].startsWith("BK") == false && grid[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (grid[i].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }

                    // Check if enemy king is in check right
                    if (newIndex >= 0 && newIndex < 8) {
                        for (let i = newIndex + 1; i < 8; i++) {
                            if (grid[i].startsWith("BK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("BK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 8 && newIndex < 16) {
                        for (let i = newIndex + 1; i < 16; i++) {
                            if (grid[i].startsWith("BK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("BK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 16 && newIndex < 24) {
                        for (let i = newIndex + 1; i < 24; i++) {
                            if (grid[i].startsWith("BK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("BK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 24 && newIndex < 32) {
                        for (let i = newIndex + 1; i < 32; i++) {
                            if (grid[i].startsWith("BK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("BK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 32 && newIndex < 40) {
                        for (let i = newIndex + 1; i < 40; i++) {
                            if (grid[i].startsWith("BK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("BK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 40 && newIndex < 48) {
                        for (let i = newIndex + 1; i < 48; i++) {
                            if (grid[i].startsWith("BK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("BK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 48 && newIndex < 56) {
                        for (let i = newIndex + 1; i < 56; i++) {
                            if (grid[i].startsWith("BK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("BK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 56 && newIndex < 64) {
                        for (let i = newIndex + 1; i < 64; i++) {
                            if (grid[i].startsWith("BK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("BK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    // Check if enemy king is in check left
                    if (newIndex >= 0 && newIndex < 8) {
                        for (let i = newIndex - 1; i >= 0; i--) {
                            if (grid[i].startsWith("BK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("BK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 8 && newIndex < 16) {
                        for (let i = newIndex - 1; i >= 8; i--) {
                            if (grid[i].startsWith("BK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("BK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 16 && newIndex < 24) {
                        for (let i = newIndex - 1; i >= 16; i--) {
                            if (grid[i].startsWith("BK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("BK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 24 && newIndex < 32) {
                        for (let i = newIndex - 1; i >= 24; i--) {
                            if (grid[i].startsWith("BK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("BK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 32 && newIndex < 40) {
                        for (let i = newIndex - 1; i >= 32; i--) {
                            if (grid[i].startsWith("BK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("BK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 40 && newIndex < 48) {
                        for (let i = newIndex - 1; i >= 40; i--) {
                            if (grid[i].startsWith("BK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("BK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 48 && newIndex < 56) {
                        for (let i = newIndex - 1; i >= 48; i--) {
                            if (grid[i].startsWith("BK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("BK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 56 && newIndex < 64) {
                        for (let i = newIndex - 1; i >= 56; i--) {
                            if (grid[i].startsWith("BK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("BK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    // Check if enemy king is in check up and to the right
                    for (let i = newIndex - 7; i >= 0; i -= 7) {
                        if (grid[i].startsWith("BK") == false && grid[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (grid[i].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }

                        if (i == 7 || i == 15 || i == 23 || i == 31 || i == 39 || i == 47 || i == 55) {
                            break;
                        }
                    }

                    // Check if enemy king is in check up and to the left
                    for (let i = newIndex - 9; i >= 0; i -= 9) {
                        if (grid[i].startsWith("BK") == false && grid[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (grid[i].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }

                        if (i == 0 || i == 8 || i == 16 || i == 24 || i == 32 || i == 40 || i == 48) {
                            break;
                        }
                    }

                    // Check if enemy king is in check down and to the right
                    for (let i = newIndex + 9; i <= 63; i += 9) {
                        if (grid[i].startsWith("BK") == false && grid[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (grid[i].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }

                        if (i == 15 || i == 23 || i == 31 || i == 39 || i == 47 || i == 55 || i == 63) {
                            break;
                        }
                    }

                    // Check if enemy king is in check down and to the left
                    for (let i = newIndex + 7; i <= 63; i += 7) {
                        if (grid[i].startsWith("BK") == false && grid[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (grid[i].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }

                        if (i == 8 || i == 16 || i == 24 || i == 32 || i == 40 || i == 48 || i == 56) {
                            break;
                        }
                    }
                }

                else if (piece.color == "B") {

                    // Moving up and capturing
                    if (pieceCurrentIndex - newIndex == 8 || pieceCurrentIndex - newIndex == 16
                        || pieceCurrentIndex - newIndex == 24 || pieceCurrentIndex - newIndex == 32 
                        || pieceCurrentIndex - newIndex == 40 || pieceCurrentIndex - newIndex == 48 
                        || pieceCurrentIndex - newIndex == 56) {

                        let notAllEmpty = false;

                        for (let i = pieceCurrentIndex - 8; i > newIndex; i -= 8) {
                            if ((grid[i] != "|||") && pieceCurrentIndex - newIndex != 8) {
                                notAllEmpty = true;
                            }
                        }

                        if (notAllEmpty == false) {
                            if (grid[newIndex].startsWith("B") || grid[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                grid[pieceCurrentIndex] = "|||";
                                grid[newIndex] = pieceString;

                                this.currentTurn = false;
                                enemyPlayer.currentTurn = true;
                            }
                        }
                    }

                    // Moving down and capturing
                    else if (newIndex - pieceCurrentIndex == 8 || newIndex - pieceCurrentIndex == 16
                        || newIndex - pieceCurrentIndex == 24 || newIndex - pieceCurrentIndex == 32 
                        || newIndex - pieceCurrentIndex == 40 || newIndex - pieceCurrentIndex == 48 
                        || newIndex - pieceCurrentIndex == 56) {
                            
                        let notAllEmpty = false;

                        for (let i = pieceCurrentIndex + 8; i < newIndex; i += 8) {
                            if ((grid[i] != "|||") && (newIndex - pieceCurrentIndex != 8)) {
                                notAllEmpty = true;
                            }
                        }

                        if (notAllEmpty == false) {
                            if (grid[newIndex].startsWith("B") || grid[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                grid[pieceCurrentIndex] = "|||";
                                grid[newIndex] = pieceString;

                                this.currentTurn = false;
                                enemyPlayer.currentTurn = true;
                            }
                        }
                    }

                    // Moving right and capturing
                    else if (newIndex - pieceCurrentIndex == 1 || newIndex - pieceCurrentIndex == 2
                        || newIndex - pieceCurrentIndex == 3 || newIndex - pieceCurrentIndex == 4 
                        || newIndex - pieceCurrentIndex == 5 || newIndex - pieceCurrentIndex == 6 
                        || newIndex - pieceCurrentIndex == 7) {

                        if (((newIndex >= 0 && newIndex < 8) && (pieceCurrentIndex >= 0 && pieceCurrentIndex < 8))
                        || ((newIndex >= 8 && newIndex < 16) && (pieceCurrentIndex >= 8 && pieceCurrentIndex < 16))
                        || ((newIndex >= 16 && newIndex < 24) && (pieceCurrentIndex >= 16 && pieceCurrentIndex < 24))
                        || ((newIndex >= 24 && newIndex < 32) && (pieceCurrentIndex >= 24 && pieceCurrentIndex < 32))
                        || ((newIndex >= 32 && newIndex < 40) && (pieceCurrentIndex >= 32 && pieceCurrentIndex < 40))
                        || ((newIndex >= 40 && newIndex < 48) && (pieceCurrentIndex >= 40 && pieceCurrentIndex < 48))
                        || ((newIndex >= 48 && newIndex < 56) && (pieceCurrentIndex >= 48 && pieceCurrentIndex < 56))
                        || ((newIndex >= 56 && newIndex < 64) && (pieceCurrentIndex >= 56 && pieceCurrentIndex < 64))) {
                            
                            let notAllEmpty = false;

                            for (let i = pieceCurrentIndex + 1; i < newIndex; i += 1) {
                                if ((grid[i] != "|||") && (newIndex - pieceCurrentIndex != 1)) {
                                    notAllEmpty = true;
                                }
                            }

                            if (notAllEmpty == false) {
                                if (grid[newIndex].startsWith("B") || grid[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                                }

                                else {
                                    grid[pieceCurrentIndex] = "|||";
                                    grid[newIndex] = pieceString;

                                    this.currentTurn = false;
                                    enemyPlayer.currentTurn = true;
                                }
                            }
                        }
                    }

                    // Moving left and capturing
                    else if (pieceCurrentIndex - newIndex == 1 || pieceCurrentIndex - newIndex == 2
                        || pieceCurrentIndex - newIndex == 3 || pieceCurrentIndex - newIndex == 4 
                        || pieceCurrentIndex - newIndex == 5 || pieceCurrentIndex - newIndex == 6 
                        || pieceCurrentIndex - newIndex == 7) {
                        
                        if (((newIndex >= 0 && newIndex < 8) && (pieceCurrentIndex >= 0 && pieceCurrentIndex < 8))
                        || ((newIndex >= 8 && newIndex < 16) && (pieceCurrentIndex >= 8 && pieceCurrentIndex < 16))
                        || ((newIndex >= 16 && newIndex < 24) && (pieceCurrentIndex >= 16 && pieceCurrentIndex < 24))
                        || ((newIndex >= 24 && newIndex < 32) && (pieceCurrentIndex >= 24 && pieceCurrentIndex < 32))
                        || ((newIndex >= 32 && newIndex < 40) && (pieceCurrentIndex >= 32 && pieceCurrentIndex < 40))
                        || ((newIndex >= 40 && newIndex < 48) && (pieceCurrentIndex >= 40 && pieceCurrentIndex < 48))
                        || ((newIndex >= 48 && newIndex < 56) && (pieceCurrentIndex >= 48 && pieceCurrentIndex < 56))
                        || ((newIndex >= 56 && newIndex < 64) && (pieceCurrentIndex >= 56 && pieceCurrentIndex < 64))) {
                            
                            let notAllEmpty = false;

                            for (let i = pieceCurrentIndex - 1; i > newIndex; i -= 1) {
                                if ((grid[i] != "|||") && pieceCurrentIndex - newIndex != 1) {
                                    notAllEmpty = true;
                                }
                            }

                            if (notAllEmpty == false) {
                                if (grid[newIndex].startsWith("B") || grid[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                                }

                                else {
                                    grid[pieceCurrentIndex] = "|||";
                                    grid[newIndex] = pieceString;

                                    this.currentTurn = false;
                                    enemyPlayer.currentTurn = true;
                                }
                            }
                        }
                    }

                    // Moving up and to the right
                    if (pieceCurrentIndex - newIndex == 7 || pieceCurrentIndex - newIndex == 14
                        || pieceCurrentIndex - newIndex == 21 || pieceCurrentIndex - newIndex == 28 
                        || pieceCurrentIndex - newIndex == 35 || pieceCurrentIndex - newIndex == 42 
                        || pieceCurrentIndex - newIndex == 49) {

                        let notAllEmpty = false;
                        let hitEdge = false;

                        for (let i = pieceCurrentIndex - 7; i > newIndex; i -= 7) {
                            if ((grid[i] != "|||") && pieceCurrentIndex - newIndex != 7) {
                                notAllEmpty = true;
                            }

                            if ((i == 7 && newIndex < i) || (i == 15 && newIndex < i) 
                                || (i == 23 && newIndex < i) || (i == 31 && newIndex < i) 
                                || (i == 39 && newIndex < i) || (i == 47 && newIndex < i) 
                                || (i == 55 && newIndex < i)) {

                                hitEdge = true;
                                break;
                            }
                        }

                        if (notAllEmpty == false && hitEdge == false) {
                            if (grid[newIndex].startsWith("B") || grid[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                grid[pieceCurrentIndex] = "|||";
                                grid[newIndex] = pieceString;

                                this.currentTurn = false;
                                enemyPlayer.currentTurn = true;
                            }
                        }      
                    }

                    // Moving up and to the left
                    else if (pieceCurrentIndex - newIndex == 9 || pieceCurrentIndex - newIndex == 18
                        || pieceCurrentIndex - newIndex == 27 || pieceCurrentIndex - newIndex == 36 
                        || pieceCurrentIndex - newIndex == 45 || pieceCurrentIndex - newIndex == 54 
                        || pieceCurrentIndex - newIndex == 63) {
                        
                        let notAllEmpty = false;
                        let hitEdge = false;

                        for (let i = pieceCurrentIndex - 9; i > newIndex; i -= 9) {
                            if ((grid[i] != "|||") && pieceCurrentIndex - newIndex != 9) {
                                notAllEmpty = true;
                            }

                            if ((i == 8 && newIndex < i) || (i == 16 && newIndex < i) 
                                || (i == 24 && newIndex < i) || (i == 32 && newIndex < i) 
                                || (i == 40 && newIndex < i) || (i == 48 && newIndex < i) ) {

                                hitEdge = true;
                                break;
                            }
                        }

                        if (notAllEmpty == false && hitEdge == false) {
                            if (grid[newIndex].startsWith("B") || grid[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                grid[pieceCurrentIndex] = "|||";
                                grid[newIndex] = pieceString;

                                this.currentTurn = false;
                                enemyPlayer.currentTurn = true;
                            }
                        }     
                    }

                    // Moving down and to the right
                    else if (newIndex - pieceCurrentIndex == 9 || newIndex - pieceCurrentIndex == 18
                        || newIndex - pieceCurrentIndex == 27 || newIndex - pieceCurrentIndex == 36 
                        || newIndex - pieceCurrentIndex == 45 || newIndex - pieceCurrentIndex == 54 
                        || newIndex - pieceCurrentIndex == 63) {
                        
                        let notAllEmpty = false;
                        let hitEdge = false;

                        for (let i = pieceCurrentIndex + 9; i < newIndex; i += 9) {
                            if ((grid[i] != "|||") && newIndex - pieceCurrentIndex != 9) {
                                notAllEmpty = true;
                            }

                            if ((i == 15 && newIndex > i) || (i == 23 && newIndex > i) 
                                || (i == 31 && newIndex > i) || (i == 39 && newIndex > i) 
                                || (i == 47 && newIndex > i) || (i == 55 && newIndex > i)) {

                                hitEdge = true;
                                break;
                            }
                        }

                        if (notAllEmpty == false && hitEdge == false) {
                            if (grid[newIndex].startsWith("B") || grid[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                grid[pieceCurrentIndex] = "|||";
                                grid[newIndex] = pieceString;

                                this.currentTurn = false;
                                enemyPlayer.currentTurn = true;
                            }
                        }     
                    }

                    // Moving down and to the left
                    else if (newIndex - pieceCurrentIndex == 7 || newIndex - pieceCurrentIndex == 14
                        || newIndex - pieceCurrentIndex == 21 || newIndex - pieceCurrentIndex == 28 
                        || newIndex - pieceCurrentIndex == 35 || newIndex - pieceCurrentIndex == 42 
                        || newIndex - pieceCurrentIndex == 49) {
                        
                        let notAllEmpty = false;
                        let hitEdge = false;

                        for (let i = pieceCurrentIndex + 7; i < newIndex; i += 7) {
                            if ((grid[i] != "|||") && newIndex - pieceCurrentIndex != 7) {
                                notAllEmpty = true;
                            }

                            if ((i == 8 && newIndex > i) || (i == 16 && newIndex > i) 
                                || (i == 24 && newIndex > i) || (i == 32 && newIndex > i) 
                                || (i == 40 && newIndex > i) || (i == 48 && newIndex > i) ) {

                                hitEdge = true;
                                break;
                            }
                        }

                        if (notAllEmpty == false && hitEdge == false) {
                            if (grid[newIndex].startsWith("B") || grid[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                grid[pieceCurrentIndex] = "|||";
                                grid[newIndex] = pieceString;

                                this.currentTurn = false;
                                enemyPlayer.currentTurn = true;
                            }
                        }   
                    }

                    // Check if enemy king is in check upwards
                    for (let i = newIndex - 8; i >= 0; i -= 8) {
                        if (grid[i].startsWith("WK") == false && grid[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (grid[i].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }

                    // Check if enemy king is in check downwards
                    for (let i = newIndex + 8; i <= 63; i += 8) {
                        if (grid[i].startsWith("WK") == false && grid[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (grid[i].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }

                    // Check if enemy king is in check right
                    if (newIndex >= 0 && newIndex < 8) {
                        for (let i = newIndex + 1; i < 8; i++) {
                            if (grid[i].startsWith("WK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("WK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 8 && newIndex < 16) {
                        for (let i = newIndex + 1; i < 16; i++) {
                            if (grid[i].startsWith("WK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("WK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 16 && newIndex < 24) {
                        for (let i = newIndex + 1; i < 24; i++) {
                            if (grid[i].startsWith("WK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("WK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 24 && newIndex < 32) {
                        for (let i = newIndex + 1; i < 32; i++) {
                            if (grid[i].startsWith("WK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("WK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 32 && newIndex < 40) {
                        for (let i = newIndex + 1; i < 40; i++) {
                            if (grid[i].startsWith("WK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("WK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 40 && newIndex < 48) {
                        for (let i = newIndex + 1; i < 48; i++) {
                            if (grid[i].startsWith("WK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("WK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 48 && newIndex < 56) {
                        for (let i = newIndex + 1; i < 56; i++) {
                            if (grid[i].startsWith("WK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("WK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 56 && newIndex < 64) {
                        for (let i = newIndex + 1; i < 64; i++) {
                            if (grid[i].startsWith("WK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("WK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    // Check if enemy king is in check left
                    if (newIndex >= 0 && newIndex < 8) {
                        for (let i = newIndex - 1; i >= 0; i--) {
                            if (grid[i].startsWith("WK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("WK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 8 && newIndex < 16) {
                        for (let i = newIndex - 1; i >= 8; i--) {
                            if (grid[i].startsWith("WK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("WK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 16 && newIndex < 24) {
                        for (let i = newIndex - 1; i >= 16; i--) {
                            if (grid[i].startsWith("WK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("WK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 24 && newIndex < 32) {
                        for (let i = newIndex - 1; i >= 24; i--) {
                            if (grid[i].startsWith("WK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("WK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 32 && newIndex < 40) {
                        for (let i = newIndex - 1; i >= 32; i--) {
                            if (grid[i].startsWith("WK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("WK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 40 && newIndex < 48) {
                        for (let i = newIndex - 1; i >= 40; i--) {
                            if (grid[i].startsWith("WK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("WK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 48 && newIndex < 56) {
                        for (let i = newIndex - 1; i >= 48; i--) {
                            if (grid[i].startsWith("WK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("WK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    else if (newIndex >= 56 && newIndex < 64) {
                        for (let i = newIndex - 1; i >= 56; i--) {
                            if (grid[i].startsWith("WK") == false && grid[i].startsWith("|||") == false) {
                                break;
                            }

                            else if (grid[i].startsWith("WK")) {
                                enemyPlayer.inCheck = true;
                                break;
                            }
                        }
                    }

                    // Check if enemy king is in check up and to the right
                    for (let i = newIndex - 7; i >= 0; i -= 7) {
                        if (grid[i].startsWith("WK") == false && grid[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (grid[i].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }

                        if (i == 7 || i == 15 || i == 23 || i == 31 || i == 39 || i == 47 || i == 55) {
                            break;
                        }
                    }

                    // Check if enemy king is in check up and to the left
                    for (let i = newIndex - 9; i >= 0; i -= 9) {
                        if (grid[i].startsWith("WK") == false && grid[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (grid[i].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }

                        if (i == 0 || i == 8 || i == 16 || i == 24 || i == 32 || i == 40 || i == 48) {
                            break;
                        }
                    }

                    // Check if enemy king is in check down and to the right
                    for (let i = newIndex + 9; i <= 63; i += 9) {
                        if (grid[i].startsWith("WK") == false && grid[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (grid[i].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }

                        if (i == 15 || i == 23 || i == 31 || i == 39 || i == 47 || i == 55 || i == 63) {
                            break;
                        }
                    }

                    // Check if enemy king is in check down and to the left
                    for (let i = newIndex + 7; i <= 63; i += 7) {
                        if (grid[i].startsWith("WK") == false && grid[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (grid[i].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }

                        if (i == 8 || i == 16 || i == 24 || i == 32 || i == 40 || i == 48 || i == 56) {
                            break;
                        }
                    }
                }
            }

            else if (piece.name == "K") {

                if (piece.color == "W") {

                    // Moving up and capturing
                    if (pieceCurrentIndex - newIndex == 8) {

                        let notAllEmpty = false;

                        for (let i = pieceCurrentIndex - 8; i > newIndex; i -= 8) {
                            if ((grid[i] != "|||") && pieceCurrentIndex - newIndex != 8) {
                                notAllEmpty = true;
                            }
                        }

                        if (notAllEmpty == false) {
                            if (grid[newIndex].startsWith("W") || grid[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                for (let j = 0; j < 64; j++) {
                                    if (grid[j].startsWith("BK")) {
                                        if (newIndex == j + 8) {

                                        }

                                        else {
                                            grid[pieceCurrentIndex] = "|||";
                                            grid[newIndex] = pieceString;

                                            this.currentTurn = false;
                                            enemyPlayer.currentTurn = true;
                                        }

                                    }
                                }
                            }
                        }
                    }

                    // Moving down and capturing
                    else if (newIndex - pieceCurrentIndex == 8) {
                            
                        let notAllEmpty = false;

                        for (let i = pieceCurrentIndex + 8; i < newIndex; i += 8) {
                            if ((grid[i] != "|||") && (newIndex - pieceCurrentIndex != 8)) {
                                notAllEmpty = true;
                            }
                        }

                        if (notAllEmpty == false) {
                            if (grid[newIndex].startsWith("W") || grid[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                for (let j = 0; j < 64; j++) {
                                    if (grid[j].startsWith("BK")) {
                                        if (newIndex == j - 8) {

                                        }

                                        else {
                                            grid[pieceCurrentIndex] = "|||";
                                            grid[newIndex] = pieceString;

                                            this.currentTurn = false;
                                            enemyPlayer.currentTurn = true;
                                        }

                                    }
                                }
                            }
                        }
                    }

                    // Moving right and capturing
                    else if (newIndex - pieceCurrentIndex == 1) {

                        if (((newIndex >= 0 && newIndex < 8) && (pieceCurrentIndex >= 0 && pieceCurrentIndex < 8))
                        || ((newIndex >= 8 && newIndex < 16) && (pieceCurrentIndex >= 8 && pieceCurrentIndex < 16))
                        || ((newIndex >= 16 && newIndex < 24) && (pieceCurrentIndex >= 16 && pieceCurrentIndex < 24))
                        || ((newIndex >= 24 && newIndex < 32) && (pieceCurrentIndex >= 24 && pieceCurrentIndex < 32))
                        || ((newIndex >= 32 && newIndex < 40) && (pieceCurrentIndex >= 32 && pieceCurrentIndex < 40))
                        || ((newIndex >= 40 && newIndex < 48) && (pieceCurrentIndex >= 40 && pieceCurrentIndex < 48))
                        || ((newIndex >= 48 && newIndex < 56) && (pieceCurrentIndex >= 48 && pieceCurrentIndex < 56))
                        || ((newIndex >= 56 && newIndex < 64) && (pieceCurrentIndex >= 56 && pieceCurrentIndex < 64))) {
                            
                            let notAllEmpty = false;

                            for (let i = pieceCurrentIndex + 1; i < newIndex; i += 1) {
                                if ((grid[i] != "|||") && (newIndex - pieceCurrentIndex != 1)) {
                                    notAllEmpty = true;
                                }
                            }

                            if (notAllEmpty == false) {
                                if (grid[newIndex].startsWith("W") || grid[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                                }

                                else {
                                    let nextToEnemyKing = false;

                                    for (let j = 0; j < 64; j++) {
                                        if (grid[j].startsWith("BK")) {
                                            if (((newIndex >= 0 && newIndex < 8) && (j >= 0 && j < 8))
                                            || ((newIndex >= 8 && newIndex < 16) && (j >= 8 && j < 16))
                                            || ((newIndex >= 16 && newIndex < 24) && (j >= 16 && j < 24))
                                            || ((newIndex >= 24 && newIndex < 32) && (j >= 24 && j < 32))
                                            || ((newIndex >= 32 && newIndex < 40) && (j >= 32 && j < 40))
                                            || ((newIndex >= 40 && newIndex < 48) && (j >= 40 && j < 48))
                                            || ((newIndex >= 48 && newIndex < 56) && (j >= 48 && j < 56))
                                            || ((newIndex >= 56 && newIndex < 64) && (j >= 56 && j < 64))) {
                                                if (newIndex == j - 1) {
                                                    nextToEnemyKing = true;
                                                }
                                            }
                                        }
                                    }

                                    if (nextToEnemyKing == true) {

                                    }

                                    else {
                                        grid[pieceCurrentIndex] = "|||";
                                        grid[newIndex] = pieceString;

                                        this.currentTurn = false;
                                        enemyPlayer.currentTurn = true;
                                    }
                                }
                            }
                        }
                    }

                    // Moving left and capturing
                    else if (pieceCurrentIndex - newIndex == 1) {
                        
                        if (((newIndex >= 0 && newIndex < 8) && (pieceCurrentIndex >= 0 && pieceCurrentIndex < 8))
                        || ((newIndex >= 8 && newIndex < 16) && (pieceCurrentIndex >= 8 && pieceCurrentIndex < 16))
                        || ((newIndex >= 16 && newIndex < 24) && (pieceCurrentIndex >= 16 && pieceCurrentIndex < 24))
                        || ((newIndex >= 24 && newIndex < 32) && (pieceCurrentIndex >= 24 && pieceCurrentIndex < 32))
                        || ((newIndex >= 32 && newIndex < 40) && (pieceCurrentIndex >= 32 && pieceCurrentIndex < 40))
                        || ((newIndex >= 40 && newIndex < 48) && (pieceCurrentIndex >= 40 && pieceCurrentIndex < 48))
                        || ((newIndex >= 48 && newIndex < 56) && (pieceCurrentIndex >= 48 && pieceCurrentIndex < 56))
                        || ((newIndex >= 56 && newIndex < 64) && (pieceCurrentIndex >= 56 && pieceCurrentIndex < 64))) {
                            
                            let notAllEmpty = false;

                            for (let i = pieceCurrentIndex - 1; i > newIndex; i -= 1) {
                                if ((grid[i] != "|||") && pieceCurrentIndex - newIndex != 1) {
                                    notAllEmpty = true;
                                }
                            }

                            if (notAllEmpty == false) {
                                if (grid[newIndex].startsWith("W") || grid[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                                }

                                else {
                                    let nextToEnemyKing = false;
                                    
                                    for (let j = 0; j < 64; j++) {
                                        if (grid[j].startsWith("BK")) {
                                            if (((newIndex >= 0 && newIndex < 8) && (j >= 0 && j < 8))
                                            || ((newIndex >= 8 && newIndex < 16) && (j >= 8 && j < 16))
                                            || ((newIndex >= 16 && newIndex < 24) && (j >= 16 && j < 24))
                                            || ((newIndex >= 24 && newIndex < 32) && (j >= 24 && j < 32))
                                            || ((newIndex >= 32 && newIndex < 40) && (j >= 32 && j < 40))
                                            || ((newIndex >= 40 && newIndex < 48) && (j >= 40 && j < 48))
                                            || ((newIndex >= 48 && newIndex < 56) && (j >= 48 && j < 56))
                                            || ((newIndex >= 56 && newIndex < 64) && (j >= 56 && j < 64))) {
                                                if (newIndex == j + 1) {
                                                    nextToEnemyKing = true;
                                                }
                                            }
                                        }
                                    }

                                    if (nextToEnemyKing == true) {

                                    }

                                    else {
                                        grid[pieceCurrentIndex] = "|||";
                                        grid[newIndex] = pieceString;

                                        this.currentTurn = false;
                                        enemyPlayer.currentTurn = true;
                                    }
                                }
                            }
                        }
                    }

                    // Moving up and to the right
                    if (pieceCurrentIndex - newIndex == 7) {

                        let notAllEmpty = false;
                        let hitEdge = false;

                        for (let i = pieceCurrentIndex - 7; i > newIndex; i -= 7) {
                            if ((grid[i] != "|||") && pieceCurrentIndex - newIndex != 7) {
                                notAllEmpty = true;
                            }

                            if ((i == 7 && newIndex < i) || (i == 15 && newIndex < i) 
                                || (i == 23 && newIndex < i) || (i == 31 && newIndex < i) 
                                || (i == 39 && newIndex < i) || (i == 47 && newIndex < i) 
                                || (i == 55 && newIndex < i)) {

                                hitEdge = true;
                                break;
                            }
                        }

                        if (notAllEmpty == false && hitEdge == false) {
                            if (grid[newIndex].startsWith("W") || grid[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                let nextToEnemyKing = false;

                                for (let j = 0; j < 64; j++) {
                                    if (grid[j].startsWith("BK")) {
                                        if (newIndex != 7 || newIndex != 15 || newIndex != 23 
                                        || newIndex != 31 || newIndex != 39 || newIndex != 47
                                        || newIndex != 55) {
                                            if (newIndex == j + 7) {
                                                nextToEnemyKing = true;
                                            }
                                        }
                                    }
                                }

                                if (nextToEnemyKing == true) {

                                }

                                else {
                                    grid[pieceCurrentIndex] = "|||";
                                    grid[newIndex] = pieceString;

                                    this.currentTurn = false;
                                    enemyPlayer.currentTurn = true;
                                }
                            }
                        }      
                    }

                    // Moving up and to the left
                    else if (pieceCurrentIndex - newIndex == 9) {
                        
                        let notAllEmpty = false;
                        let hitEdge = false;

                        for (let i = pieceCurrentIndex - 9; i > newIndex; i -= 9) {
                            if ((grid[i] != "|||") && pieceCurrentIndex - newIndex != 9) {
                                notAllEmpty = true;
                            }

                            if ((i == 8 && newIndex < i) || (i == 16 && newIndex < i) 
                                || (i == 24 && newIndex < i) || (i == 32 && newIndex < i) 
                                || (i == 40 && newIndex < i) || (i == 48 && newIndex < i) ) {

                                hitEdge = true;
                                break;
                            }
                        }

                        if (notAllEmpty == false && hitEdge == false) {
                            if (grid[newIndex].startsWith("W") || grid[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                let nextToEnemyKing = false;

                                for (let j = 0; j < 64; j++) {
                                    if (grid[j].startsWith("BK")) {
                                        if (newIndex != 8 || newIndex != 16 || newIndex != 24 
                                        || newIndex != 32 || newIndex != 40 || newIndex != 48) {
                                            if (newIndex == j + 9) {
                                                nextToEnemyKing = true;
                                            }
                                        }
                                    }
                                }

                                if (nextToEnemyKing == true) {

                                }

                                else {
                                    grid[pieceCurrentIndex] = "|||";
                                    grid[newIndex] = pieceString;

                                    this.currentTurn = false;
                                    enemyPlayer.currentTurn = true;
                                }
                            }
                        }     
                    }

                    // Moving down and to the right
                    else if (newIndex - pieceCurrentIndex == 9) {
                        
                        let notAllEmpty = false;
                        let hitEdge = false;

                        for (let i = pieceCurrentIndex + 9; i < newIndex; i += 9) {
                            if ((grid[i] != "|||") && newIndex - pieceCurrentIndex != 9) {
                                notAllEmpty = true;
                            }

                            if ((i == 15 && newIndex > i) || (i == 23 && newIndex > i) 
                                || (i == 31 && newIndex > i) || (i == 39 && newIndex > i) 
                                || (i == 47 && newIndex > i) || (i == 55 && newIndex > i)) {

                                hitEdge = true;
                                break;
                            }
                        }

                        if (notAllEmpty == false && hitEdge == false) {
                            if (grid[newIndex].startsWith("W") || grid[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                let nextToEnemyKing = false;

                                for (let j = 0; j < 64; j++) {
                                    if (grid[j].startsWith("BK")) {
                                        if (newIndex != 15 || newIndex != 23 || newIndex != 31 
                                        || newIndex != 39 || newIndex != 47 || newIndex != 55) {
                                            if (newIndex == j - 9) {
                                                nextToEnemyKing = true;
                                            }
                                        }
                                    }
                                }

                                if (nextToEnemyKing == true) {

                                }

                                else {
                                    grid[pieceCurrentIndex] = "|||";
                                    grid[newIndex] = pieceString;

                                    this.currentTurn = false;
                                    enemyPlayer.currentTurn = true;
                                }
                            }
                        }     
                    }

                    // Moving down and to the left
                    else if (newIndex - pieceCurrentIndex == 7) {
                        
                        let notAllEmpty = false;
                        let hitEdge = false;

                        for (let i = pieceCurrentIndex + 7; i < newIndex; i += 7) {
                            if ((grid[i] != "|||") && newIndex - pieceCurrentIndex != 7) {
                                notAllEmpty = true;
                            }

                            if ((i == 8 && newIndex > i) || (i == 16 && newIndex > i) 
                                || (i == 24 && newIndex > i) || (i == 32 && newIndex > i) 
                                || (i == 40 && newIndex > i) || (i == 48 && newIndex > i) ) {

                                hitEdge = true;
                                break;
                            }
                        }

                        if (notAllEmpty == false && hitEdge == false) {
                            if (grid[newIndex].startsWith("W") || grid[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                let nextToEnemyKing = false;

                                for (let j = 0; j < 64; j++) {
                                    if (grid[j].startsWith("BK")) {
                                        if (newIndex != 8 || newIndex != 16 || newIndex != 24 
                                        || newIndex != 32 || newIndex != 40 || newIndex != 48) {
                                            if (newIndex == j - 7) {
                                                nextToEnemyKing = true;
                                            }
                                        }
                                    }
                                }

                                if (nextToEnemyKing == true) {

                                }

                                else {
                                    grid[pieceCurrentIndex] = "|||";
                                    grid[newIndex] = pieceString;

                                    this.currentTurn = false;
                                    enemyPlayer.currentTurn = true;
                                }
                            }
                        }   
                    }
                }

                else if (piece.color == "B") {

                    // Moving up and capturing
                    if (pieceCurrentIndex - newIndex == 8) {

                        let notAllEmpty = false;

                        for (let i = pieceCurrentIndex - 8; i > newIndex; i -= 8) {
                            if ((grid[i] != "|||") && pieceCurrentIndex - newIndex != 8) {
                                notAllEmpty = true;
                            }
                        }

                        if (notAllEmpty == false) {
                            if (grid[newIndex].startsWith("B") || grid[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                for (let j = 0; j < 64; j++) {
                                    if (grid[j].startsWith("WK")) {
                                        if (newIndex == j + 8) {

                                        }

                                        else {
                                            grid[pieceCurrentIndex] = "|||";
                                            grid[newIndex] = pieceString;

                                            this.currentTurn = false;
                                            enemyPlayer.currentTurn = true;
                                        }

                                    }
                                }
                            }
                        }
                    }

                    // Moving down and capturing
                    else if (newIndex - pieceCurrentIndex == 8) {
                            
                        let notAllEmpty = false;

                        for (let i = pieceCurrentIndex + 8; i < newIndex; i += 8) {
                            if ((grid[i] != "|||") && (newIndex - pieceCurrentIndex != 8)) {
                                notAllEmpty = true;
                            }
                        }

                        if (notAllEmpty == false) {
                            if (grid[newIndex].startsWith("B") || grid[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                for (let j = 0; j < 64; j++) {
                                    if (grid[j].startsWith("WK")) {
                                        if (newIndex == j - 8) {

                                        }

                                        else {
                                            grid[pieceCurrentIndex] = "|||";
                                            grid[newIndex] = pieceString;

                                            this.currentTurn = false;
                                            enemyPlayer.currentTurn = true;
                                        }

                                    }
                                }
                            }
                        }
                    }

                    // Moving right and capturing
                    else if (newIndex - pieceCurrentIndex == 1) {

                        if (((newIndex >= 0 && newIndex < 8) && (pieceCurrentIndex >= 0 && pieceCurrentIndex < 8))
                        || ((newIndex >= 8 && newIndex < 16) && (pieceCurrentIndex >= 8 && pieceCurrentIndex < 16))
                        || ((newIndex >= 16 && newIndex < 24) && (pieceCurrentIndex >= 16 && pieceCurrentIndex < 24))
                        || ((newIndex >= 24 && newIndex < 32) && (pieceCurrentIndex >= 24 && pieceCurrentIndex < 32))
                        || ((newIndex >= 32 && newIndex < 40) && (pieceCurrentIndex >= 32 && pieceCurrentIndex < 40))
                        || ((newIndex >= 40 && newIndex < 48) && (pieceCurrentIndex >= 40 && pieceCurrentIndex < 48))
                        || ((newIndex >= 48 && newIndex < 56) && (pieceCurrentIndex >= 48 && pieceCurrentIndex < 56))
                        || ((newIndex >= 56 && newIndex < 64) && (pieceCurrentIndex >= 56 && pieceCurrentIndex < 64))) {
                            
                            let notAllEmpty = false;

                            for (let i = pieceCurrentIndex + 1; i < newIndex; i += 1) {
                                if ((grid[i] != "|||") && (newIndex - pieceCurrentIndex != 1)) {
                                    notAllEmpty = true;
                                }
                            }

                            if (notAllEmpty == false) {
                                if (grid[newIndex].startsWith("B") || grid[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                                }

                                else {
                                    let nextToEnemyKing = false;

                                    for (let j = 0; j < 64; j++) {
                                        if (grid[j].startsWith("WK")) {
                                            if (((newIndex >= 0 && newIndex < 8) && (j >= 0 && j < 8))
                                            || ((newIndex >= 8 && newIndex < 16) && (j >= 8 && j < 16))
                                            || ((newIndex >= 16 && newIndex < 24) && (j >= 16 && j < 24))
                                            || ((newIndex >= 24 && newIndex < 32) && (j >= 24 && j < 32))
                                            || ((newIndex >= 32 && newIndex < 40) && (j >= 32 && j < 40))
                                            || ((newIndex >= 40 && newIndex < 48) && (j >= 40 && j < 48))
                                            || ((newIndex >= 48 && newIndex < 56) && (j >= 48 && j < 56))
                                            || ((newIndex >= 56 && newIndex < 64) && (j >= 56 && j < 64))) {
                                                if (newIndex == j - 1) {
                                                    nextToEnemyKing = true;
                                                }
                                            }
                                        }
                                    }

                                    if (nextToEnemyKing == true) {

                                    }

                                    else {
                                        grid[pieceCurrentIndex] = "|||";
                                        grid[newIndex] = pieceString;

                                        this.currentTurn = false;
                                        enemyPlayer.currentTurn = true;
                                    }
                                }
                            }
                        }
                    }

                    // Moving left and capturing
                    else if (pieceCurrentIndex - newIndex == 1) {
                        
                        if (((newIndex >= 0 && newIndex < 8) && (pieceCurrentIndex >= 0 && pieceCurrentIndex < 8))
                        || ((newIndex >= 8 && newIndex < 16) && (pieceCurrentIndex >= 8 && pieceCurrentIndex < 16))
                        || ((newIndex >= 16 && newIndex < 24) && (pieceCurrentIndex >= 16 && pieceCurrentIndex < 24))
                        || ((newIndex >= 24 && newIndex < 32) && (pieceCurrentIndex >= 24 && pieceCurrentIndex < 32))
                        || ((newIndex >= 32 && newIndex < 40) && (pieceCurrentIndex >= 32 && pieceCurrentIndex < 40))
                        || ((newIndex >= 40 && newIndex < 48) && (pieceCurrentIndex >= 40 && pieceCurrentIndex < 48))
                        || ((newIndex >= 48 && newIndex < 56) && (pieceCurrentIndex >= 48 && pieceCurrentIndex < 56))
                        || ((newIndex >= 56 && newIndex < 64) && (pieceCurrentIndex >= 56 && pieceCurrentIndex < 64))) {
                            
                            let notAllEmpty = false;

                            for (let i = pieceCurrentIndex - 1; i > newIndex; i -= 1) {
                                if ((grid[i] != "|||") && pieceCurrentIndex - newIndex != 1) {
                                    notAllEmpty = true;
                                }
                            }

                            if (notAllEmpty == false) {
                                if (grid[newIndex].startsWith("B") || grid[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                                }

                                else {
                                    let nextToEnemyKing = false;
                                    
                                    for (let j = 0; j < 64; j++) {
                                        if (grid[j].startsWith("WK")) {
                                            if (((newIndex >= 0 && newIndex < 8) && (j >= 0 && j < 8))
                                            || ((newIndex >= 8 && newIndex < 16) && (j >= 8 && j < 16))
                                            || ((newIndex >= 16 && newIndex < 24) && (j >= 16 && j < 24))
                                            || ((newIndex >= 24 && newIndex < 32) && (j >= 24 && j < 32))
                                            || ((newIndex >= 32 && newIndex < 40) && (j >= 32 && j < 40))
                                            || ((newIndex >= 40 && newIndex < 48) && (j >= 40 && j < 48))
                                            || ((newIndex >= 48 && newIndex < 56) && (j >= 48 && j < 56))
                                            || ((newIndex >= 56 && newIndex < 64) && (j >= 56 && j < 64))) {
                                                if (newIndex == j + 1) {
                                                    nextToEnemyKing = true;
                                                }
                                            }
                                        }
                                    }

                                    if (nextToEnemyKing == true) {

                                    }

                                    else {
                                        grid[pieceCurrentIndex] = "|||";
                                        grid[newIndex] = pieceString;

                                        this.currentTurn = false;
                                        enemyPlayer.currentTurn = true;
                                    }
                                }
                            }
                        }
                    }

                    // Moving up and to the right
                    if (pieceCurrentIndex - newIndex == 7) {

                        let notAllEmpty = false;
                        let hitEdge = false;

                        for (let i = pieceCurrentIndex - 7; i > newIndex; i -= 7) {
                            if ((grid[i] != "|||") && pieceCurrentIndex - newIndex != 7) {
                                notAllEmpty = true;
                            }

                            if ((i == 7 && newIndex < i) || (i == 15 && newIndex < i) 
                                || (i == 23 && newIndex < i) || (i == 31 && newIndex < i) 
                                || (i == 39 && newIndex < i) || (i == 47 && newIndex < i) 
                                || (i == 55 && newIndex < i)) {

                                hitEdge = true;
                                break;
                            }
                        }

                        if (notAllEmpty == false && hitEdge == false) {
                            if (grid[newIndex].startsWith("B") || grid[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                let nextToEnemyKing = false;

                                for (let j = 0; j < 64; j++) {
                                    if (grid[j].startsWith("WK")) {
                                        if (newIndex != 7 || newIndex != 15 || newIndex != 23 
                                        || newIndex != 31 || newIndex != 39 || newIndex != 47
                                        || newIndex != 55) {
                                            if (newIndex == j + 7) {
                                                nextToEnemyKing = true;
                                            }
                                        }
                                    }
                                }

                                if (nextToEnemyKing == true) {

                                }

                                else {
                                    grid[pieceCurrentIndex] = "|||";
                                    grid[newIndex] = pieceString;

                                    this.currentTurn = false;
                                    enemyPlayer.currentTurn = true;
                                }
                            }
                        }      
                    }

                    // Moving up and to the left
                    else if (pieceCurrentIndex - newIndex == 9) {
                        
                        let notAllEmpty = false;
                        let hitEdge = false;

                        for (let i = pieceCurrentIndex - 9; i > newIndex; i -= 9) {
                            if ((grid[i] != "|||") && pieceCurrentIndex - newIndex != 9) {
                                notAllEmpty = true;
                            }

                            if ((i == 8 && newIndex < i) || (i == 16 && newIndex < i) 
                                || (i == 24 && newIndex < i) || (i == 32 && newIndex < i) 
                                || (i == 40 && newIndex < i) || (i == 48 && newIndex < i) ) {

                                hitEdge = true;
                                break;
                            }
                        }

                        if (notAllEmpty == false && hitEdge == false) {
                            if (grid[newIndex].startsWith("B") || grid[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                let nextToEnemyKing = false;

                                for (let j = 0; j < 64; j++) {
                                    if (grid[j].startsWith("WK")) {
                                        if (newIndex != 8 || newIndex != 16 || newIndex != 24 
                                        || newIndex != 32 || newIndex != 40 || newIndex != 48) {
                                            if (newIndex == j + 9) {
                                                nextToEnemyKing = true;
                                            }
                                        }
                                    }
                                }

                                if (nextToEnemyKing == true) {

                                }

                                else {
                                    grid[pieceCurrentIndex] = "|||";
                                    grid[newIndex] = pieceString;

                                    this.currentTurn = false;
                                    enemyPlayer.currentTurn = true;
                                }
                            }
                        }     
                    }

                    // Moving down and to the right
                    else if (newIndex - pieceCurrentIndex == 9) {
                        
                        let notAllEmpty = false;
                        let hitEdge = false;

                        for (let i = pieceCurrentIndex + 9; i < newIndex; i += 9) {
                            if ((grid[i] != "|||") && newIndex - pieceCurrentIndex != 9) {
                                notAllEmpty = true;
                            }

                            if ((i == 15 && newIndex > i) || (i == 23 && newIndex > i) 
                                || (i == 31 && newIndex > i) || (i == 39 && newIndex > i) 
                                || (i == 47 && newIndex > i) || (i == 55 && newIndex > i)) {

                                hitEdge = true;
                                break;
                            }
                        }

                        if (notAllEmpty == false && hitEdge == false) {
                            if (grid[newIndex].startsWith("B") || grid[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                let nextToEnemyKing = false;

                                for (let j = 0; j < 64; j++) {
                                    if (grid[j].startsWith("WK")) {
                                        if (newIndex != 15 || newIndex != 23 || newIndex != 31 
                                        || newIndex != 39 || newIndex != 47 || newIndex != 55) {
                                            if (newIndex == j - 9) {
                                                nextToEnemyKing = true;
                                            }
                                        }
                                    }
                                }

                                if (nextToEnemyKing == true) {

                                }

                                else {
                                    grid[pieceCurrentIndex] = "|||";
                                    grid[newIndex] = pieceString;
                                    
                                    this.currentTurn = false;
                                    enemyPlayer.currentTurn = true;
                                }
                            }
                        }     
                    }

                    // Moving down and to the left
                    else if (newIndex - pieceCurrentIndex == 7) {
                        
                        let notAllEmpty = false;
                        let hitEdge = false;

                        for (let i = pieceCurrentIndex + 7; i < newIndex; i += 7) {
                            if ((grid[i] != "|||") && newIndex - pieceCurrentIndex != 7) {
                                notAllEmpty = true;
                            }

                            if ((i == 8 && newIndex > i) || (i == 16 && newIndex > i) 
                                || (i == 24 && newIndex > i) || (i == 32 && newIndex > i) 
                                || (i == 40 && newIndex > i) || (i == 48 && newIndex > i) ) {

                                hitEdge = true;
                                break;
                            }
                        }

                        if (notAllEmpty == false && hitEdge == false) {
                            if (grid[newIndex].startsWith("B") || grid[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                let nextToEnemyKing = false;

                                for (let j = 0; j < 64; j++) {
                                    if (grid[j].startsWith("WK")) {
                                        if (newIndex != 8 || newIndex != 16 || newIndex != 24 
                                        || newIndex != 32 || newIndex != 40 || newIndex != 48) {
                                            if (newIndex == j - 7) {
                                                nextToEnemyKing = true;
                                            }
                                        }
                                    }
                                }

                                if (nextToEnemyKing == true) {

                                }

                                else {
                                    grid[pieceCurrentIndex] = "|||";
                                    grid[newIndex] = pieceString;

                                    this.currentTurn = false;
                                    enemyPlayer.currentTurn = true;
                                }
                            }
                        }   
                    } 
                }
            }
        }

        //console.log(grid);
    }

    /*  Copy of grid is created and player's move is applied to the copy of grid.
        Check if any of the enemy's pieces puts the player's king in check after the move.
        Return true if in check
    */
    checkIfKingIsInCheck(grid, piece, newIndex, player) {
        let gridCopy = [...grid];

        let pieceNum = piece.num;

        if (pieceNum == undefined) {
            pieceNum = "";
        }

        let pieceString = piece.color + piece.name + pieceNum;
        let pieceCurrentIndex = gridCopy.indexOf(pieceString);

        if (piece.name == "P") {
            if (piece.color == "W") {
                
                // Moving 1 space forward 
                if (pieceCurrentIndex - newIndex == 8) {
                    if (gridCopy[newIndex] != "|||") {

                    }

                    else {
                        gridCopy[pieceCurrentIndex] = "|||";
                        gridCopy[newIndex] = pieceString;
                        /*piece.firstTurn = false;
                        this.hasMoved = true;*/
                    }
                }

                // Moving 2 spaces forward only during first turn
                else if ((pieceCurrentIndex - newIndex == 16) && piece.firstTurn == true) {
                    if (gridCopy[newIndex] != "|||") {

                    }

                    else if (gridCopy[newIndex + 8] != "|||") {

                    }

                    else {
                        gridCopy[pieceCurrentIndex] = "|||";
                        gridCopy[newIndex] = pieceString;
                        /*piece.firstTurn = false;
                        this.hasMoved = true;
                        this.completedTwoSquaresMove = true;*/
                    }
                }

                // Capturing piece diagonally in front of it
                else if (pieceCurrentIndex - newIndex == 9 || pieceCurrentIndex - newIndex == 7) {
                    
                    if (this.enPassant == true && gridCopy[newIndex - 8] != "BK") {
                        if (((newIndex >= 0 && newIndex < 8) && (pieceCurrentIndex >= 8 && pieceCurrentIndex < 16))
                        || ((newIndex >= 8 && newIndex < 16) && (pieceCurrentIndex >= 16 && pieceCurrentIndex < 24))
                        || ((newIndex >= 16 && newIndex < 24) && (pieceCurrentIndex >= 24 && pieceCurrentIndex < 32))
                        || ((newIndex >= 24 && newIndex < 32) && (pieceCurrentIndex >= 32 && pieceCurrentIndex < 40))
                        || ((newIndex >= 32 && newIndex < 40) && (pieceCurrentIndex >= 40 && pieceCurrentIndex < 48))
                        || ((newIndex >= 40 && newIndex < 48) && (pieceCurrentIndex >= 48 && pieceCurrentIndex < 56))
                        || ((newIndex >= 48 && newIndex < 56) && (pieceCurrentIndex >= 56 && pieceCurrentIndex < 64))) {

                            gridCopy[pieceCurrentIndex] = "|||";
                            gridCopy[newIndex] = pieceString;
                            gridCopy[newIndex + 8] = "|||"; // Capture enemy pawn
                            /*this.enPassant = false;
                            this.hasMoved = true;
                            console.log("enPassant by white pawn");*/                         
                        }
                    }

                    else if (gridCopy[newIndex] == "|||" || gridCopy[newIndex] == "BK") { // Can not capture king

                    }

                    else {
                        if (((newIndex >= 0 && newIndex < 8) && (pieceCurrentIndex >= 8 && pieceCurrentIndex < 16))
                        || ((newIndex >= 8 && newIndex < 16) && (pieceCurrentIndex >= 16 && pieceCurrentIndex < 24))
                        || ((newIndex >= 16 && newIndex < 24) && (pieceCurrentIndex >= 24 && pieceCurrentIndex < 32))
                        || ((newIndex >= 24 && newIndex < 32) && (pieceCurrentIndex >= 32 && pieceCurrentIndex < 40))
                        || ((newIndex >= 32 && newIndex < 40) && (pieceCurrentIndex >= 40 && pieceCurrentIndex < 48))
                        || ((newIndex >= 40 && newIndex < 48) && (pieceCurrentIndex >= 48 && pieceCurrentIndex < 56))
                        || ((newIndex >= 48 && newIndex < 56) && (pieceCurrentIndex >= 56 && pieceCurrentIndex < 64))) {

                            gridCopy[pieceCurrentIndex] = "|||";
                            gridCopy[newIndex] = pieceString;
                            /*this.hasMoved = true;*/
                        }
                    }
                }

                else {

                }

                // Check if enemy pawn can en passant. Makes sure the player pawn has moved (above occurred)
                /*if (gridCopy[newIndex - 1].startsWith("BP") && this.hasMoved == true && this.completedTwoSquaresMove == true) {
                    enemyPlayer.enPassant = true;
                    console.log(`White pawn ${gridCopy[newIndex]} has black pawn ${gridCopy[newIndex - 1]} to the left`);
                }

                else if (gridCopy[newIndex + 1].startsWith("BP") && this.hasMoved == true && this.completedTwoSquaresMove == true) {
                    enemyPlayer.enPassant = true;
                    console.log(`White pawn ${gridCopy[newIndex]} has black pawn ${gridCopy[newIndex + 1]} to the right`);
                } */

                // Check if enemy king is in check
                /*if (((newIndex - 7 >= 0 && newIndex - 7 < 8) && (newIndex >= 8 && newIndex < 16))
                || ((newIndex - 7 >= 8 && newIndex - 7 < 16) && (newIndex >= 16 && newIndex < 24))
                || ((newIndex - 7 >= 16 && newIndex - 7 < 24) && (newIndex >= 24 && newIndex < 32))
                || ((newIndex - 7 >= 24 && newIndex - 7 < 32) && (newIndex >= 32 && newIndex < 40))
                || ((newIndex - 7 >= 32 && newIndex - 7 < 40) && (newIndex >= 40 && newIndex < 48))
                || ((newIndex - 7 >= 40 && newIndex - 7 < 48) && (newIndex >= 48 && newIndex < 56))
                || ((newIndex - 7 >= 48 && newIndex - 7 < 56) && (newIndex >= 56 && newIndex < 64))) {
                    if (gridCopy[newIndex - 7].startsWith("BK")) {
                        enemyPlayer.inCheck = true;
                    }
                }

                else if (((newIndex - 9 >= 0 && newIndex - 9 < 8) && (newIndex >= 8 && newIndex < 16))
                || ((newIndex - 9 >= 8 && newIndex - 9 < 16) && (newIndex >= 16 && newIndex < 24))
                || ((newIndex - 9 >= 16 && newIndex - 9 < 24) && (newIndex >= 24 && newIndex < 32))
                || ((newIndex - 9 >= 24 && newIndex - 9 < 32) && (newIndex >= 32 && newIndex < 40))
                || ((newIndex - 9 >= 32 && newIndex - 9 < 40) && (newIndex >= 40 && newIndex < 48))
                || ((newIndex - 9 >= 40 && newIndex - 9 < 48) && (newIndex >= 48 && newIndex < 56))
                || ((newIndex - 9 >= 48 && newIndex - 9 < 56) && (newIndex >= 56 && newIndex < 64))) {
                    if (gridCopy[newIndex - 9].startsWith("BK")) {
                        enemyPlayer.inCheck = true;
                    }
                } */

                /*if (newIndex == 0 || newIndex == 1 || newIndex == 2 || newIndex == 3 || newIndex == 4 || newIndex == 5 || newIndex == 6 || newIndex == 7) {
                    piece.name = "Q"
                    piece.num = this.numOfWhiteQueens[0];
                    this.numOfWhiteQueens.shift();
                    gridCopy[newIndex] = "W" + piece.name + piece.num;
                } */

                /*this.hasMoved = false;
                this.completedTwoSquaresMove = false; */
            }

            else if (piece.color == "B") {
                // Moving 1 or 2 spaces forward 
                if (newIndex - pieceCurrentIndex == 8) {
                    if (gridCopy[newIndex] != "|||") {

                    }

                    else {
                        gridCopy[pieceCurrentIndex] = "|||";
                        gridCopy[newIndex] = pieceString;
                        /*piece.firstTurn = false;
                        this.hasMoved = true;*/
                    }
                }

                else if ((newIndex - pieceCurrentIndex == 16) && piece.firstTurn == true) {
                    if (gridCopy[newIndex] != "|||") {

                    }

                    else if (gridCopy[newIndex - 8] != "|||") {

                    }

                    else {
                        gridCopy[pieceCurrentIndex] = "|||";
                        gridCopy[newIndex] = pieceString;
                        /*piece.firstTurn = false;
                        this.hasMoved = true;
                        this.completedTwoSquaresMove = true*/
                    }                    
                }

                // Capturing piece diagonally in front of it
                else if (newIndex - pieceCurrentIndex == 9 || newIndex - pieceCurrentIndex == 7) {
                    if (this.enPassant == true && gridCopy[newIndex - 8] != "WK") {
                        if (((newIndex >= 8 && newIndex < 16) && (pieceCurrentIndex >= 0 && pieceCurrentIndex < 8))
                        || ((newIndex >= 16 && newIndex < 24) && (pieceCurrentIndex >= 8 && pieceCurrentIndex < 16))
                        || ((newIndex >= 24 && newIndex < 32) && (pieceCurrentIndex >= 16 && pieceCurrentIndex < 24))
                        || ((newIndex >= 32 && newIndex < 40) && (pieceCurrentIndex >= 24 && pieceCurrentIndex < 32))
                        || ((newIndex >= 40 && newIndex < 48) && (pieceCurrentIndex >= 32 && pieceCurrentIndex < 40))
                        || ((newIndex >= 48 && newIndex < 56) && (pieceCurrentIndex >= 40 && pieceCurrentIndex < 48))
                        || ((newIndex >= 56 && newIndex < 64) && (pieceCurrentIndex >= 48 && pieceCurrentIndex < 56))) { 
                            gridCopy[pieceCurrentIndex] = "|||";
                            gridCopy[newIndex] = pieceString;
                            gridCopy[newIndex - 8] = "|||"; // Capture enemy pawn
                            /*this.enPassant = false;
                            this.hasMoved = true;
                            console.log("enPassant by black pawn");*/
                        }
                    }

                    else if (gridCopy[newIndex] == "|||" || gridCopy[newIndex] == "WK") { // Can not capture king

                    }

                    else {

                        if (((newIndex >= 8 && newIndex < 16) && (pieceCurrentIndex >= 0 && pieceCurrentIndex < 8))
                        || ((newIndex >= 16 && newIndex < 24) && (pieceCurrentIndex >= 8 && pieceCurrentIndex < 16))
                        || ((newIndex >= 24 && newIndex < 32) && (pieceCurrentIndex >= 16 && pieceCurrentIndex < 24))
                        || ((newIndex >= 32 && newIndex < 40) && (pieceCurrentIndex >= 24 && pieceCurrentIndex < 32))
                        || ((newIndex >= 40 && newIndex < 48) && (pieceCurrentIndex >= 32 && pieceCurrentIndex < 40))
                        || ((newIndex >= 48 && newIndex < 56) && (pieceCurrentIndex >= 40 && pieceCurrentIndex < 48))
                        || ((newIndex >= 56 && newIndex < 64) && (pieceCurrentIndex >= 48 && pieceCurrentIndex < 56))) {                        
                            gridCopy[pieceCurrentIndex] = "|||";
                            gridCopy[newIndex] = pieceString;
                            /*this.hasMoved = true;*/
                        }
                    }
                }

                else {

                }

                // Check if enemy pawn can en passant. Makes sure the player pawn has moved (above occurred)
                /*if (gridCopy[newIndex - 1].startsWith("WP") && this.hasMoved == true && this.completedTwoSquaresMove == true) {
                    enemyPlayer.enPassant = true;
                    console.log(`Black pawn ${gridCopy[newIndex]} has white pawn ${gridCopy[newIndex - 1]} to the left`);
                }

                else if (gridCopy[newIndex + 1].startsWith("WP") && this.hasMoved == true && this.completedTwoSquaresMove == true) {
                    enemyPlayer.enPassant = true;
                    console.log(`Black pawn ${gridCopy[newIndex]} has white pawn ${gridCopy[newIndex + 1]} to the right`);
                }*/

                // Check if enemy king is in check
                /*if (((newIndex >= 0 && newIndex < 8) && (newIndex + 7 >= 8 && newIndex + 7 < 16))
                || ((newIndex >= 8 && newIndex < 16) && (newIndex + 7 >= 16 && newIndex + 7 < 24))
                || ((newIndex >= 16 && newIndex < 24) && (newIndex + 7 >= 24 && newIndex + 7 < 32))
                || ((newIndex >= 24 && newIndex < 32) && (newIndex + 7 >= 32 && newIndex + 7 < 40))
                || ((newIndex >= 32 && newIndex < 40) && (newIndex + 7 >= 40 && newIndex + 7 < 48))
                || ((newIndex >= 40 && newIndex < 48) && (newIndex + 7 >= 48 && newIndex + 7 < 56))
                || ((newIndex >= 48 && newIndex < 56) && (newIndex + 7 >= 56 && newIndex + 7 < 64))) {
                    if (gridCopy[newIndex + 7].startsWith("WK")) {
                        enemyPlayer.inCheck = true;
                    }
                }

                else if (((newIndex >= 0 && newIndex < 8) && (newIndex + 9 >= 8 && newIndex + 9 < 16))
                || ((newIndex >= 8 && newIndex < 16) && (newIndex + 9 >= 16 && newIndex + 9 < 24))
                || ((newIndex >= 16 && newIndex < 24) && (newIndex + 9 >= 24 && newIndex + 9 < 32))
                || ((newIndex >= 24 && newIndex < 32) && (newIndex + 9 >= 32 && newIndex + 9 < 40))
                || ((newIndex >= 32 && newIndex < 40) && (newIndex + 9 >= 40 && newIndex + 9 < 48))
                || ((newIndex >= 40 && newIndex < 48) && (newIndex + 9 >= 48 && newIndex + 9 < 56))
                || ((newIndex >= 48 && newIndex < 56) && (newIndex + 9 >= 56 && newIndex + 9 < 64))) {
                    if (gridCopy[newIndex + 9].startsWith("WK")) {
                        enemyPlayer.inCheck = true;
                    }
                }*/


                /*if (newIndex == 0 || newIndex == 1 || newIndex == 2 || newIndex == 3 || newIndex == 4 || newIndex == 5 || newIndex == 6 || newIndex == 7) {
                    piece.name = "Q"
                    piece.num = this.numOfBlackQueens[0];
                    this.numOfBlackQueens.shift();
                    gridCopy[newIndex] = "B" + piece.name + piece.num;
                }*/

                /*this.hasMoved = false;
                this.completedTwoSquaresMove = false;*/
            }
        }

        else if (piece.name == "R") {

            if (piece.color == "W") {

                // Moving up and capturing
                if (pieceCurrentIndex - newIndex == 8 || pieceCurrentIndex - newIndex == 16
                    || pieceCurrentIndex - newIndex == 24 || pieceCurrentIndex - newIndex == 32 
                    || pieceCurrentIndex - newIndex == 40 || pieceCurrentIndex - newIndex == 48 
                    || pieceCurrentIndex - newIndex == 56) {

                    let notAllEmpty = false;

                    for (let i = pieceCurrentIndex - 8; i > newIndex; i -= 8) {
                        if ((gridCopy[i] != "|||") && pieceCurrentIndex - newIndex != 8) {
                            notAllEmpty = true;
                        }
                    }

                    if (notAllEmpty == false) {
                        if (gridCopy[newIndex].startsWith("W") || gridCopy[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            gridCopy[pieceCurrentIndex] = "|||";
                            gridCopy[newIndex] = pieceString;
                        }
                    }
                }

                // Moving down and capturing
                else if (newIndex - pieceCurrentIndex == 8 || newIndex - pieceCurrentIndex == 16
                    || newIndex - pieceCurrentIndex == 24 || newIndex - pieceCurrentIndex == 32 
                    || newIndex - pieceCurrentIndex == 40 || newIndex - pieceCurrentIndex == 48 
                    || newIndex - pieceCurrentIndex == 56) {
                        
                    let notAllEmpty = false;

                    for (let i = pieceCurrentIndex + 8; i < newIndex; i += 8) {
                        if ((gridCopy[i] != "|||") && (newIndex - pieceCurrentIndex != 8)) {
                            notAllEmpty = true;
                        }
                    }

                    if (notAllEmpty == false) {
                        if (gridCopy[newIndex].startsWith("W") || gridCopy[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            gridCopy[pieceCurrentIndex] = "|||";
                            gridCopy[newIndex] = pieceString;
                        }
                    }
                }

                // Moving right and capturing
                else if (newIndex - pieceCurrentIndex == 1 || newIndex - pieceCurrentIndex == 2
                    || newIndex - pieceCurrentIndex == 3 || newIndex - pieceCurrentIndex == 4 
                    || newIndex - pieceCurrentIndex == 5 || newIndex - pieceCurrentIndex == 6 
                    || newIndex - pieceCurrentIndex == 7) {

                    if (((newIndex >= 0 && newIndex < 8) && (pieceCurrentIndex >= 0 && pieceCurrentIndex < 8))
                    || ((newIndex >= 8 && newIndex < 16) && (pieceCurrentIndex >= 8 && pieceCurrentIndex < 16))
                    || ((newIndex >= 16 && newIndex < 24) && (pieceCurrentIndex >= 16 && pieceCurrentIndex < 24))
                    || ((newIndex >= 24 && newIndex < 32) && (pieceCurrentIndex >= 24 && pieceCurrentIndex < 32))
                    || ((newIndex >= 32 && newIndex < 40) && (pieceCurrentIndex >= 32 && pieceCurrentIndex < 40))
                    || ((newIndex >= 40 && newIndex < 48) && (pieceCurrentIndex >= 40 && pieceCurrentIndex < 48))
                    || ((newIndex >= 48 && newIndex < 56) && (pieceCurrentIndex >= 48 && pieceCurrentIndex < 56))
                    || ((newIndex >= 56 && newIndex < 64) && (pieceCurrentIndex >= 56 && pieceCurrentIndex < 64))) {
                        
                        let notAllEmpty = false;

                        for (let i = pieceCurrentIndex + 1; i < newIndex; i += 1) {
                            if ((gridCopy[i] != "|||") && (newIndex - pieceCurrentIndex != 1)) {
                                notAllEmpty = true;
                            }
                        }

                        if (notAllEmpty == false) {
                            if (gridCopy[newIndex].startsWith("W") || gridCopy[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                gridCopy[pieceCurrentIndex] = "|||";
                                gridCopy[newIndex] = pieceString;
                            }
                        }
                    }
                }

                // Moving left and capturing
                else if (pieceCurrentIndex - newIndex == 1 || pieceCurrentIndex - newIndex == 2
                    || pieceCurrentIndex - newIndex == 3 || pieceCurrentIndex - newIndex == 4 
                    || pieceCurrentIndex - newIndex == 5 || pieceCurrentIndex - newIndex == 6 
                    || pieceCurrentIndex - newIndex == 7) {
                    
                    if (((newIndex >= 0 && newIndex < 8) && (pieceCurrentIndex >= 0 && pieceCurrentIndex < 8))
                    || ((newIndex >= 8 && newIndex < 16) && (pieceCurrentIndex >= 8 && pieceCurrentIndex < 16))
                    || ((newIndex >= 16 && newIndex < 24) && (pieceCurrentIndex >= 16 && pieceCurrentIndex < 24))
                    || ((newIndex >= 24 && newIndex < 32) && (pieceCurrentIndex >= 24 && pieceCurrentIndex < 32))
                    || ((newIndex >= 32 && newIndex < 40) && (pieceCurrentIndex >= 32 && pieceCurrentIndex < 40))
                    || ((newIndex >= 40 && newIndex < 48) && (pieceCurrentIndex >= 40 && pieceCurrentIndex < 48))
                    || ((newIndex >= 48 && newIndex < 56) && (pieceCurrentIndex >= 48 && pieceCurrentIndex < 56))
                    || ((newIndex >= 56 && newIndex < 64) && (pieceCurrentIndex >= 56 && pieceCurrentIndex < 64))) {
                        
                        let notAllEmpty = false;

                        for (let i = pieceCurrentIndex - 1; i > newIndex; i -= 1) {
                            if ((gridCopy[i] != "|||") && pieceCurrentIndex - newIndex != 1) {
                                notAllEmpty = true;
                            }
                        }

                        if (notAllEmpty == false) {
                            if (gridCopy[newIndex].startsWith("W") || gridCopy[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                gridCopy[pieceCurrentIndex] = "|||";
                                gridCopy[newIndex] = pieceString;
                            }
                        }
                    }
                }

                // Check if enemy king is in check upwards
                /*for (let i = newIndex - 8; i >= 0; i -= 8) {
                    if (gridCopy[i].startsWith("BK") == false && gridCopy[i].startsWith("|||") == false) {
                        break;
                    }

                    else if (gridCopy[i].startsWith("BK")) {
                        enemyPlayer.inCheck = true;
                        break;
                    }
                }*/

                // Check if enemy king is in check downwards
                /*for (let i = newIndex + 8; i <= 63; i += 8) {
                    if (gridCopy[i].startsWith("BK") == false && gridCopy[i].startsWith("|||") == false) {
                        break;
                    }

                    else if (gridCopy[i].startsWith("BK")) {
                        enemyPlayer.inCheck = true;
                        break;
                    }
                }*/

                // Check if enemy king is in check right
                /*if (newIndex >= 0 && newIndex < 8) {
                    for (let i = newIndex + 1; i < 8; i++) {
                        if (gridCopy[i].startsWith("BK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 8 && newIndex < 16) {
                    for (let i = newIndex + 1; i < 16; i++) {
                        if (gridCopy[i].startsWith("BK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 16 && newIndex < 24) {
                    for (let i = newIndex + 1; i < 24; i++) {
                        if (gridCopy[i].startsWith("BK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 24 && newIndex < 32) {
                    for (let i = newIndex + 1; i < 32; i++) {
                        if (gridCopy[i].startsWith("BK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 32 && newIndex < 40) {
                    for (let i = newIndex + 1; i < 40; i++) {
                        if (gridCopy[i].startsWith("BK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 40 && newIndex < 48) {
                    for (let i = newIndex + 1; i < 48; i++) {
                        if (gridCopy[i].startsWith("BK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 48 && newIndex < 56) {
                    for (let i = newIndex + 1; i < 56; i++) {
                        if (gridCopy[i].startsWith("BK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 56 && newIndex < 64) {
                    for (let i = newIndex + 1; i < 64; i++) {
                        if (gridCopy[i].startsWith("BK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                // Check if enemy king is in check left
                if (newIndex >= 0 && newIndex < 8) {
                    for (let i = newIndex - 1; i >= 0; i--) {
                        if (gridCopy[i].startsWith("BK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 8 && newIndex < 16) {
                    for (let i = newIndex - 1; i >= 8; i--) {
                        if (gridCopy[i].startsWith("BK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 16 && newIndex < 24) {
                    for (let i = newIndex - 1; i >= 16; i--) {
                        if (gridCopy[i].startsWith("BK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 24 && newIndex < 32) {
                    for (let i = newIndex - 1; i >= 24; i--) {
                        if (gridCopy[i].startsWith("BK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 32 && newIndex < 40) {
                    for (let i = newIndex - 1; i >= 32; i--) {
                        if (gridCopy[i].startsWith("BK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 40 && newIndex < 48) {
                    for (let i = newIndex - 1; i >= 40; i--) {
                        if (gridCopy[i].startsWith("BK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 48 && newIndex < 56) {
                    for (let i = newIndex - 1; i >= 48; i--) {
                        if (gridCopy[i].startsWith("BK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 56 && newIndex < 64) {
                    for (let i = newIndex - 1; i >= 56; i--) {
                        if (gridCopy[i].startsWith("BK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }*/
            }

            else if (piece.color == "B") {

                // Moving up and capturing
                if (pieceCurrentIndex - newIndex == 8 || pieceCurrentIndex - newIndex == 16
                    || pieceCurrentIndex - newIndex == 24 || pieceCurrentIndex - newIndex == 32 
                    || pieceCurrentIndex - newIndex == 40 || pieceCurrentIndex - newIndex == 48 
                    || pieceCurrentIndex - newIndex == 56) {

                    let notAllEmpty = false;

                    for (let i = pieceCurrentIndex - 8; i > newIndex; i -= 8) {
                        if ((gridCopy[i] != "|||") && pieceCurrentIndex - newIndex != 8) {
                            notAllEmpty = true;
                        }
                    }

                    if (notAllEmpty == false) {
                        if (gridCopy[newIndex].startsWith("B") || gridCopy[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            gridCopy[pieceCurrentIndex] = "|||";
                            gridCopy[newIndex] = pieceString;
                        }
                    }
                }

                // Moving down and capturing
                else if (newIndex - pieceCurrentIndex == 8 || newIndex - pieceCurrentIndex == 16
                    || newIndex - pieceCurrentIndex == 24 || newIndex - pieceCurrentIndex == 32 
                    || newIndex - pieceCurrentIndex == 40 || newIndex - pieceCurrentIndex == 48 
                    || newIndex - pieceCurrentIndex == 56) {
                    
                    let notAllEmpty = false;

                    for (let i = pieceCurrentIndex + 8; i < newIndex; i += 8) {
                        if ((gridCopy[i] != "|||") && newIndex - pieceCurrentIndex != 8) {
                            notAllEmpty = true;
                        }
                    }

                    if (notAllEmpty == false) {
                        if (gridCopy[newIndex].startsWith("B") || gridCopy[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            gridCopy[pieceCurrentIndex] = "|||";
                            gridCopy[newIndex] = pieceString;
                        }
                    }
                }

                // Moving right and capturing
                else if (newIndex - pieceCurrentIndex == 1 || newIndex - pieceCurrentIndex == 2
                    || newIndex - pieceCurrentIndex == 3 || newIndex - pieceCurrentIndex == 4 
                    || newIndex - pieceCurrentIndex == 5 || newIndex - pieceCurrentIndex == 6 
                    || newIndex - pieceCurrentIndex == 7) {

                    if (((newIndex >= 0 && newIndex < 8) && (pieceCurrentIndex >= 0 && pieceCurrentIndex < 8))
                    || ((newIndex >= 8 && newIndex < 16) && (pieceCurrentIndex >= 8 && pieceCurrentIndex < 16))
                    || ((newIndex >= 16 && newIndex < 24) && (pieceCurrentIndex >= 16 && pieceCurrentIndex < 24))
                    || ((newIndex >= 24 && newIndex < 32) && (pieceCurrentIndex >= 24 && pieceCurrentIndex < 32))
                    || ((newIndex >= 32 && newIndex < 40) && (pieceCurrentIndex >= 32 && pieceCurrentIndex < 40))
                    || ((newIndex >= 40 && newIndex < 48) && (pieceCurrentIndex >= 40 && pieceCurrentIndex < 48))
                    || ((newIndex >= 48 && newIndex < 56) && (pieceCurrentIndex >= 48 && pieceCurrentIndex < 56))
                    || ((newIndex >= 56 && newIndex < 64) && (pieceCurrentIndex >= 56 && pieceCurrentIndex < 64))) {
                        
                        let notAllEmpty = false;

                        for (let i = pieceCurrentIndex + 1; i < newIndex; i += 1) {
                            if ((gridCopy[i] != "|||") && newIndex - pieceCurrentIndex != 1) {
                                notAllEmpty = true;
                            }
                        }

                        if (notAllEmpty == false) {
                            if (gridCopy[newIndex].startsWith("B") || gridCopy[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                gridCopy[pieceCurrentIndex] = "|||";
                                gridCopy[newIndex] = pieceString;
                            }
                        }
                    }
                }

                // Moving left and capturing
                else if (pieceCurrentIndex - newIndex == 1 || pieceCurrentIndex - newIndex == 2
                    || pieceCurrentIndex - newIndex == 3 || pieceCurrentIndex - newIndex == 4 
                    || pieceCurrentIndex - newIndex == 5 || pieceCurrentIndex - newIndex == 6 
                    || pieceCurrentIndex - newIndex == 7) {
                    
                    if (((newIndex >= 0 && newIndex < 8) && (pieceCurrentIndex >= 0 && pieceCurrentIndex < 8))
                    || ((newIndex >= 8 && newIndex < 16) && (pieceCurrentIndex >= 8 && pieceCurrentIndex < 16))
                    || ((newIndex >= 16 && newIndex < 24) && (pieceCurrentIndex >= 16 && pieceCurrentIndex < 24))
                    || ((newIndex >= 24 && newIndex < 32) && (pieceCurrentIndex >= 24 && pieceCurrentIndex < 32))
                    || ((newIndex >= 32 && newIndex < 40) && (pieceCurrentIndex >= 32 && pieceCurrentIndex < 40))
                    || ((newIndex >= 40 && newIndex < 48) && (pieceCurrentIndex >= 40 && pieceCurrentIndex < 48))
                    || ((newIndex >= 48 && newIndex < 56) && (pieceCurrentIndex >= 48 && pieceCurrentIndex < 56))
                    || ((newIndex >= 56 && newIndex < 64) && (pieceCurrentIndex >= 56 && pieceCurrentIndex < 64))) {
                        
                        let notAllEmpty = false;

                        for (let i = pieceCurrentIndex - 1; i > newIndex; i -= 1) {
                            if ((gridCopy[i] != "|||") && pieceCurrentIndex - newIndex != 1) {
                                notAllEmpty = true;
                            }
                        }

                        if (notAllEmpty == false) {
                            if (gridCopy[newIndex].startsWith("B") || gridCopy[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                gridCopy[pieceCurrentIndex] = "|||";
                                gridCopy[newIndex] = pieceString;
                            }
                        }
                    }
                }

                /*
                // Check if enemy king is in check upwards
                for (let i = newIndex - 8; i >= 0; i -= 8) {
                    if (gridCopy[i].startsWith("WK") == false && gridCopy[i].startsWith("|||") == false) {
                        break;
                    }

                    else if (gridCopy[i].startsWith("WK")) {
                        enemyPlayer.inCheck = true;
                        break;
                    }
                }

                // Check if enemy king is in check downwards
                for (let i = newIndex + 8; i <= 63; i += 8) {
                    if (gridCopy[i].startsWith("WK") == false && gridCopy[i].startsWith("|||") == false) {
                        break;
                    }

                    else if (gridCopy[i].startsWith("WK")) {
                        enemyPlayer.inCheck = true;
                        break;
                    }
                }

                // Check if enemy king is in check right
                if (newIndex >= 0 && newIndex < 8) {
                    for (let i = newIndex + 1; i < 8; i++) {
                        if (gridCopy[i].startsWith("WK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 8 && newIndex < 16) {
                    for (let i = newIndex + 1; i < 16; i++) {
                        if (gridCopy[i].startsWith("WK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 16 && newIndex < 24) {
                    for (let i = newIndex + 1; i < 24; i++) {
                        if (gridCopy[i].startsWith("WK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 24 && newIndex < 32) {
                    for (let i = newIndex + 1; i < 32; i++) {
                        if (gridCopy[i].startsWith("WK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 32 && newIndex < 40) {
                    for (let i = newIndex + 1; i < 40; i++) {
                        if (gridCopy[i].startsWith("WK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 40 && newIndex < 48) {
                    for (let i = newIndex + 1; i < 48; i++) {
                        if (gridCopy[i].startsWith("WK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 48 && newIndex < 56) {
                    for (let i = newIndex + 1; i < 56; i++) {
                        if (gridCopy[i].startsWith("WK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 56 && newIndex < 64) {
                    for (let i = newIndex + 1; i < 64; i++) {
                        if (gridCopy[i].startsWith("WK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                // Check if enemy king is in check left
                if (newIndex >= 0 && newIndex < 8) {
                    for (let i = newIndex - 1; i >= 0; i--) {
                        if (gridCopy[i].startsWith("WK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 8 && newIndex < 16) {
                    for (let i = newIndex - 1; i >= 8; i--) {
                        if (gridCopy[i].startsWith("WK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 16 && newIndex < 24) {
                    for (let i = newIndex - 1; i >= 16; i--) {
                        if (gridCopy[i].startsWith("WK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 24 && newIndex < 32) {
                    for (let i = newIndex - 1; i >= 24; i--) {
                        if (gridCopy[i].startsWith("WK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 32 && newIndex < 40) {
                    for (let i = newIndex - 1; i >= 32; i--) {
                        if (gridCopy[i].startsWith("WK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 40 && newIndex < 48) {
                    for (let i = newIndex - 1; i >= 40; i--) {
                        if (gridCopy[i].startsWith("WK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 48 && newIndex < 56) {
                    for (let i = newIndex - 1; i >= 48; i--) {
                        if (gridCopy[i].startsWith("WK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 56 && newIndex < 64) {
                    for (let i = newIndex - 1; i >= 56; i--) {
                        if (gridCopy[i].startsWith("WK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }*/
            }
        }

        else if (piece.name == "B") {

            if (piece.color == "W") {

                // Moving up and to the right
                if (pieceCurrentIndex - newIndex == 7 || pieceCurrentIndex - newIndex == 14
                    || pieceCurrentIndex - newIndex == 21 || pieceCurrentIndex - newIndex == 28 
                    || pieceCurrentIndex - newIndex == 35 || pieceCurrentIndex - newIndex == 42 
                    || pieceCurrentIndex - newIndex == 49) {

                    let notAllEmpty = false;
                    let hitEdge = false;

                    for (let i = pieceCurrentIndex - 7; i > newIndex; i -= 7) {
                        if ((gridCopy[i] != "|||") && pieceCurrentIndex - newIndex != 7) {
                            notAllEmpty = true;
                        }

                        if ((i == 7 && newIndex < i) || (i == 15 && newIndex < i) 
                            || (i == 23 && newIndex < i) || (i == 31 && newIndex < i) 
                            || (i == 39 && newIndex < i) || (i == 47 && newIndex < i) 
                            || (i == 55 && newIndex < i)) {

                            hitEdge = true;
                            break;
                        }
                    }

                    if (notAllEmpty == false && hitEdge == false) {
                        if (gridCopy[newIndex].startsWith("W") || gridCopy[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            gridCopy[pieceCurrentIndex] = "|||";
                            gridCopy[newIndex] = pieceString;
                        }
                    }      
                }

                // Moving up and to the left
                else if (pieceCurrentIndex - newIndex == 9 || pieceCurrentIndex - newIndex == 18
                    || pieceCurrentIndex - newIndex == 27 || pieceCurrentIndex - newIndex == 36 
                    || pieceCurrentIndex - newIndex == 45 || pieceCurrentIndex - newIndex == 54 
                    || pieceCurrentIndex - newIndex == 63) {
                    
                    let notAllEmpty = false;
                    let hitEdge = false;

                    for (let i = pieceCurrentIndex - 9; i > newIndex; i -= 9) {
                        if ((gridCopy[i] != "|||") && pieceCurrentIndex - newIndex != 9) {
                            notAllEmpty = true;
                        }

                        if ((i == 8 && newIndex < i) || (i == 16 && newIndex < i) 
                            || (i == 24 && newIndex < i) || (i == 32 && newIndex < i) 
                            || (i == 40 && newIndex < i) || (i == 48 && newIndex < i) ) {

                            hitEdge = true;
                            break;
                        }
                    }

                    if (notAllEmpty == false && hitEdge == false) {
                        if (gridCopy[newIndex].startsWith("W") || gridCopy[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            gridCopy[pieceCurrentIndex] = "|||";
                            gridCopy[newIndex] = pieceString;
                        }
                    }     
                }

                // Moving down and to the right
                else if (newIndex - pieceCurrentIndex == 9 || newIndex - pieceCurrentIndex == 18
                    || newIndex - pieceCurrentIndex == 27 || newIndex - pieceCurrentIndex == 36 
                    || newIndex - pieceCurrentIndex == 45 || newIndex - pieceCurrentIndex == 54 
                    || newIndex - pieceCurrentIndex == 63) {
                    
                    let notAllEmpty = false;
                    let hitEdge = false;

                    for (let i = pieceCurrentIndex + 9; i < newIndex; i += 9) {
                        if ((gridCopy[i] != "|||") && newIndex - pieceCurrentIndex != 9) {
                            notAllEmpty = true;
                        }

                        if ((i == 15 && newIndex > i) || (i == 23 && newIndex > i) 
                            || (i == 31 && newIndex > i) || (i == 39 && newIndex > i) 
                            || (i == 47 && newIndex > i) || (i == 55 && newIndex > i)) {

                            hitEdge = true;
                            break;
                        }
                    }

                    if (notAllEmpty == false && hitEdge == false) {
                        if (gridCopy[newIndex].startsWith("W") || gridCopy[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            gridCopy[pieceCurrentIndex] = "|||";
                            gridCopy[newIndex] = pieceString;
                        }
                    }     
                }

                // Moving down and to the left
                else if (newIndex - pieceCurrentIndex == 7 || newIndex - pieceCurrentIndex == 14
                    || newIndex - pieceCurrentIndex == 21 || newIndex - pieceCurrentIndex == 28 
                    || newIndex - pieceCurrentIndex == 35 || newIndex - pieceCurrentIndex == 42 
                    || newIndex - pieceCurrentIndex == 49) {
                    
                    let notAllEmpty = false;
                    let hitEdge = false;

                    for (let i = pieceCurrentIndex + 7; i < newIndex; i += 7) {
                        if ((gridCopy[i] != "|||") && newIndex - pieceCurrentIndex != 7) {
                            notAllEmpty = true;
                        }

                        if ((i == 8 && newIndex > i) || (i == 16 && newIndex > i) 
                            || (i == 24 && newIndex > i) || (i == 32 && newIndex > i) 
                            || (i == 40 && newIndex > i) || (i == 48 && newIndex > i) ) {

                            hitEdge = true;
                            break;
                        }
                    }

                    if (notAllEmpty == false && hitEdge == false) {
                        if (gridCopy[newIndex].startsWith("W") || gridCopy[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            gridCopy[pieceCurrentIndex] = "|||";
                            gridCopy[newIndex] = pieceString;
                        }
                    }   
                }

                /*
                // Check if enemy king is in check up and to the right
                for (let i = newIndex - 7; i >= 0; i -= 7) {
                    if (gridCopy[i].startsWith("BK") == false && gridCopy[i].startsWith("|||") == false) {
                        break;
                    }

                    else if (gridCopy[i].startsWith("BK")) {
                        enemyPlayer.inCheck = true;
                        break;
                    }

                    if (i == 7 || i == 15 || i == 23 || i == 31 || i == 39 || i == 47 || i == 55) {
                        break;
                    }
                }

                // Check if enemy king is in check up and to the left
                for (let i = newIndex - 9; i >= 0; i -= 9) {
                    if (gridCopy[i].startsWith("BK") == false && gridCopy[i].startsWith("|||") == false) {
                        break;
                    }

                    else if (gridCopy[i].startsWith("BK")) {
                        enemyPlayer.inCheck = true;
                        break;
                    }

                    if (i == 0 || i == 8 || i == 16 || i == 24 || i == 32 || i == 40 || i == 48) {
                        break;
                    }
                }

                // Check if enemy king is in check down and to the right
                for (let i = newIndex + 9; i <= 63; i += 9) {
                    if (gridCopy[i].startsWith("BK") == false && gridCopy[i].startsWith("|||") == false) {
                        break;
                    }

                    else if (gridCopy[i].startsWith("BK")) {
                        enemyPlayer.inCheck = true;
                        break;
                    }

                    if (i == 15 || i == 23 || i == 31 || i == 39 || i == 47 || i == 55 || i == 63) {
                        break;
                    }
                }

                // Check if enemy king is in check down and to the left
                for (let i = newIndex + 7; i <= 63; i += 7) {
                    if (gridCopy[i].startsWith("BK") == false && gridCopy[i].startsWith("|||") == false) {
                        break;
                    }

                    else if (gridCopy[i].startsWith("BK")) {
                        enemyPlayer.inCheck = true;
                        break;
                    }

                    if (i == 8 || i == 16 || i == 24 || i == 32 || i == 40 || i == 48 || i == 56) {
                        break;
                    }
                }*/
            }

            else if (piece.color == "B") {

                // Moving up and to the right
                if (pieceCurrentIndex - newIndex == 7 || pieceCurrentIndex - newIndex == 14
                    || pieceCurrentIndex - newIndex == 21 || pieceCurrentIndex - newIndex == 28 
                    || pieceCurrentIndex - newIndex == 35 || pieceCurrentIndex - newIndex == 42 
                    || pieceCurrentIndex - newIndex == 49) {
                    
                    let notAllEmpty = false;
                    let hitEdge = false;

                    for (let i = pieceCurrentIndex - 7; i > newIndex; i -= 7) {
                        if ((gridCopy[i] != "|||") && pieceCurrentIndex - newIndex != 7) {
                            notAllEmpty = true;
                        }

                        if ((i == 7 && newIndex < i) || (i == 15 && newIndex < i) 
                            || (i == 23 && newIndex < i) || (i == 31 && newIndex < i) 
                            || (i == 39 && newIndex < i) || (i == 47 && newIndex < i) 
                            || (i == 55 && newIndex < i)) {

                            hitEdge = true;
                            break;
                        }
                    }

                    if (notAllEmpty == false && hitEdge == false) {
                        if (gridCopy[newIndex].startsWith("B") || gridCopy[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            gridCopy[pieceCurrentIndex] = "|||";
                            gridCopy[newIndex] = pieceString;
                        }
                    }   
                }

                // Moving up and to the left
                else if (pieceCurrentIndex - newIndex == 9 || pieceCurrentIndex - newIndex == 18
                    || pieceCurrentIndex - newIndex == 27 || pieceCurrentIndex - newIndex == 36 
                    || pieceCurrentIndex - newIndex == 45 || pieceCurrentIndex - newIndex == 54 
                    || pieceCurrentIndex - newIndex == 63) {
                    
                    let notAllEmpty = false;
                    let hitEdge = false;

                    for (let i = pieceCurrentIndex - 9; i > newIndex; i -= 9) {
                        if ((gridCopy[i] != "|||") && pieceCurrentIndex - newIndex != 9) {
                            notAllEmpty = true;
                        }

                        if ((i == 8 && newIndex < i) || (i == 16 && newIndex < i) 
                            || (i == 24 && newIndex < i) || (i == 32 && newIndex < i) 
                            || (i == 40 && newIndex < i) || (i == 48 && newIndex < i) ) {

                            hitEdge = true;
                            break;
                        }
                    }

                    if (notAllEmpty == false && hitEdge == false) {
                        if (gridCopy[newIndex].startsWith("B") || gridCopy[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            gridCopy[pieceCurrentIndex] = "|||";
                            gridCopy[newIndex] = pieceString;
                        }
                    }    
                }

                // Moving down and to the right
                else if (newIndex - pieceCurrentIndex == 9 || newIndex - pieceCurrentIndex == 18
                    || newIndex - pieceCurrentIndex == 27 || newIndex - pieceCurrentIndex == 36 
                    || newIndex - pieceCurrentIndex == 45 || newIndex - pieceCurrentIndex == 54 
                    || newIndex - pieceCurrentIndex == 63) {
                    
                    let notAllEmpty = false;
                    let hitEdge = false;

                    for (let i = pieceCurrentIndex + 9; i < newIndex; i += 9) {
                        if ((gridCopy[i] != "|||") && newIndex - pieceCurrentIndex != 9) {
                            notAllEmpty = true;
                        }

                        if ((i == 15 && newIndex > i) || (i == 23 && newIndex > i) 
                            || (i == 31 && newIndex > i) || (i == 39 && newIndex > i) 
                            || (i == 47 && newIndex > i) || (i == 55 && newIndex > i)) {

                            hitEdge = true;
                            break;
                        }
                    }

                    if (notAllEmpty == false && hitEdge == false) {
                        if (gridCopy[newIndex].startsWith("B") || gridCopy[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            gridCopy[pieceCurrentIndex] = "|||";
                            gridCopy[newIndex] = pieceString;
                        }
                    }   
                }

                // Moving down and to the left
                else if (newIndex - pieceCurrentIndex == 7 || newIndex - pieceCurrentIndex == 14
                    || newIndex - pieceCurrentIndex == 21 || newIndex - pieceCurrentIndex == 28 
                    || newIndex - pieceCurrentIndex == 35 || newIndex - pieceCurrentIndex == 42 
                    || newIndex - pieceCurrentIndex == 49) {
                    
                    let notAllEmpty = false;
                    let hitEdge = false;

                    for (let i = pieceCurrentIndex + 7; i < newIndex; i += 7) {
                        if ((gridCopy[i] != "|||") && newIndex - pieceCurrentIndex != 7) {
                            notAllEmpty = true;
                        }

                        if ((i == 8 && newIndex > i) || (i == 16 && newIndex > i) 
                            || (i == 24 && newIndex > i) || (i == 32 && newIndex > i) 
                            || (i == 40 && newIndex > i) || (i == 48 && newIndex > i) ) {

                            hitEdge = true;
                            break;
                        }
                    }

                    if (notAllEmpty == false && hitEdge == false) {
                        if (gridCopy[newIndex].startsWith("B") || gridCopy[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            gridCopy[pieceCurrentIndex] = "|||";
                            gridCopy[newIndex] = pieceString;
                        }
                    }  
                }

                /*
                // Check if enemy king is in check up and to the right
                for (let i = newIndex - 7; i >= 0; i -= 7) {
                    if (gridCopy[i].startsWith("WK") == false && gridCopy[i].startsWith("|||") == false) {
                        break;
                    }

                    else if (gridCopy[i].startsWith("WK")) {
                        enemyPlayer.inCheck = true;
                        break;
                    }

                    if (i == 7 || i == 15 || i == 23 || i == 31 || i == 39 || i == 47 || i == 55) {
                        break;
                    }
                }

                // Check if enemy king is in check up and to the left
                for (let i = newIndex - 9; i >= 0; i -= 9) {
                    if (gridCopy[i].startsWith("WK") == false && gridCopy[i].startsWith("|||") == false) {
                        break;
                    }

                    else if (gridCopy[i].startsWith("WK")) {
                        enemyPlayer.inCheck = true;
                        break;
                    }

                    if (i == 0 || i == 8 || i == 16 || i == 24 || i == 32 || i == 40 || i == 48) {
                        break;
                    }
                }

                // Check if enemy king is in check down and to the right
                for (let i = newIndex + 9; i <= 63; i += 9) {
                    if (gridCopy[i].startsWith("WK") == false && gridCopy[i].startsWith("|||") == false) {
                        break;
                    }

                    else if (gridCopy[i].startsWith("WK")) {
                        enemyPlayer.inCheck = true;
                        break;
                    }

                    if (i == 15 || i == 23 || i == 31 || i == 39 || i == 47 || i == 55 || i == 63) {
                        break;
                    }
                }

                // Check if enemy king is in check down and to the left
                for (let i = newIndex + 7; i <= 63; i += 7) {
                    if (gridCopy[i].startsWith("WK") == false && gridCopy[i].startsWith("|||") == false) {
                        break;
                    }

                    else if (gridCopy[i].startsWith("WK")) {
                        enemyPlayer.inCheck = true;
                        break;
                    }

                    if (i == 8 || i == 16 || i == 24 || i == 32 || i == 40 || i == 48 || i == 56) {
                        break;
                    }
                }*/
            }
        }

        else if (piece.name == "N") {

            if (piece.color == "W") {

                // Moving 2 squares up and 1 square right
                if (pieceCurrentIndex - newIndex == 15) {
                    if (gridCopy[newIndex].startsWith("W") || gridCopy[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                    }

                    else {
                        gridCopy[pieceCurrentIndex] = "|||";
                        gridCopy[newIndex] = pieceString;
                    }
                }

                // Moving 1 square up and 2 squares right
                else if (pieceCurrentIndex - newIndex == 6) {
                    if (gridCopy[newIndex].startsWith("W") || gridCopy[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                    }

                    else {
                        gridCopy[pieceCurrentIndex] = "|||";
                        gridCopy[newIndex] = pieceString;
                    }
                }

                // Moving 2 squares up and 1 square left
                else if (pieceCurrentIndex - newIndex == 17) {
                    if (gridCopy[newIndex].startsWith("W") || gridCopy[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                    }

                    else {
                        gridCopy[pieceCurrentIndex] = "|||";
                        gridCopy[newIndex] = pieceString;
                    }
                }

                // Moving 1 square up and 2 squares left
                else if (pieceCurrentIndex - newIndex == 10) {
                    if (gridCopy[newIndex].startsWith("W") || gridCopy[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                    }

                    else {
                        gridCopy[pieceCurrentIndex] = "|||";
                        gridCopy[newIndex] = pieceString;
                    }
                }

                // Moving 2 squares down and 1 square right
                else if (newIndex - pieceCurrentIndex == 17) {
                    if (gridCopy[newIndex].startsWith("W") || gridCopy[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                    }

                    else {
                        gridCopy[pieceCurrentIndex] = "|||";
                        gridCopy[newIndex] = pieceString;
                    }
                }

                // Moving 1 square down and 2 squares right
                else if (newIndex - pieceCurrentIndex == 10) {
                    if (gridCopy[newIndex].startsWith("W") || gridCopy[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                    }

                    else {
                        gridCopy[pieceCurrentIndex] = "|||";
                        gridCopy[newIndex] = pieceString;
                    }
                }

                // Moving 2 squares down and 1 square left
                else if (newIndex - pieceCurrentIndex == 15) {
                    if (gridCopy[newIndex].startsWith("W") || gridCopy[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                    }

                    else {
                        gridCopy[pieceCurrentIndex] = "|||";
                        gridCopy[newIndex] = pieceString;
                    }
                }

                // Moving 1 square down and 2 squares left
                else if (newIndex - pieceCurrentIndex == 6) {
                    if (gridCopy[newIndex].startsWith("W") || gridCopy[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                    }

                    else {
                        gridCopy[pieceCurrentIndex] = "|||";
                        gridCopy[newIndex] = pieceString;
                    }
                }

                /*
                // Check if enemy king is in check
                if (gridCopy[newIndex - 15] != undefined) {
                    if (gridCopy[newIndex - 15].startsWith("BK")) {
                        enemyPlayer.inCheck = true;
                    }
                }

                else if (gridCopy[newIndex - 6] != undefined) {
                    if (gridCopy[newIndex - 6].startsWith("BK")) {
                        enemyPlayer.inCheck = true;
                    }
                }

                else if (gridCopy[newIndex - 17] != undefined) {
                    if (gridCopy[newIndex - 17].startsWith("BK")) {
                        enemyPlayer.inCheck = true;
                    }
                }

                else if (gridCopy[newIndex - 10] != undefined) {
                    if (gridCopy[newIndex - 10].startsWith("BK")) {
                        enemyPlayer.inCheck = true;
                    }
                }

                else if (gridCopy[newIndex + 17] != undefined) {
                    if (gridCopy[newIndex + 17].startsWith("BK")) {
                        enemyPlayer.inCheck = true;
                    }
                }

                else if (gridCopy[newIndex + 10] != undefined) {
                    if (gridCopy[newIndex + 10].startsWith("BK")) {
                        enemyPlayer.inCheck = true;
                    }
                }

                else if (gridCopy[newIndex + 6] != undefined) {
                    if (gridCopy[newIndex + 6].startsWith("BK")) {
                        enemyPlayer.inCheck = true;
                    }
                }

                else if (gridCopy[newIndex + 15] != undefined) {
                    if (gridCopy[newIndex + 15].startsWith("BK")) {
                        enemyPlayer.inCheck = true;
                    }
                } */
            }

            else if (piece.color == "B") {

                // Moving 2 squares up and 1 square right
                if (pieceCurrentIndex - newIndex == 15) {
                    if (gridCopy[newIndex].startsWith("B") || gridCopy[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                    }

                    else {
                        gridCopy[pieceCurrentIndex] = "|||";
                        gridCopy[newIndex] = pieceString;
                    }
                }

                // Moving 1 square up and 2 squares right
                else if (pieceCurrentIndex - newIndex == 6) {
                    if (gridCopy[newIndex].startsWith("B") || gridCopy[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                    }

                    else {
                        gridCopy[pieceCurrentIndex] = "|||";
                        gridCopy[newIndex] = pieceString;
                    }
                }

                // Moving 2 squares up and 1 square left
                else if (pieceCurrentIndex - newIndex == 17) {
                    if (gridCopy[newIndex].startsWith("B") || gridCopy[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                    }

                    else {
                        gridCopy[pieceCurrentIndex] = "|||";
                        gridCopy[newIndex] = pieceString;
                    }
                }

                // Moving 1 square up and 2 squares left
                else if (pieceCurrentIndex - newIndex == 10) {
                    if (gridCopy[newIndex].startsWith("B") || gridCopy[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                    }

                    else {
                        gridCopy[pieceCurrentIndex] = "|||";
                        gridCopy[newIndex] = pieceString;
                    }
                }

                // Moving 2 squares down and 1 square right
                else if (newIndex - pieceCurrentIndex == 17) {
                    if (gridCopy[newIndex].startsWith("B") || gridCopy[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                    }

                    else {
                        gridCopy[pieceCurrentIndex] = "|||";
                        gridCopy[newIndex] = pieceString;
                    }
                }

                // Moving 1 square down and 2 squares right
                else if (newIndex - pieceCurrentIndex == 10) {
                    if (gridCopy[newIndex].startsWith("B") || gridCopy[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                    }

                    else {
                        gridCopy[pieceCurrentIndex] = "|||";
                        gridCopy[newIndex] = pieceString;
                    }
                }

                // Moving 2 squares down and 1 square left
                else if (newIndex - pieceCurrentIndex == 15) {
                    if (gridCopy[newIndex].startsWith("B") || gridCopy[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                    }

                    else {
                        gridCopy[pieceCurrentIndex] = "|||";
                        gridCopy[newIndex] = pieceString;
                    }
                }

                // Moving 1 square down and 2 squares left
                else if (newIndex - pieceCurrentIndex == 6) {
                    if (gridCopy[newIndex].startsWith("B") || gridCopy[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                    }

                    else {
                        gridCopy[pieceCurrentIndex] = "|||";
                        gridCopy[newIndex] = pieceString;
                    }
                }

                /*
                // Check if enemy king is in check
                if (gridCopy[newIndex - 15] != undefined) {
                    if (gridCopy[newIndex - 15].startsWith("WK")) {
                        enemyPlayer.inCheck = true;
                    }
                }

                else if (gridCopy[newIndex - 6] != undefined) {
                    if (gridCopy[newIndex - 6].startsWith("WK")) {
                        enemyPlayer.inCheck = true;
                    }
                }

                else if (gridCopy[newIndex - 17] != undefined) {
                    if (gridCopy[newIndex - 17].startsWith("WK")) {
                        enemyPlayer.inCheck = true;
                    }
                }

                else if (gridCopy[newIndex - 10] != undefined) {
                    if (gridCopy[newIndex - 10].startsWith("WK")) {
                        enemyPlayer.inCheck = true;
                    }
                }

                else if (gridCopy[newIndex + 17] != undefined) {
                    if (gridCopy[newIndex + 17].startsWith("WK")) {
                        enemyPlayer.inCheck = true;
                    }
                }

                else if (gridCopy[newIndex + 10] != undefined) {
                    if (gridCopy[newIndex + 10].startsWith("WK")) {
                        enemyPlayer.inCheck = true;
                    }
                }

                else if (gridCopy[newIndex + 6] != undefined) {
                    if (gridCopy[newIndex + 6].startsWith("WK")) {
                        enemyPlayer.inCheck = true;
                    }
                }

                else if (gridCopy[newIndex + 15] != undefined) {
                    if (gridCopy[newIndex + 15].startsWith("WK")) {
                        enemyPlayer.inCheck = true;
                    }
                } */
            }
        }

        else if (piece.name == "Q") {
            
            if (piece.color == "W") {
                
                // Moving up and capturing
                if (pieceCurrentIndex - newIndex == 8 || pieceCurrentIndex - newIndex == 16
                    || pieceCurrentIndex - newIndex == 24 || pieceCurrentIndex - newIndex == 32 
                    || pieceCurrentIndex - newIndex == 40 || pieceCurrentIndex - newIndex == 48 
                    || pieceCurrentIndex - newIndex == 56) {

                    let notAllEmpty = false;

                    for (let i = pieceCurrentIndex - 8; i > newIndex; i -= 8) {
                        if ((gridCopy[i] != "|||") && pieceCurrentIndex - newIndex != 8) {
                            notAllEmpty = true;
                        }
                    }

                    if (notAllEmpty == false) {
                        if (gridCopy[newIndex].startsWith("W") || gridCopy[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            gridCopy[pieceCurrentIndex] = "|||";
                            gridCopy[newIndex] = pieceString;
                        }
                    }
                }

                // Moving down and capturing
                else if (newIndex - pieceCurrentIndex == 8 || newIndex - pieceCurrentIndex == 16
                    || newIndex - pieceCurrentIndex == 24 || newIndex - pieceCurrentIndex == 32 
                    || newIndex - pieceCurrentIndex == 40 || newIndex - pieceCurrentIndex == 48 
                    || newIndex - pieceCurrentIndex == 56) {
                        
                    let notAllEmpty = false;

                    for (let i = pieceCurrentIndex + 8; i < newIndex; i += 8) {
                        if ((gridCopy[i] != "|||") && (newIndex - pieceCurrentIndex != 8)) {
                            notAllEmpty = true;
                        }
                    }

                    if (notAllEmpty == false) {
                        if (gridCopy[newIndex].startsWith("W") || gridCopy[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            gridCopy[pieceCurrentIndex] = "|||";
                            gridCopy[newIndex] = pieceString;
                        }
                    }
                }

                // Moving right and capturing
                else if (newIndex - pieceCurrentIndex == 1 || newIndex - pieceCurrentIndex == 2
                    || newIndex - pieceCurrentIndex == 3 || newIndex - pieceCurrentIndex == 4 
                    || newIndex - pieceCurrentIndex == 5 || newIndex - pieceCurrentIndex == 6 
                    || newIndex - pieceCurrentIndex == 7) {

                    if (((newIndex >= 0 && newIndex < 8) && (pieceCurrentIndex >= 0 && pieceCurrentIndex < 8))
                    || ((newIndex >= 8 && newIndex < 16) && (pieceCurrentIndex >= 8 && pieceCurrentIndex < 16))
                    || ((newIndex >= 16 && newIndex < 24) && (pieceCurrentIndex >= 16 && pieceCurrentIndex < 24))
                    || ((newIndex >= 24 && newIndex < 32) && (pieceCurrentIndex >= 24 && pieceCurrentIndex < 32))
                    || ((newIndex >= 32 && newIndex < 40) && (pieceCurrentIndex >= 32 && pieceCurrentIndex < 40))
                    || ((newIndex >= 40 && newIndex < 48) && (pieceCurrentIndex >= 40 && pieceCurrentIndex < 48))
                    || ((newIndex >= 48 && newIndex < 56) && (pieceCurrentIndex >= 48 && pieceCurrentIndex < 56))
                    || ((newIndex >= 56 && newIndex < 64) && (pieceCurrentIndex >= 56 && pieceCurrentIndex < 64))) {
                        
                        let notAllEmpty = false;

                        for (let i = pieceCurrentIndex + 1; i < newIndex; i += 1) {
                            if ((gridCopy[i] != "|||") && (newIndex - pieceCurrentIndex != 1)) {
                                notAllEmpty = true;
                            }
                        }

                        if (notAllEmpty == false) {
                            if (gridCopy[newIndex].startsWith("W") || gridCopy[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                gridCopy[pieceCurrentIndex] = "|||";
                                gridCopy[newIndex] = pieceString;
                            }
                        }
                    }
                }

                // Moving left and capturing
                else if (pieceCurrentIndex - newIndex == 1 || pieceCurrentIndex - newIndex == 2
                    || pieceCurrentIndex - newIndex == 3 || pieceCurrentIndex - newIndex == 4 
                    || pieceCurrentIndex - newIndex == 5 || pieceCurrentIndex - newIndex == 6 
                    || pieceCurrentIndex - newIndex == 7) {
                    
                    if (((newIndex >= 0 && newIndex < 8) && (pieceCurrentIndex >= 0 && pieceCurrentIndex < 8))
                    || ((newIndex >= 8 && newIndex < 16) && (pieceCurrentIndex >= 8 && pieceCurrentIndex < 16))
                    || ((newIndex >= 16 && newIndex < 24) && (pieceCurrentIndex >= 16 && pieceCurrentIndex < 24))
                    || ((newIndex >= 24 && newIndex < 32) && (pieceCurrentIndex >= 24 && pieceCurrentIndex < 32))
                    || ((newIndex >= 32 && newIndex < 40) && (pieceCurrentIndex >= 32 && pieceCurrentIndex < 40))
                    || ((newIndex >= 40 && newIndex < 48) && (pieceCurrentIndex >= 40 && pieceCurrentIndex < 48))
                    || ((newIndex >= 48 && newIndex < 56) && (pieceCurrentIndex >= 48 && pieceCurrentIndex < 56))
                    || ((newIndex >= 56 && newIndex < 64) && (pieceCurrentIndex >= 56 && pieceCurrentIndex < 64))) {
                        
                        let notAllEmpty = false;

                        for (let i = pieceCurrentIndex - 1; i > newIndex; i -= 1) {
                            if ((gridCopy[i] != "|||") && pieceCurrentIndex - newIndex != 1) {
                                notAllEmpty = true;
                            }
                        }

                        if (notAllEmpty == false) {
                            if (gridCopy[newIndex].startsWith("W") || gridCopy[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                gridCopy[pieceCurrentIndex] = "|||";
                                gridCopy[newIndex] = pieceString;
                            }
                        }
                    }
                }

                // Moving up and to the right
                if (pieceCurrentIndex - newIndex == 7 || pieceCurrentIndex - newIndex == 14
                    || pieceCurrentIndex - newIndex == 21 || pieceCurrentIndex - newIndex == 28 
                    || pieceCurrentIndex - newIndex == 35 || pieceCurrentIndex - newIndex == 42 
                    || pieceCurrentIndex - newIndex == 49) {

                    let notAllEmpty = false;
                    let hitEdge = false;

                    for (let i = pieceCurrentIndex - 7; i > newIndex; i -= 7) {
                        if ((gridCopy[i] != "|||") && pieceCurrentIndex - newIndex != 7) {
                            notAllEmpty = true;
                        }

                        if ((i == 7 && newIndex < i) || (i == 15 && newIndex < i) 
                            || (i == 23 && newIndex < i) || (i == 31 && newIndex < i) 
                            || (i == 39 && newIndex < i) || (i == 47 && newIndex < i) 
                            || (i == 55 && newIndex < i)) {

                            hitEdge = true;
                            break;
                        }
                    }

                    if (notAllEmpty == false && hitEdge == false) {
                        if (gridCopy[newIndex].startsWith("W") || gridCopy[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            gridCopy[pieceCurrentIndex] = "|||";
                            gridCopy[newIndex] = pieceString;
                        }
                    }      
                }

                // Moving up and to the left
                else if (pieceCurrentIndex - newIndex == 9 || pieceCurrentIndex - newIndex == 18
                    || pieceCurrentIndex - newIndex == 27 || pieceCurrentIndex - newIndex == 36 
                    || pieceCurrentIndex - newIndex == 45 || pieceCurrentIndex - newIndex == 54 
                    || pieceCurrentIndex - newIndex == 63) {
                    
                    let notAllEmpty = false;
                    let hitEdge = false;

                    for (let i = pieceCurrentIndex - 9; i > newIndex; i -= 9) {
                        if ((gridCopy[i] != "|||") && pieceCurrentIndex - newIndex != 9) {
                            notAllEmpty = true;
                        }

                        if ((i == 8 && newIndex < i) || (i == 16 && newIndex < i) 
                            || (i == 24 && newIndex < i) || (i == 32 && newIndex < i) 
                            || (i == 40 && newIndex < i) || (i == 48 && newIndex < i) ) {

                            hitEdge = true;
                            break;
                        }
                    }

                    if (notAllEmpty == false && hitEdge == false) {
                        if (gridCopy[newIndex].startsWith("W") || gridCopy[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            gridCopy[pieceCurrentIndex] = "|||";
                            gridCopy[newIndex] = pieceString;
                        }
                    }     
                }

                // Moving down and to the right
                else if (newIndex - pieceCurrentIndex == 9 || newIndex - pieceCurrentIndex == 18
                    || newIndex - pieceCurrentIndex == 27 || newIndex - pieceCurrentIndex == 36 
                    || newIndex - pieceCurrentIndex == 45 || newIndex - pieceCurrentIndex == 54 
                    || newIndex - pieceCurrentIndex == 63) {
                    
                    let notAllEmpty = false;
                    let hitEdge = false;

                    for (let i = pieceCurrentIndex + 9; i < newIndex; i += 9) {
                        if ((gridCopy[i] != "|||") && newIndex - pieceCurrentIndex != 9) {
                            notAllEmpty = true;
                        }

                        if ((i == 15 && newIndex > i) || (i == 23 && newIndex > i) 
                            || (i == 31 && newIndex > i) || (i == 39 && newIndex > i) 
                            || (i == 47 && newIndex > i) || (i == 55 && newIndex > i)) {

                            hitEdge = true;
                            break;
                        }
                    }

                    if (notAllEmpty == false && hitEdge == false) {
                        if (gridCopy[newIndex].startsWith("W") || gridCopy[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            gridCopy[pieceCurrentIndex] = "|||";
                            gridCopy[newIndex] = pieceString;
                        }
                    }     
                }

                // Moving down and to the left
                else if (newIndex - pieceCurrentIndex == 7 || newIndex - pieceCurrentIndex == 14
                    || newIndex - pieceCurrentIndex == 21 || newIndex - pieceCurrentIndex == 28 
                    || newIndex - pieceCurrentIndex == 35 || newIndex - pieceCurrentIndex == 42 
                    || newIndex - pieceCurrentIndex == 49) {
                    
                    let notAllEmpty = false;
                    let hitEdge = false;

                    for (let i = pieceCurrentIndex + 7; i < newIndex; i += 7) {
                        if ((gridCopy[i] != "|||") && newIndex - pieceCurrentIndex != 7) {
                            notAllEmpty = true;
                        }

                        if ((i == 8 && newIndex > i) || (i == 16 && newIndex > i) 
                            || (i == 24 && newIndex > i) || (i == 32 && newIndex > i) 
                            || (i == 40 && newIndex > i) || (i == 48 && newIndex > i) ) {

                            hitEdge = true;
                            break;
                        }
                    }

                    if (notAllEmpty == false && hitEdge == false) {
                        if (gridCopy[newIndex].startsWith("W") || gridCopy[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            gridCopy[pieceCurrentIndex] = "|||";
                            gridCopy[newIndex] = pieceString;
                        }
                    }   
                }

                /*
                // Check if enemy king is in check upwards
                for (let i = newIndex - 8; i >= 0; i -= 8) {
                    if (gridCopy[i].startsWith("BK") == false && gridCopy[i].startsWith("|||") == false) {
                        break;
                    }

                    else if (gridCopy[i].startsWith("BK")) {
                        enemyPlayer.inCheck = true;
                        break;
                    }
                }

                // Check if enemy king is in check downwards
                for (let i = newIndex + 8; i <= 63; i += 8) {
                    if (gridCopy[i].startsWith("BK") == false && gridCopy[i].startsWith("|||") == false) {
                        break;
                    }

                    else if (gridCopy[i].startsWith("BK")) {
                        enemyPlayer.inCheck = true;
                        break;
                    }
                }

                // Check if enemy king is in check right
                if (newIndex >= 0 && newIndex < 8) {
                    for (let i = newIndex + 1; i < 8; i++) {
                        if (gridCopy[i].startsWith("BK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 8 && newIndex < 16) {
                    for (let i = newIndex + 1; i < 16; i++) {
                        if (gridCopy[i].startsWith("BK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 16 && newIndex < 24) {
                    for (let i = newIndex + 1; i < 24; i++) {
                        if (gridCopy[i].startsWith("BK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 24 && newIndex < 32) {
                    for (let i = newIndex + 1; i < 32; i++) {
                        if (gridCopy[i].startsWith("BK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 32 && newIndex < 40) {
                    for (let i = newIndex + 1; i < 40; i++) {
                        if (gridCopy[i].startsWith("BK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 40 && newIndex < 48) {
                    for (let i = newIndex + 1; i < 48; i++) {
                        if (gridCopy[i].startsWith("BK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 48 && newIndex < 56) {
                    for (let i = newIndex + 1; i < 56; i++) {
                        if (gridCopy[i].startsWith("BK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 56 && newIndex < 64) {
                    for (let i = newIndex + 1; i < 64; i++) {
                        if (gridCopy[i].startsWith("BK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                // Check if enemy king is in check left
                if (newIndex >= 0 && newIndex < 8) {
                    for (let i = newIndex - 1; i >= 0; i--) {
                        if (gridCopy[i].startsWith("BK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 8 && newIndex < 16) {
                    for (let i = newIndex - 1; i >= 8; i--) {
                        if (gridCopy[i].startsWith("BK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 16 && newIndex < 24) {
                    for (let i = newIndex - 1; i >= 16; i--) {
                        if (gridCopy[i].startsWith("BK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 24 && newIndex < 32) {
                    for (let i = newIndex - 1; i >= 24; i--) {
                        if (gridCopy[i].startsWith("BK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 32 && newIndex < 40) {
                    for (let i = newIndex - 1; i >= 32; i--) {
                        if (gridCopy[i].startsWith("BK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 40 && newIndex < 48) {
                    for (let i = newIndex - 1; i >= 40; i--) {
                        if (gridCopy[i].startsWith("BK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 48 && newIndex < 56) {
                    for (let i = newIndex - 1; i >= 48; i--) {
                        if (gridCopy[i].startsWith("BK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 56 && newIndex < 64) {
                    for (let i = newIndex - 1; i >= 56; i--) {
                        if (gridCopy[i].startsWith("BK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("BK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                // Check if enemy king is in check up and to the right
                for (let i = newIndex - 7; i >= 0; i -= 7) {
                    if (gridCopy[i].startsWith("BK") == false && gridCopy[i].startsWith("|||") == false) {
                        break;
                    }

                    else if (gridCopy[i].startsWith("BK")) {
                        enemyPlayer.inCheck = true;
                        break;
                    }

                    if (i == 7 || i == 15 || i == 23 || i == 31 || i == 39 || i == 47 || i == 55) {
                        break;
                    }
                }

                // Check if enemy king is in check up and to the left
                for (let i = newIndex - 9; i >= 0; i -= 9) {
                    if (gridCopy[i].startsWith("BK") == false && gridCopy[i].startsWith("|||") == false) {
                        break;
                    }

                    else if (gridCopy[i].startsWith("BK")) {
                        enemyPlayer.inCheck = true;
                        break;
                    }

                    if (i == 0 || i == 8 || i == 16 || i == 24 || i == 32 || i == 40 || i == 48) {
                        break;
                    }
                }

                // Check if enemy king is in check down and to the right
                for (let i = newIndex + 9; i <= 63; i += 9) {
                    if (gridCopy[i].startsWith("BK") == false && gridCopy[i].startsWith("|||") == false) {
                        break;
                    }

                    else if (gridCopy[i].startsWith("BK")) {
                        enemyPlayer.inCheck = true;
                        break;
                    }

                    if (i == 15 || i == 23 || i == 31 || i == 39 || i == 47 || i == 55 || i == 63) {
                        break;
                    }
                }

                // Check if enemy king is in check down and to the left
                for (let i = newIndex + 7; i <= 63; i += 7) {
                    if (gridCopy[i].startsWith("BK") == false && gridCopy[i].startsWith("|||") == false) {
                        break;
                    }

                    else if (gridCopy[i].startsWith("BK")) {
                        enemyPlayer.inCheck = true;
                        break;
                    }

                    if (i == 8 || i == 16 || i == 24 || i == 32 || i == 40 || i == 48 || i == 56) {
                        break;
                    }
                } */
            }

            else if (piece.color == "B") {

                // Moving up and capturing
                if (pieceCurrentIndex - newIndex == 8 || pieceCurrentIndex - newIndex == 16
                    || pieceCurrentIndex - newIndex == 24 || pieceCurrentIndex - newIndex == 32 
                    || pieceCurrentIndex - newIndex == 40 || pieceCurrentIndex - newIndex == 48 
                    || pieceCurrentIndex - newIndex == 56) {

                    let notAllEmpty = false;

                    for (let i = pieceCurrentIndex - 8; i > newIndex; i -= 8) {
                        if ((gridCopy[i] != "|||") && pieceCurrentIndex - newIndex != 8) {
                            notAllEmpty = true;
                        }
                    }

                    if (notAllEmpty == false) {
                        if (gridCopy[newIndex].startsWith("B") || gridCopy[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            gridCopy[pieceCurrentIndex] = "|||";
                            gridCopy[newIndex] = pieceString;
                        }
                    }
                }

                // Moving down and capturing
                else if (newIndex - pieceCurrentIndex == 8 || newIndex - pieceCurrentIndex == 16
                    || newIndex - pieceCurrentIndex == 24 || newIndex - pieceCurrentIndex == 32 
                    || newIndex - pieceCurrentIndex == 40 || newIndex - pieceCurrentIndex == 48 
                    || newIndex - pieceCurrentIndex == 56) {
                        
                    let notAllEmpty = false;

                    for (let i = pieceCurrentIndex + 8; i < newIndex; i += 8) {
                        if ((gridCopy[i] != "|||") && (newIndex - pieceCurrentIndex != 8)) {
                            notAllEmpty = true;
                        }
                    }

                    if (notAllEmpty == false) {
                        if (gridCopy[newIndex].startsWith("B") || gridCopy[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            gridCopy[pieceCurrentIndex] = "|||";
                            gridCopy[newIndex] = pieceString;
                        }
                    }
                }

                // Moving right and capturing
                else if (newIndex - pieceCurrentIndex == 1 || newIndex - pieceCurrentIndex == 2
                    || newIndex - pieceCurrentIndex == 3 || newIndex - pieceCurrentIndex == 4 
                    || newIndex - pieceCurrentIndex == 5 || newIndex - pieceCurrentIndex == 6 
                    || newIndex - pieceCurrentIndex == 7) {

                    if (((newIndex >= 0 && newIndex < 8) && (pieceCurrentIndex >= 0 && pieceCurrentIndex < 8))
                    || ((newIndex >= 8 && newIndex < 16) && (pieceCurrentIndex >= 8 && pieceCurrentIndex < 16))
                    || ((newIndex >= 16 && newIndex < 24) && (pieceCurrentIndex >= 16 && pieceCurrentIndex < 24))
                    || ((newIndex >= 24 && newIndex < 32) && (pieceCurrentIndex >= 24 && pieceCurrentIndex < 32))
                    || ((newIndex >= 32 && newIndex < 40) && (pieceCurrentIndex >= 32 && pieceCurrentIndex < 40))
                    || ((newIndex >= 40 && newIndex < 48) && (pieceCurrentIndex >= 40 && pieceCurrentIndex < 48))
                    || ((newIndex >= 48 && newIndex < 56) && (pieceCurrentIndex >= 48 && pieceCurrentIndex < 56))
                    || ((newIndex >= 56 && newIndex < 64) && (pieceCurrentIndex >= 56 && pieceCurrentIndex < 64))) {
                        
                        let notAllEmpty = false;

                        for (let i = pieceCurrentIndex + 1; i < newIndex; i += 1) {
                            if ((gridCopy[i] != "|||") && (newIndex - pieceCurrentIndex != 1)) {
                                notAllEmpty = true;
                            }
                        }

                        if (notAllEmpty == false) {
                            if (gridCopy[newIndex].startsWith("B") || gridCopy[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                gridCopy[pieceCurrentIndex] = "|||";
                                gridCopy[newIndex] = pieceString;
                            }
                        }
                    }
                }

                // Moving left and capturing
                else if (pieceCurrentIndex - newIndex == 1 || pieceCurrentIndex - newIndex == 2
                    || pieceCurrentIndex - newIndex == 3 || pieceCurrentIndex - newIndex == 4 
                    || pieceCurrentIndex - newIndex == 5 || pieceCurrentIndex - newIndex == 6 
                    || pieceCurrentIndex - newIndex == 7) {
                    
                    if (((newIndex >= 0 && newIndex < 8) && (pieceCurrentIndex >= 0 && pieceCurrentIndex < 8))
                    || ((newIndex >= 8 && newIndex < 16) && (pieceCurrentIndex >= 8 && pieceCurrentIndex < 16))
                    || ((newIndex >= 16 && newIndex < 24) && (pieceCurrentIndex >= 16 && pieceCurrentIndex < 24))
                    || ((newIndex >= 24 && newIndex < 32) && (pieceCurrentIndex >= 24 && pieceCurrentIndex < 32))
                    || ((newIndex >= 32 && newIndex < 40) && (pieceCurrentIndex >= 32 && pieceCurrentIndex < 40))
                    || ((newIndex >= 40 && newIndex < 48) && (pieceCurrentIndex >= 40 && pieceCurrentIndex < 48))
                    || ((newIndex >= 48 && newIndex < 56) && (pieceCurrentIndex >= 48 && pieceCurrentIndex < 56))
                    || ((newIndex >= 56 && newIndex < 64) && (pieceCurrentIndex >= 56 && pieceCurrentIndex < 64))) {
                        
                        let notAllEmpty = false;

                        for (let i = pieceCurrentIndex - 1; i > newIndex; i -= 1) {
                            if ((gridCopy[i] != "|||") && pieceCurrentIndex - newIndex != 1) {
                                notAllEmpty = true;
                            }
                        }

                        if (notAllEmpty == false) {
                            if (gridCopy[newIndex].startsWith("B") || gridCopy[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                gridCopy[pieceCurrentIndex] = "|||";
                                gridCopy[newIndex] = pieceString;
                            }
                        }
                    }
                }

                // Moving up and to the right
                if (pieceCurrentIndex - newIndex == 7 || pieceCurrentIndex - newIndex == 14
                    || pieceCurrentIndex - newIndex == 21 || pieceCurrentIndex - newIndex == 28 
                    || pieceCurrentIndex - newIndex == 35 || pieceCurrentIndex - newIndex == 42 
                    || pieceCurrentIndex - newIndex == 49) {

                    let notAllEmpty = false;
                    let hitEdge = false;

                    for (let i = pieceCurrentIndex - 7; i > newIndex; i -= 7) {
                        if ((gridCopy[i] != "|||") && pieceCurrentIndex - newIndex != 7) {
                            notAllEmpty = true;
                        }

                        if ((i == 7 && newIndex < i) || (i == 15 && newIndex < i) 
                            || (i == 23 && newIndex < i) || (i == 31 && newIndex < i) 
                            || (i == 39 && newIndex < i) || (i == 47 && newIndex < i) 
                            || (i == 55 && newIndex < i)) {

                            hitEdge = true;
                            break;
                        }
                    }

                    if (notAllEmpty == false && hitEdge == false) {
                        if (gridCopy[newIndex].startsWith("B") || gridCopy[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            gridCopy[pieceCurrentIndex] = "|||";
                            gridCopy[newIndex] = pieceString;
                        }
                    }      
                }

                // Moving up and to the left
                else if (pieceCurrentIndex - newIndex == 9 || pieceCurrentIndex - newIndex == 18
                    || pieceCurrentIndex - newIndex == 27 || pieceCurrentIndex - newIndex == 36 
                    || pieceCurrentIndex - newIndex == 45 || pieceCurrentIndex - newIndex == 54 
                    || pieceCurrentIndex - newIndex == 63) {
                    
                    let notAllEmpty = false;
                    let hitEdge = false;

                    for (let i = pieceCurrentIndex - 9; i > newIndex; i -= 9) {
                        if ((gridCopy[i] != "|||") && pieceCurrentIndex - newIndex != 9) {
                            notAllEmpty = true;
                        }

                        if ((i == 8 && newIndex < i) || (i == 16 && newIndex < i) 
                            || (i == 24 && newIndex < i) || (i == 32 && newIndex < i) 
                            || (i == 40 && newIndex < i) || (i == 48 && newIndex < i) ) {

                            hitEdge = true;
                            break;
                        }
                    }

                    if (notAllEmpty == false && hitEdge == false) {
                        if (gridCopy[newIndex].startsWith("B") || gridCopy[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            gridCopy[pieceCurrentIndex] = "|||";
                            gridCopy[newIndex] = pieceString;
                        }
                    }     
                }

                // Moving down and to the right
                else if (newIndex - pieceCurrentIndex == 9 || newIndex - pieceCurrentIndex == 18
                    || newIndex - pieceCurrentIndex == 27 || newIndex - pieceCurrentIndex == 36 
                    || newIndex - pieceCurrentIndex == 45 || newIndex - pieceCurrentIndex == 54 
                    || newIndex - pieceCurrentIndex == 63) {
                    
                    let notAllEmpty = false;
                    let hitEdge = false;

                    for (let i = pieceCurrentIndex + 9; i < newIndex; i += 9) {
                        if ((gridCopy[i] != "|||") && newIndex - pieceCurrentIndex != 9) {
                            notAllEmpty = true;
                        }

                        if ((i == 15 && newIndex > i) || (i == 23 && newIndex > i) 
                            || (i == 31 && newIndex > i) || (i == 39 && newIndex > i) 
                            || (i == 47 && newIndex > i) || (i == 55 && newIndex > i)) {

                            hitEdge = true;
                            break;
                        }
                    }

                    if (notAllEmpty == false && hitEdge == false) {
                        if (gridCopy[newIndex].startsWith("B") || gridCopy[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            gridCopy[pieceCurrentIndex] = "|||";
                            gridCopy[newIndex] = pieceString;
                        }
                    }     
                }

                // Moving down and to the left
                else if (newIndex - pieceCurrentIndex == 7 || newIndex - pieceCurrentIndex == 14
                    || newIndex - pieceCurrentIndex == 21 || newIndex - pieceCurrentIndex == 28 
                    || newIndex - pieceCurrentIndex == 35 || newIndex - pieceCurrentIndex == 42 
                    || newIndex - pieceCurrentIndex == 49) {
                    
                    let notAllEmpty = false;
                    let hitEdge = false;

                    for (let i = pieceCurrentIndex + 7; i < newIndex; i += 7) {
                        if ((gridCopy[i] != "|||") && newIndex - pieceCurrentIndex != 7) {
                            notAllEmpty = true;
                        }

                        if ((i == 8 && newIndex > i) || (i == 16 && newIndex > i) 
                            || (i == 24 && newIndex > i) || (i == 32 && newIndex > i) 
                            || (i == 40 && newIndex > i) || (i == 48 && newIndex > i) ) {

                            hitEdge = true;
                            break;
                        }
                    }

                    if (notAllEmpty == false && hitEdge == false) {
                        if (gridCopy[newIndex].startsWith("B") || gridCopy[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            gridCopy[pieceCurrentIndex] = "|||";
                            gridCopy[newIndex] = pieceString;
                        }
                    }   
                }

                /*
                // Check if enemy king is in check upwards
                for (let i = newIndex - 8; i >= 0; i -= 8) {
                    if (gridCopy[i].startsWith("WK") == false && gridCopy[i].startsWith("|||") == false) {
                        break;
                    }

                    else if (gridCopy[i].startsWith("WK")) {
                        enemyPlayer.inCheck = true;
                        break;
                    }
                }

                // Check if enemy king is in check downwards
                for (let i = newIndex + 8; i <= 63; i += 8) {
                    if (gridCopy[i].startsWith("WK") == false && gridCopy[i].startsWith("|||") == false) {
                        break;
                    }

                    else if (gridCopy[i].startsWith("WK")) {
                        enemyPlayer.inCheck = true;
                        break;
                    }
                }

                // Check if enemy king is in check right
                if (newIndex >= 0 && newIndex < 8) {
                    for (let i = newIndex + 1; i < 8; i++) {
                        if (gridCopy[i].startsWith("WK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 8 && newIndex < 16) {
                    for (let i = newIndex + 1; i < 16; i++) {
                        if (gridCopy[i].startsWith("WK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 16 && newIndex < 24) {
                    for (let i = newIndex + 1; i < 24; i++) {
                        if (gridCopy[i].startsWith("WK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 24 && newIndex < 32) {
                    for (let i = newIndex + 1; i < 32; i++) {
                        if (gridCopy[i].startsWith("WK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 32 && newIndex < 40) {
                    for (let i = newIndex + 1; i < 40; i++) {
                        if (gridCopy[i].startsWith("WK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 40 && newIndex < 48) {
                    for (let i = newIndex + 1; i < 48; i++) {
                        if (gridCopy[i].startsWith("WK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 48 && newIndex < 56) {
                    for (let i = newIndex + 1; i < 56; i++) {
                        if (gridCopy[i].startsWith("WK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 56 && newIndex < 64) {
                    for (let i = newIndex + 1; i < 64; i++) {
                        if (gridCopy[i].startsWith("WK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                // Check if enemy king is in check left
                if (newIndex >= 0 && newIndex < 8) {
                    for (let i = newIndex - 1; i >= 0; i--) {
                        if (gridCopy[i].startsWith("WK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 8 && newIndex < 16) {
                    for (let i = newIndex - 1; i >= 8; i--) {
                        if (gridCopy[i].startsWith("WK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 16 && newIndex < 24) {
                    for (let i = newIndex - 1; i >= 16; i--) {
                        if (gridCopy[i].startsWith("WK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 24 && newIndex < 32) {
                    for (let i = newIndex - 1; i >= 24; i--) {
                        if (gridCopy[i].startsWith("WK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 32 && newIndex < 40) {
                    for (let i = newIndex - 1; i >= 32; i--) {
                        if (gridCopy[i].startsWith("WK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 40 && newIndex < 48) {
                    for (let i = newIndex - 1; i >= 40; i--) {
                        if (gridCopy[i].startsWith("WK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 48 && newIndex < 56) {
                    for (let i = newIndex - 1; i >= 48; i--) {
                        if (gridCopy[i].startsWith("WK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                else if (newIndex >= 56 && newIndex < 64) {
                    for (let i = newIndex - 1; i >= 56; i--) {
                        if (gridCopy[i].startsWith("WK") == false && gridCopy[i].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[i].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                            break;
                        }
                    }
                }

                // Check if enemy king is in check up and to the right
                for (let i = newIndex - 7; i >= 0; i -= 7) {
                    if (gridCopy[i].startsWith("WK") == false && gridCopy[i].startsWith("|||") == false) {
                        break;
                    }

                    else if (gridCopy[i].startsWith("WK")) {
                        enemyPlayer.inCheck = true;
                        break;
                    }

                    if (i == 7 || i == 15 || i == 23 || i == 31 || i == 39 || i == 47 || i == 55) {
                        break;
                    }
                }

                // Check if enemy king is in check up and to the left
                for (let i = newIndex - 9; i >= 0; i -= 9) {
                    if (gridCopy[i].startsWith("WK") == false && gridCopy[i].startsWith("|||") == false) {
                        break;
                    }

                    else if (gridCopy[i].startsWith("WK")) {
                        enemyPlayer.inCheck = true;
                        break;
                    }

                    if (i == 0 || i == 8 || i == 16 || i == 24 || i == 32 || i == 40 || i == 48) {
                        break;
                    }
                }

                // Check if enemy king is in check down and to the right
                for (let i = newIndex + 9; i <= 63; i += 9) {
                    if (gridCopy[i].startsWith("WK") == false && gridCopy[i].startsWith("|||") == false) {
                        break;
                    }

                    else if (gridCopy[i].startsWith("WK")) {
                        enemyPlayer.inCheck = true;
                        break;
                    }

                    if (i == 15 || i == 23 || i == 31 || i == 39 || i == 47 || i == 55 || i == 63) {
                        break;
                    }
                }

                // Check if enemy king is in check down and to the left
                for (let i = newIndex + 7; i <= 63; i += 7) {
                    if (gridCopy[i].startsWith("WK") == false && gridCopy[i].startsWith("|||") == false) {
                        break;
                    }

                    else if (gridCopy[i].startsWith("WK")) {
                        enemyPlayer.inCheck = true;
                        break;
                    }

                    if (i == 8 || i == 16 || i == 24 || i == 32 || i == 40 || i == 48 || i == 56) {
                        break;
                    }
                } */
            }
        }

        else if (piece.name == "K") {

            if (piece.color == "W") {

                // Moving up and capturing
                if (pieceCurrentIndex - newIndex == 8) {

                    let notAllEmpty = false;

                    for (let i = pieceCurrentIndex - 8; i > newIndex; i -= 8) {
                        if ((gridCopy[i] != "|||") && pieceCurrentIndex - newIndex != 8) {
                            notAllEmpty = true;
                        }
                    }

                    if (notAllEmpty == false) {
                        if (gridCopy[newIndex].startsWith("W") || gridCopy[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            for (let j = 0; j < 64; j++) {
                                if (gridCopy[j].startsWith("BK")) {
                                    if (newIndex == j + 8) {

                                    }

                                    else {
                                        gridCopy[pieceCurrentIndex] = "|||";
                                        gridCopy[newIndex] = pieceString;
                                    }

                                }
                            }
                        }
                    }
                }

                // Moving down and capturing
                else if (newIndex - pieceCurrentIndex == 8) {
                        
                    let notAllEmpty = false;

                    for (let i = pieceCurrentIndex + 8; i < newIndex; i += 8) {
                        if ((gridCopy[i] != "|||") && (newIndex - pieceCurrentIndex != 8)) {
                            notAllEmpty = true;
                        }
                    }

                    if (notAllEmpty == false) {
                        if (gridCopy[newIndex].startsWith("W") || gridCopy[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            for (let j = 0; j < 64; j++) {
                                if (gridCopy[j].startsWith("BK")) {
                                    if (newIndex == j - 8) {

                                    }

                                    else {
                                        gridCopy[pieceCurrentIndex] = "|||";
                                        gridCopy[newIndex] = pieceString;
                                    }

                                }
                            }
                        }
                    }
                }

                // Moving right and capturing
                else if (newIndex - pieceCurrentIndex == 1) {

                    if (((newIndex >= 0 && newIndex < 8) && (pieceCurrentIndex >= 0 && pieceCurrentIndex < 8))
                    || ((newIndex >= 8 && newIndex < 16) && (pieceCurrentIndex >= 8 && pieceCurrentIndex < 16))
                    || ((newIndex >= 16 && newIndex < 24) && (pieceCurrentIndex >= 16 && pieceCurrentIndex < 24))
                    || ((newIndex >= 24 && newIndex < 32) && (pieceCurrentIndex >= 24 && pieceCurrentIndex < 32))
                    || ((newIndex >= 32 && newIndex < 40) && (pieceCurrentIndex >= 32 && pieceCurrentIndex < 40))
                    || ((newIndex >= 40 && newIndex < 48) && (pieceCurrentIndex >= 40 && pieceCurrentIndex < 48))
                    || ((newIndex >= 48 && newIndex < 56) && (pieceCurrentIndex >= 48 && pieceCurrentIndex < 56))
                    || ((newIndex >= 56 && newIndex < 64) && (pieceCurrentIndex >= 56 && pieceCurrentIndex < 64))) {
                        
                        let notAllEmpty = false;

                        for (let i = pieceCurrentIndex + 1; i < newIndex; i += 1) {
                            if ((gridCopy[i] != "|||") && (newIndex - pieceCurrentIndex != 1)) {
                                notAllEmpty = true;
                            }
                        }

                        if (notAllEmpty == false) {
                            if (gridCopy[newIndex].startsWith("W") || gridCopy[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                let nextToEnemyKing = false;

                                for (let j = 0; j < 64; j++) {
                                    if (gridCopy[j].startsWith("BK")) {
                                        if (((newIndex >= 0 && newIndex < 8) && (j >= 0 && j < 8))
                                        || ((newIndex >= 8 && newIndex < 16) && (j >= 8 && j < 16))
                                        || ((newIndex >= 16 && newIndex < 24) && (j >= 16 && j < 24))
                                        || ((newIndex >= 24 && newIndex < 32) && (j >= 24 && j < 32))
                                        || ((newIndex >= 32 && newIndex < 40) && (j >= 32 && j < 40))
                                        || ((newIndex >= 40 && newIndex < 48) && (j >= 40 && j < 48))
                                        || ((newIndex >= 48 && newIndex < 56) && (j >= 48 && j < 56))
                                        || ((newIndex >= 56 && newIndex < 64) && (j >= 56 && j < 64))) {
                                            if (newIndex == j - 1) {
                                                nextToEnemyKing = true;
                                            }
                                        }
                                    }
                                }

                                if (nextToEnemyKing == true) {

                                }

                                else {
                                    gridCopy[pieceCurrentIndex] = "|||";
                                    gridCopy[newIndex] = pieceString;
                                }
                            }
                        }
                    }
                }

                // Moving left and capturing
                else if (pieceCurrentIndex - newIndex == 1) {
                    
                    if (((newIndex >= 0 && newIndex < 8) && (pieceCurrentIndex >= 0 && pieceCurrentIndex < 8))
                    || ((newIndex >= 8 && newIndex < 16) && (pieceCurrentIndex >= 8 && pieceCurrentIndex < 16))
                    || ((newIndex >= 16 && newIndex < 24) && (pieceCurrentIndex >= 16 && pieceCurrentIndex < 24))
                    || ((newIndex >= 24 && newIndex < 32) && (pieceCurrentIndex >= 24 && pieceCurrentIndex < 32))
                    || ((newIndex >= 32 && newIndex < 40) && (pieceCurrentIndex >= 32 && pieceCurrentIndex < 40))
                    || ((newIndex >= 40 && newIndex < 48) && (pieceCurrentIndex >= 40 && pieceCurrentIndex < 48))
                    || ((newIndex >= 48 && newIndex < 56) && (pieceCurrentIndex >= 48 && pieceCurrentIndex < 56))
                    || ((newIndex >= 56 && newIndex < 64) && (pieceCurrentIndex >= 56 && pieceCurrentIndex < 64))) {
                        
                        let notAllEmpty = false;

                        for (let i = pieceCurrentIndex - 1; i > newIndex; i -= 1) {
                            if ((gridCopy[i] != "|||") && pieceCurrentIndex - newIndex != 1) {
                                notAllEmpty = true;
                            }
                        }

                        if (notAllEmpty == false) {
                            if (gridCopy[newIndex].startsWith("W") || gridCopy[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                let nextToEnemyKing = false;
                                
                                for (let j = 0; j < 64; j++) {
                                    if (gridCopy[j].startsWith("BK")) {
                                        if (((newIndex >= 0 && newIndex < 8) && (j >= 0 && j < 8))
                                        || ((newIndex >= 8 && newIndex < 16) && (j >= 8 && j < 16))
                                        || ((newIndex >= 16 && newIndex < 24) && (j >= 16 && j < 24))
                                        || ((newIndex >= 24 && newIndex < 32) && (j >= 24 && j < 32))
                                        || ((newIndex >= 32 && newIndex < 40) && (j >= 32 && j < 40))
                                        || ((newIndex >= 40 && newIndex < 48) && (j >= 40 && j < 48))
                                        || ((newIndex >= 48 && newIndex < 56) && (j >= 48 && j < 56))
                                        || ((newIndex >= 56 && newIndex < 64) && (j >= 56 && j < 64))) {
                                            if (newIndex == j + 1) {
                                                nextToEnemyKing = true;
                                            }
                                        }
                                    }
                                }

                                if (nextToEnemyKing == true) {

                                }

                                else {
                                    gridCopy[pieceCurrentIndex] = "|||";
                                    gridCopy[newIndex] = pieceString;
                                }
                            }
                        }
                    }
                }

                // Moving up and to the right
                if (pieceCurrentIndex - newIndex == 7) {

                    let notAllEmpty = false;
                    let hitEdge = false;

                    for (let i = pieceCurrentIndex - 7; i > newIndex; i -= 7) {
                        if ((gridCopy[i] != "|||") && pieceCurrentIndex - newIndex != 7) {
                            notAllEmpty = true;
                        }

                        if ((i == 7 && newIndex < i) || (i == 15 && newIndex < i) 
                            || (i == 23 && newIndex < i) || (i == 31 && newIndex < i) 
                            || (i == 39 && newIndex < i) || (i == 47 && newIndex < i) 
                            || (i == 55 && newIndex < i)) {

                            hitEdge = true;
                            break;
                        }
                    }

                    if (notAllEmpty == false && hitEdge == false) {
                        if (gridCopy[newIndex].startsWith("W") || gridCopy[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            let nextToEnemyKing = false;

                            for (let j = 0; j < 64; j++) {
                                if (gridCopy[j].startsWith("BK")) {
                                    if (newIndex != 7 || newIndex != 15 || newIndex != 23 
                                    || newIndex != 31 || newIndex != 39 || newIndex != 47
                                    || newIndex != 55) {
                                        if (newIndex == j + 7) {
                                            nextToEnemyKing = true;
                                        }
                                    }
                                }
                            }

                            if (nextToEnemyKing == true) {

                            }

                            else {
                                gridCopy[pieceCurrentIndex] = "|||";
                                gridCopy[newIndex] = pieceString;
                            }
                        }
                    }      
                }

                // Moving up and to the left
                else if (pieceCurrentIndex - newIndex == 9) {
                    
                    let notAllEmpty = false;
                    let hitEdge = false;

                    for (let i = pieceCurrentIndex - 9; i > newIndex; i -= 9) {
                        if ((gridCopy[i] != "|||") && pieceCurrentIndex - newIndex != 9) {
                            notAllEmpty = true;
                        }

                        if ((i == 8 && newIndex < i) || (i == 16 && newIndex < i) 
                            || (i == 24 && newIndex < i) || (i == 32 && newIndex < i) 
                            || (i == 40 && newIndex < i) || (i == 48 && newIndex < i) ) {

                            hitEdge = true;
                            break;
                        }
                    }

                    if (notAllEmpty == false && hitEdge == false) {
                        if (gridCopy[newIndex].startsWith("W") || gridCopy[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            let nextToEnemyKing = false;

                            for (let j = 0; j < 64; j++) {
                                if (gridCopy[j].startsWith("BK")) {
                                    if (newIndex != 8 || newIndex != 16 || newIndex != 24 
                                    || newIndex != 32 || newIndex != 40 || newIndex != 48) {
                                        if (newIndex == j + 9) {
                                            nextToEnemyKing = true;
                                        }
                                    }
                                }
                            }

                            if (nextToEnemyKing == true) {

                            }

                            else {
                                gridCopy[pieceCurrentIndex] = "|||";
                                gridCopy[newIndex] = pieceString;
                            }
                        }
                    }     
                }

                // Moving down and to the right
                else if (newIndex - pieceCurrentIndex == 9) {
                    
                    let notAllEmpty = false;
                    let hitEdge = false;

                    for (let i = pieceCurrentIndex + 9; i < newIndex; i += 9) {
                        if ((gridCopy[i] != "|||") && newIndex - pieceCurrentIndex != 9) {
                            notAllEmpty = true;
                        }

                        if ((i == 15 && newIndex > i) || (i == 23 && newIndex > i) 
                            || (i == 31 && newIndex > i) || (i == 39 && newIndex > i) 
                            || (i == 47 && newIndex > i) || (i == 55 && newIndex > i)) {

                            hitEdge = true;
                            break;
                        }
                    }

                    if (notAllEmpty == false && hitEdge == false) {
                        if (gridCopy[newIndex].startsWith("W") || gridCopy[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            let nextToEnemyKing = false;

                            for (let j = 0; j < 64; j++) {
                                if (gridCopy[j].startsWith("BK")) {
                                    if (newIndex != 15 || newIndex != 23 || newIndex != 31 
                                    || newIndex != 39 || newIndex != 47 || newIndex != 55) {
                                        if (newIndex == j - 9) {
                                            nextToEnemyKing = true;
                                        }
                                    }
                                }
                            }

                            if (nextToEnemyKing == true) {

                            }

                            else {
                                gridCopy[pieceCurrentIndex] = "|||";
                                gridCopy[newIndex] = pieceString;
                            }
                        }
                    }     
                }

                // Moving down and to the left
                else if (newIndex - pieceCurrentIndex == 7) {
                    
                    let notAllEmpty = false;
                    let hitEdge = false;

                    for (let i = pieceCurrentIndex + 7; i < newIndex; i += 7) {
                        if ((gridCopy[i] != "|||") && newIndex - pieceCurrentIndex != 7) {
                            notAllEmpty = true;
                        }

                        if ((i == 8 && newIndex > i) || (i == 16 && newIndex > i) 
                            || (i == 24 && newIndex > i) || (i == 32 && newIndex > i) 
                            || (i == 40 && newIndex > i) || (i == 48 && newIndex > i) ) {

                            hitEdge = true;
                            break;
                        }
                    }

                    if (notAllEmpty == false && hitEdge == false) {
                        if (gridCopy[newIndex].startsWith("W") || gridCopy[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            let nextToEnemyKing = false;

                            for (let j = 0; j < 64; j++) {
                                if (gridCopy[j].startsWith("BK")) {
                                    if (newIndex != 8 || newIndex != 16 || newIndex != 24 
                                    || newIndex != 32 || newIndex != 40 || newIndex != 48) {
                                        if (newIndex == j - 7) {
                                            nextToEnemyKing = true;
                                        }
                                    }
                                }
                            }

                            if (nextToEnemyKing == true) {

                            }

                            else {
                                gridCopy[pieceCurrentIndex] = "|||";
                                gridCopy[newIndex] = pieceString;
                            }
                        }
                    }   
                }
            }

            else if (piece.color == "B") {

                // Moving up and capturing
                if (pieceCurrentIndex - newIndex == 8) {

                    let notAllEmpty = false;

                    for (let i = pieceCurrentIndex - 8; i > newIndex; i -= 8) {
                        if ((gridCopy[i] != "|||") && pieceCurrentIndex - newIndex != 8) {
                            notAllEmpty = true;
                        }
                    }

                    if (notAllEmpty == false) {
                        if (gridCopy[newIndex].startsWith("B") || gridCopy[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            for (let j = 0; j < 64; j++) {
                                if (gridCopy[j].startsWith("WK")) {
                                    if (newIndex == j + 8) {

                                    }

                                    else {
                                        gridCopy[pieceCurrentIndex] = "|||";
                                        gridCopy[newIndex] = pieceString;
                                    }

                                }
                            }
                        }
                    }
                }

                // Moving down and capturing
                else if (newIndex - pieceCurrentIndex == 8) {
                        
                    let notAllEmpty = false;

                    for (let i = pieceCurrentIndex + 8; i < newIndex; i += 8) {
                        if ((gridCopy[i] != "|||") && (newIndex - pieceCurrentIndex != 8)) {
                            notAllEmpty = true;
                        }
                    }

                    if (notAllEmpty == false) {
                        if (gridCopy[newIndex].startsWith("B") || gridCopy[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            for (let j = 0; j < 64; j++) {
                                if (gridCopy[j].startsWith("WK")) {
                                    if (newIndex == j - 8) {

                                    }

                                    else {
                                        gridCopy[pieceCurrentIndex] = "|||";
                                        gridCopy[newIndex] = pieceString;
                                    }

                                }
                            }
                        }
                    }
                }

                // Moving right and capturing
                else if (newIndex - pieceCurrentIndex == 1) {

                    if (((newIndex >= 0 && newIndex < 8) && (pieceCurrentIndex >= 0 && pieceCurrentIndex < 8))
                    || ((newIndex >= 8 && newIndex < 16) && (pieceCurrentIndex >= 8 && pieceCurrentIndex < 16))
                    || ((newIndex >= 16 && newIndex < 24) && (pieceCurrentIndex >= 16 && pieceCurrentIndex < 24))
                    || ((newIndex >= 24 && newIndex < 32) && (pieceCurrentIndex >= 24 && pieceCurrentIndex < 32))
                    || ((newIndex >= 32 && newIndex < 40) && (pieceCurrentIndex >= 32 && pieceCurrentIndex < 40))
                    || ((newIndex >= 40 && newIndex < 48) && (pieceCurrentIndex >= 40 && pieceCurrentIndex < 48))
                    || ((newIndex >= 48 && newIndex < 56) && (pieceCurrentIndex >= 48 && pieceCurrentIndex < 56))
                    || ((newIndex >= 56 && newIndex < 64) && (pieceCurrentIndex >= 56 && pieceCurrentIndex < 64))) {
                        
                        let notAllEmpty = false;

                        for (let i = pieceCurrentIndex + 1; i < newIndex; i += 1) {
                            if ((gridCopy[i] != "|||") && (newIndex - pieceCurrentIndex != 1)) {
                                notAllEmpty = true;
                            }
                        }

                        if (notAllEmpty == false) {
                            if (gridCopy[newIndex].startsWith("B") || gridCopy[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                let nextToEnemyKing = false;

                                for (let j = 0; j < 64; j++) {
                                    if (gridCopy[j].startsWith("WK")) {
                                        if (((newIndex >= 0 && newIndex < 8) && (j >= 0 && j < 8))
                                        || ((newIndex >= 8 && newIndex < 16) && (j >= 8 && j < 16))
                                        || ((newIndex >= 16 && newIndex < 24) && (j >= 16 && j < 24))
                                        || ((newIndex >= 24 && newIndex < 32) && (j >= 24 && j < 32))
                                        || ((newIndex >= 32 && newIndex < 40) && (j >= 32 && j < 40))
                                        || ((newIndex >= 40 && newIndex < 48) && (j >= 40 && j < 48))
                                        || ((newIndex >= 48 && newIndex < 56) && (j >= 48 && j < 56))
                                        || ((newIndex >= 56 && newIndex < 64) && (j >= 56 && j < 64))) {
                                            if (newIndex == j - 1) {
                                                nextToEnemyKing = true;
                                            }
                                        }
                                    }
                                }

                                if (nextToEnemyKing == true) {

                                }

                                else {
                                    gridCopy[pieceCurrentIndex] = "|||";
                                    gridCopy[newIndex] = pieceString;
                                }
                            }
                        }
                    }
                }

                // Moving left and capturing
                else if (pieceCurrentIndex - newIndex == 1) {
                    
                    if (((newIndex >= 0 && newIndex < 8) && (pieceCurrentIndex >= 0 && pieceCurrentIndex < 8))
                    || ((newIndex >= 8 && newIndex < 16) && (pieceCurrentIndex >= 8 && pieceCurrentIndex < 16))
                    || ((newIndex >= 16 && newIndex < 24) && (pieceCurrentIndex >= 16 && pieceCurrentIndex < 24))
                    || ((newIndex >= 24 && newIndex < 32) && (pieceCurrentIndex >= 24 && pieceCurrentIndex < 32))
                    || ((newIndex >= 32 && newIndex < 40) && (pieceCurrentIndex >= 32 && pieceCurrentIndex < 40))
                    || ((newIndex >= 40 && newIndex < 48) && (pieceCurrentIndex >= 40 && pieceCurrentIndex < 48))
                    || ((newIndex >= 48 && newIndex < 56) && (pieceCurrentIndex >= 48 && pieceCurrentIndex < 56))
                    || ((newIndex >= 56 && newIndex < 64) && (pieceCurrentIndex >= 56 && pieceCurrentIndex < 64))) {
                        
                        let notAllEmpty = false;

                        for (let i = pieceCurrentIndex - 1; i > newIndex; i -= 1) {
                            if ((gridCopy[i] != "|||") && pieceCurrentIndex - newIndex != 1) {
                                notAllEmpty = true;
                            }
                        }

                        if (notAllEmpty == false) {
                            if (gridCopy[newIndex].startsWith("B") || gridCopy[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                let nextToEnemyKing = false;
                                
                                for (let j = 0; j < 64; j++) {
                                    if (gridCopy[j].startsWith("WK")) {
                                        if (((newIndex >= 0 && newIndex < 8) && (j >= 0 && j < 8))
                                        || ((newIndex >= 8 && newIndex < 16) && (j >= 8 && j < 16))
                                        || ((newIndex >= 16 && newIndex < 24) && (j >= 16 && j < 24))
                                        || ((newIndex >= 24 && newIndex < 32) && (j >= 24 && j < 32))
                                        || ((newIndex >= 32 && newIndex < 40) && (j >= 32 && j < 40))
                                        || ((newIndex >= 40 && newIndex < 48) && (j >= 40 && j < 48))
                                        || ((newIndex >= 48 && newIndex < 56) && (j >= 48 && j < 56))
                                        || ((newIndex >= 56 && newIndex < 64) && (j >= 56 && j < 64))) {
                                            if (newIndex == j + 1) {
                                                nextToEnemyKing = true;
                                            }
                                        }
                                    }
                                }

                                if (nextToEnemyKing == true) {

                                }

                                else {
                                    gridCopy[pieceCurrentIndex] = "|||";
                                    gridCopy[newIndex] = pieceString;
                                }
                            }
                        }
                    }
                }

                // Moving up and to the right
                if (pieceCurrentIndex - newIndex == 7) {

                    let notAllEmpty = false;
                    let hitEdge = false;

                    for (let i = pieceCurrentIndex - 7; i > newIndex; i -= 7) {
                        if ((gridCopy[i] != "|||") && pieceCurrentIndex - newIndex != 7) {
                            notAllEmpty = true;
                        }

                        if ((i == 7 && newIndex < i) || (i == 15 && newIndex < i) 
                            || (i == 23 && newIndex < i) || (i == 31 && newIndex < i) 
                            || (i == 39 && newIndex < i) || (i == 47 && newIndex < i) 
                            || (i == 55 && newIndex < i)) {

                            hitEdge = true;
                            break;
                        }
                    }

                    if (notAllEmpty == false && hitEdge == false) {
                        if (gridCopy[newIndex].startsWith("B") || gridCopy[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            let nextToEnemyKing = false;

                            for (let j = 0; j < 64; j++) {
                                if (gridCopy[j].startsWith("WK")) {
                                    if (newIndex != 7 || newIndex != 15 || newIndex != 23 
                                    || newIndex != 31 || newIndex != 39 || newIndex != 47
                                    || newIndex != 55) {
                                        if (newIndex == j + 7) {
                                            nextToEnemyKing = true;
                                        }
                                    }
                                }
                            }

                            if (nextToEnemyKing == true) {

                            }

                            else {
                                gridCopy[pieceCurrentIndex] = "|||";
                                gridCopy[newIndex] = pieceString;
                            }
                        }
                    }      
                }

                // Moving up and to the left
                else if (pieceCurrentIndex - newIndex == 9) {
                    
                    let notAllEmpty = false;
                    let hitEdge = false;

                    for (let i = pieceCurrentIndex - 9; i > newIndex; i -= 9) {
                        if ((gridCopy[i] != "|||") && pieceCurrentIndex - newIndex != 9) {
                            notAllEmpty = true;
                        }

                        if ((i == 8 && newIndex < i) || (i == 16 && newIndex < i) 
                            || (i == 24 && newIndex < i) || (i == 32 && newIndex < i) 
                            || (i == 40 && newIndex < i) || (i == 48 && newIndex < i) ) {

                            hitEdge = true;
                            break;
                        }
                    }

                    if (notAllEmpty == false && hitEdge == false) {
                        if (gridCopy[newIndex].startsWith("B") || gridCopy[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            let nextToEnemyKing = false;

                            for (let j = 0; j < 64; j++) {
                                if (gridCopy[j].startsWith("WK")) {
                                    if (newIndex != 8 || newIndex != 16 || newIndex != 24 
                                    || newIndex != 32 || newIndex != 40 || newIndex != 48) {
                                        if (newIndex == j + 9) {
                                            nextToEnemyKing = true;
                                        }
                                    }
                                }
                            }

                            if (nextToEnemyKing == true) {

                            }

                            else {
                                gridCopy[pieceCurrentIndex] = "|||";
                                gridCopy[newIndex] = pieceString;
                            }
                        }
                    }     
                }

                // Moving down and to the right
                else if (newIndex - pieceCurrentIndex == 9) {
                    
                    let notAllEmpty = false;
                    let hitEdge = false;

                    for (let i = pieceCurrentIndex + 9; i < newIndex; i += 9) {
                        if ((gridCopy[i] != "|||") && newIndex - pieceCurrentIndex != 9) {
                            notAllEmpty = true;
                        }

                        if ((i == 15 && newIndex > i) || (i == 23 && newIndex > i) 
                            || (i == 31 && newIndex > i) || (i == 39 && newIndex > i) 
                            || (i == 47 && newIndex > i) || (i == 55 && newIndex > i)) {

                            hitEdge = true;
                            break;
                        }
                    }

                    if (notAllEmpty == false && hitEdge == false) {
                        if (gridCopy[newIndex].startsWith("B") || gridCopy[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            let nextToEnemyKing = false;

                            for (let j = 0; j < 64; j++) {
                                if (gridCopy[j].startsWith("WK")) {
                                    if (newIndex != 15 || newIndex != 23 || newIndex != 31 
                                    || newIndex != 39 || newIndex != 47 || newIndex != 55) {
                                        if (newIndex == j - 9) {
                                            nextToEnemyKing = true;
                                        }
                                    }
                                }
                            }

                            if (nextToEnemyKing == true) {

                            }

                            else {
                                gridCopy[pieceCurrentIndex] = "|||";
                                gridCopy[newIndex] = pieceString;
                            }
                        }
                    }     
                }

                // Moving down and to the left
                else if (newIndex - pieceCurrentIndex == 7) {
                    
                    let notAllEmpty = false;
                    let hitEdge = false;

                    for (let i = pieceCurrentIndex + 7; i < newIndex; i += 7) {
                        if ((gridCopy[i] != "|||") && newIndex - pieceCurrentIndex != 7) {
                            notAllEmpty = true;
                        }

                        if ((i == 8 && newIndex > i) || (i == 16 && newIndex > i) 
                            || (i == 24 && newIndex > i) || (i == 32 && newIndex > i) 
                            || (i == 40 && newIndex > i) || (i == 48 && newIndex > i) ) {

                            hitEdge = true;
                            break;
                        }
                    }

                    if (notAllEmpty == false && hitEdge == false) {
                        if (gridCopy[newIndex].startsWith("B") || gridCopy[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            let nextToEnemyKing = false;

                            for (let j = 0; j < 64; j++) {
                                if (gridCopy[j].startsWith("WK")) {
                                    if (newIndex != 8 || newIndex != 16 || newIndex != 24 
                                    || newIndex != 32 || newIndex != 40 || newIndex != 48) {
                                        if (newIndex == j - 7) {
                                            nextToEnemyKing = true;
                                        }
                                    }
                                }
                            }

                            if (nextToEnemyKing == true) {

                            }

                            else {
                                gridCopy[pieceCurrentIndex] = "|||";
                                gridCopy[newIndex] = pieceString;
                            }
                        }
                    }   
                } 
            }
        }

        if (player == "White") {
            for (let i = 0; i < 64; i++) {
                if (gridCopy[i].startsWith("BP")) {
                    // Check if king is in check
                    if (((i >= 0 && i < 8) && (i + 7 >= 8 && i + 7 < 16))
                    || ((i >= 8 && i < 16) && (i + 7 >= 16 && i + 7 < 24))
                    || ((i >= 16 && i < 24) && (i + 7 >= 24 && i + 7 < 32))
                    || ((i >= 24 && i < 32) && (i + 7 >= 32 && i + 7 < 40))
                    || ((i >= 32 && i < 40) && (i + 7 >= 40 && i + 7 < 48))
                    || ((i >= 40 && i < 48) && (i + 7 >= 48 && i + 7 < 56))
                    || ((i >= 48 && i < 56) && (i + 7 >= 56 && i + 7 < 64))) {
                        if (gridCopy[i + 7].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                        }
                    }

                    else if (((i >= 0 && i < 8) && (i + 9 >= 8 && i + 9 < 16))
                    || ((i >= 8 && i < 16) && (i + 9 >= 16 && i + 9 < 24))
                    || ((i >= 16 && i < 24) && (i + 9 >= 24 && i + 9 < 32))
                    || ((i >= 24 && i < 32) && (i + 9 >= 32 && i + 9 < 40))
                    || ((i >= 32 && i < 40) && (i + 9 >= 40 && i + 9 < 48))
                    || ((i >= 40 && i < 48) && (i + 9 >= 48 && i + 9 < 56))
                    || ((i >= 48 && i < 56) && (i + 9 >= 56 && i + 9 < 64))) {
                        if (gridCopy[i + 9].startsWith("WK")) {
                            enemyPlayer.inCheck = true;
                        }
                    }
                }

                else if (gridCopy[i].startsWith("BR")) {

                    // Check if enemy king is in check upwards
                    for (let j = i - 8; j >= 0; j -= 8) {
                        if (gridCopy[j].startsWith("WK") == false && gridCopy[j].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[j].startsWith("WK")) {
                            return true;
                        }
                    }

                    // Check if enemy king is in check downwards
                    for (let j = i + 8; j <= 63; j += 8) {
                        if (gridCopy[j].startsWith("WK") == false && gridCopy[j].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[j].startsWith("WK")) {
                            return true;
                        }
                    }

                    // Check if enemy king is in check right
                    if (i >= 0 && i < 8) {
                        for (let j = i + 1; j < 8; j++) {
                            if (gridCopy[j].startsWith("WK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("WK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 8 && i < 16) {
                        for (let j = i + 1; j < 16; j++) {
                            if (gridCopy[j].startsWith("WK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("WK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 16 && i < 24) {
                        for (let j = i + 1; j < 24; j++) {
                            if (gridCopy[j].startsWith("WK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("WK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 24 && i < 32) {
                        for (let j = i + 1; j < 32; j++) {
                            if (gridCopy[j].startsWith("WK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("WK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 32 && i < 40) {
                        for (let j = i + 1; j < 40; j++) {
                            if (gridCopy[j].startsWith("WK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("WK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 40 && i < 48) {
                        for (let j = i + 1; j < 48; j++) {
                            if (gridCopy[j].startsWith("WK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("WK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 48 && i < 56) {
                        for (let j = i + 1; j < 56; j++) {
                            if (gridCopy[j].startsWith("WK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("WK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 56 && i < 64) {
                        for (let j = i + 1; j < 64; j++) {
                            if (gridCopy[j].startsWith("WK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("WK")) {
                                return true;
                            }
                        }
                    }

                    // Check if enemy king is in check left
                    if (i >= 0 && i < 8) {
                        for (let j = i - 1; j >= 0; j--) {
                            if (gridCopy[j].startsWith("WK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("WK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 8 && i < 16) {
                        for (let j = i - 1; j >= 8; j--) {
                            if (gridCopy[j].startsWith("WK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("WK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 16 && i < 24) {
                        for (let j = i - 1; j >= 16; j--) {
                            if (gridCopy[j].startsWith("WK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("WK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 24 && i < 32) {
                        for (let j = i - 1; j >= 24; j--) {
                            if (gridCopy[j].startsWith("WK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("WK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 32 && i < 40) {
                        for (let j = i - 1; j >= 32; j--) {
                            if (gridCopy[j].startsWith("WK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("WK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 40 && i < 48) {
                        for (let j = i - 1; j >= 40; j--) {
                            if (gridCopy[j].startsWith("WK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("WK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 48 && i < 56) {
                        for (let j = i - 1; j >= 48; j--) {
                            if (gridCopy[j].startsWith("WK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("WK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 56 && i < 64) {
                        for (let j = i - 1; j >= 56; j--) {
                            if (gridCopy[j].startsWith("WK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("WK")) {
                                return true;
                            }
                        }
                    }
                }

                else if (gridCopy[i].startsWith("BB")) {
    
                    // Check if enemy king is in check up and to the right
                    for (let j = i - 7; j >= 0; j -= 7) {
                        if (gridCopy[j].startsWith("WK") == false && gridCopy[j].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[j].startsWith("WK")) {
                            return true;
                        }

                        if (j == 7 || j == 15 || j == 23 || j == 31 || j == 39 || j == 47 || j == 55) {
                            break;
                        }
                    }

                    // Check if enemy king is in check up and to the left
                    for (let j = i - 9; j >= 0; j -= 9) {
                        if (gridCopy[j].startsWith("WK") == false && gridCopy[j].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[j].startsWith("WK")) {
                            return true;
                        }


                        if (j == 0 || j == 8 || j == 16 || j == 24 || j == 32 || j == 40 || j == 48) {
                            break;
                        }
                    }

                    // Check if enemy king is in check down and to the right
                    for (let j = i + 9; j <= 63; j += 9) {
                        if (gridCopy[j].startsWith("WK") == false && gridCopy[j].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[j].startsWith("WK")) {
                            return true;
                        }

                        if (j == 15 || j == 23 || j == 31 || j == 39 || j == 47 || j == 55 || j == 63) {
                            break;
                        }
                    }

                    // Check if enemy king is in check down and to the left
                    for (let j = i + 7; j <= 63; j += 7) {
                        if (gridCopy[j].startsWith("WK") == false && gridCopy[j].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[j].startsWith("WK")) {
                            return true;
                        }

                        if (j == 8 || j == 16 || j == 24 || j == 32 || j == 40 || j == 48 || j == 56) {
                            break;
                        }
                    }
                }

                else if (gridCopy[i].startsWith("BN")) {
                    
                    // Check if enemy king is in check
                    if (gridCopy[i - 15] != undefined) {
                        if (gridCopy[i - 15].startsWith("WK")) {
                            return true;
                        }
                    }

                    else if (gridCopy[i - 6] != undefined) {
                        if (gridCopy[i - 6].startsWith("WK")) {
                            return true;
                        }
                    }

                    else if (gridCopy[i - 17] != undefined) {
                        if (gridCopy[i - 17].startsWith("WK")) {
                            return true;
                        }
                    }

                    else if (gridCopy[i - 10] != undefined) {
                        if (gridCopy[i - 10].startsWith("WK")) {
                            return true;
                        }
                    }

                    else if (gridCopy[i + 17] != undefined) {
                        if (gridCopy[i + 17].startsWith("WK")) {
                            return true;
                        }
                    }

                    else if (gridCopy[i + 10] != undefined) {
                        if (gridCopy[i + 10].startsWith("WK")) {
                            return true;
                        }
                    }

                    else if (gridCopy[i + 6] != undefined) {
                        if (gridCopy[i + 6].startsWith("WK")) {
                            return true;
                        }
                    }

                    else if (gridCopy[i + 15] != undefined) {
                        if (gridCopy[i + 15].startsWith("WK")) {
                            return true;
                        }
                    } 
                }

                else if (gridCopy[i].startsWith("BQ")) {

                    // Check if enemy king is in check upwards
                    for (let j = i - 8; j >= 0; j -= 8) {
                        if (gridCopy[j].startsWith("WK") == false && gridCopy[j].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[j].startsWith("WK")) {
                            return true;
                        }
                    }

                    // Check if enemy king is in check downwards
                    for (let j = i + 8; j <= 63; j += 8) {
                        if (gridCopy[j].startsWith("WK") == false && gridCopy[j].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[j].startsWith("WK")) {
                            return true;
                        }
                    }

                    // Check if enemy king is in check right
                    if (i >= 0 && i < 8) {
                        for (let j = i + 1; j < 8; j++) {
                            if (gridCopy[j].startsWith("WK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("WK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 8 && i < 16) {
                        for (let j = i + 1; j < 16; j++) {
                            if (gridCopy[j].startsWith("WK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("WK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 16 && i < 24) {
                        for (let j = i + 1; j < 24; j++) {
                            if (gridCopy[j].startsWith("WK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("WK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 24 && i < 32) {
                        for (let j = i + 1; j < 32; j++) {
                            if (gridCopy[j].startsWith("WK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("WK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 32 && i < 40) {
                        for (let j = i + 1; j < 40; j++) {
                            if (gridCopy[j].startsWith("WK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("WK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 40 && i < 48) {
                        for (let j = i + 1; j < 48; j++) {
                            if (gridCopy[j].startsWith("WK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("WK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 48 && i < 56) {
                        for (let j = i + 1; j < 56; j++) {
                            if (gridCopy[j].startsWith("WK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("WK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 56 && i < 64) {
                        for (let j = i + 1; j < 64; j++) {
                            if (gridCopy[j].startsWith("WK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("WK")) {
                                return true;
                            }
                        }
                    }

                    // Check if enemy king is in check left
                    if (i >= 0 && i < 8) {
                        for (let j = i - 1; j >= 0; j--) {
                            if (gridCopy[j].startsWith("WK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("WK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 8 && i < 16) {
                        for (let j = i - 1; j >= 8; j--) {
                            if (gridCopy[j].startsWith("WK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("WK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 16 && i < 24) {
                        for (let j = i - 1; j >= 16; j--) {
                            if (gridCopy[j].startsWith("WK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("WK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 24 && i < 32) {
                        for (let j = i - 1; j >= 24; j--) {
                            if (gridCopy[j].startsWith("WK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("WK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 32 && i < 40) {
                        for (let j = i - 1; j >= 32; j--) {
                            if (gridCopy[j].startsWith("WK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("WK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 40 && i < 48) {
                        for (let j = i - 1; j >= 40; j--) {
                            if (gridCopy[j].startsWith("WK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("WK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 48 && i < 56) {
                        for (let j = i - 1; j >= 48; j--) {
                            if (gridCopy[j].startsWith("WK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("WK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 56 && i < 64) {
                        for (let j = i - 1; j >= 56; j--) {
                            if (gridCopy[j].startsWith("WK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("WK")) {
                                return true;
                            }
                        }
                    }

                    // Check if enemy king is in check up and to the right
                    for (let j = i - 7; j >= 0; j -= 7) {
                        if (gridCopy[j].startsWith("WK") == false && gridCopy[j].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[j].startsWith("WK")) {
                            return true;
                        }

                        if (j == 7 || j == 15 || j == 23 || j == 31 || j == 39 || j == 47 || j == 55) {
                            break;
                        }
                    }

                    // Check if enemy king is in check up and to the left
                    for (let j = i - 9; j >= 0; j -= 9) {
                        if (gridCopy[j].startsWith("WK") == false && gridCopy[j].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[j].startsWith("WK")) {
                            return true;
                        }


                        if (j == 0 || j == 8 || j == 16 || j == 24 || j == 32 || j == 40 || j == 48) {
                            break;
                        }
                    }

                    // Check if enemy king is in check down and to the right
                    for (let j = i + 9; j <= 63; j += 9) {
                        if (gridCopy[j].startsWith("WK") == false && gridCopy[j].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[j].startsWith("WK")) {
                            return true;
                        }

                        if (j == 15 || j == 23 || j == 31 || j == 39 || j == 47 || j == 55 || j == 63) {
                            break;
                        }
                    }

                    // Check if enemy king is in check down and to the left
                    for (let j = i + 7; j <= 63; j += 7) {
                        if (gridCopy[j].startsWith("WK") == false && gridCopy[j].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[j].startsWith("WK")) {
                            return true;
                        }

                        if (j == 8 || j == 16 || j == 24 || j == 32 || j == 40 || j == 48 || j == 56) {
                            break;
                        }
                    }
                }
            }

            return false
        }

        else if (player == "Black") {
            for (let i = 0; i < 64; i++) {
                if (gridCopy[i].startsWith("WP")) {

                    // Check if king is in check
                    if (((i - 7 >= 0 && i - 7 < 8) && (i >= 8 && i < 16))
                    || ((i - 7 >= 8 && i - 7 < 16) && (i >= 16 && i < 24))
                    || ((i - 7 >= 16 && i - 7 < 24) && (i >= 24 && i < 32))
                    || ((i - 7 >= 24 && i - 7 < 32) && (i >= 32 && i < 40))
                    || ((i - 7 >= 32 && i - 7 < 40) && (i >= 40 && i < 48))
                    || ((i - 7 >= 40 && i - 7 < 48) && (i >= 48 && i < 56))
                    || ((i - 7 >= 48 && i - 7 < 56) && (i >= 56 && i < 64))) {
                        if (gridCopy[i - 7].startsWith("BK")) {
                            return true;
                        }
                    }

                    else if (((i - 9 >= 0 && i - 9 < 8) && (i >= 8 && i < 16))
                    || ((i - 9 >= 8 && i - 9 < 16) && (i >= 16 && i < 24))
                    || ((i - 9 >= 16 && i - 9 < 24) && (i >= 24 && i < 32))
                    || ((i - 9 >= 24 && i - 9 < 32) && (i >= 32 && i < 40))
                    || ((i - 9 >= 32 && i - 9 < 40) && (i >= 40 && i < 48))
                    || ((i - 9 >= 40 && i - 9 < 48) && (i >= 48 && i < 56))
                    || ((i - 9 >= 48 && i - 9 < 56) && (i >= 56 && i < 64))) {
                        if (gridCopy[i - 9].startsWith("BK")) {
                            return true;
                        }
                    } 
                }

                else if (gridCopy[i].startsWith("WR")) {

                    // Check if enemy king is in check upwards
                    for (let j = i - 8; j >= 0; j -= 8) {
                        if (gridCopy[j].startsWith("BK") == false && gridCopy[j].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[j].startsWith("BK")) {
                            return true;
                        }
                    }

                    // Check if enemy king is in check downwards
                    for (let j = i + 8; j <= 63; j += 8) {
                        if (gridCopy[j].startsWith("BK") == false && gridCopy[j].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[j].startsWith("BK")) {
                            return true;
                        }
                    }

                    // Check if enemy king is in check right
                    if (i >= 0 && i < 8) {
                        for (let j = i + 1; j < 8; j++) {
                            if (gridCopy[j].startsWith("BK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("BK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 8 && i < 16) {
                        for (let j = i + 1; j < 16; j++) {
                            if (gridCopy[j].startsWith("BK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("BK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 16 && i < 24) {
                        for (let j = i + 1; j < 24; j++) {
                            if (gridCopy[j].startsWith("BK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("BK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 24 && i < 32) {
                        for (let j = i + 1; j < 32; j++) {
                            if (gridCopy[j].startsWith("BK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("BK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 32 && i < 40) {
                        for (let j = i + 1; j < 40; j++) {
                            if (gridCopy[j].startsWith("BK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("BK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 40 && i < 48) {
                        for (let j = i + 1; j < 48; j++) {
                            if (gridCopy[j].startsWith("BK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("BK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 48 && i < 56) {
                        for (let j = i + 1; j < 56; j++) {
                            if (gridCopy[j].startsWith("BK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("BK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 56 && i < 64) {
                        for (let j = i + 1; j < 64; j++) {
                            if (gridCopy[j].startsWith("BK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("BK")) {
                                return true;
                            }
                        }
                    }

                    // Check if enemy king is in check left
                    if (i >= 0 && i < 8) {
                        for (let j = i - 1; j >= 0; j--) {
                            if (gridCopy[j].startsWith("BK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("BK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 8 && i < 16) {
                        for (let j = i - 1; j >= 8; j--) {
                            if (gridCopy[j].startsWith("BK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("BK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 16 && i < 24) {
                        for (let j = i - 1; j >= 16; j--) {
                            if (gridCopy[j].startsWith("BK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("BK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 24 && i < 32) {
                        for (let j = i - 1; j >= 24; j--) {
                            if (gridCopy[j].startsWith("BK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("BK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 32 && i < 40) {
                        for (let j = i - 1; j >= 32; j--) {
                            if (gridCopy[j].startsWith("BK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("BK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 40 && i < 48) {
                        for (let j = i - 1; j >= 40; j--) {
                            if (gridCopy[j].startsWith("BK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("BK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 48 && i < 56) {
                        for (let j = i - 1; j >= 48; j--) {
                            if (gridCopy[j].startsWith("BK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("BK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 56 && i < 64) {
                        for (let j = i - 1; j >= 56; j--) {
                            if (gridCopy[j].startsWith("BK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("BK")) {
                                return true;
                            }
                        }
                    }
                }

                else if (gridCopy[i].startsWith("WB")) {
    
                    // Check if enemy king is in check up and to the right
                    for (let j = i - 7; j >= 0; j -= 7) {
                        if (gridCopy[j].startsWith("BK") == false && gridCopy[j].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[j].startsWith("BK")) {
                            return true;
                        }

                        if (j == 7 || j == 15 || j == 23 || j == 31 || j == 39 || j == 47 || j == 55) {
                            break;
                        }
                    }

                    // Check if enemy king is in check up and to the left
                    for (let j = i - 9; j >= 0; j -= 9) {
                        if (gridCopy[j].startsWith("BK") == false && gridCopy[j].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[j].startsWith("BK")) {
                            return true;
                        }


                        if (j == 0 || j == 8 || j == 16 || j == 24 || j == 32 || j == 40 || j == 48) {
                            break;
                        }
                    }

                    // Check if enemy king is in check down and to the right
                    for (let j = i + 9; j <= 63; j += 9) {
                        if (gridCopy[j].startsWith("BK") == false && gridCopy[j].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[j].startsWith("BK")) {
                            return true;
                        }

                        if (j == 15 || j == 23 || j == 31 || j == 39 || j == 47 || j == 55 || j == 63) {
                            break;
                        }
                    }

                    // Check if enemy king is in check down and to the left
                    for (let j = i + 7; j <= 63; j += 7) {
                        if (gridCopy[j].startsWith("BK") == false && gridCopy[j].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[j].startsWith("BK")) {
                            return true;
                        }

                        if (j == 8 || j == 16 || j == 24 || j == 32 || j == 40 || j == 48 || j == 56) {
                            break;
                        }
                    }
                }

                else if (gridCopy[i].startsWith("WN")) {
                    
                    // Check if enemy king is in check
                    if (gridCopy[i - 15] != undefined) {
                        if (gridCopy[i - 15].startsWith("BK")) {
                            return true;
                        }
                    }

                    else if (gridCopy[i - 6] != undefined) {
                        if (gridCopy[i - 6].startsWith("BK")) {
                            return true;
                        }
                    }

                    else if (gridCopy[i - 17] != undefined) {
                        if (gridCopy[i - 17].startsWith("BK")) {
                            return true;
                        }
                    }

                    else if (gridCopy[i - 10] != undefined) {
                        if (gridCopy[i - 10].startsWith("BK")) {
                            return true;
                        }
                    }

                    else if (gridCopy[i + 17] != undefined) {
                        if (gridCopy[i + 17].startsWith("BK")) {
                            return true;
                        }
                    }

                    else if (gridCopy[i + 10] != undefined) {
                        if (gridCopy[i + 10].startsWith("BK")) {
                            return true;
                        }
                    }

                    else if (gridCopy[i + 6] != undefined) {
                        if (gridCopy[i + 6].startsWith("BK")) {
                            return true;
                        }
                    }

                    else if (gridCopy[i + 15] != undefined) {
                        if (gridCopy[i + 15].startsWith("BK")) {
                            return true;
                        }
                    } 
                }

                else if (gridCopy[i].startsWith("WQ")) {

                    // Check if enemy king is in check upwards
                    for (let j = i - 8; j >= 0; j -= 8) {
                        if (gridCopy[j].startsWith("BK") == false && gridCopy[j].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[j].startsWith("BK")) {
                            return true;
                        }
                    }

                    // Check if enemy king is in check downwards
                    for (let j = i + 8; j <= 63; j += 8) {
                        if (gridCopy[j].startsWith("BK") == false && gridCopy[j].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[j].startsWith("BK")) {
                            return true;
                        }
                    }

                    // Check if enemy king is in check right
                    if (i >= 0 && i < 8) {
                        for (let j = i + 1; j < 8; j++) {
                            if (gridCopy[j].startsWith("BK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("BK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 8 && i < 16) {
                        for (let j = i + 1; j < 16; j++) {
                            if (gridCopy[j].startsWith("BK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("BK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 16 && i < 24) {
                        for (let j = i + 1; j < 24; j++) {
                            if (gridCopy[j].startsWith("BK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("BK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 24 && i < 32) {
                        for (let j = i + 1; j < 32; j++) {
                            if (gridCopy[j].startsWith("BK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("BK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 32 && i < 40) {
                        for (let j = i + 1; j < 40; j++) {
                            if (gridCopy[j].startsWith("BK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("BK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 40 && i < 48) {
                        for (let j = i + 1; j < 48; j++) {
                            if (gridCopy[j].startsWith("BK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("BK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 48 && i < 56) {
                        for (let j = i + 1; j < 56; j++) {
                            if (gridCopy[j].startsWith("BK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("BK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 56 && i < 64) {
                        for (let j = i + 1; j < 64; j++) {
                            if (gridCopy[j].startsWith("BK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("BK")) {
                                return true;
                            }
                        }
                    }

                    // Check if enemy king is in check left
                    if (i >= 0 && i < 8) {
                        for (let j = i - 1; j >= 0; j--) {
                            if (gridCopy[j].startsWith("BK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("BK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 8 && i < 16) {
                        for (let j = i - 1; j >= 8; j--) {
                            if (gridCopy[j].startsWith("BK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("BK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 16 && i < 24) {
                        for (let j = i - 1; j >= 16; j--) {
                            if (gridCopy[j].startsWith("BK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("BK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 24 && i < 32) {
                        for (let j = i - 1; j >= 24; j--) {
                            if (gridCopy[j].startsWith("BK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("BK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 32 && i < 40) {
                        for (let j = i - 1; j >= 32; j--) {
                            if (gridCopy[j].startsWith("BK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("BK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 40 && i < 48) {
                        for (let j = i - 1; j >= 40; j--) {
                            if (gridCopy[j].startsWith("BK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("BK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 48 && i < 56) {
                        for (let j = i - 1; j >= 48; j--) {
                            if (gridCopy[j].startsWith("BK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("BK")) {
                                return true;
                            }
                        }
                    }

                    else if (i >= 56 && i < 64) {
                        for (let j = i - 1; j >= 56; j--) {
                            if (gridCopy[j].startsWith("BK") == false && gridCopy[j].startsWith("|||") == false) {
                                break;
                            }

                            else if (gridCopy[j].startsWith("BK")) {
                                return true;
                            }
                        }
                    }

                    // Check if enemy king is in check up and to the right
                    for (let j = i - 7; j >= 0; j -= 7) {
                        if (gridCopy[j].startsWith("BK") == false && gridCopy[j].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[j].startsWith("BK")) {
                            return true;
                        }

                        if (j == 7 || j == 15 || j == 23 || j == 31 || j == 39 || j == 47 || j == 55) {
                            break;
                        }
                    }

                    // Check if enemy king is in check up and to the left
                    for (let j = i - 9; j >= 0; j -= 9) {
                        if (gridCopy[j].startsWith("BK") == false && gridCopy[j].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[j].startsWith("BK")) {
                            return true;
                        }


                        if (j == 0 || j == 8 || j == 16 || j == 24 || j == 32 || j == 40 || j == 48) {
                            break;
                        }
                    }

                    // Check if enemy king is in check down and to the right
                    for (let j = i + 9; j <= 63; j += 9) {
                        if (gridCopy[j].startsWith("BK") == false && gridCopy[j].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[j].startsWith("BK")) {
                            return true;
                        }

                        if (j == 15 || j == 23 || j == 31 || j == 39 || j == 47 || j == 55 || j == 63) {
                            break;
                        }
                    }

                    // Check if enemy king is in check down and to the left
                    for (let j = i + 7; j <= 63; j += 7) {
                        if (gridCopy[j].startsWith("BK") == false && gridCopy[j].startsWith("|||") == false) {
                            break;
                        }

                        else if (gridCopy[j].startsWith("BK")) {
                            return true;
                        }

                        if (j == 8 || j == 16 || j == 24 || j == 32 || j == 40 || j == 48 || j == 56) {
                            break;
                        }
                    }
                }
            }

            return false;
        }
    }
}

export { Piece, Gameboard, Player };