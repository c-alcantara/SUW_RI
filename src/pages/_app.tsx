import type { AppProps } from 'next/app';
import './globals.css'; // Ensure this line is present

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;