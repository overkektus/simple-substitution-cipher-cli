const chalk =  require('chalk');
const fs = require('fs');

const utils = require('./utils');
const TAG = '[encr]';

const alphabet = utils.fetchAlphabet('./data/alphabet.json');

exports.command = ['encr [pathKey] [pathText] [pathTo]', 'encrypt', 'e'];

exports.describe = 'file encryption';

exports.builder = {
  
}

function read(path, charset, done) {
  fs.readFile(path, charset, (error, data) => {
    if (error) return done(error);

    const arr = Array.from(data);
    done(null, arr);
  });
}

function encrypt(key, data, done) {
  const encData = [];
  data.forEach(val => {
    alphabet.findIndex((el, index) => {
      if (el === val) encData.push(key[index]);
    });
  });
  done(encData.join(''));
}

exports.handler = function (argv) {
  read(argv.pathKey, 'utf-8', (error, key) => {
    if(error) utils.printMessage('error', TAG, 'Не удалось прочитать файл ключа');
    
    read(argv.pathText, 'utf-8', (error, data) => {
      if(error) utils.printMessage('error', TAG, 'Не удалось прочитать файл текста для шифрования');
      
      encrypt(key, data, (encData) => {
        fs.writeFile('./encrypted.txt', encData, error => {
          if (error) utils.printMessage('error', TAG, 'Ошибка при записи зашифрованного файла');
          else {
            utils.printMessage('success', TAG, 'Текст успешно зашифрован: ');
            utils.printMessage('info', TAG, encData);
          }
        });
      });
    });
  });
}