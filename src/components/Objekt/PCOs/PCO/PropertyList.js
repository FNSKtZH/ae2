// @flow
import React from 'react'

import PropertyReadOnly from '../../../shared/PropertyReadOnly'
import PropertyReadOnlyStacked from '../../../shared/PropertyReadOnlyStacked'

const PropertyList = ({
  propertiesArray,
  stacked,
}: {
  propertiesArray: Array<string>,
  stacked: Boolean,
}) =>
  propertiesArray.map(([key, value]) =>
    stacked ? (
      <PropertyReadOnlyStacked key={key} value={value} label={key} />
    ) : (
      <PropertyReadOnly key={key} value={value} label={key} />
    ),
  )

export default PropertyList
