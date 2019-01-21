const controllers = require('../controllers')
const auth = require('./auth')

module.exports = (app) => {
  app.get('/', controllers.home.index)
  app.get('/about', controllers.home.about)

  app.get('/users/register', controllers.users.registerGet)
  app.post('/users/register', controllers.users.registerPost)
  app.get('/users/login', controllers.users.loginGet)
  app.post('/users/login', controllers.users.loginPost)
  app.post('/users/logout', controllers.users.logout)
  app.get('/users/me', controllers.users.profile)

  app.get('/cars/add', auth.isInRole('Admin'), controllers.cars.addGet)
  app.post('/cars/add', auth.isInRole('Admin'), controllers.cars.addPost)
  app.get('/cars/all', controllers.cars.all)
  app.post('/cars/rent/:id', auth.isAuthenticated, controllers.cars.rent)
  app.get('/robots.txt', function (req, res) {
    res.send('./public/robots.txt')})
  app.get('/sitemap.xml', function (req, res) {
    res.send('./public/sitemap.xml')})
  app.get('/googleac1b01c112fd2e9b.html', function(req, res) {
    res.send('./public/googleac1b01c112fd2e9b.html')
  })
  app.get('/favicon.ico', function(req, res)
  {
    res.send('./public/images/favicon.ico')
  })
  app.get('/privacypolicy', function(req, res)
  {
    res.redirect('https://www.freeprivacypolicy.com/privacy/view/f98a5f22d7015abbfdc44f34ec519518')
  })
    

  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found!')
    res.end()
  })
}
