// @flow
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import withState from 'recompose/withState'
import Autosuggest from 'react-autosuggest'

const Container = styled(({ autosuggestWidth, ...rest }) => <div {...rest} />)`
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
    background-color: rgba(0,0,0,0);
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
    width: ${props => `${props.autosuggestWidth}px`};
    border: 1px solid #aaa;
    background-color: #fff;
    font-family: Helvetica, sans-serif;
    font-weight: 300;
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
  inject('store'),
  withState('autosuggestWidth', 'changeAutosuggestWidth', 380),
  withHandlers({
    onChange: props => (event, { newValue }) => {
      props.store.treeFilter.setText(newValue)
    },
    onBlur: props => (event, { newValue }) => {
      // props.store.treeFilter.setText(newValue)
      console.log('blured, value:', newValue)
    },
  }),
  observer
)

// $FlowIssue
class TreeFilter extends Component {
  props: {
    store: Object,
    onChange: () => {},
    onBlur: () => {},
    autosuggestWidth: number,
    changeAutosuggestWidth: () => {},
  }

  componentDidMount() {
    const { changeAutosuggestWidth } = this.props
    const autosuggestDomNode =
      this.autosuggest && ReactDOM.findDOMNode(this.autosuggest)
    const autosuggestWidth = autosuggestDomNode
      ? autosuggestDomNode.clientWidth
      : 380
    changeAutosuggestWidth(autosuggestWidth)
  }

  componentDidUpdate() {
    const { changeAutosuggestWidth } = this.props
    const autosuggestDomNode =
      this.autosuggest && ReactDOM.findDOMNode(this.autosuggest)
    const autosuggestWidth = autosuggestDomNode
      ? autosuggestDomNode.clientWidth
      : 380
    changeAutosuggestWidth(autosuggestWidth)
  }

  render() {
    const { store, onChange, onBlur, autosuggestWidth } = this.props

    const inputProps = {
      value: store.treeFilter.text,
      onChange,
      onBlur,
      type: 'search',
      placeholder: 'suchen',
      spellCheck: false,
    }
    let { suggestionsTO, suggestionsPC, suggestionsRC } = store.treeFilter
    /**
       * need add type:
       * when suggistion is clicked,
       * url is calculated by id depending on type
       */
    suggestionsTO = suggestionsTO.map(s => {
      s.type = 'tO'
      return s
    })
    suggestionsPC = suggestionsPC.map(s => {
      s.type = 'pC'
      return s
    })
    suggestionsRC = suggestionsRC.map(s => {
      s.type = 'rC'
      return s
    })
    const suggestions = [
      {
        title: `Arten und Lebensräume (${suggestionsTO.length})`,
        suggestions: suggestionsTO,
      },
      {
        title: `Eigenschaften-Sammlungen (${suggestionsPC.length})`,
        suggestions: suggestionsPC,
      },
      {
        title: `Beziehungs-Sammlungen (${suggestionsRC.length})`,
        suggestions: suggestionsRC,
      },
    ]

    return (
      <Container autosuggestWidth={autosuggestWidth}>
        <Autosuggest
          ref={c => (this.autosuggest = c)}
          suggestions={suggestions}
          onSuggestionsFetchRequested={() => {
            // Autosuggest wants this function
            // could maybe be used to indicate loading?
            // console.log('fetch requested')
          }}
          onSuggestionsClearRequested={() => {
            store.treeFilter.setSuggestionsTO([])
            store.treeFilter.setSuggestionsPC([])
            store.treeFilter.setSuggestionsRC([])
          }}
          getSuggestionValue={suggestion => suggestion && suggestion.name}
          onSuggestionSelected={(event, { suggestion }) => {
            switch (suggestion.type) {
              case 'pC':
                store.setUrlFromPCId(suggestion.id)
                break
              case 'rC':
                store.setUrlFromRCId(suggestion.id)
                break
              case 'tO':
              default:
                store.setUrlFromTOId(suggestion.id)
            }
          }}
          renderSuggestion={suggestion => <span>{suggestion.name}</span>}
          multiSection={true}
          renderSectionTitle={section => <strong>{section.title}</strong>}
          getSectionSuggestions={section => section.suggestions}
          inputProps={inputProps}
          focusInputOnSuggestionClick={false}
        />
      </Container>
    )
  }
}

export default enhance(TreeFilter)
