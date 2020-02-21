const path = require('path')
const { getCommentBlock } = require('./utils')

const run = async () => {
  const test = await getCommentBlock(path.resolve(process.cwd(), 'test_content.html'))
  console.log(test)
}

run()