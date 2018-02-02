// @flow
import React, { Fragment } from 'react'
import compose from 'recompose/compose'
import styled from 'styled-components'
import get from 'lodash/get'
import format from 'date-fns/format'

import activeNodeArrayData from '../../modules/activeNodeArrayData'
import editingTaxonomiesData from '../../modules/editingTaxonomiesData'
import taxData from './taxData'
import PropertyReadOnly from '../shared/PropertyReadOnly'
import PropertyArten from './PropertyArten'
import PropertyLr from './PropertyLr'
import ErrorBoundary from '../shared/ErrorBoundary'

const enhance = compose(activeNodeArrayData, taxData, editingTaxonomiesData)

const Container = styled.div`
  padding: 10px;
`

const Taxonomy = ({
  taxData,
  editingTaxonomiesData,
}: {
  taxData: Object,
  editingTaxonomiesData: Object,
}) => {
  const { loading } = taxData
  if (loading) {
    return <Container>Lade Daten...</Container>
  }
  const tax = get(taxData, 'taxonomyById', {})
  const importedByName = get(tax, 'userByImportedBy.name')
  const organizationName = get(tax, 'organizationByOrganizationId.name')
  const editing = get(editingTaxonomiesData, 'editingTaxonomies', false)
  const editingArten = editing && tax.type === 'ART'
  const editingLr = editing && tax.type === 'LEBENSRAUM'

  return (
    <ErrorBoundary>
      <Container>
        {!editing && (
          <Fragment>
            <PropertyReadOnly key="id" value={tax.id} label="ID" />
            {!!tax.name && (
              <PropertyReadOnly key="name" value={tax.name} label="Name" />
            )}
            {!!tax.description && (
              <PropertyReadOnly
                key="description"
                value={tax.description}
                label="Beschreibung"
              />
            )}
            {!!tax.links && (
              <PropertyReadOnly
                key="links"
                value={tax.links.join(', ')}
                label="Links"
              />
            )}
            {!!tax.lastUpdated && (
              <PropertyReadOnly
                key="lastUpdated"
                value={format(new Date(tax.lastUpdated), 'DD.MM.YYYY')}
                label="Zuletzt aktualisiert"
              />
            )}
            {!!tax.termsOfUse && (
              <PropertyReadOnly
                key="termsOfUse"
                value={tax.termsOfUse}
                label="Nutzungsbedingungen"
              />
            )}
            {!!importedByName && (
              <PropertyReadOnly
                key="userByImportedBy"
                value={importedByName}
                label="Importiert von"
              />
            )}
            {!!organizationName && (
              <PropertyReadOnly
                key="organizationByOrganizationId"
                value={organizationName}
                label="Zuständige Organisation"
              />
            )}
            {!!tax.habitatLabel && (
              <PropertyReadOnly
                key="habitatLabel"
                value={tax.habitatLabel}
                label="Label"
              />
            )}
            {!!tax.habitatNrFnsMin && (
              <PropertyReadOnly
                key="habitatNrFnsMin"
                value={tax.habitatNrFnsMin}
                label="FNS-Nr. von"
              />
            )}
            {!!tax.habitatNrFnsMax && (
              <PropertyReadOnly
                key="habitatNrFnsMax"
                value={tax.habitatNrFnsMax}
                label="FNS-Nr. bis"
              />
            )}
            {!!tax.habitatComments && (
              <PropertyReadOnly
                key="habitatComments"
                value={tax.habitatComments}
                label="Bemerkungen"
              />
            )}
          </Fragment>
        )}
        {editingArten && (
          <Fragment>
            <PropertyArten
              key={`${tax.id}/id`}
              label="ID"
              field="id"
              taxonomy={tax}
              disabled={true}
            />
            <PropertyArten
              key={`${tax.id}/name`}
              label="Name"
              field="name"
              taxonomy={tax}
            />
            <PropertyArten
              key={`${tax.id}/description`}
              label="Beschreibung"
              field="description"
              taxonomy={tax}
            />
            <PropertyArten
              key={`${tax.id}/lastUpdated`}
              label="Zuletzt aktualisiert"
              field="lastUpdated"
              taxonomy={tax}
              disabled={true}
            />
            <PropertyArten
              key={`${tax.id}/termsOfUse`}
              label="Nutzungs-Bedingungen"
              field="termsOfUse"
              taxonomy={tax}
            />
          </Fragment>
        )}
        {editingLr && (
          <Fragment>
            <PropertyLr
              key={`${tax.id}/id`}
              label="ID"
              field="id"
              taxonomy={tax}
              disabled={true}
            />
            <PropertyLr
              key={`${tax.id}/name`}
              label="Name"
              field="name"
              taxonomy={tax}
            />
            <PropertyLr
              key={`${tax.id}/description`}
              label="Beschreibung"
              field="description"
              taxonomy={tax}
            />
            <PropertyLr
              key={`${tax.id}/lastUpdated`}
              label="Zuletzt aktualisiert"
              field="lastUpdated"
              taxonomy={tax}
              disabled={true}
            />
            <PropertyLr
              key={`${tax.id}/termsOfUse`}
              label="Nutzungs-Bedingungen"
              field="termsOfUse"
              taxonomy={tax}
            />
            <PropertyLr
              key={`${tax.id}/habitatLabel`}
              label="Einheit-Abkürzung"
              field="habitatLabel"
              taxonomy={tax}
            />
            <PropertyLr
              key={`${tax.id}/habitatComments`}
              label="Bemerkungen"
              field="habitatComments"
              taxonomy={tax}
            />
            <PropertyLr
              key={`${tax.id}/habitatNrFnsMin`}
              label="Einheit-Nrn FNS von"
              field="habitatNrFnsMin"
              taxonomy={tax}
              type="number"
            />
            <PropertyLr
              key={`${tax.id}/habitatNrFnsMax`}
              label="Einheit-Nrn FNS bis"
              field="habitatNrFnsMax"
              taxonomy={tax}
              type="number"
            />
          </Fragment>
        )}
      </Container>
    </ErrorBoundary>
  )
}

export default enhance(Taxonomy)
