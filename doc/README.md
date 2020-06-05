# Integrationsseminar 

## Inhaltsverzeichnis

1. Einleitung
   1. Motivation und Hintergrund
   1. Zielsetzung
   1. Aufbau
1. Grundlagen
   1. Theoretische Grundlagen
      1. REST
      1. Microservices
      1. Fragebogen
      1. Prototyping
      1. Relationale Datenbanken
      1. Learning Analytics
   1. Technische Grundlagen
      1. Docker
      1. PostgreSQL
      1. React
1. Anforderungsanalyse
   1. Ist-Analyse # Analyse des "alten Systems"
   1. Anforderungen # erst Text und dann in Tabellenform
   1. Abgrenzung zu Alternativen # Moodle + ?
1. Konzeption # Verlinkungen zu den Anforderungen einfügen
   1. Gesamtkonzept # alles einmal kurz
      1. Architektur
      1. Server
      1. Client
   1. Personas
      1. Dozent
      1. Student
      1. ...?
   1. User-Journey
   1. Bestandteile des Servers
      1. Datenhaltung/Datenmodell
      2. Schnittstelle
   1. Client
      1. Unterteilung der Gliederungsansichten
      1. Bestimmung von Darstellungsformen
   1. Sicherheit
      1. Authentifizierung
      2. Datenschutz
2. Implementierung
   1. Server
      1. Geschäftslogik
      2. Datenhaltung # warum PostgreSQL?
      3. Schnittstelle
   2. Client
      1. Auswahl der Visualisierungs-Bibliothek
      2. Startansicht # plus jede weitere Ansicht
   3. Sicherheit
      1. Zugriffskontrolle
3. Fazit und Ausblick
   1. Fazit # Vergleich zum Altsystem (Repo, Doku -> nicht nur "fancy Demo", die unnutzbar ist)
   2. Ausblick

## Aufteilung der Kapitel

