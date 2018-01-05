# [arteigenschaften.ch](http://arteigenschaften.ch), neu aufgebaut

[![js-standard-style](https://img.shields.io/badge/license-ISC-brightgreen.svg)](https://github.com/barbalex/gs/blob/master/license.md)

**Inhaltsverzeichnis**

- [Grundlage](#grundlage)
- [Projektziele](#projektziele)
- [Funktionale Ziele](#funktionale-ziele)
- [Diese Technologien werden verwendet](#diese-technologien-werden-verwendet)
- [Aktueller Stand](#aktueller-stand)
- [Was kann arteigenschaften.ch?](#was-kann-arteigenschaftench)

### Grundlage
...sind folgende Erkenntnisse:

-	Die Anwendung ist nützlich und es gibt bisher keine echte Alternative. Es ist daher davon auszugehen, dass sie noch ein paar Jahre benutzt wird
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

1. Jedes Objekt (Art oder Lebensraum) kann von beliebig vielen Taxonomien beschrieben werden. Ähnlich wie bisher schon jedes Objekt von beliebig vielen Eigenschaftensammlungen beschrieben werden kann. Das ermöglicht: 
   - Neue Versionen einer Taxonomie werden importiert, ohne die alte zu ersetzten. Wie bisher Eigenschaftensammlungen
   -	Alle Taxonomien bleiben langfristig erhalten
   -	Der Benutzer kann wählen, nach welcher Taxonomie der Strukturbaum aufgebaut wird
   -	Anwender oder Anwendungen (welche die Daten über Schnittstellen verwenden), werden durch den Import neuer Daten(-strukturen) nicht beeinträchtigt bzw. nicht gezwungen, ihre Anwendung anzupassen
   - Mögliche spätere Erweiterung: Import von Taxonomien über die Benutzeroberfläche, wie heute Eigenschaftensammlungen
2. Beziehungssammlungen werden in Eigenschaftensammlungen integriert: Es sind einfach Eigenschaftensammlungen mit Beziehungen
   - Ist einfacher zu verstehen
   - Beziehungen und Eigenschaften einer Sammlung werden am selben Ort angezeigt
   - Vereinfacht die Datenstruktur
   - Vereinfacht Exporte und Importe
3. Daten sind vor Veränderung geschützt. Organisationen erteilen ausgewählten Benutzern Bearbeitungs-Rechte.

### Diese Technologien werden verwendet:

- Als Datenbank [PostgreSQL](https://www.postgresql.org)
  - Benutzer können dank [JSON](https://de.wikipedia.org/wiki/JavaScript_Object_Notation) weiterhin eigene Datenstrukturen importieren
  - Alle übrigen Datenstrukturen sind relational und ermöglichen damit:
    - Einfachere Verwaltung,
    - Datenauswertung
    - und Gewährleistung der Datenintegrität
- [GraphQL](https://github.com/facebook/graphql) in Form von [PostGraphQL](https://github.com/postgraphql/postgraphql)
  - API-Server mit einer Zeile bauen und konfigurieren. Das sind _tausende_ weniger als bisher!
  - Weniger Code = weniger Fehler<br/>
  - Die Daten-Logik liegt in der Datenbank - wo sie hingehört<br/>
  - GraphQL ist die kommende API-Technologie. Verglichen mit REST ist GraphQL einfach zu verstehen, extrem leistungsfähig und flexibel. Somit steht ein aussergewöhnlich benutzerfreundlicher API-Server zur Verfügung, mit dem jedermann/-frau ganz nach ihren Bedürfnissen alle Daten (ausser Benutzer-Daten) aus arteigenschaften.ch abgreifen kann. Es ist sogar möglich - die entsprechenden Benutzerrechte vorausgesetzt - die Daten mit einer beliebigen anderen Software zu bearbeiten. Das ist jederzeit direkt möglich, ohne dass an arteigenschaften.ch irgendwelche Eingriffe nötig wären
- [hapi.js](http://hapijs.com) liefert (zumindest vorläufig noch) die Schnittstellen für [Artenlistentool](http://www.aln.zh.ch/internet/baudirektion/aln/de/naturschutz/naturschutzdaten/tools/artenlistentool.html#a-content), [EVAB](http://www.aln.zh.ch/internet/baudirektion/aln/de/naturschutz/naturschutzdaten/tools/evab.html#a-content) und [apflora.ch](https://github.com/FNSKtZH/apflora)
- [Apollo](https://www.apollodata.com). "React für Anwendungsdaten": Komponenten definieren, welche Daten sie brauchen. GraphQL und Apollo kümmern sich um die Bereitstellung
- Software-Abhängigkeiten werden mit [npm](https://www.npmjs.com) verwaltet
- Für die Konfiguration von Anwendung und Entwicklungsumgebung wird [create-react-app](https://github.com/facebookincubator/create-react-app) verwendet
  - Erzeugt für den produktiven App-Server statische Dateien, womit der App-Server einfacher aufzubauen und zu aktualisieren ist
  - Rasche Installation und einfache Aktualisierung der Enwicklungsumgebung und eines grossen Teils der für die Entwicklung benötigten Fremd-Software
  - [webpack](http://webpack.github.io) aktualisiert während der Entwicklung laufend die App im Browser - jede Änderung ist direkt sichtbar
- [ES6](http://www.ecma-international.org/ecma-262/6.0), [ES2016](https://www.ecma-international.org/ecma-262/7.0) und [ES2017](http://2ality.com/2016/02/ecmascript-2017.html), die neuen Versionen von [JavaScript](http://en.wikipedia.org/wiki/JavaScript), fördern lesbaren, kurzen Code
- [flow](https://flow.org) deckt Fehler auf, bevor der Code ausgeführt wird
- [prettier](https://github.com/prettier/prettier) formatiert den Code. Der Entwickler kann sich auf die Funktionalität konzentrieren
- [React](https://facebook.github.io/react/index.html)
  - Die Benutzeroberfläche ist eine Funktion der anwendungsseitigen Daten
  - Vereinfacht die Steuerung der Benutzeroberfläche
  - Die Benutzeroberfläche wird aus wiederverwertbaren und testbaren Komponenten aufgebaut

### Aktueller Stand

- [x] Datenstruktur:<br/>![Datenstruktur](/etc/structure_relational.png?raw=true "Datenstruktur")
- [x] [Projekt](https://github.com/barbalex/ae_import), um die Daten aus der bisherigen CouchDB in die neue PostgreSQL zu importieren<br/>![Import](/etc/import.png?raw=true "Import")
- [x] Anwendungs-API-Server ([PostGraphQL](https://github.com/postgraphql/postgraphql))<br/>![API-Server](/etc/postgraphql.png?raw=true "API-Server")
- [x] [API-Server für abhängige Anwendungen, welche nicht über GraphQL zugreifen](https://github.com/barbalex/ae_api) (braucht noch etwas Liebe)

Die neue Anwendung ist im Aufbau. Zieldatum für die Implementierung: Frühling 2018. Aktueller Stand:

  - [x] Entwicklungsumgebung<br/>![Entwicklungsumgebung](/etc/dev.png?raw=true "Entwicklungsumgebung")
  - [x] Layout und Navigation
    - neu kann die Grenze zwischen Strukturbaum und Objekt stufenlos verschoben werden
    ![Layout & Navigation](/etc/layout.png?raw=true "Layout & Navigation")
  - [x] Struktur- und Navigationsbaum
    - neu inklusive Gruppen, Taxonomien und Eigenschaftensammlungen
    ![Strukturbaum](/etc/strukturbaum.png?raw=true "Strukturbaum")
  - [x] Suche:
    - neu nach allen Gruppen und Taxonomien gleichzeitig
    - neu nach allen Hierarchiestufen (z.B. Ordnungen, Familien)
    - neu und gleichzeitig nach Eigenschaftensammlungen
    ![Datenstruktur](/etc/suche.png?raw=true "Suche")
  - [x] Arten und Lebensräume anzeigen:<br/>![Datenstruktur](/etc/grasfrosch.png?raw=true "Datenstruktur")
    - [x] inklusive Eigenschaften-Sammlungen und Beziehungen<br/>![Eigenschaftensammlung](/etc/eigenschaftensammlung.png?raw=true "Eigenschaftensammlung")
    - [x] inklusive Synonymen<br/>
    - [x] inklusive Eigenschaften und Beziehungen von Synonymen<br/>![Synonym](/etc/synonym.png?raw=true "Synonym")
  - [x] Daten exportieren
    ![exportieren](/etc/export.png?raw=true "exportieren")
  - [x] Anmeldung<br/>
    Nicht angemeldete Besucher können alle Taxonomien, Objekte, Eigenschaften-Sammlungen und Eigenschaften anzeigen, exportieren sowie über die API ([GraphQL](https://github.com/facebook/graphql)) direkt auf die Daten zugreifen.<br/>
    ![anmelden](/etc/anmeldung.png?raw=true "anmelden")<br/>
    Angemeldete Benutzer können Daten gemäss den ihnen von Organisationen erteilten Rollen verändern.
  - [x] Benutzer<br/>
    Benutzer können Name, Email und Passwort verändern.<br/>
    Sie sehen die ihnen erteilten Rollen:<br/>
    ![Benutzer-Rollen](/etc/user_rollen.png?raw=true "Benutzer-Rollen")
    ... die von ihnen importierten Taxonomien:<br/>
    ![Benutzer-Taxonomien](/etc/user_tax.png?raw=true "Benutzer-Taxonomien")
    ... und die von ihnen importierten Eigenschaften-Sammlungen:<br/>
    ![Benutzer-Eigenschaftensammlungen](/etc/user_pcs.png?raw=true "Benutzer-Eigenschaftensammlungen")
    Organisations-Administratoren können neue Benutzer erstellen:<br/>
    ![Neuen Benutzer erstellen](/etc/user_create_new.png?raw=true "Neuen Benutzer erstellen")<br/>
    ... bestehende löschen:<br/>
    ![Benutzer löschen](/etc/user_delete.png?raw=true "Benutzer löschen")<br/>
    ... und bei bestehenden Namen und Email ändern, nicht aber das Passwort:<br/>
    ![Benutzer ändern](/etc/user_from_admin.png?raw=true "Benutzer ändern")
  - [x] Organisationen<br/>
    Organisationen geben Benutzern für ihre Taxonomien und Eigenschaften-Sammlungen Rollen:
    ![Rollen verwalten](/etc/org_rollen.png?raw=true "Rollen verwalten")
    ...sehen, für welche Taxonomien sie zuständig sind: 
    ![Taxonomien](/etc/org_tax.png?raw=true "Taxonomien")
    ...sehen, für welche Eigenschaften-Sammlungen sie zuständig sind:
    ![Eigenschaften-Sammlungen](/etc/org_pcs.png?raw=true "Eigenschaften-Sammlungen")
  - [ ] Import von Eigenschaften- und Beziehungs-Sammlungen (in Arbeit)
  - [ ] Lebensräume bearbeiten

### Was kann arteigenschaften.ch?

Siehe [hier](https://github.com/FNSKtZH/artendb_v1/blob/master/README.md).
