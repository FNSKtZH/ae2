# Neue Art erfassen

Grundsätzlich sind die Autoren einer Taxonomie für deren Nachführung zuständig. Publizieren sie eine neue oder aktualisierte Version, wird sie in arteigenschaften.ch als neue Taxonomie aufgenommen. Die vorige bleibt unverändert erhalten.

Die FNS ergänzt sporadisch die aktuelle Taxonomie der nationalen Zentren um Arten, zum Beispiel wenn fehlende Arten in EvAB benutzt werden sollen.

Das Ergänzen von Arten ist daher keine Kern-Funktionalität von arteigenschaften.ch. Man kann aber taxonomische Einheiten erfassen. Das wurde schon immer ermöglicht, um Lebensräume zu erfassen. Denn diese sind hierarchisch aufgebaut sind und es ist schwierig, hierarchische Systeme logisch schlüssig in flachen Tabellen aufzubauen. 

Diese Funktionalität kann auch genutzt werden, um Arten zu ergänzen. Sollen diese Arten aber vom [Artenlistentool](https://aln.zh.ch/internet/baudirektion/aln/de/naturschutz/naturschutzdaten/tools/artenlistentool.html#a-content) oder [EvAB](https://aln.zh.ch/internet/baudirektion/aln/de/naturschutz/naturschutzdaten/tools/evab.html#a-content) genutzt werden, müssen gewisse Bedingungen erfüllt sein.

Sollte etwas völlig misslingen, können die Daten von arteigenschaften.ch im schlimmsten Fall aus der täglichen Sicherung wiederhergestellt werden.

Wer den Vorgang zuerst testen will, kann das auf https://artdaten.ch machen.

### Taxonomische Eigenschaften erfassen

Vorgehen:

1. Anmelden
2. Im Strukturbaum dorthin navigieren, wo die neue Art eingefügt werden soll
3. Mit der rechten Maustaste auf den Ordner bzw. die Gattung klicken, unter dem die Art eingefügt werden soll
4. `erstelle neues Objekt (eine Ebene tiefer)` wählen
5. Rechts im Formular: Namen der Art erfassen<br/>
   Der Name wird im Strukturbaum erst später aktualisiert. Um das zu provozieren, kann man die F5-Taste drücken
6. Bei `Neues Feld` weitere benötigte Felder erfassen (siehe unten)
7. In der gleichen Art könnten zuvor Familie und Gattung erfasst werden, falls sie noch nicht existierten

### Art für das Artenlistentool vorbereiten

Damit eine Art vom Artenlistentool abgerufen werden kann, müssen die folgenden Bedingungen erfüllt sein:
- Die Art **muss** über folgende Felder verfügen:
  - `Taxonomie ID`: Integer, grösser als 1'000'000<br/>
     Um die nächste freie Nummer zu finden, empfiehlt es sich, die Taxonomie-ID für alle Arten der Gruppe zu exportieren, die bisher höchste Nummer zu ermitteln und um 1 zu erhöhen.
- Die Art **sollte** über folgende Felder verfügen:
  - `Artname`: Text
- Die Art **kann** über folgende Felder verfügen:
  - `Name Deutsch`: Text
- In der Eigenschaftensammlung `ZH GIS` **muss** ein Datensatz existieren
- Dieser Datensatz **muss** folgende Felder enthalten:
  - `GIS-Layer`: Text, der passende aus den bisher verwendeten Werten (in Export nachschauen)
  - `Betrachtungsdistanz (m)`: Integer. Einer der bisher für Arten derselben Gruppe verwendeten Werte (in Export nachschauen)
- Die Funktionalität, Eigenschaftensammlungen ähnlich wie die taxonomischen Eigenschaften der Art selbst direkt zu bearbeiten, wurde (noch) nicht implementiert.<br/>
  Der Datensatz für ZH GIS wird daher am einfachsten direkt in die Datenbank geschrieben.<br/>
  Alternativ können angemeldete Benutzer mit ausreichenden Rechten die Funktion zum Import ganzer Eigenschaftensammlungen nutzen. Das geht so:
  1. Die Eigenschaftensammlung [hier](https://arteigenschaften.ch/Eigenschaften-Sammlungen/bdf7a9fa-7b0e-11e8-a16c-efe328566112/Eigenschaften) exportieren (Schaltfläche `XLSX exportieren`)
  2. In Excel den Datensatz ergänzen
  3. Die aktuellen Daten dieser Eigenschaftensammlung entfernen (Schaltfläche `Daten löschen`)
  4. Die ergänzte Tabelle enstprechend der nun sichtbaren Anleitung (ev. F5-Taste drücken) wieder importieren<br/>

### Art für EvAB vorbereiten

Damit eine Art von EvAB abgerufen werden kann, müssen die folgenden Bedingungen erfüllt sein:
- Die Art **muss** über folgende Felder verfügen:
  - `Taxonomie ID`: Integer, grösser als 1'000'000<br/>
     Um die nächste freie Nummer zu finden, empfiehlt es sich, die Taxonomie-ID für alle Arten der Gruppe zu exportieren, die bisher höchste Nummer zu ermitteln und um 1 zu erhöhen.
  - Das Namens-Feld, dass beim Erfassen der Art schon erfasst wurde
- Die Art **kann** über folgende Felder verfügen:
  - `Name Deutsch`: Text
- In der Eigenschaftensammlung `ZH GIS` **muss** ein Datensatz existieren
- Dieser Datensatz **muss** folgende Felder enthalten:
  - `GIS-Layer`: Text, der passende aus den bisher verwendeten Werten (in Export nachschauen)