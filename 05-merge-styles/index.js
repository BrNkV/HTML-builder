/**
* 1. Импорт всех требуемых модулей
* 3. Чтение содержимого папки **styles**
* 4. Проверка является ли объект файлом и имеет ли файл нужное расширение
* 4. Чтение файла стилей
* 5. Запись прочитанных данных в массив
* 6. Запись массива стилей в файл **bundle.css**

    start -- node 05-merge-styles
 */

const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, 'styles');
const bundlePath = path.join(__dirname, 'project-dist');

fs.readdir(stylesPath, 
  (err, files) => {
    const cssList = files.filter(value => value.slice(value.lastIndexOf('.')) === '.css');
    let out = '';
    cssList.forEach(elem => {
      fs.readFile(path.join(stylesPath, elem), 'utf-8', 
        (err, data) => {
          out += data;
          fs.writeFile(path.join(bundlePath, 'bundle.css'), out, 
            err => {
              if (err) throw err;
            });
        });
    });
  });