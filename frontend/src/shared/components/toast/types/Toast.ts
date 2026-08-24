import { ToastTypes } from './ToastTypes';

export interface Toast {
  id: string;
  type: ToastTypes;
  title: string;
  description?: string;
}
