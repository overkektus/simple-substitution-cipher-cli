#!/usr/bin/env node

const argv = require('yargs')
  .version()
  .usage('Usage: nodejs-cli-app <command> [options]')
  .demandCommand(1, 'You need at least one command before moving on')
  .help('h')
  .alias('h', 'help')
  .argv;