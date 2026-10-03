# Changelog

## 2026-10-03

### Config — Deutsch als Standardsprache

**Symptom / Description**
Beim ersten Besuch (noch keine Sprache im `localStorage`) startete die Seite auf Englisch.
Ziel: Erstbesucher sehen die Seite auf Deutsch.

**Fix / Change**
- Fallback-Sprache in `LanguageProvider` von `'en'` auf `'de'` gestellt. Eine bereits
  gespeicherte Sprachwahl bleibt erhalten. Wer schon einmal eine Sprache gewählt hat, sieht
  also weiterhin diese.
- `<html lang>` in `index.html` auf `de` gesetzt. So stimmt das Attribut schon vor dem Laden
  von React, was Suchmaschinen und Screenreadern hilft.
- Die Fallback-Kette für einzelne fehlende Übersetzungen bleibt Englisch (`t()`).

**Affected Files**
- `src/LanguageContext.tsx` — Standardsprache `de`
- `index.html` — `lang="de"`
- `README.md` — Abschnitt Internationalisierung angepasst

### Content — Rechtsform GbR, Impressum mit Gesellschaftern, keine erfundenen Zertifikate

**Symptom / Description**
Die Seite firmierte als „Zenomix Services UG (haftungsbeschränkt)“. Das Unternehmen ist aber
eine **nicht eingetragene GbR** namens **Zenomix GbR**, vertreten durch die Gesellschafter
Alan Abbas und Mounzer Annouz. Im Kontaktbereich standen „ISO 9001:2015“ und
„SCS-GREEN-902“, beides hat das Unternehmen nicht, und beides stand unter falschen
Überschriften („Max. Gewicht“, „Einsatzgebiet“). Der Instagram-Link zeigte auf
`instagram.com/yourinstagram`.

**Fix / Change**
- Firmenname in EN/DE/AR auf „Zenomix GbR“ umgestellt: Hero, Über uns, Footer-Slogan,
  Copyright und Impressum. Das Über-uns-Badge lautet jetzt nur „Über Zenomix“.
- Impressum:
  - Gesellschafter als Vertretungsberechtigte eingetragen.
  - Registerabschnitt entfernt, weil eine nicht eingetragene GbR kein Registergericht und
    keine Registernummer hat. Hinweis: Für Emden wäre das Registergericht ohnehin das
    Amtsgericht Aurich, nicht das Amtsgericht Emden.
  - „§ 5 TMG“ auf „§ 5 DDG“ aktualisiert. Das Digitale-Dienste-Gesetz hat das TMG im Mai 2024
    abgelöst.
  - Der Platzhalter für die USt-IdNr. bleibt, bis die Nummer nachgereicht wird.
- Kontaktbereich: „ISO 9001:2015“ und „SCS-GREEN-902“ durch echte Angaben ersetzt, nämlich
  max. Gewicht 3,5 t und Einsatzgebiet „Deutschlandweit“. Dafür gibt es die neuen Keys
  `contact_iso_rating_val` und `contact_eco_license_val` in EN/DE/AR.
- Instagram-Icon in Navbar (Desktop und Mobil) und Footer ohne Link, nur noch als Icon. Hover-
  und Klick-Optik entfernt.

**Affected Files**
- `src/translations.ts` — Firmenname, Über-uns-Badge, neue Werte für den Kontaktbereich
- `src/components/Impressum.tsx` — GbR, Gesellschafter, Registerabschnitt entfernt, § 5 DDG
- `src/components/Contact.tsx` — echte Werte statt ISO-/SCS-Angaben
- `src/components/Navbar.tsx` — Instagram ohne Link (2×)
- `src/components/Footer.tsx` — Instagram ohne Link
- `README.md` — Firmenname, Impressum-/GbR-Hinweise, Instagram-Hinweis, § 5 DDG

### Content — Neue Kontaktdaten: Telefon, E-Mail, Adresse in Emden und WhatsApp-Link

