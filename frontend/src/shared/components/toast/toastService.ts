import { toastStore } from './toastStore';
import { ToastTypes } from './types/ToastTypes';

const addToast = (type: ToastTypes, title: string, description?: string) => {
  toastStore.add({
    id: crypto.randomUUID(),
    type,
    title,
    description,
  });
};

export const toast = {
  success: (title: string, description?: string) =>
    addToast('success', title, description),

  error: (title: string, description?: string) =>
    addToast('error', title, description),

  info: (title: string, description?: string) =>
    addToast('info', title, description),

  warning: (title: string, description?: string) =>
    addToast('warning', title, description),
};
