const passfile = require(`./dbPass.json`)

module.exports = {
  connectionString: `postgres://${passfile.user}:${passfile.pass}@db:5432/ae`,
}
