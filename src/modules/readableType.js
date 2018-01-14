// @flow

const typeTranslator = {
  String: 'Text',
  Integer: 'Ganzzahl',
  number: 'Zahl',
  boolean: 'ja/nein',
}

export default (type: string) => {
  console.log('type:', type)
  return typeTranslator[type] ? typeTranslator[type] : type
}
