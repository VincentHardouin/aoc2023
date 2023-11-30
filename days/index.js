import { extname, join }  from 'node:path';
import { readdirSync } from 'node:fs';

const __dirname = new URL('.', import.meta.url).pathname;

const dir = join(__dirname, '.');
const days = readdirSync(dir)
  .filter((file) => {
    return !extname(file);
  });

export { days };