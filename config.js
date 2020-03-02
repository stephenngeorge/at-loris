module.exports = {
  syntax: {
    html: {
      // matches the html comment syntax anywhere in the line
      singleLineComment: /<!--\s?[a-zA-Z0-9!-@\'\"\s]*\s?-->/,
      // matches the html comment syntax at the start of a line
      multiLineStart: /^<!--/,
      // match the closing tag of an html comment at the end of
      // a line
      multiLineEnd: /-->$/
    },
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