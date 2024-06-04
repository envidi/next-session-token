"use client";
import { sessionToken } from "@/lib/http";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  sessionToken: "",
  setSessionToken: (sessionToken: string) => {},
});
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};
const AuthProvider = ({
  children,
  initialSessionToken = "",
}: {
  children: React.ReactNode;
  initialSessionToken?: string;
}) => {
  useState(() => {
    if (typeof window !== "undefined") {
      sessionToken.value = initialSessionToken;
    }
  });
  return <>{children}</>;
};

export default AuthProvider;
