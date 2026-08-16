import { FormHTMLAttributes } from 'react';
import styles from './Form.module.scss';

type Props = FormHTMLAttributes<HTMLFormElement>;

export const Form = ({ ...formProps }: Props) => {
  return <form {...formProps} className={styles.form} />;
};
