const pgp = require(`pg-promise`)()
const db = pgp(
  `postgres://${process.env.DBUSER}:${process.env.DBPASS}@api.artdaten.ch:5432/ae`,
)

module.exports = async (req, res) => {
  const result = db.any('select * from ae.evab_arten')
  res.send(result)
}
