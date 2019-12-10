---
path: "/Dokumentation/Schnittstellen"
date: "2019-12-02"
title: "Schnittstellen"
sort1: 5
---

# Schnittstellen

## 1 Artenlistentool (ALT)

### 1.1 Link auf eine Art

- vor Juli 2018 verwendet: http://arteigenschaften.ch/index.html?id=AD0B10AA-707D-42C6-B68D-8F88CCD2F0B3<br/>
  (vorläufig noch kompatibel)
- neu: https://arteigenschaften.ch/?id=AD0B10AA-707D-42C6-B68D-8F88CCD2F0B3

Jede url mit "id=uuid" als Parameter wird an das Objekt weitergeleitet.<br/>
Es ist unerheblich ob uuid gross oder klein geschrieben wird.<br/><br/>

### 1.2 Standard-Art-Eigenschaften abholen

- bis Juli 2018: http://arteigenschaften.ch/artendb/_design/artendb/_list/export_alt_mit_synonymen_standardfelder/alt_arten_mit_synonymen?include_docs=true (vorläufig noch kompatibel)
- neu: https://arteigenschaften.ch/api/alt

### 1.3 Art-Eigenschaften wählen

- bis Juli 2018: http://arteigenschaften.ch/index.html?exportieren_fuer_artenlistentool=true<br/>
  (vorläufig noch kompatibel)
- neu: https://arteigenschaften.ch/artenlistentool/waehlen

### 1.4 Gewählte Art-Eigenschaften abholen

Bisher:
http://arteigenschaften.ch:/artendb/\_design/artendb/\_list/export_alt_mit_synonymen/alt_arten_mit_synonymen?include_docs=true&bezInZeilen=false&felder={"felder":[{"DsTyp":"Taxonomie","DsName":"Taxonomie(n)","Feldname":"Artname vollständig"},{"DsTyp":"Datensammlung","DsName":"CH Prioritäten (2011)","Feldname":"Priorität"},{"DsTyp":"Beziehung","DsName":"ZH AP FM (2010): Art ist an Lebensraum gebunden","Feldname":"Biotopbindung"}]}<br/>

Diese URL wird von der Anwendung generiert. Ist also egal, wie sie aussieht. Neu ist es ein Array von solchen Objekten:

```
{
   "t": "pco"
   "n": "CH Prioritäten (2011)"
   "p": "Priorität"
}
```

Die Feldnamen sind bewusst kurz gehalten, um den Netzwerkverkehr zu minimieren. Sie stehen für:

- t: collection-**t**ype ('tax', 'pco' oder 'rco')
- n: collection-**n**ame
- p: **p**roperty
- rt: **r**elation-**t**ype (nur für Beziehungen)

Es werden nur die manuell gewählten Felder übermittelt.<br/><br/>

Beispiele:

- https://arteigenschaften.ch/api/alt?fields=[{"t":"pco","n":"CH Prioritäten (2011)","p":"Priorität"}]
- https://arteigenschaften.ch/api/alt?fields=[{"t":"tax","n":"SISF Index 2 (2005)","p":"Artname vollständig"},{"t":"pco","n":"CH Prioritäten (2011)","p":"Priorität"}]https://arteigenschaften.ch/api/alt?fields=[{"t":"tax","n":"SISF Index 2 (2005)","p":"Artname vollständig"},{"t":"pco","n":"CH Prioritäten (2011)","p":"Priorität"}]
- https://arteigenschaften.ch/api/alt?fields=[{"t":"tax","n":"SISF Index 2 (2005)","p":"Artname vollständig"},{"t":"pco","n":"CH Prioritäten (2011)","p":"Priorität"},{"t":"rco","n":"ZH AP FM (2010)","p":"Biotopbindung", "rt":"Art ist an Lebensraum gebunden"}]
  <br/><br/><br/>

## 2 EvAB

### Art-Eigenschaften abholen

- bis Juli 2018: http://arteigenschaften.ch/artendb/_design/artendb/_list/export_evab/evab_arten?include_docs=true (vorläufig noch kompatibel)
- neu: https://arteigenschaften.ch/api/evab/arten

## 3 GraphQL

Unter https://arteigenschaften.ch/graphql befindet sich eine GraphQL-Daten-Schnittstelle. Benutzer-Oberfläche und Dokumentation sind in der Anwendung über das Mehr-Menü oben rechts erreichbar oder auf [https://arteigenschaften.ch/graphiql](/graphiql).

Diese GraphQL-Schnittstelle wird auch von arteigenschaften.ch selber benutzt. Es gibt daher kaum eine Funktionalität, welche damit nicht möglich ist, solange man sich mit ausreichenden Benutzerrechten anmeldet.