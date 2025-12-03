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

        expect(gameboard.grid[47]).toBe("|||");
    })

    test('move function does not work for black pawn with invalid move', () => {
        const gameboard = new Gameboard();
        const player = new Player("Black");

        const pawn = new Piece("B", "P", 1);
        
        player.move(gameboard.grid, pawn, 17);

        expect(gameboard.grid[17]).toBe("|||");
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

        expect(gameboard.grid[34]).toBe("|||");
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

        expect(gameboard.grid[24]).toBe("|||");
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
        const pawnB1 = new Piece("B", "P", 5);
        const pawnB2 = new Piece("B", "P", 2);
        
        player1.move(gameboard.grid, pawnW1, 35, player2);
        player2.move(gameboard.grid, pawnB2, 17, player1);
    
        player1.move(gameboard.grid, pawnW1, 27, player2);
        player2.move(gameboard.grid, pawnB1, 28, player1);

        //gameboard.printGrid();
        
        player1.move(gameboard.grid, pawnW1, 20, player2);

        expect(gameboard.grid[20]).toBe("WP4");
        expect(gameboard.grid[28]).toBe("|||"); // Where pawnB was
    })

    test('move function works for black pawn when trying to capture enemy piece en passant', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnW1 = new Piece("W", "P", 4);
        const pawnW2 = new Piece("W", "P", 2);
        const pawnB = new Piece("B", "P", 5);
        
        player1.move(gameboard.grid, pawnW2, 40, player2);
        player2.move(gameboard.grid, pawnB, 28, player1);
    
        player1.move(gameboard.grid, pawnW2, 32, player2);
        player2.move(gameboard.grid, pawnB, 36, player1);

        player1.move(gameboard.grid, pawnW1, 35, player2);
        player2.move(gameboard.grid, pawnB, 43, player1);

        expect(gameboard.grid[43]).toBe("BP5");
        expect(gameboard.grid[35]).toBe("|||"); // Where pawnW1 was
    })

    test('move function does not work for white pawn when trying to capture enemy piece when white pawn is two rows below the enemy piece', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnW1 = new Piece("W", "P", 1);
        const pawnB1 = new Piece("B", "P", 8);
        
        player1.move(gameboard.grid, pawnW1, 32, player2);
        player2.move(gameboard.grid, pawnB1, 23, player1);
    
        player1.move(gameboard.grid, pawnW1, 23, player2);

        expect(gameboard.grid[23]).toBe("BP8");
        expect(gameboard.grid[32]).toBe("WP1"); 
    })

    test('move function does not work for black pawn when trying to capture enemy piece when black pawn is two rows above the enemy piece', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnW1 = new Piece("W", "P", 1);
        const pawnB1 = new Piece("B", "P", 8);
        
        player2.move(gameboard.grid, pawnB1, 23, player1);
        player1.move(gameboard.grid, pawnW1, 32, player2);
    
        player2.move(gameboard.grid, pawnB1, 32, player1);

        expect(gameboard.grid[32]).toBe("WP1");
        expect(gameboard.grid[23]).toBe("BP8"); 
    })

    test('move function does not work for white pawn when trying to capture enemy piece when white pawn is on the same row as the enemy piece and at opposite sides', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnW1 = new Piece("W", "P", 8);
        const pawnB1 = new Piece("B", "P", 1);
        const pawnB2 = new Piece("B", "P", 3);
        
        player1.move(gameboard.grid, pawnW1, 39, player2);
        player2.move(gameboard.grid, pawnB1, 16, player1);
    
        player1.move(gameboard.grid, pawnW1, 31, player2);
        player2.move(gameboard.grid, pawnB2, 18, player1);

        player1.move(gameboard.grid, pawnW1, 23, player2);
        player2.move(gameboard.grid, pawnB2, 26, player1);

        player1.move(gameboard.grid, pawnW1, 16, player2);

        expect(gameboard.grid[16]).toBe("BP1");
        expect(gameboard.grid[23]).toBe("WP8"); 
    })

    test('move function does not work for black pawn when trying to capture enemy piece when black pawn is on the same row as the enemy piece and at opposite sides', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnW1 = new Piece("W", "P", 8);
        const pawnB1 = new Piece("B", "P", 1);
        const pawnB2 = new Piece("B", "P", 3);
        
        player2.move(gameboard.grid, pawnB1, 16, player1);
        player1.move(gameboard.grid, pawnW1, 39, player2);
    
        player2.move(gameboard.grid, pawnB2, 18, player1);
        player1.move(gameboard.grid, pawnW1, 31, player2);

        player2.move(gameboard.grid, pawnB2, 26, player1);
        player1.move(gameboard.grid, pawnW1, 23, player2);

        player2.move(gameboard.grid, pawnB1, 23, player1);

        expect(gameboard.grid[23]).toBe("WP8");
        expect(gameboard.grid[16]).toBe("BP1"); 
    })

    test('move function does not work for white pawn when trying to capture enemy piece en passant when enemy piece is on another row and next to it', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnW1 = new Piece("W", "P", 1);
        const pawnB = new Piece("B", "P", 8);
        
        player1.move(gameboard.grid, pawnW1, 32, player2);
        player2.move(gameboard.grid, pawnB, 31, player1);
    
        player1.move(gameboard.grid, pawnW1, 23, player2);
        //gameboard.printGrid();

        expect(gameboard.grid[23]).toBe("|||");
        expect(gameboard.grid[31]).toBe("BP8"); 
    })


    test('move function does not work for black pawn when trying to capture enemy piece en passant when enemy piece is on another row and next to it', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnW1 = new Piece("W", "P", 1);
        const pawnW2 = new Piece("W", "P", 4);
        const pawnB = new Piece("B", "P", 8);
        
        player1.move(gameboard.grid, pawnW2, 43, player2);
        player2.move(gameboard.grid, pawnB, 31, player1);
    
        player1.move(gameboard.grid, pawnW1, 32, player2);
        //gameboard.printGrid();
        player2.move(gameboard.grid, pawnB, 40, player1);

        //gameboard.printGrid();

        expect(gameboard.grid[40]).toBe("|||");
        expect(gameboard.grid[32]).toBe("WP1"); 
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

        expect(gameboard.grid[19]).toBe("|||");
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

        expect(gameboard.grid[44]).toBe("|||");
    })

    test('move function does not work for white pawn when trying to capture enemy piece en passant when enemy piece does not move two squares forward', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnW = new Piece("W", "P", 2);
        const pawnB = new Piece("B", "P", 1);
        
        player1.move(gameboard.grid, pawnW, 33, player2);
        player2.move(gameboard.grid, pawnB, 16, player1);
    
        player1.move(gameboard.grid, pawnW, 25, player2);
        player2.move(gameboard.grid, pawnB, 24, player1);

        //gameboard.printGrid();

        player1.move(gameboard.grid, pawnW, 16, player2);

        expect(gameboard.grid[16]).toBe("|||");
        expect(gameboard.grid[25]).toBe("WP2");
        expect(gameboard.grid[24]).toBe("BP1");
    })

    test('move function does not work for black pawn when trying to capture enemy piece en passant when enemy piece does not move two squares forward', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnW = new Piece("W", "P", 1);
        const pawnB = new Piece("B", "P", 2);
        
        player2.move(gameboard.grid, pawnB, 25, player1);
        player1.move(gameboard.grid, pawnW, 40, player2);
    
        player2.move(gameboard.grid, pawnB, 33, player1);
        player1.move(gameboard.grid, pawnW, 32, player2);

        player2.move(gameboard.grid, pawnB, 40, player1);

        expect(gameboard.grid[40]).toBe("|||");
        expect(gameboard.grid[32]).toBe("WP1");
        expect(gameboard.grid[33]).toBe("BP2");
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

        expect(gameboard.grid[39]).toBe("|||");
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

        expect(gameboard.grid[40]).toBe("|||");
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

        expect(gameboard.grid[25]).toBe("|||");
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

        expect(gameboard.grid[16]).toBe("|||");
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

    test('move function works for white bishop when moving diagonally down and to the right', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnW = new Piece("W", "P", 4);
        const pawnB = new Piece("B", "P", 1);
        const bishopW = new Piece("W", "B", 1);

        player1.move(gameboard.grid, pawnW, 43);
        player2.move(gameboard.grid, pawnB, 16);

        player1.move(gameboard.grid, bishopW, 37);
        player2.move(gameboard.grid, pawnB, 24);

        player1.move(gameboard.grid, bishopW, 46);

        expect(gameboard.grid[46]).toBe("WB1");
    })

    test('move function works for white bishop when moving diagonally down and to the left', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnW = new Piece("W", "P", 5);
        const pawnB = new Piece("B", "P", 1);
        const bishopW = new Piece("W", "B", 2);

        player1.move(gameboard.grid, pawnW, 44);
        player2.move(gameboard.grid, pawnB, 16);

        player1.move(gameboard.grid, bishopW, 34);
        player2.move(gameboard.grid, pawnB, 24);

        player1.move(gameboard.grid, bishopW, 41);

        expect(gameboard.grid[41]).toBe("WB2");
    })

    test('move function works for black bishop when moving diagonally up and to the right', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnB = new Piece("B", "P", 4);
        const pawnW = new Piece("W", "P", 1);
        const bishopB = new Piece("B", "B", 1);

        player2.move(gameboard.grid, pawnB, 19);
        player1.move(gameboard.grid, pawnW, 40);

        player2.move(gameboard.grid, bishopB, 29);
        player1.move(gameboard.grid, pawnW, 32);

        player2.move(gameboard.grid, bishopB, 22);
        
        expect(gameboard.grid[22]).toBe("BB1");
    })

    test('move function works for black bishop when moving diagonally up and to the left', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnB = new Piece("B", "P", 4);
        const pawnW = new Piece("W", "P", 1);
        const bishopB = new Piece("B", "B", 1);

        player2.move(gameboard.grid, pawnB, 19);
        player1.move(gameboard.grid, pawnW, 40);

        player2.move(gameboard.grid, bishopB, 29);
        player1.move(gameboard.grid, pawnW, 32);

        player2.move(gameboard.grid, bishopB, 20);
        
        expect(gameboard.grid[20]).toBe("BB1");
    })

    test('move function works for black bishop when moving diagonally down and to the right', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnB = new Piece("B", "P", 4);
        const pawnW = new Piece("W", "P", 1);
        const bishopB = new Piece("B", "B", 1);

        player2.move(gameboard.grid, pawnB, 19);
        player1.move(gameboard.grid, pawnW, 40);

        player2.move(gameboard.grid, bishopB, 29);

        expect(gameboard.grid[29]).toBe("BB1");
    })

    test('move function works for black bishop when moving diagonally down and to the left', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnB = new Piece("B", "P", 4);
        const pawnW = new Piece("W", "P", 1);
        const bishopB = new Piece("B", "B", 1);

        player2.move(gameboard.grid, pawnB, 19);
        player1.move(gameboard.grid, pawnW, 40);

        player2.move(gameboard.grid, bishopB, 29);
        player1.move(gameboard.grid, pawnW, 32);

        player2.move(gameboard.grid, bishopB, 36);
        
        expect(gameboard.grid[36]).toBe("BB1");
    })

    test('move function does not work for white bishop when trying to move to a square occupied by a piece of the same color', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnW = new Piece("W", "P", 4);
        const pawnB = new Piece("B", "P", 1);
        const bishopW = new Piece("W", "B", 1);

        player1.move(gameboard.grid, pawnW, 43);
        player2.move(gameboard.grid, pawnB, 16);

        player1.move(gameboard.grid, bishopW, 37);
        player2.move(gameboard.grid, pawnB, 24);

        player1.move(gameboard.grid, bishopW, 55);

        expect(gameboard.grid[37]).toBe("WB1");
        expect(gameboard.grid[55]).toBe("WP8");
    })

    test('move function does not work for white bishop when trying to move forwards/backwards', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnW = new Piece("W", "P", 4);
        const pawnB = new Piece("B", "P", 1);
        const bishopW = new Piece("W", "B", 1);

        player1.move(gameboard.grid, pawnW, 43);
        player2.move(gameboard.grid, pawnB, 16);

        player1.move(gameboard.grid, bishopW, 37);
        player2.move(gameboard.grid, pawnB, 24);

        player1.move(gameboard.grid, bishopW, 29);

        expect(gameboard.grid[37]).toBe("WB1");
        expect(gameboard.grid[29]).toBe("|||");
    })

    test('move function does not work for white bishop when there is another piece blocking its path', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnW = new Piece("W", "P", 4);
        const pawnB = new Piece("B", "P", 1);
        const bishopW = new Piece("W", "B", 1);

        player1.move(gameboard.grid, bishopW, 44);

        expect(gameboard.grid[58]).toBe("WB1");
        expect(gameboard.grid[44]).toBe("|||");
    })

    test('move function does not work for white bishop when trying to move within its row', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnW = new Piece("W", "P", 7);
        const bishopW = new Piece("W", "B", 2);

        player1.move(gameboard.grid, pawnW, 38);
        player1.move(gameboard.grid, bishopW, 40);

        expect(gameboard.grid[61]).toBe("WB2");
        expect(gameboard.grid[40]).toBe("|||");
    })

    test('move function works for white bishop when trying to capture enemy piece', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnW = new Piece("W", "P", 4);
        const pawnB = new Piece("B", "P", 1);
        const bishopW = new Piece("W", "B", 1);

        player1.move(gameboard.grid, pawnW, 43);
        player2.move(gameboard.grid, pawnB, 16);

        player1.move(gameboard.grid, bishopW, 23);
        player2.move(gameboard.grid, pawnB, 24);

        player1.move(gameboard.grid, bishopW, 14);

        expect(gameboard.grid[14]).toBe("WB1");
    })

    test('move function does not work for black bishop when trying to move to a square occupied by a piece of the same color', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnB = new Piece("B", "P", 4);
        const pawnW = new Piece("W", "P", 1);
        const bishopB = new Piece("B", "B", 1);

        player2.move(gameboard.grid, pawnB, 19);
        player1.move(gameboard.grid, pawnW, 40);

        player2.move(gameboard.grid, bishopB, 29);
        player1.move(gameboard.grid, pawnW, 32);

        player2.move(gameboard.grid, bishopB, 15);
        
        expect(gameboard.grid[29]).toBe("BB1");
    })

    test('move function does not work for black bishop when trying to move forwards/backwards', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnB = new Piece("B", "P", 4);
        const pawnW = new Piece("W", "P", 1);
        const bishopB = new Piece("B", "B", 1);

        player2.move(gameboard.grid, pawnB, 19);
        player1.move(gameboard.grid, pawnW, 40);

        player2.move(gameboard.grid, bishopB, 29);
        player1.move(gameboard.grid, pawnW, 32);

        player2.move(gameboard.grid, bishopB, 37);
        
        expect(gameboard.grid[29]).toBe("BB1");
    })

    test('move function does not work for black bishop when there is another piece blocking its path', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnB = new Piece("B", "P", 4);
        const pawnW = new Piece("W", "P", 1);
        const bishopB = new Piece("B", "B", 1);

        player2.move(gameboard.grid, bishopB, 20);

        expect(gameboard.grid[2]).toBe("BB1");
        expect(gameboard.grid[20]).toBe("|||");
    })

    test('move function does not work for black bishop when trying to move within its row', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnB = new Piece("B", "P", 7);
        const bishopB = new Piece("B", "B", 2);

        player2.move(gameboard.grid, pawnB, 30);
        player2.move(gameboard.grid, bishopB, 32);

        expect(gameboard.grid[5]).toBe("BB2");
        expect(gameboard.grid[32]).toBe("|||");
    })

    test('move function works for black bishop when trying to capture enemy piece', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnB = new Piece("B", "P", 4);
        const pawnW = new Piece("W", "P", 1);
        const bishopB = new Piece("B", "B", 1);

        player2.move(gameboard.grid, pawnB, 19);
        player1.move(gameboard.grid, pawnW, 40);

        player2.move(gameboard.grid, bishopB, 29);
        player1.move(gameboard.grid, pawnW, 32);

        player2.move(gameboard.grid, bishopB, 50);
        
        expect(gameboard.grid[50]).toBe("BB1");
    })

    test('move function works for white knight when moving in an L-shape pattern 2 squares up and 1 square right', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const knightW = new Piece("W", "N", 1);

        player1.move(gameboard.grid, knightW, 42);
        
        expect(gameboard.grid[42]).toBe("WN1");
    })

    test('move function works for white knight when moving in an L-shape pattern 2 square up and 1 square left', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const knightW = new Piece("W", "N", 1);
        const pawnB = new Piece ("B", "P", 1);

        player1.move(gameboard.grid, knightW, 40);
        player2.move(gameboard.grid, pawnB, 16);
        
        expect(gameboard.grid[40]).toBe("WN1");
    })

    test('move function works for white knight when moving in an L-shape pattern 2 squares down and 1 square right', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const knightW = new Piece("W", "N", 1);
        const pawnB = new Piece ("B", "P", 1);

        player1.move(gameboard.grid, knightW, 42);
        player2.move(gameboard.grid, pawnB, 16);

        player1.move(gameboard.grid, knightW, 27);
        player2.move(gameboard.grid, pawnB, 24);

        player1.move(gameboard.grid, knightW, 44);
        
        expect(gameboard.grid[44]).toBe("WN1");
    })

    test('move function works for white knight when moving in an L-shape pattern 2 squares down and 1 square left', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const knightW = new Piece("W", "N", 1);
        const pawnB = new Piece ("B", "P", 1);

        player1.move(gameboard.grid, knightW, 42);
        player2.move(gameboard.grid, pawnB, 16);

        player1.move(gameboard.grid, knightW, 27);
        player2.move(gameboard.grid, pawnB, 24);

        player1.move(gameboard.grid, knightW, 42);
        
        expect(gameboard.grid[42]).toBe("WN1");
    })

    test('move function works for black knight when moving in an L-shape pattern 2 square up and 1 square right', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const knightB = new Piece("B", "N", 1);
        const pawnW = new Piece ("W", "P", 1);

        player2.move(gameboard.grid, knightB, 18);
        player1.move(gameboard.grid, pawnW, 40);

        player2.move(gameboard.grid, knightB, 35);
        player1.move(gameboard.grid, pawnW, 32);

        player2.move(gameboard.grid, knightB, 20);
        
        expect(gameboard.grid[20]).toBe("BN1");
    })

    test('move function works for black knight when moving in an L-shape pattern 2 square up and 1 square left', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const knightB = new Piece("B", "N", 1);
        const pawnW = new Piece ("W", "P", 1);

        player2.move(gameboard.grid, knightB, 18);
        player1.move(gameboard.grid, pawnW, 40);

        player2.move(gameboard.grid, knightB, 35);
        player1.move(gameboard.grid, pawnW, 32);

        player2.move(gameboard.grid, knightB, 18);
        
        expect(gameboard.grid[18]).toBe("BN1");
    })

    test('move function works for black knight when moving in an L-shape pattern 2 square down and 1 square right', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const knightB = new Piece("B", "N", 1);
        const pawnW = new Piece ("W", "P", 1);

        player2.move(gameboard.grid, knightB, 18);
        player1.move(gameboard.grid, pawnW, 40);

        player2.move(gameboard.grid, knightB, 35);
        
        expect(gameboard.grid[35]).toBe("BN1");
    })

    test('move function works for black knight when moving in an L-shape pattern 2 square down and 1 square left', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const knightB = new Piece("B", "N", 1);
        const pawnW = new Piece ("W", "P", 1);

        player2.move(gameboard.grid, knightB, 16);
        
        expect(gameboard.grid[16]).toBe("BN1");
    }) 

    test('move function works for white knight when trying to capture enemy piece', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const knightW = new Piece("W", "N", 1);
        const pawnB = new Piece ("B", "P", 1);

        player1.move(gameboard.grid, knightW, 42);
        player2.move(gameboard.grid, pawnB, 16);

        player1.move(gameboard.grid, knightW, 27);
        player2.move(gameboard.grid, pawnB, 24);

        player1.move(gameboard.grid, knightW, 12);
        
        expect(gameboard.grid[12]).toBe("WN1");
    })

    test('move function works for black knight when trying to capture enemy piece', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const knightB = new Piece("B", "N", 1);
        const pawnW = new Piece ("W", "P", 1);

        player2.move(gameboard.grid, knightB, 18);
        player1.move(gameboard.grid, pawnW, 40);

        player2.move(gameboard.grid, knightB, 35);
        player1.move(gameboard.grid, pawnW, 32);

        player2.move(gameboard.grid, knightB, 52);
        
        expect(gameboard.grid[52]).toBe("BN1");
    })

    test('move function works for white queen when moving up', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const queenW = new Piece("W", "Q");
        const pawnW = new Piece("W", "P", 4);

        player1.move(gameboard.grid, pawnW, 35);

        player1.move(gameboard.grid, queenW, 43);
        
        expect(gameboard.grid[43]).toBe("WQ");
    })

    test('move function works for white queen when moving right', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const queenW = new Piece("W", "Q");
        const pawnW = new Piece("W", "P", 4);

        player1.move(gameboard.grid, pawnW, 35);

        player1.move(gameboard.grid, queenW, 43);
        
        player1.move(gameboard.grid, queenW, 44)
        
        expect(gameboard.grid[44]).toBe("WQ");
    }) 

    test('move function works for white queen when moving diagonally up and to the right', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const queenW = new Piece("W", "Q");
        const pawnW = new Piece("W", "P", 4);

        player1.move(gameboard.grid, pawnW, 35);

        player1.move(gameboard.grid, queenW, 43);
        
        player1.move(gameboard.grid, queenW, 36);
        
        expect(gameboard.grid[36]).toBe("WQ");
    })

    test('move function does not work for white queen when trying to move from one row to another', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const queenW = new Piece("W", "Q");
        const pawnW = new Piece("W", "P", 4);

        player1.move(gameboard.grid, pawnW, 35);

        player1.move(gameboard.grid, queenW, 43);
        
        player1.move(gameboard.grid, queenW, 39);
        
        expect(gameboard.grid[43]).toBe("WQ");
        expect(gameboard.grid[39]).toBe("|||");
    })

    test('move function does not work for white queen when there is another piece blocking its path', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const queenW = new Piece("W", "Q");
        const pawnW = new Piece("W", "P", 4);

        player1.move(gameboard.grid, queenW, 43);
        
        player1.move(gameboard.grid, queenW, 45);
        
        expect(gameboard.grid[59]).toBe("WQ");
        expect(gameboard.grid[43]).toBe("|||");
        expect(gameboard.grid[45]).toBe("|||");
    })

    test('move function works for white queen when trying to capture enemy piece', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const queenW = new Piece("W", "Q");
        const pawnW = new Piece("W", "P", 4);
        const pawnB = new Piece("B", "P", 7);

        player1.move(gameboard.grid, pawnW, 35);
        player2.move(gameboard.grid, pawnB, 30);

        player1.move(gameboard.grid, queenW, 43);
        player2.move(gameboard.grid, pawnB, 38);
        
        player1.move(gameboard.grid, queenW, 44);
        player2.move(gameboard.grid, pawnB, 46);

        player1.move(gameboard.grid, queenW, 46);
        
        expect(gameboard.grid[46]).toBe("WQ");
    })

    test('move function works for black queen when moving down', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const queenB = new Piece("B", "Q");
        const pawnB = new Piece("B", "P", 4);

        player2.move(gameboard.grid, pawnB, 27);

        player2.move(gameboard.grid, queenB, 19);
        
        expect(gameboard.grid[19]).toBe("BQ");
    })

    test('move function works for black queen when moving right', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const queenB = new Piece("B", "Q");
        const pawnB = new Piece("B", "P", 4);

        player2.move(gameboard.grid, pawnB, 27);

        player2.move(gameboard.grid, queenB, 19);

        player2.move(gameboard.grid, queenB, 20);
        
        expect(gameboard.grid[20]).toBe("BQ");
    })

    test('move function works for black queen when moving diagonally down and to the right', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const queenB = new Piece("B", "Q");
        const pawnB = new Piece("B", "P", 4);

        player2.move(gameboard.grid, pawnB, 27);

        player2.move(gameboard.grid, queenB, 19);

        player2.move(gameboard.grid, queenB, 28);
        
        expect(gameboard.grid[28]).toBe("BQ");
    })

    test('move function does not work for black queen when trying to move from one row to another', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const queenB = new Piece("B", "Q");
        const pawnB = new Piece("B", "P", 4);

        player2.move(gameboard.grid, pawnB, 27);

        player2.move(gameboard.grid, queenB, 19);

        player2.move(gameboard.grid, queenB, 24);
        
        expect(gameboard.grid[19]).toBe("BQ");
        expect(gameboard.grid[24]).toBe("|||");
    })

    test('move function does not work for black queen when there is another piece blocking its path ', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const queenB = new Piece("B", "Q");
        const pawnB = new Piece("B", "P", 4);

        player2.move(gameboard.grid, queenB, 19);
        
        expect(gameboard.grid[3]).toBe("BQ");
        expect(gameboard.grid[19]).toBe("|||");
    })

    test('move function works for black queen when trying to capture enemy piece', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const queenB = new Piece("B", "Q");
        const pawnB = new Piece("B", "P", 4);

        player2.move(gameboard.grid, pawnB, 27);

        player2.move(gameboard.grid, queenB, 19);

        player2.move(gameboard.grid, queenB, 55);
        
        expect(gameboard.grid[55]).toBe("BQ");
    })

    test('move function works for white king when moving up', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const kingW = new Piece("W", "K");
        const pawnW = new Piece("W", "P", 5);

        player1.move(gameboard.grid, pawnW, 36);

        player1.move(gameboard.grid, kingW, 52);
        
        expect(gameboard.grid[52]).toBe("WK");
    })

    test('move function works for white king when moving right', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const kingW = new Piece("W", "K");
        const pawnW = new Piece("W", "P", 5);

        player1.move(gameboard.grid, pawnW, 36);

        player1.move(gameboard.grid, kingW, 52);

        player1.move(gameboard.grid, pawnW, 28);

        player1.move(gameboard.grid, kingW, 44);

        player1.move(gameboard.grid, kingW, 45);
        
        expect(gameboard.grid[45]).toBe("WK");
    })

    test('move function works for white king when moving diagonally up and to the right', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const kingW = new Piece("W", "K");
        const pawnW = new Piece("W", "P", 5);

        player1.move(gameboard.grid, pawnW, 36);

        player1.move(gameboard.grid, kingW, 52);

        player1.move(gameboard.grid, pawnW, 28);

        player1.move(gameboard.grid, kingW, 44);

        player1.move(gameboard.grid, kingW, 37);
        
        expect(gameboard.grid[37]).toBe("WK");
    })

    test('move function does not work for white king when trying to move to a square occupied by a piece of the same color', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const kingW = new Piece("W", "K");
        const pawnW = new Piece("W", "P", 5);

        player1.move(gameboard.grid, kingW, 52);
        
        expect(gameboard.grid[52]).toBe("WP5");
        expect(gameboard.grid[60]).toBe("WK");
    })

    test('move function works for black king when moving down', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const kingB = new Piece("B", "K");
        const pawnB = new Piece("B", "P", 5);

        player2.move(gameboard.grid, pawnB, 28);

        player2.move(gameboard.grid, kingB, 12);
        
        expect(gameboard.grid[12]).toBe("BK");
    })

    test('move function works for black king when moving right', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const kingB = new Piece("B", "K");
        const pawnB = new Piece("B", "P", 5);

        player2.move(gameboard.grid, pawnB, 28);

        player2.move(gameboard.grid, kingB, 12);

        player2.move(gameboard.grid, kingB, 20);

        player2.move(gameboard.grid, kingB, 21);
        
        expect(gameboard.grid[21]).toBe("BK");
    })

    test('move function works for black king when moving diagonally down and to the right', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const kingB = new Piece("B", "K");
        const pawnB = new Piece("B", "P", 5);

        player2.move(gameboard.grid, pawnB, 28);

        player2.move(gameboard.grid, kingB, 12);

        player2.move(gameboard.grid, kingB, 20);

        player2.move(gameboard.grid, kingB, 29);
        
        expect(gameboard.grid[29]).toBe("BK");
    })

    test('move function does not work for black king when trying to move to a square occupied by a piece of the same color', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const kingB = new Piece("B", "K");
        const pawnB = new Piece("B", "P", 5);

        player2.move(gameboard.grid, kingB, 12);
        
        expect(gameboard.grid[4]).toBe("BK");
        expect(gameboard.grid[12]).toBe("BP5");
    })

    test('after a player moves, the current player changes', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnW = new Piece("W", "P", 5);
        const pawnB = new Piece("B", "P", 5);

        player1.currentTurn = true;

        player1.move(gameboard.grid, pawnW, 44, player2);
        
        expect(player2.currentTurn).toBe(true);
        expect(player1.currentTurn).toBe(false);
    }) 

    test('move function works when a white piece puts enemy king in check', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnW = new Piece("W", "P", 5);
        const queenW = new Piece("W", "Q");
        const pawnB = new Piece("B", "P", 6);

        player1.currentTurn = true;

        player1.move(gameboard.grid, pawnW, 44, player2);
        player2.move(gameboard.grid, pawnB, 29, player1);

        player1.move(gameboard.grid, queenW, 31, player2);
        
        expect(player2.inCheck).toBe(true);
    })

    test('move function works when a black piece puts enemy king in check', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnW = new Piece("W", "P", 6);
        const queenB = new Piece("B", "Q");
        const pawnB = new Piece("B", "P", 5);

        player1.currentTurn = true;

        player2.move(gameboard.grid, pawnB, 20, player1);
        player1.move(gameboard.grid, pawnW, 37, player2);

        player2.move(gameboard.grid, queenB, 39, player1);
        
        expect(player1.inCheck).toBe(true);
    }) 

    test('move function works when a player moves king or other pieces to get out of check', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnW = new Piece("W", "P", 5);
        const queenW = new Piece("W", "Q");
        const pawnB1 = new Piece("B", "P", 6);
        const pawnB2 = new Piece("B", "P", 7);

        player1.currentTurn = true;

        player1.move(gameboard.grid, pawnW, 44, player2);
        player2.move(gameboard.grid, pawnB1, 29, player1);

        player1.move(gameboard.grid, queenW, 31, player2);
        player2.move(gameboard.grid, pawnB2, 22, player1);
        
        expect(player2.inCheck).toBe(false);
    })

    test('move function does not work when a player tries to move king or other pieces and does not get out of check', () => {
        const gameboard = new Gameboard();

        const player1 = new Player("White");
        const player2 = new Player("Black");

        const pawnW = new Piece("W", "P", 5);
        const queenW = new Piece("W", "Q");
        const pawnB1 = new Piece("B", "P", 6);
        const kingB = new Piece("B", "K");

        player1.currentTurn = true;

        player1.move(gameboard.grid, pawnW, 44, player2);
        player2.move(gameboard.grid, pawnB1, 29, player1);

        player1.move(gameboard.grid, queenW, 31, player2);
        player2.move(gameboard.grid, kingB, 13, player1);

        gameboard.printGrid();

        expect(player2.inCheck).toBe(true);
        expect(gameboard.grid[13]).toBe("|||");
        expect(gameboard.grid[4]).toBe("BK");
    }) 
})