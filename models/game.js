const Board = require("./board");

class Game {

    constructor(players) {
        this._playerOne = players[0];
        this._playerTwo = players[1];
        this._board = new Board();
    }

    onMove(index, socket) {
        this._board.updateBoard(index, this.getPlayerBySocket(socket));
        return this._board.isSolved();
    }

    isOver() {
        return this._board.isFull();
    }

    getPlayerBySocket(socket) {
        return this._playerOne.getSocket() === socket ? this._playerOne : this._playerTwo.getSocket() ? this._playerTwo : null;
    }

    getOpponent(player) {
        return this._playerOne === player ? this._playerTwo : this._playerOne;
    }

    getGameBySocket(socket) {
        return this._playerOne.getSocket() === socket || this._playerTwo.getSocket() === socket ? this : null; 
    }

    
};


module.exports = Game;