module.exports = function(app) {
  app.get('/ping', function(req, res, next) {
    res.send({pong:true});
  });
  app.post('/pong', function(req, res, next) {
    res.send({ping: true});
  });
}