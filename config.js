module.exports = {
  port: process.env.PORT || 3090,
  db: {
    port: 27017,
    host: 'localhost',
    name: 'authentication'
  }
}