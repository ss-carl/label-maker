const puppeteer = require('puppeteer')

const options = {}

const launch = async () => {
  const browser = await puppeteer.launch(options)
  browser.on('disconnected', () => f('disconnected'))
  browser.on('targetchanged', () => f('targetchanged'))
  browser.on('targetcreated', () => f('targetcreated'))
  browser.on('targetdestroyed', () => f('targetdestroyed'))
  browser.on('error', () => f('error'))
}

function f() { console.log(arguments) }

launch()
  .then(f)
  .catch(f)
