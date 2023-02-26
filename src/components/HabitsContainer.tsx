import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import styles from '@/styles/Habits.module.css';

const HabitsContainer = () => {
  const [habits, setHabits] = useState([]);
  const { data: session } = useSession();

  return (
    <div className={styles.habitContainer}>
      {habits}
      <div className={styles.newHabit}>
        <button> + </button>
      </div>
    </div>
  );
};

export default HabitsContainer;
