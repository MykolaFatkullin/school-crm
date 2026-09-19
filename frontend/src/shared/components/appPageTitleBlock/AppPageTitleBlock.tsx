import styles from './AppPageTitleBlock.module.scss';

type Props = {
  title: string;
  subtitle: string;
};

export const AppPageTitleBlock = ({ title, subtitle }: Props) => {
  return (
    <div className={styles.appPageTitleBlock}>
      <h1 className={styles.appPageTitleBlockTitle}>{title}</h1>
      <p className={styles.appPageTitleBlockSubtitle}>{subtitle}</p>
    </div>
  );
};
