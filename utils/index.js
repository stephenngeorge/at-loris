const fs = require('fs')
const readline = require('readline')

module.exports = {
  // return contents of file as a string
  // @param file: string - url to the file that is to be read
  getCommentBlock: file => {
    return new Promise((resolve, reject) => {
      let fileContents = []
      const interface = readline.createInterface({
        input: fs.createReadStream(file),
        output: null
      })
      interface.on('line', line => {
        if (line.match(/\/\//)) fileContents.push(line)
      })
      interface.on('close', () => {
        resolve(fileContents)
      })
    })
  }
}