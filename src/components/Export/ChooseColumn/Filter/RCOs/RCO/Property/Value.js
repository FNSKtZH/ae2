//@flow
import React, { useEffect, useState, useCallback } from 'react'
import Autosuggest from 'react-autosuggest'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import { withStyles } from '@material-ui/core/styles'
import styled from 'styled-components'
import compose from 'recompose/compose'
import get from 'lodash/get'
import trimStart from 'lodash/trimStart'
import { useQuery, useApolloClient } from 'react-apollo-hooks'
import gql from 'graphql-tag'

import exportRcoFiltersMutation from '../../../../../exportRcoFiltersMutation'
import readableType from '../../../../../../../modules/readableType'
import rcoFieldPropQuery from './rcoFieldPropQuery'
import addExportRcoPropertyMutation from '../../../../../addExportRcoPropertyMutation'

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

const storeQuery = gql`
  query exportAddFilterFieldsQuery {
    exportAddFilterFields @client
  }
`

const enhance = compose(withStyles(styles))

const IntegrationAutosuggest = ({
  relationtype,
  pcname,
  pname,
  jsontype,
  comparator,
  value: propValue,
  classes,
}: {
  relationtype: String,
  pcname: string,
  pname: Sstring,
  jsontype: String,
  comparator: String,
  value: String,
  classes: Object,
}) => {
  const client = useApolloClient()
  const [suggestions, setSuggestions] = useState([])
  const [propValues, setPropValues] = useState([])
  const [value, setValue] = useState(propValue || '')
  const [fetchData, setFetchData] = useState(false)
  const [dataFetched, setDataFetched] = useState(false)

  const { data: exportAddFilterFieldsData } = useQuery(storeQuery, {
    suspend: false,
  })
  const { data: propData, error: propDataError } = useQuery(rcoFieldPropQuery, {
    suspend: false,
    variables: {
      tableName: 'relation',
      propName: pname,
      pcFieldName: 'property_collection_id',
      pcTableName: 'property_collection',
      pcName: pcname,
      fetchData,
    },
  })

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
    [propData, dataFetched],
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

  const handleSuggestionsClearRequested = useCallback(() =>
    setSuggestions(getSuggestions(' ')),
  )

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
    async () => {
      // 1. change filter value
      let comparatorValue = comparator
      if (!comparator && value) comparatorValue = 'ILIKE'
      if (!value) comparatorValue = null
      await client.mutate({
        mutation: exportRcoFiltersMutation,
        variables: {
          pcname,
          relationtype,
          pname,
          comparator: comparatorValue,
          value,
        },
      })
      // 2. if value and field is not choosen, choose it
      const exportAddFilterFields = get(
        exportAddFilterFieldsData,
        'exportAddFilterFields',
        true,
      )
      if (exportAddFilterFields && value) {
        client.mutate({
          mutation: addExportRcoPropertyMutation,
          variables: { pcname, relationtype, pname },
        })
      }
    },
    [pcname, relationtype, pname, comparator, exportAddFilterFieldsData, value],
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
    [pname, jsontype, value],
  )

  if (propDataError) {
    return `Error loading data: ${propDataError.message}`
  }

  return (
    <Autosuggest
      theme={{
        container: classes.container,
        suggestionsContainerOpen: classes.suggestionsContainerOpen,
        suggestionsList: classes.suggestionsList,
        suggestion: classes.suggestion,
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
        value,
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