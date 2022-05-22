const fs = require('fs');
const path = require('path');

const text = path.join(__dirname, 'text.txt');

let stream = new fs.ReadStream(text, { encoding: 'utf-8' });

stream.on('readable', function () {
  let data = stream.read();
  if (data != null) console.log(data);
});

// stream.on('end', function () {
//   console.log('THE END');
// });

stream.on('error', function (err) {
  if (err.code == 'ENOENT') {
    console.log('Файл не найден');
  } else {
    console.error(err);
  }
});