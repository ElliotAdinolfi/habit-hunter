import React, { useState } from 'react';
import styles from '@/styles/Habits.module.css';
import axios from 'axios';
import { useSession } from 'next-auth/react';

interface NewHabitProps {
  newHabit: boolean;
  setNewHabit: React.Dispatch<React.SetStateAction<boolean>>;
  runGetHabits: () => void;
  habitCount: number;
  setHabitCount: React.Dispatch<React.SetStateAction<number>>;
}

const NewHabit = ({
  newHabit,
  setNewHabit,
  runGetHabits,
  habitCount,
  setHabitCount,
}: NewHabitProps) => {
  const { data: session } = useSession();
  const [habit, setHabit] = useState<string>('');
  const [error, setError] = useState('');

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHabit(e.target.value);
  };

  const handleSubmit = () => {
    if (habit === '') {
      setError('Please enter a habit');
      return;
    }
    const user_email = session?.user?.email;
    const table = 'habits';

    axios
      .post('/api/createHabit', { habit, user_email, table })
      .catch((err) => console.log(err));

    setNewHabit(!habit);
    setHabitCount(habitCount + 1);
    runGetHabits();
  };

  return (
    <div className={styles.habitFormContainer}>
      <div className={styles.habitForm}>
        <div className={styles.closeForm}>
          <a onClick={() => setNewHabit(!newHabit)}> &times; </a>
        </div>
        <p>Add a new habit</p>
        <input
          type="text"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        ></input>
        <button className={styles.submitHabit} onClick={handleSubmit}>
          Submit
        </button>
        <p className={styles.error}>{error}</p>
      </div>
    </div>
  );
};

export default NewHabit;
