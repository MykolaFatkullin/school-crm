import logo from '../../../assets/icons/logo.svg';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../config';
import styles from './Logo.module.scss';
import { CSSProperties } from 'react';

type Props = {
  size?: number;
};

export const Logo = ({ size = 56 }: Props) => {
  const wrapperStyle: CSSProperties = {
    '--icon-size': `${size}px`,
  } as CSSProperties;

  return (
    <NavLink to={ROUTES.HOME} className={styles.logo} style={wrapperStyle}>
      <img src={logo} alt="SchoolCRM logo" width={size} height={size} />
    </NavLink>
  );
};
