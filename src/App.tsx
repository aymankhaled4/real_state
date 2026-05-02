import Navbar from "./components/layout/Navbar";
import AppRouter from "./router/AppRouter";
import Footer from "./components/layout/Footer";
import { useLocation } from "react-router-dom";

function App() {
  const { pathname } = useLocation();
  const hideLayout = ["/login", "/register"].includes(pathname);

  return (
    <div>
      {!hideLayout && <Navbar />}
      <AppRouter />
      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;