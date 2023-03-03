import React, { useState } from 'react';
import styles from '@/styles/Habits.module.css';
import axios from 'axios';
import { useSession } from 'next-auth/react';

interface NewHabitProps {
  newHabit: boolean;
  setNewHabit: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewHabit = ({ newHabit, setNewHabit }: NewHabitProps) => {
  const { data: session } = useSession();
  const [habit, setHabit] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHabit(e.target.value);
  };

  const handleSubmit = () => {
    const user_email = session?.user?.email;
    const table = 'habits';

    axios
      .post('/api/createHabit', { habit, user_email, table })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    setNewHabit(!habit);
  };

  return (
    <div className={styles.habitFormContainer}>
      <div className={styles.habitForm}>
        <div className={styles.closeForm}>
          <a onClick={() => setNewHabit(!newHabit)}> &times; </a>
        </div>
        <p>Add a new habit</p>
        <input type="text" onChange={handleChange}></input>
        <button className={styles.submitHabit} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default NewHabit;
