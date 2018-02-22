#!/usr/bin/env node

const chalk = require('chalk');
const argv = require('yargs')
  .version()
  .usage('Usage: nodejs-cli-app <command> [options]')
  .demandCommand(1, chalk.blue('You need at least one command before moving on'))
  .command(require('./lib/encr'))
  .command(require('./lib/decr'))
  .command(require('./lib/genkey'))
  .help('h')
  .alias('h', 'help')
  .argv;
