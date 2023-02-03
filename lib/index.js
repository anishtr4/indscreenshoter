 
const rimraf = require('rimraf')

const fs = require('fs')
const { promisify } = require('util')

 

const directoryExists = filepath => {
  return fs.existsSync(filepath)
}

const readdir = promisify(fs.readdir)
const mkdir = promisify(fs.mkdir)
const rm = promisify(rimraf)

module.exports = {
  thumbnail,
  directoryExists,
  readdir,
  mkdir,
  rm
}
