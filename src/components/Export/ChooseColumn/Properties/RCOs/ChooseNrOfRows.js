import React, { useCallback, useContext } from 'react'
import styled from 'styled-components'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'
import uniq from 'lodash/uniq'
import { observer } from 'mobx-react-lite'

import mobxStoreContext from '../../../../../mobxStoreContext'

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

const ChooseNrOfRows = () => {
  const mobxStore = useContext(mobxStoreContext)
  const { setRcoInOneRow, rcoInOneRow, rcoProperties } = mobxStore.export

  const multipleRowsDisabled =
    uniq(rcoProperties.map((e) => `${e.pcname}/${e.relationtype}`)).length > 1
  const onChange = useCallback(() => {
    setRcoInOneRow(!rcoInOneRow)
  }, [rcoInOneRow, setRcoInOneRow])

  return (
    <StyledFormControl variant="standard">
      <StyledFormLabel>Wie wollen Sie Beziehungen exportieren?</StyledFormLabel>
      <StyledRadioGroup
        aria-label="Wie wollen Sie Beziehungen exportieren?"
        value={rcoInOneRow.toString()}
        onChange={onChange}
      >
        <StyledFormControlLabel
          value="true"
          control={<Radio color="primary" />}
          label="Mit | getrennt in einer Zeile"
        />
        <StyledUl>
          <li>
            <Typography>
              Eine Art oder ein Lebensraum kann Beziehungen zu <b>mehreren</b>{' '}
              anderen Arten oder Lebensräumen haben
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
              Für jede Art oder Lebensraum wird pro Beziehung eine neue Zeile
              erzeugt
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
              Achtung: Sie können mit dieser Einstellung nur aus einer einzigen
              Beziehungssammlung Felder wählen
            </Typography>
          </li>
          <li>
            <Typography>
              {multipleRowsDisabled ? (
                <b>
                  Darum wird automatisch "Mit | getrennt in einer Zeile"
                  gewählt, wenn aus mehreren Beziehungssammlungen Felder gewählt
                  wurden
                </b>
              ) : (
                <span>
                  Darum wird automatisch "Mit | getrennt in einer Zeile"
                  gewählt, wenn aus mehreren Beziehungssammlungen Felder gewählt
                  wurden
                </span>
              )}
            </Typography>
          </li>
        </StyledUl>
      </StyledRadioGroup>
    </StyledFormControl>
  )
}

export default observer(ChooseNrOfRows)
