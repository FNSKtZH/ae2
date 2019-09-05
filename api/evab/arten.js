const pgp = require(`pg-promise`)()
const db = pgp(
  `postgres://${process.env.DBUSER}:${process.env.DBPASS}@api.artdaten.ch:5432/ae`,
)

module.exports = async (req, res) => {
  let result
  try {
    result = await db.any('select * from ae.evab_arten')
  } catch (error) {
    return res.status(500).json(error)
  }
  const print = result && result.length && result[0] ? result[0] : 'oops'
  console.log('print:', print)
  res.status(200)
  res.json(result)
}
