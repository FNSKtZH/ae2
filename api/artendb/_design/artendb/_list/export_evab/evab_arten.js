const pgp = require(`pg-promise`)()
const db = pgp(
  `postgres://${process.env.DBUSER}:${process.env.DBPASS}@api.artdaten.ch:5432/ae`,
)

module.exports = (req, res) => {
  db.any('select * from ae.evab_arten').then(result => {
    res.send(result)
  })
}
