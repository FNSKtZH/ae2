// @flow
import React, { Fragment } from 'react'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import styled from 'styled-components'
import get from 'lodash/get'
import omit from 'lodash/omit'
import union from 'lodash/union'
import flatten from 'lodash/flatten'
import some from 'lodash/some'
import uniq from 'lodash/uniq'
import Icon from '@material-ui/core/Icon'
import DoneIcon from '@material-ui/icons/Done'
import ErrorIcon from '@material-ui/icons/Error'
import InfoOutlineIcon from '@material-ui/icons/InfoOutline'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import Dropzone from 'react-dropzone'
import XLSX from 'xlsx'
import isUuid from 'is-uuid'
import ReactDataGrid from 'react-data-grid'
import { withApollo } from 'react-apollo'

import importPcoData from './importPcoData'
import pCOData from '../pCOData'
import activeNodeArrayData from '../../../../modules/activeNodeArrayData'
import createPCOMutation from './createPCOMutation'
import loginData from '../../../../modules/loginData'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  .react-grid-Container {
    font-size: small;
  }
  .react-grid-Header {
  }
  .react-grid-HeaderRow {
    overflow: hidden;
  }
  .react-grid-HeaderCell:not(:first-child) {
    border-left: #c7c7c7 solid 1px !important;
  }
  .react-grid-HeaderCell__draggable {
    right: 16px !important;
  }
  .react-grid-Cell {
    border: #ddd solid 1px !important;
  }
`
const StyledH3 = styled.h3`
  margin-left: 8px;
`
const HowToImportContainer = styled.div`
  column-width: 500px;
  padding: 0 8px 0 8px;
  ul {
    padding-left: 20px;
  }
`
const StyledH4 = styled.h4`
  margin: 0 0 -10px 0;
`
const LiContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 29px;
  break-inside: avoid;
  > div {
    min-height: 29px;
  }
`
const EmSpan = styled.span`
  background-color: #8d8c8c40;
  padding: 1px 3px;
  border-radius: 4px;
`
const DropzoneContainer = styled.div`
  padding: 10px 8px;
  div {
    width: 100% !important;
    height: 124px !important;
    cursor: pointer;
  }
`
const DropzoneDiv = styled.div`
  padding: 8px;
`
const DropzoneDivActive = styled(DropzoneDiv)`
  background-color: rgba(255, 224, 178, 0.2);
`
const InlineIcon = styled(Icon)`
  margin-left: 8px;
`
const InlineDiv = styled.div`
  margin-left: 8px;
  font-style: italic;
`
const StyledDoneIcon = styled(DoneIcon)`
  color: green !important;
`
const StyledErrorIcon = styled(ErrorIcon)`
  color: red !important;
`
const StyledInfoOutlineIcon = styled(InfoOutlineIcon)`
  color: orange !important;
`
const StyledButton = styled(Button)`
  border: 1px solid !important;
  margin: 8px 8px 16px 8px !important;
`
const TotalDiv = styled.div`
  font-size: small;
  padding-left: 9px;
  margin-top: 8px;
`
const StyledP = styled.p`
  margin-top: -5px;
`
const StyledSnackbar = styled(Snackbar)`
  div {
    min-width: auto;
    background-color: #2e7d32 !important;
  }
`

