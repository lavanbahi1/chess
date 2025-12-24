import "./style.css";
import { displayGameboard, chooseOpponent } from "./dom";
import { Piece, Gameboard, Player } from "./javascript";

let board = new Gameboard();

let player1 = new Player("White", true);
let player2 = new Player("Black", false);

displayGameboard(board);
chooseOpponent("Player 1", player1, player2, board);