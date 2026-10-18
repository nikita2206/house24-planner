# Renders desktop screenshots per layout + 2x2 comparison of the L variants. Usage: python3 tests/screenshots.py [base_url]
import sys, asyncio, json
from playwright.async_api import async_playwright
from PIL import Image, ImageDraw, ImageFont
BASE = sys.argv[1] if len(sys.argv) > 1 else "file:///workspace/house/repo/index.html"
OUT = "/workspace/house/repo/screenshots"
L = ["L-garden-tall-opposite", "L-garden-tall-corner", "L-street-tall-opposite", "L-street-tall-corner"]
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox"])
        pg = await b.new_page(viewport={"width": 1400, "height": 1500}, device_scale_factor=1.5)
        errs = []; pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto(BASE); await pg.wait_for_timeout(300)
        ids = await pg.evaluate("window.PLAN.layouts.map(l => l.id)")
        report = {}
        for lid in ids:
            await pg.evaluate(f"location.hash = 'layout={lid}'"); await pg.wait_for_timeout(300)
            await pg.screenshot(path=f"{OUT}/layout-{lid}.png")
            if lid in L: await pg.locator("#svgwrap").screenshot(path=f"/tmp/plan-{lid}.png")
            report[lid] = await pg.evaluate("document.getElementById('clear').innerText")
        print(json.dumps(report, indent=1)); print("errors:", errs)
        await b.close()
    ims = [Image.open(f"/tmp/plan-{l}.png") for l in L]
    # crop to the drawing (trim white margins)
    def trim(im):
        g = im.convert("L").point(lambda v: 0 if v > 245 else 255); bb = g.getbbox(); return im.crop(bb)
    ims = [trim(i) for i in ims]
    w = max(i.width for i in ims); h = max(i.height for i in ims); pad = 30; title = 50
    titles = ["1a  L at living-room end · tall units at front end", "1b  L at living-room end · storage tall at leg end",
              "2a  L at front (garden) end · storage tall at living-room end", "2b  L at front (garden) end · storage tall past the corner"]
    canvas = Image.new("RGB", (2 * w + 3 * pad, 2 * (h + title) + 3 * pad), "white")
    d = ImageDraw.Draw(canvas)
    try: f = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 30)
    except Exception: f = ImageFont.load_default()
    for k, im in enumerate(ims):
        x = pad + (k % 2) * (w + pad); y = pad + (k // 2) * (h + title + pad)
        d.text((x, y), titles[k], fill="#222", font=f)
        canvas.paste(im, (x + (w - im.width) // 2, y + title))
    canvas.save(f"{OUT}/l-variants.png", optimize=True); print("saved", canvas.size)
asyncio.run(main())
