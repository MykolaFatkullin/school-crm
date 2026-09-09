import { Toast } from './types';

const MAX_TOASTS = 5;

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
    toasts = [toast, ...toasts].slice(0, MAX_TOASTS);
    emit();
  },
  remove(id: string) {
    toasts = toasts.filter(toast => toast.id !== id);

    emit();
  },
};
