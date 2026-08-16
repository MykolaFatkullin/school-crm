import { ToastOptions, ToastTypes } from './types';
import { toastStore } from './toastStore';

function createToast(type: ToastTypes, options: string | ToastOptions) {
  if (typeof options === 'string') {
    toastStore.add({
      id: crypto.randomUUID(),
      type,
      title: options,
      description: '',
    });

    return;
  }

  toastStore.add({
    id: crypto.randomUUID(),
    type,
    title: options.title,
    description: options.description,
  });
}

export const toast = {
  success: (options: string | ToastOptions) => createToast('success', options),
  error: (options: string | ToastOptions) => createToast('error', options),
  warning: (options: string | ToastOptions) => createToast('warning', options),
  info: (options: string | ToastOptions) => createToast('info', options),
};
