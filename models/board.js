
class Board {

    constructor() {
        this._board = {};
        for (let i = 0; i < 9; i++) 
            this._board[i] = { state: null };
        this._solved = false;
    }

    getBoard() {
        return this._board;
    }

    isSolved() {
        return this._solved;
    }

    isFull() {
        for (let i = 0; i < 9; i++) {
            if (this._board[i].state === null) {
                return false;
            }
        }
        return true;
    }

    updateBoard(index, player) {
        this._board[index].state = player;
        this._checkBoard();
    }

    _checkBoard() {
        // check horizontally
        for (let i = 0; !this._solved && i < 7; i += 3) {
            let stateBox = this._board[i].state;
            let valid = stateBox !== null;
            for (let j = i + 1; valid && j < i + 3; j++)
                if (this._board[j].state !== stateBox)
                    valid = false;
            if (valid)
                this._solved = true;
        }

        // check vertically
        for (let i = 0; !this._solved && i < 3; i++) {
            let stateBox = this._board[i].state;
            let valid = stateBox !== null;
            for (let j = i + 3; valid && j < i + 7; j += 3)
                if (this._board[j].state !== stateBox)
                    valid = false;
            if (valid)
                this._solved = true;
        }

        // check diagonal 1
        for (let i = 0; !this._solved && i < 1; i++) {
            let stateBox = this._board[i].state;
            let valid = stateBox !== null;
            for (let j = i + 4; valid && j < 9; j += 4)
                if (this._board[j].state !== stateBox)
                    valid = false;
            if (valid)
                this._solved = true;
        }

        // check diagonal 2
        for (let i = 2; !this._solved && i < 3; i++) {
            let stateBox = this._board[i].state;
            let valid = stateBox !== null;
            for (let j = i + 2; valid && j < 7; j += 2)
                if (this._board[j].state !== stateBox)
                    valid = false;
            if (valid)
                this._solved = true;
        }
    }
};


module.exports = Board;