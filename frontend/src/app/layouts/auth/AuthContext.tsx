import { createContext, useContext } from "react";

type AuthLayoutContextType = {
  title: string;
  setTitle: (title: string) => void;
};

export const AuthLayoutContext = createContext<AuthLayoutContextType | null>(null);
export const avs = "Hello oooo";
export const useAuthLayout = () => {
  const context = useContext(AuthLayoutContext);

  if (!context) {
    throw new Error("useAuthLayout must be used inside AuthLayout");
  }

  return context;
};
