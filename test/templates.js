const assert = require('assert')
const templates_builder = require('../src/templates')

const templates = templates_builder()

describe('templates', function() {
  it('should render an existing template', function() {
    return templates('/sample.ejs').then(template => assert(template))
  })

  it('should flag not_found for missing templates', function() {
    return templates('notfound').catch(err => assert(err.not_found))
  })

  it('should flag not_found for too short template name', function() {
    return templates('/').catch(err => assert(err.not_found))
  })

  it('should flag not_found for empty template name', function() {
    return templates('').catch(err => assert(err.not_found))
  })

  it('should flag not_found for null template name', function() {
    return templates(null).catch(err => assert(err.not_found))
  })
})
