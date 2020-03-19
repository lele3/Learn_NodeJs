// console.log(process.argv)
// process.arge 可以获取用户在命令行中输入的参数
let playerAction = process.argv[process.argv.length - 1]

let computerAction = ''
let random = Math.random() * 3
if (random < 1) {
  computerAction = 'rock'
} else if (random > 2) {
  computerAction = 'scissors'
} else {
  computerAction = 'paper'
}
console.log(computerAction)
if (computerAction === playerAction) {
  console.log('平局')
} else if (
  computerAction === 'rock' && playerAction === 'paper' ||
  computerAction === 'scissors' && playerAction === 'rock' ||
  computerAction === 'paper' && playerAction === 'scissors'
) {
  console.log('你赢了')
} else {
  console.log('你输了')
}