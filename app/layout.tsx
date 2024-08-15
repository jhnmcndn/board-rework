import ClickSound from '@/components/ClickSoundProvider';
import Loading from '@/components/Loading';
import ModalRoot from '@/components/modals';
import { GlobalProvider } from '@/components/Providers';
import { serverConfig } from '@/server';
import '@/styles/main.scss';
import type { Metadata } from 'next';

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
          <Loading />
          <ModalRoot />
          <ClickSound />
        </GlobalProvider>
      </body>
    </html>
  );
}
