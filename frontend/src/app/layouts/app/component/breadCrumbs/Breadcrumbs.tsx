import { Link as ReactLink, useMatches } from 'react-router-dom';
import { ROUTES } from '../../../../../shared/config';
import styles from './Breadcrumbs.module.scss';

type BreadcrumbHandle = {
  breadcrumb: string;
};

export const Breadcrumbs = () => {
  const matches = useMatches();

  const items = [
    {
      label: 'Dashboard',
      path: ROUTES.DASHBOARD,
    },
    ...matches
      .filter(match => {
        const handle = match.handle as BreadcrumbHandle | undefined;

        return handle?.breadcrumb;
      })
      .map(match => {
        const handle = match.handle as BreadcrumbHandle;

        return {
          label: handle.breadcrumb,
          path: match.pathname,
        };
      }),
  ];

  return (
    <nav className={styles.Breadcrumbs}>
      {items.map((item, index) => (
        <span key={item.path} className={styles.BreadcrumbsItem}>
          {index > 0 && ' / '}

          {index === items.length - 1 ? (
            item.label
          ) : (
            <ReactLink to={item.path} className={styles.BreadcrumbsLink}>
              {item.label}
            </ReactLink>
          )}
        </span>
      ))}
    </nav>
  );
};
