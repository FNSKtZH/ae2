# [arteigenschaften.ch](http://arteigenschaften.ch), neu aufgebaut

[![js-standard-style](https://img.shields.io/badge/license-ISC-brightgreen.svg)](https://github.com/barbalex/gs/blob/master/license.md)

### Grundlage
...sind folgende Erkenntnisse:

-	Die Anwendung ist nützlich und es gibt bisher keine echte Alternative. Es ist daher davon auszugehen, dass sie noch ein paar Jahre weiterverwendet wird
-	Es gibt einige aktuelle Erweiterungs-Wünsche. Das dürften nicht die letzten sein
-	Anpassungen an der aktuellen Anwendung sind anspruchsvoll und Nebenwirkungen schwierig zu vermeiden
-	Web- und Datenbanktechnologie entwickeln sich rasant weiter. Daher stehen heute viel besser geeignete Mittel zur Verfügung, um eine solche Anwendung aufzubauen

### Projektziele:
-	Hauptziel: Unterhaltbarkeit verbessern und künftige Erweiterungen ermöglichen
-	Abhängigkeit von wenig verbreiteten Technologien verringern
-	Aufwand für und Risiken bei künftigem Unterhalt und Erweiterungen verringern
-	Verwaltung der Daten vereinfachen
-	Datenintegrität besser gewährleisten

### Funktionale Ziele:
Jedes Objekt (Art oder Lebensraum) kann von beliebig vielen Taxonomien beschrieben werden, ähnlich wie bisher schon bei den Eigenschaften- und Beziehungssammlungen. Das ermöglicht folgende Features:
-	Jede neue Version einer Taxonomie kann importiert werden, ohne dass die alte ersetzt werden muss (wie bisher Eigenschaften- und Beziehungssammlungen)
-	Damit bleiben alle Daten langfristig erhalten
-	Anwender oder Anwendungen (welche die Daten über Schnittstellen verwenden), werden durch den Import neuer Daten(-strukturen) nicht beeinträchtigt bzw. nicht gezwungen, ihre Anwendung anzupassen
-	Mögliche spätere Erweiterung: Import von Taxonomien über die Benutzeroberfläche, wie heute bei Eigenschaften- und Beziehungssammlungen
-	Mögliche spätere Erweiterung: Der Benutzer kann wählen, nach welcher Taxonomie der Strukturbaum aufgebaut wird

Daten werden vor Veränderung geschützt. Ihre Anpassung wird durch Organisationen gesteuert, welche Benutzern entsprechende Rechte erteilen.


### Diese Technologien werden verwendet:

- Als Datenbank [PostgreSQL](https://www.postgresql.org)
  - die dynamische Datenstruktur, welche mit Hilfe von [JSON](https://de.wikipedia.org/wiki/JavaScript_Object_Notation) den Benutzern ermöglicht, eigene Datenstrukturen zu importieren, bleibt erhalten - genau dort wo nötig
  - alle übrigen Datenstrukturen sind relational und ermöglichen damit:
     - einfachere Verwaltung
     - einfachere Datenauswertung
     - bessere Gewährleistung der Datenintegrität
- Alle Abhängigkeiten werden mit [npm](https://www.npmjs.com) verwaltet
  - einfache Aktualisierung
  - zuverlässige Verwaltung benutzter Fremd-Software
  - einfache Aktualisierung der Server nach Anpassungen
- Für die Konfiguration von Anwendung und Entwicklungsumgebung wird [create-react-app](https://github.com/facebookincubator/create-react-app) verwendet
  - erzeugt für den produktiven App-Server statische Dateien, womit der App-Server einfacher aufzubauen und zu aktualisieren ist
  - rasche Installation und einfache Aktualisierung der Enwicklungsumgebung und eines grossen Teils der für die Entwicklung benötigten Fremd-Software
- [ES6](https://github.com/lukehoban/es6features), die neue Version von [JavaScript](http://en.wikipedia.org/wiki/JavaScript)
  - fördert lesbaren, kurzen Code
- [flow](https://flow.org):
  - Fehler im Code finden, noch bevor er ausgeführt wird!
  - Bestehende Fehler finden, bevor sie von Benutzern gemeldet werden
- [prettier](https://github.com/prettier/prettier)
  - erzwingt einen konsequenten und lesbaren Programmierstil
  - der Entwickler muss sich nicht um Stil kümmern, d.h. er kann sich auf die Funktionalität konzentrieren. Das beschleunigt die Entwicklung und reduziert Fehler
- [webpack](http://webpack.github.io) aktualisiert während der Entwicklung laufend die App im Browser
  - jede Änderung ist direkt sichtbar
  - raschere Enwicklung, weniger Fehler
- [Flux](http://facebook.github.io/flux) in Form von [MobX](https://mobx.js.org/)
  - vereinfacht die Architektur der anwendungs-seitigen Daten
  - ermöglicht es, abgeleitete Daten wie in Excel-Formeln zu berechnen und dauernd aktuell zu halten
- [React](https://facebook.github.io/react/index.html)
  - Die Benutzeroberfläche ist eine Funktion der anwendungs-seitigen Daten
  - vereinfacht die Steuerung der Benutzeroberfläche
  - Die Benutzeroberfläche wird aus wiederverwertbaren und testbaren Komponenten aufgebaut
- [hapi.js](http://hapijs.com) liefert Applikation und API bzw. Daten

### Aktueller Stand

- Es besteht [ein Projekt](https://github.com/barbalex/ae_import), mit dem die Daten aus der bisherigen CouchDB in die neue PostgreSQL importiert werden können
- Es gibt [ein Projekt](https://github.com/barbalex/ae_api) für die künftige API, inklusive Strukturdiagramm der Datenbank
- Die neue Anwendung ist im Aufbau, Ziel: Beginn 2017
