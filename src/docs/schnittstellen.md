---
path: "/Dokumentation/Schnittstellen"
date: "2020-02-04"
title: "Schnittstellen"
sort1: 5
---


## 1 Artenlistentool (ALT)

### 1.1 Link auf eine Art

- bisher: http://arteigenschaften.ch/index.html?id=AD0B10AA-707D-42C6-B68D-8F88CCD2F0B3
- neu: https://arteigenschaften.ch/?id=AD0B10AA-707D-42C6-B68D-8F88CCD2F0B3
- für die Tests 2020: https://eigenschaften.art//?id=ad0b10aa-707d-42c6-b68d-8f88ccd2f0b3

Jede url mit "id=uuid" als Parameter wird an das Objekt weitergeleitet.<br/>
Es ist unerheblich ob die uuid gross oder klein geschrieben wird.<br/><br/>

### 1.2 Standard-Art-Eigenschaften abholen

- bisher: http://arteigenschaften.ch/artendb/_design/artendb/_list/export_alt_mit_synonymen_standardfelder/alt_arten_mit_synonymen?include_docs=true
- neu: https://api.arteigenschaften.ch/alt
- für die Tests 2020: http://167.172.187.231:4000/alt

### 1.3 Art-Eigenschaften wählen

- bisher: http://arteigenschaften.ch/index.html?exportieren_fuer_artenlistentool=true
- neu: https://arteigenschaften.ch/artenlistentool/waehlen
- für die Tests 2020: https://eigenschaften.art//artenlistentool/waehlen

### 1.4 Gewählte Art-Eigenschaften abholen

Bisher:
<a href="http://arteigenschaften.ch:/artendb/_design/artendb/_list/export_alt_mit_synonymen/alt_arten_mit_synonymen?include_docs=true&bezInZeilen=false&felder=%7B%22felder%22:%5B%7B%22DsTyp%22:%22Taxonomie%22,%22DsName%22:%22Taxonomie(n)%22,%22Feldname%22:%22Artname vollständig%22%7D,%7B%22DsTyp%22:%22Datensammlung%22,%22DsName%22:%22CH Prioritäten (2011)%22,%22Feldname%22:%22Priorität%22%7D,%7B%22DsTyp%22:%22Beziehung%22,%22DsName%22:%22ZH AP FM (2010): Art ist an Lebensraum gebunden%22,%22Feldname%22:%22Biotopbindung%22%7D%5D%7D">http://arteigenschaften.ch:/artendb/_design/artendb/_list/export_alt_mit_synonymen/alt_arten_mit_synonymen?include_docs=true&bezInZeilen=false&felder={"felder":[{"DsTyp":"Taxonomie","DsName":"Taxonomie(n)","Feldname":"Artname vollständig"},{"DsTyp":"Datensammlung","DsName":"CH Prioritäten (2011)","Feldname":"Priorität"},{"DsTyp":"Beziehung","DsName":"ZH AP FM (2010): Art ist an Lebensraum gebunden","Feldname":"Biotopbindung"}]}</a>
<br/><br/>

Neu:<br/><br/>

