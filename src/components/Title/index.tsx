import { SERVER } from '@/constants/app';
import useAppName from '@/hooks/useAppName';
import { useEffect } from 'react';

const Title = () => {
  const { appName } = useAppName();

  useEffect(() => {
    (async () => {
      document.title = appName;

      const faviconNode = document.createElement('link');
      faviconNode.setAttribute('rel', 'icon');
      faviconNode.setAttribute('type', 'image/x-icon');
      faviconNode.setAttribute('href', `./assets/${SERVER}/favicon.ico`);
      document.head.appendChild(faviconNode);

      const manifestNode = document.createElement('link');
      manifestNode.setAttribute('rel', 'manifest');
      manifestNode.setAttribute('href', `./assets/${SERVER}/manifest.json`);
      document.head.appendChild(manifestNode);
    })();
  });

  return null;
};

export default Title;
