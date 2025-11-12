import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";

export default function Navbar() {
  const authContext = useAuth() || {};
  const { user, logout } = authContext;
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogout = async () => {
    if (logout) {
      await logout();
      navigate("/");
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Menu links for reuse
  const menuLinks = (
    <>
      <Link
        to="/"
        className="btn btn-ghost min-w-[110px] justify-center"
        onClick={() => setMenuOpen(false)}
      >
        Home
      </Link>
      {user && (
        <>
          <Link
            to="/add-transaction"
            className="btn btn-ghost min-w-[110px] justify-center"
            onClick={() => setMenuOpen(false)}
          >
            Add Transaction
          </Link>
          <Link
            to="/my-transactions"
            className="btn btn-ghost min-w-[110px] justify-center"
            onClick={() => setMenuOpen(false)}
          >
            My Transactions
          </Link>
          <Link
            to="/reports"
            className="btn btn-ghost min-w-[110px] justify-center"
            onClick={() => setMenuOpen(false)}
          >
            Reports
          </Link>
          <Link
            to="/profile"
            className="btn btn-ghost min-w-[110px] justify-center"
            onClick={() => setMenuOpen(false)}
          >
            My Profile
          </Link>
        </>
      )}
      {!user && (
        <>
          <Link
            to="/login"
            className="btn btn-primary min-w-[110px] justify-center"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="btn btn-outline min-w-[110px] justify-center"
            onClick={() => setMenuOpen(false)}
          >
            Signup
          </Link>
        </>
      )}
      {user && (
        <button
          className="btn btn-outline min-w-[110px] justify-center"
          onClick={() => {
            setMenuOpen(false);
            handleLogout();
          }}
        >
          Log out
        </button>
      )}
      <button
        className="btn btn-outline min-w-[110px] justify-center"
        onClick={() => {
          toggleTheme();
          setMenuOpen(false);
        }}
        aria-label="Toggle light/dark mode"
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
    </>
  );

  return (
    <nav className="navbar bg-base-200 px-4 py-2 flex justify-between items-center shadow relative">
      <div className="flex items-center gap-2">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1041/1041916.png"
          alt="FinEase Logo"
          className="h-8 w-8"
        />
        <span className="font-bold text-xl">FinEase</span>
      </div>
      {/* Desktop menu */}
      <div className="hidden md:flex gap-2 items-center flex-wrap md:justify-end">
        {menuLinks}
      </div>
      {/* Hamburger for mobile */}
      <div className="md:hidden flex items-center">
        <button
          className="btn btn-ghost btn-circle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {menuOpen && (
          <div className="absolute top-full right-2 mt-2 w-64 bg-base-100 shadow-lg rounded-lg z-50 flex flex-col p-2 animate-fade-in">
            {menuLinks}
          </div>
        )}
      </div>
    </nav>
  );
}
