import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import styles from '@/styles/Habits.module.css';
import NewHabit from '@/components/NewHabit';
import axios from 'axios';

const HabitsContainer = () => {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      runGetHabits();
    }
  }, []);

  function runGetHabits() {
    (async function getHabits() {
      const user_email = session?.user?.email;
      const table = 'habits';

      const habitData = await axios.get(
        `/api/getHabit?user_email=${user_email}&table=${table}`
      );
      const habitList = habitData.data.map((habit: any) => {
        return (
          <div key={habit.id} className={styles.habitCard}>
            <p>Habit: {habit.name}</p>
            <p>Done Today: {String(habit.done_today)}</p>
            <p>Streak: {habit.days_completed}</p>
          </div>
        );
      });
      setHabits(habitList);
      console.log(habitList);
    })();
  }

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
