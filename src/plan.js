// House 24 (EASE Amsterdam, Parkrand woning) - floor planner config: ground floor (top level) + firstFloor (below).
// Units: cm. Origin (0,0) = inside face of the back (garden) facade x inside face of the left party wall.
// x grows to the right (towards the hallway side), y grows towards the street (front door).
// Source: [ext] House 24 - Sales Drawing (Verkooptekening VK-B02-24), 1:50, dated 16-07-2026.
// Measured from the PDF vectors (scale checked: 5140 and 9820 dimension lines match within 2 mm).
// The drawing says dimensions are indicative and EXCLUDE wall finish (plaster/tiles): expect ~1-2 cm less per wall.
//
// FURNITURE: one item per line. x,y = top-left corner (before rotation), w = width along x, d = depth along y,
// rotation in degrees around the item's centre, shape "rect" | "circle" (circle uses w as diameter).
// Optional: hidden:true (start switched off), measure:true (show clearances), image:"photo.png", note:"...".
window.PLAN = {
  meta: {
    title: "House 24 - Ground floor (begane grond)",
    subtitle: "EASE Amsterdam Kavel 1A, Parkrand woning, bouwnummer 24 - UBA Bouw",
    source: "VK-B02-24 sales drawing 1:50 (16-07-2026). Indicative dimensions, excl. wall finish.",
    version: "v3 - 2026-10-18 (first floor)",
    notes: [
      "Kitchen zone between the kitchen run front (60 cm) and the toilet/trapkast wall is 268 cm wide (3285 minus the 60 cm run).",
      "Dimensions are indicative and exclude wall finish (drawing note); worktops are often 62-65 cm deep, which takes another 2-5 cm."
    ]
  },
  view: { margin: 70, grid: 50, gridMajor: 100 },
  // Hypothetical: remove the wall (and door) between the entrance hall (gang) and the kitchen/dining area.
  // Toggle in the sidebar or with #...&wall=off. Toilet / trapkast / meter cupboard block stays. Needs builder (UBA) approval.
  hallWall: { removed: false, note: "Hypothetical: hall wall removed (dashed). Needs UBA approval - check structure, ventilation/fire rules and that the front door then opens straight into the living space." },
  clearance: { min: 90, good: 100, comfort: 120, zones: [90, 120] },

  // Rooms: floor polygons (drawn as fills + labels)
  rooms: [
    { id: "open", label: "Woonkamer / keuken (open plan)", fill: "#fbf8f1",
      points: [[0,0],[514,0],[514,374],[358,374],[358,481],[328.5,481],[328.5,982],[0,982]], labelAt: [300, 40] },
    { id: "trapkast", label: "Trapkast (wp)", fill: "#eeeeee", points: [[335.5,488],[514,488],[514,620],[335.5,620]] },
    { id: "toilet", label: "Toilet", fill: "#eef3f7", points: [[335.5,630],[470.5,630],[470.5,723],[335.5,723]] },
    { id: "gang", label: "Gang (hall)", fill: "#f3f0ea", points: [[335.5,730],[514,730],[514,982],[335.5,982]], labelAt: [400, 900] }
  ],

  // Walls as rectangles (solid; used for clearance measuring). Facade/party walls drawn outside the 514 x 982 box.
  walls: [
    { id: "party-left",  label: "party wall", x: -25, y: -30, w: 25, d: 1042, kind: "party" },
    { id: "party-right", label: "party wall", x: 514, y: -30, w: 25, d: 1042, kind: "party" },
    { id: "facade-back", label: "back facade", x: 0, y: -30, w: 514, d: 30, kind: "facade" },
    { id: "facade-front",label: "front facade", x: 0, y: 982, w: 514, d: 30, kind: "facade" },
    { id: "core-wall-a", label: "toilet/trapkast wall", x: 328.5, y: 481, w: 7, d: 42, kind: "inner" },
    { id: "core-wall-b", label: "toilet/trapkast wall", x: 328.5, y: 615, w: 7, d: 115, kind: "inner" },
    { id: "hall-wall-1", label: "hall wall", x: 328.5, y: 730, w: 7, d: 25, kind: "inner", removable: "hall" },
    { id: "core-wall-c", label: "hall wall", x: 328.5, y: 844, w: 7, d: 138, kind: "inner", removable: "hall" },
    { id: "trapkast-top", label: "trapkast wall", x: 328.5, y: 481, w: 85.5, d: 7, kind: "inner" },
    { id: "stair-wall", label: "stair wall", x: 358, y: 379, w: 12, d: 102, kind: "inner" },
    { id: "toilet-top", label: "toilet wall", x: 335.5, y: 620, w: 178.5, d: 10, kind: "inner" },
    { id: "toilet-bottom", label: "toilet wall", x: 335.5, y: 723, w: 178.5, d: 7, kind: "inner" },
    { id: "mk-wall", label: "meter cupboard wall", x: 440, y: 730, w: 7, d: 88, kind: "inner" }
  ],

  windows: [
    { id: "win-back",  label: "garden glazing (with door)", x1: 74, y1: 0, x2: 442, y2: 0 },
    { id: "win-front", label: "front window", x1: 63, y1: 982, x2: 258, y2: 982 }
  ],

  // Doors: hinge point, leaf width, closed and open angle (deg; 0 = +x/right, 90 = +y/down, 180 = left, 270 = up)
  doors: [
    { id: "door-garden",  label: "garden door", hinge: [79, 0], width: 97, closed: 0, open: 90 },
    { id: "door-trapkast",label: "trapkast door (swings into kitchen)", hinge: [328.5, 523], width: 92, closed: 90, open: 180 },
    { id: "door-hall",    label: "kitchen-hall door", hinge: [328.5, 844], width: 89, closed: 270, open: 180, removable: "hall" },
    { id: "door-front",   label: "front door", hinge: [451, 982], width: 104, closed: 180, open: 270 },
    { id: "door-toilet",  label: "toilet door (indicative)", hinge: [340, 730], width: 85, closed: 0, open: 90 }
  ],

  // Fixed elements (solid = counts as an obstacle for clearance measuring)
  fixed: [
    { id: "wtw-hatch",     label: "WTW inspection hatch (shower heat recovery)", labelAt: [-12, 394], labelRotate: -90, labelFill: "#fff", labelSize: 7, x: 0, y: 377, w: 47, d: 34, kind: "boxing", solid: true },
    { id: "stair",         label: "stair (open side)", x: 370, y: 374, w: 144, d: 107, kind: "stair", solid: true },
    { id: "core",          label: "trapkast / toilet / meterkast", x: 335.5, y: 488, w: 178.5, d: 242, kind: "core", solid: true },
    { id: "heatpump",      label: "heat pump (wp)", x: 410, y: 545, w: 63, d: 55, kind: "appliance" },
    { id: "meterkast",     label: "Meter cupboard (mk)", x: 447, y: 730, w: 67, d: 88, kind: "appliance" }
  ],

  // Reference dimension lines from the drawing
  dims: [
    { from: [0, 30], to: [514, 30], label: "5140" },
    { from: [-45, 0], to: [-45, 982], label: "9820" },
    { from: [0, 960], to: [328.5, 960], label: "3285" },
    { from: [335.5, 960], to: [514, 960], label: "1785" },
    { from: [490, 0], to: [490, 374], label: "3745 (drawing) / 374 measured" }
  ],

  // Common items shown in every layout (placeholders).
  furniture: [
    { id: "sofa", label: "Sofa (placeholder)", x: 419, y: 90, w: 95, d: 240, rotation: 0, color: "#b8b8d1", shape: "rect" },
    { id: "coffee", label: "Coffee table (placeholder)", x: 300, y: 170, w: 80, d: 80, rotation: 0, color: "#e3d5b8", shape: "circle" }
  ],

  // LAYOUTS: pick one in the sidebar dropdown or with #layout=<id>. Each layout = its own list of items (one per line),
  // kitchen elements included, so everything is draggable/editable. kind: base (base units + worktop), tall (full-height
  // unit ~210 high, 60 deep), bar (worktop overhang for stools), hob, sink (symbols, not obstacles), or omitted for furniture.
  // band: extra cm used when looking left/right for obstacles (catches the toilet-wall corner diagonally). zones:false = no dashed 90/120 boxes.
  defaultLayout: "L-garden-tall-opposite",
  layouts: [
    { id: "std", label: "Standard kitchen (as sold), no island", notes: ["Intermat standard: fridge/oven tall unit + 250 cm worktop run on the left wall (310 cm in total)."], items: [
      { id: "k-tall", label: "Fridge/oven tall unit", kind: "tall", x: 0, y: 416, w: 60, d: 60 },
      { id: "k-run", label: "Worktop run 250", kind: "base", x: 0, y: 476, w: 60, d: 250 },
      { id: "k-hob", label: "Hob", kind: "hob", x: 5, y: 492, w: 50, d: 58 },
      { id: "k-sink", label: "Sink", kind: "sink", x: 8, y: 655, w: 45, d: 60 },
      { id: "dining", label: "Dining table 120x90", x: 80, y: 810, w: 120, d: 90, rotation: 0, color: "#a3c4dc", shape: "rect", clearance: { sides: 65, ends: 0 }, measure: true, zones: false }
    ]},
    { id: "island-A", label: "Standard + test island 200x90 (does not fit)", notes: ["268 cm between the run front and the toilet/trapkast wall; a 90 cm island needs 280 (min) to 310 (comfortable)."], items: [
      { id: "k-tall", label: "Fridge/oven tall unit", kind: "tall", x: 0, y: 416, w: 60, d: 60 },
      { id: "k-run", label: "Worktop run 250", kind: "base", x: 0, y: 476, w: 60, d: 250 },
      { id: "k-hob", label: "Hob", kind: "hob", x: 5, y: 492, w: 50, d: 58 },
      { id: "k-sink", label: "Sink", kind: "sink", x: 8, y: 655, w: 45, d: 60 },
      { id: "island-A", label: "Test island A", x: 180, y: 501, w: 90, d: 200, rotation: 0, color: "#d9a066", shape: "rect", measure: true, note: "200x90 with 120 cm cook-side walkway: only 58 cm left to the toilet wall" },
      { id: "dining", label: "Dining table 120x90", x: 80, y: 810, w: 120, d: 90, rotation: 0, color: "#a3c4dc", shape: "rect", clearance: { sides: 65, ends: 0 }, measure: true, zones: false }
    ]},
    { id: "island-B", label: "Standard + slim island 180x75 (min. fit)", notes: ["Largest island that keeps 100 cm to the run and clears the trapkast door: about 180-240 x 75 cm."], items: [
      { id: "k-tall", label: "Fridge/oven tall unit", kind: "tall", x: 0, y: 416, w: 60, d: 60 },
      { id: "k-run", label: "Worktop run 250", kind: "base", x: 0, y: 476, w: 60, d: 250 },
      { id: "k-hob", label: "Hob", kind: "hob", x: 5, y: 492, w: 50, d: 58 },
      { id: "k-sink", label: "Sink", kind: "sink", x: 8, y: 655, w: 45, d: 60 },
      { id: "island-B", label: "Slim island B", x: 160, y: 530, w: 75, d: 180, rotation: 0, color: "#7fb069", shape: "rect", measure: true, note: "100 cm to the run, ~93 cm behind, just clears the trapkast door" },
      { id: "dining", label: "Dining table 120x90", x: 80, y: 810, w: 120, d: 90, rotation: 0, color: "#a3c4dc", shape: "rect", clearance: { sides: 65, ends: 0 }, measure: true, zones: false }
    ]},
    { id: "island-C", label: "Standard + island 240x100 (does not fit)", notes: ["Leaves ~49 cm behind the island."], items: [
      { id: "k-tall", label: "Fridge/oven tall unit", kind: "tall", x: 0, y: 416, w: 60, d: 60 },
      { id: "k-run", label: "Worktop run 250", kind: "base", x: 0, y: 476, w: 60, d: 250 },
      { id: "k-hob", label: "Hob", kind: "hob", x: 5, y: 492, w: 50, d: 58 },
      { id: "k-sink", label: "Sink", kind: "sink", x: 8, y: 655, w: 45, d: 60 },
      { id: "island-C", label: "Island C", x: 180, y: 486, w: 100, d: 240, rotation: 0, color: "#c97b63", shape: "rect", measure: true },
      { id: "dining", label: "Dining table 120x90", x: 80, y: 810, w: 120, d: 90, rotation: 0, color: "#a3c4dc", shape: "rect", clearance: { sides: 65, ends: 0 }, measure: true, zones: false }
    ]},
    { id: "L-garden-tall-opposite", label: "1a: L at garden end, tall units at street end", notes: [
      "Return leg at the garden-side end (y 416-476), 215 cm from the wall (155 beyond the run), 60 deep: forms a peninsula facing the living room/garden.",
      "Fridge/oven tall unit moves to the street end; extra 60 cm storage tall unit next to it (run extends 60 cm into the front zone).",
      "Sink moves onto the leg (view to the garden) with the dishwasher under it: needs a drain in the ground-floor slab (no crawlspace) - must be fixed before pouring. Hob moves ~40 cm towards the street (y 530-588) for landing space next to the corner.",
      "30 cm overhang on the garden side = breakfast bar for 2-3 stools. The WTW inspection box stays free on the wall just behind the stools."
    ], items: [
      { id: "k-run", label: "Wall run 250 (incl. corner)", kind: "base", x: 0, y: 416, w: 60, d: 250 },
      { id: "k-leg", label: "Return leg 155", kind: "base", x: 60, y: 416, w: 155, d: 60, measure: true, band: 70, zones: false },
      { id: "k-bar", label: "Bar overhang 30", kind: "bar", x: 60, y: 386, w: 155, d: 30 },
      { id: "k-sink", label: "Sink", kind: "sink", x: 112, y: 423, w: 60, d: 45 },
      { id: "k-hob", label: "Hob", kind: "hob", x: 5, y: 530, w: 50, d: 58 },
      { id: "k-tall", label: "Fridge/oven tall unit", kind: "tall", x: 0, y: 666, w: 60, d: 60 },
      { id: "k-store", label: "Storage tall 60", kind: "tall", x: 0, y: 726, w: 60, d: 60, measure: true, zones: false },
      { id: "dining", label: "Dining table 120x90", x: 90, y: 810, w: 120, d: 90, rotation: 0, color: "#a3c4dc", shape: "rect", clearance: { sides: 65, ends: 0 }, measure: true, zones: false }
    ]},
    { id: "L-garden-tall-corner", label: "1b: L at garden end, storage tall at the leg end", notes: [
      "Same L as 1a, but the 60 cm storage tall unit closes the end of the return leg (acts as a room divider); leg worktop 95 cm.",
      "Fridge/oven tall unit at the street end of the run; sink on the leg (slab drain needed), hob on the wall.",
      "The tall unit at the leg end blocks part of the view/light from the kitchen to the garden; breakfast bar only 95 cm (2 stools)."
    ], items: [
      { id: "k-run", label: "Wall run 250 (incl. corner)", kind: "base", x: 0, y: 416, w: 60, d: 250 },
      { id: "k-leg", label: "Return leg 95", kind: "base", x: 60, y: 416, w: 95, d: 60, zones: false },
      { id: "k-store", label: "Storage tall 60", kind: "tall", x: 155, y: 416, w: 60, d: 60, measure: true, band: 70, zones: false },
      { id: "k-bar", label: "Bar overhang 30", kind: "bar", x: 60, y: 386, w: 95, d: 30 },
      { id: "k-sink", label: "Sink", kind: "sink", x: 90, y: 423, w: 55, d: 45 },
      { id: "k-hob", label: "Hob", kind: "hob", x: 5, y: 530, w: 50, d: 58 },
      { id: "k-tall", label: "Fridge/oven tall unit", kind: "tall", x: 0, y: 666, w: 60, d: 60 },
      { id: "dining", label: "Dining table 120x90", x: 90, y: 810, w: 120, d: 90, rotation: 0, color: "#a3c4dc", shape: "rect", clearance: { sides: 65, ends: 0 }, measure: true, zones: false }
    ]},
    { id: "L-street-tall-opposite", label: "2a: L at street end, storage tall at garden end", notes: [
      "Return leg at the street-side end (y 666-726), 215 cm from the wall, 60 deep: separates the kitchen from the dining zone at the front window.",
      "Fridge/oven tall unit stays; the storage tall unit goes right next to it (y 476-536) because the WTW box blocks the wall above it. Wall worktop 190 incl. corner.",
      "Hob moves to y 572-630, sink onto the leg (slab drain needed). No bar overhang: it would push the dining table against the front facade."
    ], items: [
      { id: "k-tall", label: "Fridge/oven tall unit", kind: "tall", x: 0, y: 416, w: 60, d: 60 },
      { id: "k-store", label: "Storage tall 60", kind: "tall", x: 0, y: 476, w: 60, d: 60, measure: true, zones: false },
      { id: "k-run", label: "Wall run 190 (incl. corner)", kind: "base", x: 0, y: 536, w: 60, d: 190 },
      { id: "k-leg", label: "Return leg 155", kind: "base", x: 60, y: 666, w: 155, d: 60, measure: true, band: 30, zones: false },
      { id: "k-hob", label: "Hob", kind: "hob", x: 5, y: 572, w: 50, d: 58 },
      { id: "k-sink", label: "Sink", kind: "sink", x: 112, y: 674, w: 60, d: 45 },
      { id: "dining", label: "Dining table 120x90", x: 90, y: 805, w: 120, d: 90, rotation: 0, color: "#a3c4dc", shape: "rect", clearance: { sides: 65, ends: 0 }, measure: true, zones: false }
    ]},
    { id: "L-street-tall-corner", label: "2b: L at street end, storage tall next to the corner", notes: [
      "Return leg at the street-side end (y 666-726), 215 cm from the wall. Fridge/oven tall unit and hob stay exactly as in the standard kitchen.",
      "Sink moves ~65 cm along the same wall (y 590-650) out of the corner: short drain move, no slab drain under the leg needed.",
      "Storage tall unit on the left wall just past the corner (y 726-786), opening towards the dining table (pantry/dining storage).",
      "No bar overhang (dining zone too shallow); the leg faces the dining area, not the garden."
    ], items: [
      { id: "k-tall", label: "Fridge/oven tall unit", kind: "tall", x: 0, y: 416, w: 60, d: 60 },
      { id: "k-run", label: "Wall run 250 (incl. corner)", kind: "base", x: 0, y: 476, w: 60, d: 250 },
      { id: "k-leg", label: "Return leg 155", kind: "base", x: 60, y: 666, w: 155, d: 60, measure: true, band: 30, zones: false },
      { id: "k-hob", label: "Hob", kind: "hob", x: 5, y: 492, w: 50, d: 58 },
      { id: "k-sink", label: "Sink", kind: "sink", x: 8, y: 590, w: 45, d: 60 },
      { id: "k-store", label: "Storage tall 60", kind: "tall", x: 0, y: 726, w: 60, d: 60, measure: true, zones: false },
      { id: "dining", label: "Dining table 120x90", x: 90, y: 805, w: 120, d: 90, rotation: 0, color: "#a3c4dc", shape: "rect", clearance: { sides: 65, ends: 0 }, measure: true, zones: false }
    ]}
  ]
};

