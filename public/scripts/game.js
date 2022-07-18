import startup from "./socket.js";

const ws = startup();

function onMove (i) {
    const turn = JSON.parse(localStorage.getItem("turn"));
    const gameOver = JSON.parse(localStorage.getItem("game-over"));
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
            btn.innerHTML = JSON.parse(localStorage.getItem("mark"));
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
}

main();