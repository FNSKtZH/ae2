import React, { useContext } from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import styled from 'styled-components'
import get from 'lodash/get'
import groupBy from 'lodash/groupBy'
import sumBy from 'lodash/sumBy'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { observer } from 'mobx-react-lite'

import Taxonomy from './Taxonomy'
import JointTaxonomy from './JointTaxonomy'
import mobxStoreContext from '../../../../../mobxStoreContext'
import ErrorBoundary from '../../../../shared/ErrorBoundary'

const Container = styled.div`
  margin: 10px 0;
`
const ErrorContainer = styled.div`
  padding: 5px;
`
const StyledCard = styled(Card)`
  background-color: rgb(255, 243, 224) !important;
`
const StyledCardActions = styled(CardActions)`
  justify-content: space-between;
  cursor: pointer;
  height: auto !important;
  background-color: #ffcc80;
`
const CardActionIconButton = styled(IconButton)`
  transform: ${(props) => (props['data-expanded'] ? 'rotate(180deg)' : 'none')};
`
const CardActionTitle = styled.div`
  padding-left: 8px;
  font-weight: bold;
  word-break: break-word;
`
const Count = styled.span`
  font-size: x-small;
  padding-left: 5px;
`

const propsByTaxQuery = gql`
  query propsByTaxDataQuery(
    $queryExportTaxonomies: Boolean!
    $exportTaxonomies: [String]
  ) {
    taxPropertiesByTaxonomiesFunction(taxonomyNames: $exportTaxonomies)
      @include(if: $queryExportTaxonomies) {
      nodes {
        taxonomyName
        propertyName
        jsontype
        count
      }
    }
  }
`

const TaxonomiesCard = ({
  taxonomiesExpanded,
  jointTaxonomiesExpanded,
  onToggleTaxonomies,
  onToggleJointTaxonomies,
}) => {
  const mobxStore = useContext(mobxStoreContext)
  const exportTaxonomies = mobxStore.export.taxonomies.toJSON()

  const { data: propsByTaxData, error: propsByTaxDataError } = useQuery(
    propsByTaxQuery,
    {
      variables: {
        exportTaxonomies,
        queryExportTaxonomies: exportTaxonomies.length > 0,
      },
    },
  )
  const taxProperties = get(
    propsByTaxData,
    'taxPropertiesByTaxonomiesFunction.nodes',
    [],
  )

  const taxPropertiesByTaxonomy = groupBy(taxProperties, 'taxonomyName')
  const taxPropertiesFields = groupBy(taxProperties, 'propertyName')
  const taxCount = Object.keys(taxPropertiesByTaxonomy).length
  const taxFieldsCount = Object.keys(taxPropertiesFields).length
  let jointTaxProperties = []
  if (taxCount > 1) {
    jointTaxProperties = Object.values(
      groupBy(taxProperties, (t) => `${t.propertyName}/${t.jsontype}`),
    )
      .filter((v) => v.length === taxCount)
      .map((t) => ({
        count: sumBy(t, (x) => Number(x.count)),
        jsontype: t[0].jsontype,
        propertyName: t[0].propertyName,
        taxonomies: t.map((x) => x.taxonomyName),
        taxname: 'Taxonomie',
      }))
  }
  const initiallyExpanded = Object.keys(taxPropertiesByTaxonomy).length === 1

  if (propsByTaxDataError) {
    return (
      <ErrorContainer>
        `Error loading data: ${propsByTaxDataError.message}`
      </ErrorContainer>
    )
  }

  return (
    <ErrorBoundary>
      <Container>
        <StyledCard>
          <StyledCardActions disableSpacing onClick={onToggleTaxonomies}>
            <CardActionTitle>
              Taxonomien
              {taxCount > 0 && (
                <Count>{`(${taxCount} ${
                  taxCount === 1 ? 'Taxonomie' : 'Taxonomien'
                }, ${taxFieldsCount} ${
                  taxFieldsCount === 1 ? 'Feld' : 'Felder'
                })`}</Count>
              )}
            </CardActionTitle>
            <CardActionIconButton
              data-expanded={taxonomiesExpanded}
              aria-expanded={taxonomiesExpanded}
              aria-label="Show more"
            >
              <Icon>
                <ExpandMoreIcon />
              </Icon>
            </CardActionIconButton>
          </StyledCardActions>
          <Collapse in={taxonomiesExpanded} timeout="auto" unmountOnExit>
            {jointTaxProperties.length > 0 && (
              <JointTaxonomy jointTaxProperties={jointTaxProperties} />
            )}
            {Object.keys(taxPropertiesByTaxonomy).map((pc) => (
              <Taxonomy
                pc={pc}
                key={pc}
                initiallyExpanded={initiallyExpanded}
              />
            ))}
          </Collapse>
        </StyledCard>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(TaxonomiesCard)
