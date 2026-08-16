import { PropsWithChildren, useEffect, useState } from 'react';
import { Toast } from './types';
import { toastStore } from './toastStore';
import * as RadixToast from '@radix-ui/react-toast';
import styles from './ToastProvider.module.scss';
import {
  CircleAlert,
  CircleCheckBig,
  CircleQuestionMark,
  CircleX,
  TriangleAlert,
} from 'lucide-react';
import classNames from 'classnames';

const DURATION = 50000;

const icons = {
  success: CircleCheckBig,
  error: CircleAlert,
  info: CircleQuestionMark,
  warning: TriangleAlert,
};

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<Toast[]>(toastStore.getToasts());

  useEffect(() => {
    return toastStore.subscribe(setToasts);
  }, []);

  return (
    <RadixToast.Provider swipeDirection="right">
      {children}

      {toasts.map(toast => {
        const Icon = icons[toast.type];

        return (
          <RadixToast.Root
            key={toast.id}
            duration={DURATION}
            className={styles.toast}
            onOpenChange={open => {
              if (!open) {
                toastStore.remove(toast.id);
              }
            }}
          >
            <div className={styles.toastContent}>
              <Icon
                size={18}
                className={classNames(styles.icon, {
                  [styles.success]: toast.type === 'success',
                  [styles.error]: toast.type === 'error',
                  [styles.info]: toast.type === 'info',
                  [styles.warning]: toast.type === 'warning',
                })}
              />
              <div className={styles.toastInfo}>
                <RadixToast.Title className={styles.toastTitle}>
                  {toast.title}
                </RadixToast.Title>
                {toast.description && (
                  <RadixToast.Description className={styles.toastDescription}>
                    {toast.description}
                  </RadixToast.Description>
                )}
              </div>
              <RadixToast.Close asChild className={styles.toastClose}>
                <button>
                  <CircleX size={12} />
                </button>
              </RadixToast.Close>
            </div>
          </RadixToast.Root>
        );
      })}
      <RadixToast.Viewport className={styles.toastViewport} />
    </RadixToast.Provider>
  );
};