const enhance = compose(
  withApollo,
  activeNodeArrayData,
  pCOData,
  withState('existsNoDataWithoutKey', 'setExistsNoDataWithoutKey', undefined),
  withState('idsAreUuids', 'setIdsAreUuid', undefined),
  withState('idsExist', 'setIdsExist', undefined),
  withState('idsAreUnique', 'setIdsAreUnique', undefined),
  withState('objectIdsExist', 'setObjectIdsExist', undefined),
  withState('pCOfOriginIdsExist', 'setPCOfOriginIdsExist', undefined),
  withState(
    'objectIdsAreRealNotTested',
    'setObjectIdsAreRealNotTested',
    undefined
  ),
  withState(
    'pCOfOriginIdsAreRealNotTested',
    'setPCOfOriginIdsAreRealNotTested',
    undefined
  ),
  withState('objectIds', 'setObjectIds', []),
  withState('pCOfOriginIds', 'setPCOfOriginIds', []),
  withState('objectIdsAreUuid', 'setObjectIdsAreUuid', undefined),
  withState('pCOfOriginIdsAreUuid', 'setPCOfOriginIdsAreUuid', undefined),
  withState('importData', 'setImportData', []),
  withState('importing', 'setImporting', false),
  withState(
    'propertyKeysDontContainApostroph',
    'setPropertyKeysDontContainApostroph',
    undefined
  ),
  withState(
    'propertyKeysDontContainBackslash',
    'setPropertyKeysDontContainBackslash',
    undefined
  ),
  withState(
    'propertyValuesDontContainApostroph',
    'setPropertyValuesDontContainApostroph',
    undefined
  ),
  withState(
    'propertyValuesDontContainBackslash',
    'setPropertyValuesDontContainBackslash',
    undefined
  ),
  withState('existsPropertyKey', 'setExistsPropertyKey', undefined),
  importPcoData,
  loginData
)

