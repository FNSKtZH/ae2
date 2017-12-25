// @flow

export default (val: Boolean) =>
  val
    .toString()
    .replace('true', 'ja')
    .replace('false', 'nein')
