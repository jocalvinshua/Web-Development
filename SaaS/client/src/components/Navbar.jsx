import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../assets/logo.svg";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, token } = useSelector((state) => state.auth);

  const navlink = [
    { id: "#", name: "Home" },
    { id: "#features", name: "Features" },
    { id: "#testimonials", name: "Testimonials" },
    { id: "#cta", name: "Contact" },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="w-full py-2.5 text-sm text-white text-center bg-gradient-to-r from-primary to-accent">
        <p>
          <span className="px-3 py-1 rounded-md bg-white text-primary font-semibold mr-2">
            AI Feature
          </span>
          Try creating a resume using AI
        </p>
      </div>

      <nav className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-40 text-sm bg-white/80 backdrop-blur sticky top-0">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-8" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-slate-700">
          {navlink.map((link) => (
            <li key={link.name}>
              <a
                href={link.id}
                className="relative font-medium transition text-slate-700 hover:text-secondary after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-secondary after:transition-all hover:after:w-full"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Action Button: Diganti dengan Link */}
        <div className="hidden md:flex">
          <Link
            to={token ? "/app" : "/login"}
            className="px-6 py-2 rounded-full bg-primary text-white font-semibold hover:bg-primary-dull active:scale-95 transition-all shadow-sm"
          >
            {token ? "Dashboard" : "Get Started"}
          </Link>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden text-slate-700 hover:text-primary active:scale-90 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 5h16M4 12h16M4 19h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[100] bg-primary/90 backdrop-blur-md flex flex-col items-center justify-center gap-8 md:hidden transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="flex flex-col gap-6 text-lg">
          {navlink.map((link) => (
            <li key={link.name}>
              <a
                href={link.id}
                onClick={() => setMenuOpen(false)}
                className="text-white font-medium hover:text-primary-dull transition"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <Link
          to={token ? "/app" : "/login"}
          onClick={() => setMenuOpen(false)}
          className="px-8 py-3 rounded-full bg-white text-primary font-bold hover:bg-slate-100 transition"
        >
          {token ? "Go to Dashboard" : "Get Started"}
        </Link>

        <button
          onClick={() => setMenuOpen(false)}
          className="mt-6 size-10 rounded-md bg-secondary hover:bg-primary-dull transition text-white flex items-center justify-center text-xl"
        >
          ✕
        </button>
      </div>
    </>
  );
}