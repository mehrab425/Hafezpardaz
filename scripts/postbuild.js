/**
 * After `next build` with output:"standalone", copy public + static assets
 * into `.next/standalone` so `node server.js` / ParsPack can serve the app.
 */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const standalone = path.join(ROOT, ".next", "standalone");
const staticSrc = path.join(ROOT, ".next", "static");
const publicSrc = path.join(ROOT, "public");

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  fs.cpSync(src, dest, { recursive: true });
}

if (!fs.existsSync(standalone)) {
  console.log("[postbuild] No standalone output; skip asset copy.");
  process.exit(0);
}

copyDir(publicSrc, path.join(standalone, "public"));
copyDir(staticSrc, path.join(standalone, ".next", "static"));

// Prisma schema/migrations needed if migrate runs from standalone cwd later
const prismaSrc = path.join(ROOT, "prisma");
if (fs.existsSync(prismaSrc)) {
  copyDir(prismaSrc, path.join(standalone, "prisma"));
}

console.log("[postbuild] Copied public, static (+ prisma) into .next/standalone");
