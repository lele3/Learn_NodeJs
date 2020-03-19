module.exports = function(playerAction) {
    let computerAction = ""
    let random = Math.random() * 3
    if (random < 1) {
        computerAction = "rock"
    } else if (random > 2) {
        computerAction = "scissors"
    } else {
        computerAction = "paper"
    }
    if (computerAction === playerAction) {
        // console.log("平局")
        return 0
    } else if (
        (computerAction === "rock" && playerAction === "paper") ||
        (computerAction === "scissors" && playerAction === "rock") ||
        (computerAction === "paper" && playerAction === "scissors")
    ) {
        // console.log("你赢了")
        return -1
    } else {
        // console.log("你输了")
        return 1
    }
}
