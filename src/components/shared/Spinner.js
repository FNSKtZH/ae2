import React from 'react'
import styled from 'styled-components'
import { ImpulseSpinner as Spinner } from 'react-spinners-kit'

const SpinnerContainer = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const SpinnerText = styled.div`
  padding: 10px;
`

const SpinnerComponent = ({ message = 'lade Daten' }) => (
  <SpinnerContainer>
    <Spinner
      size={50}
      frontColor="rgb(230, 81, 0)"
      backColor="#4a148c1a"
      loading={true}
    />
    <SpinnerText>{message}</SpinnerText>
  </SpinnerContainer>
)

export default SpinnerComponent
