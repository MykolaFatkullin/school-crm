import { Check } from 'lucide-react';
import { Icon } from '../icons';
import styles from './SuccessAuth.module.scss';
import { ROUTES } from '../../config';
import { Link } from '../link';

type Props = {
  title: string;
  description: string;
};

export const SuccessAuthComponent = ({ title, description }: Props) => {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <Icon
          icon={Check}
          withBackground={true}
          backgroundType={'ellipse'}
          size={22}
          className={styles.icon}
        />
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.text}>{description}</p>
      </div>
      <Link type={'primaryButton'} to={ROUTES.LOGIN}>
        Continue to Login
      </Link>
    </main>
  );
};
