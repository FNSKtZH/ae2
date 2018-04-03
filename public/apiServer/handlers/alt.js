// @flow
/**
 * if no fields were passed: return standard fields
 * else: return passed fields added to standard fields
 */
const app = require(`ampersand-app`)

module.exports = async (request, h) => {
  const { fields, felder } = request.query
  //console.log('felder:', felder)
  //console.log('fields:', fields)
  const noFields = fields === undefined
  const noFelder = felder === undefined
  if (noFields && noFelder) {
    // No fields passed - returning standard fields
    return await app.db.any('select * from ae.alt_standard')
  }
  if (noFelder) {
    // need to extract fields from: fields
    return 'under construction'
  }
  if (noFields) {
    // need to extract fields from: felder
    return 'under construction'
  }
}
