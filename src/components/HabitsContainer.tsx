import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import styles from '@/styles/Habits.module.css';
import NewHabit from '@/components/NewHabit';
import HabitCard from '@/components/HabitCard';
import axios from 'axios';

const HabitsContainer = () => {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState(false);
  const [habitCount, setHabitCount] = useState(0);
  const [deletedHabit, setDeletedHabit] = useState<number[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    if (
      (session && process.env.NODE_ENV === 'production') ||
      process.env.NODE_ENV === 'development'
    ) {
      runGetHabits();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [habitCount, deletedHabit]);

  function runGetHabits() {
    (async function getHabits() {
      if (session?.user?.email) {
        const user_email = session?.user?.email;
        const table = 'habits';
        const habitData = await axios.get(
          `/api/getHabit?user_email=${user_email}&table=${table}`
        );
        const habitList = await habitData.data.map((habit: any) => {
          if (deletedHabit.includes(habit.id)) {
            return (
              <div key={habit.id} className={styles.hideCard}>
                <HabitCard
                  id={habit.id}
                  name={habit.name}
                  done_today={habit.done_today}
                  streak={habit.streak}
                  handleDeleteHabit={() =>
                    handleDeleteHabit(habit.id)
                  }
                />
              </div>
            );
          } else {
            return (
              <div key={habit.id}>
                <HabitCard
                  id={habit.id}
                  name={habit.name}
                  done_today={habit.done_today}
                  streak={habit.streak}
                  handleDeleteHabit={() =>
                    handleDeleteHabit(habit.id)
                  }
                />
              </div>
            );
          }
        });
        setHabits(habitList);
        setHabitCount(habitList.length);
      }
    })();
  }

  async function handleDeleteHabit(id: number) {
    const user_email = session?.user?.email;
    const table = 'habits';
    axios
      .delete('/api/deleteHabit', {
        data: { id, user_email, table },
      })
      .then(() => {
        setHabitCount(habitCount - 1);
        setDeletedHabit([...deletedHabit, id]);
      });
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
