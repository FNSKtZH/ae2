// @flow
const app = require(`ampersand-app`)

module.exports = async (request, h) => {
  //console.log('request:', request)
  console.log('request.path:', request.path)
  console.log('request.params:', request.params)
  console.log('request.paramsArray:', request.paramsArray)
  console.log('request.payload:', request.payload)
  //console.log('h:', h)
  return await app.db.any('select * from ae.alt_standard')
}
