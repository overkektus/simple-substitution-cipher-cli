const fs = require('fs');
const util = require('util');
const chalk = require('chalk');

const TAG = '[utils]';

const fetchData = (path, charset) => {
  if (charset) return fs.readFileSync(path, charset);
  else return fs.readFileSync(path);
};

const fetchAlphabet = (path) => {
  const data = fs.readFileSync(path);
  return JSON.parse(data);
};

const printMessage = (type, TAG, textError) => {
  switch(type) {
    case 'error':
      console.log(chalk.red(`${TAG} ${textError}`));
      break;
    case 'warning':
      console.log(chalk.yellow(`${TAG} ${textError}`));
      break;
    case 'info':
      console.log(chalk.blue(`${TAG} ${textError}`));
      break;
    case 'success':
      console.log(chalk.green(`${TAG} ${textError}`));
      break;
    default:
      console.log(chalk.grey(`${TAG} ${textError}`));
  }
};

module.exports = {
  fetchData,
  fetchAlphabet,
  printMessage
};