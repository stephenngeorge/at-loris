const fs = require('fs')
const readline = require('readline')

const config = require('../config')

const lineCounter = ((i = 0) => () => ++i)()

module.exports = {
  // return contents of file as a string
  // @param file: string - url to the file that is to be read
  getCommentBlock: file => {
    // initialise empty object for each file
    let multiLineTemplate = {}
    /**
     * ----------
     * GET FILE DATA
     * ----------
     */
    // separate the file path into its different parts
    const fileSegments = file.split('/')
    // get the final part of the file path (this will be the file name)
    // and split it by every dot.
    const fileNamePartials = fileSegments.pop().split('.')
    const fileData = {
      // the first section of the partials
      name: fileNamePartials[0],
      // the final section of the partials, the file extension
      // as we take the final part, we don't have to worry about
      // complicated extension. E.g. file.config.js will still
      // just be treated as a .js file.
      ext: fileNamePartials[fileNamePartials.length - 1]
    }
    // validate file type
    // (make sure we have this language in our syntaxes object)
    const validSyntax = ext => config.syntaxes.hasOwnProperty(ext)
    if (!validSyntax(fileData.ext)) {
      console.warn(`${fileData.name}.${fileData.ext}: unsupported file type...moving on!`)
      return
    }
    /**
     * ----------
     * SET REGEX
     * ----------
     */
    const {
      multiLineEnd,
      multiLineStart,
      singleLineComment
    } = config.syntaxes[fileData.ext]

    return new Promise((resolve, reject) => {
      try {
        // set initial state
        let isMultiLine = false
        let fileContents = []
        // create readline interface
        // @see https://nodejs.org/api/readline.html
        const interface = readline.createInterface({
          input: fs.createReadStream(file),
          output: null
        })
        
        /**
         * LISTEN FOR "LINE" EVENTS
         */
        interface.on('line', (line, lineNumber = lineCounter()) => {
          /**
           * PROCESS SINGLE LINE COMMENTS
           */
          // reads single line comments
          if (line.match(singleLineComment)) {
            const comment = {
              type: "SINGLE LINE",
              language: fileData.ext,
              fileName: fileData.name,
              lineNumber,
              line
            }
            fileContents.push(comment)
            return
          }
          /**
           * PROCESS MULTILINE COMMENTS
           */
          else {
            // --------------------
            // reads first line of a multiline comment
            if (line.match(multiLineStart)) {
              // fill in global data for the multi line block
              multiLineTemplate.type = "MULTI LINE"
              multiLineTemplate.language = fileData.ext
              multiLineTemplate.fileName = fileData.name
              // initialise the 'lines' property with the line in question
              multiLineTemplate.lines = [{
                lineNumber,
                line
              }]
              // setting state variable to true so all following lines
              // are included in the object, until the end pattern is matched
              isMultiLine = true
              return
            }
            // --------------------
            // reads inner lines of multiline comment
            if (isMultiLine && !line.match(multiLineEnd)) {
              // include each line within a multiline block in
              // the object.lines property
              multiLineTemplate.lines.push({
                lineNumber,
                line
              })
              return
            }
            // --------------------
            // reads final line of multiline comment
            if (line.match(multiLineEnd)) {
              // include the final line and then include the entire
              // object within fileContents (which will be returned
              // from this function)
              multiLineTemplate.lines.push({
                lineNumber,
                line: line
              })
              fileContents.push(multiLineTemplate)
              // reset the multiLineTemplate so other multi line
              // blocks that may exist in the file can be processed
              // from a clean slate.
              multiLineTemplate = {}
              isMultiLine = false
              return
            }
          }
        })

        /**
         * ----------
         * LISTEN FOR "CLOSE" EVENTS
         * ----------
         */
        // when the file has been fully read, return the constructed contents
        interface.on('close', () => {
          resolve(fileContents)
        })
      }
      /**
       * ----------
       * HANDLE ERRORS
       * ----------
       */
      catch (err) {
        reject(err)
      }
    })
  }
}