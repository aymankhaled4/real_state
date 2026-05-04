import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { FiHeart, FiLogOut, FiMoon, FiSearch, FiSun, FiUser,
} from "react-icons/fi";
import AuthContext from "../../context/AuthContext";
import useFavorites from "../../hooks/useFavorites";
import useTheme from "../../hooks/useTheme";

const NavLinks = [
  {
    link: "Listings",
  },
];

export default function Navbar() {
  const { isAuthenticated, logoutHandler } = useContext(AuthContext);
  const { favoritesCount } = useFavorites();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-surface-elevated border-b border-border transition-colors">
<nav className="px-8 py-3 flex items-center w-full">
          <div className="flex items-center gap-8">
          <h1 className="text-2xl font-semibold leading-8 tracking-[-1.2px] text-foreground">
            DreamHome
          </h1>
          <ul className="flex items-center gap-8">
            {NavLinks.map(({ link }) => (
              <NavLink
                to={`/${link.toLocaleLowerCase()}`}
                key={link}
                className={({ isActive }) =>
                  `text-[14px] tracking-[-0.35px] leading-6 font-semibold pb-0.5 ${
                    isActive
                      ? "text-accent border-b-2 border-accent"
                      : "text-muted-foreground border-b-2 border-transparent"
                  }`
                }
              >
                {link}
              </NavLink>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-6 ml-auto">
          
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="p-2 rounded-lg border border-border text-foreground hover:bg-surface transition-colors cursor-pointer shrink-0"
          >
            {theme === "dark" ? (
              <FiSun className="w-4 h-4" />
            ) : (
              <FiMoon className="w-4 h-4" />
            )}
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-5 text-muted-foreground">
              <button type="button" className="hover:text-accent transition-colors">
                <FiSearch className="w-4 h-4" />
              </button>

              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  `relative inline-flex items-center hover:text-accent transition-colors ${
                    isActive ? "text-accent" : ""
                  }`
                }
              >
                <FiHeart className="w-4 h-4" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </NavLink>

              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `inline-flex items-center hover:text-accent transition-colors ${
                    isActive ? "text-accent" : ""
                  }`
                }
              >
                <FiUser className="w-4 h-4" />
              </NavLink>

              <button
                type="button"
                onClick={logoutHandler}
                className="inline-flex items-center gap-1 text-[13px] font-medium text-foreground hover:text-red-500 transition-colors cursor-pointer"
              >
                <FiLogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="bg-[#2563EB] text-white text-[14px] font-semibold px-5 py-2 rounded-xl hover:bg-[#1d4ed8] transition-colors cursor-pointer"
            >
              Login
            </NavLink>
          )}
        </div>

      </nav>
    </header>
  );
}