// FIRST FLOOR (eerste verdieping). Same origin, axes and scale as the ground floor (0,0 = inside corner garden facade /
// left party wall, 514 x 982 inside). Measured from the PDF vectors of VK-B02-24 and cross-checked with the drawing's
// dimension strings: 5140 / 3745 (slaapkamer 1) / 2625 x 2265 (badkamer) / 1085 x 3560 (overloop) / 2390 (stair) /
// 1290 x 1100 (techniek) / 2625 x 3610 (slaapkamer 2) / 2445 x 2375 (slaapkamer 3). Interior walls 70 mm, bathroom walls 100 mm.
// Shown with the "First floor" tab or #floor=1. Same item/layout format as the ground floor.
window.PLAN.firstFloor = {
  meta: {
    title: "House 24 - First floor (eerste verdieping)",
    subtitle: "EASE Amsterdam Kavel 1A, Parkrand woning, bouwnummer 24 - UBA Bouw",
    source: "VK-B02-24 sales drawing 1:50 (16-07-2026), first floor. Indicative dimensions, excl. wall finish.",
    notes: [
      "Room sizes (inside, excl. finish): slaapkamer 1 514 x 374 (19.2 m2), slaapkamer 2 262 x 361 (9.5 m2), slaapkamer 3 244 x 238 (5.8 m2), badkamer 262 x 226 (5.9 m2), overloop 108 x 356, techniek 128 x 110.",
      "Sanitary, WTW and manifold positions are copied from the sales drawing symbols; sizes are approximate (not dimensioned on the drawing).",
      "Door leaves ~92 cm, positions read from the drawing (not dimensioned). Bathroom and techniek doors swing into the landing."
    ]
  },
  size: [514, 982],
  rooms: [
    { id: "sk1", label: "Slaapkamer 1 (master)", fill: "#f7f4ee", points: [[0,0],[514,0],[514,374.4],[0,374.4]], labelAt: [330, 160] },
    { id: "bath", label: "Badkamer", fill: "#eef3f7", points: [[0,384.6],[262.5,384.6],[262.5,610],[0,610]], labelAt: [130, 495] },
    { id: "landing", label: "Overloop", fill: "#f3f0ea", points: [[269.7,381.4],[378.2,381.4],[378.2,737.4],[269.7,737.4]], labelAt: [324, 600] },
    { id: "tech", label: "Techniek", fill: "#eeeeee", points: [[385.9,627.6],[514,627.6],[514,737.4],[385.9,737.4]], labelAt: [430, 725] },
    { id: "sk2", label: "Slaapkamer 2", fill: "#f7f4ee", points: [[0,621],[262.5,621],[262.5,982],[0,982]], labelAt: [190, 880] },
    { id: "sk3", label: "Slaapkamer 3", fill: "#f7f4ee", points: [[269.7,744.6],[514,744.6],[514,982],[269.7,982]], labelAt: [377, 845] }
  ],
  walls: [
    { id: "party-left",  label: "party wall", x: -25, y: -30, w: 25, d: 1042, kind: "party" },
    { id: "party-right", label: "party wall", x: 514, y: -30, w: 25, d: 1042, kind: "party" },
    { id: "facade-back", label: "back facade", x: 0, y: -30, w: 514, d: 30, kind: "facade" },
    { id: "facade-front",label: "front facade", x: 0, y: 982, w: 514, d: 30, kind: "facade" },
    { id: "sk1-wall-a", label: "bedroom 1 / bathroom wall", x: 0, y: 374.4, w: 269.7, d: 10.2, kind: "inner" },
    { id: "sk1-wall-b", label: "bedroom 1 wall", x: 269.7, y: 374.4, w: 5, d: 7, kind: "inner" },
    { id: "sk1-wall-c", label: "bedroom 1 / stair wall", x: 366.5, y: 374.4, w: 147.5, d: 7, kind: "inner" },
    { id: "bath-bottom", label: "bathroom / bedroom 2 wall", x: 0, y: 610, w: 262.5, d: 11, kind: "inner" },
    { id: "mid-wall-a", label: "bathroom / landing wall", x: 262.5, y: 384.6, w: 7.2, d: 48.4, kind: "inner" },
    { id: "mid-wall-b", label: "bathroom / landing wall", x: 262.5, y: 527, w: 7.2, d: 103, kind: "inner" },
    { id: "mid-wall-c", label: "bedroom 2 wall", x: 262.5, y: 723, w: 7.2, d: 259, kind: "inner" },
    { id: "tech-top", label: "stair / techniek wall", x: 378.2, y: 620, w: 135.8, d: 7.6, kind: "inner" },
    { id: "tech-west-a", label: "techniek wall", x: 378.2, y: 620, w: 7.7, d: 11, kind: "inner" },
    { id: "tech-west-b", label: "techniek wall", x: 378.2, y: 724, w: 7.7, d: 13.4, kind: "inner" },
    { id: "sk3-wall-a", label: "bedroom 3 wall", x: 269.7, y: 737.4, w: 10.3, d: 7.2, kind: "inner" },
    { id: "sk3-wall-b", label: "bedroom 3 / techniek wall", x: 372, y: 737.4, w: 142, d: 7.2, kind: "inner" }
  ],
  windows: [
    { id: "win-sk1-l", label: "bedroom 1 window", x1: 74, y1: 0, x2: 181, y2: 0 },
    { id: "win-sk1-r", label: "bedroom 1 window", x1: 334, y1: 0, x2: 440, y2: 0 },
    { id: "win-sk2", label: "bedroom 2 window", x1: 63, y1: 982, x2: 170, y2: 982 },
    { id: "win-sk3", label: "bedroom 3 window", x1: 344, y1: 982, x2: 450, y2: 982 }
  ],
  doors: [
    { id: "door-sk1",  label: "bedroom 1 door", hinge: [274.7, 374.4], width: 92, closed: 0, open: 270, gap: false },
    { id: "door-bath", label: "bathroom door (swings onto landing)", hinge: [269.7, 433], width: 94, closed: 90, open: 0, gap: false },
    { id: "door-sk2",  label: "bedroom 2 door", hinge: [262.5, 630], width: 93, closed: 90, open: 180, gap: false },
    { id: "door-tech", label: "techniek door (swings onto landing)", hinge: [378.2, 724], width: 93, closed: 270, open: 180, gap: false },
    { id: "door-sk3",  label: "bedroom 3 door", hinge: [280, 744.6], width: 92, closed: 0, open: 90, gap: false }
  ],
  fixed: [
    { id: "stair", label: "stair void (trapgat)", x: 380, y: 381.4, w: 134, d: 238.6, kind: "stair", solid: true },
    { id: "railing", label: "stair railing (traphek)", x: 375.5, y: 381.4, w: 4.5, d: 238.6, kind: "boxing", solid: true, labelAt: [371, 470], labelRotate: -90, labelSize: 7 },
    { id: "shaft", label: "pipe shaft", x: 0, y: 337, w: 25, d: 37.4, kind: "boxing", solid: true, labelAt: [32, 333], labelSize: 7 },
    { id: "wc-wall", label: "WC pre-wall (voorzetwand)", x: 0, y: 384.6, w: 120, d: 25, kind: "boxing", solid: true, labelSize: 7, labelAt: [60, 400] },
    { id: "wc", label: "WC", x: 57, y: 409.6, w: 43, d: 55, kind: "appliance" },
    { id: "basin", label: "washbasin", x: 154, y: 384.6, w: 75, d: 48, kind: "appliance" },
    { id: "shower", label: "shower ~90x90", x: 0, y: 520, w: 91, d: 90, kind: "appliance" },
    { id: "wd-wm", label: "washer/dryer (wd/wm)", x: 181, y: 545, w: 60, d: 60, kind: "appliance" },
    { id: "wtw", label: "WTW unit", x: 457, y: 637, w: 57, d: 64, kind: "appliance" },
    { id: "ufh", label: "UFH manifold (vv)", x: 405, y: 627.6, w: 49, d: 16, kind: "appliance", labelAt: [430, 655], labelSize: 7 }
  ],
  dims: [
    { from: [0, 30], to: [514, 30], label: "5140" },
    { from: [-45, 0], to: [-45, 982], label: "9820" },
    { from: [500, 0], to: [500, 374.4], label: "3745" },
    { from: [0, 505], to: [262.5, 505], label: "2625" },
    { from: [250, 384.6], to: [250, 610], label: "2265" },
    { from: [269.7, 400], to: [378.2, 400], label: "1085" },
    { from: [356, 381.4], to: [356, 737.4], label: "3560" },
    { from: [500, 381.4], to: [500, 620], label: "2390" },
    { from: [385.9, 712], to: [514, 712], label: "1290" },
    { from: [394, 627.6], to: [394, 737.4], label: "1100" },
    { from: [0, 905], to: [262.5, 905], label: "2625" },
    { from: [248, 621], to: [248, 982], label: "3610" },
    { from: [269.7, 790], to: [514, 790], label: "2445" },
    { from: [404, 744.6], to: [404, 982], label: "2375" }
  ],
  furniture: [],
  defaultLayout: "bedrooms",
  layouts: [
    { id: "bedrooms", label: "Default: master bed 160x200 + 2 small bedrooms", notes: [
      "Master: 160x200 bed with the headboard on the left party wall, between the two windows' sight lines; 45x40 bedside tables; 250 cm wardrobe (60 deep) on the right party wall.",
      "Slaapkamer 2: 140x200 bed against the left wall (clear of the door swing) and a 120x60 desk on the street wall next to the window.",
      "Slaapkamer 3 (5.8 m2): 90x200 bed on the right party wall and a 120x60 desk on the left wall - a study/guest room more than a full bedroom."
    ], items: [
      { id: "bed-sk1", label: "Bed 160x200", x: 0, y: 95, w: 200, d: 160, rotation: 0, color: "#c9b8d9", shape: "rect", measure: true, zones: false },
      { id: "nst-sk1-a", label: "Bedside", x: 0, y: 50, w: 40, d: 45, rotation: 0, color: "#e3d5b8", shape: "rect", solid: false },
      { id: "nst-sk1-b", label: "Bedside", x: 0, y: 255, w: 40, d: 45, rotation: 0, color: "#e3d5b8", shape: "rect", solid: false },
      { id: "wardrobe-sk1", label: "Wardrobe 250", x: 454, y: 50, w: 60, d: 250, rotation: 0, color: "#b8a48a", shape: "rect", measure: true, zones: false },
      { id: "bed-sk2", label: "Bed 140x200", x: 0, y: 621, w: 140, d: 200, rotation: 0, color: "#c9b8d9", shape: "rect", measure: true, zones: false },
      { id: "desk-sk2", label: "Desk 120x60", x: 142, y: 922, w: 120, d: 60, rotation: 0, color: "#a3c4dc", shape: "rect" },
      { id: "bed-sk3", label: "Bed 90x200", x: 424, y: 745, w: 90, d: 200, rotation: 0, color: "#c9b8d9", shape: "rect", measure: true, zones: false },
      { id: "desk-sk3", label: "Desk 120x60", x: 270, y: 862, w: 60, d: 120, rotation: 0, color: "#a3c4dc", shape: "rect", measure: true, zones: false }
    ]}
  ]
};