**Symptom / Description**
Telefonnummer und Anschrift standen auf der Seite nur als Platzhalter
(`[Telefonnummer eintragen]`, `[Straße und Hausnummer]` …). Statt einer E-Mail-Adresse stand
nur „Zenomix.de“ da. Der WhatsApp-Link führte auf eine alte Nummer (`+49 172 2970140`).
Aktuell gelten: **+49 1577 7268389**, **info@zenomix.de** und
**Dithmarscher Straße 19, 26723 Emden**.

**Fix / Change**
- Telefonnummer, E-Mail und Adresse in EN/DE/AR eingetragen: Kontaktbereich
  (Firmensitz/Anfragen/Telefon), Footer („Kontakt & Disposition“, Desktop und Mobil) und
  Impressum.
- WhatsApp-Links in Navbar (Desktop und Mobil) und Footer auf `wa.me/4915777268389` umgestellt.
- Telefonnummer und E-Mail im Kontaktbereich und im Footer als `tel:`- bzw. `mailto:`-Link
  anklickbar gemacht, mit `dir="ltr"`. Sonst würde das RTL-Layout auf Arabisch die
  Ziffernblöcke umdrehen („7268389 1577 49+“).
- Im arabischen Impressum Nummer, E-Mail und Adresse mit Unicode-Isolates (`⁦…⁩`)
  eingefasst, weil sie dort mitten im arabischen Fließtext stehen.

**Affected Files**
- `src/translations.ts` — `contact_office_val` und `contact_hotline_val` in EN/AR/DE
- `src/components/Impressum.tsx` — Anschrift, Telefon und E-Mail in EN/AR/DE
- `src/components/Contact.tsx` — Telefon als `tel:`-Link, E-Mail als `mailto:`-Link
- `src/components/Footer.tsx` — WhatsApp-Link, Telefon als `tel:`- und E-Mail als `mailto:`-Link
- `src/components/Navbar.tsx` — beide WhatsApp-Links auf die neue Nummer
- `README.md` — Hinweis zu Platzhaltern aktualisiert, Fundstellen von Telefonnummer und
  E-Mail aufgelistet

### Content — Neues Leistungsspektrum: Logistik, Flotten- & Schichtmanagement, Kurier- & Paketdienst, Umzugshilfe

**Symptom / Description**
Das Service-Grid auf der Startseite zeigte Kurier- & Paketdienst, Personenbeförderung,
Krankenfahrten und Flotten- & Schichtmanagement. Personenbeförderung und Krankenfahrten werden
nicht mehr angeboten. Neu sind Logistik und Umzugshilfe. Das Grid soll von oben links nach
unten rechts lauten: Logistik · Flotten- & Schichtmanagement · Kurier- & Paketdienst ·
Umzugshilfe. Die gesamte Seite soll in allen drei Sprachen (EN/DE/AR) dazu passen.

**Fix / Change**
- Service-Karten in der neuen Reihenfolge (`logistics`, `fleet-management`, `courier`,
  `moving`) in EN/DE/AR, jeweils mit Kurz- und Langtext, vier Leistungsmerkmalen und Specs:
  - **Logistik**: feste Zustelltouren als Subunternehmer für B2B-Netzwerke, Teilladungen bis
    1.200 kg, Vertretung und Spitzenkapazität. Der Subunternehmer-Teil wurde aus der alten
    Kurier-Karte hierher verschoben.
  - **Kurier- & Paketdienst**: jetzt klar abgegrenzt auf Direktfahrten am selben Tag, Pakete,
    Dokumente und einzelne Paletten.
  - **Umzugshilfe**: Transporter bis 3,5 t mit Fahrer, Tragehelfer, Möbel-Ab- und -Aufbau,
    Privat-, Büro- und Firmenumzüge.
- Neue Icons `Route`, `Package` und `Sofa` im Service-Renderer, die nicht mehr genutzten
  `Users` und `HeartPulse` entfernt.
- Alle Erwähnungen von Personenbeförderung und Krankenfahrten ersetzt: Hero-Badge und
  -Untertitel („Transport & Logistik“ statt „Mobilität“), Services-Untertitel,
  Versicherungshinweis, Über uns, Kontakt-Untertitel, FAQ (Frage 3 jetzt zur Umzugshilfe,
  Antwort 5 angepasst), Footer-Slogan und -Zeile.
