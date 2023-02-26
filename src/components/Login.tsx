import React, { useEffect } from 'react';
import styles from '@/styles/Home.module.css';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/habits');
    }
  }, [session, router]);

  return (
    <div className={styles.loginContainer}>
      <h1>Habit Hunter</h1>
      <h2>
        A habit tracker that lets you focus in on building life-long
        habits
      </h2>
      <button className={styles.loginButton} onClick={() => signIn()}>
        Start Tracking
      </button>
    </div>
  );
}
