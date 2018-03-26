## Schnittstellen:

### ALT ruft Art auf:
http://artdaten.ch/index.html?id=AD0B10AA-707D-42C6-B68D-8F88CCD2F0B3
http://localhost:3000/index.html?id=AD0B10AA-707D-42C6-B68D-8F88CCD2F0B3

Jede url mit "id=uuid" als Parameter wird an das Objekt weitergeleitet.

### ALT lässt Benutzer Eigenschaften wählen:
http://artdaten.ch/index.html?exportieren_fuer_artenlistentool=true
http://arteigenschaften.ch/index.html?exportieren_fuer_artenlistentool=true
http://localhost:3000/index.html?exportieren_fuer_artenlistentool=true

URL: /artenlistentool/waehlen
Bisherige URL (/index.html?exportieren_fuer_artenlistentool=true) wird weitergeleitet.


*************************************

Das muss server.js direkt aufnehmen:
- server.js schnappt sich das
- nginx konfigurieren

### ALT holt sich Arteigenschaften:
#### Standardfelder:
http://artdaten.ch/artendb/_design/artendb/_list/export_alt_mit_synonymen_standardfelder/alt_arten_mit_synonymen?include_docs=true
Neu: http://arteigenschaften.ch/artenlistentool/get/standard

#### Gewählte Felder
Beispiel:
http://arteigenschaften.ch:/artendb/_design/artendb/_list/export_alt_mit_synonymen/alt_arten_mit_synonymen?include_docs=true&bezInZeilen=false&felder={"felder":[{"DsTyp":"Taxonomie","DsName":"Taxonomie(n)","Feldname":"Artname"},{"DsTyp":"Datensammlung","DsName":"Blaue Liste (1998)","Feldname":"Anwendungshäufigkeit zur Förderung"}]}

Diese URL wird von der Anwendung generiert. Ist also egal, wie sie aussieht! Beispiel:
http://arteigenschaften.ch/artenlistentool/get/specific/fields=[{tax:}]

Also:
1. Gewählte Felder übergeben.
2. Genau wie bei Anwendung abfragen?

### evab holt sich Arteigenschaften:
http://arteigenschaften.ch/artendb/_design/artendb/_list/export_evab/evab_arten?include_docs=true
http://127.0.0.1:5984/artendb/_design/artendb/_list/export_evab/evab_arten?include_docs=true
http://127.0.0.1:3000/artendb/_design/artendb/_list/export_evab/evab_arten?include_docs=true

function bauen, welche die Daten liefert
und aufgerufen wird, wenn dieser Pfad aktive ist

Daten:
- Gruppen: Fauna, Flora, Moose. D.h. drei Taxonomien