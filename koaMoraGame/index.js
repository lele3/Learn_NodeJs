const koa = require('koa')
const mount = require('koa-mount')
const fs = require('fs')
const game = require('./game')

const app = new koa()

let playerWon = 0  // 玩家赢的次数
let playerLastAction = null; // 玩家上次的行为
let sameCount = 0; // 玩家出相同行为的次数


app.use(
  mount('/favicon.ico', function (ctx) {
    ctx.status = 200
  })
)

const gameKoa = new koa()

gameKoa.use(async function (ctx, next) {
  if (playerWon >= 3) {
      ctx.status = 500
      ctx.body = "我再也不和你玩了！"
      return
  }
  // 通过next执行后续中间件
  await next()

  // 当后续中间件执行完之后，会执行到这个位置
  if (ctx.playerWon) {
      playerWon++
  }
})

gameKoa.use(async function (ctx, next) {
  const query = ctx.query
  const playerAction = query.action

  if (sameCount === 9) {
      ctx.status = 500
      ctx.body = "我再也不和你玩了！"
      return
  }
  if (playerLastAction && playerLastAction === playerAction) {
      sameCount++
  } else {
      sameCount = 0
  }
  if (sameCount >= 3) {
      sameCount = 9
      ctx.status = 400
      ctx.body = "你作弊！"
      return
  }

  playerLastAction = playerAction
  // 把用户操作挂在ctx上传递给下一个中间件
  ctx.playerAction = playerLastAction
  await next()
})

gameKoa.use(async function (ctx, next) {
  const playerAction = ctx.playerAction
  const gameResult = game(playerAction)
  ctx.status = 200
  await new Promise(resolve => {
    setTimeout(() => {
        if (gameResult == 0) {
            ctx.body = "平局"
        } else if (gameResult == 1) {
            ctx.body = "你输了"
        } else {
            ctx.body = "你赢了"

            ctx.playerWon = true
        }
        resolve()
    }, 500)
  })
  
  
})

app.use(
  mount('/game', gameKoa)
)

app.use(
  mount('/', function (ctx) {
    ctx.status = 200
    ctx.body = fs.readFileSync(__dirname + "/index.html", "utf-8")
  })
)

app.listen(3500)