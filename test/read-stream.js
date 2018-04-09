const assert = require('assert')
const { Readable } = require('stream')
const read_stream = require('../src/read-stream')

describe('read stream', function() {
  it('should read a stream into a string', function() {
    const stream = new Readable({
      read() {
        this.push('one')
        this.push('two')
        this.push('three')
        this.push('done')
        this.push(null)
      }
    })
    return read_stream(stream).then(result => assert(result.toString() === 'onetwothreedone'))
  })
})
