import React, { useEffect, useState } from 'react';
import styles from '@/styles/Habits.module.css';
// @ts-ignore
import DeleteHabit from './DeleteHabit.tsx';

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
        <p>Streak: {streak}</p>
        {done_today ? (
          <button className={styles.doneButton}>Done 💪</button>
        ) : (
          <button className={styles.doneButton}>Mark as done</button>
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
