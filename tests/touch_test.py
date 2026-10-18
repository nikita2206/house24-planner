# Touch/mobile regression test. Usage: python3 tests/touch_test.py [url]
import sys, asyncio
from playwright.async_api import async_playwright
URL = sys.argv[1] if len(sys.argv) > 1 else "file:///workspace/house/repo/index.html"

async def touch_drag(cdp, x0, y0, x1, y1, steps=12):
    await cdp.send("Input.dispatchTouchEvent", {"type": "touchStart", "touchPoints": [{"x": x0, "y": y0}]})
    for i in range(1, steps + 1):
        x = x0 + (x1 - x0) * i / steps; y = y0 + (y1 - y0) * i / steps
        await cdp.send("Input.dispatchTouchEvent", {"type": "touchMove", "touchPoints": [{"x": x, "y": y}]})
        await asyncio.sleep(0.02)
    await cdp.send("Input.dispatchTouchEvent", {"type": "touchEnd", "touchPoints": []})
    await asyncio.sleep(0.4)

async def main():
    ok = True
    def check(cond, msg):
        nonlocal ok; ok &= bool(cond); print(("PASS " if cond else "FAIL ") + msg)
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox"])
        # ---- phone ----
        ctx = await b.new_context(viewport={"width": 390, "height": 844}, has_touch=True, is_mobile=True, device_scale_factor=2)
        pg = await ctx.new_page(); errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto(URL); await pg.wait_for_timeout(500)
        aside = await pg.locator("aside").bounding_box(); svgb = await pg.locator("#svg").bounding_box()
        check(aside["x"] >= 389, f"sidebar hidden by default on phone (x={aside['x']:.0f})")
        check(await pg.locator("#btnDrawer").is_visible(), "floating Items button visible")
        check(svgb["width"] >= 380 and svgb["y"] + svgb["height"] <= 845, f"plan full width and fits viewport ({svgb['width']:.0f}x{svgb['height']:.0f})")
        await pg.screenshot(path="/workspace/house/repo/tests/phone.png")
        # make the document scrollable so we can see whether a drag scrolls it
        await pg.evaluate("document.documentElement.style.height='3000px'; document.body.style.overflow='visible'; window.scrollTo(0,0)")
        cdp = await ctx.new_cdp_session(pg)
        bx = await pg.locator('g.furn[data-id="island-A"]').bounding_box()
        y_before = await pg.evaluate("1")
        cx, cy = bx["x"] + bx["width"] / 2, bx["y"] + bx["height"] / 2
        before = await pg.evaluate("document.querySelector('g.furn[data-id=\"island-A\"]').getBoundingClientRect().top")
        await touch_drag(cdp, cx, cy, cx - 15, cy - 120)
        sy = await pg.evaluate("window.scrollY")
        after = await pg.evaluate("document.querySelector('g.furn[data-id=\"island-A\"]').getBoundingClientRect().top")
        check(sy == 0, f"touch-drag on furniture does not scroll page (scrollY={sy})")
        check(after < before - 60, f"island moved with the finger ({before:.0f}px -> {after:.0f}px)")
        # empty plan area should still scroll the page
        await touch_drag(cdp, 200, 600, 200, 250)
        sy2 = await pg.evaluate("window.scrollY")
        check(sy2 > 50, f"touch on empty plan area still scrolls page (scrollY={sy2})")
        await pg.evaluate("window.scrollTo(0,0); document.documentElement.style.height=''")
        # drawer open/close
        await pg.locator("#btnDrawer").tap(); await pg.wait_for_timeout(400)
        a2 = await pg.locator("aside").bounding_box()
        check(a2["x"] < 390 - 300, f"drawer opens on button tap (x={a2['x']:.0f})")
        await pg.screenshot(path="/workspace/house/repo/tests/phone-drawer.png")
        await pg.touchscreen.tap(20, 400); await pg.wait_for_timeout(400)
        a3 = await pg.locator("aside").bounding_box()
        check(a3["x"] >= 389, "drawer closes on tap outside")
        css = await pg.evaluate("getComputedStyle(document.querySelector('g.furn')).touchAction + ' / svg:' + getComputedStyle(document.getElementById('svg')).touchAction")
        check(css.startswith("none"), f"touch-action furniture/svg = {css}")
        check(not errs, f"no page errors {errs}")
        # ---- desktop ----
        d = await b.new_page(viewport={"width": 1400, "height": 1000}); await d.goto(URL); await d.wait_for_timeout(400)
        ad = await d.locator("aside").bounding_box()
        check(ad["x"] > 1000 and not await d.locator("#btnDrawer").is_visible(), "desktop layout unchanged (sidebar docked, no button)")
        await b.close()
    print("ALL PASS" if ok else "SOME FAILED"); sys.exit(0 if ok else 1)
asyncio.run(main())
