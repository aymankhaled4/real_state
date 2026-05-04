import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { FiHeart, FiLogOut, FiSearch, FiUser } from "react-icons/fi";
import AuthContext from "../../context/AuthContext";
import useFavorites from "../../hooks/useFavorites";

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

  return (
    <header className="bg-[#fdfdff] border-b border-[#eef0f5]">
      <nav className="px-8 py-3 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-semibold leading-8 tracking-[-1.2px] text-[#0B1C30]">
            DreamHome
          </h1>
          <ul className="flex items-center gap-8">
            {NavLinks.map(({ link }) => (
              <NavLink
                to={`/${link.toLocaleLowerCase()}`}
                key={link}
                className={({ isActive }) =>
                  `text-[14px] tracking-[-0.35px] leading-6 font-semibold ${isActive ? "text-[#047857] border-b-2 border-[#047857]" : "text-[#475569]"}`
                }>
                {link}
              </NavLink>
            ))}
          </ul>
        </div>
        {isAuthenticated ? (
          <div className="flex items-center gap-4 text-[#334155]">
            <FiSearch className="w-4 h-4" />
            <NavLink to="/favorites" className="relative inline-flex items-center">
            <FiHeart className="w-4 h-4" />
            {favoritesCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#4f6ef7] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                {favoritesCount}
              </span>
            )}
          </NavLink>
            <NavLink to="/profile" className="inline-flex items-center">
              <FiUser className="w-4 h-4" />
            </NavLink>
            <button
              type="button"
              onClick={logoutHandler}
              className="inline-flex items-center gap-1 text-[13px] font-medium text-[#0f172a] cursor-pointer"
            >
              <FiLogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
