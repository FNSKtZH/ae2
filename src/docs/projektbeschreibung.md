---
path: "/Dokumentation/Projektbeschreibung"
date: "2019-09-29"
title: "Projektbeschreibung"
sort1: 1
---

# Was ist arteigenschaften.ch?

## Ziele

### Ausgangspunkt

...sind Erfahrungen, welche in der Fachstelle Naturschutz gemacht wurden:

- Bezieht man Daten aus anderen Quellen, ist es schwierig, sie vollständig, fehlerfrei und aktuell zu (er-)halten
- Entscheidend für die Aktualität der Datenbank ist es, die Informationen einfach und mit geringem Aufwand importieren und danach direkt nutzen zu können
- Eigenschaften von Arten und Lebensräumen interessieren nicht nur die Fachstelle Naturschutz des Kantons Zürich. Ideal wäre eine von allen in diesem Bereich tätigen Stellen gemeinsam nachgeführte Datenbank. Oder realistischer: Ein Ort, an dem frei zugängliche Daten mit wenig Aufwand vereint werden können

### Was zeichnet arteigenschaften.ch aus?

Die wichtigsten Merkmale dürften sein:

- Die verwendeten Begriffe und Datenstrukturen sind auf Eigenschaften von Arten und Lebensräumen zugeschnitten
- Daten können einfach und rasch importiert werden...
- ...weshalb prinzipiell alle beteiligten Stellen ihre Daten an einem Ort und in einem gemeinsamen Format anbieten könnten. Das mag etwas naiv und utopisch sein. Zumindest aber kann man innert Minuten anderswo verfügbare Daten in arteigenschaften.ch vereinen und in Auswertungen mit anderen Daten kombinieren
- Daten können beim Export für anschliessende Auswertungen einfach und rasch kombiniert werden

### Wozu wird arteigenschaften.ch benutzt?

#### Nachschlagen
Man kann arteigenschaften.ch benutzen, um Informationen nachzuschlagen. Das dürfte sogar der häufigste Anwendungszweck sein. Die Darstellung ist aber eingeschränkt, da die Benutzeroberfläche dynamisch aus flexiblen Datenstrukturen generiert wird und arteigenschaften.ch keine Bilder enthält. Anwendungen mit statischer Datenstruktur können Informationen benutzerfreundlicher darstellen.

Hilfreich könnte allerdings sein, wenn der einfache Import (wie erhofft) dazu führen sollte, dass arteigenschaften.ch besonders umfassende und aktuelle Informationen enthält.<br/><br/>

#### Auswerten

arteigenschaften.ch wurde entwickelt, um mit Hilfe der darin enthaltenen Daten Auswertungen durchzuführen. Meist in Kombination mit Artbeobachtungen oder Lebensraumkartierungen. Beispiele:

- In einer Liste von Artbeobachtungen die wertvollsten Arten identifizieren, z.B. mithilfe des Artwerts, der nationalen Priorität oder des Rote-Liste-Status
- Aus Vegetationsaufnahmen Zeigerwerte berechnen
- In Zeitreihen Veränderungen von ausgewählten Parametern darstellen (z.B. Artwerte, Rote-Liste-Arten, Spätblüher, Magerkeitszeiger, störungsempfindliche Arten...)
- Für eine Region, Lebensraum, Förderprogramm oder Massnahme geeignete/prioritäre Arten bestimmen
- Aus Kartierungen und/oder physikalischen Modellen für bestimmte Arten/Förderprogramme prioritäre Flächen identifizieren
- Modellieren, z.B. den Einfluss der Klimaerwärmung auf Arten und Schutzprioritäten

Besonders geeignet ist arteigenschaften.ch, wenn in einem Projekt eigene Art- oder Lebensraumeigenschaften erhoben und mit anderen für die Auswertung kombiniert werden sollen.<br/><br/>

#### Daten für andere Anwendung bereitstellen

