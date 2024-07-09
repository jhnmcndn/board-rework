/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_SERVER: '8801' | '8802' | '8803';
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
