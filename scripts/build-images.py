"""Copy approved source assets into production paths under assets/images/.

Follows 11_ASSET_AND_IMAGE_DIRECTION.md:
  - kebab-case names, <section>/<subject>-<context>-<width>.<format>
  - only widths <= source width are generated
  - WebP delivery, high-quality masters left untouched in the source folders
  - layout/wireframe reference PNGs are never treated as content
"""

import json
import pathlib

from PIL import Image

ROOT = pathlib.Path(__file__).resolve()
while not (ROOT / "assets").is_dir():
    ROOT = ROOT.parent
OUT = ROOT / "assets" / "images"

QUALITY = 82
manifest = []


def emit(src_rel, section, name, widths, quality=QUALITY, crop=None):
    src = ROOT / src_rel
    if not src.exists():
        raise SystemExit(f"MISSING SOURCE: {src_rel}")
    im = Image.open(src)
    im = im.convert("RGB")
    if crop:
        im = im.crop(crop)
    dest_dir = OUT / section
    dest_dir.mkdir(parents=True, exist_ok=True)
    made = []
    for w in sorted({w for w in widths if w <= im.width} | {min(widths)}):
        if w > im.width:
            continue
        h = round(im.height * w / im.width)
        out = dest_dir / f"{name}-{w}.webp"
        im.resize((w, h), Image.LANCZOS).save(out, "WEBP", quality=quality, method=6)
        made.append({"width": w, "height": h, "path": f"assets/images/{section}/{out.name}"})
    manifest.append({
        "source": src_rel,
        "section": section,
        "name": name,
        "intrinsic": {"width": im.width, "height": im.height},
        "renditions": made,
    })
    print(f"  {section}/{name}: {', '.join(str(m['width']) for m in made)}")


WIDE = [640, 960, 1280, 1672]
PORTRAIT = [480, 720, 960, 1122]
POSTER = [400, 640, 900, 1086]
SQUARE = [320, 480, 704]
EDITORIAL = [560, 900, 1280, 1536]

print("home")
emit("source-content/HOME/DIV 1 HERO/hero Picture.png", "home", "hero-stage", WIDE, quality=84)
emit("source-content/HOME/DIV 2/ChatGPT Image Aug 3, 2026, 12_21_00 AM.png", "home", "collective", WIDE)
emit("source-content/HOME/DIV 2/Tshepiso Sk.png", "home", "collective-tshepiso-sk", WIDE)
emit("source-content/HOME/DIV 2/Tetelo M.png", "home", "collective-tetelo-m", WIDE)
emit("source-content/HOME/DIV 2/Oracle Divine.png", "home", "collective-divine-oracle", WIDE)
emit("source-content/HOME/DIV 2/Given Mohlala.png", "home", "collective-given-mohlala", WIDE)
emit("source-content/HOME/DIV 3/Tshepiso Sekhonde.png", "home", "featured-tshepiso-sk", [480, 720, 960, 1254])
emit("source-content/HOME/DIV 3/Tetelo M.png", "home", "featured-tetelo-m", PORTRAIT)
emit("source-content/HOME/DIV 3/Oracle Divine.png", "home", "featured-divine-oracle", PORTRAIT)
emit("source-content/HOME/DIV 3/given Mohlala.png", "home", "featured-given-mohlala", PORTRAIT)

print("artists")
emit("source-content/ARTISTS/DIV (Hero )/ChatGPT Image Aug 3, 2026, 09_53_44 PM.png", "artists", "roster-hero", WIDE)
emit("source-content/ARTISTS/Divine Oracle/c6c1e34a-b6fe-4038-bd33-03aeb6d49e7e.png", "artists", "divine-oracle-portrait", PORTRAIT)
emit("source-content/ARTISTS/Given Mohlala/given mohlala.png", "artists", "given-mohlala-portrait", PORTRAIT)
emit("source-content/ARTISTS/Tetelo M/ChatGPT Image Aug 3, 2026, 11_58_21 PM.png", "artists", "tetelo-m-portrait", PORTRAIT)
emit("source-content/ARTISTS/Tshepiso Sk/ChatGPT Image Aug 4, 2026, 12_10_22 AM.png", "artists", "tshepiso-sk-portrait", [480, 720, 960, 1254])

print("about")
emit("source-content/ABOUT/Div 1(Hero )/ChatGPT Image Aug 3, 2026, 06_19_34 PM.png", "about", "hero", WIDE)
emit("source-content/ABOUT/Div 3Founder/ChatGPT Image Aug 3, 2026, 08_39_40 PM (1).png", "about", "ronald-makua-portrait", PORTRAIT)
emit("source-content/ABOUT/Div 3Founder/ChatGPT Image Aug 3, 2026, 08_52_39 PM.png", "about", "ronald-makua-studio", EDITORIAL)

