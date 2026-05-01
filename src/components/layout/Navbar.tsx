import { NavLink } from "react-router-dom";

const NavLinks = [
  {
    link: "Listings",
  },
];

export default function Navbar() {
  return (
    <header className="bg-[#fdfdff]">
      <nav className="px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-semibold leading-8 tracking-[-1.2px]">
            DreamHome
          </h1>
          <ul className="flex items-center gap-8">
            {NavLinks.map(({ link }) => (
              <NavLink
                to={`/${link.toLocaleLowerCase()}`}
                key={link}
                className={(isActive) =>
                  `text-[14px] tracking-[-0.35px] leading-6 font-semibold ${isActive ? "text-[#047857] border-b-2 border-[#047857]" : "text-[#475569]"}`
                }>
                {link}
              </NavLink>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
