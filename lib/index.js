 


const fs = require('fs')
const { promisify } = require('util')

 

const directoryExists = filepath => {
  return fs.existsSync(filepath)
}

const readdir = promisify(fs.readdir)
const mkdir = promisify(fs.mkdir)
 

module.exports = {
  thumbnail,
  directoryExists,
  readdir,
  mkdir,
  rm
}
