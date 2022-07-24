const Board = require("./board");

class Game {

    constructor(players, games) {
        this._playerOne = players[0];
        this._playerTwo = players[1];
        this._games = games;
        this._board = new Board();
    }

    onMove(index, socket) {
        this._board.updateBoard(index, this.getPlayerBySocket(socket));
        return this._board.isSolved();
    }

    isOver() {
        return this._board.isFull();
    }

    getPlayer(i) {
        return i === 0 ? this._playerOne : i === 1 ? this._playerTwo : null;
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
    
    players() {
        return [this._playerOne, this._playerTwo];
    }

    informPlayer(player, message) {
        player.getSocket().send(JSON.stringify(message));
    }

    informPlayers(message) {
        this.players().forEach((player) => {
            this.informPlayer(player, message);
        });
    }

    end() {
        this._games = this._games.filter((game) => game !== this);

        this.players().forEach((player) => {
            player.getSocket().close();
        });

        return this._games;
    }
    
};


module.exports = Game;