// @flow
import app from 'ampersand-app'
import React from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Radio, { RadioGroup } from 'material-ui/Radio'
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form'
import Typography from 'material-ui/Typography'
import compose from 'recompose/compose'
import uniq from 'lodash/uniq'

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
const StyledUl = styled.ul`
  margin-top: -4px;
  margin-bottom: 2px;
  padding-left: 52px;
`

const enhance = compose()

const ChooseNrOfRows = () => (
  <Query
    query={gql`
      {
        exportRcoInOneRow @client
        exportRcoProperties @client {
          pcname
          relationtype
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return 'Lade Daten...'
      if (error) return `Fehler: ${error.message}`
      const multipleRowsDisabled =
        uniq(data.exportRcoProperties.map(e => `${e.pcname}/${e.relationtype}`))
          .length > 1

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
              label="Mit | getrennt in einer Zeile"
            />
            <StyledUl>
              <li>
                <Typography>
                  Eine Art oder ein Lebensraum kann Beziehungen zu{' '}
                  <b>mehreren</b> anderen Arten oder Lebensräumen haben
                </Typography>
              </li>
              <li>
                <Typography>
                  Bei dieser Einstellung werden pro Feld alle Werte von allen
                  Beziehungen kommagetrennt aufgelistet
                </Typography>
              </li>
              <li>
                <Typography>
                  Vorteil: Sie können Felder aus mehreren Beziehungssammlungen
                  gleichzeitig exportieren
                </Typography>
              </li>
            </StyledUl>
            <StyledFormControlLabel
              value="false"
              control={<Radio color="primary" />}
              label="Pro Beziehung eine neue Zeile"
              disabled={multipleRowsDisabled}
            />
            <StyledUl>
              <li>
                <Typography>
                  Für jede Art oder Lebensraum wird pro Beziehung eine neue
                  Zeile erzeugt
                </Typography>
              </li>
              <li>
                <Typography>
                  Vereinfacht die Auswertung von Beziehungen, weil deren Werte{' '}
                  <em>einzeln</em> in den Feldern enthalten sind
                </Typography>
              </li>
              <li>
                <Typography>
                  Achtung: Sie können mit dieser Einstellung nur aus einer
                  einzigen Beziehungssammlung Felder wählen
                </Typography>
              </li>
              <li>
                <Typography>
                  {multipleRowsDisabled ? (
                    <b>
                      Darum wird automatisch "Mit | getrennt in einer Zeile"
                      gewählt, wenn aus mehreren Beziehungssammlungen Felder
                      gewählt wurden
                    </b>
                  ) : (
                    <span>
                      Darum wird automatisch "Mit | getrennt in einer Zeile"
                      gewählt, wenn aus mehreren Beziehungssammlungen Felder
                      gewählt wurden
                    </span>
                  )}
                </Typography>
              </li>
            </StyledUl>
          </StyledRadioGroup>
        </StyledFormControl>
      )
    }}
  </Query>
)

export default enhance(ChooseNrOfRows)