| Kapitel/Abschnitt              | Niko               | Sascha                  | Rene                    | Martin                  | Erik                    | Julian       | Kommentar                                               |
| ------------------------------ | ------------------ | ----------------------- | ----------------------- | ----------------------- | ----------------------- | ------------ | ------------------------------------------------------- |
| **<u>Einleitung</u>**          |                    |                         |                         |                         |                         | :red_circle: |                                                         |
| Motivation und Hintergrund     |                    |                         |                         |                         |                         | :red_circle: |                                                         |
| Zielsetzung                    |                    |                         |                         |                         |                         | :red_circle: |                                                         |
| Aufbau                         |                    |                         |                         |                         |                         | :red_circle: |                                                         |
| **<u>Grundlagen</u>**          |                    |                         |                         |                         |                         |              |                                                         |
| Theoretische Grundlagen        |                    |                         |                         |                         |                         |              |                                                         |
| ____REST                       |                    |                         | :white_check_mark:      | :white_check_mark:      |                         |              |                                                         |
| ____Microservices              |                    |                         |                         | :white_check_mark:      |                         |              |                                                         |
| ____Fragebogen                 |                    |                         |                         |                         | :ballot_box_with_check: |              |                                                         |
| ____Prototyping                |                    |                         |                         | :white_check_mark:      |                         |              |                                                         |
| ____Relationale Datenbanken    |                    | :white_check_mark:      | :white_check_mark:      |                         |                         |              |                                                         |
| ____Learning Analytics         |                    |                         | :ballot_box_with_check: | :ballot_box_with_check: | :ballot_box_with_check: |              |                                                         |
| Technische Grundlagen          |                    |                         |                         |                         |                         |              |                                                         |
| ____Docker                     |                    |                         |                         | :white_check_mark:      |                         |              |                                                         |
| ____PostgreSQL                 |                    | :red_circle:            | :red_circle:            |                         |                         |              |                                                         |
| ____React                      |                    | :ballot_box_with_check: |                         |                         |                         |              |                                                         |
| **<u>Anforderungsanalyse</u>** |                    |                         |                         |                         |                         |              |                                                         |
| Ist-Analyse                    |                    |                         | :red_circle:            |                         |                         | :red_circle: |                                                         |
| Anforderungen                  |                    |                         |                         |                         |                         | :red_circle: |                                                         |
| Abgrenzung zu Alternativen     |                    |                         |                         |                         |                         | :red_circle: |                                                         |
| **<u>Konzeption</u>**          |                    |                         |                         |                         |                         |              |                                                         |
| Gesamtkonzept                  |                    |                         |                         |                         |                         |              |                                                         |
| ____Architektur                |                    |                         | :ballot_box_with_check: |                         |                         |              |                                                         |
| ____Server                     | :red_circle:       |                         |                         |                         |                         |              |                                                         |
| ____Client                     |                    | :ballot_box_with_check: |                         |                         |                         |              |                                                         |
| Bestandteile des Servers       |                    |                         |                         |                         |                         |              |                                                         |
| ____Datenhaltung/Datenmodell   | :red_circle:       |                         |                         |                         |                         |              |                                                         |
| ____Schnittstelle              | :red_circle:       |                         |                         |                         |                         |              |                                                         |
| Client                         |                    |                         |                         | :white_check_mark:      | :white_check_mark:      |              |                                                         |
| Sicherheit                     |                    |                         |                         |                         |                         |              |                                                         |
| ____Authentifizierung          | :white_check_mark: |                         |                         |                         |                         |              |                                                         |
| ____Datenschutz                | :question:         |                         | :question:              |                         |                         |              | Beschreibung inwiefern das für das Projekt wichtig ist. |
| **<u>Implementierung</u>**     |                    |                         |                         |                         |                         |              |                                                         |
| Docker-Netzwerk                |                    |                         |                         | :ballot_box_with_check: |                         |              |                                                         |
| Server                         |                    |                         |                         |                         |                         |              |                                                         |
| ____Geschäftslogik             | :red_circle:       |                         |                         |                         |                         |              |                                                         |
| ____Datenhaltung               | :red_circle:       |                         |                         |                         |                         |              |                                                         |
| ____Schnittstelle              | :red_circle:       |                         |                         |                         |                         |              |                                                         |
| Client                         |                    |                         |                         |                         |                         |              |                                                         |
| ____Diverses                   |                    | :ballot_box_with_check: |                         |                         |                         |              |                                                         |
| Sicherheit                     |                    |                         |                         |                         |                         |              |                                                         |
| ____Zugriffskontrolle          | :red_circle:       | :red_circle:            |                         |                         |                         |              |                                                         |
| **<u>User-Journey</u>**        |                    |                         |                         |                         |                         |              |                                                         |
| Personas                       |                    |                         |                         |                         |                         |              |                                                         |
| ____Dozent                     |                    |                         | :ballot_box_with_check: | :ballot_box_with_check: | :ballot_box_with_check: |              |                                                         |
| ____Student                    |                    |                         | :ballot_box_with_check: | :ballot_box_with_check: | :ballot_box_with_check: |              |                                                         |
| ____Student_Umfrageersteller   |                    |                         | :ballot_box_with_check: | :ballot_box_with_check: | :ballot_box_with_check: |              |                                                         |
| User-Journey                   |                    | :red_circle:            | :red_circle:            |                         |                         |              | Screenshots mit Markierung + BPMN                       |
| **<u>Fazit und Ausblick</u>**  |                    |                         |                         |                         |                         |              |                                                         |
| Fazit                          |                    |                         |                         |                         |                         |              |                                                         |
| Ausblick                       |                    |                         |                         |                         |                         |              |                                                         |

Legende:
- :red_circle: verantwortlich/Interesse, aber noch kein nennenswerter Fortschritt
- :soon: in progress
- :ballot_box_with_check: grundlegend fertig, jedoch noch 1-n TODOs
- :white_check_mark: fertig
- :ok: fertig und reviewed / final

Symbole:
- :red_circle: `:red_circle:`
- :question: `:question:`
- :interrobang: `:interrobang:`
- :white_check_mark: `:white_check_mark:`
- :heavy_check_mark: `:heavy_check_mark:`
- :ballot_box_with_check: `:ballot_box_with_check:`
- :o: `:o:`
- :x: `:x:`
- :zero: `:zero:`
- :one: `:one:`
- :keycap_ten: `:keycap_ten:`
- :ok: `:ok:`
- :soon: `:soon:`
