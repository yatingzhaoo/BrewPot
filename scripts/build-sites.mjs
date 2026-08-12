import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
const dist = resolve(root, 'dist');
const clientDir = resolve(dist, 'client');
const serverDir = resolve(dist, 'server');

await rm(clientDir, { recursive: true, force: true });
await mkdir(clientDir, { recursive: true });

for (const entry of await (await import('node:fs/promises')).readdir(dist)) {
  if (entry === 'client' || entry === 'server' || entry === '.openai') continue;
  await cp(resolve(dist, entry), resolve(clientDir, entry), { recursive: true });
}

await mkdir(serverDir, { recursive: true });
await writeFile(
  resolve(serverDir, 'index.js'),
  `export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let response = await env.ASSETS.fetch(request);
    if (response.status === 404 && !url.pathname.includes('.')) {
      response = await env.ASSETS.fetch(new Request(new URL('/index.html', url.origin), request));
    }
    return response;
  },
};
`,
);

await mkdir(resolve(dist, '.openai'), { recursive: true });
await cp(resolve(root, '.openai', 'hosting.json'), resolve(dist, '.openai', 'hosting.json'));

const indexHtml = await readFile(resolve(clientDir, 'index.html'), 'utf8');
if (!indexHtml.includes('<div id="root"></div>')) {
  throw new Error('Sites build validation failed: app root not found.');
}
