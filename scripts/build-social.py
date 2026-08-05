"""Build the Open Graph image and favicons.

The Open Graph card is deliberately minimal: the approved VP mark plus live-text
equivalent wording set in Cabinet Grotesk. It carries no invented claim, no
contact detail and no event information, so it never goes stale.

Usage:  python scripts/build-social.py <path-to-CabinetGrotesk-TTF-folder>
"""

import pathlib
import sys

from PIL import Image, ImageDraw, ImageFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
FONTS = pathlib.Path(sys.argv[1])

OBSIDIAN = (9, 7, 7)
BURGUNDY = (118, 13, 23)
GOLD = (209, 163, 59)
IVORY = (245, 239, 228)
MUTED = (182, 172, 165)

W, H = 1200, 628  # 1.91:1
card = Image.new("RGB", (W, H), OBSIDIAN)
draw = ImageDraw.Draw(card)

# Soft burgundy stage wash from the lower left, kept inside the safe zone.
wash = Image.new("RGB", (W, H), OBSIDIAN)
wd = ImageDraw.Draw(wash)
for i in range(46):
    t = i / 45
    r = int(760 * (1 - t)) + 120
    wd.ellipse([-320 - r // 3, H - r // 2, -320 + r, H + r // 2],
               fill=(int(OBSIDIAN[0] + (BURGUNDY[0] - OBSIDIAN[0]) * (t ** 2) * 0.55),
                     int(OBSIDIAN[1] + (BURGUNDY[1] - OBSIDIAN[1]) * (t ** 2) * 0.55),
                     int(OBSIDIAN[2] + (BURGUNDY[2] - OBSIDIAN[2]) * (t ** 2) * 0.55)))
card = Image.blend(card, wash, 0.85)
draw = ImageDraw.Draw(card)

# Gold hairline frame
draw.rectangle([36, 36, W - 37, H - 37], outline=(78, 61, 30), width=1)

mark = Image.open(ROOT / "assets/images/brand/vop-mark-512.png").convert("RGBA")
mh = 190
mw = round(mark.width * mh / mark.height)
mark = mark.resize((mw, mh), Image.LANCZOS)
card.paste(mark, (96, 116), mark)

f_black = ImageFont.truetype(str(FONTS / "CabinetGrotesk-Black.ttf"), 78)
f_med = ImageFont.truetype(str(FONTS / "CabinetGrotesk-Medium.ttf"), 30)
f_label = ImageFont.truetype(str(FONTS / "CabinetGrotesk-Bold.ttf"), 21)

x = 96
draw.text((x, 356), "Visionaries", font=f_black, fill=IVORY)
draw.text((x, 436), "of Purpose", font=f_black, fill=IVORY)

label = "RECORD LABEL  ·  LIVE PRODUCTION"
draw.text((x, 322), label, font=f_label, fill=GOLD)

draw.text((x, 530), "Artist management, bookings, live music and event production.",
          font=f_med, fill=MUTED)

out = ROOT / "assets/social"
out.mkdir(parents=True, exist_ok=True)
card.save(out / "og-default.png", optimize=True)
card.save(out / "og-default.jpg", quality=90)
print("og-default.png", card.size)

# Favicons: mark centred on obsidian, generous padding so it reads at 16px.
for size in (16, 32, 48, 180, 192, 512):
    ico = Image.new("RGBA", (size, size), (9, 7, 7, 255))
    pad = max(2, round(size * 0.12))
    inner = size - pad * 2
    m = Image.open(ROOT / "assets/images/brand/vop-mark-512.png").convert("RGBA")
    scale = min(inner / m.width, inner / m.height)
    m = m.resize((max(1, round(m.width * scale)), max(1, round(m.height * scale))), Image.LANCZOS)
    ico.paste(m, ((size - m.width) // 2, (size - m.height) // 2), m)
    ico.save(ROOT / f"assets/icons/icon-{size}.png", optimize=True)
    print("icon", size)

ims = [Image.open(ROOT / f"assets/icons/icon-{s}.png") for s in (16, 32, 48)]
ims[0].save(ROOT / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)], append_images=ims[1:])
print("favicon.ico")
