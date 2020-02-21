module.exports = {
  syntaxes: {
    js: {
      // matches a double slash anywhere in the file
      singleLineComment: /\/\//,
      // matches a forward slash followed by an asterisk
      // at the start of a line
      multiLineStart: /^\/\*/,
      // matches an asterisk followed by a forward slash at the
      // end of a line
      multiLineEnd: /\*\/$/
    }
  }
}