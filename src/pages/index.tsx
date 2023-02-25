import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import Login from '@/components/Login';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Habit Hunter</title>
        <meta
          name="Habit Tracker Application"
          content="This web app is a habit tracker application created by Elliot Adinolfi"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="icon" href="/favicon.png" />
        <link
          rel="stylesheet"
          href="https://rsms.me/inter/inter.css"
        />
      </Head>
      <main className={styles.main}>
        <Login />
      </main>
    </>
  );
}
