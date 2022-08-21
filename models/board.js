
/* This is used for checking the board state. Instead of checking
all horizontal combinations, then all vertical combinations, and lastly
both diagonals, this list is used to check all possible solutions for given
field index.
For example, field 0 (that is, first box, top left corner) can be included in
three solutions: first row, first column, and diagonal from top left corner 
to the bottom right. So, we use indexes 1, 3, and 4.
For example, one possible solution could be first row. Well,
if we sat down on field 0 (that is, first box), from that perspective,
to cover up that first solution, we move forward by 1 step, 2 times.
And lastly, to clearify, moving forward means moving from left to the
right, and when ending up in the 3rd column, moving down to the next 
row, starting again from the 1st column. */
const FIELD_CHECK_STEPS = [
    [1, 3, 4],  // steps for field 0
    [3],        // steps for field 1
    [2, 3],     // steps for field 2
    [1],        // ...
    null,
    null,
    [1],
    null,
    null
]
const MOVING_THRESHOLD = 2; // each solution containts 3 fields, 1 on which we are sitting, plus 2 more


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
        for (let fieldIndex in FIELD_CHECK_STEPS) {
            let state = this._board[fieldIndex].state;
            let fieldSteps = FIELD_CHECK_STEPS[fieldIndex];

            if (!fieldSteps || !state)
                continue;
            
            let valid;
            for (let step of fieldSteps) {
                valid = true;
                for (let move = 1; move <= MOVING_THRESHOLD && valid; move++) {
                    let nextFieldIndex = parseInt(fieldIndex) + step * move;
                    valid = this._board[nextFieldIndex].state === state;
                }
                if (valid) break;
            }

            if (valid) {
                this._solved = true;
                break;
            }
        }
    }
};


module.exports = Board;