class Player {

    constructor(nickname, socket) {
        this._nickname = nickname;
        this._socket = socket;
    }

    getNickname() {
        return this._nickname;
    }

    getSocket() {
        return this._socket;
    }
};

module.exports = Player;