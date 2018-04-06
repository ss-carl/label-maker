const assert = require('assert')
const worker_pages = require('../src/worker-pages')

const browser = {
  newPage: async () => 'page'
}

const builder = async (browser) => `worker(${await browser.newPage()})`

describe('worker pages', function() {
  it('should build a list of pages', function() {
    return worker_pages(browser, 3, builder)
      .then(pages => {
        assert(pages[0] === 'worker(page)')
        assert(pages[1] === 'worker(page)')
        assert(pages[2] === 'worker(page)')
      })
  })
})
