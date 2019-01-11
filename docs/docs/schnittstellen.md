# Schnittstellen

## 1 Artenlistentool (ALT)

### 1.1 Links auf arteigenschaften.ch

#### Art

- bis Juli 2018: http://arteigenschaften.ch/index.html?id=AD0B10AA-707D-42C6-B68D-8F88CCD2F0B3
- seither, kompatibel: http://arteigenschaften.ch/index.html?id=AD0B10AA-707D-42C6-B68D-8F88CCD2F0B3
- seither, eleganter: https://arteigenschaften.ch/?id=AD0B10AA-707D-42C6-B68D-8F88CCD2F0B3

Jede url mit "id=uuid" als Parameter wird an das Objekt weitergeleitet.<br/>
Es ist unerheblich ob uuid gross oder klein geschrieben wird.

#### Eigenschaften wählen

- bis Juli 2018: http://arteigenschaften.ch/index.html?exportieren_fuer_artenlistentool=true
- seither, kompatibel (wird weitergeleitet): http://arteigenschaften.ch/index.html?exportieren_fuer_artenlistentool=true
- seither, eleganter: https://arteigenschaften.ch/artenlistentool/waehlen

### 1.2 Daten abholen

#### Arteigenschaften

##### Standardfelder

- bis Juli 2018: http://arteigenschaften.ch/artendb/_design/artendb/_list/export_alt_mit_synonymen_standardfelder/alt_arten_mit_synonymen?include_docs=true
- seither, kompatibel: http://arteigenschaften.ch/artendb/_design/artendb/_list/export_alt_mit_synonymen_standardfelder/alt_arten_mit_synonymen?include_docs=true
- seither, eleganter: https://arteigenschaften.ch/api/alt

##### Gewählte Felder

Bisher: 
<a href='http://arteigenschaften.ch:/artendb/_design/artendb/_list/export_alt_mit_synonymen/alt_arten_mit_synonymen?include_docs=true&bezInZeilen=false&felder={"felder":[{"DsTyp":"Taxonomie","DsName":"Taxonomie(n)","Feldname":"Artname vollständig"},{"DsTyp":"Datensammlung","DsName":"CH Prioritäten (2011)","Feldname":"Priorität"},{"DsTyp":"Beziehung","DsName":"ZH AP FM (2010): Art ist an Lebensraum gebunden","Feldname":"Biotopbindung"}]}'>http://arteigenschaften.ch:/artendb/_design/artendb/_list/export_alt_mit_synonymen/alt_arten_mit_synonymen?include_docs=true&bezInZeilen=false&felder={"felder":[{"DsTyp":"Taxonomie","DsName":"Taxonomie(n)","Feldname":"Artname vollständig"},{"DsTyp":"Datensammlung","DsName":"CH Prioritäten (2011)","Feldname":"Priorität"},{"DsTyp":"Beziehung","DsName":"ZH AP FM (2010): Art ist an Lebensraum gebunden","Feldname":"Biotopbindung"}]}</a>

Diese URL wird von der Anwendung generiert. Ist also egal, wie sie aussieht. Neu ist es ein Array von solchen Objekten:
```
{
   "t": "pco"
   "n": "CH Prioritäten (2011)"
   "p": "Priorität"
}
```
Die Feldnamen sind bewusst kurz gehalten, um den Netzwerkverkehr zu minimieren. Sie stehen für:

- t: collection-type ('tax', 'pco' oder 'rco')
- n: collection-name
- p: property
- rt: relation-type (nur für Beziehungen)

Es werden nur die manuell gewählten Felder übermittelt.

Beispiele:

- <a href='https://arteigenschaften.ch/api/alt?fields=[{"t":"pco","n":"CH Prioritäten (2011)","p":"Priorität"}]'>https://arteigenschaften.ch/api/alt?fields=[{"t":"pco","n":"CH Prioritäten (2011)","p":"Priorität"}]</a>
- <a href=''>https://arteigenschaften.ch/api/alt?fields=[{"t":"tax","n":"SISF Index 2 (2005)","p":"Artname vollständig"},{"t":"pco","n":"CH Prioritäten (2011)","p":"Priorität"}]https://arteigenschaften.ch/api/alt?fields=[{"t":"tax","n":"SISF Index 2 (2005)","p":"Artname vollständig"},{"t":"pco","n":"CH Prioritäten (2011)","p":"Priorität"}]</a>
- <a href='https://arteigenschaften.ch/api/alt?fields=[{"t":"tax","n":"SISF Index 2 (2005)","p":"Artname vollständig"},{"t":"pco","n":"CH Prioritäten (2011)","p":"Priorität"},{"t":"rco","n":"ZH AP FM (2010)","p":"Biotopbindung", "rt":"Art ist an Lebensraum gebunden"}]'>https://arteigenschaften.ch/api/alt?fields=[{"t":"tax","n":"SISF Index 2 (2005)","p":"Artname vollständig"},{"t":"pco","n":"CH Prioritäten (2011)","p":"Priorität"},{"t":"rco","n":"ZH AP FM (2010)","p":"Biotopbindung", "rt":"Art ist an Lebensraum gebunden"}]</a>
<br/><br/><br/>


## 2 EvAB

### 2.1 Arteigenschaften abholen

- bis Juli 2018: http://arteigenschaften.ch/artendb/_design/artendb/_list/export_evab/evab_arten?include_docs=true
- seither, kompatibel: http://arteigenschaften.ch/artendb/_design/artendb/_list/export_evab/evab_arten?include_docs=true
- seither, eleganter: https://arteigenschaften.ch/api/evab/arten

## GraphQL

Unter https://arteigenschaften.ch/graphql befindet sich eine GraphQL-Schnittstelle. Eine Benutzer-Oberfläche und Dokumentation dafür findet sich unter https://arteigenschaften.ch/graphiql (in der Anwendung über das Menü oben rechts erreichbar).

Diese GraphQL-Schnittstelle wird auch von arteigenschaften.ch selber benutzt.