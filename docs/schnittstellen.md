# 1 Artenlistentool (ALT)

## 1.1 Links auf arteigenschaften.ch

### 1.1.1 Art

Bisher: http://arteigenschaften.ch/index.html?id=AD0B10AA-707D-42C6-B68D-8F88CCD2F0B3<br/>
Künftig kann ALT auch nur diese URL aufrufen: https://arteigenschaften.ch/?id=AD0B10AA-707D-42C6-B68D-8F88CCD2F0B3

Jede url mit "id=uuid" als Parameter wird an das Objekt weitergeleitet.<br/>
Es ist unerheblich ob uuid gross oder klein geschrieben wird.

### 1.1.2 Eigenschaften wählen

Bisher: http://arteigenschaften.ch/index.html?exportieren_fuer_artenlistentool=true<br/>
Neu: https://arteigenschaften.ch/artenlistentool/waehlen

Die bisherige URL wird weitergeleitet.

## 1.2 Daten abholen

Das muss server.js direkt aufnehmen:

- server.js schnappt sich das
- nginx konfigurieren

### 1.2.1 Arteigenschaften

#### 1.2.1.1 Standardfelder

http://artdaten.ch/artendb/_design/artendb/_list/export_alt_mit_synonymen_standardfelder/alt_arten_mit_synonymen?include_docs=true<br/>
Neu: http://arteigenschaften.ch/api/alt

#### 1.2.1.2 Gewählte Felder

Beispiel:<br/>
http://arteigenschaften.ch:/artendb/_design/artendb/_list/export_alt_mit_synonymen/alt_arten_mit_synonymen?include_docs=true&bezInZeilen=false&felder={"felder":[{"DsTyp":"Taxonomie","DsName":"Taxonomie(n)","Feldname":"Artname"},{"DsTyp":"Datensammlung","DsName":"Blaue Liste (1998)","Feldname":"Anwendungshäufigkeit zur Förderung"}]}

Diese URL wird von der Anwendung generiert. Ist also egal, wie sie aussieht! Beispiel:
http://arteigenschaften.ch/api/alt?fields=[{tax:}]

Also:

1. Gewählte Felder übergeben.

2. Genau wie bei Anwendung abfragen?

# 2 EvAB
## 2.1 Arteigenschaften abholen

Bisher: http://arteigenschaften.ch/artendb/_design/artendb/_list/export_evab/evab_arten?include_docs=true
Neu: https://arteigenschaften.ch/api/evab/arten

function bauen, welche die Daten liefert
und aufgerufen wird, wenn dieser Pfad aktive ist

Daten:

- Gruppen: Fauna, Flora, Moose. D.h. drei Taxonomien
