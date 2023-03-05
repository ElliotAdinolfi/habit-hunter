import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export async function getServerSideProps() {
  const res = await fetch('/api/mycronjob');
  const data = await res.json();

  return {
    props: { message: data.message },
  };
}
