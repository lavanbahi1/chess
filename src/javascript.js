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
                let square = '|||';
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
}

class Player {
    constructor(color) {
        this.color = color;
        this.currentTurn = false;
        this.enPassant = false;
        this.hasMoved = false;
    }

    move(grid, piece, newIndex, enemyPlayer) {
        let pieceString = piece.color + piece.name + piece.num;
        let pieceCurrentIndex = grid.indexOf(pieceString);

        if (piece.name == "P") {
            if (piece.color == "W") {
                
                // Moving 1 space forward 
                if (pieceCurrentIndex - newIndex == 8) {
                    if (grid[newIndex] != "|||") {

                    }

                    else {
                        grid[pieceCurrentIndex] = "|||";
                        grid[newIndex] = pieceString;
                        piece.firstTurn = false;
                        this.hasMoved = true;
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
                        piece.firstTurn = false;
                        this.hasMoved = true;
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
                            this.hasMoved = true;
                        }
                    }
                }

                else {

                }

                // Check if enemy pawn can en passant
                if (grid[newIndex - 1].startsWith("BP") && this.hasMoved == true) {
                    enemyPlayer.enPassant = true;
                    console.log(`White pawn ${grid[newIndex]} has black pawn ${grid[newIndex - 1]} to the left`);
                }

                else if (grid[newIndex + 1].startsWith("BP") && this.hasMoved == true) {
                    enemyPlayer.enPassant = true;
                    console.log(`White pawn ${grid[newIndex]} has black pawn ${grid[newIndex + 1]} to the right`);
                }

                this.hasMoved = false;
            }

            else if (piece.color == "B") {
                // Moving 1 or 2 spaces forward 
                if (newIndex - pieceCurrentIndex == 8) {
                    if (grid[newIndex] != "|||") {

                    }

                    else {
                        grid[pieceCurrentIndex] = "|||";
                        grid[newIndex] = pieceString;
                        piece.firstTurn = false;
                        this.hasMoved = true;
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
                        piece.firstTurn = false;
                        this.hasMoved = true;
                    }                    
                }

                // Capturing piece diagonally in front of it
                else if (newIndex - pieceCurrentIndex == 9 || newIndex - pieceCurrentIndex == 7) {
                    if (this.enPassant == true && grid[newIndex - 8] != "WK") {
                        grid[pieceCurrentIndex] = "|||";
                        grid[newIndex] = pieceString;
                        grid[newIndex - 8] = "|||"; // Capture enemy pawn
                        this.enPassant = false;
                        this.hasMoved = true;
                        console.log("enPassant by black pawn");
                    }

                    else if (grid[newIndex] == "|||" || grid[newIndex] == "WK") { // Can not capture king

                    }

                    else {
                        grid[pieceCurrentIndex] = "|||";
                        grid[newIndex] = pieceString;
                        this.hasMoved = true;
                    }
                }

                else {

                }

                // Check if enemy pawn can en passant
                if (grid[newIndex - 1].startsWith("WP") && this.hasMoved == true) {
                    enemyPlayer.enPassant = true;
                    console.log(`Black pawn ${grid[newIndex]} has white pawn ${grid[newIndex - 1]} to the left`);
                }

                else if (grid[newIndex + 1].startsWith("WP") && this.hasMoved == true) {
                    enemyPlayer.enPassant = true;
                    console.log(`Black pawn ${grid[newIndex]} has white pawn ${grid[newIndex + 1]} to the right`);
                }

                this.hasMoved = false;
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
                        grid[pieceCurrentIndex] = "|||";
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