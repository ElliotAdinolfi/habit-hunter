import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from '@/styles/Habits.module.css';

export default function Habits() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/');
    }
  }, [session, router]);

  return (
    <>
      <div className={styles.main}>
        <header className={styles.header}>
          <h1>Habit Hunter</h1>
          <button
            className={styles.logoutButton}
            onClick={() => signOut()}
          >
            Log Out
          </button>
        </header>
      </div>
    </>
  );
}
