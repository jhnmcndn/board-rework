import type { Metadata } from 'next';
import '@/styles/main.scss';

import { serverConfig } from '@/server';
import { GlobalProvider } from '@/components/providers';

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
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}
