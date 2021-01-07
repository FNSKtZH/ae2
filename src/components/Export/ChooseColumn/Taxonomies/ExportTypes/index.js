import React from 'react'
import sortBy from 'lodash/sortBy'
import { useQuery, gql } from '@apollo/client'

import ExportType from './ExportType'

const exportTypes = ['Arten', 'Lebensräume']

const taxonomiesQuery = gql`
  query AllTaxonomiesQuery {
    allTaxonomies {
      nodes {
        id
        name
        type
      }
    }
  }
`

const ExportTypes = () => {
  const { data, error } = useQuery(taxonomiesQuery)

  const allTaxonomies = sortBy(data?.allTaxonomies?.nodes ?? [], 'name')

  if (error) return `Error fetching data: ${error.message}`

  return exportTypes.map((type) => {
    const taxonomies = allTaxonomies
      .filter((t) => {
        if (type === 'Arten') return t.type === 'ART'
        return t.type === 'LEBENSRAUM'
      })
      .sort((t) => t.name)

    return <ExportType key={type} type={type} taxonomies={taxonomies} />
  })
}

export default ExportTypes
