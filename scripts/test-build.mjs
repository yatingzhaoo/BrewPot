import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { access, readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = join(root, 'dist');
const html = await readFile(join(dist, 'index.html'), 'utf8');
assert.match(html, /<div id="root"><\/div>/);
assert.match(html, /href="\/for-agents\/"/);
assert.match(html, /type="text\/markdown" href="\/for-agents\.md"/);
assert.equal((await readFile(join(dist, 'CNAME'), 'utf8')).trim(), 'brewpot.co');
await access(join(dist, '.nojekyll'));

const source = await readFile(join(root, 'content/for-agents.md'), 'utf8');
for (const path of ['for-agents.md', 'llms-full.txt']) {
  assert.equal(await readFile(join(dist, path), 'utf8'), source, `${path} must match the content source`);
}
const agentHtml = await readFile(join(dist, 'for-agents/index.html'), 'utf8');
assert.match(agentHtml, /<title>For Agents — BrewPot<\/title>/);
assert.match(agentHtml, /<main id="content">/);
assert.match(await readFile(join(dist, 'llms.txt'), 'utf8'), /https:\/\/brewpot\.co\/for-agents\.md/);

const files = await readdir(dist);
for (const excluded of ['client', 'server', '.openai', 'src', '.env', 'node_modules']) {
  assert.ok(!files.includes(excluded), `Production output must not include ${excluded}`);
}
const assets = [...html.matchAll(/(?:src|href)="(\/assets\/[^"?#]+)"/g)].map((match) => match[1]);
assert.ok(assets.some((path) => path.endsWith('.js')), 'Built script must be linked');
assert.ok(assets.some((path) => path.endsWith('.css')), 'Built stylesheet must be linked');
for (const asset of assets) await access(join(dist, asset.slice(1)));
for (const script of assets.filter((path) => path.endsWith('.js'))) {
  assert.doesNotMatch(await readFile(join(dist, script.slice(1)), 'utf8'), /process\.env\.GEMINI_API_KEY/);
}
console.log('Production routes, Agent resources, asset links and clean output pass.');

const manifest = JSON.parse(await readFile(join(dist, 'build-manifest.json'), 'utf8'));
const digest = value => createHash('sha256').update(value).digest('hex');
assert.equal(manifest.buildCommand, 'npm run build');
assert.equal(manifest.lockfileSha256, digest(await readFile(join(root, 'package-lock.json'))));
assert.ok(manifest.sourceCommit === null || /^[a-f0-9]{40}$/.test(manifest.sourceCommit));
assert.ok(manifest.sourceDirty === null || typeof manifest.sourceDirty === 'boolean');
for (const [file, expected] of Object.entries(manifest.artifacts)) {
  assert.equal(digest(await readFile(join(dist, file))), expected, `Artifact checksum: ${file}`);
}
assert.ok(manifest.artifacts['index.html']);
console.log('Build provenance and artifact checksums pass.');
