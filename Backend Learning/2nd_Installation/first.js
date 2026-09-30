console.log('Talha Habib InsaAllah')

const fs = require('fs');

fs.writeFile('output.txt', 'I wrote in the file!', (err) => {
  if (err) console.log('Error occured');
  else console.log('File wirtten Successfully')
})
