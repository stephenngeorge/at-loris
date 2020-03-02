module.exports = {
  // reads a comment and check for directives
  // @param comment: string - the comment to be processed
  // @note: comment should be an object of shape:
  // {
  // ..type: SINGLE LINE || MULTI LINE,
  // ..language: String (e.g. js, html etc),
  // ..fileName: String,
  /// IF SINGLE LINE:
  // ..lineNumber: Number,
  // ..line:  String
  /// IF MULTI LINE:
  // ..lines: Array[
  // ....{ lineNumber: Number, line: String }
  // ..]
  // }
  processComment: comment => {

  }
}

// Plan is to set up a simple interpreter - iterate over characters,
// check for match against a directive then process accordingly