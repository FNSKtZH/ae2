// @flow
// in development should return local path

const hostnameWithoutWww =
  typeof window !== 'undefined'
    ? window.location.hostname.replace('www.', '')
    : ''
const isLocalhost = hostnameWithoutWww === 'localhost'
const hostname = isLocalhost
  ? 'localhost'
  : typeof window !== 'undefined'
  ? window.location.hostname
  : ''
const appHost = isLocalhost
  ? `http://${hostname}:3000/`
  : `https://${hostname}/`

export default appHost
