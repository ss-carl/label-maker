const assert = require('assert')
const fs = require('fs')
const { Readable } = require('stream')
const route_builder = require('../../src/routes/label')

const templates = async (name, options) => {
  if (name === '/notfound') {
    const error = new Error()
    error.not_found = true
    throw error
  }
  if (name === '/overloaded') {
    return 'overloaded'
  }
  if (options) {
    return 'customized_content'
  }
  return 'content'
}

const pdf_maker = async (content, options) => {
  if (content === 'overloaded') {
    const error = new Error()
    error.overloaded = true
    throw error
  }
  if (options) {
    return `customized_pdf(${content})`
  }
  return `pdf(${content})`
}

const route = route_builder(templates, pdf_maker)

const new_ctx = (path, customized) => {
  return {
    path,
    request: new Readable({
      read() {
        if (customized) {
          this.push(`
          {
            "pdf": {
              "width": "3in",
              "height": "6in"
            },
            "template": {
              "special": true
            }
          }
          `)
        } else {
          this.push('{}')
        }
        this.push(null)
      }
    }),
  }
}

describe('the label route', function () {
  it('should return a pdf if the template exists', function () {
    const ctx = new_ctx('/label/found')
    return route(ctx).then(() => assert(ctx.body === 'pdf(content)'))
  })

  it('should 404 if the template does not exist', function () {
    const ctx = new_ctx('/label/notfound')
    return route(ctx).then(() => assert(ctx.status === 404))
  })

  it('should do nothing if the path is wrong', function () {
    const ctx = new_ctx('notlabel')
    return route(ctx).then(() => assert(!ctx.body))
  })

  it('should 503 if the pdf_maker is overloaded', function() {
    const ctx = new_ctx('/label/overloaded')
    return route(ctx).then(() => assert(ctx.status === 503))
  })

  it('should send the request body to templates and pdf_maker', function() {
    const ctx = new_ctx('/label/found', true)
    return route(ctx).then(() => assert(ctx.body === 'customized_pdf(customized_content)'))
  })

  it('should should not break if there is no request body', function() {
    const ctx = {
      path: '/label/found',
      request: new Readable({
        read() {
          this.push(null)
        }
      })
    }
    return route(ctx).then(() => assert(ctx.body === 'pdf(content)'))
  })
})
