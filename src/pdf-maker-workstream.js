const process = require('process')
const { Writable } = require('stream')

const pdf_maker_workstream_builder = (worker_pages) => {
  var hanging_callback = null

  return new Writable({
    objectMode: true,
    write({ content, resolve, reject }, _, callback) {
      const worker_page = worker_pages.pop()

      if (!worker_page) {
        return reject(new Error('unexpected lack of available pages'))
      }

      const hanging_resolve = (result) => {
        resolve(result)
        worker_pages.push(worker_page)
        if (hanging_callback) {
          process.nextTick(hanging_callback)
          hanging_callback = null
        }
      }

      process.nextTick(worker_page, content, hanging_resolve, reject)

      if (worker_pages.length > 0) {
        callback()
      } else {
        hanging_callback = callback
      }
    }
  })
}

module.exports = pdf_maker_workstream_builder
