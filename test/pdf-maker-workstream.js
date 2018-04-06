const assert = require('assert')
const pdf_maker_workstream_builder = require('../src/pdf-maker-workstream')

const write = (stream, content) => {
  return new Promise((resolve, reject) => stream.write({ content, resolve, reject }))
}

const worker_page = async (content) => {
  if (content === 'error') {
    throw new Error()
  }
  return `did_work(${content})`
}

describe('the pdf maker workstream', function () {
  it('should error when unexpectedly having no pages', function () {
    const pages = []
    const stream = pdf_maker_workstream_builder(pages)
    return write(stream, 'content')
      .catch(err => assert(err))
  })

  it('should send work to a page', function () {
    const pages = [ worker_page, ]
    const stream = pdf_maker_workstream_builder(pages)
    return write(stream, 'content')
      .then(result => assert(result === 'did_work(content)'))
  })

  it('should make progress even when overloaded', function () {
    const pages = [ worker_page, worker_page ]
    const stream = pdf_maker_workstream_builder(pages)
    return Promise.all([
      write(stream, 'content'),
      write(stream, 'content'),
      write(stream, 'content'),
      write(stream, 'content'),
    ])
  })

  it('should not break if a worker page has errors', function() {
    const pages = [ worker_page, worker_page ]
    const stream = pdf_maker_workstream_builder(pages)
    return Promise.all([
      write(stream, 'error').catch(err => assert(err)),
      write(stream, 'error').catch(err => assert(err)),
      write(stream, 'error').catch(err => assert(err)),
      write(stream, 'error').catch(err => assert(err)),
      write(stream, 'error').catch(err => assert(err)),
      write(stream, 'error').catch(err => assert(err)),
    ])
  })
})
