import React from 'react';
import styles from '@/styles/Home.module.css';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Login() {
  const { data: session } = useSession();

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
