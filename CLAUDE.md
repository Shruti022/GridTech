# GridShift Demo

## What This Is
A hackathon demo for the Cross-Columbia GridTech Hackathon. GridShift is a platform that turns Bitcoin mining facilities into grid-stabilizing demand-response resources. When grid frequency drops below 60Hz, mining facilities reduce power. When it spikes, they absorb more.

## Tech Stack
- React + Vite + Tailwind CSS v4 (CSS-based config via `@theme` in index.css)
- Recharts for the frequency line chart
- No backend — all data is simulated client-side
- No routing — single page with a view toggle (Grid Operator / Facility Operator)

## Architecture
- **Single simulation hook** (`src/hooks/useSimulation.js`) drives all live data. Called once in `App.jsx`, props flow down.
- **Frequency model**: summed sinusoids (smooth oscillation, not random noise). Ticks every 1 second.
- **Trigger event button**: injects a decaying frequency drop (~0.06Hz) that recovers over ~20 seconds.
- **Facility status** derived from frequency thresholds: ABSORBING (>60.02), NOMINAL (59.98-60.02), CURTAILING (59.95-59.98), SHEDDING (<59.95).

## Two Dashboards
1. **Grid Operator** — sees all 5 facilities, frequency chart, SVG map of NY state, facility table, event log
2. **Facility Operator** — Coinmint Massena detail view with earnings, battery gauge, power allocation, activity log

## Key Files
- `src/hooks/useSimulation.js` — the core engine, everything depends on this
- `src/components/FrequencyChart.jsx` — Recharts heartbeat monitor, reused in both views
- `src/data/facilities.js` — 5 facility definitions (Coinmint, Greenidge, Buffalo Data Systems, Niagara Compute, Plattsburgh DC)
- `src/data/constants.js` — thresholds, colors, rates
- `src/index.css` — Tailwind v4 @theme block with SCADA color system

## Aesthetic
Dark industrial control room / SCADA style. Background #0a0a0f, JetBrains Mono for numbers, Inter for body text, green/amber/red status colors, sharp corners, no emojis, no rounded bubbly design.

## Commands
```
npm run dev    # start dev server
npm run build  # production build
```
