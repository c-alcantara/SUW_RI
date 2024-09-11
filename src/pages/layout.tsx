import React from 'react';
import Head from 'next/head';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Other head elements can go here */}
      </Head>
      <body className="bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
