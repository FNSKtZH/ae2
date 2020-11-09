import isUuid from 'is-uuid'

import invalidUuids from './invalidUuids'

/**
 * There exist two invalid uuids in arteigenschaften.ch!
 * stemming from manually added species...
 * reason for invalidity is explained here: https://github.com/afram/is-uuid/issues/4#issuecomment-521610801
 */

const isUuidModule = (val) =>
  isUuid.anyNonNil(val) || invalidUuids.includes(val)

export default isUuidModule