const ImportPco = ({
  loginData,
  activeNodeArrayData,
  pCOData,
  existsNoDataWithoutKey,
  setExistsNoDataWithoutKey,
  idsAreUuids,
  setIdsAreUuid,
  idsExist,
  setIdsExist,
  idsAreUnique,
  setIdsAreUnique,
  objectIdsExist,
  setObjectIdsExist,
  pCOfOriginIdsExist,
  setPCOfOriginIdsExist,
  objectIdsAreRealNotTested,
  setObjectIdsAreRealNotTested,
  pCOfOriginIdsAreRealNotTested,
  setPCOfOriginIdsAreRealNotTested,
  objectIdsAreUuid,
  setObjectIdsAreUuid,
  pCOfOriginIdsAreUuid,
  setPCOfOriginIdsAreUuid,
  propertyKeysDontContainApostroph,
  setPropertyKeysDontContainApostroph,
  propertyKeysDontContainBackslash,
  setPropertyKeysDontContainBackslash,
  existsPropertyKey,
  setExistsPropertyKey,
  propertyValuesDontContainApostroph,
  setPropertyValuesDontContainApostroph,
  propertyValuesDontContainBackslash,
  setPropertyValuesDontContainBackslash,
  objectIds,
  setObjectIds,
  pCOfOriginIds,
  setPCOfOriginIds,
  importData,
  setImportData,
  importPcoData,
  setCompleted,
  importing,
  setImporting,
  client,
}: {
  loginData: Object,
  activeNodeArrayData: Object,
  pCOData: Object,
  existsNoDataWithoutKey: Boolean,
  setExistsNoDataWithoutKey: () => void,
  idsAreUuids: Boolean,
  setIdsAreUuid: () => void,
  idsExist: Boolean,
  setIdsExist: () => void,
  idsAreUnique: Boolean,
  setIdsAreUnique: () => void,
  objectIdsExist: Boolean,
  setObjectIdsExist: () => void,
  pCOfOriginIdsExist: Boolean,
  setPCOfOriginIdsExist: () => void,
  objectIdsAreRealNotTested: Boolean,
  setObjectIdsAreRealNotTested: () => void,
  pCOfOriginIdsAreRealNotTested: Boolean,
  setPCOfOriginIdsAreRealNotTested: () => void,
  objectIdsAreUuid: Boolean,
  setObjectIdsAreUuid: () => void,
  pCOfOriginIdsAreUuid: Boolean,
  setPCOfOriginIdsAreUuid: () => void,
  propertyKeysDontContainApostroph: Boolean,
  setPropertyKeysDontContainApostroph: () => void,
  propertyKeysDontContainBackslash: Boolean,
  setPropertyKeysDontContainBackslash: () => void,
  existsPropertyKey: Boolean,
  setExistsPropertyKey: () => void,
  propertyValuesDontContainApostroph: Boolean,
  setPropertyValuesDontContainApostroph: () => void,
  propertyValuesDontContainBackslash: Boolean,
  setPropertyValuesDontContainBackslash: () => void,
  objectIds: Array<String>,
  setObjectIds: () => void,
  pCOfOriginIds: Array<String>,
  setPCOfOriginIds: () => void,
  importData: Array<Object>,
  setImportData: () => void,
  importPcoData: Object,
  setCompleted: () => void,
  importing: Boolean,
  setImporting: () => void,
  client: Object,
}) => {
  const { loading, error } = importPcoData
  if (error && error.message) {
    if (error.message === 'GraphQL error: request entity too large') {
      setObjectIdsAreRealNotTested(true)
    }
  }
  const pCId = get(
    activeNodeArrayData,
    'activeNodeArray[1]',
    '99999999-9999-9999-9999-999999999999'
  )
  const objectsCheckData = get(importPcoData, 'allObjects.nodes', [])
  const objectIdsAreReal =
    !importPcoData.loading && objectIds.length > 0
      ? objectIds.length === objectsCheckData.length
      : undefined
  const pCOfOriginsCheckData = get(
    importPcoData,
    'allPropertyCollections.nodes',
    []
  )
  const pCOfOriginIdsAreReal =
    !importPcoData.loading && pCOfOriginIds.length > 0
      ? pCOfOriginIds.length === pCOfOriginsCheckData.length
      : undefined
  const showImportButton =
    importData.length > 0 &&
    existsNoDataWithoutKey &&
    (idsExist ? idsAreUnique && idsAreUuids : true) &&
    (objectIdsExist
      ? objectIdsAreUuid && (objectIdsAreReal || objectIdsAreRealNotTested)
      : false) &&
    (pCOfOriginIdsExist
      ? pCOfOriginIdsAreUuid &&
        (pCOfOriginIdsAreReal || pCOfOriginIdsAreRealNotTested)
      : true) &&
    existsPropertyKey &&
    propertyKeysDontContainApostroph &&
    propertyKeysDontContainBackslash &&
    propertyValuesDontContainApostroph &&
    propertyValuesDontContainBackslash
  const showPreview = importData.length > 0
  let importDataFields = []
  importData.forEach(d => {
    importDataFields = union([...importDataFields, ...Object.keys(d)])
  })
  const propertyFields = importDataFields.filter(
    f => !['id', 'objectId', 'propertyCollectionOfOrigin'].includes(f)
  )

  return (
    <Container>
      <StyledH3>Anforderungen an zu importierende Eigenschaften</StyledH3>
      <HowToImportContainer>
        <StyledH4>Autorenrechte</StyledH4>
        <ul>
          <li>
            <LiContainer>
              <div>
                Die Autoren müssen mit der Veröffentlichung einverstanden sein
              </div>
            </LiContainer>
          </li>
          <li>
            <LiContainer>
              <div>Dafür verantwortlich ist, wer Daten importiert</div>
            </LiContainer>
          </li>
        </ul>
        <StyledH4>Tabelle</StyledH4>
        <ul>
          <li>
            <LiContainer>
              <div>Die erste Zeile enthält Feld-Namen (= Spalten-Titel)</div>
            </LiContainer>
          </li>
          <li>
            <LiContainer>
              <div>
                Jeder Wert hat einen Feld-Namen.<br />Anders gesagt: Jede Zelle
                mit einem Wert hat einen Spalten-Titel
              </div>
              {existsNoDataWithoutKey && (
                <div>
                  <InlineIcon>
                    <StyledDoneIcon />
                  </InlineIcon>
                </div>
              )}
              {existsNoDataWithoutKey === false && (
                <div>
                  <InlineIcon>
                    <StyledErrorIcon />
                  </InlineIcon>
                </div>
              )}
            </LiContainer>
          </li>
        </ul>
        <StyledH4>Zuordnungs-Felder</StyledH4>
        <ul>
          <li>
            <LiContainer>
              <div>
                Ein Feld namens <EmSpan>id</EmSpan> kann enthalten sein.
              </div>
              {idsExist && (
                <div>
                  <InlineIcon>
                    <StyledDoneIcon />
                  </InlineIcon>
                </div>
              )}
              {idsExist === false && (
                <div>
                  <InlineDiv>(ist nicht)</InlineDiv>
                </div>
              )}
            </LiContainer>
            <LiContainer>
              <div>Wenn nicht, wird eine id erzeugt</div>
              {idsExist === false && (
                <div>
                  <InlineIcon>
                    <StyledDoneIcon />
                  </InlineIcon>
                </div>
              )}
            </LiContainer>
            <ul>
              <li>
                <LiContainer>
                  <div>
                    <EmSpan>id</EmSpan> muss gültige{' '}
                    <a
                      href="https://de.wikipedia.org/wiki/Universally_Unique_Identifier"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      UUID
                    </a>{' '}
                    sein
                  </div>
                  {idsAreUuids && (
                    <div>
                      <InlineIcon>
                        <StyledDoneIcon />
                      </InlineIcon>
                    </div>
                  )}
                  {idsAreUuids === false && (
                    <div>
                      <InlineIcon>
                        <StyledErrorIcon />
                      </InlineIcon>
                    </div>
                  )}
                </LiContainer>
              </li>
              <li>
                <LiContainer>
                  <div>
                    <EmSpan>id</EmSpan> muss eindeutig sein
                  </div>
                  {idsAreUnique && (
                    <div>
                      <InlineIcon>
                        <StyledDoneIcon />
                      </InlineIcon>
                    </div>
                  )}
                  {idsAreUnique === false && (
                    <div>
                      <InlineIcon>
                        <StyledErrorIcon />
                      </InlineIcon>
                    </div>
                  )}
                </LiContainer>
              </li>
            </ul>
          </li>
          <li>
            <LiContainer>
              <div>
                Ein Feld namens <EmSpan>objectId</EmSpan> muss enthalten sein
              </div>
              {objectIdsExist && (
                <div>
                  <InlineIcon>
                    <StyledDoneIcon />
                  </InlineIcon>
                </div>
              )}
              {objectIdsExist === false && (
                <div>
                  <InlineIcon>
                    <StyledErrorIcon />
                  </InlineIcon>
                </div>
              )}
            </LiContainer>
            <ul>
              <li>
                <LiContainer>
                  <div>
                    <EmSpan>objectId</EmSpan> muss gültige{' '}
                    <a
                      href="https://de.wikipedia.org/wiki/Universally_Unique_Identifier"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      UUID
                    </a>{' '}
                    sein
                  </div>
                  {objectIdsAreUuid && (
                    <div>
                      <InlineIcon>
                        <StyledDoneIcon />
                      </InlineIcon>
                    </div>
                  )}
                  {objectIdsAreUuid === false && (
                    <div>
                      <InlineIcon>
                        <StyledErrorIcon />
                      </InlineIcon>
                    </div>
                  )}
                </LiContainer>
              </li>
              <li>
                <LiContainer>
                  <div>
                    <EmSpan>objectId</EmSpan> muss <EmSpan>id</EmSpan> eines
                    Objekts aus arteigenschaften.ch sein
                  </div>
                  {objectIdsAreReal && (
                    <div>
                      <InlineIcon>
                        <StyledDoneIcon />
                      </InlineIcon>
                    </div>
                  )}
                  {objectIdsAreReal === false &&
                    !objectIdsAreRealNotTested && (
                      <div>
                        <InlineIcon>
                          <StyledErrorIcon />
                        </InlineIcon>
                      </div>
                    )}
                  {objectIdsAreRealNotTested && (
                    <Fragment>
                      <InlineIcon>
                        <StyledInfoOutlineIcon />
                      </InlineIcon>
                      <InlineDiv>
                        (nicht getestet, da sehr viele Daten. Datensätze, welche
                        dieses Kriterium nicht erfüllen, werden nicht
                        importiert)
                      </InlineDiv>
                    </Fragment>
                  )}
                </LiContainer>
              </li>
            </ul>
          </li>
          <li>
            <LiContainer>
              <div>
                Ein Feld namens <EmSpan>propertyCollectionOfOrigin</EmSpan> kann
                enthalten sein.
              </div>
              {pCOfOriginIdsExist && (
                <div>
                  <InlineIcon>
                    <StyledDoneIcon />
                  </InlineIcon>
                </div>
              )}
              {pCOfOriginIdsExist === false && (
                <div>
                  <InlineDiv>(ist nicht)</InlineDiv>
                </div>
              )}
            </LiContainer>
            <LiContainer>
              <div>
                Zweck: In zusammenfassenden Eigenschaften-Sammlungen markieren,
                aus welcher Eigenschaften-Sammlung diese Eigenschaften stammen.{' '}
                <a
                  href="https://github.com/barbalex/ae2#zusammenfassende-eigenschaften-sammlungen"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Mehr Infos
                </a>
              </div>
              <br />
            </LiContainer>
            <ul>
              <li>
                <LiContainer>
                  <div>
                    <EmSpan>propertyCollectionOfOrigin</EmSpan> muss gültige{' '}
                    <a
                      href="https://de.wikipedia.org/wiki/Universally_Unique_Identifier"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      UUID
                    </a>{' '}
                    sein
                  </div>
                  {pCOfOriginIdsAreUuid && (
                    <div>
                      <InlineIcon>
                        <StyledDoneIcon />
                      </InlineIcon>
                    </div>
                  )}
                  {pCOfOriginIdsAreUuid === false && (
                    <div>
                      <InlineIcon>
                        <StyledErrorIcon />
                      </InlineIcon>
                    </div>
                  )}
                </LiContainer>
              </li>
              <li>
                <LiContainer>
                  <div>
                    <EmSpan>propertyCollectionOfOrigin</EmSpan> muss{' '}
                    <EmSpan>id</EmSpan> einer Eigenschaften-Sammlung aus
                    arteigenschaften.ch sein
                  </div>
                  {pCOfOriginIdsAreReal && (
                    <div>
                      <InlineIcon>
                        <StyledDoneIcon />
                      </InlineIcon>
                    </div>
                  )}
                  {pCOfOriginIdsAreReal === false &&
                    !pCOfOriginIdsAreRealNotTested && (
                      <div>
                        <InlineIcon>
                          <StyledErrorIcon />
                        </InlineIcon>
                      </div>
                    )}
                  {pCOfOriginIdsAreRealNotTested && (
                    <Fragment>
                      <InlineIcon>
                        <StyledInfoOutlineIcon />
                      </InlineIcon>
                      <InlineDiv>
                        (nicht getestet, da sehr viele Daten. Datensätze, welche
                        dieses Kriterium nicht erfüllen, werden nicht
                        importiert)
                      </InlineDiv>
                    </Fragment>
                  )}
                </LiContainer>
              </li>
            </ul>
          </li>
        </ul>
        <StyledP>Alle weiteren Felder sind Eigenschaften des Objekts:</StyledP>
        <StyledH4>Eigenschaften</StyledH4>
        <ul>
          <li>
            <LiContainer>
              <div>Es gibt mindestens eine Eigenschaft</div>
              {existsPropertyKey && (
                <div>
                  <InlineIcon>
                    <StyledDoneIcon />
                  </InlineIcon>
                </div>
              )}
              {existsPropertyKey === false && (
                <div>
                  <InlineIcon>
                    <StyledErrorIcon />
                  </InlineIcon>
                </div>
              )}
            </LiContainer>
          </li>
          <li>
            Feld-Namen dürfen die folgenden Zeichen nicht enthalten:
            <ul>
              <li>
                <LiContainer>
                  <div>"</div>
                  {propertyKeysDontContainApostroph && (
                    <div>
                      <InlineIcon>
                        <StyledDoneIcon />
                      </InlineIcon>
                    </div>
                  )}
                  {propertyKeysDontContainApostroph === false && (
                    <div>
                      <InlineIcon>
                        <StyledErrorIcon />
                      </InlineIcon>
                    </div>
                  )}
                </LiContainer>
              </li>
              <li>
                <LiContainer>
                  <div>\</div>
                  {propertyKeysDontContainBackslash && (
                    <div>
                      <InlineIcon>
                        <StyledDoneIcon />
                      </InlineIcon>
                    </div>
                  )}
                  {propertyKeysDontContainBackslash === false && (
                    <div>
                      <InlineIcon>
                        <StyledErrorIcon />
                      </InlineIcon>
                    </div>
                  )}
                </LiContainer>
              </li>
            </ul>
          </li>
          <li>
            Feld-Werte dürfen die folgenden Zeichen nicht enthalten:
            <ul>
              <li>
                <LiContainer>
                  <div>"</div>
                  {propertyValuesDontContainApostroph && (
                    <div>
                      <InlineIcon>
                        <StyledDoneIcon />
                      </InlineIcon>
                    </div>
                  )}
                  {propertyValuesDontContainApostroph === false && (
                    <div>
                      <InlineIcon>
                        <StyledErrorIcon />
                      </InlineIcon>
                    </div>
                  )}
                </LiContainer>
              </li>
              <li>
                <LiContainer>
                  <div>\</div>
                  {propertyValuesDontContainBackslash && (
                    <div>
                      <InlineIcon>
                        <StyledDoneIcon />
                      </InlineIcon>
                    </div>
                  )}
                  {propertyValuesDontContainBackslash === false && (
                    <div>
                      <InlineIcon>
                        <StyledErrorIcon />
                      </InlineIcon>
                    </div>
                  )}
                </LiContainer>
              </li>
            </ul>
          </li>
        </ul>
      </HowToImportContainer>
      <DropzoneContainer>
        <Dropzone
          onDrop={(acceptedFiles, rejectedFiles) => {
            const file = acceptedFiles[0]
            if (!!file) {
              const reader = new FileReader()
              reader.onload = () => {
                const fileAsBinaryString = reader.result
                const workbook = XLSX.read(fileAsBinaryString, {
                    type: 'binary',
                  }),
                  sheetName = workbook.SheetNames[0],
                  worksheet = workbook.Sheets[sheetName]
                const data = XLSX.utils
                  .sheet_to_json(worksheet)
                  .map(d => omit(d, ['__rowNum__']))
                // test the data
                setImportData(data)
                setExistsNoDataWithoutKey(
                  data.filter(d => !!d.__EMPTY).length === 0
                )
                const ids = data.map(d => d.id).filter(d => d !== undefined)
                const _idsExist = ids.length > 0
                setIdsExist(_idsExist)
                setIdsAreUuid(
                  _idsExist
                    ? !ids.map(d => isUuid.anyNonNil(d)).includes(false)
                    : undefined
                )
                setIdsAreUnique(
                  _idsExist ? ids.length === uniq(ids).length : undefined
                )
                const _objectIds = data
                  .map(d => d.objectId)
                  .filter(d => d !== undefined)
                const _objectIdsExist = _objectIds.length === data.length
                setObjectIdsExist(_objectIdsExist)
                setObjectIdsAreUuid(
                  _objectIdsExist
                    ? !_objectIds.map(d => isUuid.anyNonNil(d)).includes(false)
                    : undefined
                )
                setObjectIds(_objectIds)

                const _pCOfOriginIds = data
                  .map(d => d.propertyCollectionOfOrigin)
                  .filter(d => d !== undefined)
                const _pCOfOriginIdsExist = _pCOfOriginIds.length > 0
                setPCOfOriginIdsExist(_pCOfOriginIdsExist)
                setPCOfOriginIdsAreUuid(
                  _pCOfOriginIdsExist
                    ? !_pCOfOriginIds
                        .map(d => isUuid.anyNonNil(d))
                        .includes(false)
                    : undefined
                )
                setPCOfOriginIds(_pCOfOriginIds)

                const propertyKeys = union(
                  flatten(
                    data.map(d => Object.keys(omit(d, ['id', 'objectId'])))
                  )
                )
                const _existsPropertyKey = propertyKeys.length > 0
                setExistsPropertyKey(_existsPropertyKey)
                setPropertyKeysDontContainApostroph(
                  _existsPropertyKey
                    ? !some(propertyKeys, k => k.includes('"'))
                    : undefined
                )
                setPropertyKeysDontContainBackslash(
                  _existsPropertyKey
                    ? !some(propertyKeys, k => k.includes('\\'))
                    : undefined
                )
                const propertyValues = union(
                  flatten(data.map(d => Object.values(d)))
                )
                setPropertyValuesDontContainApostroph(
                  !some(propertyValues, k => k.includes('"'))
                )
                setPropertyValuesDontContainBackslash(
                  !some(propertyValues, k => k.includes('\\'))
                )
              }
              reader.onabort = () => console.log('file reading was aborted')
              reader.onerror = () => console.log('file reading has failed')
              reader.readAsBinaryString(file)
            }
          }}
          accept=".xlsx, .xls, .csv, .ods, .dbf, .dif"
          disablePreview
          multiple={false}
        >
          {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
            if (isDragActive)
              return <DropzoneDivActive>Hier fallen lassen</DropzoneDivActive>
            if (isDragReject)
              return <DropzoneDivActive>njet!</DropzoneDivActive>
            return (
              <DropzoneDiv>
                Datei hierhin ziehen.<br />
                Oder hier klicken, um eine Datei auszuwählen.<br />
                <br />
                Akzeptierte Formate: .xlsx, .xls, .csv, .ods, .dbf, .dif
              </DropzoneDiv>
            )
          }}
        </Dropzone>
      </DropzoneContainer>
      {showImportButton && (
        <StyledButton
          onClick={async () => {
            setImporting(true)
            // need a list of all fields
            // loop all rows, build variables and create pco
            importData.forEach(async (d, i) => {
              const variables = {}
              importDataFields.forEach(f => (variables[f] = d[f] || null))
              variables.propertyCollectionId = pCId
              const properties = omit(d, [
                'id',
                'objectId',
                'propertyCollectionId',
                'propertyCollectionOfOrigin',
              ])
              variables.properties = JSON.stringify(properties)
              try {
                await client.mutate({
                  mutation: createPCOMutation,
                  variables,
                })
              } catch (error) {
                console.log(error)
              }
            })
            await pCOData.refetch()
            // do not set false because an unmounted component is updated
            //setImporting(false)
          }}
        >
          {importing ? 'Daten werden importiert...' : 'importieren'}
        </StyledButton>
      )}
      {showPreview && (
        <Fragment>
          <TotalDiv>{`${importData.length.toLocaleString(
            'de-CH'
          )} Datensätze, ${propertyFields.length.toLocaleString('de-CH')} Feld${
            propertyFields.length === 1 ? '' : 'er'
          }${importData.length > 0 ? ':' : ''}`}</TotalDiv>
          <ReactDataGrid
            columns={importDataFields.map(k => ({
              key: k,
              name: k,
              resizable: true,
            }))}
            rowGetter={i => importData[i]}
            rowsCount={importData.length}
          />
        </Fragment>
      )}
      <StyledSnackbar open={loading} message="lade Daten..." />
    </Container>
  )
}

export default enhance(ImportPco)
