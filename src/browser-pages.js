const browser_pages = (browser, count) => {
  const pages = []
  for (let i = 0; i < count; i++) {
    pages.push(browser.newPage())
  }
  return Promise.all(pages)
}

module.exports = browser_pages
