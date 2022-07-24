
export default class GameParams {

    constructor() {
        this._gameParams = {};
    }

    setParams(params) {
        this.setGameParameter("turn", () => params[0] === "play");
        this.setGameParameter("opponent", () => params[1]);
        this.setGameParameter("mark", () => this.getGameParameter("turn") ? 'X' : 'O');
        this.setGameParameter("game-over", () => false);
    }

    getGameParams() {
        return this._gameParams;
    }

    getGameParameter(parameter) {
        return this._gameParams[parameter] != undefined ? this._gameParams[parameter] : undefined;
    }

    setGameParameter(parameter, valueFunc, paramFunc=null) {
        if (paramFunc) {
            this._gameParams[parameter] = valueFunc(paramFunc);
        } else {
            this._gameParams[parameter] = valueFunc();
        }
    }

    updateGameParameter(parameter, valueFunc, paramFunc) {
        if (this._gameParams[parameter] != undefined) {
            this.setGameParameter(parameter, valueFunc, paramFunc);
        } else {
            console.log("Unable to update parameter: %s", parameter);
        }
    }
}