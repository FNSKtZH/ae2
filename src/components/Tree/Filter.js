import React, { useEffect, useCallback, useContext } from 'react'
import styled from 'styled-components'
import Autosuggest from 'react-autosuggest'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import get from 'lodash/get'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { observer } from 'mobx-react-lite'
import { navigate } from 'gatsby'
import ErrorBoundary from 'react-error-boundary'

import getUrlForObject from '../../modules/getUrlForObject'
import mobxStoreContext from '../../mobxStoreContext'

const Container = styled.div`
  padding: 5px 16px 0 13px;
  .react-autosuggest__container {
    width: 100%;
    border-bottom: 1px solid #c6c6c6;
  }
  .react-autosuggest__input {
    width: 100%;
    border: none;
    font-size: 16px;
    padding: 5px;
    background-color: rgba(0, 0, 0, 0);
  }
  .react-autosuggest__input--focused {
    outline: none;
  }
  .react-autosuggest__input--open {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  .react-autosuggest__suggestions-container {
    display: none;
  }
  .react-autosuggest__suggestions-container--open {
    display: block;
    position: absolute;
    top: 32px;
    width: ${(props) => `${props['data-autosuggestwidth']}px`};
    border: 1px solid #aaa;
    background-color: #fff;
    font-family: Helvetica, sans-serif;
    /*font-weight: 300;*/
    font-size: 14px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    z-index: 2;
  }
  .react-autosuggest__suggestions-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  .react-autosuggest__suggestion {
    cursor: pointer;
    padding: 5px 20px;
    margin-top: 0;
    margin-bottom: 0;
  }
  .react-autosuggest__suggestion--highlighted {
    background-color: #ddd;
  }
  .react-autosuggest__section-container {
    border-top: 1px dashed #ccc;
  }
  .react-autosuggest__section-container--first {
    border-top: 0;
  }
  .react-autosuggest__section-title {
    padding: 5px 0 5px 10px;
    font-size: 12px;
    color: #777;
  }
`

const filterSuggestionsQuery = gql`
  query filterSuggestionsQuery($treeFilterText: String!) {
    propertyCollectionByPropertyName(propertyName: $treeFilterText) {
      nodes {
        id
        name
      }
    }
    objectByObjectName(objectName: $treeFilterText) {
      nodes {
        id
        name
        taxonomyByTaxonomyId {
          id
          type
          name
        }
      }
    }
  }
`
const objectUrlQuery = gql`
  query objectUrlDataQuery($treeFilterId: UUID!) {
    objectById(id: $treeFilterId) {
      id
      objectByParentId {
        id
        objectByParentId {
          id
          objectByParentId {
            id
            objectByParentId {
              id
              objectByParentId {
                id
                objectByParentId {
                  id
                }
              }
            }
          }
        }
      }
      taxonomyByTaxonomyId {
        id
        type
        name
      }
    }
  }
`

