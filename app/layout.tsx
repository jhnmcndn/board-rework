import type { Metadata } from 'next';
import '@/styles/main.scss';

import { serverConfig } from '@/server';
import { GlobalProvider } from '@/components/providers';
import LoginTypesModal from '@/components/modals/LoginTypesModal';
import AlertModal from '@/components/modals/AlertModal';

export const metadata: Metadata = {
  title: serverConfig.title,
  icons: [
    {
      media: '(prefers-color-scheme: light)',
      url: `/assets/${serverConfig.server}/favicon.ico`,
      href: `/assets/${serverConfig.server}/favicon.ico`,
    },
    {
      media: '(prefers-color-scheme: dark)',
      url: `/assets/${serverConfig.server}/favicon.ico`,
      href: `/assets/${serverConfig.server}/favicon.ico`,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='zh'>
      <link rel='manifest' href={`/assets/${serverConfig.server}/manifest.json`} />
      <body>
        <GlobalProvider>
          {children}
          <LoginTypesModal />
          <AlertModal />
          <div id='modal-root' />
        </GlobalProvider>
      </body>
    </html>
  );
}
