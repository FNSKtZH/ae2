import React from 'react'
import PropTypes from 'prop-types'
import Autosuggest from 'react-autosuggest'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import TextField from 'material-ui-next/TextField'
import Paper from 'material-ui-next/Paper'
import { MenuItem } from 'material-ui-next/Menu'
import { withStyles } from 'material-ui-next/styles'
//import styled from 'styled-components'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import { withApollo } from 'react-apollo'

import exportPcoFiltersMutation from '../../exportPcoFiltersMutation'
import readableType from '../../../../modules/readableType'
import pcoFieldPropData from './pcoFieldPropData'
import get from 'lodash/get'

/*const floatingLabelStyle = {
  color: 'rgba(0, 0, 0, 0.5)',
}*/

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
  withState('fetchData', 'setFetchData', false),
  pcoFieldPropData,
  withStyles(styles)
)

type Props = {
  pname: string,
  jsontype: string,
  comparator: string,
  value: string,
  propData: Object,
  classes: Object,
  setFetchData: () => void,
}

type State = {
  suggestions: Array<string>,
  propValues: Array<string>,
}

class IntegrationAutosuggest extends React.Component<Props, State> {
  state = {
    suggestions: [],
    propValues: [],
  }

  componentDidMount() {
    this.props.setFetchData(true)
  }

  componentDidUpdate() {
    const { propData, setFetchData } = this.props
    const propValues = get(propData, 'propValuesFunction.nodes', []).map(
      v => v.value
    )
    console.log('PcoFieldValue, componentDidUpdate: propValues:', propValues)
    if (propValues.length > 0) {
      this.setState({ propValues })
      setFetchData(false)
    }
  }

  getSuggestions = value => {
    // todo
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length
    let count = 0

    return inputLength === 0
      ? []
      : this.state.propValues.filter(propValue => {
          const keep =
            count < 5 &&
            propValue.toLowerCase().slice(0, inputLength) === inputValue

          if (keep) {
            count += 1
          }

          return keep
        })
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    console.log('PcoFieldValue, handleSuggestionsFetchRequested: value:', value)
    this.setState({
      suggestions: this.getSuggestions(value),
    })
  }

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    })
  }

  handleChange = (event, { newValue }) => {
    const { pcname, pname, comparator, client } = this.props
    let comparatorValue = comparator
    if (!comparator && newValue) comparatorValue = 'ILIKE'
    if (!newValue) comparatorValue = null
    client.mutate({
      mutation: exportPcoFiltersMutation,
      variables: {
        pcname,
        pname,
        comparator: comparatorValue,
        value: newValue,
      },
    })
  }

  renderInput = inputProps => {
    const { classes, pname, jsontype, value } = this.props
    const floatingLabelText = `${pname} (${readableType(jsontype)})`
    // TODO
    const { autoFocus, ref, ...other } = inputProps

    return (
      <TextField
        label={floatingLabelText}
        fullWidth
        autoFocus={autoFocus}
        className={classes.textField}
        value={value || ''}
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

  render() {
    const { classes, value } = this.props
    console.log(
      'PcoFieldValue, render: this.state.suggestions:',
      this.state.suggestions
    )

    return (
      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderInputComponent={this.renderInput}
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        renderSuggestionsContainer={renderSuggestionsContainer}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{
          value: value || '',
          autoFocus: true,
          placeholder: 'Search a country (start with a)',
          onChange: this.handleChange,
        }}
      />
    )
  }
}

IntegrationAutosuggest.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default enhance(IntegrationAutosuggest)