const TreeFilter = ({ dimensions }) => {
  const mobxStore = useContext(mobxStoreContext)
  const { treeFilter } = mobxStore
  const treeFilterText = treeFilter.text
  const { setTreeFilter } = treeFilter

  const treeFilterId = treeFilter.id || '99999999-9999-9999-9999-999999999999'
  const {
    data: filterSuggestionsData,
    error: filterSuggestionsError,
  } = useQuery(filterSuggestionsQuery, {
    variables: {
      treeFilterText: treeFilter.text || 'ZZZZ',
    },
  })
  const { data: objectUrlData, error: objectUrlError } = useQuery(
    objectUrlQuery,
    {
      variables: {
        treeFilterId,
      },
    },
  )

  const urlObject = get(objectUrlData, 'objectById', {})

  const onChange = useCallback(
    (event, { newValue }) => {
      setTreeFilter({ text: newValue, id: treeFilterId })
    },
    [setTreeFilter, treeFilterId],
  )
  const onSuggestionSelected = useCallback(
    (event, { suggestion }) => {
      switch (suggestion.type) {
        case 'pC':
          navigate(`/Eigenschaften-Sammlungen/${suggestion.id}`)
          break
        case 'art':
        case 'lr':
        default: {
          /**
           * set treeFilterId
           * then app rerenders
           * componentDidUpdate finds treeFilterId
           * and result of objectUrlData query
           * passes it to getUrlForObject
           * mutates history
           */
          setTreeFilter({ id: suggestion.id, text: treeFilterText })
        }
      }
    },
    [setTreeFilter, treeFilterText],
  )
  const renderSuggestion = useCallback(
    (suggestion, { query, isHighlighted }) => {
      const matches = match(suggestion.name, query)
      const parts = parse(suggestion.name, matches)
      return (
        <>
          {parts.map((part, index) => {
            return part.highlight ? (
              <strong
                key={String(index)}
                style={{ fontWeight: '700 !important' }}
              >
                {part.text}
              </strong>
            ) : (
              <span
                key={String(index)}
                style={{ fontWeight: '300 !important' }}
              >
                {part.text}
              </span>
            )
          })}
        </>
      )
    },
    [],
  )

  useEffect(() => {
    /**
     * check if treeFilterId and urlObject exist
     * if true:
     * pass query result for objectUrlData to getUrlForObject()
     * then update history with that result
     * and reset treeFilter, id and text
     */
    if (
      treeFilterId &&
      treeFilterId !== '99999999-9999-9999-9999-999999999999' &&
      urlObject &&
      urlObject.id
    ) {
      const url = getUrlForObject(urlObject)
      navigate(`/${url.join('/')}`)
      setTreeFilter({ id: null, text: '' })
    }
  }, [urlObject, treeFilterId, setTreeFilter])

  const objectByObjectName = get(
    filterSuggestionsData,
    'objectByObjectName.nodes',
    [],
  )
  const pCByPropertyName = get(
    filterSuggestionsData,
    'propertyCollectionByPropertyName.nodes',
    [],
  )
  const inputProps = {
    value: treeFilterText,
    onChange,
    type: 'search',
    placeholder: 'suchen',
    spellCheck: false,
  }
  /**
   * need add type:
   * when suggestion is clicked,
   * url is calculated by id depending on type
   */
  const suggestionsArt = objectByObjectName
    .filter((n) => get(n, 'taxonomyByTaxonomyId.type') === 'ART')
    .map((o) => ({
      id: o.id,
      name: `${get(o, 'taxonomyByTaxonomyId.name', '')}: ${o.name}`,
      type: 'art',
    }))
  const suggestionsLr = objectByObjectName
    .filter((n) => get(n, 'taxonomyByTaxonomyId.type') === 'LEBENSRAUM')
    .map((o) => ({
      id: o.id,
      name: `${get(o, 'taxonomyByTaxonomyId.name', '')}: ${o.name}`,
      type: 'lr',
    }))
  const suggestionsPC = pCByPropertyName.map((s) => ({
    ...s,
    type: 'pC',
  }))
  const loadingSuggestions = [
    {
      title: 'Lade Daten',
      suggestions: [
        {
          id: 'none',
          name: '',
          type: 'art',
        },
      ],
    },
  ]
  const suggestions = [...suggestionsArt, ...suggestionsLr, ...suggestionsPC]
    .length
    ? [
        {
          title: `Arten (${suggestionsArt.length})`,
          suggestions: suggestionsArt,
        },
        {
          title: `Lebensräume (${suggestionsLr.length})`,
          suggestions: suggestionsLr,
        },
        {
          title: `Eigenschaften-Sammlungen (${suggestionsPC.length})`,
          suggestions: suggestionsPC,
        },
      ]
    : loadingSuggestions
  // on first render dimensions.width is passed as '100%'
  // later it is passed as number of pixels
  const autosuggestWidth = isNaN(dimensions.width) ? 380 : dimensions.width - 29

  const getSuggestionValue = useCallback(
    (suggestion) => suggestion && suggestion.name,
    [],
  )
  const shouldRenderSuggestions = useCallback(
    (value) => value.trim().length > 2,
    [],
  )
  const renderSectionTitle = useCallback(
    (section) => <strong>{section.title}</strong>,
    [],
  )
  const getSectionSuggestions = useCallback(
    (section) => section.suggestions,
    [],
  )

  if (filterSuggestionsError) {
    return `Error fetching data: ${filterSuggestionsError.message}`
  }
  if (objectUrlError) {
    return `Error fetching data: ${objectUrlError.message}`
  }

  return (
    <ErrorBoundary>
      <Container data-autosuggestwidth={autosuggestWidth}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={() => {
            // Autosuggest wants this function
            // could maybe be used to indicate loading?
          }}
          onSuggestionsClearRequested={() => {
            // need this?
            //console.log('clear requested')
          }}
          getSuggestionValue={getSuggestionValue}
          shouldRenderSuggestions={shouldRenderSuggestions}
          onSuggestionSelected={onSuggestionSelected}
          renderSuggestion={renderSuggestion}
          multiSection={true}
          renderSectionTitle={renderSectionTitle}
          getSectionSuggestions={getSectionSuggestions}
          inputProps={inputProps}
          focusInputOnSuggestionClick={false}
        />
      </Container>
    </ErrorBoundary>
  )
}

export default observer(TreeFilter)
