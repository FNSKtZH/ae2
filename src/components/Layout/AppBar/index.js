import React from 'react'
import { Location } from '@reach/router'

import Daten from './Daten'
import Doku from './Doku'

const Header = () => (
  <Location>
    {({ location }) => {
      const { pathname } = location
      const isDocs = pathname === '/Dokumentation'

      if (isDocs) return <Doku />
      return <Daten />
    }}
  </Location>
)

export default Header
