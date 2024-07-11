import { SERVER } from '@/constants/app';
import { useEffect, useState } from 'react';

export default function useAppName() {
  const [appName, setAppName] = useState('');

  useEffect(() => {
    (async function handleAsyncImport() {
      const { APP_NAME } = await import(`@/servers/${SERVER}`);
      setAppName(APP_NAME);
    })();
  }, []);

  return { appName };
}
