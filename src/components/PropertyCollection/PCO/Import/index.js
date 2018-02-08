// @flow
import React from 'react'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import styled from 'styled-components'
import get from 'lodash/get'
import omit from 'lodash/omit'
import union from 'lodash/union'
import flatten from 'lodash/flatten'
import some from 'lodash/some'
import uniq from 'lodash/uniq'
import { withStyles } from 'material-ui-next/styles'
import Icon from 'material-ui-next/Icon'
import DoneIcon from 'material-ui-icons/Done'
import ErrorIcon from 'material-ui-icons/Error'
import Button from 'material-ui-next/Button'
import Dropzone from 'react-dropzone'
import XLSX from 'xlsx'
import isUuid from 'is-uuid'
import ReactDataGrid from 'react-data-grid'

import importPcoData from './importPcoData'
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
const HowToImportContainer = styled.div`
  padding: 0 8px;
`
const HowToImportLiContainer = styled.div`
  display: flex;
  line-height: 24px;
  > div {
    height: 24px;
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
const StyledDoneIcon = styled(DoneIcon)`
  color: green !important;
`
const StyledErrorIcon = styled(ErrorIcon)`
  color: red !important;
`
const StyledButton = styled(Button)`
  border: 1px solid !important;
  margin: 8px 8px 16px 8px !important;
