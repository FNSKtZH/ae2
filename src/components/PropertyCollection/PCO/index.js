// @flow
import React, { Fragment } from 'react'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import styled from 'styled-components'
import get from 'lodash/get'
import omit from 'lodash/omit'
import forOwn from 'lodash/forOwn'
import union from 'lodash/union'
import flatten from 'lodash/flatten'
import some from 'lodash/some'
import orderBy from 'lodash/orderBy'
import uniq from 'lodash/uniq'
import ReactDataGrid from 'react-data-grid'
import Button from 'material-ui-next/Button'
import { withStyles } from 'material-ui-next/styles'
import Icon from 'material-ui-next/Icon'
import DoneIcon from 'material-ui-icons/Done'
import ErrorIcon from 'material-ui-icons/Error'
import Dropzone from 'react-dropzone'
import XLSX from 'xlsx'
import isUuid from 'is-uuid'

import activeNodeArrayData from '../../../modules/activeNodeArrayData'
import booleanToJaNein from '../../../modules/booleanToJaNein'
import exportXlsx from '../../../modules/exportXlsx'
import exportCsv from '../../../modules/exportCsv'
import pCOData from './pCOData'
import loginData from '../../../modules/loginData'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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
const TotalDiv = styled.div`
  font-size: small;
  padding-left: 9px;
  margin-top: 8px;
`
const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
const ExportButtons = styled.div`
  display: flex;
  justify-content: space-between;
`
const MutationButtons = styled.div`
  display: flex;
  justify-content: space-between;
`
const StyledButton = styled(Button)`
  border: 1px solid !important;
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

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
})

const enhance = compose(
  activeNodeArrayData,
  withState('sortField', 'setSortField', 'Objekt Name'),
  withState('sortDirection', 'setSortDirection', 'asc'),
  withState('existsNoDataWithoutKey', 'setExistsNoDataWithoutKey', undefined),
  withState('idsAreUuids', 'setIdsAreUuids', undefined),
  withState('idsExist', 'setIdsExist', false),
  withState('idsAreUnique', 'setIdsAreUnique', undefined),
  withState('xxx', 'setXxx', 0),
  withState('xxx', 'setXxx', 0),
  pCOData,
  loginData,
  withStyles(styles)
)

const PCO = ({
  pCOData,
  loginData,
  dimensions,
  sortField,
  sortDirection,
  setSortField,
  setSortDirection,
  classes,
  existsNoDataWithoutKey,
  setExistsNoDataWithoutKey,
  idsAreUuids,
  setIdsAreUuids,
  idsExist,
  setIdsExist,
  idsAreUnique,
  setIdsAreUnique,
}: {
  pCOData: Object,
  loginData: Object,
  dimensions: Object,
  sortField: String,
  sortDirection: String,
  setSortField: () => void,
  setSortDirection: () => void,
  classes: Object,
  existsNoDataWithoutKey: Boolean,
  setExistsNoDataWithoutKey: () => void,
  idsAreUuids: Boolean,
  setIdsAreUuids: () => void,
  idsExist: Boolean,
  setIdsExist: () => void,
  idsAreUnique: Boolean,
  setIdsAreUnique: () => void,
}) => {
  const { loading } = pCOData
  if (loading) {
    return (
      <Container>
        <TotalDiv>Lade Daten...</TotalDiv>
      </Container>
    )
  }
  const height = isNaN(dimensions.height) ? 0 : dimensions.height
  const width = isNaN(dimensions.width) ? 0 : dimensions.width
  let pCO = []
  // collect all keys
  const allKeys = []
  const pCORaw = get(
    pCOData,
    'propertyCollectionById.propertyCollectionObjectsByPropertyCollectionId.nodes',
    []
  ).map(p => omit(p, ['__typename']))
  pCORaw.forEach(p => {
    let nP = {}
    nP['Objekt ID'] = p.objectId
    nP['Objekt Name'] = get(p, 'objectByObjectId.name', null)
    if (p.properties) {
      const props = JSON.parse(p.properties)
      forOwn(props, (value, key) => {
        if (typeof value === 'boolean') {
          nP[key] = booleanToJaNein(value)
        } else {
          nP[key] = value
        }
        // collect all keys
        allKeys.push(key)
      })
    }
    pCO.push(nP)
  })
  pCO = orderBy(pCO, sortField, sortDirection)
  // collect all keys and sort property keys by name
  const keys = ['Objekt ID', 'Objekt Name', ...union(allKeys).sort()]
  const columns = keys.map(k => ({
    key: k,
    name: k,
    resizable: true,
    sortable: true,
  }))
  const pCOWriters = get(
    pCOData,
    'propertyCollectionById.organizationByOrganizationId.organizationUsersByOrganizationId.nodes',
    []
  ).filter(u => ['orgAdmin', 'orgCollectionWriter'].includes(u.role))
  const writerNames = union(pCOWriters.map(w => w.userByUserId.name))
  const username = get(loginData, 'login.username')
  const userIsWriter = !!username && writerNames.includes(username)
  /**
   * TODO
   * if user is writer:
   * enable removing pco data
   * enable importing pco data if none exists
   */
  console.log('existsNoDataWithoutKey:', existsNoDataWithoutKey)
  console.log('idsAreUuids:', idsAreUuids)

  return (
    <Container>
      {pCO.length > 0 && (
        <Fragment>
          <TotalDiv>{`${pCO.length.toLocaleString('de-CH')} Datensätze, ${(
            columns.length - 2
          ).toLocaleString('de-CH')} Feld${columns.length === 3 ? '' : 'er'}${
            pCO.length > 0 ? ':' : ''
          }`}</TotalDiv>
          <ReactDataGrid
            onGridSort={(column, direction) => {
              setSortField(column)
              setSortDirection(direction.toLowerCase())
            }}
            columns={columns}
            rowGetter={i => pCO[i]}
            rowsCount={pCO.length}
            minHeight={height - 33 - 37}
            minWidth={width}
          />
          <ButtonsContainer>
            <ExportButtons>
              <StyledButton
                onClick={() =>
                  exportXlsx({
                    rows: pCO,
                    onSetMessage: console.log,
                    columns: keys,
                  })
                }
                className={classes.button}
              >
                xlsx exportieren
              </StyledButton>
              <StyledButton
                onClick={() => exportCsv(pCO)}
                className={classes.button}
              >
                csv exportieren
              </StyledButton>
            </ExportButtons>
            {userIsWriter && (
              <MutationButtons>
                <StyledButton
                  onClick={() => console.log('TODO')}
                  className={classes.button}
                >
                  Daten löschen
                </StyledButton>
              </MutationButtons>
            )}
          </ButtonsContainer>
        </Fragment>
      )}
      {pCO.length === 0 &&
        userIsWriter && (
          <Fragment>
            <HowToImportContainer>
              <h3>Anforderungen an zu importierende Eigenschaften</h3>
              <h4>Autorenrechte</h4>
              <ul>
                <li>
                  <HowToImportLiContainer>
                    <div>
                      Die Autoren müssen mit der Veröffentlichung einverstanden
                      sein
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
                    <div>Die erste Zeile enthält Feld-Namen</div>
                  </HowToImportLiContainer>
                </li>
                <li>
                  <HowToImportLiContainer>
                    <div>Jeder Wert hat einen Feld-Namen</div>
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
                      <EmSpan>id</EmSpan>'s müssen eine gültige{' '}
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
                      Ein Feld namens <EmSpan>object_id</EmSpan> muss enthalten
                      sein
                    </div>
                  </HowToImportLiContainer>
                </li>
                <li>
                  <HowToImportLiContainer>
                    <div>
                      Die <EmSpan>object_id</EmSpan> muss eine gültige{' '}
                      <a
                        href="https://de.wikipedia.org/wiki/Universally_Unique_Identifier"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        UUID
                      </a>{' '}
                      sein
                    </div>
                  </HowToImportLiContainer>
                </li>
                <li>
                  <HowToImportLiContainer>
                    <div>
                      Die <EmSpan>object_id</EmSpan> muss die{' '}
                      <EmSpan>id</EmSpan> eines Objekts aus arteigenschaften.ch
                      sein (wird nicht getestet - scheitert aber beim Import)
                    </div>
                  </HowToImportLiContainer>
                </li>
              </ul>
              <p>Alle weiteren Felder sind Eigenschaften des Objekts.</p>
              <h4>Eigenschaften</h4>
              <ul>
                <li>
                  <HowToImportLiContainer>
                    <div>Es muss mindestens eine Eigenschaft vorkommen</div>
                  </HowToImportLiContainer>
                </li>
                <li>
                  Feld-Namen dürfen beinahe alles enthalten.<br />
                  Ausser diese Zeichen:
                  <ul>
                    <li>
                      <HowToImportLiContainer>
                        <div>"</div>
                      </HowToImportLiContainer>
                    </li>
                    <li>
                      <HowToImportLiContainer>
                        <div>\</div>
                      </HowToImportLiContainer>
                    </li>
                  </ul>
                </li>
              </ul>
            </HowToImportContainer>
            <DropzoneContainer>
              <Dropzone
                onDrop={(acceptedFiles, rejectedFiles) => {
                  console.log({ acceptedFiles, rejectedFiles })
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
                      console.log('data:', data)
                      // TODO: test the data
                      // missing key:
                      setExistsNoDataWithoutKey(
                        data.filter(d => !!d.__EMPTY).length === 0
                      )
                      const ids = data
                        .map(d => d.id)
                        .filter(d => d !== undefined)
                      const _idsExist = ids.length > 0
                      setIdsExist(_idsExist)
                      setIdsAreUuids(
                        _idsExist
                          ? !ids.map(d => isUuid.anyNonNil(d)).includes(false)
                          : undefined
                      )
                      setIdsAreUnique(ids.length === uniq(ids))
                      const objectIdNotAlwaysIncluded =
                        data.filter(d => !d.object_id).length > 0
                      console.log(
                        'objectIdNotAlwaysIncluded:',
                        objectIdNotAlwaysIncluded
                      )
                      const objectIdNotAlwaysUuid = data
                        .map(d => d.object_id)
                        .filter(d => d !== undefined)
                        .map(d => isUuid.anyNonNil(d))
                        .includes(false)
                      console.log(
                        'objectIdNotAlwaysUuid:',
                        objectIdNotAlwaysUuid
                      )
                      const propertyKeys = union(
                        flatten(
                          data.map(d =>
                            Object.keys(omit(d, ['id', 'object_id']))
                          )
                        )
                      )
                      const propertyKeysContainDisallowedChars = some(
                        propertyKeys,
                        k => k.includes('"') || k.includes('\\')
                      )
                      console.log(
                        'propertyKeysContainDisallowedChars:',
                        propertyKeysContainDisallowedChars
                      )
                    }
                    reader.onabort = () =>
                      console.log('file reading was aborted')
                    reader.onerror = () =>
                      console.log('file reading has failed')
                    reader.readAsBinaryString(file)
                  }
                }}
                accept=".xlsx, .xls, .csv, .ods, .dbf, .dif"
                disablePreview
                multiple={false}
              >
                {({
                  isDragActive,
                  isDragReject,
                  acceptedFiles,
                  rejectedFiles,
                }) => {
                  if (isDragActive)
                    return (
                      <DropzoneDivActive>Hier fallen lassen</DropzoneDivActive>
                    )
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
          </Fragment>
        )}
    </Container>
  )
}

export default enhance(PCO)
