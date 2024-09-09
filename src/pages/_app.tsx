import type { AppProps } from 'next/app';
import './globals.css'; // Move the global CSS import here

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;