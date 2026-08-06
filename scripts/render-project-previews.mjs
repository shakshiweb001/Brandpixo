import { readdir, mkdir, writeFile, copyFile } from 'node:fs/promises';
import { join } from 'node:path';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas, Image, ImageData, Path2D, DOMMatrix } from '@napi-rs/canvas';

Object.assign(globalThis, { Image, ImageData, Path2D, DOMMatrix });

const projects = [
  ['livejunkfree', 'live-junk-free'],
  ['specialtypediatricsolutions', 'specialty-pediatric-solutions'],
  ['theconvoke', 'the-convoke'],
  ['alleemclubs', 'aleem-clubs'],
  ['aqualyxleeds', 'aqualyx-leeds'],
  ['artsacademyschool', 'arts-academy-school'],
];

const files = (await readdir(process.cwd())).filter((file) => file.endsWith('.pdf'));
const outputDir = join(process.cwd(), 'public', 'projects');
await mkdir(outputDir, { recursive: true });

for (const [match, slug] of projects) {
  const filename = files.find((file) => file.includes(match));
  if (!filename) throw new Error(`Missing PDF for ${slug}`);

  const pdf = await getDocument({ url: join(process.cwd(), filename), disableFontFace: true }).promise;
  const firstPage = await pdf.getPage(1);
  const source = firstPage.getViewport({ scale: 1 });
  const scale = 1400 / source.width;
  const pages = [];
  for (let number = 1; number <= pdf.numPages; number += 1) {
    const page = await pdf.getPage(number);
    pages.push({ page, viewport: page.getViewport({ scale }) });
  }
  const totalHeight = pages.reduce((height, item) => height + Math.ceil(item.viewport.height), 0);
  const canvas = createCanvas(1400, totalHeight);
  const context = canvas.getContext('2d');
  let offsetY = 0;
  for (const item of pages) {
    const pageCanvas = createCanvas(Math.ceil(item.viewport.width), Math.ceil(item.viewport.height));
    const pageContext = pageCanvas.getContext('2d');
    await item.page.render({ canvasContext: pageContext, viewport: item.viewport }).promise;
    context.drawImage(pageCanvas, 0, offsetY);
    offsetY += Math.ceil(item.viewport.height);
  }
  const image = await canvas.encode('webp', 82);
  await writeFile(join(outputDir, `${slug}-website.webp`), image);
  await copyFile(join(process.cwd(), filename), join(outputDir, `${slug}.pdf`));
  console.log(`${slug}: ${canvas.width}x${canvas.height}, ${image.length} bytes`);
}
