const express = require("express");
const path = require("path");
const WebSocket = require("ws");
const homeRouter = require("./routes/home.routes");
const gameRouter = require("./routes/game.routes");
const Player = require("./models/player");
const Game = require("./models/game");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    console.log("Incoming request at: " + req.url + "\t(" + req.ip + ")");
    next();
});

app.use("/", homeRouter);
app.use("/game", gameRouter);

const server = app.listen(3000);

const wss = new WebSocket.Server({ server: server });

app.players = [];
app.games = [];

//listen for clients; ws is single connection
wss.on("connection", function(ws) {
    console.log("New client connected!");

    ws.on("message", function(data) {
        console.log("[Received] %s", data);
        const { method, params } = JSON.parse(data);
        
        if (method === "nickname") {
            app.players.push(new Player(params, ws));

            //console.log("Players: " + app.players.length);
            if (app.players.length === 2) {
                let i = 0;
                app.games.push(new Game(app.players.slice(0, 2)));
                app.players.slice(0, 2).forEach((player => {
                    player.getSocket().send(JSON.stringify({ method: "game-start", params: i === 0 ? "play" : "wait"}));
                    ++i;
                }));
                app.players = app.players.slice(2);
            }
        }

        else if (method === "move") {
            const game = app.games.filter((game) => game.getGameBySocket(ws)).pop();
            const player = game.getPlayerBySocket(ws);
            const opponent = game.getOpponent(player);

            const boardSolved = game.onMove(params, player.getSocket());
            if (boardSolved) {
                player.getSocket().send(JSON.stringify({ method: "won", params: "" }));
                opponent.getSocket().send(JSON.stringify({ method: "lost", params: "" }));
                // end game
                player.getSocket().close();
                opponent.getSocket().close();
                app.games = app.games.filter((game_) => game !== game_);
            } else if (game.isOver()) {
                player.getSocket().send(JSON.stringify({ method: "draw", params: "" }));
                opponent.getSocket().send(JSON.stringify({ method: "draw", params: "" }));
                // end game
                player.getSocket().close();
                opponent.getSocket().close();
                app.games = app.games.filter((game_) => game !== game_);
            } else {
                for (let ply of [player, opponent]) {
                    ply.getSocket().send(JSON.stringify({ method: "continue", params: params}));
                }
            }
        }
    });

    ws.on("close", function(data) {
        console.log("Client has disconnected!");
        app.players = app.players.filter((player) => player.socket !== ws);
    });
});
