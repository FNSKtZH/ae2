// @flow
const app = require(`ampersand-app`)

module.exports = async () => await app.db.any('select * from ae.evab_arten')
