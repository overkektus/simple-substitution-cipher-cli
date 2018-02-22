const fs = require('fs');

const utils = require('./utils');

const alphabet = utils.fetchAlphabet('./data/alphabet.json');
const key = [];

const TAG = '[genkey]';

exports.command = ['genkey [pathTo]', 'generationKey', 'g'];

exports.describe = 'create key for file encryption/decription';

exports.builder = {
  
}

exports.handler = function(argv) {
  generateKey(alphabet);
  if(key.length > 0) {
    utils.printMessage('success', TAG, 'Ключ успешно сгенерирован');
    utils.printMessage('info', TAG, key.toString());
    fs.writeFile('key.txt', key.join(''), err => {
      if(err) utils.printMessage('error', TAG, 'Ошибка при записи файла ключа');
    });
  }
  else
    utils.printMessage('error', TAG, 'Ошибка при генерации ключа');
};

const generateKey = (alphabet) => {
  const randNums = randMass(25, 0, 26);
  alphabet.forEach((el, i) => {
    key[randNums[i]] = el;
  });
  return key;
}

const randMass = (max, min, length) => {
	var result = [],
		resultSorted = [];

	if(typeof max !== 'number') return Math.random();
	if(typeof min !== 'number') return Math.floor(Math.random() * ++max);

	if(min > max) min = [max, max = min][0];                 

	if(!length || typeof length !== 'number') return Math.floor(Math.random() * (max - min + 1)) + min;

	if(length > max - min + 1) throw new RangeError('invalid length.');

	for(var j = 0, random, index; j < length; j++, max--){
		random = Math.floor(Math.random() * (max - min + 1)) + min;

		for(index = j; index && resultSorted[index-1] <= random; index--) random++; 

		result.push(random);
		resultSorted.splice(index, 0, random);
	}

	return result;
}
