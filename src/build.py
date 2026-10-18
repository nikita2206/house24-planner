# Builds the single self-contained page (config inlined) at ../index.html (and optionally into an output dir).
# Usage: python3 src/build.py [outdir]
import pathlib, sys
src = pathlib.Path(__file__).parent
root = src.parent
html = (src / "index.html").read_text()
cfg = (src / "plan.js").read_text()
out = html.replace('<script src="plan.js"></script>', "<script>\n/* ==== CONFIG (edit src/plan.js, then run src/build.py) ==== */\n" + cfg + "\n</script>")
targets = [root / "index.html"] + ([pathlib.Path(sys.argv[1]) / "index.html"] if len(sys.argv) > 1 else [])
for t in targets:
    t.parent.mkdir(parents=True, exist_ok=True)
    t.write_text(out)
    print("wrote", t, len(out))
