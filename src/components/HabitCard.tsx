import React, { useEffect, useState } from 'react';
import styles from '@/styles/Habits.module.css';
import DeleteHabit from './deleteHabit';

interface HabitCardProps {
  id: number;
  name: string;
  done_today: boolean;
  days_completed: number;
  handleDeleteHabit: (id: number) => void;
}

const HabitCard = ({
  id,
  name,
  done_today,
  days_completed,
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
          {' '}
          &times;{' '}
        </a>
        <p>{name}</p>
        <p>Done Today: {String(done_today)}</p>
        <p>Streak: {days_completed}</p>
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
