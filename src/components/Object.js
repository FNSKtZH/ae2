// @flow
import React from 'react'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

const enhance = compose(inject('store'), observer)

const Object = ({ store }: { store: Object }) => <div>Object</div>

export default enhance(Object)
