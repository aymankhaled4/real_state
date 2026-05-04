import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { FiHeart, FiLogOut, FiMoon, FiSearch, FiSun, FiUser } from "react-icons/fi";
import AuthContext from "../../context/AuthContext";
import useFavorites from "../../hooks/useFavorites";
import useTheme from "../../hooks/useTheme";

const NavLinks = [
  {
    link: "Listings",
  },
  {
    link: "Profile",
  },
];

export default function Navbar() {
  const { isAuthenticated, logoutHandler } = useContext(AuthContext);
  const { favoritesCount } = useFavorites();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-surface-elevated border-b border-border transition-colors">
      <nav className="px-8 py-3 flex items-center justify-between max-w-7xl mx-auto">
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
                  `text-[14px] tracking-[-0.35px] leading-6 font-semibold pb-0.5 ${isActive ? "text-accent border-b-2 border-accent" : "text-muted-foreground border-b-2 border-transparent"}`
                }>
                {link}
              </NavLink>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={theme === "dark"}
            className="p-2 rounded-lg border border-border text-foreground hover:bg-surface transition-colors cursor-pointer shrink-0"
          >
            {theme === "dark" ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
          </button>
          {isAuthenticated ? (
            <div className="flex items-center gap-4 text-muted-foreground">
              <FiSearch className="w-4 h-4" aria-hidden />
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  `relative inline-flex items-center ${isActive ? "text-accent" : "text-muted-foreground"}`
                }
                aria-label="Favorites"
              >
                <FiHeart className="w-4 h-4" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#4f6ef7] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                    {favoritesCount}
                  </span>
                )}
              </NavLink>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `inline-flex items-center ${isActive ? "text-accent" : "text-muted-foreground"}`
                }
                aria-label="Profile"
              >
                <FiUser className="w-4 h-4" />
              </NavLink>
              <button
                type="button"
                onClick={logoutHandler}
                className="inline-flex items-center gap-1 text-[13px] font-medium text-foreground cursor-pointer"
              >
                <FiLogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </nav>
    </header>
  );
}
