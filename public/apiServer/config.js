const passfile = require(`../dbPass.json`)

module.exports = {
  connectionString: `postgres://${passfile.user}:${
    passfile.pass
  }@localhost:5432/ae`,
}
