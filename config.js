module.exports = {
  port: process.env.PORT || 3090,
  db: {
    port: 27017,
    host: 'localhost',
    name: 'authentication'
  },
  // TODO: When implementing this project for real move the secret to a separate/private
  //       file or add config.js to .gitignore
  secret: "ThisIsAsampleSecret_PleaseNeverCommitToGitInARealProject!"
}