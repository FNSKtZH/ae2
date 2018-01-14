// @flow

const typeTranslator = {
  string: 'Text',
  number: 'Zahl',
  boolean: 'ja/nein',
}

export default (type: string) =>
  typeTranslator[type] ? typeTranslator[type] : type
