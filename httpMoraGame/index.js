const http = require('http')
const fs = require('fs')
const url = require('url')
const querystring = require('querystring')
const game = require('./game')

let playerWon = 0  // 玩家赢的次数

let playerLastAction = null; // 玩家上次的行为
let sameCount = 0; // 玩家出相同行为的次数


http.createServer(function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  const parseUrl = url.parse(req.url)

  if (parseUrl.pathname === '/favicon.ico') {
    res.writeHead(200)
    res.end()
    return
  }


  if (parseUrl.pathname === '/game') {
    const query = querystring.parse(parseUrl.query)
    const playerAction = query.action

    if (playerWon >= 3 || sameCount === 9) {
        res.writeHead(500)
        res.end("我再也不和你玩了！")
        return
    }

    if (playerLastAction && playerLastAction === playerAction) {
      sameCount++
    } else {
      sameCount = 0
    }
    if (sameCount >= 3) {
        sameCount = 9
        res.writeHead(400)
        res.end("你作弊！")
        return
    }
   
    playerLastAction = playerAction
    const gameResult = game(playerAction)
    res.writeHead(200)
    if (gameResult == 0) {
      res.end('平局')
    } else if (gameResult == 1) {
      res.end('你输了')
    } else {
      res.end('你赢了')
      playerWon++
    }
  }

  if (parseUrl.pathname === '/') {
    fs.createReadStream(__dirname + '/index.html').pipe(res)
  }

}).listen(3500)