`

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
})

const enhance = compose(
  withState('existsNoDataWithoutKey', 'setExistsNoDataWithoutKey', undefined),
  withState('idsAreUuids', 'setIdsAreUuid', undefined),
  withState('idsExist', 'setIdsExist', false),
  withState('idsAreUnique', 'setIdsAreUnique', undefined),
  withState('objectIdsExist', 'setObjectIdsExist', undefined),
  withState('objectIds', 'setObjectIds', []),
  withState('objectIdsAreUuid', 'setObjectIdsAreUuid', undefined),
  withState('importData', 'setImportData', []),
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
  loginData,
  withStyles(styles)
)

const ImportPco = ({
  loginData,
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
  objectIdsAreUuid,
  setObjectIdsAreUuid,
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
  importData,
  setImportData,
  importPcoData,
}: {
  loginData: Object,
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
  objectIdsAreUuid: Boolean,
  setObjectIdsAreUuid: () => void,
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
  importData: Array<Object>,
  setImportData: () => void,
  importPcoData: Object,
}) => {
  const objectsCheckData = get(importPcoData, 'allObjects.nodes', [])
  const objectIdsAreReal =
    !importPcoData.loading && objectIds.length > 0
      ? objectIds.length === objectsCheckData.length
      : undefined
  const showImportButton =
    importData.length > 0 &&
    existsNoDataWithoutKey &&
    (idsExist ? idsAreUnique && idsAreUuids : true) &&
    (objectIdsExist ? objectIdsAreUuid && objectIdsAreReal : false) &&
    existsPropertyKey &&
    propertyKeysDontContainApostroph &&
    propertyKeysDontContainBackslash &&
    propertyValuesDontContainApostroph &&
    propertyValuesDontContainBackslash
  const showPreview = importData.length > 0

  return (
    <Container>
      <HowToImportContainer>
        <h3>Anforderungen an zu importierende Eigenschaften</h3>
        <h4>Autorenrechte</h4>
        <ul>
          <li>
            <HowToImportLiContainer>
              <div>
                Die Autoren müssen mit der Veröffentlichung einverstanden sein
              </div>
            </HowToImportLiContainer>
          </li>
          <li>
            <HowToImportLiContainer>
              <div>Dafür verantwortlich ist, wer Daten importiert</div>
            </HowToImportLiContainer>
          </li>
        </ul>
        <h4>Tabelle</h4>
        <ul>
          <li>
            <HowToImportLiContainer>
              <div>Die erste Zeile enthält Feld-Namen (= Spalten-Titel)</div>
            </HowToImportLiContainer>
          </li>
          <li>
            <HowToImportLiContainer>
              <div>
                Jeder Wert hat einen Feld-Namen. Anders gesagt: Jede Zelle mit
                einem Wert hat einen Spalten-Titel
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
            </HowToImportLiContainer>
          </li>
        </ul>
        <h4>Zuordnungs-Felder</h4>
        <ul>
          <li>
            <HowToImportLiContainer>
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
            </HowToImportLiContainer>
            <HowToImportLiContainer>
              <div>Wenn nicht, wird eine id erzeugt</div>
            </HowToImportLiContainer>
          </li>
          <li>
            <HowToImportLiContainer>
              <div>
                <EmSpan>id</EmSpan>'s müssen gültige{' '}
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
            </HowToImportLiContainer>
          </li>
          <li>
            <HowToImportLiContainer>
              <div>
                <EmSpan>id</EmSpan>'s müssen eindeutig sein
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
            </HowToImportLiContainer>
          </li>
          <li>
            <HowToImportLiContainer>
              <div>
                Ein Feld namens <EmSpan>object_id</EmSpan> muss enthalten sein
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
            </HowToImportLiContainer>
          </li>
          <li>
            <HowToImportLiContainer>
              <div>
                <EmSpan>object_id</EmSpan>'s' müssen gültige{' '}
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
            </HowToImportLiContainer>
          </li>
          <li>
            <HowToImportLiContainer>
              <div>
                <EmSpan>object_id</EmSpan>'s' müssen <EmSpan>id</EmSpan>'s von
                Objekten aus arteigenschaften.ch sein
              </div>
              {objectIdsAreReal && (
                <div>
                  <InlineIcon>
                    <StyledDoneIcon />
                  </InlineIcon>
                </div>
              )}
              {objectIdsAreReal === false && (
                <div>
                  <InlineIcon>
                    <StyledErrorIcon />
                  </InlineIcon>
                </div>
              )}
            </HowToImportLiContainer>
          </li>
        </ul>
        <p>Alle weiteren Felder sind Eigenschaften des Objekts.</p>
        <h4>Eigenschaften</h4>
        <ul>
          <li>
            <HowToImportLiContainer>
              <div>Es muss mindestens eine Eigenschaft vorkommen</div>
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
            </HowToImportLiContainer>
          </li>
          <li>
            Feld-Namen dürfen beinahe alles enthalten.<br />
            Ausser diese Zeichen:
            <ul>
              <li>
                <HowToImportLiContainer>
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
                </HowToImportLiContainer>
              </li>
              <li>
                <HowToImportLiContainer>
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
                </HowToImportLiContainer>
              </li>
            </ul>
          </li>
          <li>
            Feld-Werte dürfen beinahe alles enthalten.<br />
            Ausser diese Zeichen:
            <ul>
              <li>
                <HowToImportLiContainer>
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
                </HowToImportLiContainer>
              </li>
              <li>
                <HowToImportLiContainer>
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
                </HowToImportLiContainer>
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
                  .map(d => d.object_id)
                  .filter(d => d !== undefined)
                const _objectIdsExist = _objectIds.length === data.length
                setObjectIdsExist(_objectIdsExist)
                setObjectIdsAreUuid(
                  _objectIdsExist
                    ? !_objectIds.map(d => isUuid.anyNonNil(d)).includes(false)
                    : undefined
                )
                setObjectIds(_objectIds)
                const propertyKeys = union(
                  flatten(
                    data.map(d => Object.keys(omit(d, ['id', 'object_id'])))
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
                Oder klicken, um sie auszuwählen.<br />
                <br />
                Akzeptierte Formate: .xlsx, .xls, .csv, .ods, .dbf, .dif
              </DropzoneDiv>
            )
          }}
        </Dropzone>
      </DropzoneContainer>
      {showImportButton && (
        <StyledButton
          onClick={() => console.log('TODO')}
          //className={classes.button}
        >
          importieren
        </StyledButton>
      )}
      {showPreview && (
        <ReactDataGrid
          columns={Object.keys(importData[0]).map(k => ({
            key: k,
            name: k,
            resizable: true,
          }))}
          rowGetter={i => importData[i]}
          rowsCount={importData.length}
        />
      )}
    </Container>
  )
}

export default enhance(ImportPco)
