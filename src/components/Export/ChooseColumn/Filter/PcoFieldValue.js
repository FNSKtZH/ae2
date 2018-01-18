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

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion, query)
  const parts = parse(suggestion, matches)

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
  console.log('getSuggestionValue: suggestion:', suggestion)
  return suggestion
}

function shouldRenderSuggestions(value) {
  return true
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
  fetchData: Boolean,
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
    //this.props.setFetchData(true)
  }

  componentDidUpdate(prevProps, prevState) {
    const { propData, fetchData, setFetchData } = this.props
    if (fetchData) {
      const propValues = get(propData, 'propValuesFunction.nodes', [])
        .map(v => v.value)
        .filter(v => v !== null && v !== undefined)
      if (propValues.length > 0) {
        console.log(
          'PcoFieldValue, componentDidUpdate: propValues:',
          propValues
        )
        this.setState({ propValues })
        setFetchData(false)
      }
    }
  }

  getSuggestions = value => {
    const { propValues } = this.state
    const inputValue = value.toLowerCase()

    if (value === ' ') return propValues
    if (inputValue.length === 0) return []
    return propValues.filter(v => v.toLowerCase().includes(inputValue))
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    console.log('PcoFieldValue, handleSuggestionsFetchRequested: value:', value)

    this.setState({
      suggestions: this.getSuggestions(value),
    })
  }

  handleSuggestionsClearRequested = () => {
    const { propValues } = this.state
    console.log(
      'PcoFieldValue, handleSuggestionsClearRequested: propValues:',
      propValues
    )
    this.setState({
      suggestions: this.getSuggestions(' '),
    })
  }

  onFocus = event => {
    const { setFetchData } = this.props
    // fetch data if not yet happened
    setFetchData(true)
  }

  handleChange = (event, { newValue }) => {
    const { pcname, pname, comparator, client } = this.props
    console.log('PcoFieldValue, handleChange: newValue:', newValue)
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
    const { autoFocus, ref, ...other } = inputProps

    return (
      <TextField
        label={floatingLabelText}
        fullWidth
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
    const { suggestions } = this.state
    //suggestions.length > 0 && console.log('PcoFieldValue, render: suggestions:', suggestions)

    return (
      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderInputComponent={this.renderInput}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        renderSuggestionsContainer={renderSuggestionsContainer}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        shouldRenderSuggestions={shouldRenderSuggestions}
        inputProps={{
          value: value || '',
          autoFocus: true,
          placeholder: 'Für Auswahlliste: Leerschlag tippen',
          onChange: this.handleChange,
          onFocus: this.onFocus,
        }}
      />
    )
  }
}

IntegrationAutosuggest.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default enhance(IntegrationAutosuggest)
