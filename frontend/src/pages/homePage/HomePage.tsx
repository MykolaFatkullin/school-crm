import { Logo } from '../../shared/Logo';
import { Button } from '../../shared/button';
import { ArrowRight } from 'lucide-react';
import styles from './HomePage.module.scss';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../app/layouts/router';

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.homePage}>
      <div className={styles.heading}>
        <Logo />
        <h1 className={styles.headingTitle}>School CRM</h1>
        <p className={styles.headingSubtitle}>Manage your school with ease</p>
      </div>
      <div className={styles.buttons}>
        <Button
          onClick={() => navigate(ROUTES.REGISTRATION)}
          variant={'primary'}
        >
          Create school <ArrowRight size={18} />
        </Button>
        <Button onClick={() => navigate(ROUTES.LOGIN)} variant={'secondary'}>
          Log in <ArrowRight size={18} />
        </Button>
      </div>
    </div>
  );
};
