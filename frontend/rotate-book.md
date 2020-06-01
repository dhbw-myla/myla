# Drehbuch für Präsentation und Video

alternativ: Turn-Book?

ToDo's:

* [x] Surveycode in Popup, dass Survey Code nicht existiert -- RENE: was damit gemeint? SurveyCode nochmal in die Errormeldung? wozu? -- Niko: Gedächtnis wie nen Sieb? Ging darum, dass meistens "Survey Code" da steht, aber in der Fehlermeldung auf der Startseite "Surveycode"...
* [x] Titel vom survey master paradise?! &rarr; uns fällt gerade nichts ein :-(
* [x] It's now live for 7 days
* [x] Anzahl bei 0 nicht anzeigen!!!!111elf
* [x] Survey master buttons: nur relevante buttons anzeigen, spacing, abstand zwischen icon und zahl
* [ ] :o2: Max Größe Cards? -- RENE: nö.
* [x] copy survey (frischer survey master)
* [x] active surveys &rarr; published surveys
* [ ] :question: **BACK-END**: zehn Zeichen für surey code? bereits bei 4 zeichen hätten wir knapp 15 Mio. verschiedene Codes (62^4) -- RENE: sind zu lange oder? sieht dann im Frontend kacke aus und so reicht auch erstmal aus...
* [x] Change password &rarr; go back automatically?
* [x] Change password &rarr; session id muss überschrieben werden, bzw. alles was da zurück kommt
* [x] users space (korrekter titel?) &rarr; Suchfunktion
* [x] survey master &rarr; Suchfunktion
* [x] promote to admin cancel schön machen
* [ ] **MARTIN/ERIK**: survey master title in **results**
* [ ] **MARTIN/ERIK**: UND DESSGRIBSCHEN
* [x] copy survey link to clipboard (entweder package oder schnell selbst mit ein paar zeilen code und invisible input)
* [x] store survey code in local storage after completion &rarr; show that already participated
* [x] survey participate seite neuladen, history nicht gesetzt, complete, bei url &rarr; vielleicht in backlog
* [ ] **MARTIN/ERIK**: in legenden in klammern die anzahl, z. B. true (2), false (4)
* [ ] **MARTIN/ERIK**: results tailnehmärantsaal, im survey-object gibt es dann das feld `participations`
* [x] **BACK-END**: number of survey participations
* [ ] **MARTIN/ERIK**: pro frage nochmal summe der antworten :poop:
* [ ] **MARTIN/ERIK**: results-ansicht: abgerundete ecken (nicht kanten!!!!!! kanten sind halt glatt!)
* [x] neuen user anlegen &rarr; man sollte auf admin space zurückkehren
* [ ] :o2: register key &rarr; input type password oder type text?! -- RENE, Sascha: bleibt so.s
* [x] **BACK-END**: Admin erstellt Nutzer &rarr; requestPasswordChange muss true sein
* [x] **BACK-END**: username case insensitive (irgendwie im auth helper ersetzen)
* [ ] i18n (zumindest faken) -- RENE: sollten wir gemeinsam drüber reden.
* [x] blaue Umrandung der search box
* [x] buttons back &rarr; User, Survey Master

Präsentation:

1. Vorgefundene Grundlage :poop:
   1. Kabarettartiges Kritisieren, Rene spielt Comedian
   2. Kein Repo, keine technische Doku, keine Grundlage
   3. fachliche und objektive Kritik
   4. Firebase in Bezug auf sensitive Daten kritisch, da externe Cloud-Lösung
2. Anforderungen
   1. Orientiert sich an Doku von Julian
3. Konzept (ähnlich zur Arbeit)

4. Intermezzo (Video unlisted auf YouTube hochladen):
   1. Graphischer Einstieg mit Survey Results &rarr; Wie bin ich eigentlich hier her gekommen?
   2. Sendung mit der Maus, Wissen macht Ah, Wissen vor Acht, How I Met Your Mother, Harald Lesch
   3. Nutzer registrieren
   4. Übersicht, noch nix da
   5. Template / Survey Master anlegen (&rarr; entsprechendes Konzept erklären)
      1. Projektmanagement
      2. will jedes Jahr von den Leuten wissen, was sie verstanden haben und wie ihr Feedback war &rarr; überwiegend Emotionen/Gefühle
      3. krasse Fragetypen nur kurz anteasern, aber für unseren Anwendungsfall nicht relevant, daher nehmen wir Single-Choice, Multiple-Choice, ...
      4. Fragen und Fragetypen:
         1. TODO: z. B. Vorkenntnisse, Erwartungen, Learning/Fortschritt, Zufriedenheit, Verbesserungsvorschläge, ...
   6. Kurz Rechtschreibfehler im Titel korrigieren; Description ergänzen
      1. Löschen eines Masters
      2. Warum geht Editieren/Löschen nur wenn keine Surveys existieren? &rarr; ergibt wenig Sinn Fragen zu ändern, wenn die schon beantwortet wurden...
   7. Publish Survey (z. B. WWI17SEB Projektmanagement und WWI18SCA Projektmanagement)
   8. Active (Published) Survey
      1. Hier auf Code eingehen &rarr; auf rote Schrift und "letter-spacing" eingehen
      2. Code kopieren und partizipieren
   9. (Abmelden)
   10. Code auf Startseite eintippen und teilnehmen (Handy-Ansicht) &rarr; einfach hochkant monitor, dass es groß genug is und gut aussieht lol
   11. Nutzer einloggen
   12. Active (Published) Surveys, Ergebnisse anzeigen
   13. Administration (Admin Space)
        1. Registrierung nur für ausgewählte Nutzer
           1. ihr habt ihn vergessen
           2. ihr wollt ihn ändern, weil er nach außen gedrungen ist
        2. Neuen Nutzer anlegen
           1. vermeiden, Register Key zu teilen, z. B. externe Dozenten
           2. &rarr; wir melden uns mit neu erstelltem Nutzer an und zeigen Passwortänderungsaufforderung und -durchführung
        3. Alle Nutzer einsehen
           1. Welche Nutzer existieren?
           2. Passwort vergessen? &rarr; Passwortänderungsaufforderung
           3. zum Administrator machen (Entfernen der Rechte nicht möglich, da der andere die eigenen Admin-Rechte sonst entfernen könnte)
   14. My Account
        1. Change Password
        2. Verlinkungen zu Surveys und Survey Master
   15. Wenn man fertig mit allem ist: Logout
5. tl;dw kurze Video-Zusammenfassung (User-Journey-Screenshots)
6. Gibbet Fragen?
7. (optional minimale Live-Demo; nur einfache Sachen, im Zweifel gibt es Verbindungsprobleme)
8. Was für Technologien wurden genutzt?
   1. Grober Überblick der Architektur
   2. PostgreSQL, Node.js, React
9. Zusammenfassung: Was ist das Ergebnis?
   1. Bekannte Technologien aus Studium, aktuelles Framework (React)
   2. Vergleich zur Vorprojekt
   3. Ordentliche Doku
   4. GitHub-Organisation und Repository, an dem weitergearbeitet werden kann
   5. Vorgänger - ist unser +
   6. Eigene Datenbank (PostgreSQL) &rarr; keine öffentliche Cloud
   7. Erfüllung von Datenschutzanforderungen und daher auch über DHBW hostbar; mit Docker &rarr; problemlos möglich
   8. Projekt steht unter MIT-Lizenz und kann daher von Nachfolgern problemlos weiterentwickelt werden, ohne rechtliche Grauzonen zu betreten
