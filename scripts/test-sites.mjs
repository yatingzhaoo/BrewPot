import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

await access('dist/client/index.html');
await access('dist/server/index.js');
await access('dist/.openai/hosting.json');

const worker = await readFile('dist/server/index.js', 'utf8');
const html = await readFile('dist/client/index.html', 'utf8');
assert.match(worker, /env\.ASSETS\.fetch/);
assert.match(html, /<div id="root"><\/div>/);
