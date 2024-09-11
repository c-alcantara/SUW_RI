import React from 'react'; // Add this line if necessary
import Head from 'next/head'; // Add this line to import Head

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
        {/* Other head elements can go here */}
      </Head>
      <body className="bg-background text-foreground">
        {" "}
        {/* Apply global styles here */}
        {children}
      </body>
    </html>
  );
}
