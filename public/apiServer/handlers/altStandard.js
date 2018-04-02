// @flow
const app = require(`ampersand-app`)

module.exports = (request, callback) =>
  app.db
    .any('select * from ae.alt_standard')
    .then(result => callback(null, result))
    .catch(error => callback(error, null))
