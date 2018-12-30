//@flow
import React, { useEffect, useCallback, useState } from 'react'
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

import exportTaxFiltersMutation from '../../../exportTaxFiltersMutation'
import readableType from '../../../../../modules/readableType'
import withTaxFieldPropData from './withTaxFieldPropData'
import withExportAddFilterFieldsData from '../../../withExportAddFilterFieldsData'
import addExportTaxPropertyMutation from '../../../addExportTaxPropertyMutation'

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
  withTaxFieldPropData,
  withExportAddFilterFieldsData,
  withStyles(styles),
)

const IntegrationAutosuggest = ({
  taxname,
  pname,
  jsontype,
  comparator,
  value: propsValue,
  propData,
  classes,
  fetchData,
  setFetchData,
  dataFetched,
  setDataFetched,
  exportAddFilterFieldsData,
  width,
  client,
}: {
  taxname: string,
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
  width: Number,
  client: Object,
}) => {
  const [suggestions, setSuggestions] = useState([])
  const [propValues, setPropValues] = useState([])
  const [value, setValue] = useState(propsValue || '')

  useEffect(
    () => {
      if (fetchData && !dataFetched) {
        const propValues = get(propData, 'propValuesFunction.nodes', [])
          .filter(v => v !== null && v !== undefined)
          .map(v => v.value)
        if (propValues.length > 0) {
          setPropValues(propValues)
          setFetchData(false)
          setDataFetched(true)
        }
      }
    },
    [fetchData, dataFetched, propData],
  )

  const getSuggestions = useCallback(
    value => {
      const inputValue = value.toLowerCase()

      if (value === ' ') return propValues
      if (inputValue.length === 0) return []
      return propValues.filter(v => v.toLowerCase().includes(inputValue))
    },
    [propValues],
  )

  const handleSuggestionsFetchRequested = useCallback(({ value }) =>
    setSuggestions(getSuggestions(value)),
  )

  const handleSuggestionsClearRequested = useCallback(() => setSuggestions([]))

  const onFocus = useCallback(
    event => {
      // fetch data if not yet happened
      if (!dataFetched) setFetchData(true)
    },
    [dataFetched],
  )

  const handleChange = useCallback((event, { newValue }) =>
    // trim the start to enable entering space
    // at start to open list
    setValue(trimStart(newValue)),
  )

  const handleBlur = useCallback(
    () => {
      // 1. change filter value
      let comparatorValue = comparator
      if (!comparator && value) comparatorValue = 'ILIKE'
      if (!value) comparatorValue = null
      client.mutate({
        mutation: exportTaxFiltersMutation,
        variables: {
          taxname,
          pname,
          comparator: comparatorValue,
          value,
        },
      })
      // 2. if value and field not choosen, choose it
      const exportAddFilterFields = get(
        exportAddFilterFieldsData,
        'exportAddFilterFields',
        true,
      )
      if (exportAddFilterFields && value) {
        client.mutate({
          mutation: addExportTaxPropertyMutation,
          variables: { taxname, pname },
        })
      }
    },
    [taxname, pname, comparator, exportAddFilterFieldsData, value],
  )

  const renderInput = useCallback(
    inputProps => {
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
    },
    [pname, jsontype],
  )

  const { container, suggestionsList, suggestion } = classes

  return (
    <Autosuggest
      theme={{
        container: container,
        suggestionsContainerOpen: {
          position: 'absolute',
          marginTop: 8,
          marginBottom: 8 * 3,
          left: 0,
          right: 0,
          // minWidth: that of parent
          minWidth: width,
        },
        suggestionsList: suggestionsList,
        suggestion: suggestion,
      }}
      renderInputComponent={renderInput}
      suggestions={suggestions}
      onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
      onSuggestionsClearRequested={handleSuggestionsClearRequested}
      renderSuggestionsContainer={renderSuggestionsContainer}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      shouldRenderSuggestions={shouldRenderSuggestions}
      inputProps={{
        value: value,
        autoFocus: true,
        placeholder: 'Für Auswahlliste: Leerschlag tippen',
        onChange: handleChange,
        onBlur: handleBlur,
        onFocus: onFocus,
      }}
    />
  )
}

export default enhance(IntegrationAutosuggest)
