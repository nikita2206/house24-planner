# First-floor / floor-switcher regression test. Usage: python3 tests/first_floor_test.py [base_url]
import sys, asyncio
from playwright.async_api import async_playwright
BASE = sys.argv[1] if len(sys.argv) > 1 else "file:///workspace/house/repo/index.html"
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox"])
        pg = await b.new_page(viewport={"width": 1400, "height": 1000}); errs=[]; pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto(BASE + "#layout=island-B&wall=off"); await pg.wait_for_timeout(300)
        print("g0", await pg.evaluate("[document.getElementById('title').innerText, layoutSel.value, wallChk.checked, location.hash]"))
        await pg.click("#tabs button[data-floor='1']"); await pg.wait_for_timeout(200)
        print("f1", await pg.evaluate("[document.getElementById('title').innerText, layoutSel.value, getComputedStyle(wallRow).display, location.hash, document.querySelectorAll('g.furn').length]"))
        await pg.click("#tabs button[data-floor='0']"); await pg.wait_for_timeout(200)
        print("g0 again", await pg.evaluate("[layoutSel.value, wallChk.checked, location.hash]"))
        await pg.evaluate("location.hash='floor=1'"); await pg.wait_for_timeout(200)
        print("hash f1", await pg.evaluate("[document.getElementById('title').innerText, layoutSel.value]"))
        await pg.click("#btnExport"); t = await pg.evaluate("out.value")
        ok = await pg.evaluate("(t)=>{const w={}; new Function('window', t)(w); return [Object.keys(w.PLAN).length, w.PLAN.firstFloor.layouts[0].items.length, w.PLAN.layouts.length]}", t)
        print("export roundtrip", ok)
        ctx = await b.new_context(viewport={"width": 390, "height": 844}, has_touch=True, is_mobile=True, device_scale_factor=2)
        m = await ctx.new_page(); m.on("pageerror", lambda e: errs.append(str(e)))
        await m.goto(BASE + "#floor=1"); await m.wait_for_timeout(400)
        cdp = await ctx.new_cdp_session(m)
        bx = await m.locator('g.furn[data-id="bed-sk1"]').bounding_box(); cx, cy = bx["x"]+bx["width"]/2, bx["y"]+bx["height"]/2
        await cdp.send("Input.dispatchTouchEvent", {"type":"touchStart","touchPoints":[{"x":cx,"y":cy}]})
        for i in range(1,11): await cdp.send("Input.dispatchTouchEvent", {"type":"touchMove","touchPoints":[{"x":cx+3*i,"y":cy}]}); await asyncio.sleep(0.02)
        await cdp.send("Input.dispatchTouchEvent", {"type":"touchEnd","touchPoints":[]}); await asyncio.sleep(0.3)
        bx2 = await m.locator('g.furn[data-id="bed-sk1"]').bounding_box(); print("touch moved px", round(bx2["x"]-bx["x"]))
        await m.locator("#btnDrawer").tap(); await m.wait_for_timeout(400)
        print("drawer x", (await m.locator("aside").bounding_box())["x"], await m.evaluate("layoutSel.value"))
        print("errors", errs); await b.close()
asyncio.run(main())
