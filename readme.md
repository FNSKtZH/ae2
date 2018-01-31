# [arteigenschaften.ch](http://arteigenschaften.ch), neu aufgebaut

[![js-standard-style](https://img.shields.io/badge/license-ISC-brightgreen.svg)](https://github.com/barbalex/gs/blob/master/license.md)

<a name="top"></a>

**Inhaltsverzeichnis**
- [Was ist arteigenschaften.ch?](#was-ist-arteigenschaftench)
  - [Ziele](#ziele)
  - [Fachliches Konzept](#fachliches-konzept)
  - [Open source](#open-source)
- [Neu-Aufbau 2017/2018](#neu-aufbau-20172018)
  - [Grundlage](#grundlage)
  - [Projektziele](#projektziele)
  - [Funktionale Ziele](#funktionale-ziele)
  - [Diese Technologien werden verwendet](#diese-technologien-werden-verwendet)
  - [Aktueller Stand](#aktueller-stand)

# Was ist arteigenschaften.ch?

## Ziele
### Ausgangspunkt
...sind Erfahrungen, welche in der Fachstelle Naturschutz mit früheren Datenbanken gemacht wurden:

- Bezieht man Daten aus anderen Quellen, ist es schwierig, sie vollständig, fehlerfrei und aktuell zu (er-)halten
- Entscheidend für die Aktualität der Datenbank ist es, die Informationen einfach und mit geringem Aufwand importieren und danach direkt nutzen zu können
- Art- und Lebensraumeigenschaften interessieren nicht nur die Fachstelle Naturschutz des Kantons Zürich. Ideal wäre eine von allen in diesem Bereich tätigen Stellen gemeinsam nachgeführte Datenbank. Oder realistischer: Ein Ort, an dem frei zugängliche Daten mit wenig Aufwand vereint werden können

### Was zeichnet arteigenschaften.ch aus?
Die wichtigsten Merkmale dürften sein:

- Die verwendeten Begriffe und Datenstrukturen sind auf Eigenschaften von Arten und Lebensräumen zugeschnitten
- Daten können einfach und rasch importiert werden...
- ...weshalb prinzipiell alle beteiligten Stellen ihre Daten an einem Ort und in einem gemeinsamen Format anbieten könnten. Das mag etwas naiv und utopisch sein. Zumindest aber kann man innert Minuten anderswo verfügbare Daten in arteigenschaften.ch vereinen und in Auswertungen mit anderen Daten kombinieren
- Daten können beim Export für anschliessende Auswertungen einfach und rasch kombiniert werden

### Wozu wird arteigenschaften.ch benutzt?
##### Nachschlagen
Man kann arteigenschaften.ch benutzen, um Informationen nachzuschlagen. Das dürfte sogar der häufigste Anwendungszweck sein. Die Darstellung ist aber eingeschränkt, da die Benutzeroberfläche dynamisch aus flexiblen Datenstrukturen generiert wird und arteigenschaften.ch keine Bilder enthält. Anwendungen mit statischer Datenstruktur können Informationen benutzerfreundlicher darstellen.

Hilfreich könnte allerdings sein, wenn der einfache Import (wie erhofft) dazu führen sollte, dass arteigenschaften.ch besonders umfassende und aktuelle Informationen enthält.

##### Auswerten
arteigenschaften.ch wurde entwickelt, um mit Hilfe der darin enthaltenen Daten Auswertungen durchzuführen. Meist in Kombination mit Artbeobachtungen oder Lebensraumkartierungen. Beispiele:

- In einer Liste von Artbeobachtungen die wertvollsten Arten identifizieren, z.B. mithilfe des Artwerts, der nationalen Priorität oder des Rote-Liste-Status
- Aus Vegetationsaufnahmen Zeigerwerte berechnen
- In Zeitreihen Veränderungen von ausgewählten Parametern darstellen (z.B. Artwerte, Rote-Liste-Arten, Spätblüher, Magerkeitszeiger, störungsempfindliche Arten...)
- Für eine Region, Lebensraum, Förderprogramm oder Massnahme geeignete/prioritäre Arten bestimmen
- Aus Kartierungen und/oder physikalischen Modellen für bestimmte Arten/Förderprogramme prioritäre Flächen identifizieren
- Modellieren, z.B. den Einfluss der Klimaerwärmung auf Arten und Schutzprioritäten

Besonders geeignet ist arteigenschaften.ch, wenn in einem Projekt eigene Art- oder Lebensraumeigenschaften erhoben und mit anderen für die Auswertung kombiniert werden sollen.

##### Daten für andere Anwendung abholen
Andere Anwendungen können Daten aus arteigenschaften.ch direkt abholen und nutzen. Mehr Infos [hier](#diese-technologien-werden-verwendet).

##### Nutzungsbedingungen
arteigenschaften.ch ist ein Werkzeug der Fachstelle Naturschutz des Kantons Zürich (FNS). arteigenschaften.ch steht frei zur Verfügung. Möchten Sie Daten importieren, wenden Sie sich bitte an [Andreas Lienhard](mailto:andreas.lienhard@bd.zh.ch). Die FNS behält sich vor, mit DatenimporteurInnen die optimale Integration ihrer Daten in arteigenschaften.ch zu besprechen und allenfalls Einfluss darauf zu nehmen. Es können nur Daten akzeptiert werden, deren Eigner mit der Veröffentlichung einverstanden sind.

arteigenschaften.ch ist [open source](#open-source). Es steht allen frei, die Anwendung zu kopieren und selber zu betreiben, ohne allfälligen Einfluss der FNS oder mit Daten, die man nicht veröffentlichen will.

### Das Zielpublikum
...befasst sich mit Arten und Lebensräumen. Es arbeitet primär in den Sachbereichen Naturschutz, Jagd und Fischerei, Gewässer, Wald, Landwirtschaft und Problemarten. Angesprochen sein dürften Fachstellen bei Bund, Kantonen, Gemeinden, Forschungseinrichtungen und freischaffende Fachleute bzw. Ökobüros.

### Ziele für die Benutzerin

- Die Anwendung ist einfach zu bedienen,
- die Datenflut überschaubar,
- möglichst selbsterklärend,
- gut verfügbar:
  - von jedem Gerät im Internet
  - als Export in den Formaten <a href="http://de.wikipedia.org/wiki/CSV_(Dateiformat)">csv</a> und Excel
  - über die API für GIS, [Artenlistentool](http://www.aln.zh.ch/internet/baudirektion/aln/de/naturschutz/naturschutzdaten/tools/artenlistentool.html#a-content), [EvAB](http://www.aln.zh.ch/internet/baudirektion/aln/de/naturschutz/naturschutzdaten/tools/evab.html#a-content), [EvAB mobile](https://github.com/barbalex/EvabMobile), beliebige Applikationen<br>
    (da die API mit [GraphQL](https://github.com/facebook/graphql) aufgebaut ist, kann jede Applikation ohne Rückfrage mit der FNS flexibel auf die Daten zugreifen. Rückfragen bzw. entsprechende Benutzer-Rechte sind nur nötig, um Daten von externen Applikationen aus zu verändern)
- und kann über alle Artengruppen hinweg exportiert werden

### Ziele für Datenpfleger und Systemverantwortliche

- Daten können in wenigen Minuten importiert werden.<br>Es werden keine besonderen technischen Fähigkeiten vorausgesetzt
- Die Datenstruktur ist bereits in den Rohdaten sichtbar und verständlich
- Der Code ist offen und dokumentiert. Nutzer können eigene Erweiterungen entwickeln (lassen) und/oder arteigenschaften.ch gemeinsam weiter entwickeln

<a href="#top">&#8593; top</a>

## Fachliches Konzept
### Der Grundgedanke
Die bisherige Access-Datenbank ist über zehn Jahre gewachsen. Nach und nach entstand ein komplexes Instrument. Es ist schwer zu verstehen und zu unterhalten und stösst an diverse technische Grenzen.

Ist etwas schwer verständlich, passieren Fehler. Wird es nicht verstanden, nützt es (früher oder später) nichts.

Der Grundgedanke hinter arteigenschaften.ch ist daher: Komplexität minimieren. Es gibt ein paar (nachfolgend erklärte) Grundbegriffe. Daraus leiten sich lediglich drei Grundstrukturen ab: Objekte, ihre Eigenschaften- und Beziehungssammlungen.

### Taxonomien
[Taxonomien](http://de.wikipedia.org/wiki/Taxonomie) klassifizieren <a href="http://de.wikipedia.org/wiki/Objekt_(Programmierung)">Objekte</a> (in arteigenschaften.ch: Arten und Lebensräume) mit einer [Hierarchie](http://de.wikipedia.org/wiki/Hierarchie). Darauf bauen alle Eigenschaftensammlungen, Beziehungssammlungen und deren [Eigenschaften](http://de.wikipedia.org/wiki/Eigenschaft) auf. Die Entwicklung von Taxonomien und der Umgang mit unterschiedlichen und sich laufend verändernden Taxonomien sind höchst anspruchsvoll.

Andere geläufige Begriffe: Nomenklatur, Index, Flora, Kartierschlüssel, Lebensraumschlüssel.

Beispiele: Indizes der nationalen Artdatenzentren, "Flora der Schweiz (Ausgabe 2012)", "Lebensraumkartierung Neeracher Riet 2009", "Flora Europaea (Ellenberg, 1991)".

Die Benutzerin soll die Arten wahlweise nach allen in den Daten enthaltenen Taxonomien darstellen können (noch nicht realisiert). Im Standard wird bei Arten die Hierarchie der vom zuständigen nationalen Zentrum verwendeten Taxonomie angezeigt.

Im Idealfall enthielte die aktuell vom nationalen Zentrum verwendete Taxonomie nur "offizielle" Arten und z.B. keine Synonyme. Stattdessen würden Beziehungen zwischen offiziellen Arten und Arten anderer Taxonomien beschrieben. Da die Daten von den nationalen Zentren unseres Wissens (noch?) nicht so erhältlich sind, ist das in arteigenschaften.ch nicht realisiert aber im Design vorgesehen und bei Vorliegen entsprechender Daten direkt umsetzbar.

### Objekte
<a href="http://de.wikipedia.org/wiki/Objekt_(Programmierung)">Objekte</a> bilden die Grundeinheit der Taxonomie. In arteigenschaften.ch sind das Arten oder Lebensräume. Letztere Begriffe werden in der Benutzeroberfläche verwendet. "Objekte" ist eher von technischer und konzeptioneller Bedeutung.

### Gruppen
Arten werden in Gruppen eingeteilt: Fauna, Flora, Moose und Pilze. Die nationalen Artdatenzentren sind so organisiert. Es hat sich eingebürgert und bewährt. Lebensräume bilden eine eigene Gruppe.

### Eigenschaftensammlungen
Systematische Informationen über Arten kommen in ganzen Eigenschaftensammlungen, z.B. „Flora Indicativa 2010“. Solche Eigenschaftensammlungen haben gemeinsame Eigenschaften wie z.B.:

- Dieselbe Herkunft (Autoren, Publikation, Publikationsdatum)
- Denselben Zweck: Die Eigenschaftensammlung wurde in der Regel für einen bestimmten Zweck erarbeitet. Für das Verständnis der Daten kann diese Information sehr hilfreich sein
- Bezug auf eine bestimmte Taxonomie
- Meist eine bestimmte Artgruppe (z.B. Flora, Fauna, Schmetterlinge…)
- Innerhalb der Artgruppe eine definierte Auswahl bearbeiteter Arten
- Definierte Methodik und Auswahl erfasster Informationen

Statt "Eigenschaftensammlung" könnte auch der Begriff "Publikation" verwendet werden. Damit würde klar:

- Dass arteigenschaften.ch an Eigenschaftensammlungen minimale Qualitätsansprüche stellt. Es muss nicht eine prominent publizierte wissenschaftliche Publikation sein aber die fachliche Qualität sollte dem definierten Zweck entsprechen
- Dass eine aktualisierte Version einer bestehenden Eigenschaftensammlung in der Regel als neue Eigenschaftensammlung zu behandeln ist

Eigenschaftensammlungen sollten nur durch die Autoren nachgeführt werden (nicht zu verwechseln mit: importiert).

Um Arten- und Lebensraumeigenschaften verstehen und verwalten zu können, ist es wichtig, Eigenschaftensammlungen als wesentlichen Teil der Struktur zu behandeln. In arteigenschaften.ch sind sie Eigenschaften der Objekte. Sie erleichtern dem Benutzer, die Übersicht über die riesige Menge von Eigenschaften zu gewinnen.

arteigenschaften.ch kann auch Eigenschaftensammlungen von synonymen Objekten anzeigen und exportieren.

In fast allen Fällen ist es sinnvoll, Eigenschaften und Beziehungen pro Eigenschaftensammlung darzustellen. Z.B. bei der Anzeige in der Anwendung oder wenn Daten für Exporte ausgewählt werden.

### Zusammenfassende Eigenschaftensammlungen
Für bestimmte Zwecke ist zusätzlich das Gegenteil interessant: Daten aus verschiedenen Eigenschaftensammlungen zusammenfassen. Z.B. wenn man über alle Artengruppen den aktuellsten Rote-Liste-Status darstellen will. Er steckt in diversen Eigenschaftensammlungen, da er häufig pro Artengruppe separat publiziert wird.

Das geht so:

- In den jeweiligen Objekten wird eine zusätzliche Eigenschaftensammlung mit Eigenschaft "zusammenfassend" geschaffen
- Die entsprechenden Daten werden zwei mal importiert:
 - Ein mal in die Ursprungs-Eigenschaftensammlung
 - Ein mal in die zusammenfassende
- Die zusammenfassende Eigenschaftensammlung kann genau gleich wie alle anderen Eigenschaftensammlungen in der Anwendung angezeigt, exportiert oder über eine Schnittstelle angezapft werden

Beispiel: Für Heuschrecken wird eine neue Rote Liste publiziert:

- Es wird eine neue Eigenschaftensammlung geschaffen, z.B. "BAFU (2012): Rote Liste der Heuschrecken", und die Eigenschaften importiert
- Die alte Eigenschaftensammlung bleibt bestehen, z.B. "BUWAL (1985): Rote Liste der Heuschrecken"
- Die Eigenschaften werden nochmals in die zusammenfassende Eigenschaftensammlung "Rote Listen (aktuell)" importiert. Dabei werden bisherige Rote-Listen-Angaben der entsprechenden Heuschrecken überschrieben
- Falls einige 1985 beschriebene Arten 2012 nicht mehr beschrieben wurden, bleibt der Rote-Liste-Status von 1985 erhalten. Um dies kenntlich zu machen, soll in der zusammenfassenden Eigenschaftensammlung in einem zusätzlichen Feld immer der Name der Ursprungs-Eigenschaftensammlung mitgeliefert werden

### Art- und Lebensraumeigenschaften
...beschreiben einzelne Objekte. Beispiele: Artwert, Rote-Liste-Status, nationale Priorität.

### Beziehungssammlungen
Beziehungen beschreiben das Verhältnis zwischen zwei oder mehr Objekten. Beispiele: Bindung von Arten an Biotope, Frasspflanzen von Insekten, Wirte von Parasiten, Beutespektrum von Räubern. Aber auch taxonomische Beziehungen wie "synonym". Die eine Beziehung beschreibenden Attribute sind spezielle Art- und Lebensraumeigenschaften und wie diese (oft gemeinsam mit ihnen) Teil von Eigenschaftensammlungen. Sammlungen von Beziehungen werden in Analogie zu Eigenschaftensammlungen "Beziehungssammlungen" genannt. Sie sind Spezialfälle von Eigenschaftensammlungen und werden separat behandelt, weil sie eine leicht abweichende Datenstruktur erfordern.

### Gruppen vereinen
In der bisherigen, relationalen Datenbank werden die Gruppen (Flora, Fauna, Moose, Pilze, Lebensräume) in unterschiedlichen Tabellen verwaltet. Das erhöht die Komplexität der Anwendung und erschwert jede Auswertung enorm. Beispielweise müssen alle Beziehungen zu anderen Arten oder Lebensräumen für jede Gruppe separat verwaltet werden, d.h. bis zu 10-fach. Und in Auswertungen mittels Union-Abfragen wieder zusammengeführt werden.

Zumindest in Access kann das aber nicht mehr geändert werden, weil z.B. in der Floratabelle die maximale Anzahl möglicher Indizes (32) erreicht ist und jede Beziehung einen Index voraussetzt. Die (schlechte) Variante, alle Informationen in einer einzigen Riesentabelle zu vereinigen, scheitert wiederum an der maximalen Anzahl Felder (255) und an der maximalen Datenmenge pro Datensatz (2KB).

### Daten decodieren
Traditionell werden Daten häufig codiert erfasst. Bis 2012 waren auch viele Daten in der bisherigen arteigenschaften.ch codiert. Die entsprechenden Felder enthielten für Menschen unverständliche Codes. Sie wurden in einer Codierungstabelle aufgelöst. Damit die Daten verständlich dargestellt werden konnten, mussten sie für Darstellung und Export decodiert werden. Dieses System ist sehr kompliziert und leistungshungrig. Die Rohdaten sind für Menschen nicht mehr lesbar. Deshalb sind codierte Informationen zu vermeiden.

### Eigenschaftensammlungen aktualisieren
Wie soll eine bestehende Eigenschaftensammlung aktualisiert werden? Zu bedenken sind u.a.:

- Müssen frühere Auswertungen nachvollzogen bzw. wiederholt werden können? Wenn ja, sollten frühere Datenstände (=Eigenschaftensammlungen) unverändert erhalten bleiben
- Wird eine Eigenschaftensammlung periodisch teilweise aktualisiert (im Gegensatz zu vollständig)? Und soll ersichtlich sein, welche Eigenschaften welchen Datenstand haben?

Wenn eine von beiden obigen Fragen mit ja beantwortet wurde, kann z.B. folgendermassen vorgegangen werden:

- Neue Daten als neue Eigenschaftensammlung erfassen. Z.B. "ZH Artwert (2013)", wobei es schon "ZH Artwert (aktuell)" gibt und ev. weitere
- Für die Auswertung unter Einbezug aller Artwerte eine zusammenfassende Eigenschaftensammlung schaffen, z.B. "ZH Artwert (aktuell)"

<a href="#top">&#8593; top</a>

**Ideen für die Zukunft**
- Listen von Beobachtungen/Lebensräumen mit Eigenschaften verknüpfen:
  - Benutzerin lädt eine Tabelle mit ihren Beobachtungen oder Lebensräumen (wie bei Importen)
  - Sie wählt, mit welcher ID diese Daten mit Eigenschaften verknüpft werden sollen (wie bei Importen)
  - Anwendung meldet, wie erfolgreich die Verknüpfung ist (wie bei Importen)
  - Benutzer wählt Eigenschaften (wie bei Exporten)
  - Benutzer lädt Ergebnis herunter (wie bei Exporten)

<a href="#top">&#8593; top</a>

<a name="OpenSource"></a>
## Open source
Die für die Anwendung verwendete [Lizenz](https://github.com/FNSKtZH/artendb/blob/master/License.md) ist sehr freizügig. Eine Weiterverbreitung der in der Anwendung enthaltenen Daten ist aber nur mit Einverständnis der Autoren zulässig.

<a href="#top">&#8593; top</a>

# Neu-Aufbau 2017/2018

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
   - Neue Versionen einer Taxonomie werden importiert, ohne die alte zu ersetzten.<br/>Wie bisher Eigenschaftensammlungen
   - Alle Taxonomien bleiben langfristig erhalten
   - Der Benutzer kann wählen, nach welcher Taxonomie der Strukturbaum aufgebaut wird
   - Anwender oder Anwendungen (welche die Daten über Schnittstellen verwenden), werden durch den Import neuer Daten(-strukturen) nicht beeinträchtigt bzw. nicht gezwungen, ihre Anwendung anzupassen
   - Mögliche spätere Erweiterung: Import von Taxonomien über die Benutzeroberfläche, wie heute Eigenschaftensammlungen
2. Beziehungssammlungen werden in Eigenschaftensammlungen integriert: Es sind einfach Eigenschaftensammlungen mit Beziehungen
   - Ist einfacher zu verstehen
   - Beziehungen und Eigenschaften einer Sammlung werden am selben Ort angezeigt
   - Vereinfacht die Datenstruktur
   - Vereinfacht Exporte und Importe
3. Gruppen sind nicht mehr Teil der Taxonomie<br/>
   Bisher wurden Arten in Gruppen eingeteilt (Fauna, Flora, Moose, Pilze). Das wird aufgehoben, denn:
   - Taxonomien können Gruppen-übergreifend sein
   - Die Kategorisierung von Biota ist Sache der Taxonomien, nicht dieser Datenbank
   - Sollen trotzdem für gewisse Werkzeuge Gruppen gebildet werden, ist das einfach mittels Eigenschaften-Sammlung möglich. Beispiele: GIS-Layer, Artgruppen-ID in EvAB
4. Daten sind vor Veränderung geschützt. Organisationen erteilen ausgewählten Benutzern Bearbeitungs-Rechte
5. Die API stellt umfassende Funktionalitäten zur Verfügung. Externe Anwendungen können im Rahmen der Benutzerrechte alles realisieren, was mit den zugrundeliegenden Daten möglich ist

### Diese Technologien werden verwendet:

- Als Datenbank [PostgreSQL](https://www.postgresql.org)
  - Benutzer können dank [JSON](https://de.wikipedia.org/wiki/JavaScript_Object_Notation) weiterhin eigene Datenstrukturen importieren (Eigenschaften-Sammlungen und Taxonomien)
  - Alle übrigen Datenstrukturen sind relational und ermöglichen damit:
    - Einfachere Verwaltung,
    - Datenauswertung
    - und Gewährleistung der Datenintegrität
- [GraphQL](https://github.com/facebook/graphql) in Form von [PostGraphQL](https://github.com/postgraphql/postgraphql)
  - API-Server mit einer Zeile bauen und konfigurieren. Das sind _tausende_ weniger als bisher!
  - Weniger Code = weniger Fehler<br/>
  - Daten-Logik und Rechte-Verwaltung obliegen der Datenbank - wie es sein sollte<br/>
  - GraphQL ist die kommende API-Technologie. Verglichen mit REST ist GraphQL einfach zu verstehen, extrem leistungsfähig und flexibel. Somit steht ein aussergewöhnlich benutzerfreundlicher API-Server zur Verfügung, mit dem jedermann/-frau ganz nach ihren Bedürfnissen alle öffentlichen Daten aus arteigenschaften.ch abfragen und - im Rahmen ihrer Benutzer-Rechte - bearbeiten kann
- [hapi.js](http://hapijs.com) liefert (zumindest vorläufig noch) die Schnittstellen für [Artenlistentool](http://www.aln.zh.ch/internet/baudirektion/aln/de/naturschutz/naturschutzdaten/tools/artenlistentool.html#a-content), [EVAB](http://www.aln.zh.ch/internet/baudirektion/aln/de/naturschutz/naturschutzdaten/tools/evab.html#a-content) und [apflora.ch](https://github.com/FNSKtZH/apflora)
- [Apollo](https://www.apollodata.com). "React für Anwendungsdaten": Komponenten definieren, welche Daten sie brauchen. GraphQL und Apollo kümmern sich um die Bereitstellung
- Software-Abhängigkeiten werden mit [npm](https://www.npmjs.com) verwaltet
- Für die Konfiguration von Anwendung und Entwicklungsumgebung wird [create-react-app](https://github.com/facebookincubator/create-react-app) verwendet
  - Erzeugt für den produktiven App-Server statische Dateien, womit der App-Server einfacher aufzubauen und zu aktualisieren ist
  - Rasche Installation und einfache Aktualisierung der Enwicklungsumgebung und eines grossen Teils der für die Entwicklung benötigten Fremd-Software
  - [webpack](http://webpack.github.io) aktualisiert während der Entwicklung laufend die App im Browser - jede Änderung ist direkt sichtbar
- [ES6](http://www.ecma-international.org/ecma-262/6.0), [ES2016](https://www.ecma-international.org/ecma-262/7.0), [ES2017](http://2ality.com/2016/02/ecmascript-2017.html) und [ES2018](http://2ality.com/2017/02/ecmascript-2018.html), die neuen Versionen von [JavaScript](http://en.wikipedia.org/wiki/JavaScript), fördern lesbaren, kurzen Code
- [flow](https://flow.org) deckt Fehler auf, bevor der Code ausgeführt wird
- [prettier](https://github.com/prettier/prettier) formatiert den Code. Der Entwickler kann sich auf die Funktionalität konzentrieren
- [React](https://facebook.github.io/react/index.html)
  - Die Benutzeroberfläche ist eine Funktion der anwendungsseitigen Daten
  - Vereinfacht die Steuerung der Benutzeroberfläche
  - Die Benutzeroberfläche wird aus wiederverwertbaren und testbaren Komponenten aufgebaut

### Aktueller Stand

- [x] Datenstruktur:<br/>![Datenstruktur](/etc/structure_relational.png?raw=true "Datenstruktur")
- [x] [Projekt](https://github.com/barbalex/ae_import), um die Daten aus der bisherigen CouchDB in die neue PostgreSQL zu importieren<br/>![Import](/etc/import.png?raw=true "Import")
- [x] Anwendungs-API-Server ([PostGraphQL](https://github.com/postgraphql/postgraphql))<br/>
  ![API-Server](/etc/postgraphql.png?raw=true "API-Server")
  Ja, man sieht in diesem Bild ein Passwort :-( Aber es ist veraltet :-)
- [x] [API-Server für abhängige Anwendungen, welche nicht über GraphQL zugreifen](https://github.com/barbalex/ae_api) (braucht noch etwas Liebe)

Die neue Anwendung ist im Aufbau. Zieldatum für die Implementierung: Frühling 2018. Aktueller Stand:

  - [x] Entwicklungsumgebung<br/>![Entwicklungsumgebung](/etc/dev.png?raw=true "Entwicklungsumgebung")
  - [x] Layout und Navigation
    - neu kann die Grenze zwischen Strukturbaum und Objekt stufenlos verschoben werden
    ![Layout & Navigation](/etc/layout.png?raw=true "Layout & Navigation")
  - [x] Struktur- und Navigationsbaum
    - neu inklusive Taxonomien, Eigenschaftensammlungen, Benutzer und Organisationen
    ![Strukturbaum](/etc/strukturbaum.png?raw=true "Strukturbaum")
  - [x] Suche:
    - neu nach allen Taxonomien gleichzeitig
    - neu nach allen Hierarchiestufen (z.B. Ordnungen, Familien)
    - neu und gleichzeitig nach Eigenschaftensammlungen
    ![Datenstruktur](/etc/suche.png?raw=true "Suche")
  - [x] Arten und Lebensräume anzeigen:<br/>![Datenstruktur](/etc/grasfrosch.png?raw=true "Datenstruktur")
    - [x] inklusive Eigenschaften-Sammlungen und Beziehungen<br/>![Eigenschaftensammlung](/etc/eigenschaftensammlung.png?raw=true "Eigenschaftensammlung")
    - [x] inklusive Synonymen<br/>
    - [x] inklusive Eigenschaften und Beziehungen von Synonymen<br/>
      ![Synonym](/etc/synonym.png?raw=true "Synonym")
  - [x] Neu: Alle Hierarchiestufen des Taxonomie-Baums anzeigen:<br/>
    Taxonomie:<br/>
    ![Strukturbaum: Taxonomie](/etc/taxonomie.png?raw=true "Strukturbaum: Taxonomie")<br/>
    Z.B. Klasse:<br/>
    ![Strukturbaum: Klasse](/etc/klasse.png?raw=true "Strukturbaum: Klasse")<br/>
    Z.B. Ordnung:<br/>
    ![Strukturbaum: Ordnung](/etc/ordnung.png?raw=true "Strukturbaum: Ordnung")<br/>
    Z.B. Familie:<br/>
    ![Strukturbaum: Familie](/etc/familie.png?raw=true "Strukturbaum: Familie")<br/>
    Diese Hierarchiestufen haben ihre eigene id und können gleich verwendet werden, wie Arten bzw. Lebensräume.
  - [x] Neu: Eigenschaften-Sammlungen anzeigen:<br/>
    Die Liste aller:<br/>
    ![Eigenschaften-Sammlungen: Liste](/etc/pcs_list.png?raw=true "Eigenschaften-Sammlungen: Liste")<br/>
    Die Daten der Eigenschaften-Sammlung selbst:<br/>
    ![Eigenschaften-Sammlung: Daten](/etc/pcs_form.png?raw=true "Eigenschaften-Sammlung: Daten")<br/>
    Ihre Eigenschaften:<br/>
    ![Eigenschaften-Sammlung: Eigenschaften](/etc/pcs_p.png?raw=true "Eigenschaften-Sammlung: Eigenschaften")<br/>
    Diese Daten können exportiert werden. Benutzer mit entsprechenden Rechten können sie löschen und neu importieren.
    Die Beziehungen der Eigenschaften-Sammlung:<br/>
    ![Eigenschaften-Sammlung: Beziehungen](/etc/pcs_p.png?raw=true "Eigenschaften-Sammlung: Beziehungen")<br/>
    Diese Daten können exportiert werden. Benutzer mit entsprechenden Rechten können sie löschen und neu importieren.
  - [x] Daten exportieren (wird noch erweitert)
    ![exportieren](/etc/export.png?raw=true "exportieren")
    - [x] Gewählte Optionen können einzeln oder als Ganzes zurückgesetzt werden
    - [x] Erfasst man in einem Feld einen Filter-Wert, werden die Werte aufgelistet, welche in diesem Feld vorkommen
  - [x] Anmeldung<br/>
    Nicht angemeldete Besucher können alle Taxonomien, Objekte, Eigenschaften-Sammlungen und Eigenschaften anzeigen und exportieren.<br/>
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
  - [ ] Import von Eigenschaften- und Beziehungs-Sammlungen
  - [ ] Arten und Lebensräume bearbeiten (in Arbeit)
  - [x] Last but not least: arteigenschaften.ch ist nicht nur eine Applikation, sondern auch eine API bzw. Daten-Schnittstelle, aufgebaut mit [GraphQL](https://github.com/facebook/graphql). Alles, was ein Benutzer über die Anwendung machen kann, ist auch via die API möglich!
