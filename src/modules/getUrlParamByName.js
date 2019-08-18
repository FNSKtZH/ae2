// @flow
/**
 * Source: https://stackoverflow.com/a/901144/712005
 * DANGER: used URLSearchParams before
 * but is not compatible with older browsers
 */
export default (name: string) => {
  name = name.replace(/[\[\]]/g, '\\$&') // eslint-disable-line no-useless-escape
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
  const results =
    typeof window !== 'undefined' ? regex.exec(window.location.href) : null
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}
