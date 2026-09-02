import { createReadStream, existsSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
const root = new URL('./src/', import.meta.url).pathname;
const types = { '.css': 'text/css', '.html': 'text/html', '.js': 'text/javascript' };
createServer((req, res) => {
  const requestPath = req.url === '/' ? '/index.html' : req.url.split('?')[0];
  const file = normalize(join(root, requestPath));
  if (!file.startsWith(root) || !existsSync(file)) { res.writeHead(404); res.end('Not found'); return; }
  res.writeHead(200, { 'content-type': `${types[extname(file)] || 'application/octet-stream'}; charset=utf-8` });
  createReadStream(file).pipe(res);
}).listen(process.env.PORT || 8050, () => console.log('ECS console available on port 8050'));
