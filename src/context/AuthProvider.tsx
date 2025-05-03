import { Admin, Manager, TeamMember } from "@/types/user";
import { createContext, useState, useContext, ReactNode } from "react";

interface AuthContextType {
  user: Admin | TeamMember | Manager | null;
  setUser: React.Dispatch<
    React.SetStateAction<Admin | TeamMember | Manager | null>
  >;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Admin | TeamMember | Manager | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
