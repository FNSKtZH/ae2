// @flow
import React from 'react'

import OrgUser from './OrgUser'

const OrgUsersList = ({ orgUsers }: { orgUsers: Array<Object> }) =>
  orgUsers.map(orgUser => (
    <OrgUser orgUser={orgUser} key={`${orgUser.id}/${orgUser.role}`} />
  ))

export default OrgUsersList
