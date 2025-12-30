import { useState } from "react";
import logo from "../assets/logo.svg";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navlink = [
    { id: "#", name: "Home" },
    { id: "#features", name: "Features" },
    { id: "#testimonials", name: "Testimonials" },
    { id: "#contacts", name: "Contact" },
  ];

  return (
    <>
      {/* Navbar */}
      <nav className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-40 text-sm">
        <a href="#">
          <img src={logo} alt="Logo" className="h-8" />
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-slate-800">
          {navlink.map((link) => (
            <li key={link.name}>
              <a
                href={link.id}
                className="text-black hover:text-secondary transition"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Action Buttons */}
        <div className="hidden md:flex gap-2">
          <a
            href="#"
            className="px-6 py-2 bg-indigo-500 hover:bg-indigo-700 active:scale-95 transition-all rounded-full text-white"
          >
            Get started
          </a>
          <a
            href="#"
            className="px-6 py-2 border active:scale-95 hover:bg-slate-50 transition-all rounded-full text-slate-700 hover:text-slate-900"
          >
            Login
          </a>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden active:scale-90 transition"
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
        className={`fixed inset-0 z-[100] bg-black/40 backdrop-blur flex flex-col items-center justify-center gap-8 md:hidden transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="flex flex-col gap-6 text-lg">
          {navlink.map((link) => (
            <li key={link.name}>
              <a
                href={link.id}
                onClick={() => setMenuOpen(false)}
                className="text-white hover:text-indigo-400 transition"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setMenuOpen(false)}
          className="mt-6 size-10 bg-indigo-600 hover:bg-indigo-700 transition text-white rounded-md flex items-center justify-center"
        >
          ✕
        </button>
      </div>
    </>
  );
}