- Kontaktformular: Betreff-Optionen entsprechen jetzt den vier Services. Die Keys heißen jetzt
  `contact_topic_logistics`, `contact_topic_fleet`, `contact_topic_courier` und
  `contact_topic_moving` (vorher `highval`, `relay`, `carbon`).
- Fuhrpark: „Care Mobil“ (rollstuhlgerecht) durch einen Koffer-Transporter mit Ladebordwand
  ersetzt, inklusive neuer SVG-Silhouette. Der Filter-Tab heißt jetzt „Koffer & Elektro“.
- Kundenstimmen 2 und 3 auf Büroumzug und Kurier-Direktfahrt umgestellt.
- Tracking-Demos `ZN-104-C8` und `ZN-334-D9` zeigen jetzt einen Privat- bzw. Büroumzug statt
  einer Schichtfahrt und einer Krankenfahrt.

**Affected Files**
- `src/data.ts` — EN-Services, Fuhrpark, Kundenstimmen, Tracking-Demos
- `src/translations.ts` — EN/AR/DE-UI-Texte sowie AR/DE-Services, Fuhrpark, Kundenstimmen
  und Tracking-Demos
- `src/components/Services.tsx` — Icon-Mapping für die neuen Services
- `src/components/Contact.tsx` — Betreff-Optionen und neue Translation-Keys
- `src/components/Fleet.tsx` — SVG für den Koffer-Transporter statt des Patientenfahrzeugs
- `README.md` — Intro, Feature-Tabelle und Demo-Daten nachgezogen

## 2026-08-19

### Config — Automatischer Deploy auf die eigene Domain zenomix.de

**Symptom / Description**
Die Seite war auf GitHub Pages unter dem Sub-Pfad `/ZENOMIX/` konfiguriert und musste von
Hand mit `npm run deploy` (gh-pages) veröffentlicht werden. Ein `gh-pages`-Branch existierte
auf dem Remote noch gar nicht. Mit der gekauften Domain `zenomix.de` soll die Seite im
Domain-Root laufen und bei jedem Push auf `main` automatisch neu deployed werden.

**Fix / Change**
Deploy auf GitHub Actions umgestellt und den Sub-Pfad entfernt:

- Neuer Workflow `.github/workflows/deploy.yml` — läuft bei Push auf `main` und per
  `workflow_dispatch`: `npm ci` → `npm run lint` → `npm run build`, dann Upload von `dist/`
  als Pages-Artefakt und Deploy über `actions/deploy-pages`. `npm run lint` ist damit ein
  Release-Gate: ein Typfehler verhindert den Deploy. `concurrency: pages` mit
  `cancel-in-progress: false` verhindert überlappende Deploys.
- `base` von `'/ZENOMIX/'` auf `'/'` — die Assets werden jetzt absolut ab Root referenziert.
  Das per `import.meta.env.BASE_URL` geladene Hero-Video folgt automatisch.
- `public/CNAME` mit `zenomix.de` angelegt, wird in jeden Build kopiert.
- `homepage` auf `https://zenomix.de` gesetzt (zeigte vorher auf
  `MohamedFirasAlfarra.github.io/ZENOMIX`, was nicht zum Remote `m-alzhouri/ZENOMIX` passte).
- `predeploy`/`deploy`-Skripte und die `gh-pages`-devDependency entfernt — der manuelle Pfad
  hätte sonst mit falschem Base-Pfad gebaute Stände in einen `gh-pages`-Branch schieben können.

Das hand-gerollte Routing ändert die URL nie (`pushState` behält `window.location.href`), es
gibt also keine Deep-Links und keinen Bedarf für ein SPA-404-Fallback.

Noch manuell zu erledigen: in *Settings → Pages* die Source auf **GitHub Actions** und die
Custom Domain auf `zenomix.de` stellen, sowie die DNS-Records bei united-domains setzen
(vier A-Records auf 185.199.108–111.153, CNAME `www` → `m-alzhouri.github.io.`).

