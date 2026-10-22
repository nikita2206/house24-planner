# House 24 floor planner

2D top-view planner for the ground floor (begane grond) and first floor (eerste verdieping) of House 24 (Parkrand woning, bouwnummer 24).
Units in cm; origin = inside corner of the back facade (achtergevel: living room + terrace) and the left party wall; y grows towards the front facade (voorgevel: front door, kitchen/dining with the B102 French doors, front garden). Source: sales drawing VK-B02-24 (1:50, 16-07-2026), dimensions indicative and excluding wall finish.

- Live page: https://nikita2206.github.io/house24-planner/ (first floor: https://nikita2206.github.io/house24-planner/#floor=1)
- First floor layouts: `#floor=1&layout=bath-instead-of-shower` (default) and `#floor=1&layout=bath-instead-of-washer`
- First floor screenshots: https://nikita2206.github.io/house24-planner/screenshots/first-floor-desktop.png (default layout), `first-floor-bath-instead-of-shower-{desktop,mobile}.png`, `first-floor-bath-instead-of-washer-{desktop,mobile}.png`
- Screenshots: https://nikita2206.github.io/house24-planner/screenshots/plan.png (also `plan-slim-island.png`, `plan-island-240x100.png`)

## Editing
- Furniture lives in `src/plan.js` → `furniture`, one item per line:
  `{ id, label, x, y, w, d, rotation, color, shape: "rect"|"circle", hidden?, measure?, image? }`
- Or drag items in the browser and press **Export config** / **Download plan.js**, then replace `src/plan.js`.
- Run `python3 src/build.py` to regenerate the self-contained `index.html`. Pushing to `main` redeploys Pages (~1 min).
- Floors: the ground floor is the top level of `window.PLAN`; the first floor is `window.PLAN.firstFloor` (same schema: rooms, walls, windows, doors, fixed, dims, furniture, layouts). Switch with the tabs or `#floor=1` (combines with `&layout=<id>`).
- URL hash filters: `#only=island-B,dining` shows only those items.

Screenshots are stored base64-encoded in `screenshots/*.png.b64` and decoded by the workflow, which publishes the built site to the `gh-pages` branch (served by GitHub Pages).
