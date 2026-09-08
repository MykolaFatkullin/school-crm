import { LoaderCircle } from 'lucide-react';
import styles from './LoadingPage.module.scss';

type Props = {
  message?: string;
};

export const LoadingPage = ({ message }: Props) => (
  <main className={styles.loadingPage}>
    <LoaderCircle size={100} className={styles.loaderCircle} />
    {message && <p className={styles.message}>{message}</p>}
  </main>
);
