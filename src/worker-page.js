const worker_page_builder = async (browser) => {
  let page = await browser.newPage()

  const reset = async () => {
    page = null
    page = await browser.newPage()
  }

  page.on('error', reset)

  return async (content, options) => {
    if (!page) {
      throw new Error('page is not available')
    }
    await page.setContent(content)
    return await page.pdf(options)
  }
}

module.exports = worker_page_builder
