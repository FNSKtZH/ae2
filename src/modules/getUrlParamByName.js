// @flow
/**
 * Source: https://stackoverflow.com/a/901144/712005
 * DANGER: used URLSearchParams before
 * but is not compatible with older browsers
 */
export default (name: string) => {
  name = name.replace(/[\[\]]/g, '\\$&') // eslint-disable-line no-useless-escape
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(window.location.href)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}