Die URL wird von der App generiert und danach von der Schnittstelle gelesen. Sie kann also ohne Rücksicht auf das ALT geändert werden. Neu ist es ein Array von solchen Objekten:

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
- <a href="https://api.arteigenschaften.ch/alt?fields=%5B%7B%22t%22:%22pco%22,%22n%22:%22CH%20Priorit%C3%A4ten%20(2011)%22,%22p%22:%22Priorit%C3%A4t%22%7D%5D">https://api.arteigenschaften.ch/alt?fields=[{"t":"pco","n":"CH Prioritäten (2011)","p":"Priorität"}]</a>
- <a href="https://api.arteigenschaften.ch/alt?fields=%5B%7B%22t%22:%22tax%22,%22n%22:%22Taxonomie%22,%22p%22:%22Artname%20vollst%C3%A4ndig%22%7D,%7B%22t%22:%22pco%22,%22n%22:%22CH%20Priorit%C3%A4ten%20(2011)%22,%22p%22:%22Priorit%C3%A4t%22%7D%5D">https://api.arteigenschaften.ch/alt?fields=[{"t":"tax","n":"SISF (2005)","p":"Artname vollständig"},{"t":"pco","n":"CH Prioritäten (2011)","p":"Priorität"}]https://api.arteigenschaften.ch/alt?fields=[{"t":"tax","n":"SISF (2005)","p":"Artname vollständig"},{"t":"pco","n":"CH Prioritäten (2011)","p":"Priorität"}]</a>
- <a href="https://api.arteigenschaften.ch/alt?fields=%5B%7B%22t%22:%22tax%22,%22n%22:%22SISF%20(2005)%22,%22p%22:%22Artname%20vollst%C3%A4ndig%22%7D,%7B%22t%22:%22pco%22,%22n%22:%22CH%20Priorit%C3%A4ten%20(2011)%22,%22p%22:%22Priorit%C3%A4t%22%7D,%7B%22t%22:%22rco%22,%22n%22:%22ZH%20AP%20FM%20(2010)%22,%22p%22:%22Biotopbindung%22,%20%22rt%22:%22Art%20ist%20an%20Lebensraum%20gebunden%22%7D%5D">https://api.arteigenschaften.ch/alt?fields=[{"t":"tax","n":"SISF (2005)","p":"Artname vollständig"},{"t":"pco","n":"CH Prioritäten (2011)","p":"Priorität"},{"t":"rco","n":"ZH AP FM (2010)","p":"Biotopbindung", "rt":"Art ist an Lebensraum gebunden"}]</a>
  <br/>

Beispiele für die Tests 2020:
- <a href="http://167.172.187.231:4000/alt?fields=%5B%7B%22t%22:%22pco%22,%22n%22:%22CH%20Priorit%C3%A4ten%20(2011)%22,%22p%22:%22Priorit%C3%A4t%22%7D%5D">http://167.172.187.231:4000/alt?fields=[{"t":"pco","n":"CH Prioritäten (2011)","p":"Priorität"}]</a>
- <a href="http://167.172.187.231:4000/alt?fields=%5B%7B%22t%22:%22tax%22,%22n%22:%22Taxonomie%22,%22p%22:%22Artname%20vollst%C3%A4ndig%22%7D,%7B%22t%22:%22pco%22,%22n%22:%22CH%20Priorit%C3%A4ten%20(2011)%22,%22p%22:%22Priorit%C3%A4t%22%7D%5D">http://167.172.187.231:4000/alt?fields=[{"t":"tax","n":"Taxonomie","p":"Artname vollständig"},{"t":"pco","n":"CH Prioritäten (2011)","p":"Priorität"}]</a>
- <a href="http://167.172.187.231:4000/alt?fields=%5B%7B%22t%22:%22tax%22,%22n%22:%22SISF%20(2005)%22,%22p%22:%22Artname%20vollst%C3%A4ndig%22%7D,%7B%22t%22:%22pco%22,%22n%22:%22CH%20Priorit%C3%A4ten%20(2011)%22,%22p%22:%22Priorit%C3%A4t%22%7D,%7B%22t%22:%22rco%22,%22n%22:%22ZH%20AP%20FM%20(2010)%22,%22p%22:%22Biotopbindung%22,%20%22rt%22:%22Art%20ist%20an%20Lebensraum%20gebunden%22%7D%5D">http://167.172.187.231:4000/alt?fields=[{"t":"tax","n":"SISF (2005)","p":"Artname vollständig"},{"t":"pco","n":"CH Prioritäten (2011)","p":"Priorität"},{"t":"rco","n":"ZH AP FM (2010)","p":"Biotopbindung", "rt":"Art ist an Lebensraum gebunden"}]</a>
  <br/><br/>

## 2 EvAB

### Art-Eigenschaften abholen

- bisher: http://arteigenschaften.ch/artendb/_design/artendb/_list/export_evab/evab_arten?include_docs=true
- neu: https://api.arteigenschaften.ch/evab
- für die Tests 2020: http://167.172.187.231:4000/evab

## 3 GraphQL

Unter https://api.arteigenschaften.ch/graphql befindet sich eine GraphQL-Daten-Schnittstelle. Benutzer-Oberfläche und Dokumentation sind in der Anwendung über das Mehr-Menü oben rechts erreichbar oder auf [https://api.arteigenschaften.ch/graphiql](https://api.arteigenschaften.ch/graphiql).

Diese GraphQL-Schnittstelle wird auch von arteigenschaften.ch selber benutzt. Sie kann daher sehr viel, solange man sich mit ausreichenden Benutzerrechten anmeldet.
