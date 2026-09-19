import React from 'react';
import styles from './ContentCard.module.scss';

type Props = {
  children: React.ReactNode;
};

export const ContentCard = ({ children }: Props) => {
  return <div className={styles.contentCard}>{children}</div>;
};
