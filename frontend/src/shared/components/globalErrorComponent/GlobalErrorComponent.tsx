import { Button } from '../button';
import styles from './GlobalErrorComponent.module.scss';
import { Icon } from '../icons';
import { AlertTriangle, WifiOff } from 'lucide-react';
import {
  clearGlobalError,
  GlobalErrorType,
} from '../../../app/store/globalErrorSlice';
import { useDispatch } from 'react-redux';

type Props = {
  errorType: GlobalErrorType;
};

const getErrorIcon = (errorType: GlobalErrorType) => {
  switch (errorType) {
    case 'NETWORK_ERROR':
      return WifiOff;
    default:
      return AlertTriangle;
  }
};

const getErrorTitle = (errorType: GlobalErrorType) => {
  switch (errorType) {
    case 'NETWORK_ERROR':
      return 'Connection error';
    default:
      return 'Something went wrong';
  }
};

const getErrorMessage = (errorType: GlobalErrorType) => {
  switch (errorType) {
    case 'NETWORK_ERROR':
      return "We couldn't connect to the server. Please check your connection and try again.";
    default:
      return 'Something went wrong. Please try again later.';
  }
};

export const GlobalErrorComponent = ({ errorType }: Props) => {
  const dispatch = useDispatch();
  const errorIcon = getErrorIcon(errorType);
  const errorTitle = getErrorTitle(errorType);
  const errorMessage = getErrorMessage(errorType);
  const iconClass =
    errorType === 'NETWORK_ERROR'
      ? styles.errorIconNetwork
      : styles.errorIconSystem;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.errorContainer}>
          <Icon
            size={28}
            icon={errorIcon}
            withBackground={true}
            backgroundType={'circle'}
            className={iconClass}
          ></Icon>
          <h1 className={styles.errorTitle}>{errorTitle}</h1>
          <span className={styles.errorMessage}>{errorMessage}</span>
        </div>
        <Button
          variant={'primary'}
          type={'button'}
          onClick={() => {
            dispatch(clearGlobalError());
            window.location.reload();
          }}
        >
          Try again
        </Button>
      </div>
    </div>
  );
};
