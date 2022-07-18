const express = require("express");

const router = express.Router();


router.get("/", function(req, res, next) {
    res.render("game", {
        title: "Tic-Tac-Toe"
    });
});


module.exports = router;