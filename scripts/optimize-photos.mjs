import sharp from "sharp"
import { readdirSync, readFileSync, statSync, writeFileSync } from "fs"
import path from "path"

const dir = path.resolve(import.meta.dirname, "../public/photos")
const MAX_DIM = 1600
const JPEG_QUALITY = 78

for (const file of readdirSync(dir)) {
  const full = path.join(dir, file)
  const before = statSync(full).size
  const ext = path.extname(file).toLowerCase()
  const inputBuffer = readFileSync(full)
  const resized = await sharp(inputBuffer)
    .rotate()
    .resize({ width: MAX_DIM, height: MAX_DIM, fit: "inside", withoutEnlargement: true })
    .toBuffer()

  const out =
    ext === ".png"
      ? await sharp(resized).png({ quality: 82, compressionLevel: 9 }).toBuffer()
      : await sharp(resized).jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer()

  writeFileSync(full, out)
  const after = statSync(full).size
  console.log(`${file}: ${(before / 1024 / 1024).toFixed(2)}MB -> ${(after / 1024 / 1024).toFixed(2)}MB`)
}
