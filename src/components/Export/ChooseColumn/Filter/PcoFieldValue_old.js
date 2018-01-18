//@flow
import React from 'react'
import TextField from 'material-ui/TextField'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'
import { withApollo } from 'react-apollo'
import Autosuggest from 'react-autosuggest'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import TextField from 'material-ui-next/TextField'
import Paper from 'material-ui-next/Paper'
import { MenuItem } from 'material-ui-next/Menu'
import { withStyles } from 'material-ui-next/styles'

import exportPcoFiltersMutation from '../../exportPcoFiltersMutation'
import readableType from '../../../../modules/readableType'
import pcoFieldPropData from './pcoFieldPropData'
import get from 'lodash/get'

const Container = styled.div`
  width: 100%;
`

const floatingLabelStyle = {
  color: 'rgba(0, 0, 0, 0.5)',
}
const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
    height: 200,
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  textField: {
    width: '100%',
  },
})

const enhance = compose(
  withApollo,
  withStyles(styles),
  withState('propValues', 'setPropValues', []),
  withHandlers({
    onChange: ({ pcname, pname, comparator, client }) => (event, { value }) => {
      let comparatorValue = comparator
      if (!comparator && value) comparatorValue = 'ILIKE'
      if (!value) comparatorValue = null
      client.mutate({
        mutation: exportPcoFiltersMutation,
        variables: { pcname, pname, comparator: comparatorValue, value },
      })
    },
    onSuggestionsFetchRequested: ({
      propData,
      setPropValues,
    }: {
      propData: Object,
      setPropValues: () => void,
    }) => ({ value }: { value: string }) => {
      const propValues = get(propData, 'propValuesFunction.nodes', [])
      setPropValues(propValues)
      console.log('propValues:', propValues)
    },
    onSuggestionsClearRequested: ({
      setPropValues,
    }: {
      setPropValues: () => void,
    }) => () => {
      setPropValues([])
    },
  }),
  pcoFieldPropData
)

const renderInput = ({
  classes,
  autoFocus,
  value,
  ref,
  ...other
}: {
  classes: Object,
  autoFocus: Boolean,
  value: string,
  ref: Object,
  ...other,
}) => {
  return (
    <TextField
      autoFocus={autoFocus}
      className={classes.textField}
      value={value}
      inputRef={ref}
      InputProps={{
        classes: {
          input: classes.input,
        },
        ...other,
      }}
    />
  )
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query)
  const parts = parse(suggestion.label, matches)

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </strong>
          )
        })}
      </div>
    </MenuItem>
  )
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  )
}

function getSuggestionValue(suggestion) {
  return suggestion
}

function getSuggestions(value) {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length
  let count = 0

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 &&
          suggestion.label.toLowerCase().slice(0, inputLength) === inputValue

        if (keep) {
          count += 1
        }

        return keep
      })
}

const PcoFieldValue = ({
  pname,
  value,
  jsontype,
  onChange,
  propData,
  classes,
}: {
  pname: string,
  value: string,
  jsontype: string,
  onChange: () => {},
  propData: Object,
  classes: Object,
}) => {
  return (
    <Container>
      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderInputComponent={renderInput}
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        renderSuggestionsContainer={renderSuggestionsContainer}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{
          floatingLabelFixed: true,
          floatingLabelText: `${pname} (${readableType(jsontype)})`,
          floatingLabelStyle: { floatingLabelStyle },
          fullWidth: true,
          autoFocus: true,
          classes,
          placeholder: 'Search a country (start with a)',
          value: value,
          onChange: onChange,
        }}
      />
    </Container>
  )
}

export default enhance(PcoFieldValue)
