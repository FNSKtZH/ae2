// @flow
import React from 'react'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText,
} from 'material-ui/Card'
import styled from 'styled-components'
import get from 'lodash/get'

const enhance = compose(inject('store'), observer)

const Taxonomy = ({ store, taxonomy }: { store: Object, taxonomy: Object }) => {
  console.log('Taxonomy:', taxonomy)
  const tax = get(taxonomy, 'taxonomyByTaxonomyId', {})
  const taxName = tax.name || '(Name fehlt)'
  return <Card>{taxName}</Card>
}

export default enhance(Taxonomy)
