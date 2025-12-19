import "./style.css";
import { displayGameboard, chooseOpponent } from "./dom";
import { Piece, Gameboard, Player } from "./javascript";

let board = new Gameboard();

let player1 = new Player();
let player2 = new Player();

let wPawn1 = new Piece("W", "P", 1);
let wPawn2 = new Piece("W", "P", 2);
let wPawn3 = new Piece("W", "P", 3);
let wPawn4 = new Piece("W", "P", 4);
let wPawn5 = new Piece("W", "P", 5);
let wPawn6 = new Piece("W", "P", 6);
let wPawn7 = new Piece("W", "P", 7);
let wPawn8 = new Piece("W", "P", 8);
let wRook1 = new Piece("W", "R", 1);
let wKnight1 = new Piece("W", "N", 1);
let wBishop1 = new Piece("W", "B", 1);
let wQueen = new Piece("W", "Q");
let wKing = new Piece("W", "K");
let wRook2 = new Piece("W", "R", 2);
let wKnight2 = new Piece("W", "N", 2);
let wBishop2 = new Piece("W", "B", 2);

let bPawn1 = new Piece("B", "P", 1);
let bPawn2 = new Piece("B", "P", 2);
let bPawn3 = new Piece("B", "P", 3);
let bPawn4 = new Piece("B", "P", 4);
let bPawn5 = new Piece("B", "P", 5);
let bPawn6 = new Piece("B", "P", 6);
let bPawn7 = new Piece("B", "P", 7);
let bPawn8 = new Piece("B", "P", 8);
let bRook1 = new Piece("B", "R", 1);
let bKnight1 = new Piece("B", "N", 1);
let bBishop1 = new Piece("B", "B", 1);
let bQueen = new Piece("B", "Q");
let bKing = new Piece("B", "K");
let bRook2 = new Piece("B", "R", 2);
let bKnight2 = new Piece("B", "N", 2);
let bBishop2 = new Piece("B", "B", 2);

displayGameboard(board);
chooseOpponent();