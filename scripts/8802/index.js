import fs from 'fs';

const content = `export const serverConfig = {
  agent: '88vns',
  domain: 'https://ly.qpdqdwebda.com/',
  server: '8802',
  title: '乐游棋牌',
};`;

fs.writeFileSync('server.ts', content);
