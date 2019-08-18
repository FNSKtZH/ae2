export default val =>
  val
    .toString()
    .replace('true', 'ja')
    .replace('false', 'nein')
