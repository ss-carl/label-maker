const puppeteer = require('puppeteer')

const options = {}

const launch = async () => {
  const browser = await puppeteer.launch(options)
  browser.on('disconnected', () => f('disconnected'))
  browser.on('targetchanged', () => f('targetchanged'))
  browser.on('targetcreated', () => f('targetcreated'))
  browser.on('targetdestroyed', () => f('targetdestroyed'))
  browser.on('error', () => f('error'))
  const pages = Promise.all([
    browser.newPage(),
    browser.newPage(),
    browser.newPage(),
  ])
  pages.then(pages => {
    console.log(pages[0] === pages[0])
    console.log(pages[0] === pages[1])
    console.log(pages[0] === pages[2])
  })
}

function f() { console.log(arguments) }

launch()
  .then(f)
  .catch(f)
