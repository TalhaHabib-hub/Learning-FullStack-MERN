console.log('1. Start of the script');

//Microtask queue (promise)
Promise.resolve().then(() => console.log('2. Microtask 1'));
// has higher priority then settimeouts
// Timer queue
setTimeout(() => {
  console.log('3. Timer 1')
}, 0);

//I/O queue
const fs = require('fs');
fs.readFile('user-details.txt', () => console.log('4. I/O operation'));

// Check queue
setImmediate(() => console.log('5. Immediate 1'));

// close queue
process.on('exit', (code) => {
  console.log('6. Exit event');
})

console.log('7. End of the script')