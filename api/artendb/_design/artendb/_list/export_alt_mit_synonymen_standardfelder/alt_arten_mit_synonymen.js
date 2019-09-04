const alt = require('../../../../../handlers/alt.js')

module.exports = async (req, res) => {
  const result = await alt(req, res)
  res.json(result)
}
