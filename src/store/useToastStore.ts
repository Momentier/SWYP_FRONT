import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

interface ToastMessage {
  id: string;
  type: 'success' | 'error';
  message: string;
}

interface ToastStore {
  toasts: ToastMessage[];
  addToast: (message: string, type: 'success' | 'error') => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (message, type) => {
    const id = uuidv4();
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }],
    }));
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 3000);
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
  clearToasts: () =>
    set(() => ({
      toasts: [],
    })),
}));

export const toast = {
  success: (message: string) =>
    useToastStore.getState().addToast(message, 'success'),
  error: (message: string) =>
    useToastStore.getState().addToast(message, 'error'),
};
