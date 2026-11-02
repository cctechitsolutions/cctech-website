# Product photo guide

Use this folder for catalog photos referenced by relative path in Admin, for example:

```text
images/products/servers/hp-dl380-front.webp
```

Recommended photo setup:

- Keep an original copy outside the website folder.
- Export catalog photos as WebP, ideally under 300 KB each.
- Use a square image around 1200 × 1200 px; keep the whole product visible with margin instead of cropping it tightly.
- Use the same background and lighting for products in the same category.
- Use descriptive lowercase names such as `dell-latitude-5420-front.webp` and `dell-latitude-5420-back.webp`.
- Use PNG when transparency is necessary. The admin upload converts to WebP when the browser supports it and keeps transparent pixels; the fallback JPEG uses a white background.

The catalog image frame uses `object-fit: contain`, so it shows the complete product even when the source image dimensions differ. Adding the image as a repo file and entering its relative path keeps large photo data out of `database.js`.
