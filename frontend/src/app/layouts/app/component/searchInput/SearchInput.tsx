import { Search } from 'lucide-react';
import { Icon } from '../../../../../shared/components/icons';
import styles from './SearchInput.module.scss';

type Props = {
  placeholder: string;
};
export const SearchInput = ({ placeholder }: Props) => {
  return (
    <div className={styles.searchInput}>
      <Icon icon={Search} size={16} className={styles.searchInputIcon} />

      <input type="text" placeholder={placeholder} className={styles.input} />

      <kbd className={styles.kbd}>⌘K</kbd>
    </div>
  );
};
