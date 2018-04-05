const pdf_maker_builder = (pdf_maker_workstream) => {
  let workstream_full = false
  pdf_maker_workstream.on('drain', () => workstream_full = false)

  return async (content) => {
    if (workstream_full) {
      const error = new Error('workstream is full')
      error.overloaded = true
      throw error
    }

    return new Promise((resolve, reject) => {
      workstream_full = !pdf_maker_workstream.write({ content, resolve, reject })
    })
  }
}

module.exports = pdf_maker_builder
