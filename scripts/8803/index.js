import fs from 'fs';

const content = `import { ServerConfig } from '@/types/app'

export const serverConfig = {
  agent: '88vns',
  domain: 'https://qt03.qpdqdwebda.com/',
  server: '8803',
  title: '澳门威尼斯人',
} satisfies ServerConfig;`;

fs.writeFileSync('server.ts', content);
