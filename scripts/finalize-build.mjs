import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = path.join(root, 'dist');
await writeFile(path.join(dist, '.nojekyll'), '');
const sha256 = contents => createHash('sha256').update(contents).digest('hex');
const artifacts = {};
async function scan(directory) {
  for (const entry of (await readdir(directory, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) await scan(absolute);
    else if (entry.name !== 'build-manifest.json') artifacts[path.relative(dist, absolute).split(path.sep).join('/')] = sha256(await readFile(absolute));
  }
}
await scan(dist);
let sourceCommit = null;
let sourceDirty = null;
try {
  sourceCommit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim();
  sourceDirty = Boolean(execFileSync('git', ['status', '--porcelain'], { cwd: root, encoding: 'utf8' }).trim());
} catch { /* Source archives can still be built, with provenance explicitly unavailable. */ }
await writeFile(path.join(dist, 'build-manifest.json'), JSON.stringify({
  sourceCommit,
  sourceDirty,
  lockfileSha256: sha256(await readFile(path.join(root, 'package-lock.json'))),
  buildCommand: 'npm run build',
  nodeVersion: process.version,
  artifacts,
}, null, 2) + '\n');
