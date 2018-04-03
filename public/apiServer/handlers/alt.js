// @flow
const app = require(`ampersand-app`)

module.exports = async (request, h) => {
  console.log('request.path:', request.path)
  console.log('request.query:', request.query)
  return await app.db.any('select * from ae.alt_standard')
}
