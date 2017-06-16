// @flow
import React from 'react'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'
import Autosuggest from 'react-autosuggest'

const Container = styled.div`
  padding: 5px 13px 0 13px;
  .react-autosuggest__container {
    width: 100%;
    color: red;
  }
  .react-autosuggest__input {
    width: 100%;
    border-radius: 3px;
    font-size: 14px;
    padding: 5px;
  }
`

const enhance = compose(
  inject('store'),
  withHandlers({
    onChange: props => (event, { newValue }) => {
      props.store.treeFilter.setText(newValue)
      console.log('changed, value:', newValue)
    },
  }),
  observer
)

const Tree = ({ store, onChange }: { store: Object, onChange: () => {} }) => {
  const inputProps = {
    value: store.treeFilter.text,
    onChange,
    type: 'search',
    placeholder: 'suchen',
  }
  const { suggestionsTO, suggestionsPC, suggestionsRC } = store.treeFilter
  console.log('TreeFilter: suggestionsTO:', suggestionsTO)

  return (
    <Container>
      <Autosuggest
        suggestions={[]}
        onSuggestionsFetchRequested={() => {
          /* TODO */
        }}
        onSuggestionsClearRequested={() => {
          /* TODO */
        }}
        getSuggestionValue={() => {
          /* TODO */
        }}
        renderSuggestion={() => {
          /* TODO */
        }}
        inputProps={inputProps}
      />
    </Container>
  )
}

export default enhance(Tree)
