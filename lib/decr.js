const fs = require('fs');

const utils = require('./utils');

const alphabet = utils.fetchAlphabet('./data/alphabet.json');

const TAG = '[decr]';

exports.command = ['decr [pathKey] [pathText] [pathTo]', 'dencrypt', 'd'];

exports.describe = 'file decryption';

exports.builder = {
  
}

exports.handler = function(argv) {
  read(argv.pathKey, 'utf-8', (error, key) => {
    if(error) utils.printMessage('error', TAG, 'Не удалось прочитать файл ключа');
    
    read(argv.pathText, 'utf-8', (error, data) => {
      if(error) utils.printMessage('error', TAG, 'Не удалось прочитать файл текста для расшифрования');
      
      decryption(key, data, (decrData) => {
        fs.writeFile('./decrypted.txt', decrData, error => {
          if (error) utils.printMessage('error', TAG, 'Ошибка при записи зашифрованного файла');
          else {
            utils.printMessage('success', TAG, 'Текст успешно расшифрован: ');
            utils.printMessage('info', TAG, decrData);
          }
        });
      });
    });
  });
};

const decryption = (key, data, done) => {
  const decrData = [];
  data.forEach(val => {
    key.findIndex((el, index) => {
      if (el === val) decrData.push(alphabet[index]);
    });
  });
  done(decrData.join(''));
};

const read = (path, charset, done) => {
  fs.readFile(path, charset, (error, data) => {
    if (error) return done(error);

    const arr = Array.from(data);
    done(null, arr);
  });
}