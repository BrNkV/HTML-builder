/**
* Импорт всех требуемых модулей
* Чтение содержимого папки secret-folder
* Получение данных о каждом объекте который содержит папка secret-folder
* Проверка объекта на то, что он является файлом
* Вывод данных о файле в консоль

    start - node 03-files-in-folder
 */

const path = require('path');
const fs = require('fs');

const folderPath = path.join(__dirname, '/secret-folder');

fs.readdir(
  folderPath,
  { withFileTypes: true },
  (error, files) => {
    if (error) console.log(error.message);
    else {
      const noEmpty = files.filter((elem) => elem.isFile());
      noEmpty.forEach((file) => {
        let out = [];
        let filePath = path.join(folderPath, file.name);
        out.push(path.parse(filePath).name);
        out.push(path.extname(filePath).slice(1));

        fs.stat(filePath, (error, stats) => {
          if (error) console.log(error.message);
          else {
            out.push(stats.size);
            console.log(out.join(' | ') + 'b');
          }
        });
      });
    }
  },
);