import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import styles from '@/styles/Habits.module.css';
import axios from 'axios';

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
  const { data: session } = useSession();

  return (
    <div key={id} className={styles.habitCard}>
      <a
        className={styles.deleteHabit}
        onClick={() => handleDeleteHabit(id)}
      >
        {' '}
        &times;{' '}
      </a>
      <p>{name}</p>
      <p>Done Today: {String(done_today)}</p>
      <p>Streak: {days_completed}</p>
    </div>
  );
};

export default HabitCard;
