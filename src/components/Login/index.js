// @flow
import React from 'react'
import compose from 'recompose/compose'
import get from 'lodash/get'

import loginData from '../../modules/loginData'
import Login from './Login'
import User from './User'

const enhance = compose(loginData)

const MyLogin = ({ loginData }: { loginData: Object }) => {
  const token = get(loginData, 'login.token')

  if (!token) {
    return <Login />
  }
  return <User />
}

export default enhance(MyLogin)
