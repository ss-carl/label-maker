const assert = require('assert')
const worker_page_builder = require('../src/worker-page')

const page = {
  setContent: (content) => Promise.resolve(`worked(${content})`),
  pdf: (options) => Promise.resolve('thepdf'),
}

const worker_page = worker_page_builder(page)

const work = (content) => {
  return new Promise((resolve, reject) => {
    worker_page(content, resolve, reject)
  })
}

describe('the worker page', function() {
  it('should process content to a pdf', function() {
    return work('content')
      .then(result => assert(result === 'thepdf'))
  })
})
