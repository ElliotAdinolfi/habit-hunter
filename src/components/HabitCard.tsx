import React, { useEffect, useState } from 'react';
import styles from '@/styles/Habits.module.css';
// @ts-ignore
import DeleteHabit from './DeleteHabit.tsx';
import axios from 'axios';

interface HabitCardProps {
  id: number;
  name: string;
  done_today: boolean;
  streak: number;
  handleDeleteHabit: (id: number) => void;
}

const HabitCard = ({
  id,
  name,
  done_today,
  streak,
  handleDeleteHabit,
}: HabitCardProps) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [completedHabit, setCompletedHabit] = useState(done_today);
  const [habitStreak, setHabitStreak] = useState(streak);

  const handleUpdateHabit = async (id: number) => {
    const table = 'habits';
    const updatedData = await axios.put(
      `/api/completeHabit?id=${id}&table=${table}`
    );
    setCompletedHabit(updatedData.data.done_today);
    setHabitStreak(updatedData.data.streak);
  };

  return (
    <div>
      <div key={id} className={styles.habitCard}>
        <a
          className={styles.deleteHabit}
          onClick={() => setConfirmDelete(!confirmDelete)}
        >
          &times;
        </a>
        <p>{name}</p>
        <p>Streak: {habitStreak}</p>
        {completedHabit ? (
          // TODO: Add functionality to mark as undone
          <button className={styles.doneButton}>Done 💪</button>
        ) : (
          <button
            className={styles.doneButton}
            onClick={() => handleUpdateHabit(id)}
          >
            Mark as done
          </button>
        )}
      </div>
      {confirmDelete && (
        <DeleteHabit
          id={id}
          confirmDelete={confirmDelete}
          setConfirmDelete={setConfirmDelete}
          handleDeleteHabit={handleDeleteHabit}
        />
      )}
    </div>
  );
};

export default HabitCard;
