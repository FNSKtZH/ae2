// @flow
import React from 'react'
import { observer, inject } from 'mobx-react'
// import styled from 'styled-components'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'
import Autosuggest from 'react-autosuggest'

// const Container = styled.div``

const enhance = compose(
  inject('store'),
  withState('suggestions', 'changeSuggestions', []),
  withHandlers({
    onChange: props => (event, { newValue }) => {
      props.store.treeFilter.setText(newValue)
      console.log('changed, value:', newValue)
    },
  }),
  observer
)

const Tree = ({
  store,
  suggestions,
  changeSuggestions,
  onChange,
}: {
  store: Object,
  suggestions: Array<Object>,
  changeSuggestions: () => {},
  onChange: () => {},
}) => {
  return (
    <Autosuggest
      suggestions={suggestions}
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
      inputProps={{
        value: store.treeFilter.text,
        onChange,
      }}
    />
  )
}

export default enhance(Tree)
