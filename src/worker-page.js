const worker_page_builder = (page) => async (content, resolve, reject) => {
  try {
    await page.setContent(content)
    const pdf = await page.pdf({})
    resolve(pdf)
  } catch (e) {
    reject(e)
  }
}

module.exports = worker_page_builder
