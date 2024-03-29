import React, { useEffect, useState, useCallback, useContext } from 'react'
import Autosuggest from 'react-autosuggest'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import MenuItem from '@mui/material/MenuItem'
import withStyles from '@mui/styles/withStyles'
import styled from 'styled-components'
import get from 'lodash/get'
import trimStart from 'lodash/trimStart'
import { useQuery, gql } from '@apollo/client'
import { observer } from 'mobx-react-lite'

import readableType from '../../../../../../../modules/readableType'
import mobxStoreContext from '../../../../../../../mobxStoreContext'

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
      <>
        {parts.map((part, index) => {
          return part.highlight ? (
            <strong key={String(index)} style={{ fontWeight: 700 }}>
              {part.text}
            </strong>
          ) : (
            <span key={String(index)} style={{ fontWeight: 400 }}>
              {part.text}
            </span>
          )
        })}
      </>
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

const styles = (theme) => ({
  container: {
    flexGrow: 1,
    position: 'relative',
    height: 200,
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
    margin: 0,
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
    maxHeight: '500px',
    overflow: 'auto',
  },
})

const pcoFieldPropQuery = gql`
  query propDataQuery(
    $tableName: String!
    $propName: String!
    $pcFieldName: String!
    $pcTableName: String!
    $pcName: String!
    $fetchData: Boolean!
  ) {
    propValuesFunction(
      tableName: $tableName
      propName: $propName
      pcFieldName: $pcFieldName
      pcTableName: $pcTableName
      pcName: $pcName
    ) @include(if: $fetchData) {
      nodes {
        value
      }
    }
  }
`

const IntegrationAutosuggest = ({
  pcname,
  pname,
  jsontype,
  comparator,
  value: propsValue,
  classes,
}) => {
  const mobxStore = useContext(mobxStoreContext)
  const { addFilterFields, setPcoFilter, addPcoProperty } = mobxStore.export

  const [suggestions, setSuggestions] = useState([])
  const [propValues, setPropValues] = useState([])
  const [value, setValue] = useState(propsValue || '')
  const [fetchData, setFetchData] = useState(false)
  const [dataFetched, setDataFetched] = useState(false)

  const { data: propData, error: propDataError } = useQuery(pcoFieldPropQuery, {
    variables: {
      tableName: 'property_collection_object',
      propName: pname,
      pcFieldName: 'property_collection_id',
      pcTableName: 'property_collection',
      pcName: pcname,
      fetchData,
    },
  })

  useEffect(() => {
    if (fetchData && !dataFetched) {
      const propValues = get(propData, 'propValuesFunction.nodes', [])
        .filter((v) => v !== null && v !== undefined)
        .map((v) => v.value)
      if (propValues.length > 0) {
        setPropValues(propValues)
        setFetchData(false)
        setDataFetched(true)
      }
    }
  }, [propData, dataFetched, fetchData])

  const getSuggestions = useCallback(
    (value) => {
      const inputValue = value.toLowerCase()

      if (value === ' ') return propValues
      if (inputValue.length === 0) return []
      return propValues.filter((v) => v.toLowerCase().includes(inputValue))
    },
    [propValues],
  )

  const handleSuggestionsFetchRequested = useCallback(
    ({ value }) => {
      setSuggestions(getSuggestions(value))
    },
    [getSuggestions],
  )

  const handleSuggestionsClearRequested = useCallback(() => {
    setSuggestions(getSuggestions(' '))
  }, [getSuggestions])

  const onFocus = useCallback(
    (event) => {
      // fetch data if not yet happened
      if (!dataFetched) setFetchData(true)
    },
    [dataFetched],
  )

  const handleChange = useCallback((event, { newValue }) => {
    // trim the start to enable entering space
    // at start to open list
    setValue(trimStart(newValue))
  }, [])

  const handleBlur = useCallback(() => {
    // 1. change filter value
    let comparatorValue = comparator
    if (!comparator && value) comparatorValue = 'ILIKE'
    if (!value) comparatorValue = null
    setPcoFilter({
      pcname,
      pname,
      comparator: comparatorValue,
      value,
    })
    // 2. if value and field is not choosen, choose it
    if (addFilterFields && value) {
      addPcoProperty({ pcname, pname })
    }
  }, [
    comparator,
    value,
    setPcoFilter,
    pcname,
    pname,
    addFilterFields,
    addPcoProperty,
  ])

  const renderInput = useCallback(
    (inputProps) => {
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
          variant="standard"
        />
      )
    },
    [pname, jsontype, value, classes.input],
  )

  if (propDataError) return `Error loading data: ${propDataError.message}`

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

export default withStyles(styles)(observer(IntegrationAutosuggest))
