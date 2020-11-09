const typeTranslator = {
  String: 'Text',
  Integer: 'Ganzzahl',
  Number: 'Zahl',
  Boolean: 'ja/nein',
  Array: 'Liste von Werten',
}

const readableType = (type) =>
  typeTranslator[type] ? typeTranslator[type] : type

export default readableType
