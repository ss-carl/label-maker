const read_stream = async (stream) => {
  const buffers = []

  return new Promise((resolve, reject) => {
    stream.on('end', () => resolve(Buffer.concat(buffers)))
    stream.on('data', chunk => buffers.push(chunk))
    stream.on('error', err => reject(err))
  })
}

module.exports = read_stream
