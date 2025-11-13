class Piece {
    constructor(color, name, num) {
        this.name = name;
        this.color = color;
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
                let square = ' ';
                grid.push(square);
            }
        }

        grid[0] = "BR1";
        grid[1] = "BK1";
        grid[2] = "BB1";
        grid[3] = "BQ";
        grid[4] = "BK";
        grid[5] = "BB2";
        grid[6] = "BK2";
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
        grid[57] = "WK1";
        grid[58] = "WB1";
        grid[59] = "WQ";
        grid[60] = "WK";
        grid[61] = "WB2";
        grid[62] = "WK2";
        grid[63] = "WR2";

        //console.log(grid);

        return grid;
    }
}

class Player {
    constructor(color) {
        this.color = color;
        this.currentTurn = false;
        this.enPassant = false;
    }

    move(grid, piece, newIndex, enemyPlayer) {
        let pieceString = piece.color + piece.name + piece.num;
        let pieceCurrentIndex = grid.indexOf(pieceString);

        if (piece.name == "P") {
            if (piece.color == "W") {
                
                // Moving 1 space forward 
                if (pieceCurrentIndex - newIndex == 8) {
                    if (grid[newIndex] != " ") {

                    }

                    else {
                        grid[pieceCurrentIndex] = " ";
                        grid[newIndex] = pieceString;
                    }
                }

                // Moving 2 spaces forward only during first turn
                else if ((pieceCurrentIndex - newIndex == 16) && piece.firstTurn == true) {
                    if (grid[newIndex] != " ") {

                    }

                    else if (grid[newIndex + 8] != " ") {

                    }

                    else {
                        grid[pieceCurrentIndex] = " ";
                        grid[newIndex] = pieceString;
                        piece.firstTurn = false;
                    }
                }

                // Capturing piece diagonally in front of it
                else if (pieceCurrentIndex - newIndex == 9 || pieceCurrentIndex - newIndex == 7) {
                    
                    if (this.enPassant == true && grid[newIndex - 8] != "BK") {
                        grid[pieceCurrentIndex] = " ";
                        grid[newIndex] = pieceString;
                        grid[newIndex + 8] = " "; // Capture enemy pawn
                        this.enPassant = false;
                    }

                    else if (grid[newIndex] == " " || grid[newIndex] == "BK") { // Can not capture king

                    }

                    else {
                        grid[pieceCurrentIndex] = " ";
                        grid[newIndex] = pieceString;
                    }
                }

                else {

                }

                // Check if enemy pawn can en passant
                if (grid[newIndex - 1].startsWith("BP")) {
                    enemyPlayer.enPassant = true;
                }

                else if (grid[newIndex + 1].startsWith("BP")) {
                    enemyPlayer.enPassant = true;
                }
            }

            else if (piece.color == "B") {
                // Moving 1 or 2 spaces forward 
                if (newIndex - pieceCurrentIndex == 8) {
                    if (grid[newIndex] != " ") {

                    }

                    else {
                        grid[pieceCurrentIndex] = " ";
                        grid[newIndex] = pieceString;
                    }
                }

                else if ((newIndex - pieceCurrentIndex == 16) && piece.firstTurn == true) {
                    if (grid[newIndex] != " ") {

                    }

                    else if (grid[newIndex - 8] != " ") {

                    }

                    else {
                        grid[pieceCurrentIndex] = " ";
                        grid[newIndex] = pieceString;
                        piece.firstTurn = false;
                    }                    
                }

                // Capturing piece diagonally in front of it
                else if (newIndex - pieceCurrentIndex == 9 || newIndex - pieceCurrentIndex == 7) {
                    if (this.enPassant == true && grid[newIndex - 8] != "WK") {
                        grid[pieceCurrentIndex] = " ";
                        grid[newIndex] = pieceString;
                        grid[newIndex - 8] = " "; // Capture enemy pawn
                        this.enPassant = false;
                    }

                    else if (grid[newIndex] == " " || grid[newIndex] == "WK") { // Can not capture king

                    }

                    else {
                        grid[pieceCurrentIndex] = " ";
                        grid[newIndex] = pieceString;
                    }
                }

                else {

                }

                // Check if enemy pawn can en passant
                if (grid[newIndex - 1].startsWith("WP")) {
                    enemyPlayer.enPassant = true;
                }

                else if (grid[newIndex + 1].startsWith("WP")) {
                    enemyPlayer.enPassant = true;
                }
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
                        if ((grid[i] != " ") && pieceCurrentIndex - newIndex != 8) {
                            notAllEmpty = true;
                        }
                    }

                    if (notAllEmpty == false) {
                        if (grid[newIndex].startsWith("W") || grid[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            grid[pieceCurrentIndex] = " ";
                            grid[newIndex] = pieceString;
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
                        if ((grid[i] != " ") && (newIndex - pieceCurrentIndex != 8)) {
                            notAllEmpty = true;
                        }
                    }

                    if (notAllEmpty == false) {
                        if (grid[newIndex].startsWith("W") || grid[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            grid[pieceCurrentIndex] = " ";
                            grid[newIndex] = pieceString;
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
                            if ((grid[i] != " ") && (newIndex - pieceCurrentIndex != 1)) {
                                notAllEmpty = true;
                            }
                        }

                        if (notAllEmpty == false) {
                            if (grid[newIndex].startsWith("W") || grid[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                grid[pieceCurrentIndex] = " ";
                                grid[newIndex] = pieceString;
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
                            if ((grid[i] != " ") && pieceCurrentIndex - newIndex != 1) {
                                notAllEmpty = true;
                            }
                        }

                        if (notAllEmpty == false) {
                            if (grid[newIndex].startsWith("W") || grid[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                grid[pieceCurrentIndex] = " ";
                                grid[newIndex] = pieceString;
                            }
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
                        if ((grid[i] != " ") && pieceCurrentIndex - newIndex != 8) {
                            notAllEmpty = true;
                        }
                    }

                    if (notAllEmpty == false) {
                        if (grid[newIndex].startsWith("B") || grid[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            grid[pieceCurrentIndex] = " ";
                            grid[newIndex] = pieceString;
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
                        if ((grid[i] != " ") && newIndex - pieceCurrentIndex != 8) {
                            notAllEmpty = true;
                        }
                    }

                    if (notAllEmpty == false) {
                        if (grid[newIndex].startsWith("B") || grid[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                        }

                        else {
                            grid[pieceCurrentIndex] = " ";
                            grid[newIndex] = pieceString;
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
                            if ((grid[i] != " ") && newIndex - pieceCurrentIndex != 1) {
                                notAllEmpty = true;
                            }
                        }

                        if (notAllEmpty == false) {
                            if (grid[newIndex].startsWith("B") || grid[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                grid[pieceCurrentIndex] = " ";
                                grid[newIndex] = pieceString;
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
                            if ((grid[i] != " ") && pieceCurrentIndex - newIndex != 1) {
                                notAllEmpty = true;
                            }
                        }

                        if (notAllEmpty == false) {
                            if (grid[newIndex].startsWith("B") || grid[newIndex] == "WK") { // Can not land on same color pieces and opposing king

                            }

                            else {
                                grid[pieceCurrentIndex] = " ";
                                grid[newIndex] = pieceString;
                            }
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
                    
                    if (grid[newIndex].startsWith("W") || grid[newIndex] == "BK") { // Can not land on same color pieces and opposing king

                    }

                    else {
                        grid[pieceCurrentIndex] = " ";
                        grid[newIndex] = pieceString;
                    }
                }
            }

            else if (piece.color == "B") {


            }
        }

        //console.log(grid);
    }
}

export { Piece, Gameboard, Player };