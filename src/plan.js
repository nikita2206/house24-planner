// House 24 (EASE Amsterdam, Parkrand woning) - ground floor planner config.
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
    version: "v1 - 2026-10-18",
    notes: [
      "Kitchen zone between the kitchen run front (60 cm) and the toilet/trapkast wall is 268 cm wide (3285 minus the 60 cm run).",
      "A 90 cm deep island needs 100 + 90 + 90 = 280 cm (comfortable 120 + 90 + 100 = 310 cm): it does not fit next to the standard run.",
      "Largest island that keeps 100 cm to the run and clears the trapkast door: about 180-240 x 75 cm (Slim island B).",
      "Dimensions are indicative and exclude wall finish (drawing note); worktops are often 62-65 cm deep, which takes another 2-5 cm."
    ]
  },
  view: { margin: 70, grid: 50, gridMajor: 100 },
  clearance: { min: 90, good: 100, comfort: 120, zones: [90, 120] },

  // Rooms: floor polygons (drawn as fills + labels)
  rooms: [
    { id: "open", label: "Woonkamer / keuken (open plan)", fill: "#fbf8f1",
      points: [[0,0],[514,0],[514,374],[358,374],[358,481],[328.5,481],[328.5,982],[0,982]], labelAt: [380, 230] },
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
    { id: "core-wall-b", label: "toilet/trapkast wall", x: 328.5, y: 615, w: 7, d: 140, kind: "inner" },
    { id: "core-wall-c", label: "hall wall", x: 328.5, y: 844, w: 7, d: 138, kind: "inner" },
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
    { id: "door-hall",    label: "kitchen-hall door", hinge: [328.5, 844], width: 89, closed: 270, open: 180 },
    { id: "door-front",   label: "front door", hinge: [451, 982], width: 104, closed: 180, open: 270 },
    { id: "door-toilet",  label: "toilet door (indicative)", hinge: [340, 730], width: 85, closed: 0, open: 90 }
  ],

  // Fixed elements (solid = counts as an obstacle for clearance measuring)
  fixed: [
    { id: "kitchen-tall",  label: "fridge/oven", x: 0, y: 416, w: 60, d: 60, kind: "kitchen", solid: true },
    { id: "kitchen-run",   label: "kitchen run / worktop", x: 0, y: 476, w: 60, d: 250, kind: "kitchen", solid: true },
    { id: "hob",           label: "hob", x: 5, y: 492, w: 50, d: 58, kind: "appliance", shape: "hob" },
    { id: "sink",          label: "sink + dishwasher", x: 8, y: 655, w: 45, d: 60, kind: "appliance", shape: "sink" },
    { id: "wtw-hatch",     label: "WTW box", x: 0, y: 377, w: 47, d: 34, kind: "boxing", solid: true },
    { id: "stair",         label: "stair (open side)", x: 370, y: 374, w: 144, d: 107, kind: "stair", solid: true },
    { id: "core",          label: "trapkast / toilet / meterkast", x: 335.5, y: 488, w: 178.5, d: 242, kind: "core", solid: true },
    { id: "heatpump",      label: "heat pump (wp)", x: 410, y: 545, w: 63, d: 55, kind: "appliance" },
    { id: "meterkast",     label: "mk", x: 447, y: 730, w: 67, d: 88, kind: "appliance" }
  ],

  // Reference dimension lines from the drawing
  dims: [
    { from: [0, 30], to: [514, 30], label: "5140" },
    { from: [-45, 0], to: [-45, 982], label: "9820" },
    { from: [0, 960], to: [328.5, 960], label: "3285" },
    { from: [335.5, 960], to: [514, 960], label: "1785" },
    { from: [490, 0], to: [490, 374], label: "3745 (drawing) / 374 measured" }
  ],

  furniture: [
    { id: "island-A", label: "Test island A (requested)", x: 180, y: 501, w: 90, d: 200, rotation: 0, color: "#d9a066", shape: "rect", measure: true, note: "200x90 with 120 cm cook-side walkway: only 58 cm left to the toilet wall" },
    { id: "island-B", label: "Slim island B", x: 160, y: 530, w: 75, d: 180, rotation: 0, color: "#7fb069", shape: "rect", measure: true, hidden: true, note: "largest depth that keeps 100 cm to the run and still clears the trapkast door swing (~93 cm behind)" },
    { id: "island-C", label: "Island C 240x100", x: 180, y: 486, w: 100, d: 240, rotation: 0, color: "#c97b63", shape: "rect", measure: true, hidden: true, note: "alternative size - does not fit here" },
    { id: "dining", label: "Dining table (placeholder)", x: 60, y: 800, w: 160, d: 90, rotation: 0, color: "#a3c4dc", shape: "rect" },
    { id: "sofa", label: "Sofa (placeholder)", x: 60, y: 250, w: 240, d: 95, rotation: 0, color: "#b8b8d1", shape: "rect" },
    { id: "coffee", label: "Coffee table (placeholder)", x: 140, y: 130, w: 80, d: 80, rotation: 0, color: "#e3d5b8", shape: "circle" }
  ]
};
