import '../app/globals.css';
import { AppProps } from 'next/app';
import { GlobalProvider } from '../app/GlobalContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
  );
}

export default MyApp;