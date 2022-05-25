/**
* 1. Импорт всех требуемых модулей
* 2. Прочтение и сохранение в переменной файла-шаблона
* 3. Нахождение всех имён тегов в файле шаблона
* 4. Замена шаблонных тегов содержимым файлов-компонентов
* 5. Запись изменённого шаблона в файл **index.html** в папке **project-dist**
* 6. Использовать скрипт написанный в задании **05-merge-styles** для создания файла **style.css**
* 7. Использовать скрипт из задания **04-copy-directory** для переноса папки **assets** в папку project-dist 

    start -- node 06-build-page
 */

const fs = require('fs');
const path = require('path');
const { readdir, mkdir, rm, readFile } = require('fs/promises');

const distPath = path.join(__dirname, 'project-dist');

console.log('задание ввыполняю, исправляю ошибки.... просьба по возможности перепроверить позже...Спасибо!');

async function build(pathDist) {
  await rm(pathDist, { recursive: true, force: true });
  await mkdir(pathDist, { recursive: true });

  const htmlDist = path.join(__dirname, 'project-dist', 'index.html');
  const htmlPath = path.join(__dirname, 'components');
  await bundleHtml(htmlDist, htmlPath);

  const cssDist = path.join(__dirname, 'project-dist', 'style.css');
  const cssPath = path.join(__dirname, 'styles');
  await bundleCss(cssDist, cssPath);

  const assetsDist = path.join(__dirname, 'project-dist', 'assets');
  const assetsPath = path.join(__dirname, 'assets');
  await copyFiles(assetsDist, assetsPath);
}

async function bundleHtml(htmlDist, htmlPath) {
  const tmpPath = path.join(__dirname, 'template.html');
  const ws = fs.createWriteStream(htmlDist);
  const rs = fs.createReadStream(tmpPath);
  const files = await readdir(htmlPath, { withFileTypes: true });

  rs.on('data', async (info) => {
    async function getData() {
      let data = info.toString();
      for (let file of files) {
        const filePath = path.resolve(htmlPath, file.name);
        const component = await readFile(filePath);
        const tag = path.parse(filePath).name;
        data = data.replace(`{{${tag}}}`, `${component}`);
      }
      return data;
    }
    let newData = await getData();
    ws.write(newData);
  });
}

async function bundleCss(cssDist, cssPath) {
  //   const stylesPath = path.join(__dirname, 'styles');
  //   const bundlePath = path.join(__dirname, 'project-dist');

  fs.readdir(cssPath,
    (err, files) => {
      const cssList = files.filter(value => value.slice(value.lastIndexOf('.')) === '.css');
      let out = '';
      cssList.forEach(elem => {
        fs.readFile(path.join(cssPath, elem), 'utf-8',
          (err, data) => {
            out += data;
            fs.writeFile(cssDist, out,
              err => {
                if (err) throw err;
              });
          });
      });
    });
}


function copyFiles(assetsDist, assetsPath) {

  //   const folderPath = path.join(__dirname, 'files');
  //   const copyPath = path.join(__dirname, 'files-copy');

  fs.mkdir(assetsDist,
    { recursive: true },
    err => {
      if (err) console.log(err);
    });

  fs.readdir(assetsDist, {withFileTypes: true},
    (err,
      data) => {
      if (err) console.log(err);

      data.forEach((elem) => {
        fs.unlink(`${assetsDist}/${elem}`,
          err => {
            if (err) console.log(err);
          });
      });
    });

  fs.readdir(assetsPath,
    (err, data) => {
      if (err) console.log(err);
      data.forEach((elem) => {
        fs.copyFile(`${assetsPath}/${elem}`, `${assetsDist}/${elem}`, (err) => {
          if (err) console.log(err);
          else console.log('copy file: ' + elem + ' - successful');
        });
      });
    });
}

build(distPath);