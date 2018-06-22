import React from 'react'
import Autosuggest from 'react-autosuggest'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import { withStyles } from '@material-ui/core/styles'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import { withApollo } from 'react-apollo'
import get from 'lodash/get'
import trimStart from 'lodash/trimStart'

import exportPcoFiltersMutation from '../../exportPcoFiltersMutation'
import readableType from '../../../../modules/readableType'
import pcoFieldPropData from './pcoFieldPropData'
import exportAddFilterFieldsData from '../../exportAddFilterFieldsData'
import addExportPcoPropertyMutation from '../../addExportPcoPropertyMutation'

const StyledPaper = styled(Paper)`
  z-index: 1;
  /* need this so text is visible when overflowing */
  > ul > li > div {
    overflow: inherit;
  }
`
const StyledTextField = styled(TextField)`
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  width: 100%;
`

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion, query)
  const parts = parse(suggestion, matches)

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <strong key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </strong>
          ) : (
            <span key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </span>
          )
        })}
      </div>
    </MenuItem>
  )
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options

  return (
    <StyledPaper {...containerProps} square>
      {children}
    </StyledPaper>
  )
}

function getSuggestionValue(suggestion) {
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
    maxHeight: '500px',
    overflow: 'auto',
  },
})

const enhance = compose(
  withApollo,
  withState('fetchData', 'setFetchData', false),
  withState('dataFetched', 'setDataFetched', false),
  pcoFieldPropData,
  exportAddFilterFieldsData,
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
  dataFetched: Boolean,
  setDataFetched: () => void,
  exportAddFilterFieldsData: Object,
}

type State = {
  suggestions: Array<string>,
  propValues: Array<string>,
  value: string,
}

class IntegrationAutosuggest extends React.Component<Props, State> {
  state = {
    suggestions: [],
    propValues: [],
    value: '',
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      propData,
      fetchData,
      dataFetched,
      setFetchData,
      setDataFetched,
    } = this.props
    if (fetchData && !dataFetched) {
      const propValues = get(propData, 'propValuesFunction.nodes', [])
        .map(v => v.value)
        .filter(v => v !== null && v !== undefined)
      if (propValues.length > 0) {
        this.setState({ propValues })
        setFetchData(false)
        setDataFetched(true)
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
    this.setState({
      suggestions: this.getSuggestions(value),
    })
  }

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: this.getSuggestions(' '),
    })
  }

  onFocus = event => {
    const { dataFetched, setFetchData } = this.props
    // fetch data if not yet happened
    if (!dataFetched) setFetchData(true)
  }

  change = newValue => {
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

  handleChange = (event, { newValue }) => {
    const { pcname, pname, client, exportAddFilterFieldsData } = this.props
    // trim the start to enable entering space
    // at start to open list
    const value = trimStart(newValue)
    this.setState({ value })
    this.change(value)
    // if value and not choosen, choose
    const exportAddFilterFields = get(
      exportAddFilterFieldsData,
      'exportAddFilterFields',
      true
    )
    if (exportAddFilterFields) {
      client.mutate({
        mutation: addExportPcoPropertyMutation,
        variables: { pcname, pname },
      })
    }
  }

  renderInput = inputProps => {
    const { classes, pname, jsontype, value } = this.props
    const labelText = `${pname} (${readableType(jsontype)})`
    const { autoFocus, ref, ...other } = inputProps

    return (
      <StyledTextField
        label={labelText}
        fullWidth
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

export default enhance(IntegrationAutosuggest)
