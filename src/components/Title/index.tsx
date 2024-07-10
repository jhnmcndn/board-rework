import { useEffect } from 'react';

const server = import.meta.env.VITE_APP_SERVER;

const Title = () => {
  useEffect(() => {
    (async () => {
      const { APP_NAME } = await import(`@/servers/${server}`);
      document.title = APP_NAME;

      const faviconNode = document.createElement('link');
      faviconNode.setAttribute('rel', 'icon');
      faviconNode.setAttribute('type', 'image/x-icon');
      faviconNode.setAttribute('href', `./assets/${server}/favicon.ico`);
      document.head.appendChild(faviconNode);

      const manifestNode = document.createElement('link');
      manifestNode.setAttribute('rel', 'manifest');
      manifestNode.setAttribute('href', `./assets/${server}/manifest.json`);
      document.head.appendChild(manifestNode);
    })();
  });

  return null;
};

export default Title;
