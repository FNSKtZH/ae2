// @flow
/**
 * Return these fields:
 * - idArt: MSAccess GUID, id
 * - nummer: TaxonomieID
 * - wissenschArtname:
 *   - Artname.substring(0, 255)
 *   -  or: Gattung + Art
 * - deutscherArtname: ['Name Deutsch'].substring(0, 255)
 * - status:
 *   - Fauna: 'A'
 *   - Moose: 'A'
 *   - Flora: codiereFloraStatus(Status)
 * - klasse:
 *   - Fauna: ZhGis.properties['GIS-Layer'].substring(0, 50)
 *   - Flora: 'Flora'
 *   - Moose: 'Moose'
 */
const app = require(`ampersand-app`)

module.exports = (request, callback) =>
  app.db
    .any(`select * from ae.evab_arten`)
    .then(result => callback(null, result))
    .catch(error => callback(error, null))
