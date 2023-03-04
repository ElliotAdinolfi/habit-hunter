import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import styles from '@/styles/Habits.module.css';
import NewHabit from '@/components/NewHabit';
import axios from 'axios';

const HabitsContainer = () => {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState(false);
  const [habitCount, setHabitCount] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    console.log(process.env.NODE_ENV);
    if (
      (session && process.env.NODE_ENV === 'production') ||
      process.env.NODE_ENV === 'development'
    ) {
      runGetHabits();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [habitCount]);

  function runGetHabits() {
    (async function getHabits() {
      if (!session) return;
      const user_email = session?.user?.email;
      const table = 'habits';
      const habitData = await axios.get(
        `/api/getHabit?user_email=${user_email}&table=${table}`
      );
      const habitList = habitData.data.map((habit: any) => {
        return (
          <div key={habit.id} className={styles.habitCard}>
            <a className={styles.deleteHabit}> &times; </a>
            <p>{habit.name}</p>
            <p>Done Today: {String(habit.done_today)}</p>
            <p>Streak: {habit.days_completed}</p>
          </div>
        );
      });
      setHabits(habitList);
      setHabitCount(habitList.length);
    })();
  }

  async function handleDeleteHabit(id: number) {
    const user_email = session?.user?.email;
    const table = 'habits';
    await axios.delete('/api/deleteHabit', {
      data: { id, user_email, table },
    });
    setHabitCount(habitCount - 1);
  }

  return (
    <div className={styles.habitContainer}>
      {habits}
      <div className={styles.newHabit}>
        <button onClick={() => setNewHabit(!newHabit)}> + </button>
      </div>
      {newHabit && (
        <NewHabit
          newHabit={newHabit}
          setNewHabit={setNewHabit}
          runGetHabits={runGetHabits}
          habitCount={habitCount}
          setHabitCount={setHabitCount}
        />
      )}
    </div>
  );
};

export default HabitsContainer;
