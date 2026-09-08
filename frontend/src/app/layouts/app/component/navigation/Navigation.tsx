import { NavigationModel } from './NavigationModel';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.scss';
import classNames from 'classnames';
import { UserRoles } from '../../../../../entities/user/model';

type Props = {
  navigationModel: NavigationModel;
  userRole: UserRoles;
};

export const Navigation = ({ navigationModel, userRole }: Props) => {
  const { title, navigations } = navigationModel;

  const filteredNavigations = navigations.filter(
    navigation =>
      navigation.roles.length === 0 || navigation.roles.includes(userRole),
  );

  return (
    <nav className={styles.navigation}>
      {title && <span className={styles.navigationTitle}>{title}</span>}
      {filteredNavigations.map(navigation => (
        <NavLink
          key={navigation.title}
          to={navigation.path}
          className={({ isActive }) =>
            classNames(styles.navigationLink, {
              [styles.navLinkActive]: isActive,
            })
          }
        >
          <navigation.icon size={20} />
          {navigation.title}
        </NavLink>
      ))}
    </nav>
  );
};
