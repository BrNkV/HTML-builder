/**
* 1. Импорт всех требуемых модулей
* 2. Создание папки **files-copy** в случае если она ещё не существует
* 3. Чтение содержимого папки **files**
* 4. Копирование файлов из папки **files** в папку **files-copy**

    start -- node 04-copy-directory
 */

const fs = require('fs');
const path = require('path');
const folderPath = path.join(__dirname, 'files');
const copyPath = path.join(__dirname, 'files-copy');


(function copyFiles() {
  fs.mkdir(copyPath, 
    { recursive: true }, 
    err => {
      if (err) console.log(err);
    });
      
  fs.readdir(copyPath, 
    (err, 
      data) => {
      if (err) console.log(err);

      data.forEach((elem) => {
        fs.unlink(`${copyPath}/${elem}`, 
          err => {
            if (err) console.log(err);
          });
      });
    });
      
  fs.readdir(folderPath, 
    (err, data) => {
      if (err) console.log(err);
      data.forEach((elem) => {
        fs.copyFile(`${folderPath}/${elem}`, `${copyPath}/${elem}`, (err) => {
          if (err) console.log(err);
          else console.log('copy file: ' + elem + ' - successful');
        });
      });
    });
})();
  
