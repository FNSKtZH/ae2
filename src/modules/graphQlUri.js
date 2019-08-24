export default () => {
  const hostnameWithoutWww =
    typeof window !== 'undefined'
      ? window.location.hostname.replace('www.', '')
      : ''
  const isLocalhost = hostnameWithoutWww === 'localhost'
  if (isLocalhost) return 'http://localhost:5000/graphql'

  const isArteigenschaften = hostnameWithoutWww.includes('arteigenschaften')
  return isArteigenschaften
    ? 'https://api.arteigenschaften.ch/graphql'
    : 'https://api.artdaten.ch/graphql'
}
