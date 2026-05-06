import { useState } from "react";
import AuthContext from "../context/AuthContext";
import type Iuser from "../interfaces/Iuser";
import { login, register, updateUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface Props {
  children: React.ReactNode;
}

function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<Iuser | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const isAuthenticated = !!user;
  const navigate = useNavigate();

  const loginHandler = async (email: string, password: string) => {
    const data = await login({ email, password });
    if (data.length === 0) {
      toast.error("Invalid email or password!");
      return;
    }
    setUser(data[0]);
    localStorage.setItem("user", JSON.stringify(data[0]));
    toast.success("Account created successfully!");
    navigate("/listings");
  };

  const registerHandler = async (
    name: string,
    email: string,
    password: string,
  ) => {
    const existing = await login({ email, password });
    if (existing.length > 0) {
      toast.error("Email already exists!");
      return;
    }
    const data = await register({ name, email, password });
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
    navigate("/listings");
  };

  const updateProfileHandler = async (name: string, email: string) => {
    if (!user?.id) {
      toast.error("Unable to update profile.");
      return false;
    }

    const updatedUser = await updateUser(user.id, { name, email });
    const mergedUser = { ...user, ...updatedUser };
    setUser(mergedUser);
    localStorage.setItem("user", JSON.stringify(mergedUser));
    toast.success("Profile updated successfully!");
    return true;
  };

  const updatePasswordHandler = async (
    currentPassword: string,
    newPassword: string,
  ) => {
    if (!user?.id) {
      toast.error("Unable to update password.");
      return false;
    }

    if (user.password !== currentPassword) {
      toast.error("Current password is incorrect.");
      return false;
    }

    const updatedUser = await updateUser(user.id, { password: newPassword });
    const mergedUser = { ...user, ...updatedUser };
    setUser(mergedUser);
    localStorage.setItem("user", JSON.stringify(mergedUser));
    toast.success("Password updated successfully!");
    return true;
  };

  const logoutHandler = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loginHandler,
        registerHandler,
        updateProfileHandler,
        updatePasswordHandler,
        logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
