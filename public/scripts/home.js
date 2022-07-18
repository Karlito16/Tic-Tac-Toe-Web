
function onJoin() {
    const nickname = document.getElementById("nickname").value;
    if (nickname.length < 2) {
        alert("Please use more than 1 character for nickname!");
    } else {
        localStorage.setItem("nickname", nickname);
        location.replace("/game");
    }
}