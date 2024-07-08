import { useEffect } from 'react';

const server = import.meta.env.VITE_APP_SITE;

const Title = () => {
  useEffect(() => {
    (async () => {
      const { APP_NAME } = await import(`@/servers/${server}`);
      document.title = APP_NAME;
    })();
  });

  return null;
};

export default Title;
