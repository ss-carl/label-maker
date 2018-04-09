const assert = require('assert')
const worker_page_builder = require('../src/worker-page')

const browser = {
  newPage: async () => page,
}

const page = {
  setContent: async (content) => {
    if (content === 'error') {
      throw new Error()
    }
    return `worked(${content})`
  },
  pdf: async (options) => JSON.stringify(options),
  on: () => {}
}

const worker_page = worker_page_builder(browser)

describe('the worker page', function() {
  it('should process content to a pdf without options', function() {
    return worker_page
      .then(page => page('content'))
      .then(result => assert(result === undefined))
  })

  it('should process content to a pdf with options', function() {
    return worker_page
      .then(page => page('content', { width: '6in' }))
      .then(result => assert(result === '{"width":"6in"}'))
  })

  it('should handle errors from setContent', function() {
    return worker_page
      .then(page => page('error'))
      .catch(err => assert(err))
  })

  it('should not explode if the page is not available', function() {
    const worker_page = worker_page_builder({
      newPage: async () => null,
    })
    return worker_page
      .then(page => page('null'))
      .catch(err => assert(err))
  })
})
