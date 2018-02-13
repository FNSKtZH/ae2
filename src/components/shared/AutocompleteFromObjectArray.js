//@flow
/**
 * similar to AutocompleteFromArray
 * but receives an array of objects
 * with keys id and value
 * presents value and saves id
 */
import React from 'react'
import Autosuggest from 'react-autosuggest'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import { MenuItem } from 'material-ui/Menu'
import { withStyles } from 'material-ui/styles'
import styled from 'styled-components'
import compose from 'recompose/compose'
import { withApollo } from 'react-apollo'
import trimStart from 'lodash/trimStart'

const StyledPaper = styled(Paper)`
  z-index: 1;
  /* need this so text is visible when overflowing */
  > ul > li > div {
    overflow: inherit;
  }
`
const StyledAutosuggest = styled(Autosuggest)`
  height: auto;
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
    paddingTop: '12px',
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

const enhance = compose(withApollo, withStyles(styles))

type Props = {
  label: string,
  value: string,
  objects: Array<Object>,
  updatePropertyInDb: () => void,
  classes: Object,
}

type State = {
  suggestions: Array<string>,
  value: string,
}

class IntegrationAutosuggest extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      suggestions: [],
      value: props.value || '',
    }
  }

  getSuggestions = value => {
    const { objects } = this.props
    const inputValue = value.toLowerCase()
    const values = objects.map(o => o.value)

    if (value === ' ') return values
    if (inputValue.length === 0) return []
    return values.filter(v => v.toLowerCase().includes(inputValue))
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

  handleChange = (event, { newValue }) => {
    // trim the start to enable entering space
    // at start to open list
    const value = trimStart(newValue)
    this.setState({ value })
  }

  handleBlur = event => {
    const { value } = this.state
    const { objects, updatePropertyInDb } = this.props
    const object = objects.find(o => o.value === value)
    // check if value is in values
    if (object) {
      return updatePropertyInDb(object.id)
    }
    this.setState({ value: '' })
  }

  renderInput = inputProps => {
    const { label, value } = this.props
    const { autoFocus, ref, ...other } = inputProps

    return (
      <StyledTextField
        label={label}
        fullWidth
        value={value || ''}
        inputRef={ref}
        InputProps={{
          ...other,
        }}
        onBlur={this.handleBlur}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />
    )
  }

  render() {
    const { classes } = this.props
    const { suggestions } = this.state

    return (
      <StyledAutosuggest
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
          value: this.state.value,
          autoFocus: true,
          placeholder: 'Für Auswahlliste: Leerschlag tippen',
          onChange: this.handleChange,
        }}
      />
    )
  }
}

export default enhance(IntegrationAutosuggest)
