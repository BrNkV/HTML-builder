/**
* Импорт всех требуемых модулей.
* Создание потока записи в текстовый файл
* Вывод в консоль приветственного сообщения
* Ожидание ввода текста пользователем, с дальнейшей проверкой ввода на наличие ключевого слова exit
* Запись текста в файл
* Ожидание дальнейшего ввода
* Реализация прощального сообщения при остановке процесса
 */

const path = require('path');
const fs = require('fs');
const process = require('process');
const Emitter = require('events');


const filePath = path.join(__dirname, 'text02.txt');

fs.writeFile(filePath, 'test content', (err) => {
  if (err) throw err;
  console.log('файл создан');
});

fs.appendFile(filePath, '\ntest content 2', (err) => {
  if (err) throw err;
  console.log('текст добавлен');
});

