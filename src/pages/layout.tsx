import React from 'react'; // Add this line if necessary

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground"> {/* Apply global styles here */}
        {children}
      </body>
    </html>
  );
}
