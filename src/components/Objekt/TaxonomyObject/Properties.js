// @flow
/**
 * TODO editing
 * if user is logged in and is orgAdmin or orgTaxonomyWriter
 * and object is not synonym
 * show editing symbol
 * if user klicks it, toggle store > editingTaxonomies
 * edit prop: see https://stackoverflow.com/a/35349699/712005
 */
import React, { Fragment } from 'react'
import compose from 'recompose/compose'
import { withApollo } from 'react-apollo'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import styled from 'styled-components'

import PropertyReadOnly from '../../shared/PropertyReadOnly'
import PropertyReadOnlyStacked from '../../shared/PropertyReadOnlyStacked'
import Property from '../../shared/Property'
import NewProperty from '../../shared/NewProperty'
import editingTaxonomiesData from '../../../modules/editingTaxonomiesData'

const PropertiesTitleContainer = styled.div`
  display: flex;
  padding-top: 10px;
`
const PropertiesTitleLabel = styled.p`
  flex-basis: 250px;
  text-align: right;
  padding-right: 5px;
  margin: 3px 0;
  padding: 2px;
  color: grey;
`
const PropertiesTitleLabelEditing = styled.p`
  margin: 3px 0;
  padding-bottom: 2px;
`
const PropertiesTitleLabelStacked = styled.p`
  margin: 3px 0;
  padding-bottom: 2px;
  color: grey;
`
const PropertiesTitleValue = styled.p`
  margin: 3px 0;
  padding: 2px;
  width: 100%;
`

const enhance = compose(withApollo, editingTaxonomiesData)

const Properties = ({
  client,
  editingTaxonomiesData,
  id,
  properties,
  objectData,
  stacked,
}: {
  client: Object,
  editingTaxonomiesData: Object,
  id: string,
  properties: Object,
  objectData: Object,
  stacked: Boolean,
}) => {
  const editing = get(editingTaxonomiesData, 'editingTaxonomies', false)
  const propertiesArray = Object.entries(properties)

  return (
    <Fragment>
      {propertiesArray.length > 0 && (
        <PropertiesTitleContainer>
          {editing ? (
            <PropertiesTitleLabelEditing>
              Eigenschaften:
            </PropertiesTitleLabelEditing>
          ) : stacked ? (
            <PropertiesTitleLabelStacked>
              Eigenschaften:
            </PropertiesTitleLabelStacked>
          ) : (
            <PropertiesTitleLabel>Eigenschaften:</PropertiesTitleLabel>
          )}
          <PropertiesTitleValue />
        </PropertiesTitleContainer>
      )}
      {sortBy(
        propertiesArray.filter(([key, value]) => value || value === 0),
        e => e[0]
      ).map(
        ([key, value]) =>
          editing ? (
            <Property
              key={`${id}/${key}/${value}`}
              id={id}
              properties={properties}
              field={key}
            />
          ) : stacked ? (
            <PropertyReadOnlyStacked key={key} value={value} label={key} />
          ) : (
            <PropertyReadOnly key={key} value={value} label={key} />
          )
      )}
      {editing && (
        <NewProperty
          key={`${id}/newProperty`}
          id={id}
          properties={properties}
        />
      )}
    </Fragment>
  )
}

export default enhance(Properties)
