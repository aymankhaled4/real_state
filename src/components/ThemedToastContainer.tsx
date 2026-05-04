import { ToastContainer } from "react-toastify";
import useTheme from "../hooks/useTheme";

export default function ThemedToastContainer() {
  const { theme } = useTheme();

  return (
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      theme={theme === "dark" ? "dark" : "light"}
    />
  );
}
