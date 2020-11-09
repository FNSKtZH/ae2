const booleanToJaNein = (val) =>
  val.toString().replace('true', 'ja').replace('false', 'nein')

export default booleanToJaNein
