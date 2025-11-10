class Piece {
    constructor(color, name, num) {
        this.name = name;
        this.color = color;
        this.num = num;
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
                // Moving 1 or 2 spaces forward 
                if (pieceCurrentIndex - newIndex == 8 || pieceCurrentIndex - newIndex == 16) {
                    if (grid[newIndex] != " ") {

                    }

                    else {
                        grid[pieceCurrentIndex] = " ";
                        grid[newIndex] = pieceString;
                    }
                }

                // Capturing piece diagonally in front of it
                else if (pieceCurrentIndex - newIndex == 9 || pieceCurrentIndex - newIndex == 7) {
                    
                    if (this.enPassant == true) {
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
                if (newIndex - pieceCurrentIndex == 8 || newIndex - pieceCurrentIndex == 16) {
                    if (grid[newIndex] != " ") {

                    }

                    else {
                        grid[pieceCurrentIndex] = " ";
                        grid[newIndex] = pieceString;
                    }
                }

                else if (newIndex - pieceCurrentIndex == 9 || newIndex - pieceCurrentIndex == 7) {
                    if (this.enPassant == true) {
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

        //console.log(grid);
    }
}

export { Piece, Gameboard, Player };