/**
 * Production entry for PaaS platforms (ParsPack / OpenShift S2I) that run `node server.js`
 * or `npm start`. This boots the Next.js app — not a legacy Express phone-auth server.
 */
const { spawnSync, spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const http = require("http");
const { parse } = require("url");

const ROOT = process.cwd();
const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOSTNAME || "0.0.0.0";

function ensureDatabaseUrl() {
  if (process.env.DATABASE_URL) {
    // Normalize relative SQLite URLs to absolute so chdir(standalone) is safe
    if (process.env.DATABASE_URL.startsWith("file:./") || process.env.DATABASE_URL.startsWith("file:prisma/")) {
      const raw = process.env.DATABASE_URL.replace(/^file:/, "");
      const abs = path.resolve(ROOT, raw).replace(/\\/g, "/");
      process.env.DATABASE_URL = `file:${abs}`;
    }
    return;
  }
  const dbFile = path.join(ROOT, "prisma", "data.db").replace(/\\/g, "/");
  process.env.DATABASE_URL = `file:${dbFile}`;
  console.log(`[boot] DATABASE_URL was unset; using ${process.env.DATABASE_URL}`);
}

function run(command, args, label) {
  console.log(`[boot] ${label}...`);
  const result = spawnSync(command, args, {
    cwd: ROOT,
    env: process.env,
    stdio: "inherit",
    shell: process.platform === "win32",
  });
  if (result.status !== 0) {
    throw new Error(`${label} failed with exit code ${result.status}`);
  }
}

function preferStandalone() {
  const standaloneServer = path.join(ROOT, ".next", "standalone", "server.js");
  return fs.existsSync(standaloneServer) ? standaloneServer : null;
}

async function startWithNextPackage() {
  const next = require("next");
  const app = next({
    dev: false,
    dir: ROOT,
    hostname: HOST,
    port: PORT,
  });
  const handle = app.getRequestHandler();
  await app.prepare();

  http
    .createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    })
    .listen(PORT, HOST, () => {
      console.log(`[boot] Hafez Pardaz Sepehr (Next.js) ready on http://${HOST}:${PORT}`);
    });
}

function startStandalone(standaloneServer) {
  // Standalone layout expects to resolve assets from its own directory.
  const standaloneDir = path.dirname(standaloneServer);
  process.chdir(standaloneDir);
  process.env.HOSTNAME = HOST;
  process.env.PORT = String(PORT);
  // Keep DATABASE_URL absolute/usable after chdir
  if (process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith("file:./")) {
    const rel = process.env.DATABASE_URL.slice("file:".length);
    const abs = path.resolve(ROOT, rel).replace(/\\/g, "/");
    process.env.DATABASE_URL = `file:${abs}`;
  }
  console.log(`[boot] Starting Next.js standalone from ${standaloneDir}`);
  require(standaloneServer);
}

async function main() {
  console.log("[boot] ========================================");
  console.log("[boot] hafez-pardaz-sepehr — Next.js production");
  console.log("[boot] Auth: email/password via next-auth (JWT)");
  console.log("[boot] ========================================");

  if (!process.env.AUTH_SECRET && !process.env.NEXTAUTH_SECRET) {
    console.warn(
      "[boot] WARNING: AUTH_SECRET / NEXTAUTH_SECRET is not set. Admin login will fail."
    );
  }

  ensureDatabaseUrl();

  const prismaDir = path.join(ROOT, "prisma");
  const uploadDir = path.join(ROOT, "storage", "uploads");
  fs.mkdirSync(prismaDir, { recursive: true });
  fs.mkdirSync(uploadDir, { recursive: true });

  run("npx", ["prisma", "migrate", "deploy"], "Database migrate");
  try {
    run("node", ["seed-docker.js"], "Idempotent admin seed");
  } catch (err) {
    console.warn("[boot] Seed skipped/failed (non-fatal):", err.message);
  }

  const standalone = preferStandalone();
  if (standalone) {
    startStandalone(standalone);
    return;
  }

  // Fallback when build used default output (no standalone folder)
  if (!fs.existsSync(path.join(ROOT, ".next"))) {
    throw new Error(
      "Build output missing (.next). Run `npm run build` before start on ParsPack."
    );
  }

  await startWithNextPackage();
}

main().catch((err) => {
  console.error("[boot] Fatal:", err);
  process.exit(1);
});
