const assert = require('assert')
const pdf_maker_builder = require('../src/pdf-maker')
const { Writable } = require('stream')

const new_workstream = () => {
  return new Writable({
    objectMode: true,
    highWaterMark: 2,
    write({ content, options, resolve, reject }, _, callback) {
      setImmediate(() => {
        resolve(`made_pdf(${content}, ${JSON.stringify(options)})`)
        callback()
      })
    }
  })
}

describe('the pdf maker', function () {
  it('should become overloaded if it gets too much work', function () {
    const pdf_maker = pdf_maker_builder(new_workstream())
    return Promise.all([
      pdf_maker('one'),
      pdf_maker('two'),
      pdf_maker('three'),
    ])
      .then(() => assert(false))
      .catch(err => assert(err.overloaded))
  })

  it('should eventually do work', function () {
    const pdf_maker = pdf_maker_builder(new_workstream())
    return pdf_maker('one', {}).then(pdf => assert(pdf === 'made_pdf(one, {})'))
  })

  it('should recover after being overloaded', function () {
    const pdf_maker = pdf_maker_builder(new_workstream())
    return Promise.all([
      pdf_maker('one'),
      pdf_maker('two'),
      pdf_maker('three')
    ])
      .then(() => assert(false))
      .catch(err => {
        assert(err.overloaded)
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            pdf_maker('four')
              .then(resolve)
              .catch(reject)
          }, 10)
        })
      })
  })
})
