const glob = require('glob')

// let result = null
// console.time('glob')
// result = glob.sync(__dirname + '/**/*/')
// console.timeEnd('glob')
// console.log(result)

let result = null
console.time('glob')
glob(__dirname + '/**/*', function (err, res) {
  result = res
  console.log('get result', result)
})
console.timeEnd('glob')
console.log(1 + 1)