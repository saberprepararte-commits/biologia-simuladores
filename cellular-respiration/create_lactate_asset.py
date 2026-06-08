from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter


ROOT = Path(__file__).resolve().parent
OUT = ROOT / "assets" / "molecule-lactate-ai.png"


def radial(size, inner, outer, center=(0.35, 0.28), radius=0.78):
    w, h = size
    img = Image.new("RGBA", size, (0, 0, 0, 0))
    px = img.load()
    cx, cy = center[0] * w, center[1] * h
    max_r = radius * max(w, h)
    for y in range(h):
        for x in range(w):
            d = min(1, ((x - cx) ** 2 + (y - cy) ** 2) ** 0.5 / max_r)
            t = d * d * (3 - 2 * d)
            px[x, y] = tuple(int(inner[i] * (1 - t) + outer[i] * t) for i in range(4))
    return img


def paste_sphere(base, x, y, r, inner, outer):
    sphere = radial((r * 2, r * 2), inner, outer)
    alpha = Image.new("L", (r * 2, r * 2), 0)
    d = ImageDraw.Draw(alpha)
    d.ellipse((0, 0, r * 2 - 1, r * 2 - 1), fill=255)
    alpha = alpha.filter(ImageFilter.GaussianBlur(0.8))
    sphere.putalpha(alpha)

    shadow = Image.new("RGBA", base.size, (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    sd.ellipse((x - r + 7, y - r + 9, x + r + 7, y + r + 9), fill=(0, 0, 0, 70))
    shadow = shadow.filter(ImageFilter.GaussianBlur(9))
    base.alpha_composite(shadow)
    base.alpha_composite(sphere, (x - r, y - r))


def bond(base, a, b, width=16, color=(214, 222, 226, 255)):
    d = ImageDraw.Draw(base)
    d.line((*a, *b), fill=(25, 31, 35, 130), width=width + 8)
    d.line((*a, *b), fill=color, width=width)
    d.line((a[0], a[1] - width * 0.18, b[0], b[1] - width * 0.18), fill=(255, 255, 255, 130), width=max(3, width // 4))


def main():
    img = Image.new("RGBA", (900, 620), (0, 0, 0, 0))

    carbon = (54, 54, 56, 255), (8, 8, 9, 255)
    oxygen = (255, 70, 60, 255), (145, 0, 10, 255)
    hydrogen = (255, 255, 255, 255), (172, 179, 185, 255)

    # Approximate lactate / lactic acid: CH3-CHOH-COOH.
    c1 = (255, 300)
    c2 = (410, 255)
    c3 = (585, 300)
    o_carbonyl = (630, 150)
    o_hydroxyl_acid = (735, 360)
    h_acid = (815, 320)
    o_alcohol = (380, 435)
    h_alcohol = (470, 490)
    h1 = (150, 230)
    h2 = (150, 380)
    h3 = (265, 450)
    h_mid = (405, 130)

    for a, b, w in [
        (c1, c2, 18),
        (c2, c3, 18),
        (c3, o_carbonyl, 15),
        ((c3[0] + 22, c3[1] - 6), (o_carbonyl[0] + 22, o_carbonyl[1] - 6), 9),
        (c3, o_hydroxyl_acid, 15),
        (o_hydroxyl_acid, h_acid, 11),
        (c2, o_alcohol, 15),
        (o_alcohol, h_alcohol, 11),
        (c1, h1, 12),
        (c1, h2, 12),
        (c1, h3, 12),
        (c2, h_mid, 12),
    ]:
        bond(img, a, b, w)

    for x, y, r in [(255, 300, 58), (410, 255, 58), (585, 300, 58)]:
        paste_sphere(img, x, y, r, *carbon)

    for x, y, r in [(630, 150, 52), (735, 360, 52), (380, 435, 52)]:
        paste_sphere(img, x, y, r, *oxygen)

    for x, y, r in [(815, 320, 43), (470, 490, 43), (150, 230, 43), (150, 380, 43), (265, 450, 43), (405, 130, 43)]:
        paste_sphere(img, x, y, r, *hydrogen)

    # Crop transparent margins tightly but leave breathing room.
    bbox = img.getbbox()
    img = img.crop((max(0, bbox[0] - 35), max(0, bbox[1] - 35), min(img.width, bbox[2] + 35), min(img.height, bbox[3] + 35)))
    img.save(OUT)


if __name__ == "__main__":
    main()
