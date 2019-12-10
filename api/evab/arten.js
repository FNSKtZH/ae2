const { Pool } = require('pg')

const pool = new Pool()

module.exports = async (req, res) => {
  const client = await pool.connect()
  let result
  try {
    result = await client.query('select * from ae.evab_arten')
  } catch (error) {
    return res.status(500).json(error)
  } finally {
    client.release()
  }
  //result.rows.length = 25000
  res.json(result.rows)
}
