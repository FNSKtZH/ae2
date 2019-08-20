export default () => {
  const pathName =
    typeof window !== 'undefined'
      ? window.location.pathname.replace('/', '')
      : ''
  let pathElements = pathName.split('/')
  if (pathElements[0] === '') {
    // get rid of empty element(s) at start
    pathElements.shift()
  }
  // decode elements
  pathElements = pathElements.map(e => decodeURIComponent(e))
  // convert numbers to numbers
  //stackoverflow.com/questions/175739/is-there-a-built-in-way-in-javascript-to-check-if-a-string-is-a-valid-number
  pathElements.forEach((e, index) => {
    if (!isNaN(e)) {
      pathElements[index] = +e
    }
  })
  return pathElements
}
