# Inhaltsverzeichnis

1. Einleitung
   1. Motivation und Hintergrund
   1. Zielsetzung
   1. Aufbau
1. Grundlagen
   1. Theoretische Grundlagen
      1. REST
      1. Microservices
      1. Fragebogen
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
      1. Datenschutz
      1. Verschlüsselung?
1. Implementierung
   1. Server
      1. Geschäftslogik
      1. Datenhaltung # warum PostgreSQL?
      1. Schnittstelle
   1. Client
      1. Auswahl der Visualisierungs-Bibliothek
      1. Startansicht # plus jede weitere Ansicht
   1. Sicherheit
      1. Zugriffskontrolle
      1. Kommunikation zwischen Client und Server?
      1. Validierung der Übergabeparameter?
1. Fazit und Ausblick
   1. Fazit # Vergleich zum Altsystem (Repo, Doku -> nicht nur "fancy Demo", die unnutzbar ist)
   1. Ausblick

Kapitel/Abschnitt | Niko | Sascha | Rene | Martin | Erik | Julian | Kommentar
--- | --- | --- | --- | --- | --- | --- | ---
**<u>Einleitung</u>**                         | | | | | | |
Motivation und Hintergrund                    | | | | | | |
Zielsetzung                                   | | | | | | |
Aufbau                                        | | | | | | |
**<u>Grundlagen</u>**                         | | | | | | |
Theoretische Grundlagen                       | | | | | | |
- - REST                                      | | | :red_circle: | :red_circle: | | |
- - Microservices                             | | | | :red_circle: | | |
- - Fragebogen                                | | | | | :red_circle: | |
- - Relationale Datenbanken                   | | | | | | |
- - Learning Analytics                        | | | :red_circle: | | | |
Technische Grundlagen                         | | | | | | |
- - Docker                                    | | | | :red_circle: | | |
- - PostgreSQL                                | | | | | | |
- - React                                     | | | | | | |
**<u>Anforderungsanalyse</u>**                | | | | | | |
Ist-Analyse                                   | | | | | | |
Anforderungen                                 | | | | | | |
Abgrenzung zu Alternativen                    | | | | | | |
**<u>Konzeption</u>**                         | | | | | | |
Gesamtkonzept                                 | | | | | | |
- - Architektur                               | | | | | | |
- - Server                                    | :red_circle: | | | | | |
- - Client                                    | | | | | | |
Personas                                      | | | | | | |
- - Dozent                                    | | | | | | |
- - Student                                   | | | | | | |
User-Journey                                  | | | | | | |
Bestandteile des Servers                      | | | | | | |
- - Datenhaltung/Datenmodell                  | :red_circle: | | | | | |
- - Schnittstelle                             | :red_circle: | | | | | |
Client                                        | | | | | | |
- - Unterteilung der Gliederungsansichten     | | | | | | |
- - Bestimmung von Darstellungsformen         | | | | | | |
Sicherheit                                    | | | | | | |
- - Authentifizierung                         | :red_circle: | | | | | |
- - Datenschutz                               | | | | | | |
- - Verschlüsselung?                          | | | | | | |
**<u>Implementierung</u>**                    | | | | | | |
Server                                        | | | | | | |
- - Geschäftslogik                            | :red_circle: | | | | | |
- - Datenhaltung                              | :red_circle: | | | | | |
- - Schnittstelle                             | :red_circle: | | | | | |
Client                                        | | | | | | |
- - Auswahl der Visualisierungs-Bibliothek    | | | | | | |
- - Startansicht                              | | | | | | |
Sicherheit                                    | | | | | | |
- - Zugriffskontrolle                         | :red_circle: | | | | | |
- - Kommunikation zwischen Client und Server? | | | | | | |
- - Validierung der Übergabeparameter?        | | | | | | |
**<u>Fazit und Ausblick</u>**                 | | | | | | |
Fazit                                         | | | | | | |
Ausblick                                      | | | | | | |

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