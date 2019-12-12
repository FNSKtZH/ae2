const passfile = require(`./dbPass.json.js`)

module.exports = {
  connectionString: `postgres://${passfile.user}:${passfile.pass}@localhost:5432/ae`,
}
