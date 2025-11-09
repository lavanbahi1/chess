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
        const pawn = new Piece("W", "P", 1)
        
        player.move(gameboard.grid, pawn, 41);

        expect(gameboard.grid[41]).toBe("WP1");
    })

    test('move function works for black pawn with valid move', () => {
        const gameboard = new Gameboard();
        const player = new Player("Black");
        const pawn = new Piece("B", "P", 1)
        
        player.move(gameboard.grid, pawn, 16);

        expect(gameboard.grid[16]).toBe("BP1");
    })

    test('move function does not work for white pawn with invalid move when trying to move to the left', () => {
        const gameboard = new Gameboard();
        const player = new Player("White");
        const pawn = new Piece("W", "P", 1)
        
        player.move(gameboard.grid, pawn, 47);

        expect(gameboard.grid[47]).toBe(" ");
    })
})