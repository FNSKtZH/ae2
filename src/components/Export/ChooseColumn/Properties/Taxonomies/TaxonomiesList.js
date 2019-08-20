import React from 'react'

import Taxonomy from './Taxonomy'

const Taxonomies = ({ taxonomies, initiallyExpanded }) =>
  taxonomies.map(tax => (
    <Taxonomy key={tax} tax={tax} initiallyExpanded={initiallyExpanded} />
  ))

export default Taxonomies
