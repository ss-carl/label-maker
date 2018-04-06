const worker_pages_builder = (browser, count, worker_page_builder) => {
  const pages = []
  for (let i = 0; i < count; i++) {
    const worker_page = worker_page_builder(browser)
    pages.push(worker_page)
  }
  return Promise.all(pages)
}

module.exports = worker_pages_builder
