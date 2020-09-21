import React, { useState, useCallback, useContext } from 'react'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import copy from 'copy-to-clipboard'
import { observer } from 'mobx-react-lite'

import ErrorBoundary from '../../shared/ErrorBoundary'
import mobxStoreContext from '../../../mobxStoreContext'

const Container = styled.div`
  padding: 5px;
  padding-bottom: 10px;
`
const InfoDiv = styled.div`
  padding: 15px 10px 0 10px;
`
const StyledButton = styled(Button)`
  border: 1px solid !important;
  margin-left: 0 !important;
  margin-top: 0 !important;
`
const StyledTextField = styled(TextField)`
  padding: 8px 0 !important;
`

const Url = () => {
  const mobxStore = useContext(mobxStoreContext)
  const { rcoProperties, pcoProperties, taxProperties } = mobxStore.export

  const [copyButtonText, setCopyButtonText] = useState('url kopieren')

  const fieldsChoosen =
    [...taxProperties, ...pcoProperties, ...rcoProperties].length > 0
  const taxProps = taxProperties.map((p) => ({
    t: 'tax',
    n: p.taxname,
    p: p.pname,
  }))
  const pcoProps = pcoProperties.map((p) => ({
    t: 'pco',
    n: p.pcname,
    p: p.pname,
  }))
  const rcoProps = rcoProperties.map((p) => ({
    t: 'rco',
    n: p.pcname,
    rt: p.relationtype,
    p: p.pname,
  }))
  const props = [...taxProps, ...pcoProps, ...rcoProps]
  const url = `https://arteigenschaften.ch/api/alt?fields=${JSON.stringify(
    props,
  )}`

  const onClickButton = useCallback(() => {
    setCopyButtonText('kopiert')
    setTimeout(() => setCopyButtonText('url kopieren'), 3000)
    copy(url)
  }, [url])

  if (!fieldsChoosen) {
    return (
      <InfoDiv>
        Sobald eine Eigenschaft gewählt ist, wird hier eine URL generiert.
      </InfoDiv>
    )
  }

  return (
    <ErrorBoundary>
      <Container>
        <StyledTextField
          label="URL"
          value={url}
          multiline
          fullWidth
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
        <StyledButton onClick={onClickButton}>{copyButtonText}</StyledButton>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Url)
