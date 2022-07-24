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
            if (app.players.length >= 2) {
                const game = new Game(app.players.slice(0, 2), app.games);
                app.games.push(game);

                game.informPlayer(game.getPlayer(0), { method: "game-start", params: ["play", game.getPlayer(1).getNickname()] });
                game.informPlayer(game.getPlayer(1), { method: "game-start", params: ["wait", game.getPlayer(0).getNickname()] });

                app.players = app.players.slice(2);
            }
        }

        else if (method === "move") {
            const game = app.games.filter((game) => game.getGameBySocket(ws)).pop();
            const player = game.getPlayerBySocket(ws);
            const opponent = game.getOpponent(player);

            const boardSolved = game.onMove(params, player.getSocket());
            if (boardSolved) {
                game.informPlayer(player, { method: "won", params: params });
                game.informPlayer(opponent, { method: "lost", params: params });

                game.end();

                console.log(app.games);
            } else if (game.isOver()) {
                game.informPlayers({ method: "draw", params: params });

                game.end();
            } else {
                game.players().forEach((player) => {
                    player.getSocket().send(JSON.stringify({ method: "continue", params: params}))
                });
            }
        }
    });

    ws.on("close", function(data) {
        console.log("Client has disconnected!");

        const game = app.games.filter((game) => game.getGameBySocket(ws)).pop();
        if (game) {     // client is in the game
            const player = game.getPlayerBySocket(ws);

            game.informPlayer(game.getOpponent(player), { method: "opponent-disconnected", params: "" });
            game.end();

            app.players = app.players.filter((player_) => player_ !== player);
        }
    });
});
