// @flow

const typeTranslator = {
  String: 'Text',
  Integer: 'Ganzzahl',
  Number: 'Zahl',
  Boolean: 'ja/nein',
  Array: 'Liste von Werten',
}

export default (type: string) =>
  typeTranslator[type] ? typeTranslator[type] : type
