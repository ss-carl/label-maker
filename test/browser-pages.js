const assert = require('assert')
const browser_pages = require('../src/browser-pages')

const browser = {
  newPage: () => Promise.resolve('page')
}

describe('worker pages', function() {
  it('should build a list of pages', function() {
    return browser_pages(browser, 3)
      .then(pages => {
        assert(pages[0] === 'page')
        assert(pages[1] === 'page')
        assert(pages[2] === 'page')
      })
  })
})
