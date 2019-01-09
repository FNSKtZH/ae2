// @flow
import React from 'react'
import sortBy from 'lodash/sortBy'

import PropertyReadOnly from '../../../../shared/PropertyReadOnly'
import PropertyReadOnlyStacked from '../../../../shared/PropertyReadOnlyStacked'
import Property from '../../../../shared/Property'

const PropertyList = ({
  propertiesArray,
  properties,
  editing,
  stacked,
  id,
}: {
  propertiesArray: Array<string>,
  properties: Object,
  editing: Boolean,
  stacked: Boolean,
  id: string,
}) =>
  sortBy(
    propertiesArray.filter(([key, value]) => value || value === 0),
    e => e[0],
  ).map(([key, value]) =>
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
    ),
  )

export default PropertyList
