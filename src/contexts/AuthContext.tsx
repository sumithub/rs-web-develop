"use client";
import { createContext } from "react";

export interface AuthContextType {
  unVerifiedEmail: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextType>({
  unVerifiedEmail: "",
  setEmail: () => {}, // dummy default for initial context
});

export default AuthContext;
