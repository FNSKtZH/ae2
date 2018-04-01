// bekommt einen der existierenden Werte für Status bei Flora
// retourniert den einstelligen Code
// wird benötigt von EvAB
module.exports = function(status) {
  var codierteWerte = {
    'eigenständige Art aber im Index nicht enthalten': '?',
    'akzeptierter Name': 'A',
    'in anderem Taxon eingeschlossener Name': 'E',
    'in anderem Taxon eingeschlossener Name. Im Index nicht enthalten': 'f',
    Synonym: 'S',
    'zusammenfassender Name. Im Index nicht enthalten': 'y',
    'zusammenfassender Name': 'Z',
  }
  if (codierteWerte[status]) {
    return codierteWerte[status]
  }
  return null
}
