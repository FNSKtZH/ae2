// @flow
export default () => {
  const hostnameWithoutWww =
    typeof window !== 'undefined'
      ? window.location.hostname.replace('www.', '')
      : ''
  const isLocalhost = hostnameWithoutWww === 'localhost'
  return isLocalhost
    ? 'http://localhost:5000/graphql'
    : `https://${
        typeof window !== 'undefined' ? window.location.hostname : ''
      }/graphql`
}
