import fs from 'fs';

const content = `import { ServerConfig } from '@/types/app'

export const serverConfig = {
  agent: '88ky',
  domain: 'https://ky.qpdwebda.com/',
  server: '8801',
  title: '开元棋牌',
} satisfies ServerConfig;`;

fs.writeFileSync('server.ts', content);
fs.cpSync('./assets/8801', './public/assets/svgas', { recursive: true });
