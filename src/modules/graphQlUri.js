export default () => {
  const hostnameWithoutWww =
    typeof window !== 'undefined'
      ? window.location.hostname.replace('www.', '')
      : ''
  const isLocalhost = hostnameWithoutWww === 'localhost'
  if (isLocalhost) return 'http://localhost:5000/graphql'

  return `https://graphql.${hostnameWithoutWww}/graphql`
}
