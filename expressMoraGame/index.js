const express = require('express')
const fs = require('fs')
const url = require('url')
const game = require('./game')
const querystring = require('querystring')

let playerWon = 0  // 玩家赢的次数
let playerLastAction = null; // 玩家上次的行为
let sameCount = 0; // 玩家出相同行为的次数

const app = express()

app.use('/favicon.ico', function (req, res) {
  // 一句 status(200) 代替 writeHead(200); end();
  res.status(200)
  // res.writeHead(200)
  // res.end()
})

app.use('/game',
  function (req, res, next) {
    if (playerWon >= 3 || sameCount === 9) {
        res.status(500)
        res.send("我再也不和你玩了！")
        // res.writeHead(500)
        // res.end("我再也不和你玩了！")
        return
    }
    // 通过next执行后续中间件
    next()

    // 当后续中间件执行完之后，会执行到这个位置
    if (res.playerWon) {
      playerWon++
    }
  },
  function (req, res, next) {
    // const parseUrl = url.parse(req.url)
    // const query = querystring.decode(parseUrl.query)
    // express自动帮我们把query处理好挂在request上
    const query = req.query
    const playerAction = query.action

    if (playerLastAction && playerLastAction === playerAction) {
      sameCount++
    } else {
      sameCount = 0
    }
    if (sameCount >= 3) {
        sameCount = 9
        res.status(400)
        res.send("你作弊！")
        // res.writeHead(400)
        // res.end("你作弊！")
        return
    }
    
    playerLastAction = playerAction
    // 把用户操作挂在res上传递给下一个中间件
    res.playerAction = playerLastAction
    next()
  }, function (req, res) {
    const playerAction = res.playerAction
    const gameResult = game(playerAction)
    res.status(200)
    if (gameResult == 0) {
      res.send("平局")
      // res.end('平局')
    } else if (gameResult == 1) {
      res.send("你输了")
      // res.end('你输了')
    } else {
      res.send("你赢了")
      // res.end('你赢了')
      res.playerWon = true
      // playerWon++
    }
  }
)

app.use('/', function (req, res) {
  // send接口会判断你传入的值的类型，文本的话则会处理为text/html
  // Buffer的话则会处理为下载
  res.send(fs.readFileSync(__dirname + "/index.html", "utf-8"))
})

app.listen(3500)