// @flow
import app from 'ampersand-app'
import React from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Radio, { RadioGroup } from 'material-ui/Radio'
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form'
import compose from 'recompose/compose'

import exportRcoInOneRowMutation from '../../../exportRcoInOneRowMutation'

const StyledFormLabel = styled(FormLabel)`
  color: rgba(0, 0, 0, 0.87) !important;
  font-weight: 500;
`
const StyledFormControl = styled(FormControl)`
  padding: 15px 20px 8px 20px !important;
`
const StyledFormControlLabel = styled(FormControlLabel)`
  height: 30px;
  min-height: 30px;
  > span {
    font-weight: 500;
    line-height: 1em;
  }
`
const StyledRadioGroup = styled(RadioGroup)`
  margin: 8px 0;
`

const enhance = compose()

const ChooseNrOfRows = () => (
  <Query
    query={gql`
      query exportRcoInOneRowQuery {
        exportRcoInOneRow @client
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return 'Lade Daten...'
      if (error) return `Fehler: ${error.message}`

      return (
        <StyledFormControl>
          <StyledFormLabel>
            Wie wollen Sie Beziehungen exportieren?
          </StyledFormLabel>
          <StyledRadioGroup
            aria-label="Wie wollen Sie Beziehungen exportieren?"
            value={data.exportRcoInOneRow.toString()}
            onChange={() =>
              app.client.mutate({
                mutation: exportRcoInOneRowMutation,
                variables: { value: !data.exportRcoInOneRow },
              })
            }
          >
            <StyledFormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Kommagetrennt in einer Zeile"
            />
            <StyledFormControlLabel
              value="false"
              control={<Radio color="primary" />}
              label="Pro Beziehung eine neue Zeile"
            />
          </StyledRadioGroup>
        </StyledFormControl>
      )
    }}
  </Query>
)

export default enhance(ChooseNrOfRows)
