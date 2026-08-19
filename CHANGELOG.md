# Changelog

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
