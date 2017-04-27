const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const jwtAuthentication = passport.authenticate('jwt', {session:false});

module.exports = function(app) {
  app.get('/admin', jwtAuthentication, function(req, res) { res.send({admin:"private data"})});
    app.post('/signup', Authentication.signup);
}