# [arteigenschaften.ch](http://arteigenschaften.ch), neu aufgebaut

[![js-standard-style](https://img.shields.io/badge/license-ISC-brightgreen.svg)](https://github.com/barbalex/gs/blob/master/license.md)

### Grundlage
...sind folgende Erkenntnisse:

-	Die Anwendung ist nützlich und es gibt bisher keine echte Alternative. Es ist daher davon auszugehen, dass sie noch ein paar Jahre weiterverwendet wird
-	Es gibt einige aktuelle Erweiterungs-Wünsche. Das dürften nicht die letzten sein
-	Anpassungen an der aktuellen Anwendung sind anspruchsvoll und Nebenwirkungen schwierig zu vermeiden
-	Web- und Datenbanktechnologie entwickeln sich rasant weiter. Daher stehen heute viel [besser geeignete Mittel](#diese-technologien-werden-verwendet) zur Verfügung, um eine solche Anwendung aufzubauen

### Projektziele:
-	Hauptziel: Unterhaltbarkeit verbessern und künftige Erweiterungen ermöglichen
-	Abhängigkeit von wenig verbreiteten Technologien verringern
-	Aufwand für und Risiken bei künftigem Unterhalt und Erweiterungen verringern
-	Verwaltung der Daten vereinfachen
-	Datenintegrität besser gewährleisten

### Funktionale Ziele:
Jedes Objekt (Art oder Lebensraum) kann von beliebig vielen Taxonomien beschrieben werden. Ähnlich wie bisher schon jedes Objekt von beliebig vielen Eigenschaften- und Beziehungssammlungen beschrieben werden kann. Das ermöglicht folgende Features:
-	Neue Versionen einer Taxonomie werden importiert, ohne die alte zu ersetzten. Wie bisher Eigenschaften- und Beziehungssammlungen
-	Damit bleiben alle Daten langfristig erhalten
-	Anwender oder Anwendungen (welche die Daten über Schnittstellen verwenden), werden durch den Import neuer Daten(-strukturen) nicht beeinträchtigt bzw. nicht gezwungen, ihre Anwendung anzupassen
-	Mögliche spätere Erweiterung: Import von Taxonomien über die Benutzeroberfläche, wie heute bei Eigenschaften- und Beziehungssammlungen
-	Mögliche spätere Erweiterung: Der Benutzer kann wählen, nach welcher Taxonomie der Strukturbaum aufgebaut wird

Daten sind vor Veränderung geschützt. Organisationen erteilen ausgewählten Benutzern Bearbeitungs-Rechte.


### Diese Technologien werden verwendet:

- Als Datenbank [PostgreSQL](https://www.postgresql.org)
  - Benutzer können wo nötig dank [JSON](https://de.wikipedia.org/wiki/JavaScript_Object_Notation) weiterhin eigene Datenstrukturen importieren
  - Alle übrigen Datenstrukturen sind relational und ermöglichen damit:
     - Einfachere Verwaltung
     - Einfachere Datenauswertung
     - Bessere Gewährleistung der Datenintegrität
- [GraphQl](https://github.com/facebook/graphql) in Form von [postgraphql](https://github.com/postgraphql/postgraphql) und [Relay](https://facebook.github.io/relay)
  - API-Server mit einer Zeile bauen und konfigurieren. Das sind _tausende_ weniger als bisher!!!
  - Weniger Code = weniger Fehler :-)
  - Die Daten-Logik liegt in der Datenbank - wo sie hingehört
  - "React für die Anwendungsdaten": Komponenten definieren, welche Daten sie brauchen. GraphQl und Relay kümmern sich um die Bereitstellung
- [hapi.js](http://hapijs.com) liefert (weiterhin) die Schnittstellen für [Artenlistentool](http://www.aln.zh.ch/internet/baudirektion/aln/de/naturschutz/naturschutzdaten/tools/artenlistentool.html#a-content) und [EVAB](http://www.aln.zh.ch/internet/baudirektion/aln/de/naturschutz/naturschutzdaten/tools/evab.html#a-content)
- [MobX](https://mobx.js.org)
  - Vereinfacht die Architektur der anwendungs-seitigen Daten (soweit das nicht von Relay übernommen wird)
  - Ermöglicht es, abgeleitete Daten wie in Excel-Formeln zu berechnen und dauernd aktuell zu halten
- Software-Abhängigkeiten werden mit [npm](https://www.npmjs.com) verwaltet
- Für die Konfiguration von Anwendung und Entwicklungsumgebung wird [create-react-app](https://github.com/facebookincubator/create-react-app) verwendet
  - Erzeugt für den produktiven App-Server statische Dateien, womit der App-Server einfacher aufzubauen und zu aktualisieren ist
  - Rasche Installation und einfache Aktualisierung der Enwicklungsumgebung und eines grossen Teils der für die Entwicklung benötigten Fremd-Software
- [ES6](http://www.ecma-international.org/ecma-262/6.0) und [ES2016](https://www.ecma-international.org/ecma-262/7.0), die neuen Versionen von [JavaScript](http://en.wikipedia.org/wiki/JavaScript) fördern lesbaren, kurzen Code
- [flow](https://flow.org) deckt Fehler auf, bevor der Code ausgeführt wird!
- [prettier](https://github.com/prettier/prettier) formatiert den Code. Der Entwickler muss sich nicht um Stil kümmern. Er kann sich auf die Funktionalität konzentrieren. Das beschleunigt die Entwicklung und reduziert Fehler
- [webpack](http://webpack.github.io) aktualisiert während der Entwicklung laufend die App im Browser - jede Änderung ist direkt sichtbar
- [React](https://facebook.github.io/react/index.html)
  - Die Benutzeroberfläche ist eine Funktion der anwendungs-seitigen Daten
  - Vereinfacht die Steuerung der Benutzeroberfläche
  - Die Benutzeroberfläche wird aus wiederverwertbaren und testbaren Komponenten aufgebaut

### Aktueller Stand

- Es besteht [ein Projekt](https://github.com/barbalex/ae_import), um die Daten aus der bisherigen CouchDB in die neue PostgreSQL zu importieren
- Der Anwendungs-API-Server ist bereit ([postgraphql](https://github.com/postgraphql/postgraphql))
- Der API-Server für abhängige Anwendungen [existiert im Entwurf](https://github.com/barbalex/ae_api)
- Die neue Anwendung ist im Aufbau. Zieldatum für die Implementierung: Beginn 2018. Momentan existiert:
  - Entwicklungsumgebung
  - Layout und Navigation (Entwurf)
  - Der Struktur- und Navigationsbaum ist im Aufbau
