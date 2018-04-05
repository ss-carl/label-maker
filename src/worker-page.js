const worker_page_builder = (page) => (content, resolve, reject) => {
  return page.setContent(content)
    .then(() => page.pdf({

    }))
    .then(resolve)
    .catch(reject)
}

module.exports = worker_page_builder
