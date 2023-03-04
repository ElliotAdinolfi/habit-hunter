import styles from '@/styles/DeleteHabit.module.css';

interface DeleteHabitProps {
  id: number;
  confirmDelete: boolean;
  setConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteHabit: (id: number) => void;
}

const DeleteHabit = ({
  id,
  confirmDelete,
  setConfirmDelete,
  handleDeleteHabit,
}: DeleteHabitProps) => {
  return (
    <div className={styles.confirmMenuContainer}>
      <div className={styles.confirmMenu}>
        <h1>Are you sure?</h1>
        <p>
          This will permanently delete this habit and all associated
          data
        </p>
        <div className={styles.menuButtons}>
          <button
            className={styles.confirmButton}
            onClick={() => handleDeleteHabit(id)}
          >
            Delete
          </button>
          <button
            className={styles.cancelButton}
            onClick={() => setConfirmDelete(!confirmDelete)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteHabit;
