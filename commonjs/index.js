// console.log(process.argv)
// process.arge 可以获取用户在命令行中输入的参数
let playerAction = process.argv[process.argv.length - 1]

const game = require('./lib')

// const result = game(playerAction)
// console.log(result)
let count = 0;
process.stdin.on('data', e => {
  const playerAction = e.toString().trim()
  const result = game(playerAction)
  if (result === -1) {
    count++
  }
  if (count === 3) {
    console.log('你太厉害了，我不玩了')
    process.exit()
  }
})