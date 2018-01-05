// @flow
import React from 'react'
import AutoComplete from 'material-ui/AutoComplete'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import withState from 'recompose/withState'
import styled from 'styled-components'

const StyledAutoComplete = styled(AutoComplete)`
  margin-bottom: -12px;
`

const enhance = compose(
  withState('focused', 'changeFocused', false),
  withState('searchText', 'changeSearchText', ''),
  withState('searchTextWasChanged', 'changeSearchTextWasChanged', ''),
  withHandlers({
    onNewRequest: props => val => {
      const { updatePropertyInDb, fieldName, dataSourceConfig } = props
      updatePropertyInDb(fieldName, val[dataSourceConfig.value])
    },
    onFocus: props => () => props.changeFocused(true),
    onBlur: props => () => {
      const {
        changeFocused,
        searchText,
        searchTextWasChanged,
        updatePropertyInDb,
        fieldName,
      } = props
      changeFocused(false)
      if (!searchText && searchTextWasChanged) {
        // onNewRequest does not happen when value was removed by deleting text
        updatePropertyInDb(fieldName, null)
      }
    },
    onUpdateSearchText: props => searchText => {
      props.changeSearchText(searchText)
      props.changeSearchTextWasChanged(true)
    },
  })
)

const MyAutocomplete = ({
  label,
  valueText = '',
  dataSource,
  dataSourceConfig = {
    value: 'id',
    text: 'label',
  },
  anchorOrigin,
  targetOrigin,
  onNewRequest,
  focused,
  changeFocused,
  onFocus,
  onBlur,
  searchText,
  changeSearchText,
  onUpdateSearchText,
  searchTextWasChanged,
  changeSearchTextWasChanged,
}: {
  label: string,
  fieldName: string,
  valueText?: string,
  dataSource: Array<Object>,
  dataSourceConfig: Object,
  anchorOrigin: Object,
  targetOrigin: Object,
  updatePropertyInDb: () => void,
  onNewRequest: () => void,
  focused: boolean,
  changeFocused: () => void,
  onFocus: () => void,
  onBlur: () => void,
  searchText: ?string,
  changeSearchText: () => void,
  onUpdateSearchText: () => void,
  searchTextWasChanged: boolean,
  changeSearchTextWasChanged: () => void,
}) => {
  let searchTextToUse = searchText
  if (!searchText && valueText && isNaN(valueText) && !searchTextWasChanged) {
    searchTextToUse = valueText
  }
  if (searchTextToUse === null) searchTextToUse = ''
  const dataSourceLength = dataSource.filter(d => {
    if (
      dataSourceConfig &&
      dataSourceConfig.text &&
      d[dataSourceConfig.text] &&
      d[dataSourceConfig.text].toLowerCase() &&
      searchTextToUse &&
      searchTextToUse.toLowerCase()
    ) {
      return d[dataSourceConfig.text]
        .toLowerCase()
        .includes(searchTextToUse.toLowerCase())
    }
    return true
  }).length
  let labelFilterHint = 'Zum Filtern tippen. '
  if (valueText && !searchTextWasChanged) {
    labelFilterHint = 'Zum Filtern: Eintrag löschen, dann tippen. '
  }
  let labelNumberLimit = ''
  if (searchText && dataSourceLength === 0) {
    labelNumberLimit = 'Kein Eintrag entspricht dem Filter.'
  } else if (dataSourceLength && dataSourceLength <= 200) {
    labelNumberLimit = `Alle passenden Einträge werden aufgelistet.`
  } else if (dataSourceLength > 200) {
    labelNumberLimit = 'Nur die ersten 200 Einträge werden aufgelistet.'
  }
  const labelText = focused
    ? `${label}${
        labelFilterHint || labelNumberLimit ? '. ' : ''
      }${labelFilterHint}${labelNumberLimit}`
    : label
  const myAnchorOrigin = anchorOrigin
    ? anchorOrigin
    : { vertical: 'bottom', horizontal: 'left' }
  const myTargetOrigin = targetOrigin
    ? targetOrigin
    : { vertical: 'top', horizontal: 'left' }

  return (
    <StyledAutoComplete
      hintText={dataSource.length === 0 ? 'lade Daten...' : ''}
      floatingLabelText={labelText}
      dataSource={dataSource}
      dataSourceConfig={dataSourceConfig}
      searchText={searchTextToUse}
      onUpdateInput={onUpdateSearchText}
      filter={AutoComplete.caseInsensitiveFilter}
      maxSearchResults={200}
      onNewRequest={onNewRequest}
      openOnFocus
      onFocus={onFocus}
      onBlur={onBlur}
      menuStyle={{
        maxHeight: `${window.innerHeight * 0.8}px`,
      }}
      anchorOrigin={myAnchorOrigin}
      targetOrigin={myTargetOrigin}
    />
  )
}

export default enhance(MyAutocomplete)