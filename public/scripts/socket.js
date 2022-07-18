
export default function startup() {
    const ws = new WebSocket("ws://192.168.5.201:3000");

    ws.addEventListener("open", function(event) {
        console.log("Connection opened");
        ws.send(JSON.stringify({ method: "nickname", params: localStorage.getItem("nickname") }));
    });

    ws.addEventListener("message", function(event) {
        console.log("[Received] %s", event.data);
        const { method, params } = JSON.parse(event.data);

        if (method === "game-start") {
            const turn = params === "play"; 
            const infoHeaderValue = turn ? "Your turn!" : "Opponent's turn!"; 
            localStorage.setItem("turn", JSON.stringify(turn));
            
            const mark = turn ? 'X' : 'O';
            localStorage.setItem("mark", JSON.stringify(mark));

            localStorage.setItem("game-over", JSON.stringify(false));

            const gameInfoHeader = document.getElementsByClassName("game-info-header")[0];
            gameInfoHeader.innerHTML = infoHeaderValue;
            gameInfoHeader.style["margin-bottom"] = "20px";
            document.getElementsByClassName("board")[0].style.display = "grid";  

        } else if (method === "continue") {
            const turn = JSON.parse(localStorage.getItem("turn"));
            if (!turn) {    // player who wasn't on turn updates his board
                document.getElementById(params).innerHTML = JSON.parse(localStorage.getItem("mark")) === 'X' ? 'O' : 'X';     // opponent's mark
            }
            // turn switch
            localStorage.setItem("turn", JSON.stringify(JSON.parse(localStorage.getItem("turn")) ? false : true));       // true if false, false if true

            // make a function!
            const infoHeaderValue = JSON.parse(localStorage.getItem("turn")) ? "Your turn!" : "Opponent's turn!"; 
            const gameInfoHeader = document.getElementsByClassName("game-info-header")[0];
            gameInfoHeader.innerHTML = infoHeaderValue;
            gameInfoHeader.style["margin-bottom"] = "20px";
            document.getElementsByClassName("board")[0].style.display = "grid";  
        } else if (method === "won" || method === "lost" || method === "draw") {
            // make a function!
            const infoHeaderValue = method === "draw" ? "Draw!" : `You ${method}!`; 
            const gameInfoHeader = document.getElementsByClassName("game-info-header")[0];
            gameInfoHeader.innerHTML = infoHeaderValue;
            gameInfoHeader.style["margin-bottom"] = "20px";
            gameInfoHeader.style["color"] = method === "won" ? "green" : "red";
            document.getElementsByClassName("board")[0].style.display = "grid";  

            localStorage.setItem("game-over", JSON.stringify(true));
        }
    });

    ws.addEventListener("close", function(event) {
        console.log("Connection closed!");
    });


    return ws;
}
