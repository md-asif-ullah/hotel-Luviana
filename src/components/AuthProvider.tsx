"use client";

import { IUserResponseTypes, IUserType } from "@/types";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import axios from "axios";

interface AuthContextType {
  user: IUserType | null;
  setUser: Dispatch<SetStateAction<IUserType | null>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUserType | null>(null);

  const getUser = useCallback(async () => {
    try {
      const response = await axios.get<IUserResponseTypes>("/api/profile");
      if (response.data.success) {
        setUser(response.data?.payload?.user);
      }
      if (!response.data.success) {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
