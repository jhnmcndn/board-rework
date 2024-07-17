import fs from 'fs';

const content = `import { ServerConfig } from '@/types/app'

export const serverConfig = {
  agent: '88vns',
  domain: 'https://ly.qpdqdwebda.com/',
  server: '8802',
  title: '乐游棋牌',
} satisfies ServerConfig;`;

fs.writeFileSync('server.ts', content);
fs.cpSync('./assets/8802', './public/assets/svgas', { recursive: true });
