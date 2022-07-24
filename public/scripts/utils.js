export function displayInfo(text, color=null) {
    const gameInfoHeader = document.getElementsByClassName("game-info-header")[0];
    gameInfoHeader.innerHTML = text;
    gameInfoHeader.style["margin-bottom"] = "20px";
    if (color) {
        gameInfoHeader.style["color"] = color;
    }
    document.getElementsByClassName("board")[0].style.display = "grid"; 
}

export function displayTurnInfo(gameParams) {
    displayInfo(gameParams.getGameParameter("turn") ? "Your turn!" : `${gameParams.getGameParameter("opponent")}'s turn!`);
}

export function turnSwitch(gameParams) {
    gameParams.updateGameParameter("turn", (oldValue) => !oldValue, gameParams.getGameParameter("turn"));

    displayTurnInfo(gameParams);
}

export function updateBoard(id, gameParams) {
    if (!gameParams.getGameParameter("turn")) {    // player who wasn't on turn updates his board
        document.getElementById(id).innerHTML = gameParams.getGameParameter("mark") === 'X' ? 'O' : 'X';     // opponent's mark
    }
}

export function displayNewGameButton(delay) {
    setTimeout(() => {
        document.querySelector(".game-info-header").style["margin-bottom"] = "auto";
        document.querySelector(".board").style.display = "none";
        document.querySelector(".btn-primary").style.display = "block";
    }, delay);
}