const path = require('path')
const { getComments } = require('./read-comments')

const run = async () => {
  const comments = await getComments(path.resolve(process.cwd(), 'test_content.js'))
  console.log(comments)
}

run()