Andere Anwendungen können Daten aus arteigenschaften.ch direkt abholen und nutzen. Mehr Infos [hier](#diese-technologien-werden-verwendet).<br/><br/>

#### Nutzungsbedingungen

arteigenschaften.ch ist ein Werkzeug der Fachstelle Naturschutz des Kantons Zürich (FNS). Die Daten stehen frei zur Verfügung. Möchten Sie Daten importieren, wenden Sie sich bitte an [Andreas Lienhard](mailto:andreas.lienhard@bd.zh.ch). Die FNS behält sich vor, die optimale Integration von Daten in arteigenschaften.ch zu besprechen und allenfalls Einfluss darauf zu nehmen.

Es können nur Daten akzeptiert werden, deren Eigner mit der Veröffentlichung einverstanden sind. Arteigenschaften der FNS sind open data.

Die Anwendung arteigenschaften.ch ist [open source](#open-source). Es steht allen frei, sie zu kopieren und selber zu betreiben, ohne allfälligen Einfluss der FNS oder mit Daten, die man nicht veröffentlichen will. Oder besser: gemeinsam weiter zu entwickeln.<br/><br/>

### Das Zielpublikum

...befasst sich mit Arten und Lebensräumen. Es arbeitet primär in den Sachbereichen Naturschutz, Jagd und Fischerei, Gewässer, Wald, Landwirtschaft und Problemarten. Angesprochen sein dürften Fachstellen bei Bund, Kantonen, Gemeinden, Forschungseinrichtungen und freischaffende Fachleute bzw. Ökobüros.<br/><br/>

### Ziele für die Benutzerin

- Die Anwendung ist einfach zu bedienen,
- die Datenflut überschaubar,
- möglichst selbsterklärend und
- gut verfügbar:
  - von jedem Gerät im Internet
  - als Export in den Formaten <a href="http://de.wikipedia.org/wiki/CSV_(Dateiformat)">csv</a> und Excel
  - über die API für GIS, [Artenlistentool](http://www.aln.zh.ch/internet/baudirektion/aln/de/naturschutz/naturschutzdaten/tools/artenlistentool.html#a-content), [EvAB](http://www.aln.zh.ch/internet/baudirektion/aln/de/naturschutz/naturschutzdaten/tools/evab.html#a-content), [EvAB mobile](https://github.com/barbalex/EvabMobile) und beliebige weitere Applikationen<br/>
    (da die API mit [GraphQL](https://github.com/facebook/graphql) aufgebaut ist, kann jede Applikation ohne Rückfrage mit der FNS flexibel auf die Daten zugreifen. Rückfragen bzw. entsprechende Benutzer-Rechte sind nur nötig, um Daten von externen Applikationen aus zu verändern)
- Daten können über alle Artengruppen hinweg exportiert werden

### Ziele für Datenpfleger und Systemverantwortliche

- Daten können in wenigen Minuten importiert werden.<br/>Es werden keine besonderen technischen Fähigkeiten vorausgesetzt
- Die Datenstruktur ist via die API klar definiert
- Der Code ist offen und dokumentiert. Nutzer können eigene Erweiterungen entwickeln (lassen) und/oder arteigenschaften.ch gemeinsam weiter entwickeln. Oder eine eigene Anwendung entwickeln, welche die Daten via die API bezieht oder gar bearbeitet

## Fachliches Konzept

### Der Grundgedanke

Es gibt ein paar (nachfolgend erklärte) Grundbegriffe. Daraus leiten sich diese [Grundstrukturen der Datenbank](#aktueller-stand) ab:

- Taxonomien mit Objekten und Synonymen
- Eigenschaften-Sammlungen mit Eigenschaften und Beziehungen

Ja, das ist alles :-)<br/><br/>

### Taxonomien

[Taxonomien](http://de.wikipedia.org/wiki/Taxonomie) klassifizieren <a href="http://de.wikipedia.org/wiki/Objekt_(Philosophie)">Objekte</a> (z.B. Arten) mit einer [Hierarchie](http://de.wikipedia.org/wiki/Hierarchie). Die Entwicklung von Taxonomien und der Umgang mit unterschiedlichen und sich laufend verändernden Taxonomien sind höchst anspruchsvoll.<br/>

Andere geläufige Begriffe: Nomenklatur, Index, Flora, Kartierschlüssel, Lebensraumschlüssel.

Beispiele: Indizes der nationalen Artdatenzentren, "Flora der Schweiz (Ausgabe 2012)", "Lebensraumkartierung Neeracher Riet 2009", "Flora Europaea (Ellenberg, 1991)".

Im Idealfall enthielte die aktuell vom nationalen Zentrum verwendete Taxonomie nur "offizielle" Arten und z.B. keine Synonyme. Stattdessen würden Beziehungen zwischen offiziellen Arten und Arten anderer Taxonomien beschrieben. Da die Daten von den nationalen Zentren unseres Wissens (noch?) nicht so erhältlich sind, ist das in arteigenschaften.ch nicht realisiert aber im Design vorgesehen und bei Vorliegen entsprechender Daten direkt umsetzbar. Nachtrag vom 12.12.2019: Offenbar ist das in der Checklist 2017 so umgesetzt.<br/><br/>

### Objekte

<a href="https://de.wikipedia.org/wiki/Objekt_(Philosophie)">Objekte</a> bilden die Grundeinheit der Taxonomie. In arteigenschaften.ch sind das Arten oder Lebensräume. Aber nicht nur die Arten selbst, sondern jede Stufe der Hierarchie darüber und darunter, z.B. Familie, Gattung, Unterart.<br/><br/>

### Eigenschaften-Sammlungen

Systematische Informationen über Arten kommen in Sammlungen, z.B. „Flora Indicativa 2010“. Solche Sammlungen haben gemeinsame Eigenschaften wie z.B.:

- Dieselbe Herkunft (Autoren, Publikation, Publikationsdatum)
- Denselben Zweck: Die Eigenschaften-Sammlung wurde in der Regel für einen bestimmten Zweck erarbeitet. Für das Verständnis der Daten kann diese Information sehr hilfreich sein
- Bezug auf eine bestimmte Taxonomie
- Meist eine bestimmte Artgruppe (z.B. Flora, Fauna, Schmetterlinge…)
- Innerhalb der Artgruppe eine definierte Auswahl bearbeiteter Arten
- Definierte Methodik und Auswahl erfasster Informationen

Statt "Eigenschaften-Sammlung" könnte auch der Begriff "Publikation" verwendet werden. Damit würde klar:

- Dass arteigenschaften.ch an Eigenschaften-Sammlungen minimale Qualitätsansprüche stellt. Es muss nicht eine prominent publizierte wissenschaftliche Publikation sein. Aber die fachliche Qualität sollte dem definierten Zweck entsprechen
- Dass eine aktualisierte Version einer bestehenden Eigenschaften-Sammlung in der Regel als neue Eigenschaften-Sammlung zu behandeln ist

Eigenschaften-Sammlungen und Taxonomien sollten nur durch die Autoren nachgeführt werden (nicht zu verwechseln mit: importiert).

Um Arten- und Lebensraumeigenschaften verstehen und verwalten zu können, ist es wichtig, Eigenschaften-Sammlungen als wesentlichen Teil der Struktur zu behandeln. Sie erleichtern dem Benutzer, die Übersicht über die riesige Menge von Eigenschaften zu gewinnen.

arteigenschaften.ch kann auch Eigenschaften und Beziehungen von synonymen Objekten anzeigen und exportieren.

In fast allen Fällen ist es sinnvoll, Eigenschaften und Beziehungen pro Eigenschaften-Sammlung darzustellen. Z.B. bei der Anzeige in der Anwendung oder wenn Daten für Exporte ausgewählt werden.<br/><br/>

### Zusammenfassende Eigenschaften-Sammlungen

Für bestimmte Zwecke ist zusätzlich das Gegenteil interessant: Daten aus verschiedenen Eigenschaften-Sammlungen zusammenfassen. Z.B. wenn man über alle Artengruppen den aktuellsten Rote-Liste-Status darstellen will. Er steckt in diversen Eigenschaften-Sammlungen, da er häufig pro Artengruppe separat publiziert wird.<br/><br/>

Das geht so:

- Eine zusätzliche Eigenschaften-Sammlung mit Eigenschaft "zusammenfassend" schaffen
- Die entsprechenden Daten werden zwei mal importiert:
- Ein mal in die Ursprungs-Eigenschaften-Sammlung
- Ein mal in die zusammenfassende
- Die zusammenfassende Eigenschaften-Sammlung kann genau gleich wie alle anderen Eigenschaften-Sammlungen in der Anwendung angezeigt, exportiert oder über eine Schnittstelle angezapft werden

Beispiel: Für Heuschrecken wird eine neue Rote Liste publiziert:

- Es wird eine neue Eigenschaften-Sammlung geschaffen, z.B. "BAFU (2012): Rote Liste der Heuschrecken", und die Eigenschaften importiert
- Die alte Eigenschaften-Sammlung bleibt bestehen, z.B. "BUWAL (1985): Rote Liste der Heuschrecken"
- Die Eigenschaften werden nochmals in die zusammenfassende Eigenschaften-Sammlung "Rote Listen (aktuell)" importiert. Dabei werden bisherige Rote-Listen-Angaben der entsprechenden Heuschrecken überschrieben
- Falls einige 1985 beschriebene Arten 2012 nicht mehr beschrieben wurden, bleibt der Rote-Liste-Status von 1985 erhalten. Um dies kenntlich zu machen, soll in der zusammenfassenden Eigenschaften-Sammlung in einem zusätzlichen Feld immer der Name der Ursprungs-Eigenschaften-Sammlung mitgeliefert werden

### Eigenschaften

[Eigenschaften](http://de.wikipedia.org/wiki/Eigenschaft) beschreiben einzelne Objekte. Beispiele:

- Artwert
- Rote-Liste-Status
- nationale Priorität

### Beziehungen

[Beziehungen](https://de.wikipedia.org/wiki/Relation) beschreiben das Verhältnis zwischen zwei oder mehr Objekten. Beispiele:

- Bindung von Arten an Biotope
- Frasspflanzen von Insekten
- Wirte von Parasiten
- Beutespektrum von Räubern
- aber auch taxonomische Beziehungen wie "synonym"

### Daten decodieren

Traditionell werden Daten häufig codiert erfasst. Bis 2012 waren auch viele Daten in einer früheren Version von arteigenschaften.ch codiert. Die entsprechenden Felder enthielten für Menschen unverständliche Codes. Sie wurden in einer Codierungstabelle aufgelöst. Damit die Daten verständlich dargestellt werden konnten, mussten sie für Darstellung und Export decodiert werden. Dieses System ist kompliziert und leistungshungrig. Die Rohdaten sind für Menschen nicht mehr lesbar. Deshalb sind (nur) codierte Informationen zu vermeiden oder um uncodierte zu ergänzen.<br/><br/>

### Eigenschaften-Sammlungen aktualisieren

Wie soll eine bestehende Eigenschaften-Sammlung aktualisiert werden? Zu bedenken sind u.a.:

- Müssen frühere Auswertungen nachvollzogen bzw. wiederholt werden können? Wenn ja, sollten ältere Versionen unverändert erhalten bleiben
- Wird eine Eigenschaften-Sammlung periodisch teilweise aktualisiert (im Gegensatz zu vollständig)? Und soll ersichtlich sein, welche Eigenschaften welchen Datenstand haben?

Wenn eine von beiden obigen Fragen mit ja beantwortet wurde, kann z.B. folgendermassen vorgegangen werden:

- Neue Daten als neue Eigenschaften-Sammlung erfassen. Z.B. "ZH Artwert (2013)", wobei es schon "ZH Artwert (aktuell)" gibt und ev. weitere
- Für die Auswertung unter Einbezug aller Artwerte eine zusammenfassende Eigenschaften-Sammlung schaffen, z.B. "ZH Artwert (aktuell)"

**Ideen für die Zukunft**

- Benutzer können eigene Listen von Objekten (z.B. Art-Beobachtungen, Lebensräume) mit Eigenschaften verknüpfen:
  - Benutzerin lädt eine Tabelle mit ihren Beobachtungen oder Lebensräumen (wie bei Importen)
  - Sie wählt, mit welcher ID diese Daten mit Eigenschaften verknüpft werden sollen (wie bei Importen)
  - Anwendung meldet, wie erfolgreich die Verknüpfung ist (wie bei Importen)
  - Benutzer wählt Eigenschaften (wie bei Exporten)
  - Benutzer lädt Ergebnis herunter (wie bei Exporten)

### Open source

[![js-standard-style](https://img.shields.io/badge/license-ISC-brightgreen.svg)](https://github.com/barbalex/ae2/blob/master/license.md)

Die für die Anwendung verwendete [Lizenz](https://github.com/barbalex/ae2/blob/master/license.md) ist sehr freizügig. Auch die von der FNS stammenden Daten sind open data. Eine Weiterverbreitung der in der Anwendung enthaltenen und nicht von der FNS stammenden Daten ist aber nur mit Einverständnis der Autoren zulässig.<br/><br/>

## Neu-Aufbau 2017/2018

### Grundlage

...sind folgende Erkenntnisse:

- Die Anwendung ist nützlich und es gibt bisher keine echte Alternative. Es ist daher davon auszugehen, dass sie noch ein paar Jahre benutzt wird
- Es gibt einige aktuelle Erweiterungs-Wünsche. Das dürften nicht die letzten sein
- Anpassungen an der aktuellen Anwendung sind anspruchsvoll und Nebenwirkungen schwierig zu vermeiden
- Web- und Datenbanktechnologie entwickeln sich rasant weiter. Daher stehen heute viel [besser geeignete Mittel](#diese-technologien-werden-verwendet) zur Verfügung, um eine solche Anwendung aufzubauen

### Projektziele

- Hauptziel: Unterhaltbarkeit verbessern und künftige Erweiterungen ermöglichen
- Abhängigkeit von wenig verbreiteten Technologien verringern
- Aufwand für und Risiken bei künftigem Unterhalt und Erweiterungen verringern
- Verwaltung der Daten vereinfachen
- Datenintegrität besser gewährleisten

### Funktionale Ziele

1. Jedes Objekt (Art oder Lebensraum) kann von beliebig vielen Taxonomien beschrieben werden. Ähnlich wie bisher schon jedes Objekt von beliebig vielen Eigenschaften-Sammlungen beschrieben werden kann. Das ermöglicht:
   - Neue Versionen einer Taxonomie werden importiert, ohne die alte zu ersetzten.<br/>Wie bisher Eigenschaften-Sammlungen
   - Alle Taxonomien bleiben langfristig erhalten
   - Der Benutzer kann wählen, nach welcher Taxonomie der Strukturbaum aufgebaut wird
   - Anwender oder Anwendungen (welche die Daten über Schnittstellen verwenden), werden durch den Import neuer Daten(-strukturen) nicht beeinträchtigt bzw. nicht gezwungen, ihre Anwendung anzupassen
   - Mögliche spätere Erweiterung: Import von Taxonomien über die Benutzeroberfläche, wie heute Eigenschaften-Sammlungen
2. Beziehungssammlungen werden in Eigenschaften-Sammlungen integriert: Es sind einfach Eigenschaften-Sammlungen mit Beziehungen
   - Ist einfacher zu verstehen
   - Beziehungen und Eigenschaften einer Sammlung werden am selben Ort angezeigt
   - Vereinfacht die Datenstruktur
   - Vereinfacht Exporte und Importe
3. Gruppen sind nicht mehr Teil der Taxonomie<br/>
   Bisher wurden Arten in Gruppen eingeteilt (Fauna, Flora, Moose, Pilze). Das wird aufgehoben, denn:
   - Taxonomien halten sich nicht zwingend an Gruppen
   - Die bisher verwendeten Kategorien sind letztlich nicht klar voneinander abzugrenzen
   - Die Kategorisierung von Biota ist Sache der Taxonomien, nicht dieser Datenbank
   - Sollen trotzdem für gewisse Werkzeuge Gruppen gebildet werden, ist das einfach mittels Eigenschaften-Sammlung möglich. Beispiele: GIS-Layer, Artgruppen-ID in EvAB
4. Daten sind vor Veränderung geschützt. Organisationen erteilen ausgewählten Benutzern Bearbeitungs-Rechte. Diese Benutzer können Daten importieren und teilweise direkt in arteigenschaften.ch bearbeiten
5. Die API stellt umfassende Funktionalitäten bereit. Externe Anwendungen können im Rahmen der Benutzerrechte alles realisieren, was mit den zugrundeliegenden Daten möglich ist

### Technologien

- Als Datenbank [PostgreSQL](https://www.postgresql.org)
  - Benutzer können dank [JSON](https://de.wikipedia.org/wiki/JavaScript_Object_Notation) weiterhin eigene Datenstrukturen importieren (Eigenschaften-Sammlungen und Taxonomien)
  - Alle übrigen Datenstrukturen sind relational und ermöglichen damit:
    - Einfachere Verwaltung,
    - Datenauswertung
    - und Gewährleistung der Datenintegrität
- [GraphQL](https://github.com/facebook/graphql) in Form von [PostGraphile](https://github.com/graphile/postgraphile)
  - API-Server mit einer Zeile bauen und konfigurieren. Das sind _tausende_ weniger als bisher!
  - Daten-Logik und Rechte-Verwaltung obliegen der Datenbank - wie es sein sollte<br/>
  - GraphQL ist die kommende API-Technologie. Verglichen mit REST ist GraphQL extrem flexibel. Somit steht ein aussergewöhnlich benutzerfreundlicher API-Server zur Verfügung, mit dem jede(r) ganz nach eigenen Bedürfnissen alle öffentlichen Daten aus arteigenschaften.ch abfragen und - im Rahmen der Benutzer-Rechte - bearbeiten kann
- [hapi.js](http://hapijs.com) liefert die Schnittstellen für [Artenlistentool](http://www.aln.zh.ch/internet/baudirektion/aln/de/naturschutz/naturschutzdaten/tools/artenlistentool.html#a-content) und [EVAB](http://www.aln.zh.ch/internet/baudirektion/aln/de/naturschutz/naturschutzdaten/tools/evab.html#a-content)
- [Apollo](https://www.apollodata.com). Komponenten definieren, welche Daten sie brauchen. GraphQL und Apollo kümmern sich um die Bereitstellung. React (siehe unten), GraphQL und Apollo haben die Entwicklung von Anwendungen revolutioniert
- Software-Abhängigkeiten werden mit [npm](https://www.npmjs.com) verwaltet
- [React](https://facebook.github.io/react/index.html)
  - Die Benutzeroberfläche ist eine Funktion der anwendungsseitigen Daten,
  - viel einfacher zu steuern
  - ...und aus wiederverwertbaren und testbaren Komponenten aufgebaut

### Ein paar Eindrücke

- [x] Datenstruktur:<br/>![Datenstruktur](./_media/structure_relational.png 'Datenstruktur')
- [x] [Projekt](https://github.com/barbalex/ae_import), um die Daten aus der bisherigen CouchDB in die neue PostgreSQL zu importieren<br/>![Import](./_media/import.png 'Import')
- [x] Anwendungs-API-Server ([PostGraphile](https://github.com/graphile/postgraphile))<br/>
      ![API-Server](./_media/postgraphql.png 'API-Server')
- [x] [API-Server für abhängige Anwendungen, welche nicht über GraphQL zugreifen](/docs/schnittstellen.md)
- [x] Entwicklungsumgebung<br/>![Entwicklungsumgebung](./_media/dev.png 'Entwicklungsumgebung')
- [x] Layout und Navigation
  - neu kann die Grenze zwischen Strukturbaum und Objekt stufenlos verschoben werden
    ![Layout & Navigation](./_media/layout.png 'Layout & Navigation')
- [x] Struktur- und Navigationsbaum
  - neu inklusive Taxonomien, Eigenschaften-Sammlungen, Benutzer und Organisationen
    ![Strukturbaum](./_media/strukturbaum.png 'Strukturbaum')
- [x] Suche:
  - neu nach allen Taxonomien gleichzeitig
  - neu nach allen Hierarchiestufen (z.B. Ordnungen, Familien)
  - neu und gleichzeitig nach Eigenschaften-Sammlungen
    ![Datenstruktur](./_media/suche.png 'Suche')
- [x] Arten und Lebensräume anzeigen:<br/>![Datenstruktur](./_media/grasfrosch.png 'Datenstruktur')
  - [x] inklusive Eigenschaften-Sammlungen und Beziehungen<br/>![Eigenschaften-Sammlung](./_media/eigenschaftensammlung.png 'Eigenschaften-Sammlung')
  - [x] inklusive Synonymen<br/>
  - [x] inklusive Eigenschaften und Beziehungen von Synonymen<br/>
        ![Synonym](./_media/synonym.png 'Synonym')
- [x] Neu: Alle Hierarchiestufen des Taxonomie-Baums anzeigen:<br/>
      Taxonomie:<br/>
      ![Strukturbaum: Taxonomie](./_media/taxonomie.png 'Strukturbaum: Taxonomie')<br/>
      Z.B. Klasse:<br/>
      ![Strukturbaum: Klasse](./_media/klasse.png 'Strukturbaum: Klasse')<br/>
      Z.B. Ordnung:<br/>
      ![Strukturbaum: Ordnung](./_media/ordnung.png 'Strukturbaum: Ordnung')<br/>
      Z.B. Familie:<br/>
      ![Strukturbaum: Familie](./_media/familie.png 'Strukturbaum: Familie')<br/>
      Diese Hierarchiestufen haben ihre eigene id und können gleich verwendet werden, wie Arten bzw. Lebensräume.
- [x] Neu: Eigenschaften-Sammlungen anzeigen:<br/>
      Die Liste aller:<br/>
      ![Eigenschaften-Sammlungen: Liste](./_media/pcs_list.png 'Eigenschaften-Sammlungen: Liste')<br/>
      Die Daten der Eigenschaften-Sammlung selbst:<br/>
      ![Eigenschaften-Sammlung: Daten](./_media/pcs_form.png 'Eigenschaften-Sammlung: Daten')<br/>
      Ihre Eigenschaften:<br/>
      ![Eigenschaften-Sammlung: Eigenschaften](./_media/pcs_p.png 'Eigenschaften-Sammlung: Eigenschaften')<br/>
      Diese Daten können exportiert werden. Benutzer mit entsprechenden Rechten können sie löschen und neu importieren.
      Die Beziehungen der Eigenschaften-Sammlung:<br/>
      ![Eigenschaften-Sammlung: Beziehungen](./_media/pcs_p.png 'Eigenschaften-Sammlung: Beziehungen')<br/>
      Diese Daten können exportiert werden. Benutzer mit entsprechenden Rechten können sie löschen und neu importieren.
- [x] Daten exportieren<br/>
      ![exportieren](./_media/export.png 'exportieren')
  - [x] Neu: Während Filter gesetzt und Felder gewählt werden, werden die resultierenden Daten direkt angezeigt
  - [x] Neu: Gewählte Optionen können einzeln oder als Ganzes zurückgesetzt werden
  - [x] Neu: Erfasst man in einem Feld einen Filter-Wert, werden die Werte aufgelistet, welche in diesem Feld vorkommen
- [x] Neu: Anmeldung<br/>
      Nicht angemeldete Besucher können alle Taxonomien, Objekte, Eigenschaften-Sammlungen und Eigenschaften anzeigen und exportieren.<br/>
      ![anmelden](./_media/anmeldung.png 'anmelden')<br/>
      Angemeldete Benutzer können Daten gemäss den ihnen von Organisationen erteilten Rollen verändern.
- [x] Neu: Benutzer<br/>
      Benutzer können Name, Email und Passwort verändern.<br/>
      Sie sehen die ihnen erteilten Rollen:<br/>
      ![Benutzer-Rollen](./_media/user_rollen.png 'Benutzer-Rollen')
      ... die von ihnen importierten Taxonomien:<br/>
      ![Benutzer-Taxonomien](./_media/user_tax.png 'Benutzer-Taxonomien')
      ... und die von ihnen importierten Eigenschaften-Sammlungen:<br/>
      ![Benutzer-Eigenschaften-Sammlungen](./_media/user_pcs.png 'Benutzer-Eigenschaften-Sammlungen')
      Organisations-Administratoren können neue Benutzer erstellen:<br/>
      ![Neuen Benutzer erstellen](./_media/user_create_new.png 'Neuen Benutzer erstellen')<br/>
      ... bestehende löschen:<br/>
      ![Benutzer löschen](./_media/user_delete.png 'Benutzer löschen')<br/>
      ... und bei bestehenden Namen und Email ändern, nicht aber das Passwort:<br/>
      ![Benutzer ändern](./_media/user_from_admin.png 'Benutzer ändern')
- [x] Neu: Organisationen<br/>
      Organisationen geben Benutzern für ihre Taxonomien und Eigenschaften-Sammlungen Rollen:
      ![Rollen verwalten](./_media/org_rollen.png 'Rollen verwalten')
      ...sehen, für welche Taxonomien sie zuständig sind:
      ![Taxonomien](./_media/org_tax.png 'Taxonomien')
      ...sehen, für welche Eigenschaften-Sammlungen sie zuständig sind:
      ![Eigenschaften-Sammlungen](./_media/org_pcs.png 'Eigenschaften-Sammlungen')
- [x] Import von Eigenschaften- und Beziehungs-Sammlungen
- [x] Neu: Taxonomien und Objekte bearbeiten
- [x] Links zu: Google Bilder, Wikipedia Suche. Neu: GBIF, Info Flora
- [x] Layout passt sich an Mobilgeräte an
- [x] Neu: arteigenschaften.ch ist nicht nur eine Applikation, sondern auch eine API bzw. Daten-Schnittstelle, aufgebaut mit [GraphQL](https://github.com/facebook/graphql). Alles, was ein Benutzer über die Anwendung machen kann, ist auch via die API möglich!
