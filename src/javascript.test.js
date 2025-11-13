import { Piece, Gameboard, Player } from "./javascript";

describe('Piece', () => {
    test('name property initialized', () => {
        const bishopW = new Piece("W", "B", 1);
        expect(bishopW.name).toBe("B");
    })
})

describe('Gameboard', () => {
    test('createGrid function works', () => {
        const gameboard = new Gameboard();
        expect(gameboard.grid.length).toBe(64);
    })
})

describe('Player', () => {
    test('color property initialized', () => {
        const player = new Player("Black");
        expect(player.color).toBe("Black");
    })

    test('move function works for white pawn with valid move', () => {
        const gameboard = new Gameboard();
        const player = new Player("White");

        const pawn = new Piece("W", "P", 1);
        
        player.move(gameboard.grid, pawn, 40);

        expect(gameboard.grid[40]).toBe("WP1");
    })

    test('move function works for black pawn with valid move', () => {
        const gameboard = new Gameboard();
        const player = new Player("Black");

        const pawn = new Piece("B", "P", 1);
        
        player.move(gameboard.grid, pawn, 16);

        expect(gameboard.grid[16]).toBe("BP1");
    })

    test('move function does not work for white pawn with invalid move', () => {
        const gameboard = new Gameboard();
        const player = new Player("White");

        const pawn = new Piece("W", "P", 1);
        
        player.move(gameboard.grid, pawn, 47);

        expect(gameboard.grid[47]).toBe(" ");
    })

    test('move function does not work for black pawn with invalid move', () => {
        const gameboard = new Gameboard();
        const player = new Player("Black");

        const pawn = new Piece("B", "P", 1);
        
        player.move(gameboard.grid, pawn, 17);

        expect(gameboard.grid[17]).toBe(" ");
    })

    test('move function does not work for white pawn with invalid move when trying to move an occupied square', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnW1 = new Piece("W", "P", 1);
        const pawnB1 = new Piece("B", "P", 1);
        
        player1.move(gameboard.grid, pawnW1, 32);
        player2.move(gameboard.grid, pawnB1, 24);
        
        player1.move(gameboard.grid, pawnW1, 24);

        expect(gameboard.grid[24]).toBe("BP1");
    })

    test('move function does not work for black pawn with invalid move when trying to move an occupied square', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnW1 = new Piece("W", "P", 1);
        const pawnB1 = new Piece("B", "P", 1);
        
        player2.move(gameboard.grid, pawnB1, 24);
        player1.move(gameboard.grid, pawnW1, 32);
        
        player1.move(gameboard.grid, pawnB1, 32);

        expect(gameboard.grid[32]).toBe("WP1");
    })

    test('move function does not work for white pawn when there is another piece blocking its path when moving two squares forward', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnW1 = new Piece("W", "P", 1);
        const pawnB1 = new Piece("B", "P", 3);
        const pawnW2 = new Piece("W", "P", 3);
        
        player1.move(gameboard.grid, pawnW1, 40);
        player2.move(gameboard.grid, pawnB1, 26);
        
        player1.move(gameboard.grid, pawnW1, 32);
        player2.move(gameboard.grid, pawnB1, 34);

        player1.move(gameboard.grid, pawnW1, 24);
        player2.move(gameboard.grid, pawnB1, 42);

        player1.move(gameboard.grid, pawnW2, 34);

        expect(gameboard.grid[34]).toBe(" ");
    })

    test('move function does not work for black pawn when there is another piece blocking its path when moving two squares forward', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnW1 = new Piece("W", "P", 1);
        const pawnB1 = new Piece("B", "P", 1);
        const pawnB2 = new Piece("B", "P", 3);
        
        player2.move(gameboard.grid, pawnB2, 18, player1);
        player1.move(gameboard.grid, pawnW1, 32, player2);

        player2.move(gameboard.grid, pawnB2, 26, player1);
        player1.move(gameboard.grid, pawnW1, 24, player2);

        player2.move(gameboard.grid, pawnB2, 34, player1);
        player1.move(gameboard.grid, pawnW1, 16, player2);
        
        player2.move(gameboard.grid, pawnB1, 24, player1);

        expect(gameboard.grid[24]).toBe(" ");
    })

    test('move function works for white pawn when trying to capture enemy piece diagonally in front of it', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnW2 = new Piece("W", "P", 2);
        const pawnB1 = new Piece("B", "P", 1);
        
        player1.move(gameboard.grid, pawnW2, 33);
        player2.move(gameboard.grid, pawnB1, 24);
        
        player1.move(gameboard.grid, pawnW2, 24);

        expect(gameboard.grid[24]).toBe("WP2");
    })

    test('move function works for black pawn when trying to capture enemy piece diagonally in front of it', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnW2 = new Piece("W", "P", 2);
        const pawnB1 = new Piece("B", "P", 1);
        
        player2.move(gameboard.grid, pawnB1, 24);
        player1.move(gameboard.grid, pawnW2, 33);
        
        player1.move(gameboard.grid, pawnB1, 33);

        expect(gameboard.grid[33]).toBe("BP1");
    }) 

    test('move function works for white pawn when trying to capture enemy piece en passant', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnW1 = new Piece("W", "P", 4);
        const pawnW2 = new Piece("W", "P", 1);
        const pawnB = new Piece("B", "P", 5);
        
        player1.move(gameboard.grid, pawnW1, 35, player2);
        player2.move(gameboard.grid, pawnB, 20, player1);
    
        player1.move(gameboard.grid, pawnW2, 40, player2);
        player2.move(gameboard.grid, pawnB, 36, player1);
        
        player1.move(gameboard.grid, pawnW1, 28, player2);

        expect(gameboard.grid[28]).toBe("WP4");
        expect(gameboard.grid[36]).toBe(" "); // Where pawnB was
    })

    test('move function works for black pawn when trying to capture enemy piece en passant', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnW = new Piece("W", "P", 4);
        const pawnB = new Piece("B", "P", 5);
        
        player1.move(gameboard.grid, pawnW, 43, player2);
        player2.move(gameboard.grid, pawnB, 28, player1);
    
        player1.move(gameboard.grid, pawnW, 27, player2);
        player2.move(gameboard.grid, pawnB, 35, player1);

        expect(gameboard.grid[35]).toBe("BP5");
        expect(gameboard.grid[27]).toBe(" "); // Where pawnB was
    })

    test('move function does not work for white pawn when trying to move two squares forward after first move', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnW = new Piece("W", "P", 4);
        const pawnB = new Piece("B", "P", 5);
        
        player1.move(gameboard.grid, pawnW, 35, player2);
        player2.move(gameboard.grid, pawnB, 20, player1);
    
        player1.move(gameboard.grid, pawnW, 19, player2);

        expect(gameboard.grid[19]).toBe(" ");
    })

    test('move function does not work for black pawn when trying to move two squares forward after first move', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnW = new Piece("W", "P", 4);
        const pawnB = new Piece("B", "P", 5);
        
        player1.move(gameboard.grid, pawnW, 43, player2);
        player2.move(gameboard.grid, pawnB, 28, player1);
    
        player1.move(gameboard.grid, pawnW, 35, player2);
        player2.move(gameboard.grid, pawnB, 44, player1);

        expect(gameboard.grid[44]).toBe(" ");
    })

    test('move function works for white rook when moving up', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnW = new Piece("W", "P", 1);
        const pawnB = new Piece("B", "P", 1);
        const rookW = new Piece("W", "R", 1);
        
        player1.move(gameboard.grid, pawnW, 32, player2);
        player2.move(gameboard.grid, pawnB, 24, player1);
        player1.move(gameboard.grid, rookW, 40, player2);

        expect(gameboard.grid[40]).toBe("WR1");
    })

    test('move function works for white rook when moving down', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnW = new Piece("W", "P", 1);
        const pawnB1 = new Piece("B", "P", 1);
        const pawnB2 = new Piece("B", "P", 2);
        const rookW = new Piece("W", "R", 1);
        
        player1.move(gameboard.grid, pawnW, 32, player2);
        player2.move(gameboard.grid, pawnB1, 24, player1);
        player1.move(gameboard.grid, rookW, 40, player2);
        player2.move(gameboard.grid, pawnB2, 17, player1);
        player1.move(gameboard.grid, rookW, 48, player2);

        expect(gameboard.grid[48]).toBe("WR1");
    })

    test('move function works for white rook when moving right', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnW = new Piece("W", "P", 1);
        const pawnB1 = new Piece("B", "P", 1);
        const pawnB2 = new Piece("B", "P", 2);
        const rookW = new Piece("W", "R", 1);
        
        player1.move(gameboard.grid, pawnW, 32, player2);
        player2.move(gameboard.grid, pawnB1, 24, player1);
        player1.move(gameboard.grid, rookW, 40, player2);
        player2.move(gameboard.grid, pawnB2, 17, player1);
        player1.move(gameboard.grid, rookW, 43, player2);

        expect(gameboard.grid[43]).toBe("WR1");
    })

    test('move function works for white rook when moving left', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnW = new Piece("W", "P", 1);
        const pawnB1 = new Piece("B", "P", 1);
        const pawnB2 = new Piece("B", "P", 2);
        const rookW = new Piece("W", "R", 1);
        
        player1.move(gameboard.grid, pawnW, 32, player2);
        player2.move(gameboard.grid, pawnB1, 24, player1);
        player1.move(gameboard.grid, rookW, 40, player2);
        player2.move(gameboard.grid, pawnB2, 17, player1);
        player1.move(gameboard.grid, rookW, 43, player2);
        player2.move(gameboard.grid, pawnB2, 25, player1);
        player1.move(gameboard.grid, rookW, 41, player2);

        expect(gameboard.grid[41]).toBe("WR1");
    })

    test('move function works for black rook when moving up', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnW1 = new Piece("W", "P", 1);
        const pawnW2 = new Piece("W", "P", 2);
        const pawnB = new Piece("B", "P", 1);
        const rookB = new Piece("B", "R", 1);
        
        player2.move(gameboard.grid, pawnB, 24, player1);
        player1.move(gameboard.grid, pawnW1, 32, player2);
        player2.move(gameboard.grid, rookB, 16, player1);
        player1.move(gameboard.grid, pawnW2, 41, player2);
        player2.move(gameboard.grid, rookB, 8, player1);

        expect(gameboard.grid[8]).toBe("BR1");
    })

    test('move function works for black rook when moving down', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnW1 = new Piece("W", "P", 1);
        const pawnW2 = new Piece("W", "P", 2);
        const pawnB = new Piece("B", "P", 1);
        const rookB = new Piece("B", "R", 1);
        
        player2.move(gameboard.grid, pawnB, 24, player1);
        player1.move(gameboard.grid, pawnW1, 32, player2);
        player2.move(gameboard.grid, rookB, 16, player1);

        expect(gameboard.grid[16]).toBe("BR1");
    })

    test('move function works for black rook when moving right', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnW1 = new Piece("W", "P", 1);
        const pawnW2 = new Piece("W", "P", 2);
        const pawnB = new Piece("B", "P", 1);
        const rookB = new Piece("B", "R", 1);
        
        player2.move(gameboard.grid, pawnB, 24, player1);
        player1.move(gameboard.grid, pawnW1, 32, player2);
        player2.move(gameboard.grid, rookB, 16, player1);
        player1.move(gameboard.grid, pawnW2, 41, player2);
        player2.move(gameboard.grid, rookB, 19, player1);

        expect(gameboard.grid[19]).toBe("BR1");
    })

    test('move function works for black rook when moving left', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnW1 = new Piece("W", "P", 1);
        const pawnW2 = new Piece("W", "P", 2);
        const pawnB = new Piece("B", "P", 1);
        const rookB = new Piece("B", "R", 1);
        
        player2.move(gameboard.grid, pawnB, 24, player1);
        player1.move(gameboard.grid, pawnW1, 32, player2);
        player2.move(gameboard.grid, rookB, 16, player1);
        player1.move(gameboard.grid, pawnW2, 41, player2);
        player2.move(gameboard.grid, rookB, 19, player1);
        player1.move(gameboard.grid, pawnW2, 33, player2);
        player2.move(gameboard.grid, rookB, 18, player1);

        expect(gameboard.grid[18]).toBe("BR1");
    })

    test('move function does not work for white rook when trying to move from one row to another', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnW = new Piece("W", "P", 1);
        const pawnB = new Piece("B", "P", 1);
        const rookW = new Piece("W", "R", 1);
        
        player1.move(gameboard.grid, pawnW, 32, player2);
        player2.move(gameboard.grid, pawnB, 16, player1);
        player1.move(gameboard.grid, rookW, 40, player2);
        player2.move(gameboard.grid, pawnB, 24, player1);
        player1.move(gameboard.grid, rookW, 39, player2);

        expect(gameboard.grid[39]).toBe(" ");
    })

    test('move function does not work for white rook when trying to move to a square occupied by a piece of the same color', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnW = new Piece("W", "P", 1);
        const pawnB = new Piece("B", "P", 1);
        const rookW = new Piece("W", "R", 1);
        
        player1.move(gameboard.grid, pawnW, 32, player2);
        player2.move(gameboard.grid, pawnB, 16, player1);
        player1.move(gameboard.grid, rookW, 32, player2);

        expect(gameboard.grid[32]).toBe("WP1");
    })

    test('move function does not work for white rook when there is another piece blocking its path', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnW = new Piece("W", "P", 1);
        const pawnB = new Piece("B", "P", 1);
        const rookW = new Piece("W", "R", 1);
        
        player1.move(gameboard.grid, rookW, 40, player2);

        expect(gameboard.grid[40]).toBe(" ");
    })

    test('move function works for white rook when trying to capture enemy piece', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnW = new Piece("W", "P", 1);
        const pawnB = new Piece("B", "P", 2);
        const rookW = new Piece("W", "R", 1);
        
        player1.move(gameboard.grid, pawnW, 32, player2);
        player2.move(gameboard.grid, pawnB, 17, player1);
        player1.move(gameboard.grid, rookW, 40, player2);
        player2.move(gameboard.grid, pawnB, 25, player1);
        player1.move(gameboard.grid, rookW, 41, player2);
        player2.move(gameboard.grid, pawnB, 33, player1);
        player1.move(gameboard.grid, rookW, 33, player2);

        expect(gameboard.grid[33]).toBe("WR1");
    })

    test('move function does not work for black rook when trying to move from one row to another', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnW1 = new Piece("W", "P", 1);
        const pawnW2 = new Piece("W", "P", 2);
        const pawnB = new Piece("B", "P", 1);
        const rookB = new Piece("B", "R", 1);
        
        player2.move(gameboard.grid, pawnB, 24, player1);
        player1.move(gameboard.grid, pawnW1, 32, player2);
        player2.move(gameboard.grid, rookB, 16, player1);
        player1.move(gameboard.grid, pawnW2, 41, player2);
        player2.move(gameboard.grid, rookB, 25, player1);

        expect(gameboard.grid[25]).toBe(" ");
    })

    test('move function does not work for black rook when trying to move to a square occupied by a piece of the same color', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnW1 = new Piece("W", "P", 1);
        const pawnB = new Piece("B", "P", 1);
        const rookB = new Piece("B", "R", 1);
        
        player2.move(gameboard.grid, pawnB, 24, player1);
        player1.move(gameboard.grid, pawnW1, 32, player2);
        player2.move(gameboard.grid, rookB, 24, player1);

        expect(gameboard.grid[24]).toBe("BP1");
    })

    test('move function does not work for black rook when there is another piece blocking its path', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const rookB = new Piece("B", "R", 1);
        
        player2.move(gameboard.grid, rookB, 16, player1);

        expect(gameboard.grid[16]).toBe(" ");
    })

    test('move function works for black rook when trying to capture enemy piece', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnW1 = new Piece("W", "P", 1);
        const pawnW2 = new Piece("W", "P", 2);
        const pawnB = new Piece("B", "P", 1);
        const rookB = new Piece("B", "R", 1);
        
        player2.move(gameboard.grid, pawnB, 24, player1);
        player1.move(gameboard.grid, pawnW1, 32, player2);
        player2.move(gameboard.grid, rookB, 16, player1);
        player1.move(gameboard.grid, pawnW2, 41, player2);
        player2.move(gameboard.grid, rookB, 17, player1);
        player1.move(gameboard.grid, pawnW2, 33, player2);
        player2.move(gameboard.grid, rookB, 33, player1);

        expect(gameboard.grid[33]).toBe("BR1");
    })

    test('move function works for white bishop when moving diagonally up and to the right', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnW = new Piece("W", "P", 4);
        const pawnB = new Piece("B", "P", 1);
        const bishopW = new Piece("W", "B", 1);

        player1.move(gameboard.grid, pawnW, 43);
        player2.move(gameboard.grid, pawnB, 16);
        player1.move(gameboard.grid, bishopW, 44);

        expect(gameboard.grid[44]).toBe("WB1");
    })

    test('move function works for white bishop when moving diagonally up and to the left', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnW = new Piece("W", "P", 2);
        const pawnB = new Piece("B", "P", 1);
        const bishopW = new Piece("W", "B", 1);

        player1.move(gameboard.grid, pawnW, 41);
        player2.move(gameboard.grid, pawnB, 16);
        player1.move(gameboard.grid, bishopW, 40);

        expect(gameboard.grid[40]).toBe("WB1");
    })
})