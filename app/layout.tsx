import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Forest Friends App',
    default: 'Forest Friends',
  },
  description: "The official Forest Friends App, built to help run the Forest Friends summer camp.",
  metadataBase: new URL('https://forest-friends-one.vercel.app'),
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
