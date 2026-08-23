import { Button } from '../button';
import { Check } from 'lucide-react';
import { Icon } from '../icons';
import styles from './SuccessAuth.module.scss';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../config';

type Props = {
  title: string;
  description: string;
};

export const SuccessAuthComponent = ({ title, description }: Props) => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Icon
          icon={Check}
          withBackground={true}
          backgroundType={'ellipse'}
          size={22}
          className={styles.icon}
        />
        <h1 className={styles.title}>{title}</h1>
        <span className={styles.text}>{description}</span>
      </div>
      <Button variant={'primary'} onClick={() => navigate(ROUTES.LOGIN)}>
        Continue to Login
      </Button>
    </div>
  );
};
