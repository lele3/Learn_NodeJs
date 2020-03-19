const eventloop = {
  queue: [],

  loop() {
    while (this.queue.length) {
      let callback = this.queue.shift()
      callback()
    }
    setTimeout(() => {
      this.loop()
    }, 50);
  },
  
  add(callback) {
    this.queue.push(callback)
  }
}

eventloop.loop()

setTimeout(() => {
  eventloop.add(function () {
    console.log('1st')
  })
}, 500);

setTimeout(() => {
 eventloop.add(function () {
   console.log('2nd')
 }) 
}, 800);