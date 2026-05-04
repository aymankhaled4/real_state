import { createContext } from "react";
import type Iuser from "../interfaces/Iuser";

interface IAuthContext {
  user: Iuser | null;
  isAuthenticated: boolean;
  loginHandler: (email: string, password: string) => Promise<void>;
  registerHandler: (
    name: string,
    email: string,
    password: string,
  ) => Promise<void>;
  updateProfileHandler: (name: string, email: string) => Promise<boolean>;
  updatePasswordHandler: (
    currentPassword: string,
    newPassword: string,
  ) => Promise<boolean>;
  logoutHandler: () => void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export default AuthContext;