print("services")
emit("source-content/Services/Div (9)/generated-services-hero-web.webp", "services", "hero", [640, 960, 1280, 1800])
emit("source-content/Services/Div/generated-event-management-web.webp", "services", "event-management", [480, 800, 1300])
emit("source-content/Services/Div (2)/generated-artist-bookings-web.webp", "services", "artist-bookings", [640, 960, 1280, 1800])
emit("source-content/Services/Div (3)/generated-band-worship-web.webp", "services", "live-band-worship", [400, 800, 1200])
emit("source-content/Services/Div (3)/generated-band-corporate-web.webp", "services", "live-band-corporate", [400, 800, 1200])
emit("source-content/Services/Div (3)/generated-band-celebration-web.webp", "services", "live-band-celebration", [400, 800, 1200])
emit("source-content/Services/Div (4)/generated-sound-production-web.webp", "services", "sound-production", [480, 800, 1200])
emit("source-content/Services/Div (5)/generated-lighting-production-web.webp", "services", "lighting-production", [560, 960, 1600])
emit("source-content/Services/Div (6)/generated-stage-supply-web.webp", "services", "stage-supply", [480, 900, 1500])
emit("source-content/Services/Div (7)/generated-led-live-web.webp", "services", "led-screens-live", [400, 600, 800])
emit("source-content/Services/Div (7)/generated-led-corporate-web.webp", "services", "led-screens-corporate", [400, 600, 800])
emit("source-content/Services/Div (8)/generated-backline-pa-hire-web.webp", "services", "backline-pa-hire", [560, 960, 1600])
emit("source-content/Services/generated-services-overview.jpg", "services", "overview", [560, 960, 1532])

print("events")
emit("source-content/Events/Gig Guide 2026/ChatGPT Image Aug 5, 2026, 12_15_52 AM.png", "events", "my-hope-conference-2026-poster", POSTER)
emit("source-content/Events/Gig Guide 2026/Worahip Night Venda.png", "events", "tetelo-m-worship-night-venda-poster", [400, 640, 900, 1122])
emit("source-content/Events/Gig Guide 2026/ChatGPT Image Aug 5, 2026, 12_34_13 AM.png", "events", "charity-worship-night-2026-poster", [400, 640, 900, 1054])
emit("source-content/Events/Gig Guide 2026/tshepiso sk  (1).png", "events", "tshepiso-sk-worship-night-burgersfort-poster", POSTER)
emit("source-content/Events/Gig Guide 2026/Given Mohlala event.png", "events", "worship-therapy-season-3-poster", POSTER)
emit("source-content/Events/Gig Guide 2026/tshepiso sk  (2).png", "events", "grace-renewed-live-recording-poster", POSTER)
emit("source-content/Events/Gig Guide 2026/Gospel Concert.png", "events", "tetelo-m-gospel-concert-rustenburg-poster", [400, 640, 900, 1122])
emit("source-content/Events/Gig Guide 2026/tetelo-m-21st-celebration-burgersfort-2026.png", "events", "tetelo-m-21st-celebration-burgersfort-poster", [400, 640, 900, 1024])
emit("source-content/Events/Gig Guide 2026/Gospel Festival.png", "events", "tetelo-m-gospel-festival-polokwane-poster", [400, 640, 900, 1122])

print("music")
emit("source-content/Music/Div 1 Hero/b82841df-f534-4f08-b141-8a5333623d60.png", "music", "hero", WIDE)
emit("source-content/HOME/DIV 7/My-Life-Depends-on-You-Lord-Single-by-Tetelo-M-Spotify-08-03-2026_01_28_AM.png",
     "music", "my-life-depends-on-you-lord-cover", SQUARE, quality=86)
emit("source-content/HOME/DIV 7/Matthew-7-7-Kokota-Single-by-Tetelo-M-Spotify-08-03-2026_02_55_AM.png",
     "music", "matthew-7-7-kokota-cover", [320, 480, 702], quality=86)
emit("source-content/HOME/DIV 7/Buwa-Single-by-Tetelo-M-Spotify-08-03-2026_04_06_PM.png",
     "music", "buwa-cover", [320, 480, 711], quality=86)
emit("source-content/HOME/DIV 7/At-the-Mention-of-Your-Name-Single-by-Tetelo-M-Spotify-08-03-2026_04_08_PM.png",
     "music", "at-the-mention-of-your-name-cover", [320, 480, 574], quality=86)
emit("source-content/HOME/DIV 7/Given Mohlala o Mogolo.png", "music", "o-mogologolo-cover", [320, 356], quality=88)
emit("source-content/HOME/DIV 7/ee kea Dumela.png", "music", "ehh-kea-dumela-cover", [320, 426], quality=88)
emit("source-content/HOME/DIV 7/Sonto-Spotify-08-04-2026_01_36_PM.png", "music", "ngcwele-phenyo-cover", [320, 355], quality=88)

print("news")
emit("source-content/News/DIV 1/bLOG STORY 1/blog story  (2).png", "news", "tshepiso-sk-outreach-lead", EDITORIAL)
emit("source-content/News/DIV 1/bLOG STORY 1/blog story  (3).png", "news", "tshepiso-sk-outreach-donations", [560, 900, 1280, 1448])
emit("source-content/News/DIV 1/bLOG STORY 1/blog story  (1).png", "news", "tshepiso-sk-outreach-team", EDITORIAL)

(ROOT / "assets" / "images" / "asset-manifest.json").write_text(
    json.dumps({
        "note": "Generated from the supplied source folders. Masters remain in their original locations.",
        "generated_from": "scripts/build-images.py",
        "assets": manifest,
    }, indent=2),
    encoding="utf-8",
)
print(f"\n{len(manifest)} assets, {sum(len(m['renditions']) for m in manifest)} renditions")
