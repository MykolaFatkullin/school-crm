import logo from '../../../assets/icons/logo.svg';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../config';
import styles from './Logo.module.scss';

export const Logo = () => (
  <NavLink to={ROUTES.HOME} className={styles.logo}>
    <img src={logo} alt="SchoolCRM logo" width={56} height={56}/>
  </NavLink>
);
