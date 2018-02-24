// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import Autosuggest from 'react-autosuggest'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import { withApollo } from 'react-apollo'
import app from 'ampersand-app'
import get from 'lodash/get'

import treeFilterMutation from './treeFilterMutation'
import treeFilterData from './treeFilterData'
import filterSuggestionsData from './filterSuggestionsData'
import getUrlForObject from '../../../modules/getUrlForObject'
import objectUrlData from '../../../modules/objectUrlData'
import ErrorBoundary from '../../shared/ErrorBoundary'

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
    width: ${props => `${props['data-autosuggestwidth']}px`};
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
const enhance = compose(
  withApollo,
  treeFilterData,
  filterSuggestionsData,
  objectUrlData,
  withHandlers({
    onChange: ({ client, treeFilterData }) => (event, { newValue }) => {
      const id = get(treeFilterData, 'treeFilter.id', null)
      client.mutate({
        mutation: treeFilterMutation,
        variables: { text: newValue, id },
      })
    },
    onSuggestionSelected: ({ client, treeFilterData }) => (
      event,
      { suggestion }
    ) => {
      const text = get(treeFilterData, 'treeFilter.text', '')
      switch (suggestion.type) {
        case 'pC':
          app.history.push(`/Eigenschaften-Sammlungen/${suggestion.id}`)
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
          client.mutate({
            mutation: treeFilterMutation,
            variables: { id: suggestion.id, text },
          })
        }
      }
    },
  })
)

class TreeFilter extends Component {
  props: {
    client: Object,
    treeFilterData: Object,
    filterSuggestionsData: Object,
    objectUrlData: Object,
    onChange: () => {},
    onSuggestionSelected: () => {},
    dimensions: Object,
  }

  componentDidUpdate() {
    const { objectUrlData, treeFilterData, client } = this.props
    /**
     * check if treeFilterId and urlObject exist
     * if true:
     * pass query result for objectUrlData to getUrlForObject()
     * then update history with that result
     * and reset treeFilter, id and text
     */
    const urlObject = get(objectUrlData, 'objectById', {})
    const treeFilterId = get(treeFilterData, 'treeFilter.id', null)
    if (
      treeFilterId &&
      treeFilterId !== '99999999-9999-9999-9999-999999999999' &&
      urlObject
    ) {
      const url = getUrlForObject(urlObject)
      app.history.push(`/${url.join('/')}`)
      client.mutate({
        mutation: treeFilterMutation,
        variables: { id: null, text: '' },
      })
    }
  }

  render() {
    const {
      treeFilterData,
      filterSuggestionsData,
      onChange,
      onSuggestionSelected,
      dimensions,
    } = this.props

    const objectByObjectName = get(
      filterSuggestionsData,
      'objectByObjectName.nodes',
      []
    )
    const pCByPropertyName = get(
      filterSuggestionsData,
      'propertyCollectionByPropertyName.nodes',
      []
    )
    const treeFilterText = get(treeFilterData, 'treeFilter.text', '')
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
      .filter(n => get(n, 'taxonomyByTaxonomyId.type') === 'ART')
      .map(o => ({
        id: o.id,
        name: o.name,
        type: 'art',
      }))
    const suggestionsLr = objectByObjectName
      .filter(n => get(n, 'taxonomyByTaxonomyId.type') === 'LEBENSRAUM')
      .map(o => ({
        id: o.id,
        name: o.name,
        type: 'lr',
      }))
    const suggestionsPC = pCByPropertyName.map(s => ({
      ...s,
      type: 'pC',
    }))
    const suggestions = [
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
    // on first render dimensions.width is passed as '100%'
    // later it is passed as number of pixels
    const autosuggestWidth = isNaN(dimensions.width)
      ? 380
      : dimensions.width - 29

    return (
      <ErrorBoundary>
        <Container data-autosuggestwidth={autosuggestWidth}>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={() => {
              // Autosuggest wants this function
              // could maybe be used to indicate loading?
              //console.log('fetch requested')
            }}
            onSuggestionsClearRequested={() => {
              // need this?
              //console.log('clear requested')
            }}
            getSuggestionValue={suggestion => suggestion && suggestion.name}
            shouldRenderSuggestions={value => value.trim().length > 2}
            onSuggestionSelected={onSuggestionSelected}
            renderSuggestion={(suggestion, { query, isHighlighted }) => {
              const matches = match(suggestion.name, query)
              const parts = parse(suggestion.name, matches)
              return (
                <div>
                  {parts.map((part, index) => {
                    return part.highlight ? (
                      <strong
                        key={String(index)}
                        style={{ fontWeight: '500 !important' }}
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
                </div>
              )
            }}
            multiSection={true}
            renderSectionTitle={section => <strong>{section.title}</strong>}
            getSectionSuggestions={section => section.suggestions}
            inputProps={inputProps}
            focusInputOnSuggestionClick={false}
          />
        </Container>
      </ErrorBoundary>
    )
  }
}

export default enhance(TreeFilter)
