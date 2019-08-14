//@flow
import React, {
  useEffect,
  useCallback,
  useState,
  useMemo,
  useContext,
} from 'react'
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
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { observer } from 'mobx-react-lite'

import readableType from '../../../../../../modules/readableType'
import mobxStoreContext from '../../../../../../mobxStoreContext'

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

const taxFieldPropQuery = gql`
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

const enhance = compose(
  withStyles(styles),
  observer,
)

const IntegrationAutosuggest = ({
  taxname,
  pname,
  jsontype,
  comparator,
  value: propsValue,
  classes,
  width,
}: {
  taxname: string,
  pname: string,
  jsontype: string,
  comparator: string,
  value: string,
  classes: Object,
  width: Number,
}) => {
  const mobxStore = useContext(mobxStoreContext)
  const { addFilterFields, addTaxProperty, setTaxFilters } = mobxStore.export

  const [fetchData, setFetchData] = useState(false)
  const [dataFetched, setDataFetched] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [propValues, setPropValues] = useState([])
  const [value, setValue] = useState(propsValue || '')

  const { data: propData, error: propDataError } = useQuery(taxFieldPropQuery, {
    variables: {
      tableName: 'object',
      propName: pname,
      pcFieldName: 'taxonomy_id',
      pcTableName: 'taxonomy',
      pcName: taxname,
      fetchData,
    },
  })

  useEffect(() => {
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
  }, [fetchData, dataFetched, propData])

  const getSuggestions = useCallback(
    value => {
      const inputValue = value.toLowerCase()

      if (value === ' ') return propValues
      if (inputValue.length === 0) return []
      return propValues.filter(v => v.toLowerCase().includes(inputValue))
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
    setSuggestions([])
  }, [])

  const onFocus = useCallback(
    event => {
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
    setTaxFilters({
      taxname,
      pname,
      comparator: comparatorValue,
      value,
    })
    // 2. if value and field not choosen, choose it
    if (addFilterFields && value) {
      addTaxProperty({ taxname, pname })
    }
  }, [
    comparator,
    value,
    setTaxFilters,
    taxname,
    pname,
    addFilterFields,
    addTaxProperty,
  ])

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
    [pname, jsontype, value, classes.input],
  )
  const inputProps = useMemo(
    () => ({
      value,
      autoFocus: true,
      placeholder: 'Für Auswahlliste: Leerschlag tippen',
      onChange: handleChange,
      onBlur: handleBlur,
      onFocus: onFocus,
    }),
    [handleBlur, handleChange, onFocus, value],
  )
  const { container, suggestionsList, suggestion } = classes
  const theme = useMemo(
    () => ({
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
    }),
    [container, suggestion, suggestionsList, width],
  )

  if (propDataError) {
    return `Error loading data: ${propDataError.message}`
  }

  return (
    <Autosuggest
      theme={theme}
      renderInputComponent={renderInput}
      suggestions={suggestions}
      onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
      onSuggestionsClearRequested={handleSuggestionsClearRequested}
      renderSuggestionsContainer={renderSuggestionsContainer}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      shouldRenderSuggestions={shouldRenderSuggestions}
      inputProps={inputProps}
    />
  )
}

export default enhance(IntegrationAutosuggest)