**Affected Files**
- `.github/workflows/deploy.yml` — neu; Build- und Deploy-Pipeline für GitHub Pages
- `vite.config.ts` — `base` auf `'/'` für den Domain-Root
- `public/CNAME` — neu; Custom Domain für GitHub Pages
- `package.json` — `homepage` auf die Domain, `predeploy`/`deploy` und `gh-pages` entfernt
- `package-lock.json` — Lockfile nach Entfernen von `gh-pages`
- `README.md` — Deployment-Abschnitt neu (Workflow, Domain-Konfiguration, Repo-Setup,
  DNS-Tabelle), Intro-Link, Tech-Stack, Skript-Tabelle und Projektstruktur nachgezogen
- `CLAUDE.md` — Commands, Base-Pfad-Trap, homepage/remote-Widerspruch und "kein CI" aktualisiert

## 2026-08-19

### Docs — README brought in line with the repositioning

**Symptom / Description**
`README.md` still described the previous positioning after the repositioning landed: a
global freight forwarder with Express Last-Mile, Heavy Freight, Air & Ocean and Smart
Warehousing services, a calculator in lbs/miles with a $25 minimum, fleet filters for
heavy/medium/light+electric, and a demo-data table of intercontinental shipments. None of
that existed in the code any more.

**Root Cause**
The repositioning commit changed the app but not its documentation.

**Fix / Change**
Rewrote every section of the README that described behaviour: intro, the Features table
(services, calculator, route & shift overview, fleet), the demo-data table and calculator
rules, the footer-placeholder note and the caveat about company identity data. Added
`CHANGELOG.md` to the project-structure tree.

Also added a **Mandatory: README** rule to `CLAUDE.md`, next to the existing changelog
rule: the README is updated as part of any change that alters what the app is or how it
works — not raised as a suggestion afterwards.

**Affected Files**
- README.md — intro, Features table, Demo data, Contact form, Notes and known caveats,
  project structure.
- CLAUDE.md — new "Mandatory: README" section.

### Content — Repositioning to Zenomix Services UG (light-commercial transport, up to 3.5 t)

**Symptom / Description**
The site presented Zenomix as a global multi-modal freight forwarder: heavy line-haul
tractors, FTL/LTL truckload, ocean containers, air charter and smart warehousing. That
does not describe Zenomix Services UG, which operates exclusively with vehicles under
3.5 t (Sprinters, panel vans, cars) and offers courier/parcel work, passenger transport,
non-emergency patient journeys and its own driver/shift management software.

**Fix / Change**
Full copy rewrite across all three languages, keeping the existing design, layout,
section structure, ids and component shapes untouched.

- **Positioning.** New core message: *"Wir übernehmen alle Transportaufgaben im leichten
  Nutzfahrzeugbereich."* Every mention of heavy freight, trucks, ocean, air and
  warehousing removed. The FAQ now states explicitly that haulage above 3.5 t is *not*
  offered.
