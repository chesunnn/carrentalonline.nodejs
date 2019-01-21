let env = process.env.NODE_ENV || 'development'
let settings = require('./server/config/settings')[env]
var compression = require('compression')

var express = require('express')
var sitemap = require('express-sitemap')();
var serveStatic = require('serve-static')
const app = require('express')()
app.use(compression())
app.get(['/css/*','/images/*'],express.static('public',{maxAge:7*86400000}));
app.get(['/fonts/*'],express.static('public',{maxAge:30*86400000}));

function setCustomCacheControl(res, path) {
  if (serveStatic.mime.lookup(path) === 'text/html') {
    // Custom Cache-Control for HTML files
    res.setHeader('Cache-Control', 'public, max-age=0')
  }
}
app.use(serveStatic(__dirname + '/public/css/', {
  maxAge: '7d',
  setHeaders: setCustomCacheControl
}))

app.use(serveStatic(__dirname + '/public/images/', {
  maxAge: '7d',
  setHeaders: setCustomCacheControl
}))

app.use(serveStatic(__dirname + '/public/fonts/', {
  maxAge: '30d',
  setHeaders: setCustomCacheControl
}))

require('./server/config/database')(settings)
require('./server/config/express')(app)
require('./server/config/routes')(app)
require('./server/config/passport')()
app.listen(settings.port)
sitemap.generate(app)
sitemap.XMLtoFile('./public/sitemap.xml')
sitemap.TXTtoFile('./public/robots.txt')
console.log(`Server listening on port ${settings.port}...`)
