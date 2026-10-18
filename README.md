# House 24 floor planner

2D top-view planner for the ground floor (begane grond) of House 24 (Parkrand woning, bouwnummer 24).
Units in cm; origin = inside corner of the garden facade and the left party wall. Source: sales drawing VK-B02-24 (1:50, 16-07-2026), dimensions indicative and excluding wall finish.

- Live page: https://nikita2206.github.io/house24-planner/
- Screenshots: https://nikita2206.github.io/house24-planner/screenshots/plan.png (also `plan-slim-island.png`, `plan-island-240x100.png`)

## Editing
- Furniture lives in `src/plan.js` → `furniture`, one item per line:
  `{ id, label, x, y, w, d, rotation, color, shape: "rect"|"circle", hidden?, measure?, image? }`
- Or drag items in the browser and press **Export config** / **Download plan.js**, then replace `src/plan.js`.
- Run `python3 src/build.py` to regenerate the self-contained `index.html`. Pushing to `main` redeploys Pages (~1 min).
- URL hash filters: `#only=island-B,dining` shows only those items.

Screenshots are stored base64-encoded in `screenshots/*.png.b64` and decoded by the Pages workflow.
