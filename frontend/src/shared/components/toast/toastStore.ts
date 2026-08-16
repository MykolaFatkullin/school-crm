import { Toast } from './types';

let toasts: Toast[] = [];
const listeners = new Set<(toasts: Toast[]) => void>();

function emit() {
  listeners.forEach(listener => listener(toasts));
}

export const toastStore = {
  subscribe(listener: (toasts: Toast[]) => void) {
    listeners.add(listener);
    listener(toasts);

    return () => {
      listeners.delete(listener);
    };
  },
  getToasts() {
    return toasts;
  },
  add(toast: Toast) {
    toasts = [...toasts, toast];
    emit();
  },
  remove(id: string) {
    toasts = toasts.filter(toast => toast.id !== id);

    emit();
  },
};
