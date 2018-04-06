const process = require('process')
const puppeteer = require('puppeteer')

const options = {
  args: ['--no-sandbox', '--disable-setuid-sandbox'] // https://github.com/Googlechrome/puppeteer/issues/290
}

function explode() {
  console.log('exploding', arguments)
  process.exit(1)
}

const browser_builder = async () => {
  const browser = await puppeteer.launch(options)
  browser.on('disconnected', explode)
  browser.on('error', explode)
  return browser
}

module.exports = browser_builder
