
"use client";
import { useState, ReactNode } from "react";
import AuthContext, { AuthContextType } from "./AuthContext";

interface AuthWrapperProps {
  children: ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const [email, setEmail] = useState<string>("");

  const contextValue: AuthContextType = {
    unVerifiedEmail: email,
    setEmail,
  };
  
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}



