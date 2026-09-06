import { ArrowRight } from 'lucide-react';
import styles from './HomePage.module.scss';
import { ROUTES } from '../../shared/config';
import { Logo } from '../../shared/components/icons';
import { Link } from '../../shared/components/link';

export const HomePage = () => {
  return (
    <main className={styles.homePage}>
      <header className={styles.heading}>
        <Logo />
        <h1 className={styles.headingTitle}>School CRM</h1>
        <p className={styles.headingSubtitle}>Manage your school with ease</p>
      </header>
      <div className={styles.buttons}>
        <Link to={ROUTES.REGISTRATION} type={'primaryButton'}>
          Create school <ArrowRight size={18} />
        </Link>
        <Link to={ROUTES.LOGIN} type={'secondaryButton'}>
          Log in <ArrowRight size={18} />
        </Link>
      </div>
    </main>
  );
};
