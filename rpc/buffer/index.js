const protobuf = require('protocol-buffers')
const fs = require('fs')

const schemas = protobuf(fs.readFileSync(__dirname + '/test.proto', 'utf-8'))

const buffer = schemas.Column.encode({
  id: 1,
  name: 'Node.js',
  price: 84.1
})
console.log(buffer)

console.log(schemas.Column.decode(buffer))