- **Services** (4 cards, same layout): Kurier- & Paketdienst (incl. subcontracting for
  B2B logistics networks) · Personenbeförderung & Mobilität · Krankenfahrten &
  Patiententransport (non-qualified, seated/wheelchair, no medical care on board —
  deliberately not framed as the company's core identity) · Flotten- & Schichtmanagement.
- **Tracker section reframed.** Was a parcel tracker; is now a *Touren- und
  Schichtübersicht*. The brief states the in-house software organises drivers and shifts,
  not parcel tracking, so a package-tracking demo would have contradicted it. The same
  fields are reused semantically (origin → Startdepot, sender → Auftraggeber, receiver →
  Fahrzeug & Fahrer, ETA → geplantes Tourende). Demo IDs are unchanged.
- **Calculator reworked** for the light-commercial segment: tiers are now Direktfahrt /
  Regeltour / Nachtexpress / Sammeltour (were last-mile / ground FTL / air / ocean).
  Units converted from lbs and miles to **kg and km** (weight slider 1–1,200 kg, distance
  5–800 km), currency from `$` to `€` with locale-aware number formatting. Rates were
  re-scaled to the new units; the 750 ms simulated delay and the €25 minimum are kept.
- **Fleet** is now four vehicles under 3.5 t: Sprinter Maxi (3.5 t), Cargo Kastenwagen,
  Care Mobil (wheelchair-accessible passenger/patient transport) and E-Kurier. Specs are
  metric (kg, m³, km). Two inline SVG silhouettes were redrawn: the `heavy` slot was an
  articulated tractor-trailer (now a high-roof panel van with a single rear axle) and the
  `light` slot was a cargo e-bike (now a minibus with boarding ramp and wheelchair
  symbol). The `FleetVehicle.type` union is unchanged — the keys are internal.
- **About** narrative rewritten around the 3.5 t focus and the in-house shift planning.
  The two headline stats were fabricated fleet figures (`45,000+` assets) and are now
  `100 %` vehicles under 3.5 t and `24/7` digital shift & route planning.
- **Testimonials** rewritten as German B2B references (still fictional placeholders).

### Improvement — Hardcoded `isRtl` content strings migrated to `t()`

**Symptom / Description**
Per CLAUDE.md, dozens of user-facing strings were written as `isRtl ? '<arabic>' :
'<english>'`, which silently served **English to German visitors**. `Calculator.tsx` was
the worst case: essentially its entire UI, including all four tier names and both slider
scales.

**Root Cause**
`isRtl` is only true for Arabic, so the `false` branch covered both English and German.

**Fix / Change**
All content-bearing ternaries in Calculator, Hero, Services, ReviewsFaqPage and the
Contact subject list now resolve through `t()`, with keys added to all three
dictionaries. Layout-only uses of `isRtl` (`text-right`, `flex-row-reverse`, `rotate-180`)
are untouched. `Services.tsx` also had a `language === 'ar'` ternary on its main heading —
same problem, same fix (`services_title_1` / `services_title_2`).

Note: German output changes substantially here, which is the point — those sections were
rendering English before.

### Content — Fabricated company identity data replaced with placeholders

**Symptom / Description**
`Impressum.tsx` carried invented, legally sensitive German company details: legal form
`Zenomix Logistics GmbH`, address `Speditionsallee 42, 80331 München`, `HRB 245678`,
`DE 312 456 789`, phone `+49 89 4200 1188` and two named managing directors
("Dr. Sarah Jenkins, Marcus Vance"). The same address and phone appeared in the contact
section.

**Fix / Change**
Company name corrected to **Zenomix Services UG (haftungsbeschränkt)**. Every fabricated
identity field — address, register court, HRB number, VAT ID, telephone number and
directors — replaced with a visible placeholder (`[HRB-Nummer]`, `[Straße und
Hausnummer]`, …) in all three languages, in both the Impressum and the contact section.
**These must be filled in with real data before the site goes live.** No new fictitious
details were invented.

### Improvement — Privacy page wording aligned

`Datenschutz.tsx` described "Shipment Tracker" and "Frachtangebote". Updated to the
route/shift overview and transport quotes, matching what the page now actually does. The
substantive privacy statements are unchanged.

**Affected Files**
- `src/data.ts` — English source datasets: services, fleet, testimonials and the demo
  route database rewritten for the light-commercial segment.
- `src/translations.ts` — en/de/ar dictionaries rewritten; ~60 new keys for the migrated
  hardcoded strings; five dead `hero_stat_*` keys and unused `calc_*` keys removed;
  German and Arabic datasets rewritten to match `data.ts`.
- `src/components/Calculator.tsx` — tier ids and rates reworked for kg/km/EUR, sliders
  re-ranged, all copy moved to `t()`, locale-aware number formatting added.
- `src/components/Fleet.tsx` — `heavy` and `light` vehicle SVGs redrawn (no articulated
  truck, no cargo bike).
- `src/components/Services.tsx` — heading and modal copy moved to `t()`; `Users`,
  `HeartPulse` and `LayoutDashboard` added to the icon map for the new service cards.
- `src/components/Hero.tsx` — three feature cards moved to `t()`.
- `src/components/About.tsx` — the two fabricated headline stats replaced.
- `src/components/Contact.tsx` — subject option values and the "Other" label updated.
- `src/components/ReviewsFaqPage.tsx` — heading moved to `t()`; `t` added to the hook
  destructure.
- `src/components/Impressum.tsx` — legal form corrected, fabricated identity data
  replaced with placeholders.
- `src/components/Datenschutz.tsx` — tracker/freight wording aligned.
