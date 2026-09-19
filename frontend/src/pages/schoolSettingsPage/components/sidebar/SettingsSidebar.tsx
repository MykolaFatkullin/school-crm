import classNames from 'classnames';
import styles from './SettingsSidebar.module.scss';
import { SettingsSection } from '../../model';
import { SettingsSections } from '../../model/SettingsSection';

type Props = {
  activeSection: SettingsSection;
  onSectionChange: (section: SettingsSection) => void;
};

export const SettingsSidebar = ({ activeSection, onSectionChange }: Props) => {
  return (
    <nav aria-label="School settings" className={styles.container}>
      {SettingsSections.map(section => (
        <button
          key={section.id}
          type="button"
          className={classNames(styles.item, {
            [styles.itemActive]: activeSection === section.id,
          })}
          onClick={() => onSectionChange(section.id)}
        >
          {section.label}
        </button>
      ))}
    </nav>
  );
};
