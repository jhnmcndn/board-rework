import fs from 'fs';

const content = `export const serverConfig = {
  agent: '88ky',
  domain: 'https://ky.qpdwebda.com/',
  server: '8801',
  title: '开元棋牌',
};`;

fs.writeFileSync('server.ts', content);
