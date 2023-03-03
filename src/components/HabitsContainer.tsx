import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import styles from '@/styles/Habits.module.css';
import NewHabit from '@/components/NewHabit';

const HabitsContainer = () => {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState(false);
  const { data: session } = useSession();

  return (
    <div className={styles.habitContainer}>
      {habits}
      <div className={styles.newHabit}>
        <button onClick={() => setNewHabit(!newHabit)}> + </button>
      </div>
      {newHabit && (
        <NewHabit newHabit={newHabit} setNewHabit={setNewHabit} />
      )}
    </div>
  );
};

export default HabitsContainer;
