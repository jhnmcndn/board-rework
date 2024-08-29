import ClickSound from '@/components/ClickSoundProvider';
import FullScreenMode from '@/components/FullScreenMode';
import Loading from '@/components/Loading';
import ModalRoot from '@/components/modals';
import { GlobalProvider } from '@/components/Providers';
import ThemeProvider from '@/components/ThemeProvider';
import { serverConfig } from '@/server';
import '@/styles/main.scss';
import type { Metadata } from 'next';
import { Suspense } from 'react';

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
    <html lang='zh' id='root'>
      <link rel='manifest' href={`/assets/${serverConfig.server}/manifest.json`} />
      <body>
        <Suspense fallback={null}>
          <FullScreenMode>
            <GlobalProvider>
              <ThemeProvider />
              {children}
              <Loading />
              <ModalRoot />
              <ClickSound />
            </GlobalProvider>
          </FullScreenMode>
        </Suspense>
      </body>
    </html>
  );
}
