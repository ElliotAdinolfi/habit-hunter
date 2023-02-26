import { useSession } from 'next-auth/react';
import styles from '@/styles/Home.module.css';

export default function Habits() {
  const { data: session } = useSession();

  return (
    <>
      <h1>Habits</h1>
    </>
  );
}
