# Spark Showroom — Kitchen Configurator (POC)

A consumer-facing kitchen configurator built as a workshop demo for Spark Vision.

## What this is

A web prototype of what a "Digital Showroom" experience could feel like for an
end customer planning a kitchen at home — before they walk into the physical
showroom. Built with the **Spark Vision design system** (terracotta accent,
warm Scandinavian neutrals, Inter Tight typography).

The 3D kitchen renders in the browser via `react-three-fiber`. In production
this would be the Unity-based Spark renderer; the web prototype uses a
stylized low-poly stand-in so the whole app starts with one `npm run dev`.

## Stack

- React 18 + TypeScript
- Vite
- react-three-fiber + drei (Three.js for React)
- lucide-react (icons)
- Pure CSS (design tokens from the Spark Vision design system)

## Run

```bash
unzip spark-showroom.zip
cd spark-showroom
npm install
npm run dev
```

Then open http://localhost:5173

## Configurable categories

Layout · Cabinets · Countertop · Appliances · Hardware · Lighting

All changes update the 3D scene live. The total in the bottom-right reflects
the sum of all option deltas plus a base price.

## Architecture notes

- `src/data/catalog.ts` — all options, prices, and the configuration model
- `src/three/KitchenScene.tsx` — the 3D scene
- `src/components/` — UI shell (top bar, sidebar, right panel, stepper)
- `src/styles.css` — Spark Vision design tokens + layout

## Vad du får (Workshop-walkthrough)

Konsumentvänd kökskonfigurator i Spark Visions varumärke — terrakotta-accent
(`#D2542B`), varma sand-neutraler, Inter Tight-typografi, generösa mellanrum,
inga gradients. Tre-kolumners layout: kategorier till vänster, live-renderad
3D-vy i mitten, val-grid och löpande totalsumma till höger.

Sex konfigurerbara kategorier — layout (L/U/galley/island), skåp, bänkskiva,
vitvaror, beslag, belysning. Alla val uppdaterar 3D-scenen direkt. Välj
"L-shape with island" + "Pendant island lighting" så får du tre hängande
pendlar över ön. Stäng av handles ("Push-to-open") och de försvinner från
skåpen.

3D-scenen är medvetet stiliserad low-poly — inte fotorealism. Det är poängen:
produktionen kör Unity för fotorealism, prototypen kör browser-Three.js. Den
distinktionen är pedagogiskt användbar i workshopen när ni pratar om bounded
contexts.

## Workshop-vinkel: bounded contexts

Det här är **Showroom**-bounded-contextet. När monorepot byggs ut blir
backend **Sortiment**-kontextet (.NET/SQLite) och **Blueprint**-kontextet
kan bli en 2D-planlösningsritare. AGENTS.md-stop-rule blir då
`Never modify frontend/showroom/src/three/ without review` — exakt vad
workshop-doktrinen lär ut.

## Veta (caveats)

- Bundle är ~1MB (Three.js är tungt) — irrelevant för demo, oroa dig inte
- Inga riktiga produktbilder — swatches är CSS-färger så du slipper hantera assets
- "Save", "Share", "Continue in showroom"-knapparna visar bara toast — rätt scope för en POC
- Fungerar i alla moderna browsers, ingen build-server behövs efter `npm run dev`

## Workshop context

This is a POC for an agentic-development workshop at Spark Vision. The intent
is to give workshop participants something realistic-looking to grill the
agent on (`/grill-me`, `/to-prd`, `/specify`, `/plan`, `/implement`).
