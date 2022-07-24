import GameParams from "./gameParams.js";
import startup from "./socket.js";


const gameParams = new GameParams();
const ws = startup(gameParams);


function onMove(i) {
    const turn = gameParams.getGameParameter("turn");
    const gameOver = gameParams.getGameParameter("game-over");
    const btn = document.getElementById(i);

    if (gameOver) {
        alert("The game is over!");
        return;
    }

    if (turn) {
        if (btn.innerHTML !== "") {
            alert("Cannot select this field! Pick another!");
        } else {
            console.log(`Your turn: ${i}`);
            btn.innerHTML = gameParams.getGameParameter("mark");
            ws.send(JSON.stringify({ method: "move", params: i }));
        }
    } else {
        alert("Not your turn!");
    }
}

function main() {
    const btns = document.querySelectorAll(".board-btn");
    for (let btn of btns) {
        btn.addEventListener("click", () => onMove(parseInt(btn.value)));
    }

    const newGameBtn = document.querySelector(".btn-primary");
    newGameBtn.style.display = "none";
    newGameBtn.addEventListener("click", () => location.reload());
}

main();