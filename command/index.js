#!/usr/bin/env node
'use strict'

process.env.NODE_PATH = __dirname + '/../node_modules/'

var program = require('commander')
var pkg = require('../package')

var version = pkg.version

program
  .version(version)

program
  .usage('<command>')

  program
  .version(version)
  .usage('[options] [dir]')
  .option('--appid []', 'add appid', 0)
  .option('--type []', 'add cargo type: online or h5', 'online')
  .parse(process.argv);

require('./eamp')(program)