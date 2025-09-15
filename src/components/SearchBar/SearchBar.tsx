import { toast } from 'react-hot-toast';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  async function handleAction(formData: FormData) {
    const rawQuery = formData.get('query');
    if (typeof rawQuery !== 'string' || rawQuery.trim() === '') {
      toast.error('Please enter your search query.');
      return;
    }

    const query = rawQuery.trim();
    onSubmit(query);
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a className={styles.link}
           href="https://www.themoviedb.org/"
           target="_blank"
           rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form className={styles.form} action={handleAction}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={styles.button} type="submit">Search</button>
        </form>
      </div>
    </header>
  );
}