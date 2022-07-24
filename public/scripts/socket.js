import { turnSwitch, updateBoard, displayNewGameButton, displayInfo, displayTurnInfo } from "./utils.js";


export default function startup(gameParams) {
    const ws = new WebSocket("ws://192.168.1.10:3000");        // static ip address, needs to be updated for every new wlan connection

    ws.addEventListener("open", function(event) {
        console.log("Connection opened");
        ws.send(JSON.stringify({ method: "nickname", params: localStorage.getItem("nickname") }));
    });

    ws.addEventListener("message", function(event) {
        console.log("[Received] %s", event.data);
        const { method, params } = JSON.parse(event.data);

        if (method === "game-start") {
            gameParams.setParams(params);
            displayTurnInfo(gameParams);
        } 
        else if (method === "continue") {
            updateBoard(params, gameParams);
            turnSwitch(gameParams);
        } 
        else if (method === "won" || method === "lost" || method === "draw") {
            updateBoard(params, gameParams);
            displayInfo(method === "draw" ? "Draw!" : `You ${method}!`, method === "won" ? "green" : "red");
            gameParams.updateGameParameter("game-over", () => true);
            displayNewGameButton(5000);     // ms
        } 
        else if (method === "opponent-disconnected") {
            displayInfo(`${gameParams.getGameParameter("opponent")} left the game!`);
            displayNewGameButton(0);
        }
    });

    ws.addEventListener("close", function(event) {
        console.log("Connection closed!");
    });


    return ws;
}
