import { useEffect } from 'react';

const server = import.meta.env.VITE_APP_SERVER;

const Title = () => {
  useEffect(() => {
    (async () => {
      const { APP_NAME } = await import(`@/servers/${server}`);
      const faviconNode = document.createElement('link');
      faviconNode.setAttribute('rel', 'icon');
      faviconNode.setAttribute('type', 'image/x-icon');
      faviconNode.setAttribute('href', `./assets/${server}/favicon.ico`);
      document.title = APP_NAME;
      document.head.appendChild(faviconNode);
    })();
  });

  return null;
};

export default Title;
